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
      whileHover={{ y: -4, scale: 1.02, rotate: 0.3, transition: { duration: 0.2 } }}
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
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
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
            whileHover={{ y: -3, scale: 1.03, rotate: 0.3, transition: { duration: 0.2 } }}
            className={`${c.bg} border-2 border-black rounded-2xl p-6 text-center`}
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
              href="https://drive.google.com/file/d/1z4QJfKgGbVUGM1N3tXtTfPlamug49gGY/view?usp=sharing"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-lemon text-ink text-xs font-bold border-2 border-black mb-4">
            Education
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-lemon border-2 border-black rounded-2xl p-6 md:p-8"
              style={{ boxShadow: '6px 6px 0px 0px #0A0A0A' }}
            >
              <span className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center mb-4">
                <GraduationCap className="w-4 h-4 text-ink" />
              </span>
              <h3 className="font-display font-black text-base md:text-lg text-ink">Indian Institute of Technology Jodhpur</h3>
              <p className="text-sm font-bold text-ink/80 mt-1">MBA — Marketing & Analytics</p>
              <p className="text-xs font-bold text-ink/50 mt-1">2022 – 2024</p>
              <span className="px-2.5 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black mt-3 inline-block">CAT 2021 · 97.69 Percentile</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-blush border-2 border-black rounded-2xl p-6 md:p-8"
              style={{ boxShadow: '6px 6px 0px 0px #0A0A0A' }}
            >
              <span className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center mb-4">
                <GraduationCap className="w-4 h-4 text-ink" />
              </span>
              <h3 className="font-display font-black text-base md:text-lg text-ink">Jalpaiguri Government Engineering College</h3>
              <p className="text-sm font-bold text-ink/80 mt-1">B.Tech — Mechanical Engineering</p>
              <p className="text-xs font-bold text-ink/50 mt-1">2017 – 2021</p>
              <p className="text-xs text-ink/60 mt-2">Foundation in systems thinking and engineering problem-solving</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          ref={bioRef}
          initial={{ opacity: 0, y: 20 }}
          animate={bioInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 mt-6"
          style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
        >
          <div className="bg-pink border-2 border-black rounded-xl p-4 md:p-6 mb-8 -rotate-[0.5deg] hover:rotate-0 transition-all duration-200">
            <p className="text-base md:text-lg font-black text-ink font-display tracking-tight">
              "I don't just ship features — I ship outcomes that move metrics."
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-4">
              <p className="text-sm md:text-base text-ink/70 leading-relaxed font-medium">
                I'm a Product Manager with 3+ years shipping across AI agents, US D2C e-commerce, and B2B SaaS for Indian SMBs. My work sits at the intersection of discovery, analytics, and execution — I find the problem others haven't quantified, and build the fix with a measurable before/after.
              </p>
              <p className="text-sm md:text-base text-ink/70 leading-relaxed font-medium">
                At Sierra Living Concepts I drove a 26% relative reduction in checkout abandonment (73.1% → 53.9%). At LiveKeeping I diagnosed a 17:1 adoption gap that went directly to the CPO. At Upcore I'm now building discovery-to-deployment pipelines for enterprise AI agents.
              </p>
              <p className="text-sm md:text-base text-ink/70 leading-relaxed font-medium">
                IIT Jodhpur MBA. Based in Kolkata. I mentor early-career PMs and write about product craft on LinkedIn.
              </p>
            </div>
            <div className="md:col-span-2 space-y-3">
              <div className="bg-mint border-2 border-black rounded-xl p-4">
                <p className="text-xs font-bold text-ink/60 uppercase tracking-wider">Impact Snapshot</p>
                <div className="mt-2 space-y-2">
                  {[
                    { label: 'Checkout reduction', value: '–26%' },
                    { label: 'Cart abandonment', value: '73.1% → 53.9%' },
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
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14"
            style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
          >
            <div className="mb-6">
              <h2 className="text-ink text-2xl md:text-3xl font-display font-black tracking-tight">How I think</h2>
              <p className="mt-1 text-sm text-ink/70 font-medium">Three things I believe, stated plainly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {howIThink.map((item, i) => (
                <PhilosophyCard key={i} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 mt-6"
          style={{ boxShadow: '10px 10px 0px 0px #3DDC91' }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-mint text-ink text-xs font-bold border-2 border-black mb-3">
            Stack & Tools
          </span>
          <h2 className="text-ink text-xl md:text-2xl font-display font-black tracking-tight">What I reach for when the problem needs solving.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {[
              { category: 'Analytics & Data', badges: ['GA4', 'GTM', 'Looker Studio', 'Microsoft Clarity', 'Mixpanel', 'Excel / Sheets'] },
              { category: 'Product Tooling', badges: ['Figma', 'Jira', 'Notion', 'Linear', 'Trello'] },
              { category: 'CRM & Automation', badges: ['Salesforce', 'Google Apps Script', 'Zapier'] },
              { category: 'Research', badges: ['User interviews', 'Hotjar', 'Survey design', 'Funnel analysis'] },
              { category: 'AI / LLM', badges: ['Prompt engineering', 'Agent workflow design', 'Claude', 'ChatGPT'] },
              { category: 'Dev Fluency', badges: ['React / JSX (read)', 'SQL basics', 'API documentation'] },
            ].map((cluster) => (
              <div key={cluster.category}>
                <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-2">{cluster.category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cluster.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2.5 py-1 rounded-lg bg-white border-2 border-black text-xs font-bold text-ink hover:bg-ink hover:text-white transition-colors cursor-default"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default About;
