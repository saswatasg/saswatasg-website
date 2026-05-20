# SEO & Core Web Vitals Implementation Notes

This document outlines the SEO and performance optimizations implemented based on the Lovable.dev brief.

## 1. Meta Tags & Head Optimization (`index.html`)

- **Core SEO:** Added `<title>` and `<meta name="description">` for search engine results pages (SERPs).
- **Canonical URL:** Specified the preferred version of the homepage URL using `<link rel="canonical">`.
- **Open Graph:** Implemented `og:` meta tags (`og:type`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image`) for rich sharing previews on social platforms like Facebook and LinkedIn.
    - **Note:** The image `/assets/og/og-image.webp` needs to be created and placed in the `public/assets/og/` directory.
- **Twitter Cards:** Added `twitter:` meta tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) for optimized sharing previews on Twitter.
    - **Note:** Uses the same image as Open Graph.
- **Performance Hints:**
    - Preconnected to `fonts.gstatic.com` using `<link rel="preconnect">`.
    - Preloaded the LCP image (`/assets/hero/avatar-160.webp`) using `<link rel="preload" as="image" fetchpriority="high">`.
    - **Note:** The avatar image `/assets/hero/avatar-160.webp` needs to be created and placed in the `public/assets/hero/` directory.

**React Considerations:** While these tags are added to the base `index.html`, for a Single Page Application (SPA) built with React, managing head tags dynamically per route (e.g., different titles/descriptions for `/about`, `/projects`) typically requires a library like `react-helmet-async`. The current implementation sets site-wide defaults.

## 2. LCP & TBT (`src/pages/Home.jsx`)

- **Largest Contentful Paint (LCP):** The hero avatar image (`<img>` tag) on the homepage has been explicitly marked as the LCP element.
    - Switched `src` to `/assets/hero/avatar-160.webp`.
    - Added `width="160"` and `height="160"` to prevent layout shifts.
    - Added `fetchpriority="high"` and `loading="eager"` to prioritize its loading.
- **Total Blocking Time (TBT):** By clearly defining the LCP and ensuring it loads quickly without blocking resources, TBT calculation by tools like PageSpeed Insights should now be possible and hopefully improved.

## 3. Asset Optimization

- **WebP Conversion:** **Action Required:** Manually convert existing JPEG/PNG images (except those requiring transparency) to the WebP format for better compression and performance. Place them in the appropriate `public/assets/` subdirectories.
- **Lazy Loading:** Images assumed to be below the fold in components like `About.jsx`, `Experience.jsx`, and `Projects.jsx` should ideally have `loading="lazy"` and `decoding="async"` attributes added to defer their loading until needed. (This requires manual review and addition within the respective components).
- **Critical CSS:** The brief suggested inlining critical CSS and deferring the main stylesheet. In a Vite/React setup, CSS bundling and loading are handled differently. Vite automatically code-splits CSS and optimizes its loading. Implementing manual critical CSS extraction requires specific Vite plugins or build process adjustments, which is beyond the scope of this initial implementation. The current setup relies on Vite's default optimizations.

## 4. Robots & Sitemap

- **`public/robots.txt`:** Created to instruct web crawlers. It allows all user agents (`*`), specifies no disallowed paths, sets a crawl delay of 2 seconds, and points to the sitemap location.
- **`public/sitemap.xml`:** A basic static sitemap was created, including the main pages (`/`, `/about`, `/experience`, `/projects`, `/contact`).
    - **Note:** For dynamic content (like individual project pages if they have unique URLs under `/projects/`), this sitemap needs to be updated manually or generated dynamically during the build process.

## 5. Structured Data (`src/pages/Home.jsx`)

- Added JSON-LD structured data of type `Person` to the homepage. This helps search engines understand the content and context of the page, potentially enabling rich results in SERPs.
- Includes `name`, `jobTitle`, `url`, and `sameAs` properties linking to relevant profiles (update URLs if necessary).

## 6. Quality Gates & Reporting

- **Action Required:** After deployment, run performance and accessibility audits using:
    - Google PageSpeed Insights (Check Core Web Vitals - LCP, TBT/FID, CLS)
    - Lighthouse (in Chrome DevTools)
    - axe DevTools (for accessibility)
- **Targets:** Aim for the scores specified in the brief (Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO = 100, LCP < 1.8s, TBT < 50ms).
- **Reports:** Save Lighthouse JSON and axe HTML reports in a `/reports/` directory (you'll need to create this directory).

## 7. Code Refactoring

- **`src/App.jsx`:** Extracted the interactive background logic (mouse/scroll/touch tracking) into a reusable custom hook `src/hooks/useInteractiveBackground.js`.
- **`src/index.css`:** Reorganized CSS rules into logical sections (Base, Layout, Homepage, Reusable Components, Page Specific, Responsive) for better maintainability.