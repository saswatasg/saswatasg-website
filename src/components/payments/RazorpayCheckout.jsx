import { useState, useEffect, useRef } from 'react';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function RazorpayCheckout({ 
  onSuccess = () => {}, 
  onError = (err) => {}, 
  onClose = () => {},
  amount = 100, // amount in paise (₹1 minimum)
  currency = 'INR',
  buttonText = 'Pay Now'
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const razorRef = useRef(null);

  // Load Razorpay script dynamically
  useEffect(() => {
    if (!RAZORPAY_KEY_ID) {
      console.error('VITE_RAZORPAY_KEY_ID not configured');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded');
    };
    script.onerror = (error) => {
      console.error('Razorpay script error:', error);
      setError('Failed to load Razorpay script');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [RAZORPAY_KEY_ID]);

  const openCheckout = async () => {
    if (!RAZORPAY_KEY_ID) {
      setError('Razorpay key not configured');
      return onError('Razorpay key not configured');
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create order via backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: currency,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to create order');
      }

      const orderData = await response.json();
      const { order_id } = orderData;

      // Step 2: Open Razorpay modal
      if (!razorRef.current) {
        throw new Error('Razorpay instance not ready');
      }

      razorRef.current.open({
        key: RAZORPAY_KEY_ID,
        order_id,
        amount, // amount in paise
        currency,
        name: 'Saswata Subhra Sengupta',
        description: 'Product / Service Payment',
        theme: {
          color: '#F37254',
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          address: 'Saswata portfolio',
        },
      }, function onPaymentSuccess(response) {
        // Step 3: Send payment details to verify endpoint
        razorRef.current.close();
        onSuccess({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });
      });

      razorRef.current.on('payment.failed', function onPaymentFailed(response) {
        razorRef.current.close();
        const errorMsg = response.error?.description || 'Payment failed';
        setError(errorMsg);
        onError({
          error: errorMsg,
          code: response.error.code,
        });
      });
    } catch (err) {
      setError(err.message);
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!RAZORPAY_KEY_ID) {
    return null; // Or render a placeholder message
  }

  return (
    <div>
      <button
        onClick={openCheckout}
        disabled={loading}
        className="razorpay-button"
        style={{
          background: '#F37254',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.2s',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Processing...' : buttonText}
      </button>
      {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
    </div>
  );
}

export { RazorpayCheckout };