import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, GitPullRequest, BarChart3, Users, ArrowRight } from 'lucide-react';

const skills = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Product Discovery",
    description: "I lead end-to-end discovery — mapping user workflows, diagnosing bottlenecks, and identifying the highest-impact opportunities before writing a single spec."
  },
  {
    icon: <GitPullRequest className="w-6 h-6" />,
    title: "Shipping & Execution",
    description: "From AI agent architecture briefs to checkout flow redesigns — I've shipped 70+ product changes across B2B SaaS and D2C, each with a measurable before/after."
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Data & Analytics",
    description: "GA4, GTM, Looker Studio, custom event tracking. I set up the measurement first, then let the data guide every product decision."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Cross-Functional Leadership",
    description: "I bridge design, engineering, and business — translating user needs into buildable specs and keeping every stakeholder aligned on what matters."
  }
];

const cardStyles = [
  { bg: 'bg-blush', shadow: '6px 6px 0px 0px #F4EC4A' },
  { bg: 'bg-sky', shadow: '6px 6px 0px 0px #FF90E8' },
  { bg: 'bg-mint', shadow: '6px 6px 0px 0px #625BF6' },
  { bg: 'bg-lemon', shadow: '6px 6px 0px 0px #3DDC91' },
];

const SkillCard = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const style = cardStyles[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.02, rotate: 0.3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={`${style.bg} border-2 border-black rounded-2xl p-6 md:p-8`}
      style={{ boxShadow: style.shadow }}
    >
      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-ink mb-4 border-2 border-black">
        {skill.icon}
      </div>
      <h3 className="text-base font-display font-black text-ink mb-2">{skill.title}</h3>
      <p className="text-sm text-ink/70 leading-relaxed font-medium">{skill.description}</p>
    </motion.div>
  );
};

const WhatIDoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="work-section" className="w-full pt-14 md:pt-18">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14"
          style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
        >
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-pink text-ink text-xs font-bold border-2 border-black mb-3">
              How I Work
            </span>
            <h2 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight">
              Product Management, <span className="text-ink/40">End to End</span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-ink/70 max-w-2xl mx-auto font-medium">
              From discovery to delivery — I own the full product lifecycle and measure everything by impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="relative inline-flex group">
              <div className="absolute inset-0 rounded-lg border-2 border-black bg-pink translate-x-[3px] translate-y-[3px]" />
              <Link
                to="/experience"
                className="relative z-10 bg-ink text-white rounded-lg border-2 border-black px-5 py-2.5 text-sm font-bold inline-flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
              >
                View my experience <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
