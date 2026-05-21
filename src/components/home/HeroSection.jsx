import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Star, MessageSquare, X, Target, Layers, GitBranch, Lightbulb, ArrowRight, Search, FileText, Route, Rocket } from 'lucide-react';

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
  const [slideIndex, setSlideIndex] = useState(0);

  const handleWhatsApp = () => {
    window.dispatchEvent(new CustomEvent('openWhatsApp'));
  };

  const slides = [
    {
      id: 'sierra',
      title: 'Revenue Impact',
      cardBg: 'bg-mint',
      company: 'Sierra Living Concepts',
      companyColor: 'text-purple',
      content: (
        <div className="flex flex-col gap-3">
          <div className="bg-white border-2 border-black rounded-xl p-4 -rotate-[0.3deg] group-hover:rotate-0 transition-all duration-200">
            <div className="text-3xl md:text-4xl font-display font-black tracking-tighter text-ink">$594K</div>
            <p className="text-xs text-ink/60 font-bold mb-2">monthly revenue impact</p>
            <div className="flex gap-1.5">
              <motion.div whileHover={{ scale: 1.05 }} className="flex-1 rounded-lg bg-pink/30 border border-black p-1.5 text-center">
                <div className="text-sm font-black text-ink">53.9%</div>
                <p className="text-[9px] font-bold text-ink/60">Checkout</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex-1 rounded-lg bg-lemon/40 border border-black p-1.5 text-center">
                <div className="text-sm font-black text-ink">$152K</div>
                <p className="text-[9px] font-bold text-ink/60">Pricing</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex-1 rounded-lg bg-purple/20 border border-black p-1.5 text-center">
                <div className="text-sm font-black text-ink">$113K</div>
                <p className="text-[9px] font-bold text-ink/60">CRM</p>
              </motion.div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: '70+', label: 'Products shipped' },
              { value: '73%→54%', label: 'Cart abandonment' },
              { value: '+105%', label: 'Lead submissions' },
              { value: '71.6%', label: 'AI close rate' },
            ].map((g, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, backgroundColor: '#ffffff' }}
                className="bg-white border-2 border-black rounded-xl p-2.5"
              >
                <div className="text-lg font-black text-ink">{g.value}</div>
                <p className="text-[10px] font-bold text-ink/60">{g.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'livekeeping',
      title: 'Adoption Impact',
      cardBg: 'bg-sky',
      company: 'LiveKeeping (IndiaMART)',
      companyColor: 'text-ink/70',
      content: (
        <div className="flex flex-col gap-3">
          <div className="bg-white border-2 border-black rounded-xl p-4 transition-all duration-200">
            <div className="grid grid-cols-2 gap-3">
              <motion.div whileHover={{ scale: 1.03 }} className="text-center rounded-lg bg-indigo/20 border border-black p-3">
                <div className="text-2xl md:text-3xl font-display font-black tracking-tighter text-ink">17:1</div>
                <p className="text-xs font-bold text-ink/60">adoption gap</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="text-center rounded-lg bg-pink/30 border border-black p-3">
                <div className="text-2xl md:text-3xl font-display font-black tracking-tighter text-ink">160%</div>
                <p className="text-xs font-bold text-ink/60">re-engagement lift</p>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 items-center justify-center">
            {[
              { value: '19:1', label: 'E-Invoice' },
              { value: 'CEO', label: 'C-level escalation' },
              { value: 'PRO+', label: 'Plan focus' },
              { value: 'PRO+ Plan', label: 'GST' },
              { value: 'B2B SaaS', label: 'India SMB' },
            ].map((b, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0], transition: { duration: 0.15 } }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border-2 border-black ${
                  i < 3
                    ? 'bg-white text-ink'
                    : 'bg-ink/5 text-ink/50 border-ink/30'
                }`}
              >
                {b.value}{b.label ? ` ${b.label}` : ''}
              </motion.span>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'upcore',
      title: 'Role & Scope',
      cardBg: 'bg-blush',
      company: 'Upcore Technologies',
      companyColor: 'text-pink-dark',
      content: (
        <div className="flex flex-col gap-2.5 h-full">
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: <Search className="w-5 h-5" />, label: 'Discovery', bg: 'bg-blush' },
              { icon: <FileText className="w-5 h-5" />, label: 'Briefing', bg: 'bg-sky' },
              { icon: <Route className="w-5 h-5" />, label: 'Roadmap', bg: 'bg-lemon' },
              { icon: <Rocket className="w-5 h-5" />, label: 'GTM', bg: 'bg-mint' },
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -2, transition: { duration: 0.15 } }}
                className={`${step.bg} border-2 border-black rounded-xl p-3.5 text-center`}
              >
                <span className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center text-ink mx-auto mb-1.5">
                  {step.icon}
                </span>
                <p className="text-xs font-black text-ink">{step.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Enterprise Clients', 'AI Products', '12 Verticals', 'GTM Strategy'].map((tag, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0], transition: { duration: 0.15 } }}
                className="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-white border-2 border-black"
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-center gap-2 bg-purple/20 border-2 border-black rounded-xl p-2"
          >
            <Target className="w-3 h-3 text-purple" />
            <span className="text-[10px] font-bold text-purple">AI agentic product strategy</span>
            <Layers className="w-3 h-3 text-purple" />
          </motion.div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
            <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8 relative z-10">
              <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-36 h-36 md:w-44 md:h-44 overflow-hidden rounded-2xl border-2 border-black rotate-[-1deg] mx-auto md:mx-0" style={{ boxShadow: '6px 6px 0px 0px #FF90E8' }}>
                  <img
                    src="https://i.postimg.cc/Kv5xF852/DP-Linkedin.jpg"
                    alt="Saswata S. Sengupta"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.span
                  variants={childVariants}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-lemon text-ink text-xs font-bold border-2 border-black mt-4"
                >
                  <Star className="w-3 h-3" fill="currentColor" />
                  Product Manager · AI & Growth
                </motion.span>
                <motion.h1 variants={childVariants} className="text-ink text-xl md:text-2xl font-display font-black tracking-tighter leading-none mt-2">
                  Saswata S. Sengupta
                </motion.h1>
              </div>

              <div className="md:col-span-2">
                <motion.p variants={childVariants} className="text-base md:text-lg text-ink/60 font-display font-bold tracking-tight">
                  I find the problem nobody's measuring, then ship the fix that moves the number that matters.
                </motion.p>

                <motion.p variants={childVariants} className="mt-3 text-ink/70 text-sm md:text-base">
                   3+ years across AI agents (Upcore), D2C e-commerce (73% → 54% checkout fix at Sierra Living Concepts), and B2B SaaS (LiveKeeping/IndiaMART). IIT Jodhpur MBA. Currently building discovery-to-deployment workflows for enterprise AI agents.
                </motion.p>

                <motion.div variants={childVariants} className="flex flex-wrap gap-3 mt-5">
                  <div className="relative inline-flex group">
                    <div className="absolute inset-0 rounded-lg border-2 border-black bg-pink translate-x-[3px] translate-y-[3px]" />
                    <button
                      onClick={() => setShowCalendar(true)}
                      className="relative z-10 bg-ink text-white rounded-lg border-2 border-black px-4 py-2 text-sm font-bold inline-flex items-center gap-2 min-h-[44px] transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
                    >
                      <Calendar className="w-4 h-4" />
                      Book a Meeting
                    </button>
                  </div>
                  <div className="relative inline-flex group">
                    <div className="absolute inset-0 rounded-lg border-2 border-black bg-[#25D366] translate-x-[3px] translate-y-[3px]" />
                    <button
                      onClick={handleWhatsApp}
                      className="relative z-10 bg-white text-ink rounded-lg border-2 border-black px-4 py-2 text-sm font-bold min-h-[44px] inline-flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      WhatsApp
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={childVariants} className="flex flex-wrap gap-2 mt-6">
                  {['B2B SaaS', 'D2C', 'E-Commerce', 'AI Products', 'Product Discovery', 'Analytics'].map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0], transition: { duration: 0.2 } }}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-canvas text-ink border-2 border-black cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="absolute -top-6 -right-4 w-12 h-12 bg-pink border-2 border-black rounded-lg rotate-12 hidden md:block" />
            <div className="absolute top-12 right-4 w-8 h-8 bg-lemon border-2 border-black rounded-lg -rotate-6 hidden md:block" />
            <div className="absolute -bottom-8 -left-4 w-16 h-16 rounded-full bg-canvas border-2 border-black hidden md:block" />
          </motion.div>

          <motion.div
            variants={childVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`${slides[slideIndex].cardBg} group border-2 border-black rounded-2xl p-8 md:p-10 flex flex-col relative overflow-hidden h-[480px] transition-colors duration-500`}
            style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
          >
            <motion.div
              key={slideIndex}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
              className="absolute top-0 left-0 h-1 bg-ink/80"
            />
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black group-hover:scale-105 transition-transform duration-200">
                  {slides[slideIndex].title}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={slides[slideIndex].company}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className={`text-[10px] font-bold ${slides[slideIndex].companyColor} group-hover:underline decoration-dotted underline-offset-2 transition-all duration-200`}
                  >
                    {slides[slideIndex].company}
                  </motion.span>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={slideIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1"
                >
                  {slides[slideIndex].content}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.8 }}
                    className={`w-2.5 h-2.5 rounded-full border border-black transition-all duration-300 ${
                      i === slideIndex ? 'bg-ink scale-110' : 'bg-white hover:bg-ink/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple/60 border-2 border-black rounded-lg -rotate-12 hidden md:block group-hover:rotate-[-8deg] group-hover:scale-110 transition-all duration-300" />
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
