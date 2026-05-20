import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTilt } from '@/hooks/useTilt';

const generateId = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const ProjectCard = ({ title, description, tags, result, caseStudyUrl, index }) => {
  const navigate = useNavigate();
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(8, 1000, 1.02);

  const handleCardClick = () => {
    if (caseStudyUrl) {
      navigate(caseStudyUrl);
    }
  };

  const isClickable = !!caseStudyUrl;
  const cardId = generateId(title);

  return (
    <motion.div
      id={cardId}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 80 }}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-card rounded-xl overflow-hidden border border-border flex flex-col h-full transition-all duration-300 ${
        isClickable 
          ? 'cursor-pointer hover:shadow-xl hover:border-primary/50 group' 
          : 'shadow-md hover:shadow-lg hover:border-primary/30'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="p-6 flex flex-col flex-grow" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags && tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {result && (
          <div className="mb-6 pb-4 border-b border-border/50">
            <p className="text-sm font-semibold text-primary">
              {result}
            </p>
          </div>
        )}

        {isClickable && (
          <div className="mt-auto pt-2 flex items-center text-primary font-medium text-sm">
            View case study 
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
