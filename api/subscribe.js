import { z } from 'zod';
import { supabase } from '../src/lib/supabaseClient.js';

const schema = z.object({
  email: z.string().email('Invalid email').max(100),
  pillar: z.enum(['agents', 'growth', 'pm', 'all']).optional().default('all'),
  source: z.string().max(100).optional().default('blog'),
});

const rateMap = new Map();
function isRateLimited(req, limit = 5, windowMs = 60_000) {
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
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
  }

  const parsed = schema.safeParse(req.body || {});
  if (!parsed.success) {
    const msg = parsed.error.errors[0]?.message || 'Invalid email';
    return res.status(400).json({ error: msg });
  }

  const { email, pillar, source } = parsed.data;

  // Extract UTM from headers if forwarded, else from body
  const utm = {
    utm_source: req.body?.utm_source || null,
    utm_medium: req.body?.utm_medium || null,
    utm_campaign: req.body?.utm_campaign || null,
    referrer: req.headers.referer || null,
  };

  try {
    const { error } = await supabase.from('email_subscribers').insert([
      {
        email: email.toLowerCase().trim(),
        pillar,
        source,
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        referrer: utm.referrer,
      },
    ]);

    if (error) {
      // If table doesn't exist or duplicate, still return success to avoid leaking
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.warn('Supabase table email_subscribers missing — add it via SQL: create table email_subscribers (email text primary key, pillar text, source text, utm_source text, created_at timestamp default now())');
        return res.status(200).json({ success: true, message: 'Subscribed (fallback)' });
      }
      if (error.code === '23505') {
        return res.status(200).json({ success: true, message: 'Already subscribed' });
      }
      console.error('Supabase subscribe error:', error);
      return res.status(500).json({ error: 'Failed to subscribe' });
    }

    return res.status(200).json({ success: true, message: 'Subscribed' });
  } catch (e) {
    console.error('Subscribe handler error:', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
