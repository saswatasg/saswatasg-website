import { describe, it, expect } from 'vitest';
import crypto from 'crypto';

function verifySignature(order_id, payment_id, signature, secret) {
  const generated = crypto.createHmac('sha256', secret).update(`${order_id}|${payment_id}`).digest('hex');
  try {
    const a = Buffer.from(generated, 'utf8');
    const b = Buffer.from(signature, 'utf8');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch { return false; }
}

describe('verify-payment HMAC', () => {
  const secret = 'test_secret_123';
  const order_id = 'order_ABC123';
  const payment_id = 'pay_XYZ789';
  const validSig = crypto.createHmac('sha256', secret).update(`${order_id}|${payment_id}`).digest('hex');

  it('accepts valid signature with timingSafeEqual', () => {
    expect(verifySignature(order_id, payment_id, validSig, secret)).toBe(true);
  });
  it('rejects tampered signature', () => {
    expect(verifySignature(order_id, payment_id, validSig.slice(0, -1) + '0', secret)).toBe(false);
  });
  it('rejects wrong secret', () => {
    expect(verifySignature(order_id, payment_id, validSig, 'wrong_secret')).toBe(false);
  });
  it('rejects length mismatch', () => {
    expect(verifySignature(order_id, payment_id, 'short', secret)).toBe(false);
  });
});
