import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageMeta from '@/components/PageMeta';
import ContactForm from '@/components/contact/ContactForm';
import { ArrowRight, Calendar, X, Sparkles } from 'lucide-react';

const floatingDecorations = [
  { className: '-top-3 -left-3 w-10 h-10 bg-pink rotate-12 hidden md:block' },
  { className: 'bottom-6 -right-3 w-8 h-8 bg-lemon -rotate-12 hidden md:block' },
  { className: 'top-1/2 -right-4 w-6 h-6 bg-sky rotate-45 hidden lg:block' },
];

const Contact = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  return (
    <>
      <PageMeta />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="bg-mint border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 text-center relative overflow-hidden"
          style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
        >
          {floatingDecorations.map((d, i) => (
            <motion.div
              key={i}
              className={`absolute ${d.className} border-2 border-black rounded-xl`}
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          ))}

          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black mb-3"
          >
            <Sparkles className="w-3 h-3" />
            Get in Touch
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight"
          >
            Let's{' '}
            <motion.span
              className="text-ink/50 inline-block"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              talk
            </motion.span>
            <motion.span
              className="inline-block ml-1"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="mt-2 text-sm md:text-base text-ink/70 font-medium max-w-2xl mx-auto"
          >
            Whether you have a project in mind, a collaboration idea, or just want to say hello — I'd love to hear from you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="mt-6 flex justify-center"
          >
            <div className="relative inline-flex group">
              <div className="absolute inset-0 rounded-lg border-2 border-black bg-pink translate-x-[3px] translate-y-[3px]" />
              <button
                onClick={() => setShowCalendar(true)}
                className="relative z-10 bg-ink text-white rounded-lg border-2 border-black px-5 py-2.5 min-h-[44px] text-sm font-bold inline-flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
              >
                <Calendar size={18} />
                Book a Meeting
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <ContactForm />
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
                role="dialog"
                aria-modal="true"
                aria-label="Book a meeting"
                style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between bg-ink text-white px-5 py-3 border-b-2 border-black">
                  <span className="font-bold text-sm">Book a Meeting</span>
                  <button onClick={() => setShowCalendar(false)} className="hover:text-pink transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {iframeLoading && !iframeError && (
                  <div className="flex items-center justify-center h-[600px] text-sm font-medium text-ink/50">Loading booking calendar...</div>
                )}
                {iframeError && (
                  <div className="flex items-center justify-center h-[600px] text-sm font-medium text-ink/50 flex-col gap-3">
                    <span>Could not load the booking calendar.</span>
                    <a href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true" target="_blank" rel="noopener noreferrer" className="bg-ink text-white px-4 py-2 rounded-lg border-2 border-black text-sm font-bold hover:bg-ink/80 transition-colors">
                      Open booking page
                    </a>
                  </div>
                )}
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true"
                  className={`w-full ${iframeLoading || iframeError ? 'hidden' : ''}`}
                  style={{ height: '600px' }}
                  title="Schedule a meeting"
                  onLoad={() => setIframeLoading(false)}
                  onError={() => { setIframeLoading(false); setIframeError(true); }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Contact;
