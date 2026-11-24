# Private analytics for /v2 — setup checklist

This is an opt-in, scoped analytics feature, built on TanStack Start server routes and Upstash Redis REST. Do not merge until preview is tested and storage/secrets are configured.

## Scope
- Page tracking only runs when `window.location.pathname` starts with `/v2`; `/v2/analytics-admin` is excluded.
- Site events include page views, tagged CTA clicks, and links to recognized PerfectPay checkout domains. Add `data-funnel-event="upsell_accept"` / `data-funnel-event="upsell_decline"` / `data-funnel-step="upsell1"` to the actual CTA elements for accurate tracking.
- The collector enforces the `/v2` path. A single anonymous `sessionStorage` UUID is used per browser tab.
- Payment webhooks are scoped exclusively to the allowlist `VIREON_PERFECTPAY_PRODUCT_CODES` from the PerfectPay dashboard. Do not use product names as the filter.
- The database stores only approved fields; no customer name, email, phone, document, full URLs, payment details or raw webhook payload.
- The PerfectPay webhook is not proof that a checkout page rendered. Payment events and browser events cannot be joined to a specific session without separately implementing a supported checkout correlation parameter.

## Environment configuration (Vercel project: vireon-funil-v2)
Add server-only environment variables to Preview first:
- `UPSTASH_REDIS_REST_URL`: Redis REST HTTPS endpoint (or `KV_REST_API_URL`)
- `UPSTASH_REDIS_REST_TOKEN`: Redis REST token (or `KV_REST_API_TOKEN`)
- `VIREON_ANALYTICS_ADMIN_TOKEN`: new strong random secret, for private read API
- `PERFECTPAY_WEBHOOK_TOKEN`: PerfectPay public token from webhook configuration; rotate the exposed token first
- `VIREON_PERFECTPAY_PRODUCT_CODES`: comma-separated exact product codes for *only* Vireon main product and its upsells

Never use `VITE_` on these secrets. Do not commit secrets.

## Routes (after deployment)
- `/v2/api/analytics/collect` — browser POST, requires valid /v2 event
- `/v2/api/analytics/events` — administrator GET, Authorization: Bearer <admin token>
- `/v2/api/webhooks/perfectpay` — PerfectPay POST, validates token and product allowlist
- `/v2/analytics-admin` — dashboard; secret entered manually and kept in tab memory, not localStorage

Note: custom domain must actually route `/v2/api/*` to the Vercel TanStack Start application. Test this before registering any PerfectPay webhook.

## Release sequence
1. Verify the current domain routing and project deployment target.
2. Connect a Redis REST database with retention requirements. Confirm preview env variables.
3. Check that `/v2/api/analytics/events` returns 401 without the admin token and 200 with it.
4. Test `/v2/api/analytics/collect` and verify one page view after landing at `/v2`; ensure unrelated paths produce no events.
5. Add actual event labels to the 3 upsell CTAs and verify navigation still works.
6. Test PerfectPay webhook with official sample data using a valid configured product code; ensure wrong tokens are rejected and other products ignored.
7. Only after a 2xx live response, paste the webhook URL into PerfectPay for the selected Vireon products and save it. Keep existing Utmify hook(s) unchanged.
8. Enable production env settings and deploy the reviewed PR.

## Operational caveats
- Redis list retains up to 5,000 recent events for 30 days; dashboard shows up to 300 recent entries. This is a starter implementation, not a high-volume event warehouse.
- Visitors can forge anonymous browser events; this is directional analytics, not billing truth. Consider bot defense / rate limiting before high-volume use.
- The collector retries temporary delivery failures in the browser. Redis deduplicates retried browser events for 24 hours and PerfectPay notifications with the same order and status for 30 days. Historical rows remain as stored.
- Comply with site privacy notice, consent rules applicable to campaign tracking, and data retention policy.
