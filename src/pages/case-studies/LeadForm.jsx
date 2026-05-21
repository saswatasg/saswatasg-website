import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, FileText } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { containerVariants, itemVariants } from '@/components/case-studies/animations';
import Card from '@/components/case-studies/Card';
import SectionLabel from '@/components/case-studies/SectionLabel';
import ContextBar from '@/components/case-studies/ContextBar';
import BottomNav from '@/components/case-studies/BottomNav';

const LeadForm = () => {
  const color = '#3DDC91';
  const cardBg = 'bg-mint';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16"
    >
      <PageMeta
        title="Case Study: Lead Form Overhaul — +105% | Saswata S. Sengupta"
        description="How I rebuilt the lead capture form at Sierra Living Concepts with Material 3 components, contextual microcopy, and latency fixes — driving lead submissions up 105%."
      />
      <Link
        to="/case-studies"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/50 hover:text-ink mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to all case studies
      </Link>

      <motion.div
        variants={itemVariants}
        className={`${cardBg} border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 relative overflow-hidden`}
        style={{ boxShadow: `12px 12px 0px 0px ${color}` }}
      >
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/30 border-2 border-black rounded-xl rotate-12 hidden md:block" />
        <div className="absolute top-16 right-12 w-12 h-12 bg-white/20 border-2 border-black rounded-lg -rotate-6 hidden md:block" />

        <ContextBar company="Sierra Living Concepts" period="2024" tags={['D2C', 'UX', 'Conversion']} />

        <div className="flex items-center gap-3 mb-2 relative z-10">
          <FileText className="w-8 h-8 text-ink" aria-hidden="true" />
          <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight">
            Lead Form Conversion Overhaul — +105%
          </h1>
        </div>

        <p className="mt-3 text-sm md:text-base text-ink/70 font-medium max-w-3xl relative z-10">
          Diagnosed via rage-click maps and event funnels. Rebuilt with Material 3 components and contextual microcopy. Lead submissions more than doubled.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 relative z-10">
          {[
            { value: '+105%', label: 'Lead submissions uplift' },
            { value: '+38%', label: 'Mobile conversion rate' },
            { value: '2.1x', label: 'Overall lead improvement' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -2 }}
              className="bg-white/50 border-2 border-black rounded-xl p-3 md:p-4 text-center"
            >
              <div className="text-xl md:text-2xl font-display font-black text-ink">{stat.value}</div>
              <p className="text-xs font-bold text-ink/60 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mt-8 space-y-6">
        <Card style={{ boxShadow: `6px 6px 0px 0px ${color}` }}>
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }} />
          <SectionLabel color={color}>The Problem</SectionLabel>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            The lead capture form was converting at 2.14% — well below industry benchmarks. The form had high client-side latency, validation errors that appeared only after submission, and mobile touch targets smaller than the recommended 48px. Field labels were inconsistent, error messages were generic, and there was no inline validation to guide users toward correct input. Rage-click maps showed concentrated frustration around the submit button and the phone number field.
          </p>
        </Card>

        <Card style={{ boxShadow: `6px 6px 0px 0px ${color}` }}>
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }} />
          <SectionLabel color={color}>My Diagnosis</SectionLabel>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Analysed GA4 form interaction events alongside Clarity session recordings and rage-click maps. Identified four primary issues: (1) client-side latency of 3-5 seconds on form field initialisation, (2) no inline validation — users only saw errors after full submission attempt, (3) mobile touch targets at 32px instead of the recommended 48px minimum, and (4) the phone number field had a format restriction that wasn't communicated until after submission. Together, these created a compounding friction effect where each issue amplified the perceived cost of completing the form.
          </p>
        </Card>

        <Card style={{ boxShadow: `6px 6px 0px 0px ${color}` }}>
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }} />
          <SectionLabel color={color}>What We Shipped</SectionLabel>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Rebuilt the form using Material 3 components for consistent styling and interaction patterns. Added real-time inline validation with contextual microcopy that explained each field requirement before submission. Fixed the client-side latency issue by deferring non-critical scripts and lazy-loading third-party widgets. Increased mobile touch targets to 48px minimum. Added a clear format hint for the phone number field with live formatting. Shipped with a before/after A/B test running on 10% of traffic before full rollout.
          </p>
        </Card>
      </div>

      <motion.div variants={itemVariants} className="mt-6">
        <SectionLabel color={color}>Options I Considered</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            'Replace the form with a third-party solution. Faster to implement, but loses control over UX and data flow.',
            'Incremental fixes — address each issue individually. Lower risk but may not address compounding friction effect.',
            'I chose Option C — a full rebuild using Material 3 with all fixes applied simultaneously. The compounding nature of the friction meant that fixing issues partially would still leave the form below its potential. The A/B test validated this: the rebuilt form outperformed the control from day one.',
          ].map((opt, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -3 }}
              className={`${cardBg} border-2 border-black rounded-xl p-4`}
              style={{ boxShadow: `4px 4px 0px 0px ${color}` }}
            >
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-lg border-2 border-black text-xs font-black mb-2"
                style={{ backgroundColor: color, borderColor: color }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <p className="text-xs md:text-sm font-medium text-ink/80">{opt}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.005, y: -2 }}
        className="mt-6 bg-white border-2 border-black rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
        style={{ boxShadow: `8px 8px 0px 0px ${color}` }}
      >
        <div className="absolute -top-4 -left-4 w-16 h-16 rounded-lg rotate-12 border-2 border-black hidden md:block" style={{ backgroundColor: color }} />
        <Lightbulb className="w-8 h-8 mx-auto mb-3" style={{ color }} aria-hidden="true" />
        <p className="text-base md:text-lg font-display font-black text-ink">
          Lead submissions increased by 105% overall, with mobile conversion rate improving by 38%. The A/B test confirmed the rebuild outperformed the control across every segment — new vs returning visitors, mobile vs desktop, and across all traffic sources. The compounding friction hypothesis was correct: fixing all issues simultaneously produced a result greater than the sum of individual fixes.
        </p>
      </motion.div>

      <BottomNav prev="category-discovery" next="upcore-lead-scoring" />
    </motion.div>
  );
};

export default LeadForm;
