import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcPath = join(root, 'public', 'images', 'jireh-originals', 'batch5-award', 'jireh-businessrate-top-5-2026.png');
const outDir = join(root, 'public', 'images', 'about');
const manifestPath = join(root, 'src', 'data', 'image-manifest.json');

// Official client-provided photo of Moyses Oliveira holding the Jireh
// Cooler BusinessRate "Top 5 2026 Awardee" plaque. Kept at full resolution
// (source is already only 1024px wide) and encoded at a high quality
// setting so the plaque's fine print stays legible when displayed with
// object-fit: contain (About page Recognition section — no crop).
mkdirSync(outDir, { recursive: true });

const basename = 'jireh-businessrate-award';
const widths = [1024, 640];
const meta = await sharp(srcPath).metadata();
const sizes = [];

for (const width of widths) {
  const targetWidth = Math.min(width, meta.width);
  const resized = sharp(srcPath).rotate().resize({ width: targetWidth, withoutEnlargement: true });
  const suffix = width === widths[0] ? '' : '-sm';
  const jpgOut = join(outDir, `${basename}${suffix}.jpg`);
  const webpOut = join(outDir, `${basename}${suffix}.webp`);
  const avifOut = join(outDir, `${basename}${suffix}.avif`);

  const buf = await resized.clone().flatten({ background: '#f4f6f8' }).jpeg({ quality: 92, mozjpeg: true }).toBuffer();
  const info = await sharp(buf).metadata();
  writeFileSync(jpgOut, buf);
  await resized.clone().flatten({ background: '#f4f6f8' }).webp({ quality: 90 }).toFile(webpOut);
  await resized.clone().flatten({ background: '#f4f6f8' }).avif({ quality: 68 }).toFile(avifOut);

  sizes.push({ width: info.width, height: info.height });
  console.log(`✓ about/${basename}${suffix} (${info.width}x${info.height})`);
}

const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};
const publicPath = `/images/about/${basename}.jpg`;
const [full, sm] = sizes;
manifest[publicPath] = {
  width: full.width,
  height: full.height,
  smWidth: sm?.width ?? full.width,
  smHeight: sm?.height ?? full.height,
};

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nManifest updated: ${Object.keys(manifest).length} total entries.`);
