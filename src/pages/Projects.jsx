import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Armchair, Brain } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import PageMeta from '@/components/PageMeta';
import { trackEvent } from '@/utils/analytics';

const allProjects = [
  {
    company: 'upcore', companyName: 'Upcore Technologies',
    title: "Two-Stage Lead Scoring — 9 Research Signals Before Outreach",
    description: "Only 10% of leads are ready to buy. Built the B2B GTM framework that identifies which 10% — scoring prospects on 9 intent signals and 9 potential signals before a single outreach message is sent.",
    tags: ["B2B GTM", "Lead Scoring", "Enterprise", "Sales Ops"],
    result: "9+9 scoring signals · 75+ priority threshold · 24hr contact SLA · Close rate: 52% → 71.63%",
    caseStudyLink: "/case-studies/upcore-lead-scoring"
  },
  {
    company: 'livekeeping', companyName: 'LiveKeeping',
    title: "E-Way Bill Adoption Diagnosis — 17:1 Compliance Gap",
    description: "Conducted deep-dive analysis uncovering a massive drop-off where PRO+ users generated E-Way Bills externally via Tally rather than in-app. Built an executive narrative that changed the product roadmap.",
    tags: ["Data Analytics", "B2B SaaS", "User Behavior", "Executive Reporting"],
    result: "17:1 adoption gap · 19:1 E-Invoice gap · C-Suite escalation · −58% Rejection rate",
    caseStudyLink: "/case-studies/livekeeping-compliance-gap"
  },
  {
    company: 'sierra', companyName: 'Sierra Living Concepts',
    title: "Cart & Checkout Flow Redesign — –26% Abandonment",
    description: "Ran a friction audit combining GA4 step funnels and Clarity session evidence. Simplified fields, clarified trust signals, and adjusted error/validation UX.",
    tags: ["Checkout UX", "GA4", "Trust Signals", "A/B Testing"],
    result: "Checkout abandonment: 73.1% → 53.9% (–26%) · 480K sessions · Beat Wayfair on mobile CVR",
    caseStudyLink: "/case-studies/cart-checkout"
  },
  {
    company: 'sierra', companyName: 'Sierra Living Concepts',
    title: "Category & Landing Page Redesign — +34% Leads",
    description: "Led a 4-week sprint guided by GA4 custom events and Microsoft Clarity heatmaps. Replaced commodity category pages with story-driven, trust-led journeys. 1.1M BigQuery events analyzed.",
    tags: ["Product Management", "GA4", "UX Design", "Shopify"],
    result: "Session-to-PDP-click: +17% · Qualified leads: +34% · Bounce: −16% · ATC: +27%",
    caseStudyLink: "/case-studies/category-discovery"
  },
  {
    company: 'sierra', companyName: 'Sierra Living Concepts',
    title: "Lead Form Conversion Overhaul — +124% in 28 Days",
    description: "Diagnosed event funnels and rage-clicks. Rebuilt static form into category-specific modules with Material 3 components, contextual microcopy, and latency fixes.",
    tags: ["Product Management", "UX", "CRO", "Analytics"],
    result: "Lead submissions: +124% · Mobile completion time: −41% · Rage clicks: −68%",
    caseStudyLink: "/case-studies/lead-form"
  },
  {
    company: 'sierra', companyName: 'Sierra Living Concepts',
    title: "Lead Allocation & Routing — Gold/Silver/Bronze System",
    description: "Built a data-backed lead routing system across 4 agents. Website forms (63.5% CVR) routed differently from chat (4.7% CVR). 30-day pilot from 10% to full rollout.",
    tags: ["Sales Ops", "Data Analysis", "Routing Design", "Revenue Operations"],
    result: "Gold source CVR: 63.5% · Bronze source CVR: 0.4% · Days to close: 5.2 → 3.5 target",
    caseStudyLink: "/case-studies/sierra-lead-allocation"
  },
  {
    company: 'livekeeping', companyName: 'LiveKeeping',
    title: "Send Greetings + Nano Banana AI Integration — +168% Engagement",
    description: "Integrated Google Gemini Flash (Nano Banana) image AI into LiveKeeping's dormant Pro+ Send Greetings feature. Built a geo-segmented festival calendar across 5 Indian regions with 27 occasions.",
    tags: ["AI Integration", "Feature PM", "India SMB", "Engagement"],
    result: "+168% feature engagement · 27 occasions · 5 geo-regions",
    caseStudyLink: "/case-studies/livekeeping-send-greetings"
  },
  {
    company: 'livekeeping', companyName: 'LiveKeeping',
    title: "Push Notification Architecture — 27 Triggers, Priority Tiers, Geo-Segmented",
    description: "Redesigned the entire lifecycle messaging architecture covering renewals, transactional states, conflict logic, and feature releases across PRO and PRO+ plan segments.",
    tags: ["Systems Design", "Notification Strategy", "GST Compliance", "India SMB"],
    result: "27+ triggers · P0–P3 priority · 3-slot daily cap · 5 geo-regions",
    caseStudyLink: "/case-studies/livekeeping-notifications"
  },
  {
    company: 'livekeeping', companyName: 'LiveKeeping',
    title: "Daily Report Automation — 3 Sources, 88 Rows, 11 AM",
    description: "Built a Google Apps Script pipeline unifying Kibana, MongoDB, and GA4 into a single auto-populated report. Eliminated manual data entry across the team.",
    tags: ["Google Apps Script", "Kibana", "MongoDB", "GA4"],
    result: "3 sources unified · 88 rows mapped · 11 AM auto-populate · 0 manual steps",
    caseStudyLink: "/case-studies/livekeeping-report-automation"
  },
  {
    company: 'upcore', companyName: 'Upcore Technologies',
    title: "Webinar Sales Engine Redesign",
    description: "Redesigned the full-funnel webinar experience — landing page, email sequence, and post-session nurture. Mapped drop-off points across registration, attendance, and follow-up before rebuilding each touchpoint from the data up.",
    tags: ["Funnel Design", "Email Strategy", "Growth", "Landing Pages"],
    result: "478 sign-ups/month · +51% from baseline"
  },
  {
    company: 'upcore', companyName: 'Upcore Technologies',
    title: "Enterprise Outreach Optimization",
    description: "Transitioned from manual LinkedIn prospecting to a structured outbound system with lead scoring, BDR capacity planning, and a tiered qualification framework based on company size, vertical, and AI readiness signals.",
    tags: ["Outbound", "Lead Scoring", "B2B GTM", "Sales Ops"],
    result: "Cost-to-book reduced by 36%"
  },
  {
    company: 'upcore', companyName: 'Upcore Technologies',
    title: "AI Agent Market Intelligence Report",
    description: "Produced a 16-page research report covering the agentic AI tooling landscape, market sizing, adoption maturity curve, and 8+ enterprise case studies across manufacturing, legal, logistics, and finance verticals.",
    tags: ["Market Research", "AI Agents", "Competitive Intel", "Strategy"],
    result: "16-page whitepaper · 12 verticals mapped"
  },
  {
    company: 'upcore', companyName: 'Upcore Technologies',
    title: "Revenue Model & Pricing Strategy",
    description: "Built the revenue architecture and tiered pricing model for Upcore's AI agent services. Partnered with the CEO on financial modelling and the investor narrative as part of pre-seed fundraising preparation.",
    tags: ["Pricing Strategy", "Revenue Modelling", "Fundraising", "GTM"],
    result: "Revenue model · Pre-seed fundraising support"
  },
  {
    company: 'upcore', companyName: 'Upcore Technologies',
    title: "Enterprise Discovery Sprints",
    description: "Conducted structured discovery interviews with 20+ prospective clients across 12 verticals. Synthesised findings into a prioritised opportunity brief identifying the top-3 agentic AI use cases by severity, ROI, and buildability.",
    tags: ["Product Discovery", "User Research", "AI Strategy", "Enterprise"],
    result: "20+ interviews · Top-3 opportunity brief delivered"
  },
  {
    company: 'livekeeping', companyName: 'LiveKeeping',
    title: "E-Invoice Adoption Diagnosis — 19:1 Gap",
    description: "Investigated low utilization of the native E-Invoice module, mapping workflow disconnects between LiveKeeping and Tally's default integrations using the same methodology as the E-Way Bill diagnosis.",
    tags: ["Product Discovery", "Gap Analysis", "Fintech"],
    result: "19:1 E-Invoice adoption gap identified and reported to C-suite"
  },
  {
    company: 'livekeeping', companyName: 'LiveKeeping',
    title: "CEO Compliance Error Dashboard",
    description: "Engineered a multi-week tracking instrument summarizing complex GST compliance rejection codes across product tiers. Created a standardized data pipeline for executive visibility.",
    tags: ["Dashboarding", "Analytics", "GST Compliance"],
    result: "Weekly CEO dashboard tracking GST rejection errors · Reduced manual reporting effort"
  },
  {
    company: 'sierra', companyName: 'Sierra Living Concepts',
    title: "Landing Page Optimisation",
    description: "Used GA4 funnels and Clarity scroll/click insights to ship speed-tuned, modular landing templates that match paid-traffic intent.",
    tags: ["Product Management", "Landing Pages", "A/B Testing", "UX"],
    result: "Bounce rate: −22% · AOV: +8%"
  },
  {
    company: 'sierra', companyName: 'Sierra Living Concepts',
    title: "Customization Price Calculator",
    description: "Defined real-time quote logic and shipped a lightweight JS widget embedded on PDPs with validation and analytics hooks.",
    tags: ["JavaScript", "Product Management", "Analytics", "PDP UX"],
    result: "Custom-order attach rate: +28%"
  },
  {
    company: 'sierra', companyName: 'Sierra Living Concepts',
    title: "On-Site Search Algorithm Upgrade",
    description: "Re-weighted relevance factors, added synonym mapping, and ran query-intent experiments with controlled A/B rollout.",
    tags: ["Search", "A/B Testing", "Product Management"],
    result: "Search-attributed revenue: +14%"
  },
  {
    company: 'sierra', companyName: 'Sierra Living Concepts',
    title: "Customer Self-Service Portal",
    description: "Defined requirements, selected vendor, and designed track-my-order and self-serve flows with instrumentation. Reduced support load and unlocked cross-sell opportunities.",
    tags: ["CX", "Product Ops", "API Integration", "Analytics"],
    result: "Support tickets: −40% · NPS: +6 points · Cross-sell revenue: +43%"
  },
  {
    company: 'sierra', companyName: 'Sierra Living Concepts',
    title: "Product Page Optimisation",
    description: "Event-driven iterations on media gallery, variants, and micro-copy, informed by GA4 custom events and Clarity behavior data.",
    tags: ["GA4", "PDP UX", "Product Management", "UX Research"],
    result: "Add-to-cart rate: +27% · Page engagement time: +22%"
  }
];

const FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'upcore', label: 'Upcore', icon: Brain },
  { id: 'livekeeping', label: 'LiveKeeping', icon: Rocket },
  { id: 'sierra', label: 'Sierra Living Concepts', icon: Armchair },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    const sorted = [...allProjects].sort((a, b) => {
      if (a.caseStudyLink && !b.caseStudyLink) return -1;
      if (!a.caseStudyLink && b.caseStudyLink) return 1;
      return 0;
    });
    if (activeFilter === 'all') return sorted;
    return sorted.filter((p) => p.company === activeFilter);
  }, [activeFilter]);

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 mt-6"
        >
          <h2 className="sr-only">Filter projects by company</h2>
          <div className="flex overflow-x-auto gap-1.5 pb-1 md:pb-0 -mb-1 md:mb-0 scrollbar-none mb-6 md:mb-8">
              {FILTERS.map((f) => {
                const isActive = activeFilter === f.id;
                const Icon = f.icon;
                return (
                  <button
                    key={f.id}
                    onClick={() => { trackEvent('projects', 'filter', f.id); setActiveFilter(f.id); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-black whitespace-nowrap transition-all flex-shrink-0 ${
                      isActive ? 'bg-ink text-white' : 'bg-white text-ink/50 hover:text-ink hover:bg-canvas'
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    {f.label}
                  </button>
                );
              })}
            </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {filtered.map((project, index) => (
                  <ProjectCard key={`${project.company}-${index}`} index={index} {...project} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default Projects;
