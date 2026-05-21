import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart, LayoutGrid, FileText, Target } from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const caseStudies = [
  {
    id: 'cart-checkout',
    slug: 'cart-checkout',
    company: 'Sierra Living Concepts',
    year: '2024',
    title: 'Cart & Checkout Abandonment — –26%',
    description: '73.1% → 53.9%. Three friction points. Two sprints. Zero architecture changes.',
    stat: '–26%',
    statLabel: 'Relative reduction in abandonment',
    bg: 'bg-blush',
    shadowColor: '#FF90E8',
    accentClass: 'bg-pink/30',
    tags: ['Checkout UX', 'GA4', 'CRO', 'D2C'],
    icon: ShoppingCart,
  },
  {
    id: 'category-discovery',
    slug: 'category-discovery',
    company: 'Sierra Living Concepts',
    year: '2024',
    title: 'Category Page Redesign — +17%',
    description: '30+ UX issues resolved across desktop and mobile templates in a 4-week sprint driven by GA4 custom events and Clarity heatmaps.',
    stat: '+17%',
    statLabel: 'Session-to-PDP-click conversion',
    bg: 'bg-sky',
    shadowColor: '#625BF6',
    accentClass: 'bg-purple/20',
    tags: ['UX Design', 'GA4', 'Shopify', 'Discovery'],
    icon: LayoutGrid,
  },
  {
    id: 'lead-form',
    slug: 'lead-form',
    company: 'Sierra Living Concepts',
    year: '2024',
    title: 'Lead Form Conversion Overhaul — +105%',
    description: 'Diagnosed via rage-click maps and event funnels. Rebuilt with Material 3 components and contextual microcopy.',
    stat: '+105%',
    statLabel: 'Lead submissions uplift',
    bg: 'bg-mint',
    shadowColor: '#3DDC91',
    accentClass: 'bg-mint',
    tags: ['CRO', 'UX', 'Forms', 'Analytics'],
    icon: FileText,
  },
  {
    id: 'upcore-lead-scoring',
    slug: 'upcore-lead-scoring',
    company: 'Upcore Technologies',
    year: '2026',
    title: 'AI Lead Scoring Engine — 71.63% Close Rate',
    description: 'An AI-powered lead assistant that routed, scored, and prioritised inbound prospects — driving close rate from 52% to 71.63%.',
    stat: '71.63%',
    statLabel: 'AI-assisted close rate',
    bg: 'bg-lemon',
    shadowColor: '#F4EC4A',
    accentClass: 'bg-lemon/30',
    tags: ['AI', 'Lead Scoring', 'Sales Ops', 'Automation'],
    icon: Target,
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

const CaseStudies = () => (
  <>
    <PageMeta
      title="Case Studies | Saswata S. Sengupta"
      description="Four product decisions, explained in full — problem, diagnosis, options, outcome, and what I'd do differently."
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
          Four problems, four approaches, four before/afters. No vanity metrics.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {caseStudies.map((cs, i) => {
          const Icon = cs.icon;
          return (
            <motion.div
              key={cs.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
              className={`${cs.bg} border-2 border-black rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden group`}
              style={{ boxShadow: `8px 8px 0px 0px ${cs.shadowColor}` }}
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/30 border-2 border-black rounded-lg rotate-12 hidden md:block group-hover:rotate-[20deg] transition-all duration-300" />

              <div className="flex items-center gap-2 mb-3 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-ink text-white text-[10px] font-bold border border-black">
                  <Icon className="w-3 h-3" />
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
          );
        })}
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

export default CaseStudies;
