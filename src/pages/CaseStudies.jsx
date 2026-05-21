import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const caseStudies = [
  {
    id: 'livekeeping-compliance-gap',
    slug: 'livekeeping-compliance-gap',
    company: 'LiveKeeping · IndiaMART',
    year: 'B2B SaaS · Analytical',
    title: 'The 17:1 Compliance Gap Nobody Had Measured',
    description: 'For every E-Way Bill generated in LiveKeeping, 17 were going to Tally. I found this in 100K+ API logs and took it to the CEO.',
    stats: [
      { value: '17:1', label: 'E-Way Bill Gap' },
      { value: '19:1', label: 'E-Invoice Gap' },
      { value: 'C-Suite', label: 'Escalation' },
      { value: '–58%', label: 'Rejection Rate' },
    ],
    bg: 'bg-ink',
    shadowColor: '#FF90E8',
    accentClass: 'bg-white/10',
    tags: ['Product Discovery', 'Data Analysis', 'Executive Comms', 'B2B SaaS'],
    textColor: 'text-white',
    textColorMuted: 'text-white/60',
  },
  {
    id: 'cart-checkout',
    slug: 'cart-checkout',
    company: 'Sierra Living Concepts',
    year: 'D2C E-Commerce',
    title: 'Cart & Checkout Redesign — –26% Abandonment',
    description: '480,000 sessions. 8 Baymard violations. One mobile-first redesign that outperformed Wayfair on every metric.',
    stats: [
      { value: '–26%', label: 'Checkout Abandonment' },
      { value: '+47%', label: 'Mobile CVR' },
      { value: '+49%', label: 'Checkout Completion' },
      { value: '480K', label: 'Sessions Analysed' },
    ],
    bg: 'bg-blush',
    shadowColor: '#FF90E8',
    accentClass: 'bg-pink/30',
    tags: ['UX Research', 'A/B Testing', 'Mobile-First', 'GA4'],
    textColor: 'text-ink',
    textColorMuted: 'text-ink/60',
  },
  {
    id: 'livekeeping-send-greetings',
    slug: 'livekeeping-send-greetings',
    company: 'LiveKeeping · IndiaMART',
    year: 'AI Integration · Feature PM',
    title: 'Send Greetings + Nano Banana — +168% Engagement',
    description: 'Integrated Google Gemini Flash image AI into a dormant Pro+ feature. Built a geo-segmented festival calendar across 5 Indian regions.',
    stats: [
      { value: '+168%', label: 'Feature Engagement' },
      { value: '27 occasions', label: 'Festival Calendar' },
      { value: 'Nano Banana', label: 'AI Model' },
      { value: '5 regions', label: 'Geo-Segmented' },
    ],
    bg: 'bg-lemon',
    shadowColor: '#625BF6',
    accentClass: 'bg-white/50',
    tags: ['AI Integration', 'Feature PM', 'India SMB', 'Engagement'],
    textColor: 'text-ink',
    textColorMuted: 'text-ink/60',
  },
  {
    id: 'livekeeping-notifications',
    slug: 'livekeeping-notifications',
    company: 'LiveKeeping · IndiaMART',
    year: 'Systems Design · Notification Strategy',
    title: 'Push Notification Architecture — Built From Zero',
    description: '27+ triggers. P0–P3 priority hierarchy. 3-slot daily cap with conflict resolution. Geo-segmented across 5 Indian regions. Built the entire system from scratch.',
    stats: [
      { value: '27+', label: 'Event Triggers' },
      { value: '3-slot', label: 'Daily Cap + Priority Queue' },
      { value: '5 regions', label: 'Geo-Segmented' },
      { value: 'PRO/PRO+', label: 'Plan-Tier Logic' },
    ],
    bg: 'bg-sky',
    shadowColor: '#3DDC91',
    accentClass: 'bg-white/50',
    tags: ['Systems Design', 'Notification Strategy', 'GST Compliance', 'India SMB'],
    textColor: 'text-ink',
    textColorMuted: 'text-ink/60',
  },
  {
    id: 'category-discovery',
    slug: 'category-discovery',
    company: 'Sierra Living Concepts',
    year: 'D2C Discovery',
    title: 'Category & Landing Redesign — +34% Leads',
    description: 'Replaced commodity category pages with story-driven, trust-led journeys. 1.1M BigQuery events. 376 in-session intercepts.',
    stats: [
      { value: '+34%', label: 'Qualified Leads' },
      { value: '+24%', label: 'Session Duration' },
      { value: '–16%', label: 'Bounce Rate' },
      { value: '+27%', label: 'ATC Rate' },
    ],
    bg: 'bg-white',
    shadowColor: '#0A0A0A',
    accentClass: 'bg-canvas',
    tags: ['BigQuery', 'Clarity', 'Lead Gen', 'Conversion'],
    textColor: 'text-ink',
    textColorMuted: 'text-ink/60',
  },
  {
    id: 'lead-form',
    slug: 'lead-form',
    company: 'Sierra Living Concepts',
    year: 'Form Optimization',
    title: 'Lead Form Optimization — +124% in 28 Days',
    description: 'Static form. Zero conditional logic. Rebuilt into category-specific modules. No traffic changes — pure UX architecture.',
    stats: [
      { value: '+124%', label: 'Submission Rate' },
      { value: '–41%', label: 'Mobile Completion Time' },
      { value: '–68%', label: 'Rage Clicks' },
      { value: '–31%', label: 'Bounce (Form Page)' },
    ],
    bg: 'bg-blush',
    shadowColor: '#3DDC91',
    accentClass: 'bg-pink/30',
    tags: ['Behavioral Analytics', 'UX Redesign', 'Clarity', 'Mobile'],
    textColor: 'text-ink',
    textColorMuted: 'text-ink/60',
  },
  {
    id: 'sierra-lead-allocation',
    slug: 'sierra-lead-allocation',
    company: 'Sierra Living Concepts',
    year: 'Sales Operations',
    title: 'Lead Allocation & Routing — Built the System',
    description: 'Website Forms convert at 63.5%. Chat converts at 4.7%. The team was treating them identically. Built Gold/Silver/Bronze routing across 4 agents.',
    stats: [
      { value: '63.5%', label: 'Gold Source CVR' },
      { value: '0.4%', label: 'Bronze Source CVR' },
      { value: '5.2→3.5', label: 'Days to Close Target' },
      { value: '30 days', label: 'Pilot to Full Rollout' },
    ],
    bg: 'bg-lemon',
    shadowColor: '#0A0A0A',
    accentClass: 'bg-white/50',
    tags: ['Sales Ops', 'Data Analysis', 'Routing Design', 'Revenue Operations'],
    textColor: 'text-ink',
    textColorMuted: 'text-ink/60',
  },
  {
    id: 'livekeeping-report-automation',
    slug: 'livekeeping-report-automation',
    company: 'LiveKeeping · IndiaMART',
    year: 'Internal Tooling',
    title: 'Daily Report Automation — 3 Sources, 88 Rows, 11 AM',
    description: 'Kibana + MongoDB + GA4 → Google Sheets. One Apps Script trigger. Manual data entry eliminated across the team.',
    stats: [
      { value: '3', label: 'Data Sources Unified' },
      { value: '88 rows', label: 'Fully Mapped' },
      { value: '11 AM', label: 'Auto-Populate' },
      { value: '0', label: 'Manual Steps' },
    ],
    bg: 'bg-mint',
    shadowColor: '#0A0A0A',
    accentClass: 'bg-white/50',
    tags: ['Google Apps Script', 'Kibana', 'MongoDB', 'GA4'],
    textColor: 'text-ink',
    textColorMuted: 'text-ink/60',
  },
  {
    id: 'upcore-lead-scoring',
    slug: 'upcore-lead-scoring',
    company: 'Upcore Technologies',
    year: 'B2B GTM · Framework',
    title: 'Two-Stage Lead Scoring — 9 Research Signals Before Outreach',
    description: 'Only 10% of leads are ready to buy. Built the system that identifies which 10% — before a single outreach message is sent.',
    stats: [
      { value: '9+9', label: 'Scoring Signals' },
      { value: '75+', label: 'Priority Threshold' },
      { value: '24 hrs', label: 'Contact SLA' },
      { value: '2-stage', label: 'Prospect + Potential' },
    ],
    bg: 'bg-ink',
    shadowColor: '#F4EC4A',
    accentClass: 'bg-white/10',
    tags: ['B2B GTM', 'Lead Scoring', 'Enterprise', 'Sales Ops'],
    textColor: 'text-white',
    textColorMuted: 'text-white/60',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const CaseStudies = () => {
  const navigate = useNavigate();

  const getRowLayout = (index) => {
    if (index === 0 || index === 1) return 'md:grid-cols-3';
    return 'md:grid-cols-4';
  };

  return (
    <>
      <PageMeta
        title="Case Studies | Saswata S. Sengupta"
        description="Nine product decisions, explained in full — problem, diagnosis, options, outcome, and what I'd do differently."
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16"
      >
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 relative overflow-hidden"
          style={{ boxShadow: '12px 12px 0px 0px #0A0A0A' }}
        >
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-pink border-2 border-black rounded-xl rotate-12 hidden md:block" />
          <div className="absolute top-16 right-10 w-10 h-10 bg-lemon border-2 border-black rounded-lg -rotate-6 hidden md:block" />

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-pink text-ink text-xs font-bold border-2 border-black mb-3 relative z-10">
            Case Studies
          </span>
          <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight relative z-10">
            How I actually think.
          </h1>
          <p className="mt-3 text-sm md:text-base text-ink/70 font-medium max-w-2xl relative z-10">
            Nine problems, nine approaches, nine before/afters. No vanity metrics.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 mt-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.id}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.005, transition: { duration: 0.2 } }}
              onClick={() => navigate(`/case-studies/${cs.slug}`)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/case-studies/${cs.slug}`); }}
              tabIndex={0}
              role="button"
              className={`${cs.bg} border-2 border-black rounded-2xl p-6 md:p-8 relative overflow-hidden group cursor-pointer`}
              style={{ boxShadow: `8px 8px 0px 0px ${cs.shadowColor}` }}
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/30 border-2 border-black rounded-lg rotate-12 hidden md:block group-hover:rotate-[20deg] transition-all duration-300" />

              <div className="flex items-center gap-2 mb-3 relative z-10">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border border-black text-[10px] font-bold ${cs.bg === 'bg-ink' ? 'bg-white text-ink' : 'bg-ink text-white'}`}>
                  {cs.company}
                </span>
                <span className={`text-[10px] font-bold ${cs.textColorMuted}`}>{cs.year}</span>
              </div>

              <h2 className={`text-xl md:text-2xl font-display font-black ${cs.textColor} mb-3 relative z-10 leading-tight`}>
                {cs.title}
              </h2>

              <p className={`text-sm md:text-base ${cs.textColorMuted} font-medium leading-relaxed mb-5 relative z-10 max-w-3xl`}>
                {cs.description}
              </p>

              <div className={`grid grid-cols-2 md:${cs.stats.length > 3 ? 'grid-cols-4' : 'grid-cols-3'} gap-3 mb-5 relative z-10`}>
                {cs.stats.map((stat, si) => (
                  <div key={si} className={`${cs.accentClass} border-2 border-black rounded-xl p-3 text-center`}>
                    <div className={`text-xl md:text-2xl font-display font-black ${cs.textColor}`}>{stat.value}</div>
                    <p className={`text-[10px] font-bold ${cs.textColorMuted} mt-0.5`}>{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
                {cs.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 rounded-lg ${cs.bg === 'bg-ink' ? 'bg-white/10 text-white/60' : 'bg-white text-ink/60'} text-[10px] font-bold border-2 border-black`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-ink/60 transition-colors relative z-10 group/link"
                style={cs.bg === 'bg-ink' ? { color: 'white' } : {}}
              >
                Read Full Case Study
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div variants={cardVariants} className="mt-6 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink/50 hover:text-ink transition-colors group"
          >
            ← Back to Projects
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CaseStudies;
