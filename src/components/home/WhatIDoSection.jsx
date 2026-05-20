import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, GitPullRequest, BarChart3, Users, ArrowRight } from 'lucide-react';

const skills = [
  {
    icon: <Search className="w-7 h-7" aria-hidden="true" />,
    title: "Product Discovery",
    description: "I lead end-to-end discovery — mapping user workflows, diagnosing bottlenecks, and identifying the highest-impact opportunities before writing a single spec."
  },
  {
    icon: <GitPullRequest className="w-7 h-7" aria-hidden="true" />,
    title: "Shipping & Execution",
    description: "From AI agent architecture briefs to checkout flow redesigns — I've shipped 70+ product changes across B2B SaaS and D2C, each with a measurable before/after."
  },
  {
    icon: <BarChart3 className="w-7 h-7" aria-hidden="true" />,
    title: "Data & Analytics",
    description: "GA4, GTM, Looker Studio, custom event tracking. I set up the measurement first, then let the data guide every product decision."
  },
  {
    icon: <Users className="w-7 h-7" aria-hidden="true" />,
    title: "Cross-Functional Leadership",
    description: "I bridge design, engineering, and business — translating user needs into buildable specs and keeping every stakeholder aligned on what matters."
  }
];

const cardColors = ['bg-mint', 'bg-blush', 'bg-sky', 'bg-lemon'];

const SkillCard = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`rounded-card p-6 md:p-8 ${cardColors[index]} border border-ink/10 transition-all duration-300 hover:shadow-lg`}
    >
      <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center text-ink mb-4">
        {skill.icon}
      </div>
      <h3 className="text-lg font-display font-bold text-ink mb-2">{skill.title}</h3>
      <p className="text-sm text-ink/70 leading-relaxed">{skill.description}</p>
    </motion.div>
  );
};

const WhatIDoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="work-section" className="w-full mt-6">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-card p-8 md:p-12 lg:p-16 border border-ink/10"
        >
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-lemon/40 text-ink text-sm font-semibold mb-4">
              How I Work
            </span>
            <h2 className="text-ink">
              Product Management, <span className="text-ink/50">End to End</span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto">
              From discovery to delivery — I own the full product lifecycle and measure everything by impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/experience"
              className="inline-flex items-center gap-2 text-ink/60 hover:text-ink font-medium transition-all duration-300 text-sm hover:gap-3"
            >
              View my experience <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
