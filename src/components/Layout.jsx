import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Stickman from '@/components/Stickman';
import ChatBot from '@/components/WhatsAppChat';
import WhatsAppModal from '@/components/WhatsAppModal';
import CaseStudyPopup from '@/components/CaseStudyPopup';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }) => {
  const [popupSlug, setPopupSlug] = useState(null);

  useEffect(() => {
    const handler = (e) => setPopupSlug(e.detail);
    window.addEventListener('openCaseStudyPopup', handler);
    return () => window.removeEventListener('openCaseStudyPopup', handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link hover:bg-ink hover:text-white transition-colors duration-200">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-grow flex flex-col">
        {children}
      </main>
      <Stickman />
      <ChatBot />
      <WhatsAppModal />
      <AnimatePresence>
        {popupSlug && (
          <motion.div
            key={popupSlug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <CaseStudyPopup slug={popupSlug} onClose={() => setPopupSlug(null)} />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
