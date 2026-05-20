import React from 'react';
import { motion } from 'framer-motion';

const tags = [
  'B2B SaaS', 'Product Discovery', 'GA4 Analytics', 'A/B Testing',
  'AI Agents', 'UX Research', 'D2C Commerce', 'Growth',
];

const Marquee = () => {
  const infinite = [...tags, ...tags, ...tags, ...tags];

  return (
    <div className="w-full bg-ink text-white overflow-hidden py-3 border-y-2 border-black">
      <motion.div
        className="flex whitespace-nowrap gap-3"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {infinite.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center px-3 py-1 rounded-lg bg-pink text-ink text-xs font-bold border-2 border-black"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
