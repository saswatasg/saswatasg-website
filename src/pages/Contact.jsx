import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageMeta from '@/components/PageMeta';
import ContactForm from '@/components/contact/ContactForm';
import { ArrowRight, Calendar } from 'lucide-react';
import { WavingHand, StarSparkle } from '@/components/Mascots';

const Contact = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const handleBookingClick = (e) => {
    e.preventDefault();
    window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true', '_blank');
  };

  return (
    <>
      <PageMeta />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 flex-grow">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-lemon rounded-card p-8 md:p-14 relative overflow-hidden border border-ink/10"
        >
          <WavingHand className="absolute bottom-4 right-4 z-10" />
          <StarSparkle className="absolute top-6 right-12 z-10" />
          <StarSparkle className="absolute top-10 right-20 z-10" />

          <motion.svg
            className="absolute top-0 right-0 w-32 h-32 text-ink/10 -z-0"
            viewBox="0 0 100 100"
            initial={{ strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <path d="M10 90 Q 30 10, 50 50 T 90 10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="200" />
          </motion.svg>

          <div className="text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-pill bg-white/50 text-ink text-sm font-medium mb-4 border border-ink/10">
              Get in Touch
            </span>
            <h1 className="text-ink">
              Let's <span className="text-ink/60">talk</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto">
              Whether you have a project in mind, a collaboration idea, or just want to say hello — I'd love to hear from you.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleBookingClick}
                className="bg-ink text-white rounded-pill px-6 py-3 text-sm font-medium inline-flex items-center gap-2 hover:bg-white hover:text-ink hover:border-ink hover:border-2 border-2 border-transparent transition-all duration-200"
              >
                <Calendar size={18} />
                Book a Meeting
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 flex-shrink-0" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-4">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default Contact;
