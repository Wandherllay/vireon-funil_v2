// Server-only Upstash Redis REST adapter. Configure in Vercel, never expose credentials in VITE_ variables.
const endpoint = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
export function analyticsReady() { return Boolean(endpoint() && token()); }
async function command(...args: (string | number)[]) {
  if (!analyticsReady()) throw new Error('Analytics storage not configured');
  const response = await fetch(endpoint()!, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Analytics storage unavailable');
  const data = await response.json();
  if (data.error) throw new Error('Analytics storage error');
  return data.result;
}
export async function appendEvent(record: Record<string, unknown>) {
  const key = 'vireon:v2:events';
  await command('LPUSH', key, JSON.stringify(record));
  await command('LTRIM', key, 0, 4999);
  await command('EXPIRE', key, 60 * 60 * 24 * 30);
}
export async function recentEvents(limit = 200) {
  const rows = (await command('LRANGE', 'vireon:v2:events', 0, Math.min(limit, 500) - 1)) as string[];
  return rows.map((row) => JSON.parse(row));
}
export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });
}
export async function readObject(request: Request) {
  if (Number(request.headers.get('content-length') || 0) > 16384) return null;
  try {
    const body = await request.text();
    if (body.length > 16384) return null;
    const data = JSON.parse(body);
    return data && typeof data === 'object' && !Array.isArray(data) ? data as Record<string, any> : null;
  } catch { return null; }
}
