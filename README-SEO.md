# SEO & content pipeline

How this site's SEO actually works, as of the blog overhaul. Supersedes the old Lovable.dev brief notes below this doc previously tracked.

## Build pipeline

```
npm run build
  → node tools/validate-posts.mjs       content contract gate (frontmatter, dupes, casing, links)
  → node tools/generate-static-files.mjs sitemap.xml, feed.xml, llms.txt, llms-full.txt, src/data/postStats.json
  → vite build                          SPA bundle → dist/
  → node tools/generate-og-images.mjs   per-post 1200×630 OG PNGs → dist/og/
  → node scripts/prerender.mjs          SSR every route → dist/<route>/index.html
  → node scripts/verify-prerender.mjs   SEO assertion gate (fails the build on violations)
```

Every blog post and static route is prerendered to real HTML — this is not a client-only SPA for crawlers.

## Content contract (`tools/validate-posts.mjs`)

Every post in `content/blog/*.mdx` must have:
- Frontmatter: `title` (≤60 chars), `description` (≤155 chars), `slug` matching the filename, `date`/`updated` (not in the future), `pillar` (`agents`/`growth`/`pm`), `targetKeyword`, `secondaryKeywords`, `anchorProject` (a case-study slug or known project id), `faq` (3–5 items, answers ≤155 chars)
- Body: `<AnswerBox>`, `<FAQ items={frontmatter.faq} />`, at least one `<Figure>`, no duplicate `<Figure src>`, no duplicate H2 headings or 200+ char paragraphs (catches copy-paste bugs), consistent brand casing (Upcore/LiveKeeping/Sierra/DhanPlan/Topshe), at least one external authority link, valid internal `/blog/*` and `/case-studies/*` links

`readingMinutes` is **not** hand-authored — it's computed from the post body (220 wpm) by `tools/generate-static-files.mjs` into `src/data/postStats.json`, which `src/data/blogPosts.js` imports and merges onto every post at build time.

## Images

- Inline diagrams are hand-authored SVGs under `public/blog-assets/<post>/`, rendered via `src/components/blog/Figure.jsx` (explicit `width`/`height` to prevent layout shift, `loading="lazy"`, `decoding="async"`, error fallback).
- Social share images are **generated**, not hand-made: `tools/generate-og-images.mjs` uses [satori](https://github.com/vercel/satori) + `@resvg/resvg-js` to render a branded 1200×630 PNG per post into `dist/og/<slug>.png`, plus `dist/og/blog.png` for the index. Fonts are vendored at `tools/og/fonts/` (Inter, TTF only — satori doesn't support WOFF2). OG images are referenced as `https://saswatasg.com/og/<slug>.png` from `BlogLayout.jsx`.

## Meta & structured data

- `src/components/PageMeta.jsx` — site-wide Helmet component (title, description, canonical, RSS autodiscovery, full OG + Twitter set, optional `noindex`). Used by static pages and the blog index.
- `src/components/blog/BlogLayout.jsx` — per-post Helmet: canonical, OG/Twitter with the generated OG image, `article:published_time`/`article:modified_time`, and JSON-LD for `Article` (with `image`, `wordCount`, `keywords`, `articleSection`) + `BreadcrumbList`. `src/components/blog/FAQ.jsx` emits `FAQPage` JSON-LD.
- `src/pages/blog/BlogIndex.jsx` emits `Blog` + `ItemList` JSON-LD built from the unfiltered post list (stable across the pillar filter, since only the unfiltered list is prerendered).
- Unknown `/blog/:slug` renders `noindex` via `PageMeta` (`src/pages/blog/BlogPost.jsx`) — no soft-404s.

`scripts/prerender.mjs` strips **all** template OG/Twitter/robots/canonical/description tags (global regex) before injecting the route's Helmet output, so prerendered HTML never ships duplicate or conflicting meta tags.

## Discovery files

`tools/generate-static-files.mjs` writes into `public/` (checked in, regenerated on every build):
- `sitemap.xml` — all static pages + every post, `lastmod` clamped to never exceed today
- `feed.xml` — RSS 2.0, `pubDate` from frontmatter
- `llms.txt` / `llms-full.txt` — AI-crawler content dumps

`public/robots.txt` allows major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot) and points to the sitemap. `tools/ping-indexnow.mjs` pings Bing IndexNow on `main` pushes (see `.github/workflows/ci.yml`).

## Verification (`scripts/verify-prerender.mjs`)

Runs as the last build step and fails the build if any prerendered route has: missing/duplicate/oversized title or description, wrong or missing canonical, more than one H1, missing/duplicate `og:type` or `og:image`, a stray `robots` meta on an indexable page, (for posts) a missing OG PNG file, missing `article:published_time`, missing `<time datetime>`, unparsable or incomplete Article JSON-LD, or (for `/blog`) missing `ItemList` JSON-LD. Also validates `404.html` is `noindex`-only and checks `sitemap.xml`/`feed.xml` for missing posts or future-dated entries.

## Local verification

```bash
npm run build
npm run preview   # serves dist/ on :3000
```

Check a specific post's prerendered head: `dist/blog/<slug>/index.html`. Check a generated OG image: `dist/og/<slug>.png`.
