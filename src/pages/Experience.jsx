import React from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '@/utils/analytics';
import {
  Calendar, Map, Layers, GitBranch, Target, Brain, Lightbulb,
  Search, FileText, BarChart2, Bell, MessageSquare, TrendingUp,
  DollarSign, Zap, Settings, Users, Award, CheckCircle2, ArrowRight
} from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const MetricTag = ({ children }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black mt-2">
    {children}
  </span>
);

const cardColors = ['bg-blush', 'bg-sky', 'bg-mint', 'bg-lemon', 'bg-blush', 'bg-sky'];
const cardShadows = [
  '6px 6px 0px 0px #F4EC4A',
  '6px 6px 0px 0px #E85D3A',
  '6px 6px 0px 0px #625BF6',
  '6px 6px 0px 0px #3DDC91',
  '6px 6px 0px 0px #F4EC4A',
  '6px 6px 0px 0px #E85D3A',
];

const openCaseStudy = (slug) => window.dispatchEvent(new CustomEvent('openCaseStudyPopup', { detail: slug }));

const ExperienceCard = ({ role, index }) => {
  const slugFromPath = (path) => path.replace('/case-studies/', '');
  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className={`${cardColors[index % cardColors.length]} border-2 border-black rounded-2xl p-8 md:p-10 relative overflow-hidden group`}
    style={{ boxShadow: cardShadows[index % cardShadows.length] }}
  >
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none" />
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-2 text-sm font-bold text-ink/60">
        <Calendar className="w-4 h-4 text-ink" />
        <span>{role.period}</span>
      </div>
      {role.type && (
        <motion.span whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0], transition: { duration: 0.15 } }} className="self-start sm:self-auto px-3 py-1 rounded-lg text-xs font-bold bg-white text-ink border-2 border-black cursor-default">
          {role.type}
        </motion.span>
      )}
    </div>

    <h2 className="text-xl md:text-2xl font-display font-black text-ink mb-1">
      {role.title}
    </h2>
    {role.company && (
      <h3 className="text-base font-display font-bold text-ink/60 mb-3">{role.company}</h3>
    )}

    {role.context && (
      <p className="text-sm text-ink/70 font-medium italic mb-4 border-l-2 border-ink pl-3">
        {role.context}
      </p>
    )}

    {role.tags && (
      <div className="flex flex-wrap gap-2 mb-6">
        {role.tags.map((tag, idx) => (
          <motion.span key={idx} whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0], transition: { duration: 0.15 } }} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-ink border-2 border-black cursor-default">
            {tag}
          </motion.span>
        ))}
      </div>
    )}

    {role.achievements && role.achievements.length > 0 && (
      <div className="grid gap-3 grid-cols-1">
        {role.achievements.map((achievement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ x: 3, scale: 1.005, transition: { duration: 0.15 } }}
            className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-black"
          >
            <div className="mt-0.5 text-ink flex-shrink-0 bg-canvas p-1.5 rounded-lg border-2 border-black">
              {achievement.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-ink/80 leading-relaxed font-medium">{achievement.text}</p>
              {achievement.metric && (
                <MetricTag>{achievement.metric}</MetricTag>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    )}
    {role.caseStudies && role.caseStudies.length > 0 && (
      <div className="mt-4 pt-4 border-t-2 border-black/10">
        <p className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-2">Related Case Studies</p>
        <div className="flex flex-wrap gap-2">
          {role.caseStudies.map((cs, i) => (
            <button key={i} onClick={() => { trackEvent('experience', 'case_study', cs.label); openCaseStudy(slugFromPath(cs.to)); }} className="text-xs font-bold bg-white text-ink px-2.5 py-1 rounded-lg border-2 border-black hover:bg-canvas transition-colors cursor-pointer">
              {cs.label}
            </button>
          ))}
        </div>
      </div>
    )}
  </motion.div>
  );
};

const roles = [
  {
    title: "Product Manager",
    company: "Upcore Technologies",
    period: "April 2026 – Present",
    type: "Full-time",
    context: "Leading product discovery and solution architecture at the intersection of AI agents and enterprise workflows.",
    tags: ["AI Agents", "Product Discovery", "Solution Architecture", "Enterprise", "Market Intelligence"],
    achievements: [
      { text: "Overhauled webinar sales engine — designed full-funnel landing page and email sequence; scaled registrations to 478 sign-ups/month (up 51% from baseline).", icon: <Target className="w-4 h-4" />, metric: "+51%" },
      { text: "Transitioned enterprise outreach from manual LinkedIn prospecting to data-driven outbounding with lead scoring and capacity planning for 3 BDRs — optimized cost-to-book by 36%.", icon: <DollarSign className="w-4 h-4" />, metric: "-36%" },
      { text: "Performed discovery with 20+ prospective enterprise clients across 12 verticals, top-3 high-impact agentic AI opportunities.", icon: <Map className="w-4 h-4" />, metric: "20+" },
      { text: "Produced a 16-page 'State of AI Agents' report covering market sizing, tooling landscape, adoption maturity curve, and 8+ case studies across industries.", icon: <FileText className="w-4 h-4" />, metric: "16 pages" },
      { text: "Built revenue model and pricing strategy for AI agent services and partnered with CEO on securing pre-seed funding.", icon: <DollarSign className="w-4 h-4" /> },
      { text: "Built market intelligence across verticals — tracking agentic AI tooling, competitor positioning, and industry-specific automation trends.", icon: <Brain className="w-4 h-4" /> }
    ],
    caseStudies: [
      { to: '/case-studies/upcore-lead-scoring', label: 'Lead Scoring System' }
    ]
  },
  {
    title: "Associate Product Manager",
    company: "LiveKeeping (An IndiaMART Company)",
    period: "January 2026 – April 2026",
    type: "Full-time",
    context: "Led B2B SaaS analytics and feature adoption initiatives for Indian SMBs.",
    tags: ["Fintech", "B2B SaaS", "GST Compliance", "Analytics", "Notifications"],
    achievements: [
      { text: "Diagnosed a 17:1 adoption gap where PRO+ subscribers generated E-Way Bills via Tally instead of LiveKeeping's native module; built an executive presentation for VP/CEO that greenlit a cross-functional investigation.", icon: <Search className="w-4 h-4" />, metric: "17:1 ratio" },
      { text: "Identified a similar 19:1 E-Invoice adoption gap between Tally and LiveKeeping, feeding analysis into C-suite reporting.", icon: <FileText className="w-4 h-4" />, metric: "19:1" },
      { text: "Built an automated weekly CEO report tracking GST rejection errors across compliance products — replaced manual data pulls with structured, recurring insights.", icon: <BarChart2 className="w-4 h-4" /> },
      { text: "Led a company-wide notification strategy overhaul covering all user segments, plan tiers, renewal journeys, and conflict resolution logic across the complete product suite.", icon: <Bell className="w-4 h-4" /> }
    ],
    caseStudies: [
      { to: '/case-studies/livekeeping-compliance-gap', label: 'Compliance Gap' },
      { to: '/case-studies/livekeeping-notifications', label: 'Notification Strategy' },
      { to: '/case-studies/livekeeping-send-greetings', label: 'Send Greetings' },
      { to: '/case-studies/livekeeping-report-automation', label: 'Report Automation' }
    ]
  },
  {
    title: "Product Manager (Growth)",
    company: "Sierra Living Concepts",
    period: "May 2024 – January 2026",
    type: "Full-time",
    context: "Owned the product growth roadmap for a US-based D2C furniture brand — from UX optimisation to revenue-driving features. (Transitioned internally to LiveKeeping in Jan 2026)",
    tags: ["D2C", "E-Commerce", "UX", "Analytics", "A/B Testing"],
    achievements: [
      { text: "Redesigned landing flows — bounce rate dropped from 41.04% to 32.54%", icon: <TrendingUp className="w-4 h-4" />, metric: "-20.7%" },
      { text: "Doubled lead submissions (2.14% → 4.40%) via form UX and CTA improvements", icon: <Target className="w-4 h-4" />, metric: "+105%" },
      { text: "Reduced checkout abandonment by 26% (73.1% → 53.9%)", icon: <DollarSign className="w-4 h-4" />, metric: "–26%" },
      { text: "AI-powered lead assistant drove close rate up to 71.63%", icon: <Zap className="w-4 h-4" />, metric: "71.63%" },
      { text: "Configured 118 SKU pricing tools — ATC rate up 18.17%, +$32K/month", icon: <Settings className="w-4 h-4" />, metric: "+$32K" },
      { text: "Built 5 pricing configuration tools — custom orders up 34%, +$120K/month", icon: <Target className="w-4 h-4" />, metric: "+$120K" },
      { text: "Automated Salesforce CRM journeys — +$113K/month recurring revenue", icon: <Zap className="w-4 h-4" />, metric: "+$113K" },
      { text: "Led 70+ product rollouts collaborating with design, engineering, and sales teams.", icon: <Users className="w-4 h-4" />, metric: "70+" }
    ],
    caseStudies: [
      { to: '/case-studies/cart-checkout', label: 'Checkout Optimisation' },
      { to: '/case-studies/lead-form', label: 'Lead Form Overhaul' },
      { to: '/case-studies/category-discovery', label: 'Category Redesign' },
      { to: '/case-studies/sierra-lead-allocation', label: 'Lead Allocation' }
    ]
  },
  {
    title: "Marketing & Sales Intern",
    company: "Mozo Hunt Pvt Ltd",
    period: "May – Jul 2023",
    type: "Internship",
    context: "Drove customer acquisition and enrollment strategies.",
    tags: ["Sales", "Marketing Strategy", "Market Research"],
    achievements: [
      { text: "Boosted enrollments by 24% and sales by 154.5%", icon: <TrendingUp className="w-4 h-4" />, metric: "+24% / +154%" },
      { text: "Reduced customer acquisition cost through market and competitor research", icon: <Target className="w-4 h-4" /> },
      { text: "Awarded Certificate of Excellence for impact", icon: <Award className="w-4 h-4" /> }
    ]
  },
  {
    title: "Marketing Intern",
    company: "Rotaract Club, Delhi",
    period: "Dec 2022",
    type: "Internship",
    context: "Managed digital campaigns and creative assets for social awareness events.",
    tags: ["Meta Ads", "Social Media", "Design"],
    achievements: [
      { text: "Ran Meta campaigns — traffic up 122%, engagement up 158%", icon: <TrendingUp className="w-4 h-4" />, metric: "122% / 158%" },
      { text: "Designed creatives for social media and awareness events", icon: <Settings className="w-4 h-4" /> }
    ]
  }
];

const earlierRoles = [
  {
    title: "Freelance Photographer",
    company: "Self-Employed",
    period: "Sep 2019 – Jun 2021",
    type: "Freelance",
    context: "Led commercial shoots and managed a creative team of 6.",
    tags: ["Photography", "Team Leadership", "Creative Direction"],
    achievements: [
      { text: "Completed 58+ projects for events and commercial work", icon: <CheckCircle2 className="w-4 h-4" />, metric: "58+" },
      { text: "Led a 6-person creative team delivering high-quality results", icon: <Users className="w-4 h-4" /> }
    ]
  }
];

function Experience() {
  return (
    <>
      <PageMeta />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 mb-6"
          style={{ boxShadow: '10px 10px 0px 0px #E85D3A' }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-lemon text-ink text-xs font-bold border-2 border-black mb-3">
            Career
          </span>
          <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight">
            Professional Background
          </h1>
          <p className="mt-2 text-sm md:text-base text-ink/70 font-medium max-w-2xl">
            From AI agent discovery to D2C checkout optimisation — the roles and results that shaped my product journey.
          </p>
        </motion.div>

        {/* TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 mb-6 relative overflow-hidden"
          style={{ boxShadow: '8px 8px 0px 0px #0A0A0A' }}
        >
          <div className="absolute -top-4 -right-4 w-10 h-10 bg-coral border-2 border-black rounded-lg rotate-12 hidden md:block" />
          <div className="absolute bottom-6 left-6 w-6 h-6 bg-lemon border-2 border-black rounded-lg -rotate-6 hidden md:block" />

          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple/20 text-purple text-xs font-bold border-2 border-black">
              The Story So Far
            </span>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-ink/10 hidden md:block" />

            <div className="space-y-6 md:space-y-0">
              {[
                { year: '2026', title: 'AI Agent Product Management', company: 'Upcore Technologies', desc: 'Leading enterprise AI agent discovery and market strategy.' },
                { year: '2026', title: 'Associate PM — B2B SaaS', company: 'LiveKeeping (IndiaMART)', desc: 'Diagnosed 17:1 adoption gap. Built notification architecture from scratch.' },
                { year: '2024–26', title: 'Product Manager (Growth)', company: 'Sierra Living Concepts', desc: 'Reduced checkout abandonment 26%. Drove +105% lead submissions. 70+ product rollouts.' },
                { year: '2023', title: 'Marketing & Sales Intern', company: 'Mozo Hunt', desc: 'Boosted enrollments 24%. Awarded Certificate of Excellence.' },
                { year: '2022–24', title: 'MBA — Marketing & Analytics', company: 'IIT Jodhpur', desc: 'CAT 97.69 percentile. Product foundations and strategic thinking.' },
                { year: '2017–21', title: 'B.Tech — Mechanical Engineering', company: 'Jalpaiguri Government Engineering College', desc: 'Systems thinking and engineering problem-solving foundation.' },
              ].map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="relative md:pl-10 pb-6 md:pb-4 last:pb-0"
                >
                  {/* Dot on timeline */}
                  <div className="hidden md:flex absolute left-[4px] top-1 w-4 h-4 rounded-full bg-white border-2 border-ink items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-ink" />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                    <span className="text-[10px] font-black text-ink/30 uppercase tracking-widest md:w-16 flex-shrink-0">{milestone.year}</span>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                        <h3 className="text-sm font-black text-ink">{milestone.title}</h3>
                        <span className="text-xs font-bold text-ink/50">{milestone.company}</span>
                      </div>
                      <p className="text-xs text-ink/60 font-medium mt-0.5">{milestone.desc}</p>
                    </div>
                    {i < 5 && (
                      <motion.div
                        className="hidden md:block text-ink/20 ml-auto"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.div>
                    )}
                  </div>

                  {/* Mobile separator */}
                  {i < 5 && <div className="md:hidden mt-2 h-px bg-ink/10" />}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="space-y-5">
          {roles.map((role, index) => (
            <ExperienceCard key={index} role={role} index={index} />
          ))}
        </div>

        {earlierRoles.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px flex-1 bg-ink/10" />
              <span className="text-xs font-bold text-ink/40 uppercase tracking-widest">Earlier Experience</span>
              <span className="h-px flex-1 bg-ink/10" />
            </div>
            <div className="space-y-5">
              {earlierRoles.map((role, index) => (
                <ExperienceCard key={index} role={role} index={index + roles.length} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Experience;
