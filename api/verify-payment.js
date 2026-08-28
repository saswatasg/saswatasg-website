import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { order_id, payment_id, signature } = req.body;

  if (!order_id || !payment_id || !signature) {
    return res.status(400).json({ error: 'Missing required fields: order_id, payment_id, signature' });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return res.status(500).json({ error: 'Server configuration error: missing Razorpay key secret' });
  }

  // Generate expected signature using HMAC-SHA256
  // Format: order_id + "|" + payment_id
  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${order_id}|${payment_id}`)
    .digest('hex');

  // Compare generated signature with received signature
  const isValid = generatedSignature === signature;

  if (isValid) {
    return res.status(200).json({ success: true, message: 'Payment verified successfully' });
  } else {
    return res.status(400).json({ error: 'Invalid payment signature' });
  }
}