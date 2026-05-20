import React, { useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Armchair } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import PageMeta from '@/components/PageMeta';

const liveKeepingProjects = [
  {
    title: "E-Way Bill Adoption Diagnosis",
    description: "Conducted deep-dive analysis uncovering a massive drop-off where PRO+ users generated E-Way Bills externally via Tally rather than in-app. Built an executive narrative to greenlight feature improvements.",
    tags: ["Data Analytics", "B2B SaaS", "User Behavior", "Executive Reporting"],
    result: "Result: 17:1 adoption gap diagnosed and escalated to C-suite"
  },
  {
    title: "E-Invoice Adoption Diagnosis",
    description: "Investigated low utilization of the native E-Invoice module, mapping workflow disconnects between LiveKeeping and Tally's default integrations.",
    tags: ["Product Discovery", "Gap Analysis", "Fintech"],
    result: "Result: 19:1 gap identified — fed into C-suite reporting"
  },
  {
    title: "CEO Compliance Error Dashboard",
    description: "Engineered a multi-week tracking instrument summarizing complex GST compliance rejection codes across product tiers. Created a standardized data pipeline for executive visibility.",
    tags: ["Dashboarding", "Analytics", "GST Compliance"],
    result: "Result: Weekly CEO-level reporting instrument built and owned"
  },
  {
    title: "Notification Strategy Overhaul",
    description: "Redesigned the entire lifecycle messaging architecture covering renewals, transactional states, conflict logic, and feature releases across PRO and PRO+ plan segments.",
    tags: ["Lifecycle Messaging", "UX Writing", "Push Notifications"],
    result: "Result: Complete notification architecture delivered across all tiers"
  }
];

const sierraProjects = [
  {
    title: "Category Page Redesign",
    description: "Led a 4-week sprint guided by GA4 custom events and Microsoft Clarity heatmaps. Rebuilt desktop and mobile templates, resolved 30+ UX issues, and aligned components with the Figma library.",
    tags: ["Product Management", "GA4", "UX Design", "Shopify"],
    result: "Result: session → PDP clicks +17%"
  },
  {
    title: "Landing Page Optimisation",
    description: "Used GA4 funnels and Clarity scroll/click insights to ship speed-tuned, modular landing templates that match paid-traffic intent.",
    tags: ["Product Management", "Landing Pages", "A/B Testing", "UX"],
    result: "Result: bounce −22%, AOV +8%"
  },
  {
    title: "Lead Form Conversion Overhaul",
    description: "Diagnosed event funnels and rage-clicks, then rebuilt the form with Material 3 components, contextual microcopy, and latency fixes.",
    tags: ["Product Management", "UX", "CRO", "Analytics"],
    result: "Result: submissions 2.1x, mobile CVR +38%"
  },
  {
    title: "Customization Price Calculator",
    description: "Defined real-time quote logic and shipped a lightweight JS widget embedded on PDPs with validation and analytics hooks.",
    tags: ["JavaScript", "Product Management", "Analytics", "PDP UX"],
    result: "Result: custom-order attach +28%"
  },
  {
    title: "On-Site Search Algorithm Upgrade",
    description: "Re-weighted relevance factors, added synonym mapping, and ran query-intent experiments with controlled A/B rollout.",
    tags: ["Search", "A/B Testing", "Product Management"],
    result: "Result: search-led revenue +14%"
  },
  {
    title: "Customer Self-Service Portal",
    description: "Defined requirements, selected vendor, and designed track-my-order and self-serve flows with instrumentation. Reduced support load and unlocked cross-sell opportunities.",
    tags: ["CX", "Product Ops", "API Integration", "Analytics"],
    result: "Result: tickets −40%, NPS +6, cross-sell revenue +43%"
  },
  {
    title: "Product Page Optimisation",
    description: "Event-driven iterations on media gallery, variants, and micro-copy, informed by GA4 custom events and Clarity behavior data.",
    tags: ["GA4", "PDP UX", "Product Management", "UX Research"],
    result: "Result: ATC rate +27%, engagement time +22%"
  },
  {
    title: "Cart & Checkout Flow Redesign",
    description: "Ran a friction audit combining GA4 step funnels and Clarity session evidence. Simplified fields, clarified trust signals, and adjusted error/validation UX.",
    tags: ["Checkout UX", "GA4", "Trust Signals", "A/B Testing"],
    result: "Result: abandonment 84.47% → 63.26%, recovered $329K/mo"
  }
];

const TABS = [
  { id: 'livekeeping', label: 'LiveKeeping', icon: Rocket },
  { id: 'sierra', label: 'Sierra Living Concepts', icon: Armchair }
];

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const activeTab = searchParams.get('tab') || 'livekeeping';
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);

  const handleTabChange = (value) => {
    setSearchParams({ tab: value });
  };

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const activeElement = scrollContainerRef.current.querySelector(`[data-tab-id="${activeTab}"]`);
    if (activeElement) {
      const container = scrollContainerRef.current;
      const scrollLeft = activeElement.offsetLeft - container.offsetWidth / 2 + activeElement.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeTab]);

  const { projects, banner } = useMemo(() => {
    switch (activeTab) {
      case 'sierra':
        return {
          projects: sierraProjects,
          banner: "Sierra Living Concepts · Product Manager (Growth) · May 2024–Jan 2026 · US D2C furniture brand"
        };
      case 'livekeeping':
      default:
        return {
          projects: liveKeepingProjects,
          banner: "LiveKeeping · Associate Product Manager · Jan–Apr 2026 · B2B SaaS, GST compliance for Indian SMBs"
        };
    }
  }, [activeTab]);

  return (
    <>
      <PageMeta />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full pb-16"
      >
        <div className="container mx-auto px-4 pt-16" ref={sectionRef}>
          <span className="block text-center mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              My Work
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Projects & Product Work
          </h1>
          <p className="text-lg md:text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Every project grounded in a real problem, a real approach, and a real outcome.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="tab-nav-wrapper">
          <div className="container mx-auto px-4 max-w-5xl">
            <div 
              ref={scrollContainerRef}
              className="flex justify-start md:justify-center gap-2 md:gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory w-full pb-px"
            >
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    data-tab-id={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`tab-button snap-start ${isActive ? 'active' : ''}`}
                    aria-selected={isActive}
                    role="tab"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{tab.label}</span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-underline"
                        className="tab-indicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full"
            >
              <div className="w-full bg-primary/10 border border-primary/20 rounded-lg p-5 mb-10 text-center text-primary font-medium text-sm md:text-base shadow-sm tracking-wide">
                {banner}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard key={index} index={index} {...project} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default Projects;
