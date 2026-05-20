import React from 'react';
import { motion } from 'framer-motion';

const Marquee = () => {
  const text = "✦ B2B SAAS ✦ PRODUCT DISCOVERY ✦ GA4 ANALYTICS ✦ A/B TESTING ✦ AI AGENTS ✦ UX RESEARCH ✦ D2C COMMERCE";

  return (
    <div className="w-full bg-ink text-white overflow-hidden py-2.5">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-xs md:text-sm font-medium tracking-[0.15em] px-4">{text}</span>
        <span className="text-xs md:text-sm font-medium tracking-[0.15em] px-4">{text}</span>
        <span className="text-xs md:text-sm font-medium tracking-[0.15em] px-4">{text}</span>
        <span className="text-xs md:text-sm font-medium tracking-[0.15em] px-4">{text}</span>
      </motion.div>
    </div>
  );
};

export default Marquee;
