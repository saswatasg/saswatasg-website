import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Stickman from '@/components/Stickman';
import ChatBot from '@/components/WhatsAppChat';
import WhatsAppModal from '@/components/WhatsAppModal';
import CaseStudyPopup from '@/components/CaseStudyPopup';
import { Toaster } from '@/components/ui/toaster';
import { trackEvent } from '@/utils/analytics';

const Layout = ({ children }) => {
  const [popupSlug, setPopupSlug] = useState(null);
  const location = useLocation();
  const maxScroll = useRef(0);

  useEffect(() => {
    const handler = (e) => setPopupSlug(e.detail);
    window.addEventListener('openCaseStudyPopup', handler);
    return () => window.removeEventListener('openCaseStudyPopup', handler);
  }, []);

  useEffect(() => {
    trackEvent('page_view', 'route_change', location.pathname);
    maxScroll.current = 0;
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const scrollPct = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
      if (scrollPct > maxScroll.current) {
        maxScroll.current = scrollPct;
        if (scrollPct === 25 || scrollPct === 50 || scrollPct === 75 || scrollPct === 100) {
          trackEvent('scroll_depth', 'reached', `${scrollPct}%`, scrollPct);
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
