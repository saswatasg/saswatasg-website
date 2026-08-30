import postStats from './postStats.json';

const postModules = import.meta.glob('/content/blog/*.mdx', { eager: true });

export const posts = Object.entries(postModules)
  .map(([filePath, mod]) => {
    const slug = filePath.split('/').pop().replace(/\.mdx$/, '');
    const stats = postStats[slug] || {};
    return {
      slug,
      ...(mod.frontmatter || {}),
      // Computed at build time by tools/generate-static-files.mjs — overrides
      // any hand-authored frontmatter value so reading time stays honest.
      readingMinutes: stats.readingMinutes ?? mod.frontmatter?.readingMinutes ?? 1,
      wordCount: stats.wordCount ?? 0,
    };
  })
  .filter((post) => post.title && post.date)
  .sort((a, b) => new Date(b.updated || b.date) - new Date(a.updated || a.date) || new Date(b.date) - new Date(a.date));

export const postsBySlug = Object.fromEntries(posts.map((post) => [post.slug, post]));

export function relatedPosts(post, limit = 3) {
  return posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aShared = (a.pillar === post.pillar ? 1 : 0) + (a.anchorProject === post.anchorProject ? 1 : 0);
      const bShared = (b.pillar === post.pillar ? 1 : 0) + (b.anchorProject === post.anchorProject ? 1 : 0);
      return bShared - aShared;
    })
    .slice(0, limit);
}

export const PILLAR_META = {
  agents: { label: 'AI Agents', accent: 'bg-purple', text: 'text-purple' },
  growth: { label: 'Growth & CRO', accent: 'bg-coral', text: 'text-coral' },
  pm: { label: 'Product Management', accent: 'bg-lemon', text: 'text-lemon' },
};

export const PILLAR_CTA = {
  agents: {
    title: 'Want to see how these agents are wired?',
    body: 'Browse the open-source repos and live demos behind every agent mentioned here.',
    label: 'See the projects',
    href: '/projects',
  },
  growth: {
    title: 'Want these numbers on your store?',
    body: 'Book a 15-min teardown — no deck, no push. I’ll map your leak in one call.',
    ctas: [
      { label: 'Book a call', href: null, action: 'book' },
      { label: 'Connect on LinkedIn', href: 'https://www.linkedin.com/in/sss99/', external: true },
    ],
  },
  pm: {
    title: 'Want a teardown of your AI workflow?',
    body: 'Book a 15-min call — no deck, no push. Or follow the daily shipping notes on LinkedIn.',
    ctas: [
      { label: 'Book a call', href: null, action: 'book' },
      { label: 'Follow on LinkedIn', href: 'https://www.linkedin.com/in/sss99/', external: true },
    ],
  },
};

export function toIsoDate(value) {
  const d = value instanceof Date ? value : new Date(value);
  return d.toISOString().slice(0, 10);
}

export function formatDate(value) {
  const d = value instanceof Date ? value : new Date(value);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
