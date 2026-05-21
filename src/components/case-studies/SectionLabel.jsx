import React from 'react';

const SectionLabel = ({ children, color = '#0A0A0A' }) => (
  <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-2" style={{ color }}>
    {children}
  </p>
);

export default SectionLabel;
