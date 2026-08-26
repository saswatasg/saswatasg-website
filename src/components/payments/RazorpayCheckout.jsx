import { useState, useEffect } from 'react';

const FALLBACK_KEY = 'rzp_test_TULGGQSc6LJM77';
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || FALLBACK_KEY;

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay')));
      if (window.Razorpay) resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Razorpay script'));
    document.body.appendChild(script);
  });
}

export default function RazorpayCheckout({
  onSuccess = () => {},
  onError = () => {},
  onClose = () => {},
  amount = 50000, // paise (₹500 default - visible test amount)
  currency = 'INR',
  buttonText = 'Pay ₹500 — Support',
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    loadRazorpayScript().catch((e) => setError(e.message));
  }, []);

  const openCheckout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await loadRazorpayScript();

      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, receipt: `rcpt_${Date.now()}` }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to create order');
      const { order_id } = data;
      if (!order_id) throw new Error('No order_id returned');

      const options = {
        key: RAZORPAY_KEY_ID,
        amount,
        currency,
        name: 'Saswata Subhra Sengupta',
        description: 'Support / Consultation Payment',
        order_id,
        theme: { color: '#E85D3A' },
        prefill: { name: '', email: '', contact: '' },
        notes: { source: 'saswatasg.com/contact' },
        handler: async function (response) {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json().catch(() => ({}));
            if (!verifyRes.ok) throw new Error(verifyData.error || 'Verification failed');
            setSuccess(`Payment verified! ID: ${response.razorpay_payment_id}`);
            onSuccess(response);
          } catch (e) {
            setError(e.message);
            onError(e.message);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            onClose();
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp) {
        const msg = resp.error?.description || 'Payment failed';
        setError(msg);
        onError(msg);
      });
      rzp.open();
    } catch (e) {
      setError(e.message);
      onError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white border-2 border-black rounded-2xl p-6 md:p-7" style={{ boxShadow: '6px 6px 0px 0px #0A0A0A' }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-coral rounded-xl border-2 border-black flex items-center justify-center">₹</div>
        <div>
          <h3 className="font-display font-black text-base text-ink">Support the work</h3>
          <p className="text-xs font-bold text-ink/60">Secure payment via Razorpay — UPI / Card / NetBanking</p>
        </div>
      </div>
      <p className="text-sm text-ink/70 font-medium mb-4">Test mode — use card <span className="font-mono bg-canvas border border-black px-1.5 py-0.5 rounded text-xs">4242 4242 4242 4242</span> any future expiry, any CVV.</p>

      <button
        onClick={openCheckout}
        disabled={loading}
        className="w-full bg-coral hover:bg-coral/90 text-white font-black text-sm border-2 border-black rounded-xl px-6 py-3.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ boxShadow: '4px 4px 0px 0px #0A0A0A' }}
      >
        {loading ? 'Opening checkout…' : buttonText}
      </button>

      <p className="text-[11px] font-bold text-ink/40 mt-2 text-center">₹{(amount / 100).toFixed(0)} • {currency} • Powered by Razorpay</p>

      {error && <p className="mt-3 text-sm font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
      {success && <p className="mt-3 text-sm font-bold text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{success}</p>}
    </div>
  );
}

export { RazorpayCheckout };
