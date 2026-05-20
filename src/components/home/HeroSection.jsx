import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Star, FileText, X } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroSection = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleScrollToWork = () => {
    const el = document.getElementById('work-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full pt-20 md:pt-24 lg:pt-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div
          className="grid lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.005, transition: { duration: 0.2 } }}
            className="lg:col-span-2 bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 relative overflow-hidden"
            style={{ boxShadow: '10px 10px 0px 0px #FF90E8' }}
          >
            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 relative z-10">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-36 overflow-hidden rounded-xl border-2 border-black">
                  <img
                    src="https://i.postimg.cc/Kv5xF852/DP-Linkedin.jpg"
                    alt="Saswata S. Sengupta"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <motion.span
                  variants={childVariants}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-lemon text-ink text-xs font-bold border-2 border-black mb-3"
                >
                  <Star className="w-3 h-3" fill="currentColor" />
                  Product Manager
                </motion.span>

                <motion.h1 variants={childVariants} className="text-ink text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black tracking-tighter leading-[1.05] mt-1">
                  Saswata S. Sengupta
                </motion.h1>
                <motion.span variants={childVariants} className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-bold text-ink/50">Open to opportunities</span>
                </motion.span>
                <motion.p variants={childVariants} className="text-base md:text-lg text-ink/60 font-display font-bold tracking-tight mt-1">
                  I ship products that move metrics.
                </motion.p>

                <motion.p variants={childVariants} className="mt-4 text-ink/70 text-sm md:text-base max-w-lg">
                  Product Manager with 3+ years across B2B SaaS, D2C, and e-commerce. From AI agent discovery at Upcore to checkout redesigns that recovered $329K/month at Sierra Living Concepts.
                </motion.p>

                <motion.div variants={childVariants} className="flex flex-wrap gap-4 mt-6">
                  <div className="relative inline-flex group">
                    <div className="absolute inset-0 rounded-lg border-2 border-black bg-pink translate-x-[3px] translate-y-[3px]" />
                    <button
                      onClick={() => setShowCalendar(true)}
                      className="relative z-10 bg-ink text-white rounded-lg border-2 border-black px-5 py-2.5 text-sm font-bold inline-flex items-center gap-2 min-h-[44px] transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
                    >
                      <Calendar className="w-4 h-4" />
                      Book a Meeting
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative inline-flex group">
                    <div className="absolute inset-0 rounded-lg border-2 border-black bg-lemon translate-x-[3px] translate-y-[3px]" />
                    <button
                      onClick={handleScrollToWork}
                      className="relative z-10 bg-white text-ink rounded-lg border-2 border-black px-5 py-2.5 text-sm font-bold min-h-[44px] transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
                    >
                      See My Work
                    </button>
                  </div>
                  <div className="relative inline-flex group">
                    <div className="absolute inset-0 rounded-lg border-2 border-black bg-purple translate-x-[3px] translate-y-[3px]" />
                    <a
                      href="/assets/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 bg-white text-ink rounded-lg border-2 border-black px-5 py-2.5 text-sm font-bold min-h-[44px] inline-flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
                    >
                      <FileText className="w-4 h-4" />
                      Resume
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={childVariants} className="flex flex-wrap gap-2 mt-6">
                  {['B2B SaaS', 'D2C', 'E-Commerce', 'AI Products', 'Product Discovery', 'Analytics'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-canvas text-ink border-2 border-black">
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-12 h-12 bg-pink border-2 border-black rounded-lg rotate-12 hidden md:block" />
            <div className="absolute top-12 right-8 w-8 h-8 bg-lemon border-2 border-black rounded-lg -rotate-6 hidden md:block" />
          </motion.div>

          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.01, rotate: 0.5, transition: { duration: 0.2 } }}
            className="bg-mint border-2 border-black rounded-2xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"
            style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
          >
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black mb-3">
                Impact
              </span>
              <div className="mt-2 space-y-3">
                <div>
                  <div className="text-3xl md:text-4xl font-display font-black tracking-tighter text-ink">$594K</div>
                  <p className="text-xs text-ink/60 font-bold">monthly revenue recovered from checkout, pricing & automation</p>
                </div>
                <div className="pt-3 border-t-2 border-black/20">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-lg font-black text-ink">70+</div>
                      <p className="text-[10px] text-ink/60 font-bold">Products shipped</p>
                    </div>
                    <div>
                      <div className="text-lg font-black text-ink">63%</div>
                      <p className="text-[10px] text-ink/60 font-bold">Cart abandon. (was 84%)</p>
                    </div>
                    <div>
                      <div className="text-lg font-black text-ink">+105%</div>
                      <p className="text-[10px] text-ink/60 font-bold">Lead submissions</p>
                    </div>
                    <div>
                      <div className="text-lg font-black text-ink">+$152K</div>
                      <p className="text-[10px] text-ink/60 font-bold">Pricing tools /mo</p>
                    </div>
                    <div>
                      <div className="text-lg font-black text-ink">+$113K</div>
                      <p className="text-[10px] text-ink/60 font-bold">CRM automation /mo</p>
                    </div>
                    <div>
                      <div className="text-lg font-black text-ink">71.6%</div>
                      <p className="text-[10px] text-ink/60 font-bold">AI lead close rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple border-2 border-black rounded-lg -rotate-12 hidden md:block" />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
              onClick={() => setShowCalendar(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white border-2 border-black rounded-2xl w-full max-w-[700px] max-h-[85vh] overflow-hidden relative"
                style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between bg-ink text-white px-5 py-3 border-b-2 border-black">
                  <span className="font-bold text-sm">Book a Meeting</span>
                  <button onClick={() => setShowCalendar(false)} className="hover:text-pink transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true"
                  className="w-full h-[600px]"
                  title="Schedule a meeting"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
