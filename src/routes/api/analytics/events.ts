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
        const events = await recentEvents(300);
        // Old unlabelled events from the Vercel test domain are excluded.
        // Payment notifications remain limited by the existing Vireon product allowlist.
        const filtered = events.filter((row) =>
          (row.source === 'website' && row.site_host === 'www.forcemichaelthompson.app') ||
          row.source === 'perfectpay'
        );
        return json({ events: filtered });
      } catch { return json({ error: 'storage_unavailable' }, 503); }
    },
  } },
});
