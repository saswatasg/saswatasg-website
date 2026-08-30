import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import EmailCapture from '@/components/blog/EmailCapture';
import { posts, PILLAR_META, formatDate, toIsoDate } from '@/data/blogPosts';
import { trackEvent } from '@/utils/analytics';

const PILLARS = ['all', 'agents', 'growth', 'pm'];
const SITE_URL = 'https://saswatasg.com';

const BlogIndex = () => {
  const [pillar, setPillar] = useState('all');
  const filtered = pillar === 'all' ? posts : posts.filter((p) => p.pillar === pillar);

  useEffect(() => {
    trackEvent('blog', 'view_index', pillar);
  }, [pillar]);

  return (
    <>
      <PageMeta
        title="Blog | Saswata S. Sengupta — AI Agents & CRO"
        description="Notes from shipping AI agents and growth products in production — real architecture, real numbers, no invented stats."
        image={`${SITE_URL}/og/blog.png`}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': `${SITE_URL}/blog`,
            name: 'Saswata S. Sengupta — Blog',
            description: 'AI agents in production, e-commerce CRO, and AI-era product management — with the numbers.',
            url: `${SITE_URL}/blog`,
            author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Saswata S. Sengupta' },
            // Built from the unfiltered list so prerendered output is stable.
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: posts.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: p.title,
                url: `${SITE_URL}/blog/${p.slug}`,
              })),
            },
          })}
        </script>
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-coral text-white mb-4">Blog</span>
        <h1 className="text-3xl md:text-5xl font-display font-black text-ink leading-tight mb-3">
          AI agents, growth & product management — with the numbers.
        </h1>
        <p className="text-sm md:text-base font-semibold text-ink/60 max-w-2xl mb-8">
          Every post is grounded in shipped work: real architectures, real metrics, and honest failure modes.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {PILLARS.map((p) => (
            <button
              key={p}
              onClick={() => setPillar(p)}
              className={`px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all duration-150 ${
                pillar === p ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-blush'
              }`}
            >
              {p === 'all' ? 'All posts' : PILLAR_META[p].label}
            </button>
          ))}
        </div>

        <EmailCapture pillar={pillar} source="blog_index" />

        {filtered.length === 0 && (
          <div className="border-2 border-dashed border-ink/30 rounded-2xl p-10 text-center text-sm font-bold text-ink/50">
            No posts in this pillar yet — coming soon.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((post, i) => {
            const pillarMeta = PILLAR_META[post.pillar] || PILLAR_META.pm;
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  onClick={() => trackEvent('blog', 'open_post', post.slug)}
                  className="group block h-full border-2 border-black rounded-2xl bg-white p-6 flex flex-col gap-3 transition-all duration-150 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#0A0A0A]"
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${pillarMeta.accent} text-white`}>
                      {pillarMeta.label}
                    </span>
                    <time dateTime={toIsoDate(post.date)} className="text-[11px] font-bold text-ink/40">{formatDate(post.date)}</time>
                  </div>
                  <h2 className="text-lg md:text-xl font-display font-black text-ink leading-snug group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-sm text-ink/60 font-medium leading-relaxed flex-1">{post.description}</p>
                  <span className="text-xs font-bold text-coral flex items-center gap-1">
                    Read post <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BlogIndex;
