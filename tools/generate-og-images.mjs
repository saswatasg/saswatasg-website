// Build-time OG image generator: renders a branded 1200×630 PNG per blog post
// (plus one card for /blog) into dist/og/. Runs after `vite build` so the
// images land next to the deployed assets; referenced from BlogLayout.jsx as
// https://saswatasg.com/og/<slug>.png.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const root = process.cwd();
const BLOG_DIR = path.join(root, 'content', 'blog');
const OUT_DIR = path.join(root, 'dist', 'og');
const FONT_DIR = path.join(root, 'tools', 'og', 'fonts');

const PILLARS = {
  agents: { label: 'AI AGENTS', bg: '#6D28D9', fg: '#FFFFFF' },
  growth: { label: 'GROWTH & CRO', bg: '#E85D3A', fg: '#FFFFFF' },
  pm: { label: 'PRODUCT MANAGEMENT', bg: '#F59E0B', fg: '#0A0A0A' },
};

const INK = '#0A0A0A';
const CANVAS = '#F5F2EC';

const el = (type, style, children) => ({ type, props: { style, children } });
const text = (content, style) => ({ type: 'div', props: { style, children: content } });

function card({ title, pillar, date }) {
  const badge = PILLARS[pillar] || { label: 'BLOG', bg: INK, fg: '#FFFFFF' };
  return el(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: CANVAS,
      padding: '48px',
      fontFamily: 'Inter',
    },
    [
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          border: `8px solid ${INK}`,
          padding: '56px 64px',
        },
        [
          el('div', { display: 'flex' }, [
            text(badge.label, {
              display: 'flex',
              backgroundColor: badge.bg,
              color: badge.fg,
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 4,
              padding: '10px 24px',
              borderRadius: 999,
              border: `4px solid ${INK}`,
            }),
          ]),
          text(title, {
            display: 'flex',
            color: INK,
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: '1000px',
          }),
          el(
            'div',
            {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: `4px solid ${INK}`,
              paddingTop: '28px',
            },
            [
              text('Saswata S. Sengupta · saswatasg.com', {
                display: 'flex',
                color: INK,
                fontSize: 30,
                fontWeight: 800,
              }),
              text(date || '', {
                display: 'flex',
                color: INK,
                fontSize: 28,
                fontWeight: 400,
                opacity: 0.7,
              }),
            ]
          ),
        ]
      ),
    ]
  );
}

async function render(props, outFile, fonts) {
  const svg = await satori(card(props), {
    width: 1200,
    height: 630,
    fonts,
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  await fs.writeFile(outFile, png);
  console.log(`[generate-og-images] wrote ${path.relative(root, outFile)} (${Math.round(png.length / 1024)}KB)`);
}

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const fonts = [
  { name: 'Inter', weight: 400, style: 'normal', data: await fs.readFile(path.join(FONT_DIR, 'Inter-400.ttf')) },
  { name: 'Inter', weight: 800, style: 'normal', data: await fs.readFile(path.join(FONT_DIR, 'Inter-800.ttf')) },
];

await fs.mkdir(OUT_DIR, { recursive: true });

const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith('.mdx'));
for (const file of files) {
  const { data } = matter(await fs.readFile(path.join(BLOG_DIR, file), 'utf-8'));
  if (!data.title) continue;
  const slug = data.slug || file.replace(/\.mdx$/, '');
  await render(
    { title: data.title, pillar: data.pillar, date: formatDate(data.date) },
    path.join(OUT_DIR, `${slug}.png`),
    fonts
  );
}

await render(
  { title: 'AI agents in production, e-commerce CRO, and AI-era product management — with the numbers.', pillar: null, date: '' },
  path.join(OUT_DIR, 'blog.png'),
  fonts
);

console.log(`[generate-og-images] done — ${files.length + 1} image(s).`);
