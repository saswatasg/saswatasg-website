import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PILLAR_CTA } from '@/data/blogPosts';
import { trackEvent } from '@/utils/analytics';

const PillarCTA = ({ pillar }) => {
  const cta = PILLAR_CTA[pillar] || PILLAR_CTA.pm;

  return (
    <aside className="border-2 border-black rounded-2xl bg-ink text-white p-6 md:p-8 my-10">
      <h2 className="text-lg md:text-xl font-display font-black mb-2">{cta.title}</h2>
      <p className="text-sm md:text-base text-white/70 font-medium mb-5">{cta.body}</p>
      <a
        href={cta.href}
        {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={() => trackEvent('blog', 'pillar_cta', `${pillar}:${cta.label}`)}
        className="inline-flex items-center gap-2 bg-coral text-white rounded-lg border-2 border-white px-4 py-2.5 text-sm font-bold hover:bg-white hover:text-ink transition-colors"
      >
        {cta.label} <ArrowRight className="w-4 h-4" />
      </a>
    </aside>
  );
};

export default PillarCTA;
