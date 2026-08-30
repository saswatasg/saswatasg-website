import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';
import { Target, Clock, Rocket, Calculator } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

function RoiCalculator() {
  const [sessions, setSessions] = useState(50000);
  const [aov, setAov] = useState(8000);
  const [abandonment, setAbandonment] = useState(73);
  const recoveredOrders = Math.round(sessions * (abandonment / 100) * 0.26);
  const recoveredRevenue = recoveredOrders * aov;
  const gated = recoveredRevenue > 0;

  return (
    <div className="bg-white border-2 border-black rounded-2xl p-6" style={{ boxShadow: '6px 6px 0px 0px #0A0A0A' }}>
      <h3 className="font-display font-black text-ink flex items-center gap-2"><Calculator className="w-5 h-5" /> ROI Calculator — checkout fix</h3>
      <p className="text-sm text-ink/60 font-medium">Based on Sierra 73%→54% (−26%). Enter your numbers.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="text-xs font-black tracking-widest text-ink/50">MONTHLY SESSIONS</label>
          <input type="number" value={sessions} onChange={(e) => setSessions(Number(e.target.value) || 0)} className="mt-1 w-full px-3 py-2 rounded-xl border-2 border-black bg-canvas font-bold" />
        </div>
        <div>
          <label className="text-xs font-black tracking-widest text-ink/50">AOV (₹)</label>
          <input type="number" value={aov} onChange={(e) => setAov(Number(e.target.value) || 0)} className="mt-1 w-full px-3 py-2 rounded-xl border-2 border-black bg-canvas font-bold" />
        </div>
        <div>
          <label className="text-xs font-black tracking-widest text-ink/50">ABANDONMENT %</label>
          <input type="number" value={abandonment} onChange={(e) => setAbandonment(Number(e.target.value) || 0)} className="mt-1 w-full px-3 py-2 rounded-xl border-2 border-black bg-canvas font-bold" />
        </div>
      </div>
      <div className="mt-6 bg-ink text-white rounded-xl p-4 border-2 border-black">
        <p className="text-xs font-black tracking-widest text-white/60">RECOVERED / MONTH AT −26%</p>
        <p className="text-2xl font-black">{recoveredOrders.toLocaleString('en-IN')} orders • ₹{recoveredRevenue.toLocaleString('en-IN')}</p>
        <p className="text-xs font-bold text-white/60 mt-1">Sierra: 480K sessions, 73.1%→53.9%, +47% mobile CVR. Your lift scales with sessions × AOV.</p>
      </div>
      {gated && (
        <div className="mt-4 flex gap-3">
          <Link to="/contact" onClick={() => trackEvent('roadmap', 'roi_cta')} className="px-5 py-2.5 rounded-xl bg-coral text-white border-2 border-black font-black text-sm">Book teardown</Link>
          <Link to="/pay?amount=25000&locked=1" onClick={() => trackEvent('roadmap', 'roi_pay')} className="px-5 py-2.5 rounded-xl bg-white text-ink border-2 border-black font-black text-sm">Pay for audit — ₹25k</Link>
        </div>
      )}
    </div>
  );
}

export default function Roadmap() {
  return (
    <>
      <PageMeta title="Roadmap — Saswata Sengupta" description="Now/Next/Later — what shipped, what's next, and what's later. Plus ROI calculator for checkout fixes." />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-display font-black text-3xl md:text-4xl text-ink">Now / Next / Later</h1>
          <p className="text-sm font-medium text-ink/60 mt-2">Shipping cadence, not promises. Updated 30 Aug 2026.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Now', icon: Target, color: 'bg-mint', items: ['Inventory Agent v2 — MRP leveling', 'BlogHero Sheets sync', 'Pay tiers + Razorpay live', 'Email capture + Supabase /api/subscribe'] },
            { title: 'Next', icon: Clock, color: 'bg-lemon', items: ['ROI calculator (this page)', 'Upcore agent discovery pipeline', 'LinkedIn outreach agent v2', 'Case study video walkthroughs'] },
            { title: 'Later', icon: Rocket, color: 'bg-blush', items: ['Intent — launching 2027', 'DhanPlan widget embed', 'Public changelog', 'Playbook PDF gating'] },
          ].map((col) => (
            <div key={col.title} className={`${col.color} border-2 border-black rounded-2xl p-6`} style={{ boxShadow: '6px 6px 0px 0px #0A0A0A' }}>
              <h2 className="font-display font-black text-ink flex items-center gap-2"><col.icon className="w-5 h-5" />{col.title}</h2>
              <ul className="mt-3 space-y-2">
                {col.items.map((it) => (
                  <li key={it} className="text-sm font-bold text-ink/80 bg-white border-2 border-black rounded-xl px-3 py-2">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <RoiCalculator />
        </div>

        <div className="mt-8 bg-white border-2 border-black rounded-2xl p-6 text-center" style={{ boxShadow: '6px 6px 0px 0px #0A0A0A' }}>
          <h3 className="font-display font-black text-ink">Changelog</h3>
          <p className="text-sm font-medium text-ink/60">30 Aug 2026 — Shipped /pay tiers, email capture, API guardrails, security headers. 31 routes green.</p>
          <Link to="/case-studies/cart-checkout" className="inline-block mt-3 text-sm font-black text-coral underline">See case study →</Link>
        </div>
      </div>
    </>
  );
}
