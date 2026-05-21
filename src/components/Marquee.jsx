import React, { useState } from 'react';
import { motion } from 'framer-motion';

const tags = [
  'B2B SaaS', 'Product Discovery', 'GA4 Analytics', 'A/B Testing',
  'AI Agents', 'UX Research', 'D2C Commerce', 'Growth',
];

const Marquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const infinite = [...tags, ...tags, ...tags, ...tags];

  return (
    <div
      className="w-full bg-ink text-white overflow-hidden py-3 border-y-2 border-black"
      aria-hidden="true"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <motion.div
        className="flex whitespace-nowrap gap-3"
        animate={{ x: isPaused ? '0%' : ['0%', '-50%'] }}
        transition={{
          duration: isPaused ? 0 : 30,
          repeat: isPaused ? 0 : Infinity,
          ease: 'linear',
        }}
      >
        {infinite.map((tag, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0], transition: { duration: 0.15 } }}
            className="inline-flex items-center px-3 py-1 rounded-lg bg-pink text-ink text-xs font-bold border-2 border-black cursor-pointer"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;