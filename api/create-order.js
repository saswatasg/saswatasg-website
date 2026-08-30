import Razorpay from 'razorpay';
import { z } from 'zod';

const orderSchema = z.object({
  amount: z.number().int().min(100, 'Amount must be at least 100 paise (₹1)').max(5000000, 'Amount exceeds maximum (₹50,000)'),
  currency: z.enum(['INR']).default('INR'),
  receipt: z.string().max(40).regex(/^[A-Za-z0-9_-]+$/, 'Receipt must be alphanumeric, dash or underscore').optional().default('receipt_1'),
});

// Simple in-memory rate limit: 10 req/min per IP
const rateMap = new Map();
function isRateLimited(req, limit = 10, windowMs = 60_000) {
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

  // Content-length guard (2KB)
  const bodyStr = JSON.stringify(req.body || {});
  if (bodyStr.length > 2048) {
    return res.status(413).json({ error: 'Payload too large' });
  }

  if (isRateLimited(req)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
  }

  const parsed = orderSchema.safeParse(req.body || {});
  if (!parsed.success) {
    const msg = parsed.error.errors[0]?.message || 'Invalid request';
    return res.status(400).json({ error: msg });
  }
  const { amount, currency, receipt } = parsed.data;

  const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return res.status(500).json({ error: 'Server configuration error: missing Razorpay credentials' });
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({ amount, currency, receipt });
    return res.status(200).json({ order_id: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error('Razorpay order creation error:', error?.error || error);
    return res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
}
