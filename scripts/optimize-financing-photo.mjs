import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcPath = join(root, 'public', 'images', 'jireh-originals', 'new-jireh-images', 'jireh-cooler-financing-consultation.png.png');
const outDir = join(root, 'public', 'images', 'financing');
const manifestPath = join(root, 'src', 'data', 'image-manifest.json');

mkdirSync(outDir, { recursive: true });

const basename = 'jireh-financing-consultation';
const widths = [1448, 800];
const meta = await sharp(srcPath).metadata();
const sizes = [];

for (const width of widths) {
  const targetWidth = Math.min(width, meta.width);
  const resized = sharp(srcPath).resize({ width: targetWidth, withoutEnlargement: true });
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
const publicPath = `/images/financing/${basename}.jpg`;
const [full, sm] = sizes;
manifest[publicPath] = {
  width: full.width,
  height: full.height,
  smWidth: sm?.width ?? full.width,
  smHeight: sm?.height ?? full.height,
};
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nManifest updated: ${Object.keys(manifest).length} total entries.`);
