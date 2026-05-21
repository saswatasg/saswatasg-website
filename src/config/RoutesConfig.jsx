import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Home = React.lazy(() => import('@/pages/Home'));
const About = React.lazy(() => import('@/pages/About'));
const Experience = React.lazy(() => import('@/pages/Experience'));
const Projects = React.lazy(() => import('@/pages/Projects'));
const CaseStudies = React.lazy(() => import('@/pages/CaseStudies'));
const CaseStudyCartCheckout = React.lazy(() => import('@/pages/case-studies/CartCheckout'));
const CaseStudyCategoryDiscovery = React.lazy(() => import('@/pages/case-studies/CategoryDiscovery'));
const CaseStudyLeadForm = React.lazy(() => import('@/pages/case-studies/LeadForm'));
const CaseStudyUpcoreLeadScoring = React.lazy(() => import('@/pages/case-studies/UpcoreLeadScoring'));
const SierraLeadAllocation = React.lazy(() => import('@/pages/case-studies/SierraLeadAllocation'));
const LiveKeepingComplianceGap = React.lazy(() => import('@/pages/case-studies/LiveKeepingComplianceGap'));
const LiveKeepingSendGreetings = React.lazy(() => import('@/pages/case-studies/LiveKeepingSendGreetings'));
const LiveKeepingNotifications = React.lazy(() => import('@/pages/case-studies/LiveKeepingNotifications'));
const LiveKeepingReportAutomation = React.lazy(() => import('@/pages/case-studies/LiveKeepingReportAutomation'));
const Contact = React.lazy(() => import('@/pages/Contact'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  in: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  out: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.2 } }
};

const PageLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] w-full gap-4">
    <div className="w-12 h-12 rounded-full bg-muted animate-pulse"></div>
    <div className="w-32 h-4 rounded bg-muted animate-pulse"></div>
    <div className="w-24 h-3 rounded bg-muted animate-pulse"></div>
  </div>
);

const AnimatedPage = ({ children }) => (
  <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
    {children}
  </motion.div>
);

const RoutesConfig = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
          <Route path="/experience" element={<AnimatedPage><Experience /></AnimatedPage>} />
          <Route path="/projects" element={<AnimatedPage><Projects /></AnimatedPage>} />
          <Route path="/case-studies" element={<AnimatedPage><CaseStudies /></AnimatedPage>} />
          <Route path="/case-studies/cart-checkout" element={<AnimatedPage><CaseStudyCartCheckout /></AnimatedPage>} />
          <Route path="/case-studies/category-discovery" element={<AnimatedPage><CaseStudyCategoryDiscovery /></AnimatedPage>} />
          <Route path="/case-studies/lead-form" element={<AnimatedPage><CaseStudyLeadForm /></AnimatedPage>} />
          <Route path="/case-studies/upcore-lead-scoring" element={<AnimatedPage><CaseStudyUpcoreLeadScoring /></AnimatedPage>} />
          <Route path="/case-studies/sierra-lead-allocation" element={<AnimatedPage><SierraLeadAllocation /></AnimatedPage>} />
          <Route path="/case-studies/livekeeping-compliance-gap" element={<AnimatedPage><LiveKeepingComplianceGap /></AnimatedPage>} />
          <Route path="/case-studies/livekeeping-send-greetings" element={<AnimatedPage><LiveKeepingSendGreetings /></AnimatedPage>} />
          <Route path="/case-studies/livekeeping-notifications" element={<AnimatedPage><LiveKeepingNotifications /></AnimatedPage>} />
          <Route path="/case-studies/livekeeping-report-automation" element={<AnimatedPage><LiveKeepingReportAutomation /></AnimatedPage>} />
          <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
          <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default RoutesConfig;
