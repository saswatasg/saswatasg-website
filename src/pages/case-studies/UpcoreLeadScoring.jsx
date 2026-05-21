import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, Target } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { containerVariants, itemVariants } from '@/components/case-studies/animations';
import Card from '@/components/case-studies/Card';
import SectionLabel from '@/components/case-studies/SectionLabel';
import ContextBar from '@/components/case-studies/ContextBar';
import BottomNav from '@/components/case-studies/BottomNav';

const UpcoreLeadScoring = () => {
  const color = '#F4EC4A';
  const cardBg = 'bg-lemon';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16"
    >
      <PageMeta
        title="Case Study: AI Lead Scoring — 71.63% Close Rate | Saswata S. Sengupta"
        description="How I built an AI-powered lead scoring and routing engine at Upcore Technologies that drove close rate from 52% to 71.63%."
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

        <ContextBar company="Upcore Technologies" period="2026" tags={['AI', 'B2B', 'GTM']} />

        <div className="flex items-center gap-3 mb-2 relative z-10">
          <Target className="w-8 h-8 text-ink" aria-hidden="true" />
          <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight">
            AI Lead Scoring Engine — 71.63% Close Rate
          </h1>
        </div>

        <p className="mt-3 text-sm md:text-base text-ink/70 font-medium max-w-3xl relative z-10">
          An AI-powered lead assistant that routed, scored, and prioritised inbound prospects — driving close rate from 52% to 71.63%.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 relative z-10">
          {[
            { value: '71.63%', label: 'AI-assisted close rate' },
            { value: '52%', label: 'Baseline close rate' },
            { value: '+19.63pp', label: 'Absolute improvement' },
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
            Inbound leads were being manually triaged by the BDR team with no consistent scoring framework. High-intent prospects were mixed in with low-quality inquiries, response times varied wildly, and there was no systematic way to prioritise leads by likelihood to convert. The team was spending equal time on leads that closed within a week and leads that never responded. Close rate hovered around 52%.
          </p>
        </Card>

        <Card style={{ boxShadow: `6px 6px 0px 0px ${color}` }}>
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }} />
          <SectionLabel color={color}>My Diagnosis</SectionLabel>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Audited 3 months of inbound lead data, cross-referencing lead source, company size, industry vertical, inquiry type, and response time against close outcome. Found two clear patterns: (1) leads from direct website inquiries and referrals closed at 3x the rate of leads from cold channels, and (2) leads responded to within 30 minutes were 4x more likely to convert than those responded to after 2+ hours. The existing manual triage had no mechanism to capture or act on these signals.
          </p>
        </Card>

        <Card style={{ boxShadow: `6px 6px 0px 0px ${color}` }}>
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }} />
          <SectionLabel color={color}>What We Shipped</SectionLabel>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Built an AI-powered lead assistant that automatically scored inbound prospects on a 0-100 scale based on source, company fit, engagement signals, and inquiry type. High-scoring leads were routed to senior BDRs within minutes with a pre-populated context brief. Low-scoring leads entered a nurture sequence. The system included a feedback loop where BDRs could flag scoring mismatches, allowing the model to improve over time. Shipped with a 2-week shadow-mode period for calibration before going live.
          </p>
        </Card>
      </div>

      <motion.div variants={itemVariants} className="mt-6">
        <SectionLabel color={color}>Options I Considered</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            'Buy an off-the-shelf lead scoring tool. Quick to deploy, but limited customisation and ongoing cost.',
            'Build a simple rules-based system. Lower engineering cost, but no learning and rigid scoring logic.',
            'Build an AI-powered scoring engine with a feedback loop. Higher initial investment, but adaptable and capable of improving over time. I chose Option C — the lead volume and revenue at stake justified the investment, and the feedback loop ensured the system would get better, not stale.',
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
          Close rate improved from 52% to 71.63% — a 19.63 percentage point absolute improvement. Response time to high-scoring leads dropped from hours to under 5 minutes. The feedback loop captured 200+ scoring corrections in the first month, progressively improving the model's accuracy. The system paid for itself in additional closed deals within the first quarter.
        </p>
      </motion.div>

      <BottomNav prev="lead-form" next="sierra-lead-allocation" />
    </motion.div>
  );
};

export default UpcoreLeadScoring;
