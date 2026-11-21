/* Vireon /v2 first-party session tracking. No PII, no cookies, no full URLs. */
(function () {
  if (!/^\/v2(?:\/|$)/.test(window.location.pathname)) return;
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;
  var KEY = 'vireon_v2_session';
  var session;
  try {
    session = sessionStorage.getItem(KEY);
    if (!session) {
      session = crypto.randomUUID();
      sessionStorage.setItem(KEY, session);
    }
  } catch (_) { session = crypto.randomUUID(); }
  var allow = new Set(['page_view', 'checkout_click', 'upsell_accept', 'upsell_decline', 'step_click']);
  function cleanPath(path) {
    return /^\/v2(?:\/|$)/.test(path) ? path.substring(0, 160) : '/v2';
  }
  function send(event, detail) {
    if (!allow.has(event)) return;
    var body = JSON.stringify({
      session_id: session,
      event: event,
      path: cleanPath(location.pathname),
      step: typeof detail === 'string' ? detail.substring(0, 64) : undefined,
      utm_source: (new URLSearchParams(location.search).get('utm_source') || '').substring(0, 80),
      utm_campaign: (new URLSearchParams(location.search).get('utm_campaign') || '').substring(0, 80),
      time: new Date().toISOString()
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/v2/api/analytics/collect', new Blob([body], {type:'application/json'}));
      } else {
        fetch('/v2/api/analytics/collect', { method:'POST', headers:{'Content-Type':'application/json'}, body:body, keepalive:true, credentials:'omit' });
      }
    } catch (_) {}
  }
  send('page_view');
  document.addEventListener('click', function (ev) {
    var target = ev.target && ev.target.closest && ev.target.closest('[data-funnel-event], a[href]');
    if (!target) return;
    var tagged = target.getAttribute('data-funnel-event');
    if (allow.has(tagged)) {
      send(tagged, target.getAttribute('data-funnel-step') || '');
      return;
    }
    if (target.tagName === 'A') {
      try {
        var dest = new URL(target.href, location.href);
        if (/^(?:www\.)?(?:perfectpay\.com\.br|perfectpay\.io|perfectpay\.app)$/.test(dest.hostname)) {
          send('checkout_click');
        }
      } catch (_) {}
    }
  }, true);
  // Public helper for manually tagged CTA buttons. Does not alter navigation.
  window.vireonTrack = send;
})();