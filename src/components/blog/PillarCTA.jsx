import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { PILLAR_CTA } from '@/data/blogPosts';
import { trackEvent } from '@/utils/analytics';
import { openScheduleBooking } from '@/utils/openCalendar';

const PillarCTA = ({ pillar }) => {
  const cta = PILLAR_CTA[pillar] || PILLAR_CTA.pm;
  const ctas = cta.ctas || [{ label: cta.label, href: cta.href, external: cta.external }];

  return (
    <aside className="border-2 border-black rounded-2xl bg-ink text-white p-6 md:p-8 my-10">
      <h2 className="text-lg md:text-xl font-display font-black mb-2">{cta.title}</h2>
      <p className="text-sm md:text-base text-white/70 font-medium mb-5">{cta.body}</p>
      <div className="flex flex-wrap gap-3">
        {ctas.map((c) =>
          c.action === 'book' ? (
            <button
              key={c.label}
              onClick={() => {
                trackEvent('blog', 'pillar_cta', `${pillar}:${c.label}`);
                openScheduleBooking();
              }}
              className="inline-flex items-center gap-2 bg-coral text-white rounded-lg border-2 border-white px-4 py-2.5 text-sm font-bold hover:bg-white hover:text-ink transition-colors"
            >
              <Phone className="w-4 h-4" />
              {c.label}
            </button>
          ) : (
            <a
              key={c.label}
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => trackEvent('blog', 'pillar_cta', `${pillar}:${c.label}`)}
              className="inline-flex items-center gap-2 bg-coral text-white rounded-lg border-2 border-white px-4 py-2.5 text-sm font-bold hover:bg-white hover:text-ink transition-colors"
            >
              {c.label} <ArrowRight className="w-4 h-4" />
            </a>
          )
        )}
      </div>
    </aside>
  );
};

export default PillarCTA;
