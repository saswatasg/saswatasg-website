import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { trackEvent, getUTM } from '@/utils/analytics';

const LEAD_MAGNETS = {
  growth: { title: 'CRO Checklist — 17 fixes', desc: 'The 17-point checklist from the 73%→54% teardown. Same format, new numbers.' },
  agents: { title: 'AI Agent RFP Template', desc: 'The RFP I use for agent discovery — scope, eval, and pricing.' },
  pm: { title: 'AI Workflow Teardown Template', desc: 'The template I use to map AI workflows before writing a spec.' },
  all: { title: '1 teardown/week', desc: 'Same format, new numbers — real before/after, no fluff.' },
};

export default function EmailCapture({ pillar = 'all', source = 'blog' }) {
  const magnet = LEAD_MAGNETS[pillar] || LEAD_MAGNETS.all;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Enter a valid email');
      trackEvent('email_capture', 'field_error', pillar);
      return;
    }
    setStatus('loading');
    setError('');
    trackEvent('email_capture', 'submit', pillar);
    const utm = getUTM();
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, pillar, source, ...utm }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed');
      setStatus('success');
      trackEvent('email_capture', 'success', pillar, 1);
      setEmail('');
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setStatus('error');
      trackEvent('email_capture', 'failed', pillar);
    }
  };

  if (status === 'success') {
    return (
      <div className="border-2 border-black rounded-2xl bg-mint p-6 my-8 flex items-center gap-4" style={{ boxShadow: '6px 6px 0px 0px #0A0A0A' }}>
        <div className="w-10 h-10 bg-white border-2 border-black rounded-xl flex items-center justify-center flex-shrink-0">
          <Check className="w-5 h-5 text-ink" />
        </div>
        <div>
          <p className="font-display font-black text-ink">You’re in — check your email</p>
          <p className="text-sm font-medium text-ink/60">I’ll send the first teardown within a day. No spam, unsubscribe anytime.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-black rounded-2xl bg-white p-6 my-8" style={{ boxShadow: '6px 6px 0px 0px #0A0A0A' }}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-lemon rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-ink" />
        </div>
        <div>
          <h3 className="font-display font-black text-ink">Get {magnet.title}</h3>
          <p className="text-sm font-medium text-ink/60">{magnet.desc}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ana@company.com"
          required
          aria-label="Email address"
          className="flex-1 px-4 py-3 rounded-xl border-2 border-black bg-canvas font-bold text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 rounded-xl bg-ink text-white border-2 border-black font-black text-sm inline-flex items-center justify-center gap-2 hover:bg-coral hover:text-white transition-colors disabled:opacity-60 min-h-[48px]"
          style={{ boxShadow: '4px 4px 0px 0px #0A0A0A' }}
        >
          {status === 'loading' ? 'Joining…' : 'Get it'} <ArrowRight className="w-4 h-4" />
        </button>
      </form>
      {error && <p className="text-xs font-bold text-red-600 mt-2">{error}</p>}
      <p className="text-xs font-bold text-ink/40 mt-2">No spam, unsubscribe anytime. I only email teardowns.</p>
    </div>
  );
}
