import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout';
import PageMeta from '@/components/PageMeta';

const CaseStudyLiveKeeping = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
    <PageMeta
      title="Case Study: The 17:1 Adoption Gap Nobody Had Measured | Saswata S. Sengupta"
      description="How I diagnosed a 17:1 adoption gap at LiveKeeping that went unnoticed — and took it directly to the CPO."
    />
    <CaseStudyLayout
      company="LiveKeeping (IndiaMART)"
      year="2026"
      title="The 17:1 Adoption Gap Nobody Had Measured"
      description="The highest-value segment was generating E-Way Bills outside the product. Nobody noticed because revenue hadn't dropped yet."
      cardBg="bg-sky"
      shadowColor="#625BF6"
      accentColor="#625BF6"
      accentBg="bg-purple/20"
      stats={[
        { value: '17:1', label: 'Adoption gap diagnosed' },
        { value: '19:1', label: 'E-Invoice gap (follow-up)' },
        { value: 'CEO', label: 'Weekly reporting established' },
      ]}
      sections={[
        {
          label: 'The Problem',
          content: 'PRO+ subscribers — the highest-value segment — were generating E-Way Bills outside the product via Tally integrations. Feature usage data showed near-zero adoption of the native E-Way Bill module. This was never flagged as a problem because revenue hadn\'t dropped.',
        },
        {
          label: 'My Diagnosis',
          content: 'Cross-referenced PRO+ plan activation data against module-level event logs. Pulled Tally API call volumes as a proxy for external usage. The ratio came out to 17:1 — for every one bill generated in LiveKeeping, 17 were generated in Tally. Ran 6 user interviews to understand why: the native flow had 4 more steps and no auto-population from existing invoice data.',
        },
        {
          label: 'What We Shipped',
          content: 'An executive presentation to the VP/CEO with the gap quantified, the user research summarised, and a recommended investigation path. This unlocked a cross-functional sprint that would not have happened otherwise.',
        },
      ]}
      options={[
        'Invest in native module improvement. Longer timeline, higher engineering cost.',
        'Build a Tally sync/import shortcut to meet users where they already are.',
        'Escalate the finding to leadership before committing to either. I chose Option C first — alignment first, then investment.',
      ]}
      outcome="The finding directly greenlit a product investigation and was cited in a C-suite roadmap review. A similar 19:1 gap was subsequently discovered in the E-Invoice module using the same diagnostic method."
      lessons="Module-level funnel instrumentation should have been table stakes from launch. Adoption gaps like this compound silently until a competitor closes them."
    />
  </motion.div>
);

export default CaseStudyLiveKeeping;
