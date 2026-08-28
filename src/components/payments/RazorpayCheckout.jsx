import { useState, useEffect } from 'react';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

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
  amount = 100,
  currency = 'INR',
  buttonText = 'Pay',
  disabled = false,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRazorpayScript().catch((e) => setError(e.message));
  }, []);

  const openCheckout = async () => {
    if (disabled) return;
    if (!RAZORPAY_KEY_ID) {
      setError('Payment is temporarily unavailable. Please try again later.');
      return;
    }
    setLoading(true);
    setError(null);
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
        name: 'Saswata Sengupta',
        description: 'Payment — saswatasg.com',
        order_id,
        theme: { color: '#E85D3A' },
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
            onSuccess(response);
          } catch (e) {
            setError(e.message);
            onError(e.message);
          }
        },
        modal: { ondismiss: () => { setLoading(false); onClose(); } },
      };
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (resp) => {
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
    <div className="w-full">
      <button
        onClick={openCheckout}
        disabled={loading || disabled}
        className="w-full bg-coral hover:bg-coral/90 disabled:bg-ink/20 disabled:text-ink/40 disabled:border-ink/20 disabled:cursor-not-allowed text-white font-black text-base border-2 border-black rounded-xl px-6 py-4 transition-all flex items-center justify-center gap-2"
        style={{ boxShadow: disabled ? 'none' : '4px 4px 0px 0px #0A0A0A' }}
      >
        {loading ? 'Opening checkout…' : buttonText}
      </button>
      {error && <p className="mt-3 text-sm font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
    </div>
  );
}

export { RazorpayCheckout };
