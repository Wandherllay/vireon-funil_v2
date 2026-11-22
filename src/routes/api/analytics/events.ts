import { createFileRoute } from '@tanstack/react-router';
import { timingSafeEqual } from 'node:crypto';
import { analyticsReady, json, recentEvents } from '../../../lib/vireon-analytics.server';

function authorized(request: Request) {
  const expected = process.env.VIREON_ANALYTICS_ADMIN_TOKEN;
  const provided = request.headers.get('authorization')?.replace(/^Bearer /i, '') || '';
  if (!expected || !provided) return false;
  const a = Buffer.from(expected); const b = Buffer.from(provided);
  return a.length === b.length && timingSafeEqual(a, b);
}
export const Route = createFileRoute('/api/analytics/events')({
  server: { handlers: {
    GET: async ({ request }) => {
      if (!authorized(request)) return json({ error: 'unauthorized' }, 401);
      if (!analyticsReady()) return json({ error: 'not_configured' }, 503);
      try {
        const url = new URL(request.url);
        const search = (url.searchParams.get('q') || '').trim().slice(0, 120).toLowerCase();
        // Redis already retains up to 5,000 entries. Filter before paginating to
        // avoid misleading counts and to exclude events from the Vercel test domain.
        const allowedEvents = new Set([
          'page_view', 'quiz_start', 'quiz_midpoint', 'quiz_complete', 'offer_view', 'checkout_click',
          'upsell_view', 'upsell_accept', 'upsell_decline', 'thank_you_view',
        ]);
        const all = await recentEvents(5000);
        const filtered = all.filter((row) => {
          if (!row || typeof row !== 'object') return false;
          if (row.source === 'website') {
            if (row.site_host !== 'www.forcemichaelthompson.app' || !allowedEvents.has(row.event)) return false;
            if (row.event === 'page_view' && row.path !== '/v2' && row.path !== '/v2/') return false;
          } else if (row.source !== 'perfectpay') {
            return false;
          }
          if (!search) return true;
          return [
            row.received_at, row.source, row.event, row.session_id, row.path, row.step,
            row.product_name, row.product_code, row.order_code, row.sale_status_enum,
            row.utm_source, row.utm_campaign,
          ].some((value) => String(value ?? '').toLowerCase().includes(search));
        });

        if (url.searchParams.get('format') === 'csv') {
          const fields: Array<[string, string]> = [
            ['Horário (UTC)', 'received_at'], ['Origem', 'source'],
            ['Evento', 'event'], ['Sessão', 'session_id'],
            ['Página', 'path'], ['Etapa', 'step'],
            ['Produto', 'product_name'], ['Código do produto', 'product_code'],
            ['Pedido', 'order_code'], ['Status da venda', 'sale_status_enum'],
            ['Valor da venda', 'sale_amount'],
            ['UTM Source', 'utm_source'], ['UTM Campaign', 'utm_campaign'],
          ];
          const cell = (value: unknown) => {
            const raw = String(value ?? '').replace(/[\r\n]+/g, ' ');
            // Prevent spreadsheet-formula injection from untrusted campaign fields.
            const safe = /^\s*[=+\-@]/.test(raw) ? "'" + raw : raw;
            return '"' + safe.replace(/"/g, '""') + '"';
          };
          const csv = [
            fields.map(([label]) => cell(label)).join(';'),
            ...filtered.map((row) => fields.map(([, key]) => cell(row[key])).join(';')),
          ].join('\r\n');
          const filename = 'vireon-v2-eventos-' + new Date().toISOString().slice(0, 10) + '.csv';
          return new Response('\uFEFF' + csv, {
            status: 200,
            headers: {
              'Content-Type': 'text/csv; charset=utf-8',
              'Content-Disposition': 'attachment; filename="' + filename + '"',
              'Cache-Control': 'no-store',
              'X-Content-Type-Options': 'nosniff',
            },
          });
        }

        const requestedPageSize = Number(url.searchParams.get('pageSize') || 500);
        const pageSize = [100, 250, 500, 1000].includes(requestedPageSize) ? requestedPageSize : 500;
        const total = filtered.length;
        // Counts cover all matching events, not just the current page.
        // Percentages describe event distribution, not visitor conversion.
        const counts = new Map<string, number>();
        for (const row of filtered) {
          const name = typeof row.event === 'string' && row.event ? row.event : 'other';
          counts.set(name, (counts.get(name) || 0) + 1);
        }
        const eventOrder = [
          'page_view', 'quiz_start', 'quiz_midpoint', 'quiz_complete', 'offer_view', 'checkout_click',
          'upsell_view', 'upsell_accept', 'upsell_decline', 'thank_you_view',
          'payment_status',
        ];
        const names = [...eventOrder, ...Array.from(counts.keys()).filter((name) => !eventOrder.includes(name))];
        const distribution = names
          .filter((name) => (counts.get(name) || 0) > 0)
          .map((event) => {
            const count = counts.get(event) || 0;
            return {
              event, count,
              percentage: total ? Math.round((count / total) * 1000) / 10 : 0,
            };
          });
        // Session-based funnel: one visitor session is counted once per stage.
        // A later event implies progress even if a prior milestone was missed.
        // These are the last RECORDED stages, not proven abandonment.
        const perSession = new Map<string, Set<string>>();
        for (const row of filtered) {
          if (row.source !== 'website' ||
            typeof row.session_id !== 'string' ||
            !/^[0-9a-f-]{36}$/i.test(row.session_id)) continue;
          let recorded = perSession.get(row.session_id);
          if (!recorded) {
            recorded = new Set<string>();
            perSession.set(row.session_id, recorded);
          }
          recorded.add(row.event);
        }
        const landingSessions = [...perSession.values()].filter((events) => events.has('page_view'));
        const landingCount = landingSessions.length;
        const hasCheckoutClick = (events: Set<string>) => events.has('checkout_click');
        const hasOfferOrLater = (events: Set<string>) =>
          events.has('offer_view') || hasCheckoutClick(events);
        const hasQuizCompleteOrLater = (events: Set<string>) =>
          events.has('quiz_complete') || hasOfferOrLater(events);
        const hasQuizMidpointOrLater = (events: Set<string>) =>
          events.has('quiz_midpoint') || hasQuizCompleteOrLater(events);
        const hasQuizOrLater = (events: Set<string>) =>
          events.has('quiz_start') || hasQuizMidpointOrLater(events);
        const observedStages = [
          { key: 'landing', label: 'Entraram no /v2', count: landingCount },
          { key: 'quiz', label: 'Iniciaram o quiz ou etapa posterior', count: landingSessions.filter(hasQuizOrLater).length },
          { key: 'quiz_midpoint', label: 'Metade do quiz (6/11) ou etapa posterior', count: landingSessions.filter(hasQuizMidpointOrLater).length },
          { key: 'quiz_complete', label: 'Finalizaram as 11 perguntas ou etapa posterior', count: landingSessions.filter(hasQuizCompleteOrLater).length },
          { key: 'offer', label: 'Oferta ou etapa posterior', count: landingSessions.filter(hasOfferOrLater).length },
          { key: 'checkout', label: 'Clicaram para o checkout', count: landingSessions.filter(hasCheckoutClick).length },
        ].map((stage) => ({
          ...stage,
          percentage: landingCount ? Math.round((stage.count / landingCount) * 1000) / 10 : 0,
        }));
        const lastStage = [
          { key: 'landing', label: 'Último registro: entrada /v2', count: landingSessions.filter((events) => !hasQuizOrLater(events)).length },
          { key: 'quiz', label: 'Último registro: início do quiz', count: landingSessions.filter((events) => hasQuizOrLater(events) && !hasQuizMidpointOrLater(events)).length },
          { key: 'quiz_midpoint', label: 'Último registro: metade do quiz', count: landingSessions.filter((events) => hasQuizMidpointOrLater(events) && !hasQuizCompleteOrLater(events)).length },
          { key: 'quiz_complete', label: 'Último registro: quiz concluído', count: landingSessions.filter((events) => hasQuizCompleteOrLater(events) && !hasOfferOrLater(events)).length },
          { key: 'offer', label: 'Último registro: oferta', count: landingSessions.filter((events) => hasOfferOrLater(events) && !hasCheckoutClick(events)).length },
          { key: 'checkout', label: 'Último registro: clique no checkout', count: landingSessions.filter(hasCheckoutClick).length },
        ].map((stage) => ({
          ...stage,
          percentage: landingCount ? Math.round((stage.count / landingCount) * 1000) / 10 : 0,
        }));
        const funnel = {
          landingSessions: landingCount,
          totalTrackedSessions: perSession.size,
          sessionsWithoutLanding: perSession.size - landingCount,
          observedStages,
          lastStage,
        };
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const requestedPage = Number(url.searchParams.get('page') || 1);
        const page = Number.isFinite(requestedPage) ?
          Math.min(Math.max(Math.floor(requestedPage), 1), totalPages) : 1;
        const start = (page - 1) * pageSize;
        return json({
          events: filtered.slice(start, start + pageSize),
          total, page, pageSize, totalPages, maxStored: 5000, distribution, funnel,
        });
      } catch { return json({ error: 'storage_unavailable' }, 503); }
    },
  } },
});
