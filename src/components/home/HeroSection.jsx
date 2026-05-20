import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Calendar } from 'lucide-react';
import { BlobMascot } from '@/components/Mascots';

const stickerVariants = {
  animate: {
    rotate: 360,
    transition: { duration: 12, repeat: Infinity, ease: 'linear' },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const FloatingBlob = ({ color, className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-30 ${color} ${className}`}
    animate={{
      x: [0, 30, -15, 0],
      y: [0, -20, 15, 0],
    }}
    transition={{ duration: 20 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const HeroSection = () => {
  const handleScrollToWork = () => {
    const workSection = document.getElementById('work-section');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32">
      <motion.div
        className="bg-canvas rounded-card p-8 md:p-14 relative overflow-hidden border border-ink/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <FloatingBlob color="bg-lemon" className="w-72 h-72 -top-32 -right-24" delay={0} />
        <FloatingBlob color="bg-mint" className="w-56 h-56 -bottom-16 -left-16" delay={3} />
        <FloatingBlob color="bg-blush" className="w-48 h-48 top-1/3 right-1/4" delay={6} />

        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-10 md:gap-16 relative z-10">
          <div className="relative flex-shrink-0">
            <motion.div variants={childVariants} className="relative">
              <div className="w-36 h-36 md:w-44 md:h-44 overflow-hidden border-4 border-white shadow-md">
                <img
                  src="https://i.postimg.cc/Kv5xF852/DP-Linkedin.jpg"
                  alt="Portrait of Saswata S. Sengupta, Product Manager"
                  className="w-full h-full object-cover"
                  style={{
                    clipPath: 'polygon(12% 0, 100% 6%, 88% 92%, 65% 100%, 15% 96%, 0 55%, 6% 18%)',
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-3 right-0 z-30"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img
                  src="https://i.postimg.cc/Kv5xF852/DP-Linkedin.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-center md:items-start flex-1">
            <motion.span
              variants={childVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-lemon/30 text-ink text-sm font-medium mb-4 border border-ink/10"
            >
              <span className="w-2 h-2 rounded-full bg-lemon" />
              Product Manager
            </motion.span>

            <motion.h1 variants={childVariants} className="text-ink text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Saswata S. Sengupta
            </motion.h1>
            <motion.h2 variants={childVariants} className="text-xl md:text-2xl lg:text-3xl text-ink/70 font-display font-bold tracking-tight mt-1">
              I ship products that move metrics.
            </motion.h2>
            <motion.p variants={childVariants} className="mt-4 max-w-xl text-sm md:text-base">
              Product Manager with 3+ years across B2B SaaS, D2C, and e-commerce.
              From AI agent discovery at Upcore to checkout flow overhauls at Sierra Living Concepts — I find the signal, build the solution, and ship the outcome.
            </motion.p>

            <motion.div variants={childVariants} className="flex flex-col sm:flex-row items-stretch justify-center md:justify-start gap-4 w-full sm:w-auto mt-8">
              <a
                href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-white rounded-pill px-6 py-3 text-sm font-medium inline-flex items-center gap-2 min-h-[44px] hover:bg-lemon hover:text-ink transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                Book a Meeting
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <button
                onClick={handleScrollToWork}
                className="bg-white border-2 border-ink text-ink rounded-pill px-6 py-3 text-sm font-medium uppercase tracking-wide min-h-[44px] hover:bg-ink hover:text-white transition-all duration-300"
              >
                See My Work
                <ChevronDown className="w-4 h-4 inline-block ml-1.5" />
              </button>
            </motion.div>

            <motion.div variants={childVariants} className="flex flex-wrap gap-2 mt-8 justify-center md:justify-start">
              {['B2B SaaS', 'D2C', 'E-Commerce', 'AI Products', 'Product Discovery', 'Analytics'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-pill text-xs font-medium bg-white border border-ink/10 text-ink/60">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Sticker badge — positioned in the top-right corner of the card */}
        <motion.div
          className="absolute top-6 right-6 w-20 h-20 md:w-24 md:h-24 bg-lemon rounded-full -rotate-12 flex items-center justify-center z-20 hidden md:flex"
          variants={stickerVariants}
          animate="animate"
          whileHover={{ rotate: 720, transition: { duration: 2, ease: 'linear' } }}
        >
          <div className="text-center">
            <span className="text-[7px] md:text-[8px] font-bold text-ink uppercase leading-tight block">GET</span>
            <span className="text-[7px] md:text-[8px] font-bold text-ink uppercase leading-tight block">STARTED</span>
            <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-ink mx-auto mt-0.5" />
          </div>
        </motion.div>

        <BlobMascot className="absolute bottom-3 right-3 z-20 w-10 h-10 md:w-14 md:h-14" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
