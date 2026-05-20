import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const activeTab = searchParams.get('tab') || 'livekeeping';

  const handleTabChange = (value) => {
    setSearchParams({ tab: value });
  };

  const { projects, banner } = useMemo(() => {
    switch (activeTab) {
      case 'sierra':
        return { projects: sierraProjects, banner: "Sierra Living Concepts · Product Manager (Growth) · May 2024–Jan 2026 · US D2C furniture brand" };
      case 'livekeeping':
      default:
        return { projects: liveKeepingProjects, banner: "LiveKeeping · Associate Product Manager · Jan–Apr 2026 · B2B SaaS, GST compliance for Indian SMBs" };
    }
  }, [activeTab]);

  return (
    <>
      <PageMeta />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-canvas rounded-card p-8 md:p-14 mb-6 border border-ink/10"
        >
          <span className="block text-center mb-4">
            <span className="inline-block px-4 py-1.5 rounded-pill bg-lemon/30 text-ink text-sm font-medium border border-ink/10">
              My Work
            </span>
          </span>
          <h1 className="text-center text-ink">
            Projects & Product Work
          </h1>
          <p className="text-center mt-4 max-w-3xl mx-auto">
            Every project grounded in a real problem, a real approach, and a real outcome.
          </p>
        </motion.div>

        <div className="bg-canvas rounded-card p-8 md:p-14 border border-ink/10">
          <div className="flex justify-center gap-2 mb-8">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-pill text-sm font-medium transition-all ${
                    isActive ? 'bg-ink text-white' : 'bg-white text-ink/60 border border-ink/10 hover:bg-ink/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full bg-mint rounded-card p-4 mb-8 text-center text-ink font-medium text-sm border border-ink/10">
                {banner}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <ProjectCard key={index} index={index} {...project} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Projects;
