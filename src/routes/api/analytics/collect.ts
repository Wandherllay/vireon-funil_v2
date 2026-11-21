import { createFileRoute } from '@tanstack/react-router';
import { analyticsReady, appendEvent, json, readObject } from '../../../lib/vireon-analytics.server';

const EVENTS = new Set(['page_view', 'checkout_click', 'upsell_accept', 'upsell_decline', 'step_click']);
const safe = (value: unknown, max: number) => typeof value === 'string' ? value.slice(0, max) : '';
export const Route = createFileRoute('/api/analytics/collect')({
  server: { handlers: {
    POST: async ({ request }) => {
      if (!analyticsReady()) return json({ error: 'not_configured' }, 503);
      const origin = request.headers.get('origin');
      if (origin && origin !== new URL(request.url).origin) return json({ error: 'forbidden' }, 403);
      const body = await readObject(request);
      if (!body || typeof body.event !== 'string' || !EVENTS.has(body.event) ||
        typeof body.session_id !== 'string' || !/^[0-9a-f-]{36}$/i.test(body.session_id) ||
        typeof body.path !== 'string' || !/^\/v2(?:\/|$)/.test(body.path)) return json({ error: 'invalid' }, 400);
      try {
        await appendEvent({
          source: 'website', session_id: body.session_id, event: body.event,
          path: safe(body.path, 160), step: safe(body.step, 64),
          utm_source: safe(body.utm_source, 80), utm_campaign: safe(body.utm_campaign, 80),
          received_at: new Date().toISOString(),
        });
        return json({ ok: true });
      } catch { return json({ error: 'storage_unavailable' }, 503); }
    },
  } },
});
