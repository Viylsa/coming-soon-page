/* Build-time sitemap generation.
 *
 * The sitemap used to be a hand-maintained public/sitemap.xml whose <lastmod>
 * dates drifted — every URL claimed 2026-06-10/20 long after the pages had
 * changed. A stale lastmod is worse than none: it tells Google "nothing here
 * moved, don't spend crawl budget recrawling", which is the opposite of what a
 * new domain with four Discovered-currently-not-indexed URLs needs.
 *
 * So the date is derived, not typed: for each URL we take the most recent
 * commit date across the files that actually produce it. Change a component,
 * the homepage's lastmod moves on the next deploy. Touch nothing, it stays put
 * — which is also honest.
 *
 * privacy.html and terms.html are deliberately NOT listed. They're ~350 words
 * of boilerplate, they rank for nothing, and on a domain with this little crawl
 * budget every URL in the sitemap competes with the pages we want indexed.
 * They stay indexable (no noindex, they're linked from the footer) — they're
 * just not advertised.
 *
 * Run after the build:  vite build && node scripts/gen-sitemap.mjs
 *
 * NOTE: needs full git history. CI must checkout with fetch-depth: 0, or every
 * file resolves to the same single commit date (see .github/workflows/deploy.yml).
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ORIGIN = 'https://www.viylsa.app';

// Each URL and the source paths that produce it. The homepage is the React app,
// so every file under src/ counts toward its lastmod.
const PAGES = [
  { loc: '/', sources: ['index.html', 'src'] },
  // About is now a React entry, so its lastmod tracks the page component and
  // its stylesheet too — not just the HTML shell, which barely changes.
  { loc: '/about.html', sources: ['about.html', 'src/pages/About.jsx', 'src/styles/about.css'] },
  { loc: '/virtual-tours-islamabad.html', sources: ['virtual-tours-islamabad.html'] },
];

/** Committer date (YYYY-MM-DD) of the newest commit touching `path`, or null. */
function lastCommitDate(path) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', path], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null; // not a git checkout, or git unavailable
  }
}

const today = new Date().toISOString().slice(0, 10);

const urls = PAGES.map(({ loc, sources }) => {
  const dates = sources.map(lastCommitDate).filter(Boolean);
  // Newest wins: an ISO date string sorts correctly lexicographically.
  const lastmod = dates.length ? dates.sort().at(-1) : today;
  if (!dates.length) {
    console.warn(`  WARNING: no git date for ${loc} (shallow clone?) — fell back to ${today}`);
  }
  return `  <url>\n    <loc>${ORIGIN}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
});

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.join('\n') +
  '\n</urlset>\n';

const out = resolve('dist', 'sitemap.xml');
writeFileSync(out, xml, 'utf8');
console.log(`generated dist/sitemap.xml (${PAGES.length} urls)`);
for (const line of urls) console.log('  ' + line.trim().replace(/\s*\n\s*/g, ' '));
