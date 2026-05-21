import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Armchair, Brain, ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import PageMeta from '@/components/PageMeta';

const upcoreProjects = [
  {
    title: "Two-Stage Lead Scoring — 9 Research Signals Before Outreach",
    description: "Only 10% of leads are ready to buy. Built the B2B GTM framework that identifies which 10% — scoring prospects on 9 intent signals and 9 potential signals before a single outreach message is sent.",
    tags: ["B2B GTM", "Lead Scoring", "Enterprise", "Sales Ops"],
    result: "9+9 scoring signals · 75+ priority threshold · 24hr contact SLA",
    caseStudyLink: "/case-studies/upcore-lead-scoring"
  },
  {
    title: "Webinar Sales Engine Redesign",
    description: "Redesigned the full-funnel webinar experience — landing page, email sequence, and post-session nurture. Mapped drop-off points across registration, attendance, and follow-up before rebuilding each touchpoint from the data up.",
    tags: ["Funnel Design", "Email Strategy", "Growth", "Landing Pages"],
    result: "478 sign-ups/month · +51% from baseline"
  },
  {
    title: "Enterprise Outreach Optimization",
    description: "Transitioned from manual LinkedIn prospecting to a structured outbound system with lead scoring, BDR capacity planning, and a tiered qualification framework based on company size, vertical, and AI readiness signals.",
    tags: ["Outbound", "Lead Scoring", "B2B GTM", "Sales Ops"],
    result: "Cost-to-book reduced by 36%"
  },
  {
    title: "AI Agent Market Intelligence Report",
    description: "Produced a 16-page research report covering the agentic AI tooling landscape, market sizing, adoption maturity curve, and 8+ enterprise case studies across manufacturing, legal, logistics, and finance verticals.",
    tags: ["Market Research", "AI Agents", "Competitive Intel", "Strategy"],
    result: "16-page whitepaper · 12 verticals mapped"
  },
  {
    title: "Revenue Model & Pricing Strategy",
    description: "Built the revenue architecture and tiered pricing model for Upcore's AI agent services. Partnered with the CEO on financial modelling and the investor narrative as part of pre-seed fundraising preparation.",
    tags: ["Pricing Strategy", "Revenue Modelling", "Fundraising", "GTM"],
    result: "Revenue model · Pre-seed fundraising support"
  },
  {
    title: "Enterprise Discovery Sprints",
    description: "Conducted structured discovery interviews with 20+ prospective clients across 12 verticals. Synthesised findings into a prioritised opportunity brief identifying the top-3 agentic AI use cases by severity, ROI, and buildability.",
    tags: ["Product Discovery", "User Research", "AI Strategy", "Enterprise"],
    result: "20+ interviews · Top-3 opportunity brief delivered"
  }
];

const liveKeepingProjects = [
  {
    title: "E-Way Bill Adoption Diagnosis — 17:1 Compliance Gap",
    description: "Conducted deep-dive analysis uncovering a massive drop-off where PRO+ users generated E-Way Bills externally via Tally rather than in-app. Built an executive narrative that changed the product roadmap.",
    tags: ["Data Analytics", "B2B SaaS", "User Behavior", "Executive Reporting"],
    result: "17:1 adoption gap diagnosed and presented to VP/CEO",
    caseStudyLink: "/case-studies/livekeeping-compliance-gap"
  },
  {
    title: "Send Greetings + Nano Banana AI Integration — +168% Engagement",
    description: "Integrated Google Gemini Flash (Nano Banana) image AI into LiveKeeping's dormant Pro+ Send Greetings feature. Built a geo-segmented festival calendar across 5 Indian regions with 27 occasions.",
    tags: ["AI Integration", "Feature PM", "India SMB", "Engagement"],
    result: "+168% feature engagement · 27 occasions · 5 geo-regions",
    caseStudyLink: "/case-studies/livekeeping-send-greetings"
  },
  {
    title: "Push Notification Architecture — 27 Triggers, Priority Tiers, Geo-Segmented",
    description: "Redesigned the entire lifecycle messaging architecture covering renewals, transactional states, conflict logic, and feature releases across PRO and PRO+ plan segments.",
    tags: ["Systems Design", "Notification Strategy", "GST Compliance", "India SMB"],
    result: "27+ triggers · P0-P3 priority · 3-slot daily cap · 5 geo-regions",
    caseStudyLink: "/case-studies/livekeeping-notifications"
  },
  {
    title: "Daily Report Automation — 3 Sources, 88 Rows, 11 AM",
    description: "Built a Google Apps Script pipeline unifying Kibana, MongoDB, and GA4 into a single auto-populated report. Eliminated manual data entry across the team.",
    tags: ["Google Apps Script", "Kibana", "MongoDB", "GA4"],
    result: "3 sources unified · 88 rows mapped · 11 AM auto-populate",
    caseStudyLink: "/case-studies/livekeeping-report-automation"
  },
  {
    title: "E-Invoice Adoption Diagnosis — 19:1 Gap",
    description: "Investigated low utilization of the native E-Invoice module, mapping workflow disconnects between LiveKeeping and Tally's default integrations using the same methodology as the E-Way Bill diagnosis.",
    tags: ["Product Discovery", "Gap Analysis", "Fintech"],
    result: "19:1 E-Invoice adoption gap identified and reported to C-suite"
  },
  {
    title: "CEO Compliance Error Dashboard",
    description: "Engineered a multi-week tracking instrument summarizing complex GST compliance rejection codes across product tiers. Created a standardized data pipeline for executive visibility.",
    tags: ["Dashboarding", "Analytics", "GST Compliance"],
    result: "Weekly CEO dashboard tracking GST rejection errors — reduced manual reporting effort"
  }
];

const sierraProjects = [
  {
    title: "Cart & Checkout Flow Redesign — –26% Abandonment",
    description: "Ran a friction audit combining GA4 step funnels and Clarity session evidence. Simplified fields, clarified trust signals, and adjusted error/validation UX.",
    tags: ["Checkout UX", "GA4", "Trust Signals", "A/B Testing"],
    result: "Checkout abandonment: 73.1% → 53.9% (–26%) · 480K sessions",
    caseStudyLink: "/case-studies/cart-checkout"
  },
  {
    title: "Category & Landing Page Redesign — +34% Leads",
    description: "Led a 4-week sprint guided by GA4 custom events and Microsoft Clarity heatmaps. Replaced commodity category pages with story-driven, trust-led journeys. 1.1M BigQuery events analyzed.",
    tags: ["Product Management", "GA4", "UX Design", "Shopify"],
    result: "Session-to-PDP-click: +17% · Qualified leads: +34%",
    caseStudyLink: "/case-studies/category-discovery"
  },
  {
    title: "Lead Form Conversion Overhaul — +124% in 28 Days",
    description: "Diagnosed event funnels and rage-clicks. Rebuilt static form into category-specific modules with Material 3 components, contextual microcopy, and latency fixes.",
    tags: ["Product Management", "UX", "CRO", "Analytics"],
    result: "Lead submissions: +124% · Mobile completion time: –41% · Rage clicks: –68%",
    caseStudyLink: "/case-studies/lead-form"
  },
  {
    title: "Lead Allocation & Routing — Gold/Silver/Bronze System",
    description: "Built a data-backed lead routing system across 4 agents. Website forms (63.5% CVR) routed differently from chat (4.7% CVR). 30-day pilot from 10% to full rollout.",
    tags: ["Sales Ops", "Data Analysis", "Routing Design", "Revenue Operations"],
    result: "Gold source CVR: 63.5% · Bronze source CVR: 0.4% · Days to close: 5.2→3.5 target",
    caseStudyLink: "/case-studies/sierra-lead-allocation"
  },
  {
    title: "Landing Page Optimisation",
    description: "Used GA4 funnels and Clarity scroll/click insights to ship speed-tuned, modular landing templates that match paid-traffic intent.",
    tags: ["Product Management", "Landing Pages", "A/B Testing", "UX"],
    result: "Bounce rate: −22%; AOV: +8%"
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
  }
];

const TABS = [
  { id: 'upcore', label: 'Upcore Technologies', icon: Brain },
  { id: 'livekeeping', label: 'LiveKeeping', icon: Rocket },
  { id: 'sierra', label: 'Sierra Living Concepts', icon: Armchair }
];

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'upcore';

  const handleTabChange = (value) => {
    setSearchParams({ tab: value });
  };

  const { projects, banner } = useMemo(() => {
    let data;
    switch (activeTab) {
      case 'upcore':
        data = { projects: upcoreProjects, banner: "Upcore Technologies · Product Manager · April 2026–Present · AI agent discovery & enterprise deployment" };
        break;
      case 'sierra':
        data = { projects: sierraProjects, banner: "Sierra Living Concepts · Product Manager (Growth) · May 2024–Jan 2026 · US D2C furniture brand" };
        break;
      case 'livekeeping':
      default:
        data = { projects: liveKeepingProjects, banner: "LiveKeeping · Associate Product Manager · Jan–Apr 2026 · B2B SaaS, GST compliance for Indian SMBs" };
        break;
    }
    const sorted = [...data.projects].sort((a, b) => (a.caseStudyLink ? 0 : 1) - (b.caseStudyLink ? 0 : 1));
    return { projects: sorted, banner: data.banner };
  }, [activeTab]);

  return (
    <>
      <PageMeta />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14"
          style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
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

        <div className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 mt-6">
          <p className="text-sm font-medium text-ink/50 text-center mb-6">These aren't just features I shipped — they're problems I diagnosed. Each one started with data that told an incomplete story.</p>
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
