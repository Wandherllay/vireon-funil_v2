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
          'page_view', 'quiz_start', 'offer_view', 'checkout_click',
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
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const requestedPage = Number(url.searchParams.get('page') || 1);
        const page = Number.isFinite(requestedPage) ?
          Math.min(Math.max(Math.floor(requestedPage), 1), totalPages) : 1;
        const start = (page - 1) * pageSize;
        return json({
          events: filtered.slice(start, start + pageSize),
          total, page, pageSize, totalPages, maxStored: 5000,
        });
      } catch { return json({ error: 'storage_unavailable' }, 503); }
    },
  } },
});
