import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageMeta from '@/components/PageMeta';
import ContactForm from '@/components/contact/ContactForm';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

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
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex-grow">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground pb-2">
            Let's <span className="text-primary">talk</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            Whether you have a project in mind, a collaboration idea, or just want to say hello — I'd love to hear from you.
          </p>
          <div className="mt-10 flex justify-center">
            <Button
              onClick={handleBookingClick}
              size="lg"
              className="w-full sm:w-auto min-w-fit rounded-full flex items-center justify-center gap-2.5 group shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              aria-label="Schedule a meeting with Saswata"
            >
              <Calendar size={20} aria-hidden="true" />
              Book a Meeting <ArrowRight size={20} aria-hidden="true" className="transition-transform group-hover:translate-x-1 flex-shrink-0" />
            </Button>
          </div>
        </motion.div>

        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
