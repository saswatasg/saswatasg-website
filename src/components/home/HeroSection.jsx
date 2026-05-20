import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Calendar } from 'lucide-react';
import { BlobMascot } from '@/components/Mascots';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroSection = () => {
  const handleScrollToWork = () => {
    const el = document.getElementById('work-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full pt-20 md:pt-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div
          className="bg-white rounded-card p-8 md:p-12 lg:p-16 relative overflow-hidden border border-ink/10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
            <div className="relative flex-shrink-0">
              <motion.div variants={childVariants}>
                <div className="w-36 h-36 md:w-48 md:h-48 overflow-hidden rounded-2xl border-4 border-white shadow-md">
                  <img
                    src="https://i.postimg.cc/Kv5xF852/DP-Linkedin.jpg"
                    alt="Saswata S. Sengupta"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col items-center md:items-start flex-1 min-w-0">
              <motion.span
                variants={childVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lemon/40 text-ink text-sm font-semibold mb-4"
              >
                <span className="w-2 h-2 rounded-full bg-lemon" />
                Product Manager
              </motion.span>

              <motion.h1 variants={childVariants} className="text-ink text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Saswata S. Sengupta
              </motion.h1>
              <motion.p variants={childVariants} className="text-lg md:text-xl text-ink/60 font-display font-bold tracking-tight mt-2">
                I ship products that move metrics.
              </motion.p>

              <motion.p variants={childVariants} className="mt-4 text-ink/70 max-w-xl">
                Product Manager with 3+ years across B2B SaaS, D2C, and e-commerce.
                From AI agent discovery at Upcore to checkout flow overhauls at Sierra Living Concepts.
              </motion.p>

              <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
                <a
                  href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink text-white rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2 min-h-[44px] hover:bg-lemon hover:text-ink transition-all duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Meeting
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={handleScrollToWork}
                  className="bg-white border-2 border-ink/20 text-ink rounded-full px-6 py-3 text-sm font-semibold min-h-[44px] hover:bg-ink hover:text-white hover:border-ink transition-all duration-300"
                >
                  See My Work
                  <ChevronDown className="w-4 h-4 inline-block ml-1.5" />
                </button>
              </motion.div>

              <motion.div variants={childVariants} className="flex flex-wrap gap-2 mt-8">
                {['B2B SaaS', 'D2C', 'E-Commerce', 'AI Products', 'Product Discovery', 'Analytics'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-ink/5 text-ink/60 border border-ink/10">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div
            className="absolute top-5 right-5 w-20 h-20 md:w-24 md:h-24 bg-lemon rounded-full -rotate-12 flex items-center justify-center z-20 hidden md:flex"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            whileHover={{ rotate: 720, transition: { duration: 2, ease: 'linear' } }}
          >
            <div className="text-center">
              <span className="text-[7px] md:text-[8px] font-bold text-ink uppercase leading-tight block">GET</span>
              <span className="text-[7px] md:text-[8px] font-bold text-ink uppercase leading-tight block">STARTED</span>
              <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-ink mx-auto mt-0.5" />
            </div>
          </motion.div>

          <BlobMascot className="absolute bottom-3 right-3 z-20 w-12 h-12 hidden md:block" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
