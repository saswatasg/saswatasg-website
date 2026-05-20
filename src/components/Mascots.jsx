import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function BlobMascot({ className = '' }) {
  const { scrollYProgress } = useScroll();
  const pupilY = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <motion.svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ellipse cx="30" cy="32" rx="22" ry="20" fill="white" stroke="#0A0A0A" strokeWidth="2.5" />
      <circle cx="22" cy="28" r="5" fill="#0A0A0A" />
      <circle cx="38" cy="28" r="5" fill="#0A0A0A" />
      <motion.circle cx="22" cy={28 + 2} r="2" fill="white" style={{ cy: pupilY }} />
      <motion.circle cx="38" cy={28 + 2} r="2" fill="white" style={{ cy: pupilY }} />
      <path d="M22 40 Q30 46 38 40" stroke="#0A0A0A" strokeWidth="2" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}

export function WavingHand({ className = '' }) {
  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, 15, 0, 15, 0] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
    >
      <motion.g
        style={{ transformOrigin: '24px 40px' }}
      >
        <circle cx="24" cy="24" r="18" fill="white" stroke="#0A0A0A" strokeWidth="2.5" />
        <path d="M18 20 L20 14 L22 16 L24 10 L26 16 L28 14 L30 20" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M16 24 L12 22 L14 20" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M32 24 L36 22 L34 20" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M24 34 L24 38" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
        <path d="M19 32 L16 36" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
        <path d="M29 32 L32 36" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  );
}

export function StarSparkle({ className = '' }) {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8], rotate: [0, 180, 360] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M12 2 L14 9 L21 9 L15.5 14 L17.5 22 L12 17 L6.5 22 L8.5 14 L3 9 L10 9 Z" fill="white" stroke="#0A0A0A" strokeWidth="1.5" strokeLinejoin="round" />
    </motion.svg>
  );
}
