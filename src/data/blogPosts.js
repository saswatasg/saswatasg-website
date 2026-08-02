const postModules = import.meta.glob('/content/blog/*.mdx', { eager: true });

export const posts = Object.entries(postModules)
  .map(([filePath, mod]) => {
    const slug = filePath.split('/').pop().replace(/\.mdx$/, '');
    return {
      slug,
      ...(mod.frontmatter || {}),
      component: mod.default,
    };
  })
  .filter((post) => post.title && post.date)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

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
    title: 'Need the same treatment on your store?',
    body: 'Browse the CRO and checkout case studies — three separate problems, three targeted fixes, one aggregate myth busted.',
    label: 'Read the case studies',
    href: '/case-studies',
  },
  pm: {
    title: 'More on building products with AI',
    body: 'Follow along on LinkedIn for the day-to-day of shipping AI agents and growth products in production.',
    label: 'Follow on LinkedIn',
    href: 'https://www.linkedin.com/in/sss99/',
    external: true,
  },
};

export function readingTime(mdxSource) {
  const words = (mdxSource || '').replace(/```[\s\S]*?```/g, ' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
