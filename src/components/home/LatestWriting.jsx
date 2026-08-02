import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { posts, PILLAR_META } from '@/data/blogPosts';
import { trackEvent } from '@/utils/analytics';

const LatestWriting = () => {
  const latest = posts.slice(0, 3);
  if (!latest.length) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-coral">Latest writing</span>
          <h2 className="text-2xl md:text-4xl font-display font-black text-ink mt-1">Notes from shipping</h2>
        </div>
        <Link
          to="/blog"
          onClick={() => trackEvent('home', 'latest_writing_all')}
          className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-purple hover:text-coral transition-colors"
        >
          All posts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {latest.map((post, i) => {
          const pillarMeta = PILLAR_META[post.pillar] || PILLAR_META.pm;
          return (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                onClick={() => trackEvent('home', 'latest_writing_post', post.slug)}
                className="group block h-full border-2 border-black rounded-2xl bg-white p-5 flex flex-col gap-3 transition-all duration-150 hover:-translate-y-1 hover:shadow-[5px_5px_0_0_#0A0A0A]"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${pillarMeta.accent} text-white`}>
                    {pillarMeta.label}
                  </span>
                  <span className="text-[11px] font-bold text-ink/40">{post.date}</span>
                </div>
                <h3 className="text-base font-display font-black text-ink leading-snug group-hover:underline flex-1">
                  {post.title}
                </h3>
                <span className="text-xs font-bold text-coral flex items-center gap-1">
                  Read post <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <Link
        to="/blog"
        onClick={() => trackEvent('home', 'latest_writing_all')}
        className="sm:hidden inline-flex items-center gap-1 text-sm font-bold text-purple mt-5"
      >
        All posts <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
};

export default LatestWriting;
