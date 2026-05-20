import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageMeta from '@/components/PageMeta';
import ContactForm from '@/components/contact/ContactForm';
import { ArrowRight, Calendar, X } from 'lucide-react';

const Contact = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleBookingClick = (e) => {
    e.preventDefault();
    window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true', '_blank');
  };

  return (
    <>
      <PageMeta />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-mint border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 text-center"
          style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black mb-3">
            Get in Touch
          </span>
          <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight">
            Let's <span className="text-ink/50">talk</span>
          </h1>
          <p className="mt-2 text-sm md:text-base text-ink/70 font-medium max-w-2xl mx-auto">
            Whether you have a project in mind, a collaboration idea, or just want to say hello — I'd love to hear from you.
          </p>
          <div className="mt-6 flex justify-center">
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
          </div>
        </motion.div>

        <div className="mt-6">
          <ContactForm />
        </div>

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
    </>
  );
};

export default Contact;
