import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout';
import PageMeta from '@/components/PageMeta';

const CaseStudySierra = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
    <PageMeta
      title="Case Study: Cart Abandonment Recovery — $329K/mo | Saswata S. Sengupta"
      description="How I recovered $329K/month through checkout redesign at Sierra Living Concepts — problem, diagnosis, options, outcome, and what I'd do differently."
    />
    <CaseStudyLayout
      company="Sierra Living Concepts"
      year="2024"
      title="Cart Abandonment Recovery — $329K/mo"
      description="How a D2C furniture brand was losing $390K/month at checkout — and the three friction points that changed everything."
      cardBg="bg-blush"
      shadowColor="#FF90E8"
      accentColor="#FF90E8"
      accentBg="bg-pink/30"
      stats={[
        { value: '84.47%', label: 'Cart abandonment before' },
        { value: '63.26%', label: 'Cart abandonment after' },
        { value: '$329K', label: 'Monthly revenue recovered' },
      ]}
      sections={[
        {
          label: 'The Problem',
          content: 'Cart abandonment was sitting at 84.47% — roughly $390K/month was being left on the table at checkout. The business knew the number but not why. No funnel instrumentation existed below the PDP level.',
        },
        {
          label: 'My Diagnosis',
          content: 'Set up GA4 custom events across every checkout step, layered Microsoft Clarity heatmaps and session recordings on top. Identified three distinct drop-off clusters: (1) users hitting the shipping estimate step and leaving, (2) mobile users rage-clicking a non-functional promo code field, (3) desktop users abandoning at payment due to a generic error message with no resolution path.',
        },
        {
          label: 'What We Shipped',
          content: 'Transparent shipping cost display on the cart page (before checkout entry). Fixed promo code validation with inline error messaging. Replaced the generic payment error with specific, actionable copy. Shipped in two sprints over 6 weeks.',
        },
      ]}
      options={[
        'A/B test a single-page checkout vs the existing multi-step. Higher risk, longer timeline.',
        'Fix the three specific friction points identified in discovery without rebuilding the flow. Lower risk, faster to ship.',
        'I pushed for Option B — the data already told us exactly where to focus.',
      ]}
      outcome="Cart abandonment dropped from 84.47% to 63.26%. Monthly revenue recovered: $329K. The fix cost two sprints and zero architectural changes."
      lessons="I'd have instrumented the checkout funnel on day one, not after the problem became visible in GMV. The data was always there to collect — we just weren't looking at the right events."
    />
  </motion.div>
);

export default CaseStudySierra;
