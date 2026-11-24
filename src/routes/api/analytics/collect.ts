import { createFileRoute } from '@tanstack/react-router';
import { analyticsReady, appendEvent, incrementQuestionMetric, incrementVideoMetric, isAnalyticsEventId, QUESTION_IDS, json, readObject, type MetricDelivery, type QuestionId } from '../../../lib/vireon-analytics.server';

const EVENTS = new Set(['page_view', 'quiz_start', 'quiz_midpoint', 'quiz_complete', 'offer_view', 'checkout_click', 'upsell_view', 'upsell_accept', 'upsell_decline', 'thank_you_view']);
const TRACKED_ORIGIN = 'https://www.forcemichaelthompson.app';
const TRACKED_HOST = 'www.forcemichaelthompson.app';
const safe = (value: unknown, max: number) => typeof value === 'string' ? value.slice(0, max) : '';

// Legacy clients sent neither field. Keep the bucket stable if a retry crosses UTC midnight.
function metricDelivery(id: unknown, day: unknown): MetricDelivery | undefined | null {
  if (id === undefined && day === undefined) return undefined;
  if (!isAnalyticsEventId(id)) return null;
  const now = Date.now();
  const today = new Date(now).toISOString().slice(0, 10);
  const yesterday = new Date(now - 86_400_000).toISOString().slice(0, 10);
  return day === today || day === yesterday ? { id: id.toLowerCase(), day } : null;
}

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
      if (!body) return collectorResponse({ error: 'invalid' }, 400, origin);
      const { event, event_id: id, event_day: day, quiz_version: quizVersion,
        session_id: session, path, step, utm_source: utmSource, utm_campaign: utmCampaign } = body;
      // Per-VSL counts have no session_id or answers. Never append them to the event log.
      if (event === 'video_view' || event === 'video_error' || event === 'video_fallback') {
        const delivery = metricDelivery(id, day);
        const { video, traffic } = body;
        const action = event === 'video_view' ? 'view'
          : event === 'video_error' ? 'error' : 'fallback';
        if ((video !== 'quiz' && video !== 'offer') ||
            (traffic !== 'fb' && traffic !== 'other') ||
            (video === 'offer' && action === 'fallback') || delivery === null ||
            Object.keys(body).some((key) => !['event', 'video', 'traffic', 'event_id', 'event_day'].includes(key))) {
          return collectorResponse({ error: 'invalid' }, 400, origin);
        }
        try {
          await incrementVideoMetric(video, action, traffic, delivery);
          return collectorResponse({ ok: true }, 200, origin);
        } catch { return collectorResponse({ error: 'storage_unavailable' }, 503, origin); }
      }
      // Per-question counts have no session_id or answers. Never append them to the event log.
      if (event === 'question_view' || event === 'question_advance') {
        const delivery = metricDelivery(id, day);
        const { question_id: question, traffic } = body;
        const version = quizVersion === '10' ? '10' : quizVersion === undefined ? '12' : null;
        if (typeof question !== 'string' || !QUESTION_IDS.includes(question as QuestionId) ||
            (traffic !== 'fb' && traffic !== 'other') || !version || delivery === null ||
            (version === '12' && question === 'ingredients') ||
            Object.keys(body).some((key) => !['event', 'question_id', 'traffic', 'quiz_version', 'event_id', 'event_day'].includes(key))) {
          return collectorResponse({ error: 'invalid' }, 400, origin);
        }
        try {
          await incrementQuestionMetric(question as QuestionId, event === 'question_view' ? 'view' : 'advance', traffic, version, delivery);
          return collectorResponse({ ok: true }, 200, origin);
        } catch { return collectorResponse({ error: 'storage_unavailable' }, 503, origin); }
      }
      if (typeof event !== 'string' || !EVENTS.has(event) ||
        (id !== undefined && !isAnalyticsEventId(id)) ||
        typeof session !== 'string' || !/^[0-9a-f-]{36}$/i.test(session) ||
        typeof path !== 'string' ||
        !/^\/v2(?:\/|$)/.test(path) ||
        /^\/v2\/analytics-admin(?:\/|$)/.test(path)) {
        return collectorResponse({ error: 'invalid' }, 400, origin);
      }
      try {
        await appendEvent({
          source: 'website', site_host: TRACKED_HOST,
          session_id: session, event,
          path: safe(path, 160), step: safe(step, 64),
          utm_source: safe(utmSource, 80), utm_campaign: safe(utmCampaign, 80),
          quiz_version: quizVersion === '10' ? '10' : '12',
          received_at: new Date().toISOString(),
        }, id ? { id: id.toLowerCase(), source: 'website' } : undefined);
        return collectorResponse({ ok: true }, 200, origin);
      } catch { return collectorResponse({ error: 'storage_unavailable' }, 503, origin); }
    },
  } },
});
