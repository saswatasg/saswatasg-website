import React from 'react';
import { motion } from 'framer-motion';

const Marquee = ({ text = "✦ BUILDING IN PUBLIC ✦ PRODUCT DISCOVERY ✦ AI STRATEGY ✦ SHIPPING PRODUCTS" }) => {
  return (
    <div className="w-full bg-ink text-white overflow-hidden py-2">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-sm font-medium tracking-widest px-4">{text}</span>
        <span className="text-sm font-medium tracking-widest px-4">{text}</span>
        <span className="text-sm font-medium tracking-widest px-4">{text}</span>
        <span className="text-sm font-medium tracking-widest px-4">{text}</span>
      </motion.div>
    </div>
  );
};

export default Marquee;
