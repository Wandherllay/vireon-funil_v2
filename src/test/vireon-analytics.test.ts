import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Route as eventsRoute } from '@/routes/api/analytics/events';
import { Route as collectRoute } from '@/routes/api/analytics/collect';
import { Route as webhookRoute } from '@/routes/api/webhooks/perfectpay';

const eventsUrl = 'https://qa.example/v2/api/analytics/events?period=all';
const collectorUrl = 'https://qa.example/v2/api/analytics/collect';
const webhookUrl = 'https://qa.example/v2/api/webhooks/perfectpay';
const trustedOrigin = 'https://www.forcemichaelthompson.app';
const sessionId = '00000000-0000-4000-8000-000000000001';
const eventId = '00000000-0000-4000-8000-000000000002';
const fetchMock = vi.fn<typeof fetch>();
const redisResponse = (result: unknown) => Response.json({ result });
const redisCommand = (index: number) => JSON.parse(String(fetchMock.mock.calls[index]?.[1]?.body));

const call = (route: typeof eventsRoute | typeof collectRoute | typeof webhookRoute, request: Request) => {
  const handlers = route.options.server?.handlers as Record<string, (input: { request: Request }) => Promise<Response>>;
  return handlers[request.method]!({ request });
};
const post = (url: string, body: Record<string, unknown>) => new Request(url, {
  method: 'POST', headers: { origin: trustedOrigin, 'content-type': 'application/json' },
  body: JSON.stringify(body),
});

describe('Vireon analytics API', () => {
  beforeEach(() => {
    fetchMock.mockReset().mockImplementation(async () => redisResponse([]));
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('KV_REST_API_URL', 'https://redis.invalid');
    vi.stubEnv('KV_REST_API_TOKEN', 'test');
    vi.stubEnv('VIREON_ANALYTICS_ADMIN_TOKEN', 'admin-test');
    vi.stubEnv('PERFECTPAY_WEBHOOK_TOKEN', 'payment-test');
    vi.stubEnv('VIREON_PERFECTPAY_PRODUCT_CODES', 'QA-product');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('counts quiz entries once per session, excluding unrelated page views', async () => {
    const row = { source: 'website', site_host: 'www.forcemichaelthompson.app', quiz_version: '10' };
    fetchMock.mockResolvedValueOnce(redisResponse([
      { ...row, event: 'checkout_click', path: '/v2/offer', session_id: sessionId },
      { ...row, event: 'page_view', path: '/v2/quiz/', session_id: sessionId },
      { ...row, event: 'page_view', path: '/v2', session_id: sessionId },
      { ...row, event: 'page_view', path: '/v2/offer', session_id: eventId },
    ].map((record) => JSON.stringify(record))));

    const response = await call(eventsRoute, new Request(eventsUrl, { headers: { authorization: 'Bearer admin-test' } }));
    expect(response.status).toBe(200);
    const { funnel } = await response.json();
    expect(funnel.landingSessions).toBe(1);
    expect(funnel.observedStages.at(-1)).toMatchObject({ key: 'checkout', count: 1 });
  });

  it('sends a single Redis operation with a stable dedupe key for a retried browser event', async () => {
    const body = { event: 'page_view', event_id: eventId, session_id: sessionId, path: '/v2/quiz' };
    fetchMock.mockRejectedValueOnce(new Error('timeout'));
    expect((await call(collectRoute, post(collectorUrl, body))).status).toBe(503);
    expect((await call(collectRoute, post(collectorUrl, body))).status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(redisCommand(1).slice(0, 5)).toEqual(redisCommand(0).slice(0, 5));
    expect(redisCommand(1).slice(2, 5)).toEqual([2, 'vireon:v2:events', '{vireon:v2:events}:seen:website:' + eventId]);
  });

  it('keeps the original UTC day on retries and accepts previous clients without a delivery id', async () => {
    const day = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    const body = { event: 'question_view', question_id: 'symptom', traffic: 'fb', quiz_version: '10' };
    expect((await call(collectRoute, post(collectorUrl, { ...body, event_id: eventId, event_day: day }))).status).toBe(200);
    expect(redisCommand(0).slice(2, 5)).toEqual([
      2, 'vireon:v2:question-aggregate:v10:' + day, '{vireon:v2:question-aggregate:v10:' + day + '}:seen:' + eventId,
    ]);
    expect((await call(collectRoute, post(collectorUrl, body))).status).toBe(200);
    expect(redisCommand(1)[2]).toBe(1);
  });

  it('shares the webhook dedupe key across equivalent statuses but keeps changes to the status', async () => {
    const body = { token: 'payment-test', product: { code: 'QA-product' }, code: 'QA-order' };
    for (const status of [3, '3', 5]) {
      expect((await call(webhookRoute, post(webhookUrl, { ...body, sale_status_enum: status }))).status).toBe(200);
    }
    expect(redisCommand(0)[4]).toBe(redisCommand(1)[4]);
    expect(redisCommand(2)[4]).not.toBe(redisCommand(0)[4]);
    expect((await call(webhookRoute, post(webhookUrl, { ...body, sale_status_enum: null }))).status).toBe(400);
  });
});
