import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Award, GraduationCap, Briefcase, FileText, Quote } from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const PhilosophyCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const colors = ['bg-blush', 'bg-sky', 'bg-mint'];
  const shadows = [
    '6px 6px 0px 0px #F4EC4A',
    '6px 6px 0px 0px #FF90E8',
    '6px 6px 0px 0px #625BF6',
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`${colors[index]} border-2 border-black rounded-2xl p-6 md:p-8 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:rotate-[0.5deg] active:scale-[0.98]`}
      style={{ boxShadow: shadows[index] }}
    >
      <Quote className="w-6 h-6 text-ink/40 mb-3" />
      <h3 className="text-base font-display font-black text-ink mb-2">{item.statement}</h3>
      <p className="text-sm text-ink/70 leading-relaxed font-medium">{item.explanation}</p>
    </motion.div>
  );
};

const howIThink = [
  {
    statement: "UX before UI.",
    explanation: "How something works matters more than how it looks. I push design conversations toward behaviour and flow before we ever talk about colour or component style."
  },
  {
    statement: "The number you're watching might be wrong.",
    explanation: "Most teams optimise for the metric that's easy to measure. I spend time asking whether the right thing is being measured — and whether the data infrastructure is actually trustworthy."
  },
  {
    statement: "Discovery isn't a phase. It's a habit.",
    explanation: "The best product decisions I've seen come from teams that never stopped being curious about their users. I don't treat discovery as a sprint gate — I treat it as continuous background work."
  }
];

const statColors = [
  { bg: 'bg-blush', shadow: '6px 6px 0px 0px #F4EC4A' },
  { bg: 'bg-sky', shadow: '6px 6px 0px 0px #FF90E8' },
  { bg: 'bg-mint', shadow: '6px 6px 0px 0px #625BF6' },
  { bg: 'bg-lemon', shadow: '6px 6px 0px 0px #3DDC91' },
];

function About() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const bioRef = useRef(null);
  const bioInView = useInView(bioRef, { once: true, margin: '-80px' });

  return (
    <>
      <PageMeta />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14"
          style={{ boxShadow: '10px 10px 0px 0px #FF90E8' }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-lemon text-ink text-xs font-bold border-2 border-black mb-3">
            About Me
          </span>
          <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight">
            Product Manager — shipping outcomes, not features.
          </h1>
          <p className="mt-3 text-sm md:text-base text-ink/70 font-medium max-w-2xl">
            IIT Jodhpur MBA. Product Manager across B2B SaaS, D2C e-commerce, and AI — shipping features that move revenue.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { icon: <Briefcase className="w-5 h-5" />, value: '3+', label: 'Years in Product' },
            { icon: <Award className="w-5 h-5" />, value: '70+', label: 'Product Changes Shipped' },
            { icon: <GraduationCap className="w-5 h-5" />, value: 'IIT Jodhpur', label: 'MBA' },
            { icon: <MapPin className="w-5 h-5" />, value: 'Kolkata', label: 'Based in India' },
          ].map((fact, i) => {
            const c = statColors[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`${c.bg} border-2 border-black rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] hover:rotate-[0.5deg] active:scale-[0.97]`}
                style={{ boxShadow: c.shadow }}
              >
                <div className="flex justify-center mb-2 text-ink">{fact.icon}</div>
                <span className="text-xl font-black font-display text-ink block">{fact.value}</span>
                <span className="text-xs font-bold text-ink/60">{fact.label}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <div className="relative inline-flex group">
            <div className="absolute inset-0 rounded-lg border-2 border-black bg-purple translate-x-[3px] translate-y-[3px]" />
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 bg-white text-ink rounded-lg border-2 border-black px-5 py-2.5 text-sm font-bold inline-flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
            >
              <FileText className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>

        <motion.div
          ref={bioRef}
          initial={{ opacity: 0, y: 20 }}
          animate={bioInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 mt-6"
          style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
        >
          <div className="bg-pink border-2 border-black rounded-xl p-4 md:p-6 mb-8 -rotate-[0.5deg]">
            <p className="text-base md:text-lg font-black text-ink font-display tracking-tight">
              "I don't just ship features — I ship outcomes that move metrics."
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-4">
              <p className="text-sm md:text-base text-ink/70 leading-relaxed font-medium">
                I've spent the last 3 years building products across B2B SaaS, D2C e-commerce, and AI — from a US-based furniture brand doing $3M+ monthly to an IndiaMART company serving Indian SMBs, and now at Upcore Technologies where I lead product discovery for AI agent solutions.
              </p>
              <p className="text-sm md:text-base text-ink/70 leading-relaxed font-medium">
                My MBA from IIT Jodhpur gave me the business strategy and analytics layer. At Sierra Living Concepts, I shipped features that moved real revenue: cart abandonment from 84% to 63% ($329K/month recovered), lead submissions doubled (+105%), and pricing tools generating $152K/month. At LiveKeeping, I diagnosed a 17:1 adoption gap between Tally and LiveKeeping's native module — went unnoticed until I quantified it and presented the case to the VP/CEO.
              </p>
              <p className="text-sm md:text-base text-ink/70 leading-relaxed font-medium">
                I care more about UX than UI, more about why than what, and more about the problem space than the solution space. I've shipped 70+ product changes — from checkout redesigns that moved conversion by 8 points to CRM automation that unlocked $113K/month recurring revenue.
              </p>
            </div>
            <div className="md:col-span-2 space-y-3">
              <div className="bg-mint border-2 border-black rounded-xl p-4">
                <p className="text-xs font-bold text-ink/60 uppercase tracking-wider">Impact Snapshot</p>
                <div className="mt-2 space-y-2">
                  {[
                    { label: 'Revenue recovered', value: '$329K/mo' },
                    { label: 'Cart abandonment', value: '84% → 63%' },
                    { label: 'Lead submissions', value: '+105%' },
                    { label: 'Products shipped', value: '70+' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between border-b-2 border-black/20 pb-1 last:border-0">
                      <span className="text-xs font-bold text-ink/60">{stat.label}</span>
                      <span className="text-sm font-black text-ink">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blush border-2 border-black rounded-xl p-4">
                <p className="text-xs font-bold text-ink/60 uppercase tracking-wider">Beyond Work</p>
                <p className="text-sm font-medium text-ink/70 mt-1 leading-relaxed">
                  I explore digital products with genuine curiosity, cook, shoot photography, watch films analytically, and mentor early-career PMs.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6">
          <div className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14">
            <div className="mb-6">
              <h2 className="text-ink text-2xl md:text-3xl font-display font-black tracking-tight">How I think</h2>
              <p className="mt-1 text-sm text-ink/70 font-medium">Three things I believe, stated plainly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {howIThink.map((item, i) => (
                <PhilosophyCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
