/**
 * First-party /v2 visitor telemetry.
 * Loaded through the React bundle, so route tracking does not depend on a
 * separately cached external script. No names, answers, email or card fields.
 */
type EventName = 'page_view' | 'quiz_start' | 'quiz_midpoint' | 'quiz_complete' | 'offer_view' | 'checkout_click' | 'upsell_view' | 'upsell_accept' | 'upsell_decline' | 'thank_you_view';
type TrackerWindow = Window & { vireonTrack?: (event: EventName, detail?: string) => void; __vireonTrackerInstalled?: boolean };
const sessionKey = 'vireon_v2_session';
type TrackerDiagnostic = { installed: boolean; routeCalls: number; eventsAttempted: number; lastEvent: string; lastHttp: string; currentPath: string; dnt: string; gpc: boolean };
const status: TrackerDiagnostic = { installed: false, routeCalls: 0, eventsAttempted: 0, lastEvent: 'none', lastHttp: 'none', currentPath: '', dnt: 'unknown', gpc: false };
export function getFunnelDiagnostics() {
  if (typeof window !== 'undefined') {
    status.currentPath = window.location.pathname;
    status.dnt = String(navigator.doNotTrack ?? 'unset');
    status.gpc = navigator.globalPrivacyControl === true;
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
let utmSource = '';
let utmCampaign = '';
const sentMilestones = new Set<string>();

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

export function sendFunnelEvent(event: EventName, detail = '') {
  if (typeof window === 'undefined') return;
  status.lastEvent = event;
  status.currentPath = location.pathname;
  renderDiagnostics();
  if (!isFunnelPage(location.pathname)) { status.lastHttp = 'blocked:path'; renderDiagnostics(); return; }
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) { status.lastHttp = 'blocked:privacy-signal'; renderDiagnostics(); return; }
  const oncePerSession = new Set<EventName>(['page_view', 'quiz_start', 'quiz_midpoint', 'quiz_complete', 'offer_view', 'checkout_click', 'upsell_view', 'thank_you_view']);
  const dedupeKey = event === 'upsell_view' ? event + ':' + detail : event;
  const dedupeStorageKey = 'vireon_v2_sent:' + getSession() + ':' + dedupeKey;
  if (oncePerSession.has(event)) {
    try { if (sessionStorage.getItem(dedupeStorageKey) === '1') return; } catch { if (sentMilestones.has(dedupeKey)) return; }
    sentMilestones.add(dedupeKey);
    try { sessionStorage.setItem(dedupeStorageKey, '1'); } catch { /* memory fallback */ }
  }
  status.eventsAttempted++;
  renderDiagnostics();
  const params = new URLSearchParams(location.search);
  utmSource ||= (params.get('utm_source') || '').slice(0, 80);
  utmCampaign ||= (params.get('utm_campaign') || '').slice(0, 80);
  const body = JSON.stringify({
    event,
    session_id: getSession(),
    path: location.pathname.slice(0, 160),
    step: detail.slice(0, 64),
    utm_source: utmSource,
    utm_campaign: utmCampaign,
  });
  // Fetch makes failures observable in DevTools; keepalive supports redirects.
  // Collect directly in the private Vercel project, regardless of /v2 proxy routing.
  void fetch(COLLECTOR_URL, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
    credentials: 'omit',
  }).then((response) => {
    status.lastHttp = String(response.status);
    renderDiagnostics();
    if (!response.ok) {
      if (oncePerSession.has(event)) {
        sentMilestones.delete(dedupeKey);
        try { sessionStorage.removeItem(dedupeStorageKey); } catch {}
      }
      console.warn('[Vireon Analytics] HTTP', response.status, event);
    }
  }).catch(() => {
    status.lastHttp = 'network_error';
    if (oncePerSession.has(event)) {
      sentMilestones.delete(dedupeKey);
      try { sessionStorage.removeItem(dedupeStorageKey); } catch {}
    }
    renderDiagnostics();
    console.warn('[Vireon Analytics] Event transmission failed:', event);
  });
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

export function trackRoute(_routerPathname?: string) {
  status.routeCalls++;
  renderDiagnostics();
  if (typeof window === 'undefined') return;
  const rawPath = window.location.pathname;
  const path = rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;
  if (!isFunnelPage(path)) return;
  if (path === '/v2') sendFunnelEvent('page_view', 'landing');
  else if (path === '/v2/quiz') sendFunnelEvent('quiz_start', 'quiz');
  else if (path === '/v2/offer') sendFunnelEvent('offer_view', 'offer');
  else if (['/v2/up1', '/v2/up2', '/v2/up3'].includes(path)) sendFunnelEvent('upsell_view', path.slice(4));
  else if (path === '/v2/thanks') sendFunnelEvent('thank_you_view', 'thanks');
}
