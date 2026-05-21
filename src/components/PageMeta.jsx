import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const defaultMeta = {
  title: "Saswata S. Sengupta | Product Manager — Building Products That Move Metrics",
  description: "PM at Upcore Technologies. IIT Jodhpur MBA. 73.1% → 53.9% (–26%) checkout abandonment reduction. AI agent discovery, B2B SaaS, growth analytics. Based in Kolkata.",
  ogTitle: "Saswata S. Sengupta | Product Manager",
  ogDescription: "PM at Upcore Technologies. IIT Jodhpur MBA. 73.1% → 53.9% (–26%) checkout abandonment reduction.",
  twitterTitle: "Saswata S. Sengupta | Product Manager",
  twitterDescription: "PM at Upcore Technologies. IIT Jodhpur MBA. 73.1% → 53.9% (–26%) checkout abandonment reduction."
};

const pageSpecificMeta = {
  '/': {
    title: "Saswata S. Sengupta | Product Manager — AI Agents, D2C Growth & B2B SaaS",
    description: "PM at Upcore Technologies. IIT Jodhpur MBA. 73.1% → 53.9% (–26%) checkout abandonment reduction. AI agent discovery, B2B SaaS, growth analytics. Based in Kolkata."
  },
  '/about': {
    title: "About Me | Saswata S. Sengupta — Product Manager",
    description: "Product Manager with a mix of product management, growth, and data analytics experience across B2B SaaS, D2C, and e-commerce. IIT Jodhpur MBA."
  },
  '/experience': {
    title: "Professional Background | Saswata S. Sengupta",
    description: "Product management experience across Upcore Technologies (AI agents), Sierra Living Concepts (D2C), and LiveKeeping (B2B SaaS)."
  },
  '/projects': {
    title: "Projects | Saswata S. Sengupta — Product Work",
    description: "Product work across B2B SaaS and D2C — every project grounded in a real problem, a real approach, and a real outcome."
  },
  '/contact': {
    title: "Contact | Saswata S. Sengupta",
    description: "Get in touch with Saswata S. Sengupta for collaborations, opportunities, or just to say hello."
  },
  '/case-studies': {
    title: "Case Studies | Saswata S. Sengupta",
    description: "Nine product decisions, explained in full — problem, diagnosis, options, outcome, and what I'd do differently."
  },
  '/case-studies/cart-checkout': {
    title: "Case Study: Cart & Checkout — –26% | Saswata S. Sengupta",
    description: "How I reduced cart abandonment from 73.1% to 53.9% through checkout instrumentation and three targeted fixes at Sierra Living Concepts."
  },
  '/case-studies/category-discovery': {
    title: "Case Study: Category Page Redesign — +17% | Saswata S. Sengupta",
    description: "How a 4-week sprint guided by GA4 custom events and Microsoft Clarity heatmaps resolved 30+ UX issues and lifted session-to-PDP-click conversion by 17%."
  },
  '/case-studies/lead-form': {
    title: "Case Study: Lead Form Overhaul — +105% | Saswata S. Sengupta",
    description: "How I rebuilt the lead capture form at Sierra Living Concepts with Material 3 components, contextual microcopy, and latency fixes — driving lead submissions up 105%."
  },
  '/case-studies/upcore-lead-scoring': {
    title: "Case Study: AI Lead Scoring — 71.63% Close Rate | Saswata S. Sengupta",
    description: "How I built an AI-powered lead scoring and routing engine at Upcore Technologies that drove close rate from 52% to 71.63%."
  },
  '/case-studies/sierra-lead-allocation': {
    title: "Lead Allocation & Routing | Saswata S. Sengupta",
    description: "How I built a data-backed lead routing system at Sierra Living Concepts — Gold/Silver/Bronze tiers, agent specialisation, and a 30-day pilot from 10% to full rollout."
  },
  '/case-studies/livekeeping-compliance-gap': {
    title: "Compliance Adoption Gap — 17:1 | Saswata S. Sengupta",
    description: "How I diagnosed a 17:1 gap between Tally and LiveKeeping for PRO+ compliance usage — and built the executive case that changed the product roadmap."
  },
  '/case-studies/livekeeping-send-greetings': {
    title: "Send Greetings + Nano Banana AI | Saswata S. Sengupta",
    description: "How I integrated Google's Nano Banana (Gemini Flash) into LiveKeeping's Pro+ Send Greetings feature — geo-segmented festival calendar, AI-generated custom greeting cards, +168% engagement."
  },
  '/case-studies/livekeeping-notifications': {
    title: "Push Notification Strategy | Saswata S. Sengupta",
    description: "Built LiveKeeping's push notification system from scratch — 27+ triggers, P0–P3 priority hierarchy, 3-slot daily cap, geo-segmented across 5 Indian regions."
  },
  '/case-studies/livekeeping-report-automation': {
    title: "Daily Report Automation | Saswata S. Sengupta",
    description: "Automated LiveKeeping's daily metrics report — unified Kibana, MongoDB, and GA4 into a single Google Sheets pipeline auto-populated at 11 AM via Apps Script."
  }
};

const PageMeta = ({ title, description, noindex = false }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const baseMeta = pageSpecificMeta[currentPath] || defaultMeta;
  const finalTitle = title || baseMeta.title;
  const finalDescription = description || baseMeta.description;

  const siteUrl = "https://saswatasg.com/";
  
  const cleanPath = currentPath === '/' ? '' : currentPath.replace(/^\//, '').replace(/\/$/, '');
  const finalUrl = `${siteUrl}${cleanPath || ''}`;
  
  const ogImage = "https://i.postimg.cc/Kv5xF852/DP-Linkedin.jpg";

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalUrl} />
      {noindex && <meta name="robots" content="noindex" />}
      
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Saswata S. Sengupta — Product Manager" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Saswata S. Sengupta" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Saswata S. Sengupta — Product Manager" />
      <meta name="twitter:site" content="@saswatasg" />
      <meta name="twitter:creator" content="@saswatasg" />
    </Helmet>
  );
};

export default PageMeta;
