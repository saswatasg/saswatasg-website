import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const bgColors = ['bg-blush', 'bg-sky', 'bg-mint', 'bg-blush', 'bg-sky', 'bg-mint', 'bg-blush', 'bg-sky'];
const accentColors = ['bg-ink/5', 'bg-ink/5', 'bg-ink/5', 'bg-ink/5', 'bg-ink/5', 'bg-ink/5', 'bg-ink/5', 'bg-ink/5'];

const ProjectCard = ({ title, description, tags, result, caseStudyUrl, index }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (caseStudyUrl) {
      navigate(caseStudyUrl);
    }
  };

  const isClickable = !!caseStudyUrl;
  const colorIndex = index % bgColors.length;
  const initial = title.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleCardClick}
      whileHover={isClickable ? { y: -4 } : {}}
      className={`rounded-card p-6 md:p-8 border border-ink/10 flex flex-col h-full transition-all duration-200 ${bgColors[colorIndex]} ${isClickable ? 'cursor-pointer' : ''}`}
    >
      <div className={`w-full h-36 rounded-card mb-5 ${accentColors[colorIndex]} flex items-center justify-center overflow-hidden`}>
        <span className="text-5xl font-black font-display text-ink/20">{initial}</span>
      </div>

      <h3 className="text-lg font-display font-bold text-ink mb-2">{title}</h3>
      <p className="text-sm text-ink/70 mb-4 flex-grow leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags && tags.slice(0, 4).map((tag, i) => (
          <span key={i} className="px-2 py-0.5 bg-white/70 text-ink/60 text-[11px] font-medium rounded-pill border border-ink/10">
            {tag}
          </span>
        ))}
      </div>

      {result && (
        <div className="mb-3 pb-3 border-b border-ink/10">
          <p className="text-sm font-semibold text-ink font-display">
            {result}
          </p>
        </div>
      )}

      {isClickable && (
        <div className="mt-auto pt-2 flex items-center text-ink font-medium text-sm gap-1.5">
          View case study
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
