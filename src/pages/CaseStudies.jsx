import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const CaseStudies = () => {
  return (
    <>
      <PageMeta
        title="Case Studies | Saswata S. Sengupta"
        description="Three product decisions, explained in full — problem, diagnosis, options, outcome, and what I'd do differently."
      />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/60 hover:text-ink mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="bg-white border-2 border-black rounded-2xl p-8 md:p-12"
          style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-pink text-ink text-xs font-bold border-2 border-black mb-3">
            Case Studies
          </span>
          <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight">
            How I actually think.
          </h1>
          <p className="mt-3 text-sm md:text-base text-ink/70 font-medium max-w-2xl">
            Three problems, three approaches, three before/afters. No vanity metrics.
          </p>
        </motion.div>

        <div id="sierra-cart" className="bg-blush border-2 border-black rounded-2xl p-8 md:p-10 mt-6" style={{ boxShadow: '6px 6px 0px 0px #F4EC4A' }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black mb-4">Sierra Living Concepts · 2024</span>
          <h2 className="text-xl md:text-2xl font-display font-black text-ink mb-6">Cart Abandonment Recovery — $329K/mo</h2>
          <div className="space-y-5">
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">THE PROBLEM</p>
              <p className="text-sm text-ink/80 font-medium">Cart abandonment was sitting at 84.47% — roughly $390K/month was being left on the table at checkout. The business knew the number but not why. No funnel instrumentation existed below the PDP level.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">MY DIAGNOSIS</p>
              <p className="text-sm text-ink/80 font-medium">Set up GA4 custom events across every checkout step, layered Microsoft Clarity heatmaps and session recordings on top. Identified three distinct drop-off clusters: (1) users hitting the shipping estimate step and leaving, (2) mobile users rage-clicking a non-functional promo code field, (3) desktop users abandoning at payment due to a generic error message with no resolution path.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">OPTIONS I CONSIDERED</p>
              <p className="text-sm text-ink/80 font-medium">Option A: A/B test a single-page checkout vs the existing multi-step. Option B: Fix the three specific friction points identified in discovery without rebuilding the flow. I pushed for Option B — lower risk, faster to ship, and the data already told us exactly where to focus.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">WHAT WE SHIPPED</p>
              <p className="text-sm text-ink/80 font-medium">Transparent shipping cost display on the cart page (before checkout entry). Fixed promo code validation with inline error messaging. Replaced the generic payment error with specific, actionable copy. Shipped in two sprints over 6 weeks.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">WHAT HAPPENED</p>
              <p className="text-sm text-ink/80 font-medium">Cart abandonment: 84.47% → 63.26%. Monthly revenue recovered: $329K.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">WHAT I'D DO DIFFERENTLY</p>
              <p className="text-sm text-ink/80 font-medium">I'd have instrumented the checkout funnel on day one, not after the problem became visible in GMV. The data was always there to collect.</p>
            </div>
          </div>
        </div>

        <div id="livekeeping-gap" className="bg-sky border-2 border-black rounded-2xl p-8 md:p-10 mt-6" style={{ boxShadow: '6px 6px 0px 0px #FF90E8' }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black mb-4">LiveKeeping (IndiaMART) · 2026</span>
          <h2 className="text-xl md:text-2xl font-display font-black text-ink mb-6">The 17:1 Adoption Gap Nobody Had Measured</h2>
          <div className="space-y-5">
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">THE PROBLEM</p>
              <p className="text-sm text-ink/80 font-medium">PRO+ subscribers — the highest-value segment — were generating E-Way Bills outside the product via Tally integrations. Feature usage data showed near-zero adoption of the native E-Way Bill module. This was never flagged as a problem because revenue hadn't dropped.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">MY DIAGNOSIS</p>
              <p className="text-sm text-ink/80 font-medium">Cross-referenced PRO+ plan activation data against module-level event logs. Pulled Tally API call volumes as a proxy for external usage. The ratio came out to 17:1 — for every one bill generated in LiveKeeping, 17 were generated in Tally. Ran 6 user interviews to understand why: the native flow had 4 more steps and no auto-population from existing invoice data.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">OPTIONS I CONSIDERED</p>
              <p className="text-sm text-ink/80 font-medium">Option A: Invest in native module improvement (longer timeline). Option B: Build a Tally sync/import shortcut to meet users where they already are. Option C: Escalate the finding to leadership before committing to either. I chose Option C first — because neither fix made sense without alignment on whether this segment was worth the investment.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">WHAT WE SHIPPED</p>
              <p className="text-sm text-ink/80 font-medium">An executive presentation to the VP/CEO with the gap quantified, the user research summarised, and a recommended investigation path. This unlocked a cross-functional sprint that would not have happened otherwise.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">WHAT HAPPENED</p>
              <p className="text-sm text-ink/80 font-medium">The finding directly greenlit a product investigation and was cited in a C-suite roadmap review. A similar 19:1 gap was subsequently discovered in the E-Invoice module using the same diagnostic method.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">WHAT I'D DO DIFFERENTLY</p>
              <p className="text-sm text-ink/80 font-medium">Module-level funnel instrumentation should have been table stakes from launch. Adoption gaps like this compound silently until a competitor closes them.</p>
            </div>
          </div>
        </div>

        <div id="upcore-webinar" className="bg-mint border-2 border-black rounded-2xl p-8 md:p-10 mt-6" style={{ boxShadow: '6px 6px 0px 0px #625BF6' }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black mb-4">Upcore Technologies · 2026</span>
          <h2 className="text-xl md:text-2xl font-display font-black text-ink mb-6">Webinar Funnel Rebuilt from First Principles — +51%</h2>
          <div className="space-y-5">
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">THE PROBLEM</p>
              <p className="text-sm text-ink/80 font-medium">The webinar registration flow was generating inconsistent sign-up volumes with no clear understanding of where leads were dropping off. The sales team had no post-session nurture sequence. Each webinar was essentially starting from zero.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">MY DIAGNOSIS</p>
              <p className="text-sm text-ink/80 font-medium">Mapped the full funnel: ad → landing page → registration → reminder → session → follow-up. Found three failure points: the landing page had no above-the-fold value proposition, reminder emails had a 34% open rate but zero click-through to a resource, and there was no follow-up sequence for no-shows (who made up 58% of registrants).</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">OPTIONS I CONSIDERED</p>
              <p className="text-sm text-ink/80 font-medium">Option A: Rebuild the landing page only. Option B: Rebuild the email sequence only. Option C: Treat the funnel as one system and fix all three layers together. I made the case for Option C — the math showed that fixing drop-off at any single stage without fixing the others would still leave most of the conversion gap intact.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">WHAT WE SHIPPED</p>
              <p className="text-sm text-ink/80 font-medium">New landing page with a clear value prop, speaker credibility block, and a single CTA. A 3-email reminder sequence (48h, 24h, 1h before). A 4-email no-show nurture sequence with the session recording and a direct CTA to book a call.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">WHAT HAPPENED</p>
              <p className="text-sm text-ink/80 font-medium">Monthly webinar sign-ups: from 316 baseline to 478. That's +51%, sustained over the following 6 weeks.</p>
            </div>
            <div>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">WHAT I'D DO DIFFERENTLY</p>
              <p className="text-sm text-ink/80 font-medium">I'd have added UTM tracking on the ad level from day one to isolate which channels were driving the highest-quality (not just highest-volume) registrants.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudies;
