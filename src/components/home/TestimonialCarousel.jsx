import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Harish Kumawat',
    title: 'Growth Marketing Manager, Sierra Living Concepts',
    relation: 'Managed Saswata directly for over a year',
    text: 'Saswata consistently delivered results beyond expectations and showed strong ownership in everything he handled. He has excellent technical expertise, along with a deep understanding of analytics and the customer buying journey.',
  },
  {
    name: 'Jai Sankhla',
    title: 'UI/UX Designer, Sierra Living Concepts',
    relation: 'Reported directly to Saswata',
    text: 'His ability to align business objectives with user-centric design made product development seamless. He championed a data-driven approach to UX/UI decisions and fostered cross-functional collaboration.',
  },
  {
    name: 'Mehul Bhaliya',
    title: 'Category Manager + MBA Batchmate, Sierra Living Concepts',
    relation: 'Worked on same team · IIT Jodhpur batchmate',
    text: 'His knack for solving complex problems and driving data-driven decisions stood out both in academic and professional settings. His ability to strategize and execute effective SEO, SEM, and UX initiatives greatly contributed to growth.',
  },
  {
    name: 'Sulagna Barat',
    title: 'Executive Data Scientist, Synergy Marine Group',
    relation: 'Cross-company consultant',
    text: 'His ability to analyze complex challenges, optimize conversion strategies, and scale e-commerce operations is truly commendable. His strong business acumen enables him to drive impactful and sustainable growth.',
  },
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <div className="w-full bg-white border-y-2 border-black">
      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="relative min-h-[160px] md:min-h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <span className="text-3xl text-ink/20 font-display font-black leading-none">&#10077;</span>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed mt-1 max-w-3xl mx-auto">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4">
                <p className="text-sm font-black text-ink">{t.name}</p>
                <p className="text-xs font-bold text-ink/50">{t.title}</p>
                <p className="text-[10px] font-medium text-ink/30 mt-0.5">{t.relation}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-5">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
              className={`w-2 h-2 rounded-full border border-black transition-all duration-300 ${
                i === current ? 'bg-ink scale-110' : 'bg-white hover:bg-ink/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
