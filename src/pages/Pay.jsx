import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';
import RazorpayCheckout from '@/components/payments/RazorpayCheckout';
import { Link2, Lock, Unlock, Copy, Check } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

const PRESETS = [100, 500, 1000, 2000, 5000];

function parseAmountParam(v) {
  if (!v) return null;
  const n = Number(v);
  if (!Number.isFinite(n) || n < 1) return null;
  return Math.floor(n);
}

export default function Pay() {
  const [searchParams, setSearchParams] = useSearchParams();
  const amountParam = parseAmountParam(searchParams.get('amount'));
  const lockedParam = searchParams.get('locked') === '1' || searchParams.get('locked') === 'true' || searchParams.get('lock') === '1' || searchParams.get('lock') === 'true';

  const [amount, setAmount] = useState(amountParam || 500);
  const [custom, setCustom] = useState('');
  const [copied, setCopied] = useState(null);

  const locked = lockedParam && amountParam !== null;
  const effectiveAmount = locked ? amountParam : amount;
  const isLocked = locked;

  const shareLink = useMemo(() => {
    if (typeof window === 'undefined') return `/pay?amount=${effectiveAmount}`;
    return `${window.location.origin}/pay?amount=${effectiveAmount}`;
  }, [effectiveAmount]);

  const lockedLink = useMemo(() => {
    if (typeof window === 'undefined') return `/pay?amount=${effectiveAmount}&locked=1`;
    return `${window.location.origin}/pay?amount=${effectiveAmount}&locked=1`;
  }, [effectiveAmount]);

  const handlePreset = (v) => {
    if (isLocked) return;
    setAmount(v);
    setCustom('');
    setSearchParams({ amount: String(v) }, { replace: true });
  };

  const handleCustom = (e) => {
    if (isLocked) return;
    const val = e.target.value;
    setCustom(val);
    const n = Number(val);
    if (Number.isFinite(n) && n >= 1) {
      const rupees = Math.floor(n);
      setAmount(rupees);
      setSearchParams({ amount: String(rupees) }, { replace: true });
    }
  };

  const copy = async (text, key) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
    trackEvent('pay', 'copy_link', key);
  };

  const paise = effectiveAmount * 100;

  return (
    <>
      <PageMeta
        title="Pay — Saswata Sengupta"
        description="Secure payment via Razorpay — UPI, Card, NetBanking. Shareable link with custom amount."
      />
      <div className="max-w-[720px] mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-16">
        <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8" style={{ boxShadow: '8px 8px 0px 0px #0A0A0A' }}>
          <h1 className="font-display font-black text-2xl text-ink flex items-center gap-2">
            Pay {isLocked && <span className="inline-flex items-center gap-1 text-xs bg-ink text-white px-2 py-1 rounded-lg border-2 border-black"><Lock className="w-3 h-3" /> Locked</span>}
          </h1>
          <p className="text-sm text-ink/60 font-medium mt-1">
            {isLocked ? `Amount fixed at ₹${effectiveAmount} by sender — you can't change it.` : 'Choose an amount or enter a custom one. Share the link with anyone.'}
          </p>

          <div className="mt-6">
            <p className="text-xs font-black tracking-widest text-ink/50 mb-2">SELECT AMOUNT</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((v) => (
                <button
                  key={v}
                  onClick={() => handlePreset(v)}
                  disabled={isLocked}
                  className={`px-4 py-2 rounded-xl border-2 border-black text-sm font-black transition-all ${effectiveAmount === v ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-canvas'} ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-[-1px]'}`}
                >
                  ₹{v}
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-ink">₹</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Custom amount"
                  value={isLocked ? String(effectiveAmount) : custom}
                  onChange={handleCustom}
                  disabled={isLocked}
                  className="w-full pl-7 pr-3 py-3 rounded-xl border-2 border-black bg-canvas font-bold text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <span className="text-xs font-bold text-ink/40 whitespace-nowrap">{isLocked ? 'locked' : 'min ₹1'}</span>
            </div>
            {isLocked && (
              <p className="mt-2 text-xs font-bold text-ink/60 flex items-center gap-1"><Lock className="w-3 h-3" /> This link has a locked amount. To pay a different amount, open <a href="/pay" className="underline">/pay</a> without the lock.</p>
            )}
          </div>

          <div className="mt-8">
            <RazorpayCheckout
              amount={paise}
              buttonText={isLocked ? `Pay ₹${effectiveAmount} — Locked` : `Pay ₹${effectiveAmount}`}
              onSuccess={() => trackEvent('pay', 'success', `₹${effectiveAmount}`)}
              onError={() => trackEvent('pay', 'failed', `₹${effectiveAmount}`)}
              onClose={() => trackEvent('pay', 'cancel', `₹${effectiveAmount}`)}
            />
          </div>

          <div className="mt-8 pt-6 border-t-2 border-black/10">
            <p className="text-xs font-black tracking-widest text-ink/50 mb-3 flex items-center gap-1"><Link2 className="w-3 h-3" /> SHARE THIS PAYMENT</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input readOnly value={shareLink} className="flex-1 px-3 py-2 rounded-xl border-2 border-black bg-canvas font-mono text-xs font-bold truncate" />
                <button onClick={() => copy(shareLink, 'link')} className="px-3 py-2 rounded-xl bg-white border-2 border-black font-black text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                  {copied === 'link' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied === 'link' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input readOnly value={lockedLink} className="flex-1 px-3 py-2 rounded-xl border-2 border-black bg-canvas font-mono text-xs font-bold truncate" />
                <button onClick={() => copy(lockedLink, 'locked')} className="px-3 py-2 rounded-xl bg-ink text-white border-2 border-black font-black text-xs flex items-center gap-1 hover:bg-ink/90 transition-colors">
                  {copied === 'locked' ? <Check className="w-3 h-3" /> : <Lock className="w-3 h-3" />} {copied === 'locked' ? 'Copied' : 'Copy locked'}
                </button>
              </div>
              <p className="text-[11px] font-bold text-ink/40">
                <span className="inline-flex items-center gap-1"><Unlock className="w-3 h-3" /> Editable:</span> recipient can change amount &nbsp;•&nbsp; <span className="inline-flex items-center gap-1"><Lock className="w-3 h-3" /> Locked:</span> amount cannot be changed
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs font-bold text-ink/40 text-center mt-4">Secure via Razorpay — UPI / Cards / NetBanking • Live keys • No data stored</p>
      </div>
    </>
  );
}
