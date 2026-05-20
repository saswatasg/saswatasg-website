import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, GitPullRequest, BarChart3, Users, ArrowRight } from 'lucide-react';

const skills = [
  {
    icon: <Search className="w-8 h-8" aria-hidden="true" />,
    title: "Product Discovery",
    description: "I lead end-to-end discovery — mapping user workflows, diagnosing bottlenecks, and identifying the highest-impact opportunities before writing a single spec."
  },
  {
    icon: <GitPullRequest className="w-8 h-8" aria-hidden="true" />,
    title: "Shipping & Execution",
    description: "From AI agent architecture briefs to checkout flow redesigns — I've shipped 70+ product changes across B2B SaaS and D2C, each with a measurable before/after."
  },
  {
    icon: <BarChart3 className="w-8 h-8" aria-hidden="true" />,
    title: "Data & Analytics",
    description: "GA4, GTM, Looker Studio, custom event tracking. I set up the measurement first, then let the data guide every product decision."
  },
  {
    icon: <Users className="w-8 h-8" aria-hidden="true" />,
    title: "Cross-Functional Leadership",
    description: "I bridge design, engineering, and business — translating user needs into buildable specs and keeping every stakeholder aligned on what matters."
  }
];

const cardColors = ['bg-mint', 'bg-blush', 'bg-sky', 'bg-lemon'];

const SkillCard = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`rounded-card p-6 md:p-8 ${cardColors[index % cardColors.length]} border border-ink/10`}
    >
      <motion.div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center text-ink mb-4" whileHover={{ scale: 1.15 }}>
        {skill.icon}
      </motion.div>
      <h3 className="text-xl font-display font-bold text-ink mb-2">{skill.title}</h3>
      <p className="text-sm text-ink/70 leading-relaxed">{skill.description}</p>
    </motion.div>
  );
};

const WhatIDoSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="work-section" aria-labelledby="skills-heading" className="max-w-[1200px] mx-auto px-4 md:px-6 mt-4">
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 40 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-canvas rounded-card p-8 md:p-14 border border-ink/10"
      >
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-pill bg-lemon/30 text-ink text-sm font-medium mb-4 border border-ink/10">
            How I Work
          </span>
          <h2 id="skills-heading" className="text-ink text-3xl md:text-4xl lg:text-5xl">
            Product Management, <span className="text-ink/60">End to End</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base">
            From discovery to delivery — I own the full product lifecycle and measure everything by impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <a
            href="/experience"
            className="inline-flex items-center gap-2 text-ink/70 hover:text-ink font-medium transition-all text-sm"
          >
            View my experience <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhatIDoSection;
