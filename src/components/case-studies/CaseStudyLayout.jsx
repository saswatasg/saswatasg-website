import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const CaseStudyLayout = ({
  backLink = '/case-studies',
  company,
  year,
  title,
  description,
  cardBg,
  shadowColor,
  accentColor,
  accentBg,
  stats,
  sections,
  options,
  outcome,
  lessons,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16"
    >
      <Link
        to={backLink}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/60 hover:text-ink mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to all case studies
      </Link>

      <div className={`${cardBg} border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 relative overflow-hidden`} style={{ boxShadow: `12px 12px 0px 0px ${shadowColor}` }}>
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/30 border-2 border-black rounded-xl rotate-12 hidden md:block" />
        <div className="absolute top-16 right-12 w-12 h-12 bg-white/20 border-2 border-black rounded-lg -rotate-6 hidden md:block" />

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black mb-4 relative z-10">
          {company} · {year}
        </span>

        <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight relative z-10">
          {title}
        </h1>

        {description && (
          <p className="mt-3 text-sm md:text-base text-ink/70 font-medium max-w-3xl relative z-10">
            {description}
          </p>
        )}

        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 relative z-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -2 }}
                className={`${accentBg} border-2 border-black rounded-xl p-3 md:p-4 text-center`}
              >
                <div className="text-xl md:text-2xl font-display font-black text-ink">{stat.value}</div>
                <p className="text-[10px] font-bold text-ink/60 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 space-y-6">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ x: 2, transition: { duration: 0.15 } }}
            className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 relative overflow-hidden"
            style={{ boxShadow: `6px 6px 0px 0px ${shadowColor}` }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: accentColor }} />
            <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-2" style={{ color: accentColor }}>
              {section.label}
            </p>
            <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      {options && options.length > 1 && (
        <motion.div variants={itemVariants} className="mt-6">
          <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-3" style={{ color: accentColor }}>
            Options I Considered
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {options.map((opt, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, y: -3 }}
                className={`${cardBg} border-2 border-black rounded-xl p-4`}
                style={{ boxShadow: `4px 4px 0px 0px ${shadowColor}` }}
              >
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-lg border-2 border-black text-xs font-black mb-2"
                  style={{ backgroundColor: accentColor, borderColor: shadowColor }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <p className="text-xs md:text-sm font-medium text-ink/80">{opt}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {outcome && (
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="mt-6 bg-white border-2 border-black rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
          style={{ boxShadow: `8px 8px 0px 0px ${shadowColor}` }}
        >
          <div className="absolute -top-4 -left-4 w-16 h-16 rounded-lg rotate-12 border-2 border-black hidden md:block" style={{ backgroundColor: accentColor }} />
          <Lightbulb className="w-8 h-8 mx-auto mb-3" style={{ color: accentColor }} />
          <p className="text-base md:text-lg font-display font-black text-ink">{outcome}</p>
        </motion.div>
      )}

      {lessons && (
        <motion.div
          variants={itemVariants}
          whileHover={{ x: 2, transition: { duration: 0.15 } }}
          className="mt-6 bg-white border-2 border-black rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{ boxShadow: `6px 6px 0px 0px ${shadowColor}` }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: accentColor }} />
          <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-2" style={{ color: accentColor }}>
            What I'd Do Differently
          </p>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            {lessons}
          </p>
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="mt-8 text-center">
        <Link
          to={backLink}
          className="inline-flex items-center gap-2 text-sm font-bold text-ink/50 hover:text-ink transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all case studies
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default CaseStudyLayout;
