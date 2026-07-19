import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcPath = join(root, 'public', 'images', 'jireh-originals', 'jireh-cooler-planning-blueprint.png');
const outDir = join(root, 'public', 'images', 'about');
const manifestPath = join(root, 'src', 'data', 'image-manifest.json');

// Authenticity fix: the source photo's upper portion shows an unidentified
// stock model's face, which must never be presented as an owner/employee of
// Jireh Cooler. This crop keeps only the lower portion (hands, pen,
// blueprint, drafting tools) — no face is present in the cropped source at
// all, so no downstream responsive crop can ever reintroduce it.
const CROP = { left: 0, top: 680, width: 1254, height: 574 };

mkdirSync(outDir, { recursive: true });

const basename = 'jireh-planning-blueprint';
const cropped = sharp(srcPath).extract(CROP);
const croppedMeta = await cropped.clone().metadata();
const widths = [croppedMeta.width, 700];
const sizes = [];

for (const width of widths) {
  const targetWidth = Math.min(width, croppedMeta.width);
  const resized = cropped.clone().resize({ width: targetWidth, withoutEnlargement: true });
  const suffix = width === widths[0] ? '' : '-sm';
  const jpgOut = join(outDir, `${basename}${suffix}.jpg`);
  const webpOut = join(outDir, `${basename}${suffix}.webp`);
  const avifOut = join(outDir, `${basename}${suffix}.avif`);

  const buf = await resized.clone().jpeg({ quality: 84, mozjpeg: true }).toBuffer();
  const info = await sharp(buf).metadata();
  writeFileSync(jpgOut, buf);
  await resized.clone().webp({ quality: 80 }).toFile(webpOut);
  await resized.clone().avif({ quality: 58 }).toFile(avifOut);

  sizes.push({ width: info.width, height: info.height });
  console.log(`✓ ${basename}${suffix} (${info.width}x${info.height})`);
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
