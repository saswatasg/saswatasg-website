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

const SkillCard = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', stiffness: 80 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-card rounded-2xl border border-border/50 p-8 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
          {skill.icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground">{skill.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>
      </div>
    </motion.div>
  );
};

const WhatIDoSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <motion.section
      id="work-section"
      aria-labelledby="skills-heading"
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            How I Work
          </span>
          <h2 id="skills-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Product Management, <span className="text-primary">End to End</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From discovery to delivery — I own the full product lifecycle and measure everything by impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="/experience"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View my experience <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhatIDoSection;
