import { Rocket, Armchair, Brain } from 'lucide-react';

export const openSourceProjects = [
  {
    name: 'DhanPlan',
    tagline: 'Precision retirement planning for Indian investors',
    description: 'SIP, EPF, PPF, NPS, and FIRE calculators with inflation-adjusted, institutional-grade projections.',
    status: 'In production',
    statusClass: 'bg-mint text-white',
    tags: ['India Finance', 'Calculators', 'SIP/EPF/NPS'],
    links: [{ label: 'dhanplan.in', href: 'https://www.dhanplan.in/', external: true }],
    code: null,
  },
  {
    name: 'LinkedIn Outreach Agent',
    tagline: 'Self-hosted LinkedIn outreach agent',
    description: 'You describe your target roles; the agent finds the right recruiters and hiring managers, writes personalised AI intros, and manages follow-ups. One-click macOS app. 766 commits, 6 releases.',
    status: 'Active · v1.0.9',
    statusClass: 'bg-sky text-ink',
    tags: ['Python', 'Django', 'Playwright', 'LLM agents'],
    links: [],
    code: 'https://github.com/saswatasg/TGBhunt',
  },
  {
    name: 'FilmRisk.AI',
    tagline: 'Bollywood greenlight risk engine',
    description: 'A 10-component scoring engine blending gradient-boosted ML with Bayesian priors, trained on 2,200+ Indian films — with brutally honest published backtests and known failure modes.',
    status: 'Working model',
    statusClass: 'bg-lemon text-ink',
    tags: ['Next.js', 'ML / GBM', 'Bayesian scoring', 'Backtesting'],
    links: [],
    code: 'https://github.com/saswatasg/FilmRisk.AI',
  },
  {
    name: 'Inventory Leveling Agent',
    tagline: 'Procurement intelligence for manufacturers',
    description: 'Explodes sales orders through BOMs, nets demand against supply, computes min stock per component, and back-schedules POs — with trapped working capital quantified in rupees. 28 reconciliation tests.',
    status: 'Completed · Client demo',
    statusClass: 'bg-sky text-ink',
    tags: ['React', 'TypeScript', 'MRP logic', 'Gantt scheduling'],
    links: [{ label: 'Live demo', href: 'https://inventory-leveling-agent-gamma.vercel.app', external: true }],
    code: 'https://github.com/saswatasg/inventory-leveling-agent',
  },
  {
    name: 'BlogHero',
    tagline: 'SEO content pipeline for non-technical teams',
    description: 'Pulls real GSC data to find content revival and gap opportunities, drafts with Gemini (fact-check pass included), creates WordPress drafts — never auto-publishes — and logs every run to Sheets.',
    status: 'Completed · In client use',
    statusClass: 'bg-sky text-ink',
    tags: ['Python', 'FastAPI', 'Gemini', 'GSC API'],
    links: [],
    code: 'https://github.com/saswatasg/bloghero_s',
  },
  {
    name: 'Topshe',
    tagline: 'Voice AI that runs entirely in your browser',
    description: 'Named after Feluda\u2019s assistant in the Ray stories \u2014 the one handed the research and planning \u2014 Topshe runs wake word, speech-to-text, and a quantised Qwen 2.5 model in-browser over WebAssembly. No server, no API bill, no data sent anywhere. Offline-capable PWA at $0/month.',
    status: 'Personal · Experimental',
    statusClass: 'bg-blush text-ink',
    tags: ['React 19', 'WASM LLM', 'Web Speech API', 'PWA'],
    links: [],
    code: 'https://github.com/saswatasg/topshe',
  },
  {
    name: '11 PM Cinema',
    tagline: 'Movie night, solved for couples',
    description: 'Picks your next film together based on mood — built for exactly two people. Live on Vercel and in active nightly service at home.',
    status: 'Completed · Used daily',
    statusClass: 'bg-mint text-white',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    links: [{ label: 'Live app', href: 'https://movie-sugest.vercel.app', external: true }],
    code: 'https://github.com/saswatasg/MovieSugest',
  },
  {
    name: 'Intent',
    tagline: 'Modern dating for people done with swiping',
    description: 'An AI matchmaker over verified profiles curating a small number of high-compatibility matches for India\u2019s 24\u201330s — built on Next.js and Supabase.',
    status: 'Demo · Launching 2027',
    statusClass: 'bg-purple text-white',
    tags: ['Next.js', 'Supabase', 'AI matchmaking'],
    links: [{ label: 'Demo', href: 'https://intent-app-o5nw.vercel.app', external: true }],
    code: 'https://github.com/saswatasg/intent-app',
  },
];

export const allProjects = [
  {
    company: 'upcore', companyName: 'Upcore Technologies',
    title: "Two-Stage Lead Scoring — 9 Research Signals Before Outreach",
    description: "Only 10% of leads are ready to buy. Built the B2B GTM framework that identifies which 10% — scoring prospects on 9 intent signals and 9 potential signals before a single outreach message is sent.",
    tags: ["B2B GTM", "Lead Scoring", "Enterprise", "Sales Ops"],
    result: "9+9 scoring signals · 75+ priority threshold · 24hr contact SLA · 83% scoring accuracy",
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
    description: "Built the revenue architecture and tiered pricing model for Upcore's AI agent services, partnering with the CEO on financial modelling and the investor narrative.",
    tags: ["Pricing Strategy", "Revenue Modelling", "GTM", "Strategy"],
    result: "Revenue model · Tiered pricing strategy"
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

export const FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'upcore', label: 'Upcore', icon: Brain },
  { id: 'livekeeping', label: 'LiveKeeping', icon: Rocket },
  { id: 'sierra', label: 'Sierra Living Concepts', icon: Armchair },
];

export const softwareSchema = openSourceProjects
  .filter((p) => p.code)
  .map((p) => ({
    '@type': 'SoftwareApplication',
    name: p.name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description: p.description,
    url: p.code.replace('github.com/', ''),
    codeRepository: p.code,
    author: { '@type': 'Person', '@id': 'https://saswatasg.com/#person', name: 'Saswata S. Sengupta' },
  }));
