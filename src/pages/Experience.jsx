import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Map, Layers, GitBranch, Target, Brain, Lightbulb,
  Search, FileText, BarChart2, Bell, MessageSquare, TrendingUp,
  DollarSign, Zap, Settings, Users, Award, CheckCircle2
} from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { BlobMascot } from '@/components/Mascots';

const MetricTag = ({ children }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-medium bg-ink/10 text-ink mt-2">
    {children}
  </span>
);

const ExperienceCard = ({ role, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4 }}
    className="bg-canvas rounded-card p-8 md:p-10 border border-ink/10"
  >
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-2 text-sm font-medium text-ink/60">
        <Calendar className="w-4 h-4 text-ink/40" aria-hidden="true" />
        <span>{role.period}</span>
      </div>
      {role.type && (
        <span className="self-start sm:self-auto px-3 py-1 rounded-pill text-xs font-semibold bg-ink/10 text-ink border border-ink/10">
          {role.type}
        </span>
      )}
    </div>

    <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-1">
      {role.title}
    </h2>
    {role.company && (
      <h3 className="text-lg font-display font-medium text-ink/60 mb-3">{role.company}</h3>
    )}

    {role.context && (
      <p className="text-sm text-ink/60 italic mb-4 border-l-2 border-ink/20 pl-3">
        {role.context}
      </p>
    )}

    {role.tags && (
      <div className="flex flex-wrap gap-2 mb-6">
        {role.tags.map((tag, idx) => (
          <span key={idx} className="px-2.5 py-1 rounded-pill text-xs font-medium bg-ink/5 text-ink/70 border border-ink/10">
            {tag}
          </span>
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
            className="flex items-start gap-3 p-4 rounded-lg bg-white border border-ink/10"
          >
            <div className="mt-0.5 text-ink flex-shrink-0 bg-ink/5 p-1.5 rounded-md">
              {achievement.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-ink/80 leading-relaxed">{achievement.text}</p>
              {achievement.metric && (
                <MetricTag>{achievement.metric}</MetricTag>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </motion.div>
);

const roles = [
  {
    title: "Product Manager",
    company: "Upcore Technologies",
    period: "April 2026 – Present",
    type: "Full-time",
    context: "Leading product discovery and solution architecture at the intersection of AI agents and enterprise workflows.",
    tags: ["AI Agents", "Product Discovery", "Solution Architecture", "Enterprise", "Market Intelligence"],
    achievements: [
      { text: "Lead end-to-end discovery engagements with enterprise clients — mapping workflows, diagnosing operational bottlenecks, and identifying the top 3 highest-impact AI agent opportunities per engagement.", icon: <Map className="w-4 h-4" /> },
      { text: "Evaluate and prioritise agent build opportunities across 12 industry verticals — assessing problem severity, automation feasibility, and ROI potential to determine what gets resourced.", icon: <Layers className="w-4 h-4" /> },
      { text: "Translate client business problems into agent architecture briefs for engineering — bridging the gap between what clients describe and what can be deployed in under 30 days.", icon: <GitBranch className="w-4 h-4" /> },
      { text: "Conduct AI posture audits and produce opportunity assessments with ROI estimates per agent opportunity identified.", icon: <Target className="w-4 h-4" /> },
      { text: "Drive market intelligence across verticals — tracking agentic AI tooling, competitor positioning, and industry-specific automation trends.", icon: <Brain className="w-4 h-4" /> },
      { text: "Operate at the intersection of product discovery and client solution architecture — determining what gets built, for whom, and why.", icon: <Lightbulb className="w-4 h-4" /> }
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
      { text: "Diagnosed a 17:1 adoption gap where PRO+ subscribers were generating E-Way Bills via Tally instead of LiveKeeping's native module. Built executive presentation for VP/CEO to greenlight investigation.", icon: <Search className="w-4 h-4" /> },
      { text: "Identified E-Invoice adoption gap of 19:1 between Tally and LiveKeeping native module, fed into C-suite reporting.", icon: <FileText className="w-4 h-4" /> },
      { text: "Built multi-week CEO summary Excel report tracking rejection errors across GST compliance products.", icon: <BarChart2 className="w-4 h-4" /> },
      { text: "Led end-to-end notification strategy overhaul covering all user segments, plan tiers, renewal journeys, and conflict resolution logic.", icon: <Bell className="w-4 h-4" /> },
      { text: "Wrote push notification copy for feature releases across PRO and PRO+ tiers.", icon: <MessageSquare className="w-4 h-4" /> }
    ]
  },
  {
    title: "Product Manager (Growth)",
    company: "Sierra Living Concepts",
    period: "May 2024 – January 2026",
    type: "Full-time",
    context: "Owned the product growth roadmap for a US-based D2C furniture brand — from UX optimisation to revenue-driving features.",
    tags: ["D2C", "E-Commerce", "UX", "Analytics", "A/B Testing"],
    achievements: [
      { text: "Redesigned landing flows — bounce rate dropped from 41.04% to 32.54%", icon: <TrendingUp className="w-4 h-4" />, metric: "-20.7%" },
      { text: "Doubled lead submissions (2.14% → 4.40%) via form UX and CTA improvements", icon: <Target className="w-4 h-4" />, metric: "+105%" },
      { text: "Reduced cart & checkout drop-offs — recovered $329K/month in revenue", icon: <DollarSign className="w-4 h-4" />, metric: "$329K" },
      { text: "AI-powered lead assistant drove close rate up to 71.63%", icon: <Zap className="w-4 h-4" />, metric: "71.63%" },
      { text: "Configured 118 SKU pricing tools — ATC rate up 18.17%, +$32K/month", icon: <Settings className="w-4 h-4" />, metric: "+$32K" },
      { text: "Built 5 pricing configuration tools — custom orders up 34%, +$120K/month", icon: <Target className="w-4 h-4" />, metric: "+$120K" },
      { text: "Automated Salesforce CRM journeys — +$113K/month recurring revenue", icon: <Zap className="w-4 h-4" />, metric: "+$113K" },
      { text: "Led 70+ product rollouts collaborating with design, engineering, and sales teams.", icon: <Users className="w-4 h-4" />, metric: "70+" }
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
      { text: "Boosted enrollments by 24% and sales by 154.5%", icon: <TrendingUp className="w-4 h-4" /> },
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
      { text: "Ran Meta campaigns — traffic up 122%, engagement up 158%", icon: <TrendingUp className="w-4 h-4" /> },
      { text: "Designed creatives for social media and awareness events", icon: <Settings className="w-4 h-4" /> }
    ]
  },
  {
    title: "Freelance Photographer",
    company: "Self-Employed",
    period: "Sep 2019 – Jun 2021",
    type: "Freelance",
    context: "Led commercial shoots and managed a creative team of 6.",
    tags: ["Photography", "Team Leadership", "Creative Direction"],
    achievements: [
      { text: "Completed 58+ projects for events and commercial work", icon: <CheckCircle2 className="w-4 h-4" /> },
      { text: "Led a 6-person creative team delivering high-quality results", icon: <Users className="w-4 h-4" /> }
    ]
  }
];

function Experience() {
  const headerRef = React.useRef(null);

  return (
    <>
      <PageMeta />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-canvas rounded-card p-8 md:p-14 mb-4 border border-ink/10"
        >
          <span className="inline-block px-4 py-1.5 rounded-pill bg-lemon/30 text-ink text-sm font-medium mb-4 border border-ink/10">
            Career
          </span>
          <h1 className="text-ink">
            Professional Background
          </h1>
          <p className="mt-4 max-w-2xl">
            From AI agent discovery to D2C checkout optimisation — the roles and results that shaped my product journey.
          </p>
        </motion.div>

        <div className="space-y-6">
          {roles.map((role, index) => (
            <ExperienceCard key={index} role={role} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Experience;
