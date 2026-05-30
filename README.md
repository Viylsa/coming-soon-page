# VIYLSA — Bringing visits online.

Marketing landing page for [**VIYLSA**](https://www.viylsa.app) — a Pakistan-first
360° virtual tour platform with a built-in AI assistant, heatmap analytics, and
lead capture.

Live at **https://www.viylsa.app**

## Stack

A single-page, dependency-free static site. React and Babel are loaded from a CDN
and JSX is compiled in the browser — no build step, no `node_modules`.

```
index.html              Mounts the page and orders the sections
styles.css              Page styles (imports the design tokens below)
colors_and_type.css     VIYLSA design tokens (color, type, spacing, motion)
motion.js               Scroll/reveal interactions
*.jsx                   Section components (Nav, Hero, Pricing, Team, …)
assets/                 Logo marks + 360° tour stills
CNAME                   Custom domain (www.viylsa.app)
```

## Run locally

Because the JSX is fetched over HTTP, open it through a local server (not `file://`):

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the
repository root to GitHub Pages. The custom domain is set via the `CNAME` file.
