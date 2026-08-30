import { describe, it, expect } from 'vitest';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

describe('validate-posts contract', () => {
  it('has 15 posts with valid frontmatter', async () => {
    const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith('.mdx'));
    expect(files.length).toBe(15);
    for (const file of files) {
      const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf-8');
      const { data } = matter(raw);
      expect(data.title, `${file} title`).toBeTruthy();
      expect(data.title.length, `${file} title≤60`).toBeLessThanOrEqual(60);
      expect(data.description.length, `${file} desc≤155`).toBeLessThanOrEqual(155);
      expect(['agents', 'growth', 'pm'], `${file} pillar`).toContain(data.pillar);
      expect(data.slug, `${file} slug`).toBe(file.replace(/\.mdx$/, ''));
    }
  });

  it('rejects future dates', async () => {
    const today = new Date().toISOString().slice(0, 10);
    const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith('.mdx'));
    for (const file of files) {
      const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf-8');
      const { data } = matter(raw);
      const iso = new Date(data.date).toISOString().slice(0, 10);
      expect(iso <= today, `${file} future date ${iso} > ${today}`).toBe(true);
    }
  });
});
