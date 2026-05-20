import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Award, GraduationCap, Briefcase } from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{children}</h2>
);

const SectionSubtitle = ({ children }) => (
  <p className="text-muted-foreground mb-8">{children}</p>
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 15, delay: i * 0.1 }
  })
};

const PhilosophyCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      whileHover={{ y: -5 }}
      className="group bg-card rounded-xl border border-border/50 p-6 relative overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="absolute -top-4 -left-2 text-8xl text-primary/10 font-serif leading-none select-none" aria-hidden="true">"</div>
      <h3 className="text-lg font-semibold text-foreground mb-3 relative z-10 group-hover:text-primary transition-colors">{item.statement}</h3>
      <p className="text-sm text-muted-foreground relative z-10 leading-relaxed">{item.explanation}</p>
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

  return (
    <>
      <PageMeta />
      <div className="max-w-4xl mx-auto py-12 px-4 flex-grow">
        {/* Page Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 80 }}
          className="text-center md:text-left mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            About Me
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Product Manager by day, <span className="text-primary">problem solver</span> by nature.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            IIT Jodhpur MBA. 3+ years shipping products across B2B SaaS, D2C, and e-commerce.
          </p>
        </motion.div>

        {/* Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {[
            { icon: <Briefcase className="w-4 h-4" />, value: "3+", label: "Years in Product" },
            { icon: <Award className="w-4 h-4" />, value: "70+", label: "Product Changes Shipped" },
            { icon: <GraduationCap className="w-4 h-4" />, value: "IIT Jodhpur", label: "MBA" },
            { icon: <MapPin className="w-4 h-4" />, value: "Kolkata", label: "Based in India" },
          ].map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-card border border-border/50 rounded-xl p-5 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-2 text-primary">{fact.icon}</div>
              <span className="text-xl font-bold text-primary block">{fact.value}</span>
              <span className="text-xs text-muted-foreground">{fact.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Narrative Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-foreground/80 leading-relaxed text-lg mb-20"
        >
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
        </motion.div>

        {/* How I Think */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left mb-8"
          >
            <SectionTitle>How I think</SectionTitle>
            <SectionSubtitle>Three things I believe, stated plainly.</SectionSubtitle>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howIThink.map((item, i) => (
              <PhilosophyCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
