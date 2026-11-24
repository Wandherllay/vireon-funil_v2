// Server-only Upstash Redis REST adapter. Configure in Vercel, never expose credentials in VITE_ variables.
const endpoint = () => process.env['KV_REST_API_URL'] || process.env['UPSTASH_REDIS_REST_URL'];
const token = () => process.env['KV_REST_API_TOKEN'] || process.env['UPSTASH_REDIS_REST_TOKEN'];
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
const eventsKey = 'vireon:v2:events';
const daySeconds = 24 * 60 * 60;
const eventRetention = 30 * daySeconds;
const aggregateRetention = 35 * daySeconds;

// Both keys share a Redis hash slot. Keep the existing list and counters readable.
function dedupeKey(key: string, id: string) {
  return '{' + key + '}:seen:' + id;
}

export function isAnalyticsEventId(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

const appendEventScript = `
  if KEYS[2] and redis.call('EXISTS', KEYS[2]) == 1 then return 0 end
  redis.call('LPUSH', KEYS[1], ARGV[1])
  redis.call('LTRIM', KEYS[1], 0, 4999)
  redis.call('EXPIRE', KEYS[1], ARGV[2])
  if KEYS[2] then redis.call('SET', KEYS[2], '1', 'EX', ARGV[3]) end
  return 1
`;

export async function appendEvent(
  record: Record<string, unknown>, delivery?: { id: string; source: 'website' | 'perfectpay' },
) {
  const keys = delivery ? [eventsKey, dedupeKey(eventsKey, delivery.source + ':' + delivery.id)] : [eventsKey];
  await command('EVAL', appendEventScript, keys.length, ...keys, JSON.stringify(record), eventRetention,
    delivery?.source === 'perfectpay' ? eventRetention : daySeconds);
}

const incrementMetricScript = `
  if KEYS[2] and redis.call('EXISTS', KEYS[2]) == 1 then return 0 end
  redis.call('HINCRBY', KEYS[1], ARGV[1], 1)
  redis.call('EXPIRE', KEYS[1], ARGV[2])
  if KEYS[2] then redis.call('SET', KEYS[2], '1', 'EX', ARGV[3]) end
  return 1
`;

export type MetricDelivery = { id: string; day: string };
function incrementMetric(key: string, field: string, delivery?: MetricDelivery) {
  const keys = delivery ? [key, dedupeKey(key, delivery.id)] : [key];
  return command('EVAL', incrementMetricScript, keys.length, ...keys, field, aggregateRetention, daySeconds);
}

export async function recentEvents(limit = 200) {
  const rows = (await command('LRANGE', eventsKey, 0, Math.min(Math.max(Math.floor(limit), 1), 5000) - 1)) as string[];
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
export type QuizVersion = '10' | '12';
const QUESTION_IDS_V10: readonly QuestionId[] = [
  'symptom', 'duration', 'age_band', 'ingredients', 'allergy',
  'tried', 'goal', 'sleep', 'water', 'routine',
];
const QUESTION_IDS_V12: readonly QuestionId[] = [
  'symptom', 'duration', 'age_band', 'baking_soda', 'lemon', 'spice',
  'allergy', 'tried', 'goal', 'sleep', 'water', 'routine',
];
export type QuestionMetricAction = 'view' | 'advance';
export type QuestionTrafficGroup = 'fb' | 'other';

export async function incrementQuestionMetric(
  question: QuestionId, action: QuestionMetricAction, traffic: QuestionTrafficGroup,
  quizVersion: QuizVersion = '12', delivery?: MetricDelivery,
) {
  const day = delivery?.day ?? new Date().toISOString().slice(0, 10); // UTC calendar day
  // New questions stay isolated from the previous 12-question counters.
  const key = quizVersion === '10'
    ? 'vireon:v2:question-aggregate:v10:' + day
    : 'vireon:v2:question-aggregate:' + day;
  await incrementMetric(key, traffic + ':' + question + ':' + action, delivery);
}

type QuestionCounts = { id: QuestionId; views: number; advances: number };
function questionCounts(ids: readonly QuestionId[]): QuestionCounts[] {
  return ids.map((id) => ({ id, views: 0, advances: 0 }));
}
export async function getQuestionMetrics(period: '24h' | '7d' | '30d' | 'all', quizVersion: QuizVersion = '10') {
  // UTC day buckets: 24h includes today and yesterday; 7d/30d are UTC calendar days.
  // 'all' means retained aggregate history (up to 31 UTC calendar days).
  const days = period === '24h' ? 2 : period === '7d' ? 7 : 31;
  const questionIds = quizVersion === '10' ? QUESTION_IDS_V10 : QUESTION_IDS_V12;
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  const keys = Array.from({ length: days }, (_, offset) => {
    const d = new Date(date.getTime() - offset * 86400000);
    return (quizVersion === '10' ? 'vireon:v2:question-aggregate:v10:' : 'vireon:v2:question-aggregate:') +
      d.toISOString().slice(0, 10);
  });
  const bucketRows = await Promise.all(keys.map((key) => command('HGETALL', key)));
  const fb = questionCounts(questionIds);
  const other = questionCounts(questionIds);
  const byQuestion = new Map(questionIds.map((id, i) => [id, i]));
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
      if (!target) continue;
      if (action === 'view') target.views += amount;
      else target.advances += amount;
      totalCounters += amount;
    }
  }
  return {
    bySource: {
      fb, other,
      all: questionIds.map((id, i) => ({
        id, views: (fb[i]?.views ?? 0) + (other[i]?.views ?? 0),
        advances: (fb[i]?.advances ?? 0) + (other[i]?.advances ?? 0),
      })),
    },
    totalCounters,
    quizVersion,
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
  video: VideoMetricVariant, action: VideoMetricAction, traffic: QuestionTrafficGroup, delivery?: MetricDelivery,
) {
  const day = delivery?.day ?? new Date().toISOString().slice(0, 10);
  const key = 'vireon:v2:video-aggregate:' + day;
  await incrementMetric(key, traffic + ':' + video + ':' + action, delivery);
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
