import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const SITE_URL = 'https://saswatasg.com';

const ROUTES = [
  '/',
  '/about',
  '/experience',
  '/projects',
  '/case-studies',
  '/case-studies/cart-checkout',
  '/case-studies/category-discovery',
  '/case-studies/lead-form',
  '/case-studies/upcore-lead-scoring',
  '/case-studies/sierra-lead-allocation',
  '/case-studies/livekeeping-compliance-gap',
  '/case-studies/livekeeping-send-greetings',
  '/case-studies/livekeeping-notifications',
  '/case-studies/livekeeping-report-automation',
  '/contact',
];

const BLOG_DIR = path.join(dist, 'blog');
try {
  const blogEntries = await fs.readdir(BLOG_DIR);
  ROUTES.push('/blog');
  for (const entry of blogEntries) {
    if (entry !== 'index.html') ROUTES.push(`/blog/${entry}`);
  }
} catch {
  console.warn('[verify-prerender] no blog directory found — blog routes skipped');
}

let failures = 0;
const usedTitles = new Map();

function fail(route, issue) {
  failures += 1;
  console.error(`  [FAIL] ${route}: ${issue}`);
}

function fileFor(route) {
  return route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.replace(/^\//, ''), 'index.html');
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

for (const route of ROUTES) {
  const file = fileFor(route);
  let html;
  try {
    html = await fs.readFile(file, 'utf-8');
  } catch {
    fail(route, 'missing prerendered file');
    continue;
  }

  const text = stripHtml(html);
  if (text.length < 50) {
    fail(route, `renders only ${text.length} words of body text`);
  }

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1Count !== 1) {
    fail(route, `expected exactly 1 H1, found ${h1Count}`);
  }

  const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*\/?>/i);
  const expectedCanonical = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
  if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
    fail(route, `canonical is ${canonicalMatch ? canonicalMatch[1] : 'missing'}, expected ${expectedCanonical}`);
  }

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (!title) {
    fail(route, 'missing <title>');
  } else {
    if (title.length > 60) fail(route, `title is ${title.length} chars (>60): "${title}"`);
    if (usedTitles.has(title)) fail(route, `title duplicated on ${usedTitles.get(title)}`);
    usedTitles.set(title, route);
  }

  const descriptionMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*\/?>/i);
  const description = descriptionMatch ? descriptionMatch[1] : '';
  if (!description) {
    fail(route, 'missing meta description');
  } else if (description.length > 155) {
    fail(route, `description is ${description.length} chars (>155)`);
  }

  const hasInternalNavLinks = ['/about', '/case-studies'].every((link) => html.includes(`href="${link}"`));
  if (!hasInternalNavLinks) fail(route, 'nav links not found in served HTML');
}

await fs.access(path.join(dist, '404.html')).catch(() => fail('/404', 'missing 404.html'));

if (failures > 0) {
  console.error(`\n[verify-prerender] ${failures} violation(s) — check the audit findings above.`);
  process.exit(1);
} else {
  console.log(`[verify-prerender] OK — ${ROUTES.length} routes + 404 all pass (words, H1, canonical, title, description, nav).`);
}
