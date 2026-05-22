import React from 'react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/PageMeta';
import ContactForm from '@/components/contact/ContactForm';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { openScheduleBooking } from '@/utils/openCalendar';

const floatingDecorations = [
  { className: '-top-3 -left-3 w-10 h-10 bg-coral rotate-12 hidden md:block' },
  { className: 'bottom-6 -right-3 w-8 h-8 bg-lemon -rotate-12 hidden md:block' },
  { className: 'top-1/2 -right-4 w-6 h-6 bg-sky rotate-45 hidden lg:block' },
];

const Contact = () => {
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
              <div className="absolute inset-0 rounded-lg border-2 border-black bg-coral translate-x-[3px] translate-y-[3px]" />
              <button
                onClick={openScheduleBooking}
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


      </div>
    </>
  );
};

export default Contact;
