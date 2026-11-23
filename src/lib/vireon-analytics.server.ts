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
  const rows = (await command('LRANGE', 'vireon:v2:events', 0, Math.min(Math.max(Math.floor(limit), 1), 5000) - 1)) as string[];
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

// Question analytics is aggregate-only. Never store answers, sessions, IPs or UTM campaigns.
// These counters are independent from the 5,000-record detailed event log.
export const QUESTION_IDS = [
  'symptom', 'duration', 'age_band', 'ingredients', 'baking_soda', 'lemon', 'spice',
  'allergy', 'tried', 'goal', 'sleep', 'water', 'routine',
] as const;
export type QuestionId = typeof QUESTION_IDS[number];
export type QuestionMetricAction = 'view' | 'advance';
export type QuestionTrafficGroup = 'fb' | 'other';

export async function incrementQuestionMetric(
  question: QuestionId, action: QuestionMetricAction, traffic: QuestionTrafficGroup,
) {
  const day = new Date().toISOString().slice(0, 10); // UTC calendar day
  const key = 'vireon:v2:question-aggregate:' + day;
  await command('HINCRBY', key, traffic + ':' + question + ':' + action, 1);
  await command('EXPIRE', key, 35 * 24 * 60 * 60);
}

type QuestionCounts = { id: QuestionId; views: number; advances: number };
function questionCounts(): QuestionCounts[] {
  return QUESTION_IDS.map((id) => ({ id, views: 0, advances: 0 }));
}
export async function getQuestionMetrics(period: '24h' | '7d' | '30d' | 'all') {
  // UTC day buckets: 24h includes today and yesterday; 7d/30d are UTC calendar days.
  // 'all' means retained aggregate history (up to 31 UTC calendar days).
  const days = period === '24h' ? 2 : period === '7d' ? 7 : 31;
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  const keys = Array.from({ length: days }, (_, offset) => {
    const d = new Date(date.getTime() - offset * 86400000);
    return 'vireon:v2:question-aggregate:' + d.toISOString().slice(0, 10);
  });
  const bucketRows = await Promise.all(keys.map((key) => command('HGETALL', key)));
  const fb = questionCounts();
  const other = questionCounts();
  const byQuestion = new Map(QUESTION_IDS.map((id, i) => [id, i]));
  let totalCounters = 0;
  for (const raw of bucketRows) {
    // Upstash REST HGETALL normally returns alternating field/value pairs.
    const pairs: Array<[string, unknown]> = Array.isArray(raw)
      ? Array.from({ length: Math.floor(raw.length / 2) }, (_, i) => [String(raw[i * 2]), raw[i * 2 + 1]])
      : raw && typeof raw === 'object' ? Object.entries(raw as Record<string, unknown>) : [];
    for (const [field, value] of pairs) {
      const [traffic, question, action] = field.split(':');
      if ((traffic !== 'fb' && traffic !== 'other') ||
          (action !== 'view' && action !== 'advance')) continue;
      const index = byQuestion.get(question as QuestionId);
      const amount = Number(value);
      if (index === undefined || !Number.isSafeInteger(amount) || amount < 0) continue;
      const target = traffic === 'fb' ? fb[index] : other[index];
      if (action === 'view') target.views += amount;
      else target.advances += amount;
      totalCounters += amount;
    }
  }
  return {
    bySource: {
      fb, other,
      all: QUESTION_IDS.map((id, i) => ({
        id, views: fb[i].views + other[i].views,
        advances: fb[i].advances + other[i].advances,
      })),
    },
    totalCounters,
    granularity: 'UTC_calendar_day',
    daysIncluded: days,
    retentionDays: 35,
    filterIndependent: true,
  };
}

 
// Aggregated VSL playback health. Do not record session IDs, answers or page-level events.
export type VideoMetricVariant = 'quiz' | 'offer';
export type VideoMetricAction = 'view' | 'error' | 'fallback';
export async function incrementVideoMetric(
  video: VideoMetricVariant, action: VideoMetricAction, traffic: QuestionTrafficGroup,
) {
  const day = new Date().toISOString().slice(0, 10);
  const key = 'vireon:v2:video-aggregate:' + day;
  await command('HINCRBY', key, traffic + ':' + video + ':' + action, 1);
  await command('EXPIRE', key, 35 * 24 * 60 * 60);
}

type VideoCounts = { views: number; errors: number; fallbacks: number };
type VideoGroupedCounts = { quiz: VideoCounts; offer: VideoCounts };
function emptyVideoCounts(): VideoGroupedCounts {
  return {
    quiz: { views: 0, errors: 0, fallbacks: 0 },
    offer: { views: 0, errors: 0, fallbacks: 0 },
  };
}
export async function getVideoMetrics(period: '24h' | '7d' | '30d' | 'all') {
  const days = period === '24h' ? 2 : period === '7d' ? 7 : 31;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const keys = Array.from({ length: days }, (_, offset) => {
    const day = new Date(today.getTime() - offset * 86400000).toISOString().slice(0, 10);
    return 'vireon:v2:video-aggregate:' + day;
  });
  const buckets = await Promise.all(keys.map((key) => command('HGETALL', key)));
  const fb = emptyVideoCounts();
  const other = emptyVideoCounts();
  for (const raw of buckets) {
    const pairs: Array<[string, unknown]> = Array.isArray(raw)
      ? Array.from({ length: Math.floor(raw.length / 2) }, (_, i) => [String(raw[i * 2]), raw[i * 2 + 1]])
      : raw && typeof raw === 'object' ? Object.entries(raw as Record<string, unknown>) : [];
    for (const [field, value] of pairs) {
      const [traffic, video, action] = field.split(':');
      if ((traffic !== 'fb' && traffic !== 'other') ||
          (video !== 'quiz' && video !== 'offer') ||
          (action !== 'view' && action !== 'error' && action !== 'fallback')) continue;
      const amount = Number(value);
      if (!Number.isSafeInteger(amount) || amount < 0) continue;
      const metric = action === 'view' ? 'views' : action === 'error' ? 'errors' : 'fallbacks';
      const group = traffic === 'fb' ? fb : other;
      group[video][metric] += amount;
    }
  }
  const all = emptyVideoCounts();
  for (const video of ['quiz', 'offer'] as const) {
    for (const key of ['views', 'errors', 'fallbacks'] as const) {
      all[video][key] = fb[video][key] + other[video][key];
    }
  }
  return { bySource: { fb, other, all }, daysIncluded: days, retentionDays: 35,
    granularity: 'UTC_calendar_day', filterIndependent: true };
}
