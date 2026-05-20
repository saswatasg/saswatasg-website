import React from 'react';
import { motion } from 'framer-motion';

const cardColors = ['bg-blush', 'bg-sky', 'bg-mint', 'bg-lemon', 'bg-blush', 'bg-sky', 'bg-mint', 'bg-lemon'];
const cardShadows = [
  '6px 6px 0px 0px #F4EC4A',
  '6px 6px 0px 0px #FF90E8',
  '6px 6px 0px 0px #625BF6',
  '6px 6px 0px 0px #3DDC91',
  '6px 6px 0px 0px #F4EC4A',
  '6px 6px 0px 0px #FF90E8',
  '6px 6px 0px 0px #625BF6',
  '6px 6px 0px 0px #3DDC91',
];

const ProjectCard = ({ title, description, tags, result, index }) => {
  const ci = index % cardColors.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4, scale: 1.01, rotate: 0.2, transition: { duration: 0.2 } }}
      className={`${cardColors[ci]} border-2 border-black rounded-2xl p-6 md:p-8 flex flex-col h-full`}
      style={{ boxShadow: cardShadows[ci] }}
    >
      <h3 className="text-base font-display font-black text-ink mb-2">{title}</h3>
      <p className="text-sm text-ink/70 leading-relaxed mb-4 flex-grow font-medium">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags && tags.slice(0, 4).map((tag, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0], transition: { duration: 0.15 } }}
            className="px-2 py-0.5 bg-white text-ink/60 text-[11px] font-bold rounded-lg border-2 border-black cursor-default"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {result && (
        <div className="mb-3 pb-3 border-b-2 border-black">
          <p className="text-sm font-black text-ink font-display">
            {result}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
