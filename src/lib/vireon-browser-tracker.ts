/**
 * First-party /v2 visitor telemetry.
 * Loaded through the React bundle, so route tracking does not depend on a
 * separately cached external script. No names, answers, email or card fields.
 */
type EventName = 'page_view' | 'step_click' | 'checkout_click' | 'upsell_accept' | 'upsell_decline';
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

const isFunnelPage = (path: string) => (path === '/v2' || path.startsWith('/v2/')) && !(path === '/v2/analytics-admin' || path.startsWith('/v2/analytics-admin/'));
let sessionId = '';
let utmSource = '';
let utmCampaign = '';

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
  void fetch('/v2/api/analytics/collect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
    credentials: 'same-origin',
  }).then((response) => {
    status.lastHttp = String(response.status);
    renderDiagnostics();
    if (!response.ok) console.warn('[Vireon Analytics] HTTP', response.status, event);
  }).catch(() => { status.lastHttp = 'network_error'; renderDiagnostics(); console.warn('[Vireon Analytics] Event transmission failed:', event); });
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
    if (annotated && ['step_click', 'checkout_click', 'upsell_accept', 'upsell_decline'].includes(annotated)) {
      sendFunnelEvent(annotated, element.getAttribute('data-funnel-step') || '');
      return;
    }
    if (element instanceof HTMLAnchorElement) {
      try {
        const url = new URL(element.href, location.href);
        if (url.hostname === 'go.centerpag.com' || url.hostname === 'checkout.centerpag.com') {
          sendFunnelEvent('checkout_click', 'perfectpay_redirect');
        } else if (url.origin === location.origin && isFunnelPage(url.pathname) && url.pathname !== location.pathname) {
          sendFunnelEvent('step_click', url.pathname.slice(0, 64));
        }
      } catch { /* malformed links do not interrupt page navigation */ }
    } else if (element instanceof HTMLButtonElement && element.type !== 'submit') {
      sendFunnelEvent('step_click', 'button');
    }
  }, true);
}

export function trackRoute(_routerPathname?: string) {
  status.routeCalls++;
  renderDiagnostics();
  // TanStack Router's useLocation().pathname can be basepath-relative (e.g. '/quiz').
  // The browser location always contains the public '/v2' prefix.
  if (typeof window === 'undefined' || !isFunnelPage(window.location.pathname)) return;
  sendFunnelEvent('page_view', 'route');
}

