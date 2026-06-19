# VIYLSA — Bringing visits online.

Marketing landing page for [**VIYLSA**](https://www.viylsa.app) — a Pakistan-first
360° virtual tour platform with a built-in AI assistant, heatmap analytics, and
lead capture.

Live at **https://www.viylsa.app**

## Stack

React 18 + Vite. JSX is compiled at build time; the deployed site is a static,
minified bundle. After the build, the homepage is **prerendered to static HTML**
in headless Chrome (`scripts/prerender.mjs`) so its content is crawlable by
search engines and non-JS AI crawlers — React still re-mounts on load. Fonts are
self-hosted (`@fontsource`), so there is no external Google Fonts request.

```
index.html                  Homepage shell + SEO metadata + JSON-LD
about.html                  Brand / E-E-A-T page (static)
virtual-tours-islamabad.html  Local landing page (static)
privacy.html / terms.html   Legal pages (static)
vite.config.js              Build config (multi-page input)
scripts/prerender.mjs       Post-build prerender of the homepage
src/main.jsx                Entry — fonts, styles, motion, mounts the app
src/App.jsx                 Orders the sections
src/components/*.jsx        Section components (Nav, Hero, Pricing, …)
src/styles/styles.css       Page styles
src/styles/colors_and_type.css  VIYLSA design tokens (color, type, spacing, motion)
src/motion.js               Scroll/reveal interactions
public/assets/              Logo marks + 360° tour stills
public/sitemap.xml          Sitemap (all pages, with lastmod)
public/CNAME                Custom domain (www.viylsa.app)
```

## Develop

```bash
npm install
npm run dev          # dev server with HMR
npm run build        # production build → dist/
npm run build:static # build + prerender the homepage (what CI deploys)
npm run preview      # serve the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which installs Chrome,
runs `npm run build:static` (Vite build + homepage prerender) and publishes
`dist/` to GitHub Pages. The custom domain is set via `public/CNAME`.
