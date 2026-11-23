import { createFileRoute } from '@tanstack/react-router';
import { analyticsReady, appendEvent, incrementQuestionMetric, QUESTION_IDS, json, readObject } from '../../../lib/vireon-analytics.server';

const EVENTS = new Set(['page_view', 'quiz_start', 'quiz_midpoint', 'quiz_complete', 'offer_view', 'checkout_click', 'upsell_view', 'upsell_accept', 'upsell_decline', 'thank_you_view']);
const TRACKED_ORIGIN = 'https://www.forcemichaelthompson.app';
const TRACKED_HOST = 'www.forcemichaelthompson.app';
const safe = (value: unknown, max: number) => typeof value === 'string' ? value.slice(0, max) : '';

function collectorResponse(data: unknown, status: number, origin: string | null) {
  const response = json(data, status);
  if (origin === TRACKED_ORIGIN) {
    response.headers.set('Access-Control-Allow-Origin', TRACKED_ORIGIN);
    response.headers.set('Vary', 'Origin');
  }
  return response;
}

export const Route = createFileRoute('/api/analytics/collect')({
  server: { handlers: {
    // The collector is hosted on Vercel, while the tracked funnel uses the custom domain.
    OPTIONS: async ({ request }) => {
      if (request.headers.get('origin') !== TRACKED_ORIGIN) return json({ error: 'forbidden' }, 403);
      return new Response(null, { status: 204, headers: {
        'Access-Control-Allow-Origin': TRACKED_ORIGIN,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '600',
        Vary: 'Origin',
      } });
    },
    POST: async ({ request }) => {
      const origin = request.headers.get('origin');
      // Never accept events from the site's root or a Vercel preview/production hostname.
      if (origin !== TRACKED_ORIGIN) return json({ error: 'forbidden' }, 403);
      if (!analyticsReady()) return collectorResponse({ error: 'not_configured' }, 503, origin);
      const body = await readObject(request);
      // Per-question counts have no session_id or answers. Never append them to the event log.
      if (body && (body.event === 'question_view' || body.event === 'question_advance')) {
        const question = body.question_id;
        const traffic = body.traffic;
        if (typeof question !== 'string' || !QUESTION_IDS.includes(question as any) ||
            (traffic !== 'fb' && traffic !== 'other') ||
            Object.keys(body).some((key) => !['event', 'question_id', 'traffic'].includes(key))) {
          return collectorResponse({ error: 'invalid' }, 400, origin);
        }
        try {
          await incrementQuestionMetric(question as any, body.event === 'question_view' ? 'view' : 'advance', traffic);
          return collectorResponse({ ok: true }, 200, origin);
        } catch { return collectorResponse({ error: 'storage_unavailable' }, 503, origin); }
      }
      if (!body || typeof body.event !== 'string' || !EVENTS.has(body.event) ||
        typeof body.session_id !== 'string' || !/^[0-9a-f-]{36}$/i.test(body.session_id) ||
        typeof body.path !== 'string' ||
        !/^\/v2(?:\/|$)/.test(body.path) ||
        /^\/v2\/analytics-admin(?:\/|$)/.test(body.path)) {
        return collectorResponse({ error: 'invalid' }, 400, origin);
      }
      try {
        await appendEvent({
          source: 'website', site_host: TRACKED_HOST,
          session_id: body.session_id, event: body.event,
          path: safe(body.path, 160), step: safe(body.step, 64),
          utm_source: safe(body.utm_source, 80), utm_campaign: safe(body.utm_campaign, 80),
          received_at: new Date().toISOString(),
        });
        return collectorResponse({ ok: true }, 200, origin);
      } catch { return collectorResponse({ error: 'storage_unavailable' }, 503, origin); }
    },
  } },
});
