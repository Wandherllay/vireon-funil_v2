import { createFileRoute } from '@tanstack/react-router';
import { createHash, timingSafeEqual } from 'node:crypto';
import { analyticsReady, appendEvent, json, readObject } from '../../../lib/vireon-analytics.server';

function secureEqual(a: string, b: string) {
  const aa = Buffer.from(a); const bb = Buffer.from(b);
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}
export const Route = createFileRoute('/api/webhooks/perfectpay')({
  server: { handlers: {
    POST: async ({ request }) => {
      const expected = process.env['PERFECTPAY_WEBHOOK_TOKEN'];
      const allowed = (process.env['VIREON_PERFECTPAY_PRODUCT_CODES'] || '').split(',').map((x) => x.trim()).filter(Boolean);
      if (!expected || !allowed.length || !analyticsReady()) return json({ error: 'not_configured' }, 503);
      const body = await readObject(request);
      if (!body) return json({ error: 'invalid_json' }, 400);
      const { token, product, code: order, sale_status_enum: rawStatus, sale_amount: amount, metadata } = body;
      if (typeof token !== 'string' || !secureEqual(token, expected)) return json({ error: 'unauthorized' }, 401);
      const code = String(product?.code || '');
      if (!allowed.includes(code)) return json({ ok: true, ignored: true });
      const orderCode = typeof order === 'string' || typeof order === 'number' ? String(order).trim() : '';
      const status = typeof rawStatus === 'number' || (typeof rawStatus === 'string' && rawStatus.trim())
        ? Number(rawStatus) : NaN;
      if (!orderCode || !Number.isSafeInteger(status)) return json({ error: 'invalid_sale' }, 400);
      const deliveryId = createHash('sha256').update(JSON.stringify([orderCode, status])).digest('hex');
      // Deliberately omit customer identity, full webhook body, addresses and payment details.
      try {
        await appendEvent({
          source: 'perfectpay', event: 'payment_status', order_code: orderCode.slice(0, 120),
          product_code: code, product_name: String(product?.name || '').slice(0, 120),
          sale_status_enum: status,
          sale_amount: typeof amount === 'number' ? amount : null,
          utm_source: String(metadata?.utm_source || '').slice(0, 80),
          utm_campaign: String(metadata?.utm_campaign || '').slice(0, 80),
          // PerfectPay does not guarantee a session identifier; do not infer individual attribution.
          received_at: new Date().toISOString(),
        }, { id: deliveryId, source: 'perfectpay' });
        return json({ ok: true });
      } catch { return json({ error: 'storage_unavailable' }, 503); }
    },
  } },
});
