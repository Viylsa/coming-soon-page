/* Scrolled-viewport captures of each homepage section (sticky layouts must be
 * inspected live, not via fullPage). Usage: node scripts/section-shots.mjs <outdir> */
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const outDir = resolve(process.argv[2] || 'shots-sections');
mkdirSync(outDir, { recursive: true });
const server = await preview({ preview: { port: 4320, strictPort: true } });
const origin = 'http://localhost:4320';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SECTIONS = ['live-tour', 'analytics', 'how', 'pricing', 'faq', 'contact'];

try {
  for (const [name, w, h, mobile] of [['desktop', 1440, 900, false], ['mobile', 390, 844, true]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile });
    await page.goto(origin + '/', { waitUntil: 'networkidle2' });
    await sleep(600);
    for (const id of SECTIONS) {
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'auto' });
      }, id);
      await sleep(900);
      await page.screenshot({ path: resolve(outDir, `${id}-${name}.png`) });
    }
    await page.close();
  }
  console.log('done');
} finally {
  await browser.close();
  await server.httpServer.close();
  process.exit(0);
}
