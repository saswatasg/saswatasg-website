import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, LayoutGrid, List, Rocket, Armchair, Brain, ExternalLink, Github, Boxes } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import ProjectCard from '@/components/projects/ProjectCard';
import caseStudies from '@/data/caseStudies';
import { openSourceProjects, allProjects, FILTERS, softwareSchema } from '@/data/projectsData';
import { trackEvent } from '@/utils/analytics';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const Work = () => {
  const navigate = useNavigate();
  const [isGrid, setIsGrid] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    const sorted = [...allProjects].sort((a, b) => {
      if (a.caseStudyLink && !b.caseStudyLink) return -1;
      if (!a.caseStudyLink && b.caseStudyLink) return 1;
      return 0;
    });
    if (activeFilter === 'all') return sorted;
    return sorted.filter((p) => p.company === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <PageMeta
        title="Work | Saswata S. Sengupta"
        description="Case studies and product work — nine deep-dives with published metrics, plus 21 shipped projects across Upcore, LiveKeeping, and Sierra."
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', '@graph': softwareSchema })}
        </script>
      </Helmet>
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
            Work
          </span>
          <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight relative z-10">
            How I approach product problems.
          </h1>
          <p className="mt-3 text-sm md:text-base text-ink/70 font-medium max-w-2xl relative z-10">
            Nine case studies with published metrics, plus every project grounded in a real problem, approach, and outcome.
          </p>
        </motion.div>

        {/* Section A — Case Studies */}
        <motion.div variants={cardVariants} className="mt-10 mb-4 flex items-center justify-between gap-3">
          <h2 className="text-ink text-xl md:text-2xl font-display font-black tracking-tight">Case Studies</h2>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-bold text-ink/40">Layout</span>
            <div className="flex gap-1 p-1 bg-white border-2 border-black rounded-lg">
              <motion.button
                onClick={() => { trackEvent('work', 'layout_grid'); setIsGrid(true); }}
                whileTap={{ scale: 0.95 }}
                className={`p-1.5 rounded-md transition-colors ${isGrid ? 'bg-ink text-white' : 'bg-white text-ink/40 hover:text-ink'}`}
                aria-label="Grid layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => { trackEvent('work', 'layout_list'); setIsGrid(false); }}
                whileTap={{ scale: 0.95 }}
                className={`p-1.5 rounded-md transition-colors ${!isGrid ? 'bg-ink text-white' : 'bg-white text-ink/40 hover:text-ink'}`}
                aria-label="List layout"
              >
                <List className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className={`grid gap-6 ${isGrid ? 'md:grid-cols-3' : ''}`}>
          {caseStudies.map((cs) => (
            <motion.div
              key={cs.id}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.005, transition: { duration: 0.2 } }}
              onClick={() => { trackEvent('work', 'case_study_click', cs.title); navigate(`/case-studies/${cs.slug}`); }}
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

        {/* Section B — Also built */}
        <motion.div variants={cardVariants} className="mt-12 mb-4">
          <h2 className="text-ink text-xl md:text-2xl font-display font-black tracking-tight">Also built</h2>
          <p className="text-sm text-ink/60 font-medium mt-1">Product work across Upcore, LiveKeeping, and Sierra — filter by company.</p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white border-2 border-black rounded-2xl p-6 md:p-8"
        >
          <div className="flex overflow-x-auto gap-1.5 pb-1 md:pb-0 -mb-1 md:mb-0 scrollbar-none mb-6 md:mb-8">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.id;
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => { trackEvent('work', 'filter', f.id); setActiveFilter(f.id); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-black whitespace-nowrap transition-all flex-shrink-0 ${
                    isActive ? 'bg-ink text-white' : 'bg-white text-ink/50 hover:text-ink hover:bg-canvas'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {f.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {filtered.map((project, index) => (
                  <ProjectCard key={`${project.company}-${index}`} index={index} {...project} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Section C — Built in the open */}
        <motion.div
          variants={cardVariants}
          className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 mt-6"
        >
          <div className="flex items-center gap-2 mb-1">
            <Boxes className="w-5 h-5 text-ink" />
            <h2 className="text-ink text-xl md:text-2xl font-display font-black tracking-tight">
              Built in the open
            </h2>
          </div>
          <p className="text-sm md:text-base text-ink/70 font-medium mb-6">
            Products I design, code, and ship myself — with the repo public. Every line, commit, and backtest visible.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {openSourceProjects.map((p, index) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (index % 2) * 0.05 }}
                className="bg-canvas border-2 border-black rounded-xl p-5 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-black text-ink text-lg leading-tight">{p.name}</h3>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${p.statusClass}`}>
                    {p.status}
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold text-ink/60 uppercase tracking-wide">{p.tagline}</p>
                <p className="mt-2 text-sm text-ink/75 leading-relaxed">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white border border-ink/15 text-[11px] font-bold text-ink/60">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-4 flex items-center gap-2">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noopener noreferrer' : undefined}
                      onClick={() => trackEvent('work', 'open_source_link', l.label)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black hover:bg-lemon hover:text-ink transition-colors"
                    >
                      {l.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                  {p.code && (
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('work', 'open_source_code', p.name)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-ink text-xs font-bold border-2 border-black hover:bg-mint transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      Code
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Work;
