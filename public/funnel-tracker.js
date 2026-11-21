/* Vireon /v2 only. Anonymous journey events; no input or quiz answers captured. */
(function () {
  var active = function () {
    return /^\/v2(?:\/|$)/.test(location.pathname) &&
      !/^\/v2\/analytics-admin(?:\/|$)/.test(location.pathname);
  };
  if (!active() || navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;
  var key = 'vireon_v2_session';
  var session;
  try {
    session = sessionStorage.getItem(key) || crypto.randomUUID();
    sessionStorage.setItem(key, session);
  } catch (_) { session = crypto.randomUUID(); }
  var allowed = new Set(['page_view', 'checkout_click', 'upsell_accept', 'upsell_decline', 'step_click']);
  var lastPath = location.pathname;
  var lastUrl = location.pathname + location.search + location.hash;
  var initialParams = new URLSearchParams(location.search);
  var utmSource = (initialParams.get('utm_source') || '').slice(0, 80);
  var utmCampaign = (initialParams.get('utm_campaign') || '').slice(0, 80);

  function send(event, detail, path) {
    if (!active() || !allowed.has(event)) return;
    var currentPath = path || location.pathname;
    if (!/^\/v2(?:\/|$)/.test(currentPath)) return;
    var body = JSON.stringify({
      session_id: session, event: event, path: currentPath.slice(0, 160),
      step: typeof detail === 'string' ? detail.slice(0, 64) : undefined,
      utm_source: utmSource, utm_campaign: utmCampaign,
      time: new Date().toISOString()
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/v2/api/analytics/collect', new Blob([body], { type: 'application/json' }));
      } else {
        fetch('/v2/api/analytics/collect', { method: 'POST',
          headers: { 'Content-Type': 'application/json' }, body: body,
          keepalive: true, credentials: 'omit' });
      }
    } catch (_) {}
  }
  function onRoute() {
    var url = location.pathname + location.search + location.hash;
    if (url === lastUrl) return;
    lastUrl = url;
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      if (active()) send('page_view');
    }
  }
  // TanStack Router uses the History API; popstate alone misses router.history.push.
  ['pushState', 'replaceState'].forEach(function (method) {
    var original = history[method];
    history[method] = function () {
      var result = original.apply(this, arguments);
      onRoute();
      return result;
    };
  });
  window.addEventListener('popstate', onRoute);
  window.addEventListener('hashchange', onRoute);

  send('page_view');
  document.addEventListener('click', function (ev) {
    if (!active()) return;
    var el = ev.target && ev.target.closest &&
      ev.target.closest('[data-funnel-event], a[href], button');
    if (!el) return;
    var explicit = el.getAttribute('data-funnel-event');
    if (allowed.has(explicit)) {
      send(explicit, el.getAttribute('data-funnel-step') || '');
      return;
    }
    if (el.tagName === 'A') {
      try {
        var destination = new URL(el.href, location.href);
        // The Vireon checkout URLs in this project use go.centerpag.com.
        if (destination.protocol === 'https:' && destination.hostname === 'go.centerpag.com') {
          send('checkout_click', 'perfectpay_redirect');
        } else if (destination.origin === location.origin &&
                   /^\/v2(?:\/|$)/.test(destination.pathname) &&
                   destination.pathname !== location.pathname) {
          send('step_click', destination.pathname.slice(0, 64));
        }
      } catch (_) {}
    } else if (el.tagName === 'BUTTON' && el.type !== 'submit') {
      // Only a generic click; never collect button labels, form values or quiz answers.
      send('step_click', 'button');
    }
  }, true);
  window.vireonTrack = send;
})();
