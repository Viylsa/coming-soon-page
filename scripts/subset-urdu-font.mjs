/* Subset the Noto Nastaliq Urdu font down to ONLY the glyphs the AI-guide demo
 * actually renders. The full fontsource file is ~159 KB woff2 and was loading on
 * first paint (Urdu text is baked into the prerendered demo). The demo uses a
 * few dozen characters, so a subset is ~10–20× smaller.
 *
 * The kept character set is extracted live from AIGuide.jsx, so this never goes
 * stale: if you change the demo's Urdu strings, just re-run `npm run subset:urdu`
 * and commit the regenerated public/fonts/noto-nastaliq-urdu-subset.woff2.
 *
 * Uses fonttools (pyftsubset) via `python -m fontTools.subset` — it does the
 * full GSUB/GPOS glyph closure, so Nastaliq's contextual forms, ligatures and
 * mark positioning all survive in the subset. Requires: python + fonttools +
 * brotli (for woff2). All are dev-time only; the build ships the committed file.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, statSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const SRC = resolve(
  root,
  'node_modules/@fontsource/noto-nastaliq-urdu/files/noto-nastaliq-urdu-arabic-400-normal.woff2',
);
const OUT_DIR = resolve(root, 'public/fonts');
const OUT = resolve(OUT_DIR, 'noto-nastaliq-urdu-subset.woff2');
const GLYPH_FILE = resolve(import.meta.dirname, '.urdu-glyphs.txt');

// ── Collect every character the demo can render ──────────────────────────────
const source = readFileSync(resolve(root, 'src/components/AIGuide.jsx'), 'utf8');
// Arabic blocks + ZWNJ/ZWJ joiners. Plus the Latin digits/comma/space that
// appear inside Urdu sentences (e.g. "45,000") so they shape in-family if the
// font has them (else they fall back, harmlessly).
const ARABIC = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿‌‍]/g;
const chars = new Set(source.match(ARABIC) || []);
for (const c of '0123456789,. ') chars.add(c);

const text = [...chars].join('');
writeFileSync(GLYPH_FILE, text, 'utf8');
console.log(`Subsetting to ${chars.size} unique characters: ${text.replace(/[‌‍]/g, '·')}`);

// ── Run pyftsubset (full layout closure for the complex script) ──────────────
mkdirSync(OUT_DIR, { recursive: true });
// Honor a PYTHON override; some machines have multiple interpreters and only
// one has fonttools+brotli installed.  e.g. PYTHON=python3 npm run subset:urdu
const PYTHON = process.env.PYTHON || 'python';
try {
  execFileSync(
    PYTHON,
    [
      '-m', 'fontTools.subset', SRC,
      `--text-file=${GLYPH_FILE}`,
      '--flavor=woff2',
      '--layout-features=*',     // keep init/medi/fina/isol/rlig/calt/mark/mkmk…
      '--notdef-outline',
      '--name-IDs=*',
      `--output-file=${OUT}`,
    ],
    { stdio: 'inherit' },
  );
} finally {
  rmSync(GLYPH_FILE, { force: true });
}

const before = statSync(SRC).size;
const after = statSync(OUT).size;
console.log(
  `\n✓ ${OUT.replace(root + '\\', '').replace(/\\/g, '/')}\n` +
  `  ${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB ` +
  `(${(100 - (after / before) * 100).toFixed(1)}% smaller)`,
);
