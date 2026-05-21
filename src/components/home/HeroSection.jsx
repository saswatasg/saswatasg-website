import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Star, MessageSquare, X, Target, Layers, GitBranch, Lightbulb } from 'lucide-react';

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
      cardShadow: '0px 0px #0A0A0A',
      company: 'Sierra Living Concepts',
      companyColor: 'text-purple',
      content: (
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-2 border-black rounded-xl p-5 mb-4 -rotate-[0.3deg] hover:rotate-0 transition-all duration-200">
            <div className="text-3xl md:text-4xl font-display font-black tracking-tighter text-ink">$594K</div>
            <p className="text-xs text-ink/60 font-bold">monthly revenue recovered</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-pink/30 border border-black p-2">
                <div className="text-sm font-black text-ink">$329K</div>
                <p className="text-[9px] font-bold text-ink/60">Checkout</p>
              </div>
              <div className="rounded-lg bg-lemon/40 border border-black p-2">
                <div className="text-sm font-black text-ink">$152K</div>
                <p className="text-[9px] font-bold text-ink/60">Pricing</p>
              </div>
              <div className="rounded-lg bg-purple/20 border border-black p-2">
                <div className="text-sm font-black text-ink">$113K</div>
                <p className="text-[9px] font-bold text-ink/60">CRM</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: '70+', label: 'Products shipped' },
              { value: '84%→63%', label: 'Cart abandonment' },
              { value: '+105%', label: 'Lead submissions' },
              { value: '71.6%', label: 'AI close rate' },
            ].map((g, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} className="bg-white border-2 border-black rounded-xl p-3">
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
      cardShadow: '0px 0px #0A0A0A',
      company: 'LiveKeeping (IndiaMART)',
      companyColor: 'text-ink/70',
      content: (
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-2 border-black rounded-xl p-5 mb-4 hover:rotate-0 transition-all duration-200">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl md:text-4xl font-display font-black tracking-tighter text-ink">17:1</div>
              <span className="text-xs font-bold text-ink/50">adoption gap</span>
            </div>
            <p className="text-xs text-ink/60 font-bold mb-3">diagnosed & escalated to CPO</p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: '19:1', label: 'E-Invoice gap' },
                { value: '160%', label: 'Re-engagement' },
                { value: 'CEO', label: 'Weekly reporting' },
              ].map((b, i) => (
                <div key={i} className={`flex-1 min-w-[80px] rounded-lg border border-black p-2 text-center ${i === 0 ? 'bg-indigo/20' : i === 1 ? 'bg-pink/30' : 'bg-lemon/40'}`}>
                  <div className="text-sm font-black text-ink">{b.value}</div>
                  <p className="text-[9px] font-bold text-ink/60">{b.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-auto">
            {['PRO+ Plan', 'GST Compliance', 'B2B SaaS', 'SMB India'].map((tag, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.06, rotate: [0, -2, 2, 0], transition: { duration: 0.15 } }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border-2 border-black"
              >
                {tag}
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
      cardShadow: '0px 0px #0A0A0A',
      company: 'Upcore Technologies',
      companyColor: 'text-pink-dark',
      content: (
        <div className="flex-1 flex flex-col">
          <p className="text-[11px] font-bold text-ink/50 uppercase tracking-wider mb-3">What I own day-to-day</p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { icon: <Target className="w-3.5 h-3.5" />, text: 'End-to-end product discovery with enterprise clients — mapping workflows, diagnosing bottlenecks.' },
              { icon: <Layers className="w-3.5 h-3.5" />, text: 'Translate business problems into AI agent solution briefs for engineering.' },
              { icon: <GitBranch className="w-3.5 h-3.5" />, text: 'Own roadmap prioritization across 12 verticals by severity, feasibility, and ROI.' },
              { icon: <Lightbulb className="w-3.5 h-3.5" />, text: 'GTM strategy for AI launches and market intelligence on agentic AI tooling.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01, x: 2, transition: { duration: 0.12 } }}
                className="flex items-start gap-2.5 bg-white/80 border-2 border-black rounded-xl p-3"
              >
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-purple/20 border border-black flex items-center justify-center flex-shrink-0 text-purple">
                  {item.icon}
                </span>
                <p className="text-xs font-medium text-ink/80 leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>
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
                <div className="w-28 h-28 md:w-32 md:h-32 overflow-hidden rounded-xl border-2 border-black mx-auto md:mx-0">
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
                  Product Manager
                </motion.span>
                <motion.h1 variants={childVariants} className="text-ink text-2xl md:text-3xl font-display font-black tracking-tighter leading-[1.05] mt-2">
                  Saswata S.<br />Sengupta
                </motion.h1>
              </div>

              <div className="md:col-span-2">
                <motion.p variants={childVariants} className="text-base md:text-lg text-ink/60 font-display font-bold tracking-tight">
                  I ship products that move metrics.
                </motion.p>

                <motion.p variants={childVariants} className="mt-3 text-ink/70 text-sm md:text-base">
                  Product Manager with 3+ years across B2B SaaS, D2C, and e-commerce. From AI agent discovery at Upcore to checkout redesigns that recovered $329K/month at Sierra Living Concepts.
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

            <div className="absolute -top-6 -right-6 w-12 h-12 bg-pink border-2 border-black rounded-lg rotate-12 hidden md:block" />
            <div className="absolute top-12 right-8 w-8 h-8 bg-lemon border-2 border-black rounded-lg -rotate-6 hidden md:block" />
          </motion.div>

          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.01, rotate: 0.3, transition: { duration: 0.2 } }}
            className={`${slides[slideIndex].cardBg} border-2 border-black rounded-2xl p-8 md:p-10 flex flex-col relative overflow-hidden`}
            style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
          >
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black">
                  {slides[slideIndex].title}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={slides[slideIndex].company}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className={`text-[10px] font-bold ${slides[slideIndex].companyColor}`}
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
                  className="flex-1 flex flex-col"
                >
                  {slides[slideIndex].content}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-1.5 mt-4">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={`w-2 h-2 rounded-full border border-black transition-all duration-300 ${
                      i === slideIndex ? 'bg-ink scale-125' : 'bg-white'
                    }`}
                  />
                ))}
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
