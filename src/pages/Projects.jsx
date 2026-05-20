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
    result: "17:1 adoption gap diagnosed and presented to VP/CEO"
  },
  {
    title: "E-Invoice Adoption Diagnosis",
    description: "Investigated low utilization of the native E-Invoice module, mapping workflow disconnects between LiveKeeping and Tally's default integrations.",
    tags: ["Product Discovery", "Gap Analysis", "Fintech"],
    result: "19:1 E-Invoice adoption gap identified and reported to C-suite"
  },
  {
    title: "CEO Compliance Error Dashboard",
    description: "Engineered a multi-week tracking instrument summarizing complex GST compliance rejection codes across product tiers. Created a standardized data pipeline for executive visibility.",
    tags: ["Dashboarding", "Analytics", "GST Compliance"],
    result: "Weekly CEO dashboard tracking GST rejection errors — reduced manual reporting effort"
  },
  {
    title: "Notification Strategy Overhaul",
    description: "Redesigned the entire lifecycle messaging architecture covering renewals, transactional states, conflict logic, and feature releases across PRO and PRO+ plan segments.",
    tags: ["Lifecycle Messaging", "UX Writing", "Push Notifications"],
    result: "Unified notification system covering 5 user segments and 2 plan tiers"
  }
];

const sierraProjects = [
  {
    title: "Category Page Redesign",
    description: "Led a 4-week sprint guided by GA4 custom events and Microsoft Clarity heatmaps. Rebuilt desktop and mobile templates, resolved 30+ UX issues, and aligned components with the Figma library.",
    tags: ["Product Management", "GA4", "UX Design", "Shopify"],
    result: "Session-to-PDP-click conversion: +17%"
  },
  {
    title: "Landing Page Optimisation",
    description: "Used GA4 funnels and Clarity scroll/click insights to ship speed-tuned, modular landing templates that match paid-traffic intent.",
    tags: ["Product Management", "Landing Pages", "A/B Testing", "UX"],
    result: "Bounce rate: −22%; AOV: +8%"
  },
  {
    title: "Lead Form Conversion Overhaul",
    description: "Diagnosed event funnels and rage-clicks, then rebuilt the form with Material 3 components, contextual microcopy, and latency fixes.",
    tags: ["Product Management", "UX", "CRO", "Analytics"],
    result: "Lead submissions: 2.1×; mobile conversion rate: +38%"
  },
  {
    title: "Customization Price Calculator",
    description: "Defined real-time quote logic and shipped a lightweight JS widget embedded on PDPs with validation and analytics hooks.",
    tags: ["JavaScript", "Product Management", "Analytics", "PDP UX"],
    result: "Custom-order attach rate: +28%"
  },
  {
    title: "On-Site Search Algorithm Upgrade",
    description: "Re-weighted relevance factors, added synonym mapping, and ran query-intent experiments with controlled A/B rollout.",
    tags: ["Search", "A/B Testing", "Product Management"],
    result: "Search-attributed revenue: +14%"
  },
  {
    title: "Customer Self-Service Portal",
    description: "Defined requirements, selected vendor, and designed track-my-order and self-serve flows with instrumentation. Reduced support load and unlocked cross-sell opportunities.",
    tags: ["CX", "Product Ops", "API Integration", "Analytics"],
    result: "Support tickets: −40%; NPS: +6 points; cross-sell revenue: +43%"
  },
  {
    title: "Product Page Optimisation",
    description: "Event-driven iterations on media gallery, variants, and micro-copy, informed by GA4 custom events and Clarity behavior data.",
    tags: ["GA4", "PDP UX", "Product Management", "UX Research"],
    result: "Add-to-cart rate: +27%; page engagement time: +22%"
  },
  {
    title: "Cart & Checkout Flow Redesign",
    description: "Ran a friction audit combining GA4 step funnels and Clarity session evidence. Simplified fields, clarified trust signals, and adjusted error/validation UX.",
    tags: ["Checkout UX", "GA4", "Trust Signals", "A/B Testing"],
    result: "Cart abandonment: 84.47% → 63.26%; revenue recovered: $329K/month"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 mb-6"
          style={{ boxShadow: '10px 10px 0px 0px #FF90E8' }}
        >
          <span className="block text-center mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-lemon text-ink text-xs font-bold border-2 border-black">
              My Work
            </span>
          </span>
          <h1 className="text-center text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight">
            Projects & Product Work
          </h1>
          <p className="text-center mt-2 text-sm md:text-base text-ink/70 font-medium max-w-3xl mx-auto">
            Every project grounded in a real problem, a real approach, and a real outcome.
          </p>
        </motion.div>

        <div className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14">
          <div className="flex justify-center gap-2 mb-8">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${
                    isActive ? 'bg-ink text-white border-black' : 'bg-white text-ink/60 border-black hover:bg-black/5'
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
              <div className="w-full bg-canvas border-2 border-black rounded-xl p-4 mb-8 text-center text-ink font-bold text-sm">
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
