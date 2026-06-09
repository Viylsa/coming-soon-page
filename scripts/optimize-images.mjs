/* One-shot asset pipeline: tour stills → WebP, logo marks → small PNGs,
   favicon + apple-touch-icon + OG image. Run: node scripts/optimize-images.mjs */
import sharp from 'sharp';

const screens = ['tour-building', 'tour-classroom', 'tour-entrance'];
for (const name of screens) {
  const src = `public/assets/screens/${name}.png`;
  await sharp(src).resize({ width: 1600 }).webp({ quality: 78 }).toFile(`public/assets/screens/${name}.webp`);
}

// Logo marks: rendered at ≤40px in the UI — 256px covers 4x DPR with room to spare.
await sharp('public/assets/viylsa-mark.png').resize({ width: 256 }).png({ compressionLevel: 9 }).toFile('public/assets/viylsa-mark-sm.png');
await sharp('public/assets/viylsa-mark-white.png').resize({ width: 256 }).png({ compressionLevel: 9 }).toFile('public/assets/viylsa-mark-white-sm.png');

// Favicons
await sharp('public/assets/viylsa-mark.png').resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('public/favicon.png');
await sharp('public/assets/viylsa-mark.png').resize(180, 180, { fit: 'contain', background: { r: 250, g: 250, b: 247, alpha: 1 } }).png().toFile('public/apple-touch-icon.png');

// OG image: 1200×630 crop of the campus still, slightly darkened so overlaid
// link-preview text from chat apps stays readable.
await sharp('public/assets/screens/tour-building.png')
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .modulate({ brightness: 0.92 })
  .jpeg({ quality: 82 })
  .toFile('public/assets/og-image.jpg');

console.log('done');
