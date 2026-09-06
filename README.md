# VIYLSA — Bringing visits online.

Marketing landing page for [**VIYLSA**](https://www.viylsa.app) — a Pakistan-first
360° virtual tour platform with a built-in AI assistant, heatmap analytics, and
lead capture.

Live at **https://www.viylsa.app**

## Stack

React 18 + Vite. JSX is compiled at build time; the deployed site is a static,
minified bundle. After the build, **both React routes** (the homepage and
`about.html`) are **prerendered to static HTML** in headless Chrome
(`scripts/prerender.mjs`) so their content is crawlable by search engines and
non-JS AI crawlers — React still re-mounts on load. Fonts are self-hosted
(`@fontsource`), so there is no external Google Fonts request.

```
index.html                  Homepage shell + SEO metadata + JSON-LD
about.html                  Brand / E-E-A-T page (React entry, prerendered)
privacy.html / terms.html   Legal pages (static)
vite.config.js              Build config (multi-page input)
scripts/prerender.mjs       Post-build prerender of both React routes
scripts/gen-sitemap.mjs     Sitemap generator (all pages, with lastmod)
scripts/subset-urdu-font.mjs  Regenerates the AI-guide Urdu font subset
src/main.jsx                Homepage entry — fonts, styles, motion, app mount
src/about.jsx               About entry (same stack, shared components)
src/App.jsx                 Orders the homepage sections
src/components/*.jsx        Section components (Nav, Hero, Pricing, …)
src/styles/styles.css       Page styles
src/styles/colors_and_type.css  VIYLSA design tokens (color, type, spacing, motion)
src/styles/about.css        About-page styles (prefixed .va-)
src/motion.js               Scroll/reveal interactions
src/stackSections.js        Desktop section-stacking enhancement (≥900px only)
public/assets/              Logo marks + 360° tour stills
public/sitemap.xml          Sitemap (all pages, with lastmod)
public/CNAME                Custom domain (www.viylsa.app)
```

## Prerequisite

`npm run build:static` prerenders in headless Chrome via Puppeteer. Install the
browser once per environment:

```bash
npx puppeteer browsers install chrome
```

(CI runs this automatically — see `.github/workflows/deploy.yml`.)

## Develop

```bash
npm install
npm run dev          # dev server with HMR
npm run build        # production build → dist/
npm run build:static # build + prerender both React routes (what CI deploys)
npm run preview      # serve the production build locally
npm run subset:urdu  # regenerate the Urdu font subset after editing AIGuide.jsx
```

## Where to edit what

- **Packages / coverage rows** — `src/components/Pricing.jsx` (keep the contact
  form's `package` options in `src/components/Contact.jsx` in step).
- **Contact details** — constants at the top of `src/components/Contact.jsx`.
- **AI-guide demo copy** — `src/components/AIGuide.jsx` (then run
  `npm run subset:urdu` if the Urdu strings changed).
- **Founders / bios / portraits** — the `FOUNDERS` block in `src/pages/About.jsx`.
- **Tour URL** — `TOUR_URL` in `src/components/LiveTourPreview.jsx`.
- **Example dashboard figures** — `src/components/Analytics.jsx` (keep the
  "illustrative" label).
- **Design tokens** — `src/styles/colors_and_type.css`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which installs
Chrome, runs `npm run build:static` (Vite build + prerender of both React
routes) and publishes `dist/` to GitHub Pages. The custom domain is set via
`public/CNAME`.
