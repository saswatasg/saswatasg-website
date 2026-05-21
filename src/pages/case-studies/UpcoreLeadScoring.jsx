import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { containerVariants, itemVariants } from '@/components/case-studies/animations';
import Card from '@/components/case-studies/Card';
import ContextBar from '@/components/case-studies/ContextBar';
import BottomNav from '@/components/case-studies/BottomNav';

const UpcoreLeadScoring = () => {
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

      {/* HERO */}
      <motion.div
        variants={itemVariants}
        className="bg-lemon border-2 border-black rounded-2xl p-10 md:p-16"
        style={{ boxShadow: '12px 12px 0px 0px #F4EC4A' }}
      >
        <ContextBar company="Upcore Technologies" period="2026" tags={['AI', 'B2B', 'GTM']} />
        <h1 className="font-display font-black text-4xl md:text-6xl text-ink leading-tight">
          52% close rate wasn&#39;t a BDR problem. It was a triage problem. Only 10% of leads are ready to buy — the system had to find the right 10%.
        </h1>
        <p className="text-xl text-ink/60 font-medium mt-4 max-w-4xl">
          Built an AI-powered lead assistant that scored, routed, and prioritised inbound prospects using 9+9 research signals — and a feedback loop that kept making it smarter.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { value: '71.63%', label: 'AI-Assisted Close Rate', sub: 'Up from 52% baseline', color: 'text-ink' },
            { value: '52%', label: 'Baseline Close Rate', sub: 'Pre-scoring manual triage', color: 'text-ink' },
            { value: '75+', label: 'Priority Threshold', sub: 'Score to qualify as hot lead', color: 'text-ink' },
            { value: '24 hrs', label: 'Contact SLA', sub: 'High-scoring leads', color: 'text-ink' },
          ].map((m, i) => (
            <div key={i} className="bg-white/50 border border-ink/20 rounded-xl p-4">
              <div className={`font-display font-black text-3xl ${m.color}`}>{m.value}</div>
              <p className="text-xs font-bold text-ink/80 mt-1">{m.label}</p>
              <p className="text-[10px] text-ink/50 mt-0.5">{m.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-6 bg-white border-2 border-black rounded-xl p-4 flex flex-col md:flex-row gap-4 text-sm font-medium text-ink/70"
      >
        <span>Role: Product Manager — System design, scoring logic, BDR workflow integration, feedback loop</span>
        <span className="hidden md:block">|</span>
        <span>Platform: Upcore Technologies · Enterprise AI agent platform · B2B inbound sales</span>
        <span className="hidden md:block">|</span>
        <span>Duration: 6 weeks build + 2-week shadow mode</span>
      </motion.div>

      {/* SECTION 1: BEFORE STATE */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">BEFORE STATE</h2>

        <Card>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Inbound leads were being manually triaged by the BDR team with no consistent scoring framework. High-intent prospects sat in the same queue as low-quality inquiries. Response times varied wildly — a lead from a Fortune 500 CFO could wait as long as a student inquiry. There was no systematic way to prioritise by likelihood to convert. Close rate hovered at 52%.
          </p>
        </Card>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-lemon border-2 border-black rounded-xl p-5 mt-4">
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            The BDR team was oversaturated — hundreds of leads per week with no filtering mechanism. High-value leads from direct website inquiries and referrals were getting lost among cold inbound. Meanwhile, response time for hot leads drifted to 4-6 hours, sometimes longer. Every hour of delay reduced close probability by measurable margins.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-sky border-2 border-black rounded-xl p-5 mt-4">
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Three months of lead data existed but had never been analysed for scoring patterns. The team operated on intuition — senior BDRs &#39;had a feel&#39; for which leads would convert. But that intuition couldn&#39;t scale, couldn&#39;t be audited, and was lost whenever someone took a day off.
          </p>
        </motion.div>
      </div>

      {/* SECTION 2: HOW I FOUND IT */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">THE DISCOVERY</h2>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-lemon border-2 border-black rounded-2xl p-8">
          <p className="text-lg font-display font-black text-ink mb-6">Audited 3 months of lead data. Two patterns changed everything.</p>

          {[
            'Leads from direct website inquiries and referrals closed at 3x the rate of leads from cold channels. Source was the strongest single predictor of conversion — but the routing system treated all sources identically.',
            'Leads responded to within 30 minutes were 4x more likely to convert than those responded to after 2+ hours. Time-to-response was the second-strongest predictor — but there was no SLA enforcement or escalation for slow responses.',
            'Cross-referenced company size, industry vertical, and inquiry type against close outcomes. Built a weighted scoring model that assigned point values to each signal. The model predicted historical close outcomes with 83% accuracy in retrospective testing.',
          ].map((step, i) => (
            <div key={i} className="flex gap-3 mb-4 last:mb-0">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">{i + 1}</div>
              <motion.div whileHover={{ scale: 1.01, y: -2 }} className="bg-white border-2 border-black rounded-xl p-4 flex-1">
                <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">{step}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-ink border-2 border-black rounded-xl p-5 mt-4">
          <p className="text-white text-sm md:text-base font-medium leading-relaxed">
            The data was conclusive: the existing manual triage was operating at a fraction of its potential. Not because the BDRs weren&#39;t skilled — because they didn&#39;t have the system to apply their skills where it mattered most. A scoring engine wouldn&#39;t replace the BDRs; it would let them focus on the 10% of leads that drove 60% of revenue.
          </p>
        </motion.div>
      </div>

      {/* SECTION 3: WHAT WE BUILT */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">WHAT WE BUILT</h2>

        <Card>
          <p className="text-lg font-display font-black text-ink mb-6">Two-stage scoring engine. AI-powered. Human-verified. Built to learn from every interaction.</p>

          {[
            'Two-stage scoring: Prospect Score (lead source, company fit, industry vertical, inquiry type, engagement signals) and Potential Score (budget indicators, decision-maker status, timeline urgency, purchase authority, integration fit). Combined into a 0-100 overall score.',
            'High-scoring leads (75+) routed to senior BDRs within minutes with a pre-populated context brief — company name, industry, inquiry type, and recommended talking points. Low-scoring leads entered an automated nurture sequence with personalised email cadence.',
            'Built a feedback loop where BDRs could flag scoring mismatches with one click — marking leads as over-scored or under-scored. The model ingested these flags weekly and adjusted signal weights. 200+ corrections in the first month, each one making the system more accurate.',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 mb-3 last:mb-0 bg-canvas border-2 border-black rounded-xl p-4">
              <span className="text-xs font-black text-ink/40 w-8">{i + 1}.</span>
              <p className="text-sm text-ink/80 font-medium leading-relaxed">{item}</p>
            </div>
          ))}
        </Card>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            { label: 'Scoring Stages', value: 'Prospect + Potential', bg: 'bg-lemon' },
            { label: 'Feedback Corrections', value: '200+ (Month 1)', bg: 'bg-sky' },
            { label: 'Calibration Period', value: '2-week shadow mode', bg: 'bg-mint' },
          ].map((k, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} className={`${k.bg} border-2 border-black rounded-2xl p-5 text-center`}>
              <p className="text-xs font-black text-ink/40 uppercase">{k.label}</p>
              <p className="font-display font-black text-xl text-ink mt-2">{k.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SECTION 4: OUTCOME */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">WHAT THIS CHANGED</h2>

        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Close Rate', value: '52 → 71.63%', bg: 'bg-lemon' },
            { label: 'Response Time (Hot Leads)', value: 'Hours → <5 min', bg: 'bg-mint' },
            { label: 'Scoring Accuracy', value: '83% retrospective', bg: 'bg-sky' },
            { label: 'BDR Focus Shift', value: 'All → top 10%', bg: 'bg-blush' },
          ].map((k, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} className={`${k.bg} border-2 border-black rounded-2xl p-6 text-center`}>
              <p className="text-xs font-black text-ink/40 uppercase">{k.label}</p>
              <p className="font-display font-black text-3xl text-ink mt-2">{k.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-ink border-2 border-black rounded-2xl p-6 mt-4">
          <p className="text-white font-display font-black text-lg">19.63 percentage point absolute improvement. The system paid for itself in additional closed deals within the first quarter.</p>
          <p className="text-white/70 text-sm mt-2 leading-relaxed">
            Response time to high-scoring leads dropped from hours to under 5 minutes. The feedback loop captured 200+ scoring corrections in the first month, progressively improving the model&#39;s accuracy. BDRs reported higher job satisfaction — they were spending time on leads that converted, not leads that never responded.
          </p>
          <p className="text-[#F4EC4A] font-black mt-3">AI didn&#39;t replace the BDRs. It gave them back their time.</p>
        </motion.div>
      </div>

      {/* SECTION 5: RETROSPECTIVE */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">RETROSPECTIVE</h2>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-lemon border-2 border-black rounded-2xl p-7">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">1</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                The two-week shadow mode was the single best decision in the rollout. Running the scoring engine silently alongside the existing triage let us validate the model, catch edge cases, and build BDR trust before any lead was actually routed differently. Never skip the shadow mode.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">2</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                The feedback loop was essential but I underestimated how quickly BDRs would adopt it. 200+ corrections in month one meant the model was improving weekly. Giving users agency over the system&#39;s accuracy created ownership — BDRs felt responsible for making the scoring smarter.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">3</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                I should have started with a simpler rules-based system and added AI complexity later. The AI scoring was powerful, but 80% of the improvement came from the basic signals — source, response time, company size. The AI layer was the top 20%. Ship the simple version first, then layer intelligence on top.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav prev="lead-form" next="sierra-lead-allocation" />
    </motion.div>
  );
};

export default UpcoreLeadScoring;
