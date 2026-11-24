/**
 * First-party /v2 visitor telemetry.
 * Loaded through the React bundle, so route tracking does not depend on a
 * separately cached external script. No names, answers, email or card fields.
 */
import { isFunnelEntry } from './vireon-funnel-paths';

type EventName = 'page_view' | 'quiz_start' | 'quiz_midpoint' | 'quiz_complete' | 'offer_view' | 'checkout_click' | 'upsell_view' | 'upsell_accept' | 'upsell_decline' | 'thank_you_view';
type TrackerWindow = Window & { vireonTrack?: (event: EventName, detail?: string) => void; __vireonTrackerInstalled?: boolean };
const sessionKey = 'vireon_v2_session';
type TrackerDiagnostic = { installed: boolean; routeCalls: number; eventsAttempted: number; lastEvent: string; lastHttp: string; currentPath: string; dnt: string; gpc: boolean };
const status: TrackerDiagnostic = { installed: false, routeCalls: 0, eventsAttempted: 0, lastEvent: 'none', lastHttp: 'none', currentPath: '', dnt: 'unknown', gpc: false };
export function getFunnelDiagnostics() {
  if (typeof window !== 'undefined') {
    status.currentPath = window.location.pathname;
    status.dnt = String(navigator.doNotTrack ?? 'unset');
    status.gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
  }
  return { ...status };
}

const TRACKED_HOST = 'www.forcemichaelthompson.app';
const COLLECTOR_URL = 'https://vireon-funil-v2.vercel.app/v2/api/analytics/collect';
const isFunnelPage = (path: string) =>
  typeof window !== 'undefined' &&
  window.location.hostname === TRACKED_HOST &&
  (path === '/v2' || path.startsWith('/v2/')) &&
  !(path === '/v2/analytics-admin' || path.startsWith('/v2/analytics-admin/'));
let sessionId = '';
type Attribution = { utm_source: string; utm_campaign: string };
const attributionKey = 'vireon_v2_attribution';
let attribution: Attribution | undefined;

function captureAttribution(): Attribution {
  const params = new URLSearchParams(location.search);
  const current = {
    utm_source: (params.get('utm_source') || '').trim().slice(0, 80),
    utm_campaign: (params.get('utm_campaign') || '').trim().slice(0, 80),
  };
  if (current.utm_source || current.utm_campaign) {
    // Keep both fields from the same URL. An untagged navigation inherits the last pair.
    if (current.utm_source !== attribution?.utm_source || current.utm_campaign !== attribution?.utm_campaign) {
      attribution = current;
      try { sessionStorage.setItem(attributionKey, JSON.stringify(current)); } catch {}
    }
    return current;
  }
  if (!attribution) {
    attribution = current;
    try {
      const saved = JSON.parse(sessionStorage.getItem(attributionKey) ?? 'null');
      if (typeof saved?.utm_source === 'string' && typeof saved.utm_campaign === 'string') attribution = saved;
    } catch {}
  }
  return attribution ?? current;
}

function getQuestionTrafficGroup(): 'fb' | 'other' {
  return ['fb', 'facebook', 'meta'].includes(captureAttribution().utm_source.toLowerCase()) ? 'fb' : 'other';
}

type PendingEvent = {
  id: string;
  body: string;
  dedupeKey?: string | undefined;
  createdAt: number;
  attempts: number;
  nextAttempt: number;
};

const pendingKey = 'vireon_v2_pending';
const maxPendingAge = 15 * 60 * 1000;
const retryDelays = [1000, 4000, 12000];
const inFlight = new Set<string>();
const delivered = new Set<string>();
let pending: PendingEvent[] | undefined;
let retryTimer: ReturnType<typeof setTimeout> | undefined;

function getPending() {
  if (!pending) {
    try { pending = JSON.parse(sessionStorage.getItem(pendingKey) ?? '[]'); } catch {}
    if (!Array.isArray(pending)) pending = [];
  }
  return pending;
}

function persistPending() {
  try { sessionStorage.setItem(pendingKey, JSON.stringify(getPending())); } catch {}
}

function privacyOptOut() {
  return navigator.doNotTrack === '1' ||
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

function drainPending() {
  clearTimeout(retryTimer);
  if (!isFunnelPage(location.pathname)) return;
  if (privacyOptOut()) {
    pending = [];
    try { sessionStorage.removeItem(pendingKey); } catch {}
    return;
  }

  const now = Date.now();
  const events = getPending();
  pending = events.filter((event) => event.createdAt + maxPendingAge > now);
  if (pending.length !== events.length) persistPending();

  let nextAttempt = Infinity;
  for (const event of pending) {
    if (inFlight.has(event.id)) continue;
    if (event.nextAttempt <= now) void deliverEvent(event);
    else nextAttempt = Math.min(nextAttempt, event.nextAttempt);
  }
  if (Number.isFinite(nextAttempt)) {
    retryTimer = setTimeout(drainPending, nextAttempt - now);
  }
}

async function deliverEvent(event: PendingEvent) {
  inFlight.add(event.id);
  let deliveredSuccessfully = false;
  let retryable = true;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(COLLECTOR_URL, {
      method: 'POST', mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: event.body, keepalive: true, credentials: 'omit',
      signal: controller.signal,
    });
    status.lastHttp = String(response.status);
    deliveredSuccessfully = response.ok;
    retryable = response.status === 408 || response.status === 429 || response.status >= 500;
  } catch {
    status.lastHttp = 'network_error';
  } finally {
    clearTimeout(timeout);
  }

  inFlight.delete(event.id);
  if (getPending().includes(event)) {
    const delay = retryDelays[event.attempts++];
    if (!deliveredSuccessfully && retryable && delay !== undefined) {
      event.nextAttempt = Date.now() + delay;
    } else {
      pending = getPending().filter((item) => item !== event);
      if (deliveredSuccessfully && event.dedupeKey) {
        delivered.add(event.dedupeKey);
        try { sessionStorage.setItem(event.dedupeKey, '1'); } catch {}
      }
    }
    persistPending();
  }
  renderDiagnostics();
  drainPending();
}

function queueEvent(payload: Record<string, string>, dedupeKey?: string) {
  drainPending();
  const events = getPending();
  if (dedupeKey) {
    if (delivered.has(dedupeKey) || events.some((event) => event.dedupeKey === dedupeKey)) return;
    try { if (sessionStorage.getItem(dedupeKey) === '1') return; } catch {}
  }
  if (events.length >= 64) return;
  const id = crypto.randomUUID();
  const now = Date.now();
  events.push({ id, body: JSON.stringify({ ...payload, event_id: id }), dedupeKey,
    createdAt: now, attempts: 0, nextAttempt: now });
  persistPending();
  status.eventsAttempted++;
  drainPending();
}

export type VideoVariant = 'quiz' | 'offer';
export type VideoMetricAction = 'view' | 'error' | 'fallback';

/** Compact aggregate VSL stats, without a session ID or answers in the request. */
export function trackVideoMetric(video: VideoVariant, action: VideoMetricAction) {
  if (typeof window === 'undefined' || !isFunnelPage(location.pathname) || privacyOptOut()) return;
  if ((video !== 'quiz' && video !== 'offer') ||
      (action !== 'view' && action !== 'error' && action !== 'fallback') ||
      (video === 'offer' && action === 'fallback')) return;

  queueEvent({
    event: 'video_' + action, video, traffic: getQuestionTrafficGroup(),
    event_day: new Date().toISOString().slice(0, 10),
  }, 'vireon_v2_videoagg:' + getSession() + ':' + video + ':' + action);
}

export type QuizQuestionId =
  | 'symptom' | 'duration' | 'age_band' | 'ingredients' | 'baking_soda' | 'lemon' | 'spice'
  | 'allergy' | 'tried' | 'goal' | 'sleep' | 'water' | 'routine';

/** One view and advance per question per browser session, without sending answers or a session ID. */
export function trackQuestionMetric(questionId: QuizQuestionId, action: 'view' | 'advance') {
  if (typeof window === 'undefined' || !isFunnelPage(location.pathname) || privacyOptOut()) return;
  queueEvent({
    event: action === 'view' ? 'question_view' : 'question_advance',
    question_id: questionId, traffic: getQuestionTrafficGroup(), quiz_version: '10',
    event_day: new Date().toISOString().slice(0, 10),
  }, 'vireon_v2_qagg:' + getSession() + ':' + questionId + ':' + action);
}

function getSession() {
  if (sessionId) return sessionId;
  try {
    sessionId = sessionStorage.getItem(sessionKey) || crypto.randomUUID();
    sessionStorage.setItem(sessionKey, sessionId);
  } catch { sessionId = crypto.randomUUID(); }
  return sessionId;
}

function renderDiagnostics() {
  if (typeof document === 'undefined' || new URLSearchParams(location.search).get('va_debug') !== '1') return;
  let overlay = document.getElementById('vireon-analytics-diagnostics');
  if (!overlay) {
    overlay = document.createElement('pre');
    overlay.id = 'vireon-analytics-diagnostics';
    overlay.style.cssText = 'position:fixed;z-index:2147483647;bottom:8px;left:8px;max-width:90vw;white-space:pre-wrap;background:#111827;color:#fff;padding:10px;border:2px solid #22c55e;border-radius:6px;font:12px monospace;pointer-events:none';
    document.body.appendChild(overlay);
  }
  overlay.textContent = 'Vireon /v2 analytics diagnostic\\n' + JSON.stringify(getFunnelDiagnostics(), null, 2);
}

const oncePerSession = new Set<EventName>([
  'page_view', 'quiz_start', 'quiz_midpoint', 'quiz_complete', 'offer_view',
  'checkout_click', 'upsell_view', 'thank_you_view',
]);

export function sendFunnelEvent(event: EventName, detail = '') {
  if (typeof window === 'undefined') return;
  status.lastEvent = event;
  status.currentPath = location.pathname;
  if (!isFunnelPage(location.pathname)) { status.lastHttp = 'blocked:path'; renderDiagnostics(); return; }
  if (privacyOptOut()) { status.lastHttp = 'blocked:privacy-signal'; drainPending(); renderDiagnostics(); return; }

  const session = getSession();
  const dedupeKey = event === 'upsell_view' ? event + ':' + detail : event;
  queueEvent({
    event,
    session_id: session,
    path: location.pathname.slice(0, 160),
    step: detail.slice(0, 64),
    ...captureAttribution(),
    quiz_version: '10',
  }, oncePerSession.has(event) ? 'vireon_v2_sent:' + session + ':' + dedupeKey : undefined);
  renderDiagnostics();
}

export function installFunnelTracker() {
  if (typeof window === 'undefined') return;
  const w = window as TrackerWindow;
  if (w.__vireonTrackerInstalled) return;
  w.__vireonTrackerInstalled = true;
  status.installed = true;
  renderDiagnostics();
  w.vireonTrack = sendFunnelEvent;
  document.addEventListener('click', (ev) => {
    if (!isFunnelPage(location.pathname)) return;
    const element = (ev.target as Element | null)?.closest?.('[data-funnel-event], a[href], button');
    if (!element) return;
    const annotated = element.getAttribute('data-funnel-event') as EventName | null;
    if (annotated === 'checkout_click' || annotated === 'upsell_accept' || annotated === 'upsell_decline') {
      sendFunnelEvent(annotated, element.getAttribute('data-funnel-step') || '');
      return;
    }
    // Quiz choice clicks, Continue buttons and internal step links are intentionally ignored.
    if (element instanceof HTMLAnchorElement) {
      try {
        const url = new URL(element.href, location.href);
        if (url.hostname === 'go.centerpag.com' || url.hostname === 'checkout.centerpag.com') {
          sendFunnelEvent('checkout_click', 'perfectpay_redirect');
        }
      } catch { /* preserve navigation */ }
    }
  }, true);
}

export function trackRoute() {
  status.routeCalls++;
  renderDiagnostics();
  if (typeof window === 'undefined') return;
  const rawPath = window.location.pathname;
  const path = rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;
  drainPending();
  if (!isFunnelPage(path)) return;
  if (!privacyOptOut()) captureAttribution();
  // The quiz is the landing experience now; quiz_start fires only on the first answer.
  if (isFunnelEntry(path)) {
    sendFunnelEvent('page_view', path === '/v2/landing' ? 'original_landing' : 'quiz_entry');
  }
  else if (path === '/v2/offer') sendFunnelEvent('offer_view', 'offer');
  else if (['/v2/up1', '/v2/up2', '/v2/up3'].includes(path)) sendFunnelEvent('upsell_view', path.slice(4));
  else if (path === '/v2/thanks') sendFunnelEvent('thank_you_view', 'thanks');
}
