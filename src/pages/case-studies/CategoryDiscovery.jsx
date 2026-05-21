import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, LayoutGrid } from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const CategoryDiscovery = () => {
  const company = 'Sierra Living Concepts';
  const year = '2024';
  const color = '#625BF6';
  const cardBg = 'bg-sky';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16"
    >
      <PageMeta
        title="Case Study: Category Page Redesign — +17% | Saswata S. Sengupta"
        description="How a 4-week sprint guided by GA4 custom events and Microsoft Clarity heatmaps resolved 30+ UX issues and lifted session-to-PDP-click conversion by 17%."
      />
      <Link
        to="/case-studies"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/60 hover:text-ink mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to all case studies
      </Link>

      <div className={`${cardBg} border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 relative overflow-hidden`} style={{ boxShadow: `12px 12px 0px 0px ${color}` }}>
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/30 border-2 border-black rounded-xl rotate-12 hidden md:block" />
        <div className="absolute top-16 right-12 w-12 h-12 bg-white/20 border-2 border-black rounded-lg -rotate-6 hidden md:block" />

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black mb-4 relative z-10">
          {company} · {year}
        </span>

        <div className="flex items-center gap-3 mb-2 relative z-10">
          <LayoutGrid className="w-8 h-8 text-ink" />
          <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight">
            Category Page Redesign — +17%
          </h1>
        </div>

        <p className="mt-3 text-sm md:text-base text-ink/70 font-medium max-w-3xl relative z-10">
          30+ UX issues resolved across desktop and mobile templates in a 4-week sprint driven by GA4 custom events and Clarity heatmaps.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 relative z-10">
          {[
            { value: '+17%', label: 'Session-to-PDP-click' },
            { value: '30+', label: 'UX issues resolved' },
            { value: '4 weeks', label: 'Sprint duration' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -2 }}
              className="bg-purple/20 border-2 border-black rounded-xl p-3 md:p-4 text-center"
            >
              <div className="text-xl md:text-2xl font-display font-black text-ink">{stat.value}</div>
              <p className="text-[10px] font-bold text-ink/60 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <motion.div
          variants={itemVariants}
          whileHover={{ x: 2, transition: { duration: 0.15 } }}
          className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{ boxShadow: `6px 6px 0px 0px ${color}` }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }} />
          <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-2" style={{ color }}>
            The Problem
          </p>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Category pages were underperforming across both desktop and mobile templates. Session-to-PDP-click conversion was below benchmark, and the team had a long list of anecdotal UX complaints but no data-backed prioritisation. The category page acted as the primary browse-to-product gateway — any friction here multiplied across every downstream metric.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ x: 2, transition: { duration: 0.15 } }}
          className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{ boxShadow: `6px 6px 0px 0px ${color}` }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }} />
          <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-2" style={{ color }}>
            My Diagnosis
          </p>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Set up GA4 custom events for every category interaction — filter use, sort changes, product card clicks, pagination. Ran Clarity heatmaps and scroll maps across the top 10 category pages by traffic volume. The data revealed 30+ distinct UX issues including: inconsistent card sizing causing layout shift, missing hover states on product cards, filter dropdowns that overlapped content, and mobile touch targets below recommended minimum size.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ x: 2, transition: { duration: 0.15 } }}
          className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{ boxShadow: `6px 6px 0px 0px ${color}` }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }} />
          <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-2" style={{ color }}>
            What We Shipped
          </p>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Rebuilt desktop and mobile category page templates in a 4-week sprint. Fixed all 30+ UX issues prioritised by severity score (frequency × impact). Aligned components with the Figma design library to ensure consistency. Added skeleton loading states, optimised image dimensions, standardised card components, and improved filter interaction patterns. Each fix was validated with before/after heatmaps.
          </p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mt-6">
        <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-3" style={{ color }}>
          Options I Considered
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            'Full redesign from scratch. Clean slate but high engineering cost and longer timeline.',
            'Incremental fix of the top-10 issues by severity. Faster but risks leaving structural problems in place.',
            "I chose a middle path — fix all identified issues within the existing template structure. The template itself was sound; the execution had degraded. No need to rebuild what wasn't broken.",
          ].map((opt, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -3 }}
              className={`${cardBg} border-2 border-black rounded-xl p-4`}
              style={{ boxShadow: `4px 4px 0px 0px ${color}` }}
            >
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-lg border-2 border-black text-xs font-black mb-2"
                style={{ backgroundColor: color, borderColor: color }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <p className="text-xs md:text-sm font-medium text-ink/80">{opt}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.005, y: -2 }}
        className="mt-6 bg-white border-2 border-black rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
        style={{ boxShadow: `8px 8px 0px 0px ${color}` }}
      >
        <div className="absolute -top-4 -left-4 w-16 h-16 rounded-lg rotate-12 border-2 border-black hidden md:block" style={{ backgroundColor: color }} />
        <Lightbulb className="w-8 h-8 mx-auto mb-3" style={{ color }} />
        <p className="text-base md:text-lg font-display font-black text-ink">
          Session-to-PDP-click conversion improved by 17%. The template remained the same — what changed was the quality of execution. Heatmap validation showed users engaging with formerly ignored product cards, and filter interaction time dropped significantly as a result of clearer visual hierarchy.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ x: 2, transition: { duration: 0.15 } }}
        className="mt-6 bg-white border-2 border-black rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{ boxShadow: `6px 6px 0px 0px ${color}` }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }} />
        <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-2" style={{ color }}>
          What I'd Do Differently
        </p>
        <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
          I would have run the Clarity heatmap and scroll map audit earlier — before the UX backlog grew to 30+ items. A monthly category page health check using the same instrumentation would have caught regressions sooner and reduced the fix batch size.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8 text-center">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-sm font-bold text-ink/50 hover:text-ink transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all case studies
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default CategoryDiscovery;
