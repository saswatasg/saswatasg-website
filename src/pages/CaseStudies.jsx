import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid, List } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import caseStudies from '@/data/caseStudies';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const CaseStudies = () => {
  const navigate = useNavigate();
  const [isGrid, setIsGrid] = useState(true);

  return (
    <>
      <PageMeta
        title="Case Studies | Saswata S. Sengupta"
        description="Nine product decisions, explained in full — problem, diagnosis, options, outcome, and what I'd do differently."
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
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-coral border-2 border-black rounded-xl rotate-12 hidden md:block" />
          <div className="absolute top-16 right-10 w-10 h-10 bg-lemon border-2 border-black rounded-lg -rotate-6 hidden md:block" />

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-coral text-ink text-xs font-bold border-2 border-black mb-3 relative z-10">
            Case Studies
          </span>
          <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight relative z-10">
            How I approach product problems.
          </h1>
          <p className="mt-3 text-sm md:text-base text-ink/70 font-medium max-w-2xl relative z-10">
            Nine problems, nine approaches, nine before/afters. Every metric tied to a business outcome.
          </p>
        </motion.div>

        <div className="hidden md:flex items-center justify-end gap-3 mt-6">
          <span className="text-xs font-bold text-ink/40">Layout</span>
          <div className="flex gap-1 p-1 bg-white border-2 border-black rounded-lg">
            <motion.button
              onClick={() => setIsGrid(true)}
              whileTap={{ scale: 0.95 }}
              className={`p-1.5 rounded-md transition-colors ${isGrid ? 'bg-ink text-white' : 'bg-white text-ink/40 hover:text-ink'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => setIsGrid(false)}
              whileTap={{ scale: 0.95 }}
              className={`p-1.5 rounded-md transition-colors ${!isGrid ? 'bg-ink text-white' : 'bg-white text-ink/40 hover:text-ink'}`}
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className={`grid gap-6 mt-6 ${isGrid ? 'md:grid-cols-3' : ''}`}>
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.id}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.005, transition: { duration: 0.2 } }}
              onClick={() => navigate(`/case-studies/${cs.slug}`)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/case-studies/${cs.slug}`); } }}
              tabIndex={0}
              role="button"
              className={`${cs.bg} border-2 border-black rounded-2xl p-6 md:p-8 relative overflow-hidden group cursor-pointer focus-visible:outline-4 focus-visible:outline-coral focus-visible:outline-offset-2 flex flex-col`}
              style={{ boxShadow: `8px 8px 0px 0px ${cs.shadowColor}` }}
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/30 border-2 border-black rounded-lg rotate-12 hidden md:block group-hover:rotate-[20deg] transition-all duration-300" />

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border border-black text-[10px] font-bold ${cs.bg === 'bg-ink' ? 'bg-white text-ink' : 'bg-ink text-white'}`}>
                    {cs.company}
                  </span>
                  <span className={`text-[10px] font-bold ${cs.textColorMuted}`}>{cs.year}</span>
                </div>

                <h2 className={`text-xl md:text-2xl font-display font-black ${cs.textColor} mb-3 relative z-10 leading-tight`}>
                  {cs.title}
                </h2>

                <p className={`text-sm md:text-base ${cs.textColorMuted} font-medium leading-relaxed mb-4 relative z-10 max-w-3xl ${isGrid ? 'line-clamp-3' : ''}`}>
                  {cs.description}
                </p>

                <div className={`grid grid-cols-2 ${!isGrid ? 'md:grid-cols-4' : ''} gap-2 mb-4 relative z-10`}>
                  {cs.stats.map((stat, si) => (
                    <div key={si} className={`${cs.accentClass} border-2 border-black rounded-xl ${isGrid ? 'p-2' : 'p-3'} text-center`}>
                      <div className={`${isGrid ? 'text-base md:text-lg' : 'text-xl md:text-2xl'} font-display font-black ${cs.textColor}`}>{stat.value}</div>
                      <p className={`${isGrid ? 'text-[9px]' : 'text-[10px]'} font-bold ${cs.textColorMuted} mt-0.5`}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1 mb-3 relative z-10">
                  {(isGrid ? cs.tags.slice(0, 3) : cs.tags).map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded-lg ${cs.bg === 'bg-ink' ? 'bg-white/10 text-white/60' : 'bg-white text-ink/60'} text-[9px] font-bold border-2 border-black`}
                    >
                      {tag}
                    </span>
                  ))}
                  {isGrid && cs.tags.length > 3 && (
                    <span className="px-2 py-0.5 rounded-lg bg-white text-ink/30 text-[9px] font-bold border-2 border-black">
                      +{cs.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-ink/60 transition-colors relative z-10 group/link"
                style={cs.bg === 'bg-ink' ? { color: 'white' } : {}}
              >
                Read Full Case Study
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </span>
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
};

export default CaseStudies;
