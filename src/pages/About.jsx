import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Award, GraduationCap, Briefcase } from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const PhilosophyCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: -1, y: -4 }}
      className="bg-blush rounded-card p-8 border border-ink/10"
    >
      <h3 className="text-xl font-display font-bold text-ink mb-3">{item.statement}</h3>
      <p className="text-sm text-ink/70 leading-relaxed">{item.explanation}</p>
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

function About() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const bioRef = useRef(null);
  const bioInView = useInView(bioRef, { once: true, margin: '-80px' });
  const factsRef = useRef(null);
  const factsInView = useInView(factsRef, { once: true, margin: '-80px' });
  const thinkRef = useRef(null);
  const thinkInView = useInView(thinkRef, { once: true, margin: '-80px' });

  return (
    <>
      <PageMeta />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-canvas rounded-card p-8 md:p-14 border border-ink/10"
        >
          <span className="inline-block px-4 py-1.5 rounded-pill bg-lemon/30 text-ink text-sm font-medium mb-4 border border-ink/10">
            About Me
          </span>
          <h1 className="text-ink">
            Product Manager by day, <span className="text-ink/60">problem solver</span> by nature.
          </h1>
          <p className="mt-4 max-w-2xl">
            IIT Jodhpur MBA. 3+ years shipping products across B2B SaaS, D2C, and e-commerce.
          </p>
        </motion.div>

        <motion.div
          ref={factsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={factsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
        >
          {[
            { icon: <Briefcase className="w-5 h-5" />, value: "3+", label: "Years in Product" },
            { icon: <Award className="w-5 h-5" />, value: "70+", label: "Product Changes Shipped" },
            { icon: <GraduationCap className="w-5 h-5" />, value: "IIT Jodhpur", label: "MBA" },
            { icon: <MapPin className="w-5 h-5" />, value: "Kolkata", label: "Based in India" },
          ].map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-sky rounded-card p-6 text-center border border-ink/10"
            >
              <div className="flex justify-center mb-2 text-ink">{fact.icon}</div>
              <span className="text-xl font-black font-display text-ink block">{fact.value}</span>
              <span className="text-xs text-ink/60">{fact.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={bioRef}
          initial={{ opacity: 0, y: 40 }}
          animate={bioInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-canvas rounded-card p-8 md:p-14 mt-4 border border-ink/10"
        >
          <div className="space-y-6 max-w-3xl">
            <p>
              I've spent the last 3 years building products across B2B SaaS, D2C e-commerce, and AI — from a US-based furniture brand doing $3M+ monthly to an IndiaMART company serving Indian SMBs, and now at Upcore Technologies where I lead product discovery for AI agent solutions.
            </p>
            <p>
              My MBA from IIT Jodhpur gave me the business strategy and analytics layer. The product work at Sierra Living Concepts gave me hands-on experience shipping features that moved real revenue — cart abandonment from 84% to 63%, lead submissions doubled, $329K/month recovered. At LiveKeeping, I diagnosed adoption gaps that nobody had flagged and built the executive narrative to get them fixed.
            </p>
            <p>
              I care more about UX than UI, more about why than what, and more about the problem space than the solution space. I've shipped 70+ product changes — some were big swings, most were small precise interventions that moved a number that mattered.
            </p>
            <p>
              Outside of work, I explore digital products the way some people explore cities — with genuine curiosity about what's working and why. I cook, I shoot photography, I watch films with the same analytical brain I bring to work. I also mentor early-career PMs, because the things that trip people up on their way into product are usually fixable — and mostly nobody tells them.
            </p>
          </div>
        </motion.div>

        <motion.div
          ref={thinkRef}
          initial={{ opacity: 0, y: 40 }}
          animate={thinkInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4"
        >
          <div className="bg-canvas rounded-card p-8 md:p-14 border border-ink/10">
            <div className="mb-8">
              <h2 className="text-ink">How I think</h2>
              <p className="mt-2">Three things I believe, stated plainly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {howIThink.map((item, i) => (
                <PhilosophyCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default About;
