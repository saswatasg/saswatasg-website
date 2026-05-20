import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, ChevronDown } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 }
  }
};

const FloatingShape = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full opacity-20 blur-xl ${className}`}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const HeroSection = () => {
  const handleCalendarClick = e => {
    e.preventDefault();
    window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true', '_blank');
  };

  const handleScrollToWork = () => {
    const workSection = document.getElementById('work-section');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      aria-labelledby="hero-heading"
      className="flex flex-col md:flex-row items-center text-center md:text-left py-12 px-4 min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-150px)] justify-center relative gap-8 md:gap-16 overflow-hidden"
    >
      {/* Animated background shapes */}
      <FloatingShape className="w-72 h-72 bg-primary/30 -top-20 -left-20" delay={0} />
      <FloatingShape className="w-96 h-96 bg-accent/20 bottom-0 -right-32" delay={1.5} />
      <FloatingShape className="w-48 h-48 bg-primary/20 top-1/2 left-1/2" delay={3} />

      <motion.div
        variants={itemVariants}
        className="relative profile-image-container flex-shrink-0"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <img 
          id="profilePic" 
          width="160" 
          height="160" 
          alt="Portrait of Saswata S. Sengupta, Product Manager" 
          fetchPriority="high" 
          loading="eager"
          decoding="async"
          className="w-40 h-40 rounded-full mx-auto border-4 border-primary/40 relative z-10 object-cover profile-image shadow-xl shadow-primary/20" 
          src="https://i.postimg.cc/Kv5xF852/DP-Linkedin.jpg" 
        />
      </motion.div>

      <div className="flex flex-col items-center md:items-start max-w-2xl">
        <motion.p
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Product Manager
        </motion.p>

        <motion.h1 id="hero-heading" variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-foreground tracking-tight">
          Saswata S. Sengupta
        </motion.h1>
        <motion.h2 variants={itemVariants} className="text-xl md:text-2xl lg:text-3xl text-primary font-medium mb-4">
          I ship products that move metrics.
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
          Product Manager with 3+ years across B2B SaaS, D2C, and e-commerce.
          From AI agent discovery at Upcore to checkout flow overhauls at Sierra Living Concepts — I find the signal, build the solution, and ship the outcome.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch justify-center md:justify-start gap-4 w-full sm:w-auto">
          <Button
            onClick={handleCalendarClick}
            className="rounded-full flex items-center justify-center gap-2 group shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transform hover:-translate-y-1 transition-all duration-300 h-12 md:h-14 px-8 text-base md:text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
            aria-label="Schedule a meeting with Saswata"
          >
            <Calendar className="w-5 h-5 mr-1" aria-hidden="true" /> Book a Meeting <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            onClick={handleScrollToWork}
            className="rounded-full flex items-center justify-center gap-2 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 h-12 md:h-14 px-8 text-base md:text-lg font-medium border-2 border-primary/20 text-foreground bg-background/50 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/50 w-full sm:w-auto"
            aria-label="Scroll to see my work"
          >
            See My Work <ChevronDown className="w-5 h-5 ml-1 animate-bounce" aria-hidden="true" />
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
          {['B2B SaaS', 'D2C', 'E-Commerce', 'AI Products', 'Product Discovery', 'Analytics'].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-background border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
