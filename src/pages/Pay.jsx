import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';
import RazorpayCheckout from '@/components/payments/RazorpayCheckout';
import { Lock, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

function parseAmountParam(v) {
  if (!v) return null;
  const n = Number(v);
  if (!Number.isFinite(n) || n < 1) return null;
  return Math.floor(n);
}

export default function Pay() {
  const [searchParams, setSearchParams] = useSearchParams();
  const amountParam = parseAmountParam(searchParams.get('amount'));
  const isLocked = (searchParams.get('locked') === '1' || searchParams.get('locked') === 'true' || searchParams.get('lock') === '1' || searchParams.get('lock') === 'true') && amountParam !== null;

  const [amount, setAmount] = useState(amountParam ? String(amountParam) : '');
  const [successData, setSuccessData] = useState(null);

  const effectiveAmount = isLocked ? amountParam : (Number(amount) >= 1 ? Math.floor(Number(amount)) : 0);
  const canPay = effectiveAmount >= 1;

  const handleAmountChange = (e) => {
    if (isLocked) return;
    const val = e.target.value.replace(/[^0-9]/g, '');
    // prevent leading zeros, allow empty
    const cleaned = val.replace(/^0+/, '') || (val === '' ? '' : '0');
    // Actually simpler: keep as typed without leading zero stripping for UX
    setAmount(e.target.value.replace(/[^0-9]/g, ''));
    const n = Number(e.target.value.replace(/[^0-9]/g, ''));
    if (Number.isFinite(n) && n >= 1) {
      setSearchParams({ ...(isLocked ? { locked: '1' } : {}), amount: String(Math.floor(n)) }, { replace: true });
    } else if (e.target.value === '') {
      const params = new URLSearchParams(searchParams);
      params.delete('amount');
      setSearchParams(params, { replace: true });
    }
  };

  if (successData) {
    return (
      <>
        <PageMeta title="Payment successful — Saswata Sengupta" description="Your payment was completed securely via Razorpay." />
        <div className="max-w-[560px] mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-16">
          <div className="bg-white border-2 border-black rounded-2xl p-8 md:p-10 text-center" style={{ boxShadow: '8px 8px 0px 0px #0A0A0A' }}>
            <div className="w-16 h-16 bg-green-500 rounded-full border-2 border-black flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-black text-2xl text-ink">Payment successful</h1>
            <p className="text-sm font-bold text-ink/60 mt-2">Thank you — your payment of <span className="text-ink">₹{successData.amount}</span> has been received.</p>
            <div className="mt-6 bg-canvas border-2 border-black rounded-xl p-4 text-left">
              <p className="text-xs font-black tracking-widest text-ink/40">PAYMENT ID</p>
              <p className="font-mono text-sm font-bold text-ink mt-1 break-all">{successData.paymentId}</p>
              <p className="text-xs font-bold text-ink/50 mt-3 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Secured by Razorpay • Receipt sent to your email if provided</p>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="px-6 py-3 rounded-xl bg-ink text-white border-2 border-black font-black text-sm text-center" style={{ boxShadow: '4px 4px 0px 0px #0A0A0A' }}>Back to home</Link>
              <Link to="/contact" className="px-6 py-3 rounded-xl bg-white text-ink border-2 border-black font-black text-sm text-center">Contact</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta title="Pay — Saswata Sengupta" description="Secure payment via Razorpay — UPI, Cards, Net Banking." />
      <div className="max-w-[520px] mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-16">
        <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8" style={{ boxShadow: '8px 8px 0px 0px #0A0A0A' }}>
          <h1 className="font-display font-black text-2xl text-ink">Complete your payment</h1>
          <p className="text-sm font-medium text-ink/60 mt-1">
            {isLocked ? 'This payment link has a fixed amount. You can pay directly below.' : 'Enter the amount you’d like to pay and continue securely.'}
          </p>
          {isLocked && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-black bg-ink text-white px-2.5 py-1 rounded-lg border-2 border-black">
              <Lock className="w-3 h-3" /> Amount locked at ₹{effectiveAmount}
            </p>
          )}

          <div className="mt-6">
            <label htmlFor="pay-amount" className="text-xs font-black tracking-widest text-ink/50">AMOUNT (INR)</label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg text-ink">₹</span>
              <input
                id="pay-amount"
                type="text"
                inputMode="numeric"
                placeholder="Enter amount"
                value={isLocked ? String(effectiveAmount) : amount}
                onChange={handleAmountChange}
                disabled={isLocked}
                className="w-full pl-9 pr-4 py-4 rounded-xl border-2 border-black bg-canvas text-xl font-black text-ink placeholder:text-ink/30 focus:outline-none focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
            {!isLocked && <p className="text-xs font-bold text-ink/40 mt-2">Minimum ₹1 • No extra charges</p>}
          </div>

          <div className="mt-6">
            <RazorpayCheckout
              amount={canPay ? effectiveAmount * 100 : 100}
              buttonText={canPay ? `Pay ₹${effectiveAmount}` : 'Enter an amount'}
              disabled={!canPay}
              onSuccess={(resp) => {
                trackEvent('pay', 'success', `₹${effectiveAmount}`);
                setSuccessData({ amount: effectiveAmount, paymentId: resp.razorpay_payment_id });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onError={() => trackEvent('pay', 'failed', `₹${effectiveAmount}`)}
              onClose={() => trackEvent('pay', 'cancel', `₹${effectiveAmount}`)}
            />
            <p className="text-xs font-bold text-ink/40 text-center mt-3 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" /> 100% secure • UPI • Cards • Net Banking • Wallets
            </p>
          </div>
        </div>

        <Link to="/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink/60 hover:text-ink">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>
    </>
  );
}
