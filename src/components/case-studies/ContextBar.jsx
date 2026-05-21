import React from 'react';

const ContextBar = ({ company, period, tags = [] }) => (
  <div className="flex flex-wrap items-center gap-2 mb-4">
    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-white/20">
      {company}
    </span>
    <span className="text-[10px] font-bold text-ink/40 uppercase tracking-wider">{period}</span>
    {tags.map((tag, i) => (
      <span key={i} className="text-[10px] font-bold text-ink/30 uppercase tracking-wider">
        {i > 0 && <span className="mx-1 text-ink/20">·</span>}{tag}
      </span>
    ))}
  </div>
);

export default ContextBar;
