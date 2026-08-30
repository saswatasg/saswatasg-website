import crypto from 'crypto';
import { z } from 'zod';

const verifySchema = z.object({
  order_id: z.string().min(1).max(100),
  payment_id: z.string().min(1).max(100),
  signature: z.string().min(1).max(256),
});

const rateMap = new Map();
function isRateLimited(req, limit = 20, windowMs = 60_000) {
  const ip = (req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'] || 'unknown');
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const bodyStr = JSON.stringify(req.body || {});
  if (bodyStr.length > 2048) {
    return res.status(413).json({ error: 'Payload too large' });
  }

  if (isRateLimited(req)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const parsed = verifySchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ error: 'Missing required fields: order_id, payment_id, signature' });
  }
  const { order_id, payment_id, signature } = parsed.data;

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return res.status(500).json({ error: 'Server configuration error: missing Razorpay key secret' });
  }

  const generatedSignature = crypto.createHmac('sha256', keySecret).update(`${order_id}|${payment_id}`).digest('hex');

  // Constant-time compare to prevent timing oracle
  let isValid = false;
  try {
    const a = Buffer.from(generatedSignature, 'utf8');
    const b = Buffer.from(signature, 'utf8');
    if (a.length === b.length) {
      isValid = crypto.timingSafeEqual(a, b);
    }
  } catch (_) {
    isValid = false;
  }

  if (isValid) {
    return res.status(200).json({ success: true, message: 'Payment verified successfully' });
  } else {
    return res.status(400).json({ error: 'Invalid payment signature' });
  }
}
