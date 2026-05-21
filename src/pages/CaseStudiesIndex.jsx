import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const caseStudies = [
  {
    id: 'sierra-cart',
    slug: 'sierra-cart',
    company: 'Sierra Living Concepts',
    year: '2024',
    title: 'Cart Abandonment Recovery — $329K/mo',
    description: 'How a D2C furniture brand was losing $390K/month at checkout — and the three friction points that changed everything.',
    stat: '$329K',
    statLabel: 'Monthly revenue recovered',
    bg: 'bg-blush',
    shadowColor: '#FF90E8',
    accentClass: 'bg-pink/30',
    tags: ['Checkout UX', 'GA4', 'CRO', 'D2C'],
  },
  {
    id: 'livekeeping-gap',
    slug: 'livekeeping-gap',
    company: 'LiveKeeping (IndiaMART)',
    year: '2026',
    title: 'The 17:1 Adoption Gap Nobody Had Measured',
    description: 'The highest-value segment was generating E-Way Bills outside the product. Nobody noticed because revenue hadn\'t dropped yet.',
    stat: '17:1',
    statLabel: 'Adoption gap diagnosed',
    bg: 'bg-sky',
    shadowColor: '#625BF6',
    accentClass: 'bg-purple/20',
    tags: ['Data Analytics', 'B2B SaaS', 'Gap Analysis', 'Executive'],
  },
  {
    id: 'upcore-webinar',
    slug: 'upcore-webinar',
    company: 'Upcore Technologies',
    year: '2026',
    title: 'Webinar Funnel Rebuilt — +51%',
    description: 'A webinar flow with inconsistent volume, no post-session nurture, and three independent failure points — treated as one system.',
    stat: '+51%',
    statLabel: 'Sustained lift over 6 weeks',
    bg: 'bg-mint',
    shadowColor: '#3DDC91',
    accentClass: 'bg-mint',
    tags: ['Funnel Design', 'Growth', 'Email Strategy', 'AI'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const CaseStudiesIndex = () => (
  <>
    <PageMeta
      title="Case Studies | Saswata S. Sengupta"
      description="Three product decisions, explained in full — problem, diagnosis, options, outcome, and what I'd do differently."
    />
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16"
    >
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 relative overflow-hidden"
        style={{ boxShadow: '12px 12px 0px 0px #0A0A0A' }}
      >
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-pink border-2 border-black rounded-xl rotate-12 hidden md:block" />
        <div className="absolute top-16 right-10 w-10 h-10 bg-lemon border-2 border-black rounded-lg -rotate-6 hidden md:block" />

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-pink text-ink text-xs font-bold border-2 border-black mb-3 relative z-10">
          Case Studies
        </span>
        <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight relative z-10">
          How I actually think.
        </h1>
        <p className="mt-3 text-sm md:text-base text-ink/70 font-medium max-w-2xl relative z-10">
          Three problems, three approaches, three before/afters. No vanity metrics.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {caseStudies.map((cs, i) => (
          <motion.div
            key={cs.id}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
            className={`${cs.bg} border-2 border-black rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden group`}
            style={{ boxShadow: `8px 8px 0px 0px ${cs.shadowColor}` }}
          >
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/30 border-2 border-black rounded-lg rotate-12 hidden md:block group-hover:rotate-[20deg] transition-all duration-300" />

            <div className="flex items-center gap-2 mb-3 relative z-10">
              <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-ink text-white text-[10px] font-bold border border-black">
                {cs.company}
              </span>
              <span className="text-[10px] font-bold text-ink/40">{cs.year}</span>
            </div>

            <h2 className="text-base md:text-lg font-display font-black text-ink mb-2 relative z-10 leading-tight">
              {cs.title}
            </h2>

            <p className="text-xs md:text-sm text-ink/70 font-medium leading-relaxed mb-4 flex-grow relative z-10">
              {cs.description}
            </p>

            <div className={`${cs.accentClass} border-2 border-black rounded-xl p-3 text-center mb-4 relative z-10`}>
              <div className="text-xl md:text-2xl font-display font-black text-ink">{cs.stat}</div>
              <p className="text-[10px] font-bold text-ink/60">{cs.statLabel}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-lg bg-white text-ink/60 text-[10px] font-bold border-2 border-black"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              to={`/case-studies/${cs.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-ink/60 transition-colors relative z-10 group/link"
            >
              Read Full Case Study
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div variants={cardVariants} className="mt-6 text-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-bold text-ink/50 hover:text-ink transition-colors group"
        >
          ← Back to Projects
        </Link>
      </motion.div>
    </motion.div>
  </>
);

export default CaseStudiesIndex;
