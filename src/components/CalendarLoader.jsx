import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles, Coffee, Clock } from 'lucide-react';

const messages = [
  { text: "Finding the perfect time slot...", icon: Calendar },
  { text: "Brewing some coffee while you wait...", icon: Coffee },
  { text: "Almost there, just a moment!", icon: Clock },
];

const CalendarLoader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const Icon = messages[index].icon;

  return (
    <div className="flex items-center justify-center h-[600px] flex-col gap-4 px-6">
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="w-16 h-16 rounded-2xl bg-coral/10 border-2 border-coral flex items-center justify-center">
          <Icon className="w-8 h-8 text-coral" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -top-1 -right-1"
        >
          <Sparkles className="w-4 h-4 text-lemon" />
        </motion.div>
      </motion.div>

      <div className="h-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-bold text-ink/60 flex items-center gap-2"
          >
            {messages[index].text}
            <span className="inline-flex gap-0.5">
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1 h-1 bg-ink/40 rounded-full" />
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} className="w-1 h-1 bg-ink/40 rounded-full" />
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} className="w-1 h-1 bg-ink/40 rounded-full" />
            </span>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CalendarLoader;
