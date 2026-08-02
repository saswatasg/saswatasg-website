import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE = 'https://saswatasg.com';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const BING_HOST = 'api.indexnow.org';

async function collectUrls() {
  const sitemapPath = resolve(process.cwd(), 'public/sitemap.xml');
  if (!existsSync(sitemapPath)) {
    console.error('[indexnow] public/sitemap.xml not found — run the build first.');
    process.exit(1);
  }
  const xml = readFileSync(sitemapPath, 'utf8');
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const urls = await collectUrls();

  if (process.env.INDEXNOW_SIMULATE === '1') {
    console.log(`[indexnow] SIMULATE — ${urls.length} URL(s) would be submitted to ${BING_HOST} (no key file, no API call).`);
    for (const url of urls.slice(0, 5)) console.log(`  - ${url}`);
    if (urls.length > 5) console.log(`  …and ${urls.length - 5} more`);
    return;
  }

  if (!INDEXNOW_KEY) {
    console.error('[indexnow] INDEXNOW_KEY env var missing — skipping real submission (use INDEXNOW_SIMULATE=1 to dry-run).');
    process.exit(1);
  }

  const keyFile = resolve(process.cwd(), 'public', `${INDEXNOW_KEY}.txt`);
  writeFileSync(keyFile, INDEXNOW_KEY);
  console.log(`[indexnow] wrote ${INDEXNOW_KEY}.txt to public/`);

  const res = await fetch(`https://${BING_HOST}/indexnow`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: SITE.replace('https://', ''), key: INDEXNOW_KEY, keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`, urlList: urls }),
  });

  if (!res.ok && res.status !== 200) {
    const text = await res.text();
    console.error(`[indexnow] Bing returned ${res.status}: ${text}`);
    process.exit(1);
  }
  console.log(`[indexnow] OK — submitted ${urls.length} URL(s) to Bing IndexNow (status ${res.status}).`);
}

main();
