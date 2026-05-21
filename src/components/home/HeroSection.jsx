import React, { useState } from 'react';
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

  const handleWhatsApp = () => {
    window.dispatchEvent(new CustomEvent('openWhatsApp'));
  };

  const upcoreResponsibilities = [
    { icon: <Target className="w-4 h-4" />, text: "Lead end-to-end product discovery with enterprise clients — mapping workflows and diagnosing operational bottlenecks." },
    { icon: <Layers className="w-4 h-4" />, text: "Translate business problems into AI agent solution briefs for engineering, bridging client needs with deployable architecture." },
    { icon: <GitBranch className="w-4 h-4" />, text: "Own product roadmap prioritization across 12 verticals — assessing problem severity, feasibility, and ROI potential." },
    { icon: <Lightbulb className="w-4 h-4" />, text: "Drive go-to-market strategy for AI product launches and produce market intelligence reports on agentic AI tooling trends." },
  ];

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
            className="bg-mint border-2 border-black rounded-2xl p-8 md:p-10 flex flex-col relative overflow-hidden"
            style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
          >
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black">
                  Revenue Impact
                </span>
                <span className="text-[10px] font-bold text-purple">Sierra Living Concepts</span>
              </div>

              <div className="bg-white border-2 border-black rounded-xl p-5 mb-4 -rotate-[0.3deg] hover:rotate-0 transition-all duration-200">
                <div className="text-3xl md:text-4xl font-display font-black tracking-tighter text-ink">
                  $594K
                </div>
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
                  { value: "70+", label: "Products shipped" },
                  { value: "84%→63%", label: "Cart abandonment" },
                  { value: "+105%", label: "Lead submissions" },
                  { value: "71.6%", label: "AI close rate" },
                ].map((g, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.03 }} className="bg-white border-2 border-black rounded-xl p-3">
                    <div className="text-lg font-black text-ink">{g.value}</div>
                    <p className="text-[10px] font-bold text-ink/60">{g.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple border-2 border-black rounded-lg -rotate-12 hidden md:block" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={childVariants}
          whileHover={{ scale: 1.005, transition: { duration: 0.2 } }}
          className="mt-6 bg-blush border-2 border-black rounded-2xl p-8 md:p-10 relative overflow-hidden"
          style={{ boxShadow: '10px 10px 0px 0px #625BF6' }}
        >
          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="md:w-1/3 lg:w-1/4">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple text-white text-xs font-bold border-2 border-black">
                  Role
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-black tracking-tighter text-ink mt-3">
                Product Manager
              </h3>
              <p className="text-sm text-ink/60 font-bold">Upcore Technologies</p>
              <p className="text-xs text-ink/40 font-semibold mt-1">Jan 2024 — Present</p>
            </div>
            <div className="md:w-2/3 lg:w-3/4">
              <p className="text-xs font-bold text-ink/50 uppercase tracking-wider mb-3">What I own</p>
              <div className="grid md:grid-cols-2 gap-3">
                {upcoreResponsibilities.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01, x: 3, transition: { duration: 0.15 } }}
                    className="flex items-start gap-3 bg-white/80 border-2 border-black rounded-xl p-4"
                  >
                    <span className="mt-0.5 w-8 h-8 rounded-lg bg-purple/20 border border-black flex items-center justify-center flex-shrink-0 text-purple">
                      {item.icon}
                    </span>
                    <p className="text-sm text-ink/80 font-medium leading-snug">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-pink border-2 border-black rounded-lg rotate-12 hidden md:block" />
          <div className="absolute bottom-6 right-12 w-6 h-6 bg-lemon border-2 border-black rounded-lg -rotate-6 hidden md:block" />
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
