import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Award, GraduationCap, Briefcase, FileText } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { useCaseStudyPopup } from '@/contexts/CaseStudyPopupContext';

const statColors = [
  { bg: 'bg-blush', shadow: '6px 6px 0px 0px #F4EC4A' },
  { bg: 'bg-sky', shadow: '6px 6px 0px 0px #E85D3A' },
  { bg: 'bg-mint', shadow: '6px 6px 0px 0px #625BF6' },
  { bg: 'bg-lemon', shadow: '6px 6px 0px 0px #3DDC91' },
];

function About() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const openCaseStudy = useCaseStudyPopup();

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
          style={{ boxShadow: '10px 10px 0px 0px #E85D3A' }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-lemon text-ink text-xs font-bold border-2 border-black mb-3">
            About Me
          </span>
          <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight">
            Product Manager — shipping outcomes, not features.
          </h1>
          <p className="mt-3 text-sm md:text-base text-ink/70 font-medium max-w-2xl">
            IIT Jodhpur MBA. Product Manager across B2B SaaS, D2C e-commerce, and AI.
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <div className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14"
            style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}>
            <p className="text-base md:text-lg font-black text-ink font-display tracking-tight mb-6">
              I don't just ship features — I ship outcomes that move metrics.
            </p>

            <div className="space-y-5">
              <p className="text-sm md:text-base text-ink/70 leading-relaxed font-medium">
                I started out with a degree in mechanical engineering and a quiet curiosity about how people make decisions. That curiosity led me to IIT Jodhpur for an MBA, where I realised I wasn't interested in building things for the sake of building — I wanted to understand what makes a product click with the person using it.
              </p>

              <p className="text-sm md:text-base text-ink/70 leading-relaxed font-medium">
                At Sierra Living Concepts, I spent a year and a half inside a D2C furniture business, watching how people shop for things that cost real money — sofas, beds, dining sets — and rebuilt the experience around what their behaviour was actually telling us. At LiveKeeping, I landed inside a compliance software company and found a gap nobody had flagged: users were bypassing the product entirely for a workaround. I traced it through the data, surfaced it to leadership, and watched it turn into a company-wide initiative. Now at Upcore, I'm working on something newer — building how enterprises discover and deploy AI agents, from first conversation to production.
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                <button onClick={() => openCaseStudy('cart-checkout')} className="text-xs font-bold bg-blush text-ink px-3 py-1.5 rounded-lg border-2 border-black inline-flex items-center gap-1 hover:bg-white transition-colors cursor-pointer">
                  Checkout optimisation &rarr;
                </button>
                <button onClick={() => openCaseStudy('livekeeping-compliance-gap')} className="text-xs font-bold bg-sky text-ink px-3 py-1.5 rounded-lg border-2 border-black inline-flex items-center gap-1 hover:bg-white transition-colors cursor-pointer">
                  Compliance gap diagnosis &rarr;
                </button>
                <button onClick={() => openCaseStudy('upcore-lead-scoring')} className="text-xs font-bold bg-lemon text-ink px-3 py-1.5 rounded-lg border-2 border-black inline-flex items-center gap-1 hover:bg-white transition-colors cursor-pointer">
                  AI lead scoring &rarr;
                </button>
              </div>
            </div>

            <div className="mt-8 bg-blush border-2 border-black rounded-xl p-5">
              <h2 className="text-xs font-bold text-ink/60 uppercase tracking-wider mb-2">Beyond Work</h2>
              <p className="text-sm font-medium text-ink/70 leading-relaxed">
                I explore digital products with genuine curiosity, cook, shoot photography, watch films analytically, and mentor early-career PMs.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <h2 className="text-sm font-bold text-ink/60 uppercase tracking-wider mb-3">Education</h2>
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
      </div>
    </>
  );
}

export default About;
