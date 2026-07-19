/* Build-time prerender for the React SPA.
 *
 * GitHub Pages serves static files only — no SSR. After `vite build`, the
 * homepage ships as `<div id="root"></div>` with all content painted by JS,
 * which is invisible to non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot) and
 * weak for a new low-authority domain on Google's render queue.
 *
 * This loads the freshly built site in headless Chrome (so window/matchMedia
 * all exist — no SSR refactor needed), lets React render + the AI-guide demo
 * settle, forces every scroll-reveal element visible, then overwrites
 * dist/index.html with the fully rendered HTML. The module script is kept, so
 * on a real visit React re-renders into #root as before (createRoot, not
 * hydrate — no hydration-mismatch constraints).
 *
 * Run after the build:  vite build && node scripts/prerender.mjs
 */
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = 4317;
// Only the SPA route needs this. privacy.html / terms.html are already real HTML.
const ROUTES = { '/': 'index.html' };

const server = await preview({ preview: { port: PORT, strictPort: true } });
const origin = `http://localhost:${PORT}`;
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  for (const [route, file] of Object.entries(ROUTES)) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1800 });
    // Reduced motion makes the build deterministic: the AI-guide demo settles on
    // an answered exchange (no cycling timers) and every scroll-reveal section is
    // shown immediately, so the snapshot captures the full bilingual Q&A + all
    // content rather than a random mid-animation frame.
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(origin + route, { waitUntil: 'networkidle0', timeout: 60000 });

    // Hero rendered…
    await page.waitForSelector('h1', { timeout: 30000 });
    // …and the AI-guide answer present (reduced-motion lands straight on it).
    await page
      .waitForSelector('.v-ai__bubble--ai:not(.v-ai__typing)', { timeout: 30000 })
      .catch(() => {});
    await page.evaluate(() => (document.fonts ? document.fonts.ready : null));

    // Scroll-reveal hides below-fold sections at opacity:0 until they enter the
    // viewport. Force them all visible so the snapshot exposes ALL content to
    // crawlers and no-JS visitors.
    await page.evaluate(() => {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
    });

    const rendered = await page.evaluate(() => document.documentElement.outerHTML);

    // Preload the LCP headline fonts (Playfair Display latin upright + italic
    // for the hero "Bringing visits online.", plus Geist latin for body/nav)
    // so the swap lands before paint and the largest element doesn't reflow.
    // Uses the actual build-hashed filenames so it never goes stale.
    const assets = readdirSync(resolve('dist', 'assets'));
    const pick = (re) => assets.find((f) => re.test(f));
    const preloadFonts = [
      pick(/^playfair-display-latin-wght-normal-.*\.woff2$/),
      pick(/^playfair-display-latin-wght-italic-.*\.woff2$/),
      pick(/^geist-latin-wght-normal-.*\.woff2$/),
    ].filter(Boolean);
    const preloads = preloadFonts
      .map((f) => `  <link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
      .join('\n');

    let html = '<!doctype html>\n' + rendered + '\n';
    if (preloads) html = html.replace('</head>', preloads + '\n</head>');

    // Inline the built stylesheet and drop the render-blocking <link>. On a
    // prerendered single page this removes the worst FCP/LCP blocker: the
    // browser otherwise paints nothing until the external CSS round-trips
    // (the whole HTML→CSS critical chain). At ~11 KB gzipped the CSS rides in
    // with the document instead. Other (non-prerendered) pages keep their link.
    const cssFile = assets.find((f) => /^main-.*\.css$/.test(f));
    if (cssFile) {
      const css = readFileSync(resolve('dist', 'assets', cssFile), 'utf8');
      const linkRe = new RegExp(
        `<link rel="stylesheet"[^>]*href="/assets/${cssFile}"[^>]*>`,
      );
      if (linkRe.test(html)) {
        html = html.replace(linkRe, `<style>${css}</style>`);
        console.log(`  inlined ${cssFile} (${css.length} bytes), removed render-blocking <link>`);
      } else {
        console.warn(`  WARNING: stylesheet <link> for ${cssFile} not found — CSS left render-blocking`);
      }
    }

    const out = resolve('dist', file);
    writeFileSync(out, html, 'utf8');
    console.log(`prerendered ${route} -> dist/${file} (${html.length} bytes)`);
    await page.close();
  }
} finally {
  await browser.close();
  await server.httpServer.close();
}

// PreviewServer keep-alive sockets can hold the event loop open in CI.
process.exit(0);
