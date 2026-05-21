import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout';
import PageMeta from '@/components/PageMeta';

const CaseStudyUpcore = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
    <PageMeta
      title="Case Study: Webinar Funnel Rebuilt — +51% | Saswata S. Sengupta"
      description="How I rebuilt Upcore's webinar funnel from first principles and drove +51% sustained sign-ups."
    />
    <CaseStudyLayout
      company="Upcore Technologies"
      year="2026"
      title="Webinar Funnel Rebuilt from First Principles — +51%"
      description="A webinar flow with inconsistent volume, no post-session nurture, and three independent failure points — treated as one system."
      cardBg="bg-mint"
      shadowColor="#3DDC91"
      accentColor="#3DDC91"
      accentBg="bg-mint"
      stats={[
        { value: '316', label: 'Baseline sign-ups/mo' },
        { value: '478', label: 'Sign-ups/mo after rebuild' },
        { value: '+51%', label: 'Sustained lift over 6 weeks' },
      ]}
      sections={[
        {
          label: 'The Problem',
          content: 'The webinar registration flow was generating inconsistent sign-up volumes with no clear understanding of where leads were dropping off. The sales team had no post-session nurture sequence. Each webinar was essentially starting from zero.',
        },
        {
          label: 'My Diagnosis',
          content: 'Mapped the full funnel: ad → landing page → registration → reminder → session → follow-up. Found three failure points: the landing page had no above-the-fold value proposition, reminder emails had a 34% open rate but zero click-through to a resource, and there was no follow-up sequence for no-shows (who made up 58% of registrants).',
        },
        {
          label: 'What We Shipped',
          content: 'New landing page with a clear value prop, speaker credibility block, and a single CTA. A 3-email reminder sequence (48h, 24h, 1h before). A 4-email no-show nurture sequence with the session recording and a direct CTA to book a call.',
        },
      ]}
      options={[
        'Rebuild the landing page only. Fastest path, but leaves the email gap intact.',
        'Rebuild the email sequence only. Better engagement, but the landing page still leaks.',
        'Treat the funnel as one system and fix all three layers together. I chose Option C — the math showed fixing any single stage still left most of the conversion gap intact.',
      ]}
      outcome="Monthly webinar sign-ups: from 316 baseline to 478. That's +51%, sustained over the following 6 weeks."
      lessons="I'd have added UTM tracking on the ad level from day one to isolate which channels were driving the highest-quality (not just highest-volume) registrants."
    />
  </motion.div>
);

export default CaseStudyUpcore;
