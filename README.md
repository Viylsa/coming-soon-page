# VIYLSA — Bringing visits online.

Marketing landing page for [**VIYLSA**](https://www.viylsa.app) — a Pakistan-first
360° virtual tour platform with a built-in AI assistant, heatmap analytics, and
lead capture.

Live at **https://www.viylsa.app**

## Stack

React 18 + Vite. JSX is compiled at build time; the deployed site is a static,
minified bundle.

```
index.html                  Page shell + SEO metadata
vite.config.js              Build config
src/main.jsx                Entry — mounts the app, imports styles & motion
src/App.jsx                 Orders the sections
src/components/*.jsx        Section components (Nav, Hero, Pricing, …)
src/styles/styles.css       Page styles
src/styles/colors_and_type.css  VIYLSA design tokens (color, type, spacing, motion)
src/motion.js               Scroll/reveal interactions
public/assets/              Logo marks + 360° tour stills
public/CNAME                Custom domain (www.viylsa.app)
```

## Develop

```bash
npm install
npm run dev        # dev server with HMR
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. The custom domain is set via `public/CNAME`.
