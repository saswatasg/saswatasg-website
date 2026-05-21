import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const Card = ({ children, className = '', style = {} }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -2, transition: { duration: 0.15 } }}
    className={`border-2 border-black rounded-2xl p-6 md:p-8 ${className}`}
    style={style}
  >
    {children}
  </motion.div>
);

const LiveKeepingReportAutomation = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16"
    >
      <PageMeta
        title="Daily Report Automation | Saswata S. Sengupta"
        description="Automated LiveKeeping's daily metrics report — unified Kibana, MongoDB, and GA4 into a single Google Sheets pipeline auto-populated at 11 AM via Apps Script."
      />
      <Link
        to="/case-studies"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/50 hover:text-ink mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to all case studies
      </Link>

      {/* HERO */}
      <motion.div
        variants={itemVariants}
        className="bg-mint border-2 border-black rounded-2xl p-10 md:p-16"
        style={{ boxShadow: '12px 12px 0px 0px #0A0A0A' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black">
            LiveKeeping · Internal Tooling
          </span>
          <span className="text-xs font-bold text-ink/40">Feb–Mar 2026 · Data Infrastructure</span>
        </div>
        <h1 className="font-display font-black text-4xl md:text-6xl text-ink leading-tight">
          3 data sources. 88 rows. One report. Auto-populated at 11 AM every day.
        </h1>
        <p className="text-xl text-ink/60 font-medium mt-4 max-w-4xl">
          The daily metrics report was being filled manually by pulling from Kibana, MongoDB, and GA4 separately — every morning. I automated it.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { value: '3', label: 'Data Sources Unified', sub: 'Kibana · MongoDB · GA4' },
            { value: '88 rows', label: 'Metrics Tracked', sub: '6 sections across user cohorts' },
            { value: '11 AM', label: 'Daily Auto-Populate', sub: 'Google Apps Script trigger' },
            { value: '6 sections', label: 'Report Coverage', sub: 'Users, Backentry, Eway, E-Invoice, Greetings, GST' },
          ].map((m, i) => (
            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4">
              <div className="font-display font-black text-3xl text-ink">{m.value}</div>
              <p className="text-xs font-bold text-ink/80 mt-1">{m.label}</p>
              <p className="text-[10px] text-ink/50 mt-0.5">{m.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CONTEXT BAR */}
      <motion.div
        variants={itemVariants}
        className="mt-6 bg-white border-2 border-black rounded-xl p-4 flex flex-col md:flex-row gap-4 text-sm font-medium text-ink/70"
      >
        <span>Role: Associate PM — Identified need, designed architecture, built scaffold, coordinated with team</span>
        <span className="hidden md:block">|</span>
        <span>Stack: Google Sheets, Google Apps Script, Kibana (Elasticsearch), MongoDB, GA4 Data API</span>
        <span className="hidden md:block">|</span>
        <span>Output: Working automation scaffold + API connection guide for engineering handoff</span>
      </motion.div>

      {/* SECTION 1: THE PROBLEM */}
      <div className="mt-8">
        <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">BEFORE STATE</p>

        <Card className="bg-white">
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Every morning, someone on the team was manually pulling numbers from three separate systems — Kibana for compliance event logs, MongoDB for user tier counts, Google Analytics 4 for feature-level engagement — and entering them column by column into an Excel sheet. The report had 88 rows across 6 sections and 25 date columns. It existed. It had to be filled every day. It took real time, introduced copy-paste errors, and the data was always from yesterday — by the time anyone read it, another 24 hours had passed.
          </p>
        </Card>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            { name: 'KIBANA (Elasticsearch)', desc: 'Backentry counts, E-Way Bill events, E-Invoice events. Event-level compliance logs from the backend.' },
            { name: 'MONGODB', desc: 'Total users by tier (Classic, Growth, PRO, PRO+). User counts, plan activation status, cohort breakdown.' },
            { name: 'GOOGLE ANALYTICS 4', desc: 'Send Greetings actions, GST Search usage. Feature-level engagement from the mobile app.' },
          ].map((src, i) => (
            <div key={i} className="bg-lemon border-2 border-black rounded-2xl p-5">
              <p className="text-xs font-black text-ink/40 mb-1">{src.name}</p>
              <p className="text-sm text-ink/80 font-medium leading-relaxed">{src.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white border-2 border-black rounded-xl p-5 mt-4">
          <p className="text-sm text-ink/80 font-medium leading-relaxed">
            88 rows. 6 sections. 25 date columns (one per day, rolling). Sections: (1) Total Users by plan tier · (2) Backentry events · (3) E-Way Bill generation counts · (4) E-Invoice generation counts · (5) Send Greetings actions · (6) GST Search queries
          </p>
        </motion.div>
      </div>

      {/* SECTION 2: THE ARCHITECTURE */}
      <div className="mt-8">
        <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">WHAT I DESIGNED</p>

        <motion.div variants={itemVariants} className="bg-ink border-2 border-black rounded-2xl p-6">
          <p className="text-white font-display font-black text-lg mb-4">One Apps Script function. Runs at 11 AM. Fills the next empty column.</p>
          <div className="bg-white/10 border border-white/20 rounded-xl p-4 font-mono text-sm text-white/80 leading-relaxed">
            [Google Apps Script — Time-based trigger: 11 AM daily]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;↓<br />
            [Find the next empty date column in row 2]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;↓<br />
            [Write yesterday&#39;s date as the column header]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;↓<br />
            ├── Query Kibana (Elasticsearch REST API) → Backentry, E-Way, E-Invoice rows<br />
            ├── Query MongoDB (Atlas Data API or pymongo) → User tier count rows<br />
            └── Query GA4 Data API → Greetings, GST Search rows<br />
            &nbsp;&nbsp;&nbsp;&nbsp;↓<br />
            [Write all values into the correct rows of that column]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;↓<br />
            [Share updated sheet via email or Slack — optional]
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            { name: 'KIBANA', desc: 'Elasticsearch REST API. Query the event index with a date-range filter for yesterday. Aggregate by event_type. Return counts per compliance feature.' },
            { name: 'MONGODB', desc: 'Atlas Data API (HTTP-based, no driver needed) OR direct pymongo connection. Query users collection by plan field. Count documents per tier.' },
            { name: 'GA4', desc: 'Native Google Apps Script integration OR GA4 Data API. Date-range report for yesterday. Filter by event_name for greetings and GST search events.' },
          ].map((src, i) => (
            <div key={i} className="bg-white border-2 border-black rounded-xl p-5">
              <p className="text-xs font-black text-ink/40 mb-1">{src.name}</p>
              <p className="text-sm text-ink/70 font-medium leading-relaxed">{src.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* SECTION 3: WHAT I BUILT */}
      <div className="mt-8">
        <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">THE SCAFFOLD</p>

        <Card className="bg-white">
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed mb-6">
            I built the complete Apps Script scaffold — all 88 rows mapped to their source and their cell location, the column-finder logic, and placeholder functions for each data source. The team could fill in API credentials and connection strings as access was granted, section by section.
          </p>

          <div className="bg-blush border-2 border-black rounded-xl p-5">
            <p className="text-xs font-black text-ink/40 mb-2">Implementation sequencing</p>
            <div className="space-y-2">
              <p className="text-sm text-ink/80 font-medium"><strong>Week 1:</strong> Move from Excel to Google Sheets. Set up GA4 Sheets add-on. Get Greetings and GST Search data flowing automatically — these require no backend access.</p>
              <p className="text-sm text-ink/80 font-medium"><strong>Week 2:</strong> Work with backend team for MongoDB Atlas API keys or reporting endpoint. Get user tier counts automated.</p>
              <p className="text-sm text-ink/80 font-medium"><strong>Week 3:</strong> Tackle Kibana — either direct Elasticsearch access or a CSV export workflow from the ops team. Each section becomes automated independently — gaps filled manually until full pipeline is live.</p>
            </div>
          </div>

          <div className="bg-lemon border-2 border-black rounded-xl p-5 mt-4">
            <p className="text-xs font-black text-ink/40 mb-1">Why Apps Script not Python</p>
            <p className="text-sm text-ink/80 font-medium leading-relaxed">
              Python with a scheduler (cron, GCP VM) would have been more powerful. Apps Script was the right call: it runs inside Google Workspace with no infrastructure to maintain, it integrates natively with GA4 and Sheets, and it&#39;s maintainable by non-engineers on the team. The constraint was the team, not the technology.
            </p>
          </div>
        </Card>
      </div>

      {/* SECTION 4: IMPACT */}
      <div className="mt-8">
        <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">WHAT THIS CHANGED</p>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Manual time saved', desc: 'Estimated 30-45 minutes per day across the team — just data entry' },
            { title: 'Error rate', desc: 'Copy-paste errors from switching between 3 browser tabs eliminated' },
            { title: 'Latency', desc: 'Data available at 11 AM daily rather than whenever someone finished pulling it manually' },
            { title: 'Scalability', desc: 'Adding a new metric = adding one row + one API query, not a new manual process' },
          ].map((k, i) => (
            <div key={i} className="bg-white border-2 border-black rounded-2xl p-5">
              <p className="font-display font-black text-lg text-ink">{k.title}</p>
              <p className="text-sm text-ink/70 font-medium mt-1">{k.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="bg-ink border-2 border-black rounded-2xl p-6 mt-4">
          <p className="text-white text-sm md:text-base font-medium leading-relaxed">
            Internal tooling is underrated as a PM signal. Fixing a data pipeline doesn&#39;t ship to users — but it gives the team faster, more accurate information every single day. Compounded across a quarter, that&#39;s dozens of better-informed product decisions. I prioritised this because I could see how the manual process was degrading data confidence on the team.
          </p>
        </motion.div>
      </div>

      {/* SECTION 5: RETROSPECTIVE */}
      <div className="mt-8">
        <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">RETROSPECTIVE</p>

        <motion.div variants={itemVariants} className="bg-mint border-2 border-black rounded-2xl p-7">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">1</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                I&#39;d have started with the GA4 automation only and shipped it in 3 days. Starting with &#39;automate all 3 sources&#39; created a coordination dependency on engineering for Kibana and MongoDB access. GA4 integration had zero blockers and could have delivered immediate value.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">2</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                The scaffold I built assumes stable schemas. I should have added schema validation — if MongoDB adds a new user tier or Kibana renames an event field, the script would silently write zeros without any alert. Error handling and monitoring should have been in V1.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">3</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                Presenting to leadership with a working 1-section automation (just GA4) would have been more compelling than a complete scaffold with placeholder functions. Show don&#39;t tell — even for internal tooling.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM NAV */}
      <motion.div variants={itemVariants} className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/case-studies/livekeeping-notifications" className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/50 hover:text-ink transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Push Notification Strategy
        </Link>
        <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm font-bold text-ink/50 hover:text-ink transition-colors group">
          ← All Case Studies →
        </Link>
        <Link to="/case-studies/upcore-lead-scoring" className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/50 hover:text-ink transition-colors group">
          Two-Stage Lead Scoring
          <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default LiveKeepingReportAutomation;
