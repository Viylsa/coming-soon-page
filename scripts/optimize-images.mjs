/* One-shot asset pipeline. Run: node scripts/optimize-images.mjs
   Source of truth lives in assets-src/ (the original 360° equirectangular
   panorama from the tour); everything in public/assets is generated. */
import sharp from 'sharp';

const PANO = 'assets-src/academic-block.avif'; // 3584×1792 equirect

/* Hero background: the natural-looking middle band of the equirect —
   above it the sky stretches, below it the pavement warps (and the
   photographer's shadow appears). */
const band = { left: 0, top: 140, width: 3584, height: 1010 };
await sharp(PANO).extract(band).avif({ quality: 60 }).toFile('public/assets/hero-pano.avif');
await sharp(PANO).extract(band).webp({ quality: 80 }).toFile('public/assets/hero-pano.webp');

/* OG image (1200×630): tight crop on the academic block. */
await sharp(PANO)
  .extract({ left: 980, top: 250, width: 1660, height: 871 })
  .resize(1200, 630)
  .modulate({ brightness: 0.95 })
  .jpeg({ quality: 82 })
  .toFile('public/assets/og-image.jpg');

/* Logo marks: rendered at ≤40px in the UI — 256px covers 4x DPR.
   (Sources for these were one-shot; skip if the originals are gone.) */
import { existsSync } from 'node:fs';
if (existsSync('public/assets/viylsa-mark.png')) {
  await sharp('public/assets/viylsa-mark.png').resize({ width: 256 }).png({ compressionLevel: 9 }).toFile('public/assets/viylsa-mark-sm.png');
  await sharp('public/assets/viylsa-mark-white.png').resize({ width: 256 }).png({ compressionLevel: 9 }).toFile('public/assets/viylsa-mark-white-sm.png');
  await sharp('public/assets/viylsa-mark.png').resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('public/favicon.png');
  await sharp('public/assets/viylsa-mark.png').resize(180, 180, { fit: 'contain', background: { r: 250, g: 250, b: 247, alpha: 1 } }).png().toFile('public/apple-touch-icon.png');
}

console.log('done');
