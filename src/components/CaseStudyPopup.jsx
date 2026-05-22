import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import caseStudies from '@/data/caseStudies';

const CaseStudyPopup = ({ slug, onClose }) => {
  const navigate = useNavigate();
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${cs.title}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`${cs.bg} border-2 border-black rounded-2xl relative overflow-hidden w-full max-w-lg`}
        style={{ boxShadow: `12px 12px 0px 0px ${cs.shadowColor}`, maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/30 border-2 border-black rounded-lg rotate-12 hidden md:block" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-lg border-2 border-black bg-white flex items-center justify-center hover:bg-canvas transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-ink" />
          </button>

          <div className="p-6 md:p-8 relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border border-black text-[10px] font-bold ${cs.bg === 'bg-ink' ? 'bg-white text-ink' : 'bg-ink text-white'}`}>
                {cs.company}
              </span>
              <span className={`text-[10px] font-bold ${cs.textColorMuted}`}>{cs.year}</span>
            </div>

            <h2 className={`text-xl md:text-2xl font-display font-black ${cs.textColor} mb-3 leading-tight`}>
              {cs.title}
            </h2>

            <p className={`text-sm md:text-base ${cs.textColorMuted} font-medium leading-relaxed mb-4`}>
              {cs.description}
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {cs.stats.map((stat, si) => (
                <div key={si} className={`${cs.accentClass} border-2 border-black rounded-xl p-3 text-center`}>
                  <div className={`text-lg md:text-xl font-display font-black ${cs.textColor}`}>{stat.value}</div>
                  <p className={`text-[10px] font-bold ${cs.textColorMuted} mt-0.5`}>{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-0.5 rounded-lg ${cs.bg === 'bg-ink' ? 'bg-white/10 text-white/60' : 'bg-white text-ink/60'} text-[9px] font-bold border-2 border-black`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => { onClose(); setTimeout(() => navigate(`/case-studies/${cs.slug}`), 200); }}
              className="inline-flex items-center gap-1.5 text-xs font-bold group/link"
              style={cs.bg === 'bg-ink' ? { color: 'white' } : { color: '#0A0A0A' }}
            >
              Read Full Case Study
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
    </motion.div>
  );
};

export default CaseStudyPopup;
