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
        return json({ events: await recentEvents(300) });
      } catch { return json({ error: 'storage_unavailable' }, 503); }
    },
  } },
});
