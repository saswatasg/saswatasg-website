import { readFileSync, readdirSync } from 'node:fs';
import { resolve, basename, extname } from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = resolve(process.cwd(), 'content/blog');
const CASE_STUDY_SLUGS = [
  'upcore-lead-scoring', 'livekeeping-compliance-gap', 'cart-checkout',
  'category-discovery', 'lead-form', 'sierra-lead-allocation',
  'livekeeping-send-greetings', 'livekeeping-notifications',
  'livekeeping-report-automation',
];

const REQUIRED = [
  'title', 'description', 'slug', 'date', 'updated', 'pillar',
  'targetKeyword', 'secondaryKeywords', 'anchorProject', 'readingMinutes', 'faq',
];
const PILLARS = ['agents', 'growth', 'pm'];
const errors = [];
const slugs = new Map();

const files = readdirSync(CONTENT_DIR).filter((f) => extname(f) === '.mdx');

for (const file of files) {
  const path = resolve(CONTENT_DIR, file);
  const raw = readFileSync(path, 'utf8');
  const { data, content } = matter(raw);

  if (data.slug !== basename(file, '.mdx')) {
    errors.push(`${file}: frontmatter slug "${data.slug}" does not match filename`);
  }
  if (slugs.has(data.slug)) {
    errors.push(`${file}: duplicate slug "${data.slug}" (also used by ${slugs.get(data.slug)})`);
  }
  slugs.set(data.slug, file);

  for (const key of REQUIRED) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      errors.push(`${file}: missing required frontmatter field "${key}"`);
    }
  }

  if (data.title && data.title.length > 60) {
    errors.push(`${file}: title is ${data.title.length} chars (max 60) — "${data.title}"`);
  }
  if (data.description && data.description.length > 155) {
    errors.push(`${file}: description is ${data.description.length} chars (max 155)`);
  }
  if (data.pillar && !PILLARS.includes(data.pillar)) {
    errors.push(`${file}: pillar "${data.pillar}" not in [${PILLARS.join(', ')}]`);
  }
  if (data.secondaryKeywords !== undefined && !Array.isArray(data.secondaryKeywords)) {
    errors.push(`${file}: secondaryKeywords must be an array`);
  }

  const date = data.date ? new Date(data.date).getTime() : NaN;
  const updated = data.updated ? new Date(data.updated).getTime() : NaN;
  if (Number.isNaN(date)) errors.push(`${file}: date "${data.date}" is not a valid date`);
  if (Number.isNaN(updated)) errors.push(`${file}: updated "${data.updated}" is not a valid date`);
  if (!Number.isNaN(date) && !Number.isNaN(updated) && updated < date) {
    errors.push(`${file}: updated (${data.updated}) is before date (${data.date})`);
  }

  const faq = data.faq;
  if (faq !== undefined) {
    if (!Array.isArray(faq) || faq.length < 3 || faq.length > 5) {
      errors.push(`${file}: faq must be an array of 3-5 items (got ${Array.isArray(faq) ? faq.length : typeof faq})`);
    } else {
      faq.forEach((item, i) => {
        if (!item || typeof item.q !== 'string' || !item.q.trim() || typeof item.a !== 'string' || !item.a.trim()) {
          errors.push(`${file}: faq item ${i + 1} must have non-empty "q" and "a"`);
        }
        if (item.a && item.a.length > 155) {
          errors.push(`${file}: faq item ${i + 1} answer is ${item.a.length} chars (max 155)`);
        }
      });
    }
  }

  if (!content.includes('AnswerBox')) {
    errors.push(`${file}: post must include <AnswerBox> (top 3-5 line answer to the primary keyword)`);
  }
  if (!content.includes('FAQ')) {
    errors.push(`${file}: post must include <FAQ items={frontmatter.faq} />`);
  }

  const linkRe = /\]\((\/[^)\s#]+)(?:#[^)\s]*)?\)/g;
  let match;
  while ((match = linkRe.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('/blog/')) {
      const target = href.replace('/blog/', '');
      if (!slugs.has(target) && target !== '') {
        errors.push(`${file}: internal link ${href} — no blog post with slug "${target}"`);
      }
    } else if (href.startsWith('/case-studies/')) {
      const target = href.replace('/case-studies/', '');
      if (!CASE_STUDY_SLUGS.includes(target)) {
        errors.push(`${file}: internal link ${href} — unknown case study "${target}"`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`[validate-posts] FAILED — ${errors.length} issue(s) across ${files.length} post(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`[validate-posts] OK — ${files.length} post(s) pass the content contract.`);
