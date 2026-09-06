/* Temporary QA helper: capture screenshots of the built site via vite preview.
 * Usage: node scripts/shots.mjs <outputDir> [baseline|final]
 */
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const outDir = resolve(process.argv[2] || 'shots');
mkdirSync(outDir, { recursive: true });

const server = await preview({ preview: { port: 4318, strictPort: true } });
const origin = 'http://localhost:4318';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, dsf: 1 },
  mobile: { width: 390, height: 844, dsf: 2, mobile: true },
};

try {
  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: vp.dsf, isMobile: !!vp.mobile });
    // Homepage: top viewport shot + full page
    await page.goto(origin + '/', { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: resolve(outDir, `home-${vpName}-top.png`) });
    await page.screenshot({ path: resolve(outDir, `home-${vpName}-full.png`), fullPage: true });
    // About
    await page.goto(origin + '/about.html', { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: resolve(outDir, `about-${vpName}-top.png`) });
    await page.screenshot({ path: resolve(outDir, `about-${vpName}-full.png`), fullPage: true });
    await page.close();
  }
  console.log('done');
} finally {
  if (browser) await browser.close();
  if (server?.httpServer) await server.httpServer.close();
  process.exit(0);
}
