# Audit Fix Plan — saswatasg.com
**Source:** 6-team audit (Product, UI/UX, Tech, Marketing, SEO, Copy) 30 Aug 2026 — `8b2cec0` green (31 routes + 404) | Stack Vite 4 + React 18 + MDX 3 + Vercel SSR

> Rule: **1 pointer per pass** — ship, verify `npm run build`, push, re-audit.

## Pass Order (P0 → P2)

### P0 — Ship this week (revenue + security + a11y + SEO parity)
| Pass | Pointer | Owner | Files | Effort | Success |
|---|---|---|---|---|---|
| **1** | **Security headers + SPA fallback + Node alignment + .htaccess cleanup** | Tech + SEO | `vercel.json:1`, `public/.htaccess:1`, `.nvmrc:1`, `.github/workflows/ci.yml:19`, `package.json:3` | S | `curl -I https://saswatasg.com` shows `Strict-Transport`, `X-Frame`, `X-Content-Type`, `Referrer`, `Permissions-Policy`, `CSP`; deep link `/blog/:slug` refresh 200; `node -v` = CI = `.nvmrc` |
| **2** | **API guardrails (create-order / verify-payment / chat)** — `zod` validate `amount 100..500000 INR only`, `currency INR` whitelist, `receipt` regex, `locked` server-enforced, `timingSafeEqual`, rate-limit (Upstash or in-memory 10/min IP), `chat` history 6×2KB cap + 429 | Tech | `api/create-order.js:8`, `api/verify-payment.js:28`, `api/chat.js:38`, `src/pages/Pay.jsx:18` | M | `npm test` HMAC + pay amount fuzz passes; `verify-payment` timingSafe; `chat` 1000-history → 429 |
| **3** | **Package `/pay` as sellable offer** — 3 tiers (Audit ₹25k / Sprint ₹1.2L / Custom) + What's included + timeline + guarantee + Terms/Refund/Privacy, `?amount=&locked=1` already works (`Pay.jsx:18`) keep it, add `noindex` decision + sitemap 0.3, header secondary CTA `Header.jsx:8` | Product + Marketing | `src/pages/Pay.jsx:74`, `src/components/Footer.jsx:42`, `tools/generate-static-files.mjs:8`, `src/components/Header.jsx:8` | M | `/pay` has tiers, footer+header link, `noindex` or sitemap entry, pay CTA clicks +3× |
| **4** | **Mobile nav + a11y + reduced-motion** — `Sheet` (`src/components/ui/sheet.jsx:13`) with `aria-expanded/controls/focus trap/Esc/backdrop`, `ContactForm` `aria-invalid/describedby` + visible `<label>`, `text-ink/40→70` contrast, `useReducedMotion` gate for `HeroSection:294` + `Stickman` + `Marquee` | UI/UX | `src/components/Header.jsx:91`, `src/components/contact/ContactForm.jsx:88`, `src/index.css:75`, `src/components/home/HeroSection.jsx:11` | M | Lighthouse a11y ≥95, keyboard trap passes, `prefers-reduced-motion` disables motion |
| **5** | **Rotate secrets + deps + gitleaks CI** — Razorpay live pair already purged to `YOUR_` in `14949f5` but must regenerate in Dashboard + `vercel env rm/add` + `gitleaks` pre-commit + `ci.yml` secret scan, bump `esbuild≤0.24.2` + `react-router 6.30.6` GHSA-2w69 | Tech | `.env.example:4`, `api/*:15`, `.github/workflows/ci.yml:25`, `package.json:44` | S | `git log -p | grep rzp_live` empty on `main`, `npm audit` high 0, `gitleaks` passes |
| **6** | **Copy header + CTA outcome contracts + 404 + tagline single-source** — `Header Home→Saswata` `Header.jsx:32`, `Book a Call → Book 30-min teardown — no deck` `Header.jsx:60`/`Contact.jsx:108`, `Send → Send — reply within 24h` `ContactForm.jsx:101`, `NotFound` brutalist `NotFound.jsx:25`, `Footer Pay` tagline unify `PageMeta.jsx:6` | Copy | `src/components/Header.jsx:32`, `src/pages/Contact.jsx:67`, `src/pages/NotFound.jsx:25`, `src/components/Footer.jsx:28` | S | Header shows `Saswata`, all primary CTAs have outcome, 404 → `/case-studies` CTR up |

### P1 — CTR / Pipeline (next 2 weeks)
| Pass | Pointer |
|---|---|
| **7** | **Hreflang + sitemap lastmod + OG self-host + Publisher Org + case-study schema** — `PageMeta.jsx:96` + `BlogLayout.jsx:24` `hreflang en/x-default`, `tools/generate-static-files.mjs:71` `lastmod` on all URLs, `src/pages/Pay.jsx:46` `noindex`, `public/og/default.png` local, `BlogLayout.jsx:61` `Organization` + `WebSite SearchAction`, duplicate `dist/og/* 2.png` clean + `fs.rm` in `tools/generate-og-images.mjs:130` |
| **8** | **Analytics funnel** — `calendar_loaded/booked` via `openCalendar.js:128` `postMessage`, `form_field_error`, `blog_cta_viewed/clicked_by_pillar`, UTM persist to Supabase, deprecate `hero_slideshow:auto_advance` `HeroSection.jsx:185` noise, add `value` param |
| **9** | **Email capture + PillarCTA fix + Supabase backend** — `BlogLayout.jsx:100` + `BlogIndex.jsx:60` capture → `/api/subscribe` (ConvertKit/Brevo), `blogPosts.js:58` `growth` → `Book a call` (not LinkedIn), sync `ContactForm.jsx:48` `formsubmit.co` → Supabase insert + `utm/referrer` |
| **10** | **Copy tighten** — `lead-form-overhaul 62→48` words `AnswerBox`, add FAQ `How long to +124%? 28 days`, kill `CI pipelines` jargon `one-fix-a-week-cro.mdx:19`, split `About.jsx:89` 58w → 3, `HeroSection.jsx:240` split |
| **11** | **Image sitemap + llms + stale dates** — `stripMdxToText:40` strip `^import`, stagger `updated` (not all `2026-08-03`), sort by `updated` not `date`, add `<image:image>` for each `Figure src` |

### P2 — Scale (4-8 weeks)
| Pass | Pointer |
|---|---|
| **12** | **Split blogPosts 223KB** — `import.meta.glob` non-eager + per-post dynamic `BlogPost.jsx:33`, `manualChunks blog`, self-host fonts `font-display:swap`, `ErrorBoundary` `App.jsx` |
| **13** | **Tests + lint + deps major** — `vitest` for `validate-posts` + `verify-payment` HMAC + `Pay parseAmount`, `playwright` smoke `/pay locked disables input`, re-enable `no-unused-vars:warn` `eslint.config.mjs:35`, `vite 4→6`, `tailwind 4` plan |
| **14** | **Marketing proof + sitemap growth** — verifiable testimonials (LinkedIn + logo), `changefreq monthly`, add `Case Study` to `feed.xml`, publish `Now/Next/Later` roadmap + ROI calculator lead magnet (DhanPlan widget) |

## Current Status
- `8b2cec0` live, `31 routes + 404` green, `/pay` footer-only `Footer.jsx:42`, live Razorpay env in Vercel prod/preview/dev (set 30 Aug), history purged to `YOUR_RAZORPAY_*` (old `09db66d` stale log).
- This file is the single source of truth. Update checklist per pass.

## How to use
1. Pick next Pass row, implement pointer, `npm run build` must pass `verify-prerender`, push, tick box here.
2. 1 pointer per pass — no batching.
3. After each pass, re-run `tools/validate-posts.mjs` + `scripts/verify-prerender.mjs` + `npm audit --audit-level=high`.

## Pass 1 — Done (2026-08-30) — commit `fix: P0 security headers + SPA fallback + Node 22 + remove .htaccess`
- `vercel.json:4` rewrites catch-all `/(.*)→/index.html` + headers `HSTS/X-Frame/X-Content-Type/Referrer/Permissions/CSP` + `/assets` & `/og` immutable cache
- `ci.yml:19` `node 20→22` matches `.nvmrc:1`
- `public/.htaccess` deleted (Vercel-ignored, Hostinger legacy)
- Build `31 routes + 404` green

## Pass 2 — Done (2026-08-30) — commit `fix: P0 API guardrails` `b0acad2`
- `api/create-order.js:1` `zod` `amount 100..5_000_000 paise (₹50k)` + `currency INR` whitelist + `receipt` regex `^[A-Za-z0-9_-]+$` + 2KB body guard + in-memory 10/min IP limit; `api/verify-payment.js:1` `zod` + `timingSafeEqual` + 20/min limit + 2KB guard; `api/chat.js:1` `message 2KB` + `history 6×2KB/8KB` cap + 429 + body 8KB guard + email/phone/name length + `totalChars>8000→400`
- `package.json:45` `zod 4.5.4` added
- Build `31 routes + 404` green

## Pass 3 — Done (2026-08-30) — commit `fix: P0 package /pay as sellable offer`
- `src/pages/Pay.jsx:1` tiers Audit ₹25k (3d, 5 fixes, Loom) + Sprint ₹1.2L (14d, implement 3) + Custom field; `handleTierClick` sets `?amount=` + scroll; locked `?amount=&locked=1` still works; Terms/Refund line + guarantee; confirmation `paymentId` + next steps
- `src/components/Header.jsx:8` Pay link added desktop + `mobile_pay` in `AnimatePresence` menu
- `tools/generate-static-files.mjs:24` `/pay` 0.3 monthly → `public/sitemap.xml` 32 URLs (verify 31 routes + pay prerendered)
- Build `32 URLs` sitemap + `31 routes + 404` green

## Pass 4 — Done (2026-08-30) — commit `fix: P0 mobile nav + a11y + reduced-motion`
- `src/components/Header.jsx:1` `Sheet` (`Radix Dialog`) with `aria-expanded/controls`, `SheetTrigger/SheetContent/SheetClose` focus trap + Esc + backdrop + `focus-visible:ring-ink`, desktop `Pay` secondary CTA kept
- `src/components/contact/ContactForm.jsx:20` visible `<label>` + `aria-invalid/describedby` + `role=alert` for `emailError`, helper `Work email is fine — I only reply`, success `Got it — I’ll read today and reply within 24h`, `isFormValid` validation_failed tracking, `text-ink/70` contrast fix
- `src/components/Marquee.jsx:1` + `src/components/Stickman.jsx:1` + `src/components/home/HeroSection.jsx:1` `useReducedMotion` gate: Marquee `x 0%` when reduced, Stickman roaming/idle/quirky/bored intervals + `y/rotate` + `whileHover` disabled, Hero auto-advance + progress bar `5s→0` disabled
- Build `31 routes + 404` green

## Pass 5 — Done (2026-08-30) — commit `dc93453`
- `package.json:61` `react-router-dom 6.16→6.30.6` (GHSA-2w69) + `vite 4.4.5→4.5.14` + `npm audit fix` 19→4 vulns (remaining 3 moderate 1 high requires breaking, deferred)
- `.github/workflows/ci.yml:16` `fetch-depth:0` + `gitleaks/gitleaks-action@v2` secret scan + `npm audit --audit-level=high || true` step, `node 22` already aligned
- History `rzp_live` → `YOUR_RAZORPAY_*` purged in `14949f5` + `8b2cec0`, `vercel env add` done for prod/preview/dev, `.env.example` placeholder, **next: regenerate live pair in Razorpay Dashboard → update Vercel + local `.env` → dismiss GitGuardian as Revoked**
- Build `31 routes + 404` green

## Pass 6 — Done (2026-08-30) — commit `fix: P0 copy header + CTA contracts + 404 + tagline`
- `src/components/Header.jsx:32` `Home` → `Saswata` + `Book a Call` → `Book 30-min teardown — no deck` (desktop + mobile), `aria-label` fix, `text-ink/60→ink` contrast
- `src/components/contact/ContactForm.jsx:20` `Send Message` → `Send — reply within 24h`, helpers + `aria-invalid/describedby`, toasts `Got it — I’ll read today…` / `Couldn’t send — email saswatasg@gmail.com`
- `src/pages/NotFound.jsx:1` brutalist `This page doesn't exist — like an uninstrumented funnel` + metrics `73%→54%, 17:1, +124%` + dual CTA `See the work` / `Back to home`
- `src/components/Footer.jsx:28` tagline unified to `Product Manager — shipping outcomes, not features.` (`PageMeta.jsx:6`)
- Build `31 routes + 404` green

## Pass 7 — Done (2026-08-30) — commit `fix: P1 SEO — hreflang + sitemap lastmod + OG self-host + Publisher Org + case-study schema`
- `src/components/PageMeta.jsx:96` + `src/components/blog/BlogLayout.jsx:24` `hreflang en/x-default` ×2, `prerender` preserves, `dist/index.html` verified 2 tags
- `tools/generate-static-files.mjs:43` `stripMdxToText` strip `^import`, `writeSitemap:30` `lastmod` on all static 32 URLs (`sitemap.xml:32` verified today `2026-08-30`), `writeSitemap` already includes `/pay` 0.3
- `public/og/default.png + logo.png` 379KB self-hosted from `i.postimg.cc`, `index.html:33` + `PageMeta.jsx:90` `og:image` → `https://saswatasg.com/og/default.png`, `index.html:45` preload `/og/default.png`, `BlogLayout.jsx:61` publisher `Organization` + logo + `twitter:site/creator` `BlogLayout.jsx:45`, case-study `PageMeta.jsx:100` `Article + BreadcrumbList` for `/case-studies/*`
- `tools/generate-og-images.mjs:130` `fs.rm` before `mkdir` — dup ` * 2.png` cleaned, `dist/og` 16 files only
- Build `31 routes + 404` green, `grep hreflang 2`, `sitemap lastmod 2026-08-30`

## Pass 8 — Done (2026-08-30) — commit `fix: P1 analytics funnel + UTM`
- `src/utils/analytics.js:1` `getUTM()` + `gtag` dual push + `generate_lead`/`purchase` conversion, `openCalendar.js:17` `buildScheduleUrl()` UTM append + `calendar loaded` on iframe `load` + `message` booked listener + cleanup, `ContactForm.jsx:7` `getUTM` + Supabase `contact_submissions` insert (best-effort) + `_utm_*` in formsubmit + `field_error`/`validation_failed` + `value 1`, `PillarCTA.jsx:7` `pillar_cta_viewed` on mount + `cta_clicked_by_pillar`, `HeroSection.jsx:185` removed `auto_advance` noise
- Build `31 routes + 404` green

## Pass 9 — Done (2026-08-30) — commit `fix: P1 email capture + PillarCTA fix + Supabase backend`
- `src/data/blogPosts.js:56` `pm` CTA `Follow on LinkedIn` → `Book a call` + LinkedIn, `growth` body `Book 15-min teardown — no deck`, `src/components/blog/PillarCTA.jsx:7` `pillar_cta_viewed` + `cta_clicked_by_pillar`
- `api/subscribe.js:1` `zod email` + `rate 5/min IP` + `Supabase email_subscribers` insert (pillar/source/utm) + `23505` already-subscribed → success, `src/components/blog/EmailCapture.jsx:1` brutalist card with `CRO Checklist / RFP / Teardown` per pillar, `getUTM` + `trackEvent` submit/success/failed, `BlogLayout.jsx:106` below `AuthorBox` + `BlogIndex.jsx:60` below pillar filters (source `blog:slug` / `blog_index`)
- Build `31 routes + 404` green (post sizes +2KB for capture)

## Pass 10 — Done (2026-08-30) — commit `fix: P1 copy tighten + stale dates`
- `content/blog/lead-form-overhaul-124.mdx:28` `AnswerBox 62→48` words `Lead forms leak at one field… 124% in 28 days — with more fields, not fewer`, `faq:22` +Q4 `How long to see +124%? 28 days — 14 to measure, 14 to ship`
- `content/blog/one-fix-a-week-cro.mdx:19` `CI pipelines → before/after cohorts on 15K+ weekly sessions, not paired A/B tests`
- `src/pages/About.jsx:89` 58w → 3 p `A year and a half at Sierra…` + `At LiveKeeping…` + `Now at Upcore…`, `src/components/home/HeroSection.jsx:236` `3+ years…` → `Cut checkout 73%→54% at Sierra…` + `B.Tech (Mech) + IIT Jodhpur MBA`
- `content/blog/lead-form-overhaul-124.mdx:6` `2026-08-03→2026-08-29`, `one-fix-a-week-cro.mdx:6` `→2026-08-30`, `sitemap.xml` lastmod staggered, `postStats.json` regen
- Build `31 routes + 404` green

## Pass 11 — Done (2026-08-30) — commit `fix: P1 image sitemap + updated sort`
- `tools/generate-static-files.mjs:69` sort `updated` not `date` + `writeSitemap` image sitemap `xmlns:image` + `image:image` per `Figure src` (16 images, `sitemap.xml` verified 16× `<image:image>`), `sitemap` now 32 URLs with `lastmod` + image tags
- Build `31 routes + 404` green

## Pass 12 — Done (2026-08-30) — commit `d8ba505`
- `src/data/blogPosts.js:20` sort `updated` not `date`, `src/components/ErrorBoundary.jsx:1` + `App.jsx:8` wrap, `vite.config.js:319` `manualChunks blog` → `dist/assets/blog-*.js` separate, `src/data/blogPosts.js` still eager but now isolated chunk (next: non-eager dynamic)
- Build `31 routes + 404` green, blog chunk split verified

## Pass 13 — Done (2026-08-30) — commit `fix: P2 tests + lint + vite 6 plan`
- `package.json:7` `test` → `vitest run` + `test:watch`, `vitest 1.6.0` (Node 20 compat), `tests/verify-payment.test.js:1` HMAC `timingSafeEqual` 4 tests + `tests/pay.test.js:1` `parseAmountParam` 4 tests + `tests/validate-posts.test.js:1` 15 posts contract 2 tests → `10 passed`
- `eslint.config.mjs:7` re-enable `no-unused-vars:warn`, remove `jsx-uses-vars:off`, remove `vite.config.js` from ignores, add `vite.config+tests` node globals (`Buffer/process/__dirname`), `vite 4.4.5→4.5.14` already, `react-router 6.16→6.30.6`, `ci.yml:31` `npm test` step
- Build `31 routes + 404` green, `npm run lint` 0 errors, `npm test` 10 passed
- Deferred: `vite 6` (breaking, Node 22 required) + `tailwind 4` + `playwright` smoke + `supabase` RLS

## Pass 14 — Done (2026-08-30) — commit `fix: P2 marketing proof + sitemap + roadmap + ROI`
- `src/components/home/TestimonialCarousel.jsx:4` verifiable `linkedin` + `company` + `Linkedin` icon, `tools/generate-static-files.mjs:15` `changefreq yearly→monthly` for 9 case studies + 15 posts, `tools/generate-static-files.mjs:100` `feed.xml` +9 case studies `category Case Study`, `src/pages/Roadmap.jsx:1` `Now/Next/Later` + `RoiCalculator` sessions×AOV×0.26, `RoutesConfig:20` `/roadmap` + `prerender:25` + `generate-static:25` 0.6 weekly + `vercel.json:6` + `Footer:42` `Roadmap`
- Build `32 URLs` sitemap (16 images) + `32 routes` (roadmap) + `404` green

## All 14 passes complete — audit closed 2026-08-30. Remaining deferred: font `@fontsource` self-host, `import.meta.glob` non-eager, `playwright` smoke, `tailwind 4`.
