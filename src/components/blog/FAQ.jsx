import React from 'react';
import { Helmet } from 'react-helmet-async';

const FAQ = ({ items }) => {
  if (!items || !items.length) return null;

  return (
    <section className="my-10">
      <h2 className="text-2xl font-display font-black text-ink mb-5">Frequently asked questions</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group border-2 border-black rounded-xl bg-white overflow-hidden"
            open={i === 0}
          >
            <summary className="cursor-pointer list-none px-4 md:px-5 py-3.5 flex items-center justify-between gap-3 font-bold text-sm md:text-base text-ink">
              {item.q}
              <span className="text-coral transition-transform duration-200 group-open:rotate-45 text-xl leading-none">+</span>
            </summary>
            <div className="px-4 md:px-5 pb-4 text-sm md:text-base text-ink/70 leading-relaxed">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
};

export function FAQJsonLd({ items, url }) {
  if (!items || !items.length) return null;
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        })}
      </script>
    </Helmet>
  );
}

export default FAQ;
