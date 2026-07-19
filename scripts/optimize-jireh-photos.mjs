import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const sourceDir = join(root, 'public', 'images', 'jireh-originals');
const publicImagesDir = join(root, 'public', 'images');
const manifestPath = join(root, 'src', 'data', 'image-manifest.json');

// Real, official Jireh Cooler photography (not stock). No pre-cropping to a
// fixed ratio here — ResponsiveImage applies the visual crop responsively
// via CSS aspect-ratio + object-fit: cover, so these are just resized to
// sensible max widths while preserving full original framing.
const IMAGES = [
  { src: 'jireh-cooler-vans-residential.png', out: 'homepage/jireh-vans-residential', widths: [1672, 800] },
  { src: 'jireh-cooler-owners-about.png', out: 'about/jireh-owners-portrait', widths: [1122, 600] },
  { src: 'jireh-cooler-planning-blueprint.png', out: 'about/jireh-planning-blueprint', widths: [1200, 600] },
  { src: 'jireh-cooler-technician-ac-unit.png', out: 'services/jireh-technician-ac-unit', widths: [1254, 700] },
  { src: 'jireh-cooler-company-fleet.png', out: 'homepage/jireh-company-fleet', widths: [1600, 800] },
];

const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};

for (const entry of IMAGES) {
  const srcPath = join(sourceDir, entry.src);
  const [category, basename] = entry.out.split('/');
  const outDir = join(publicImagesDir, category);
  mkdirSync(outDir, { recursive: true });

  const meta = await sharp(srcPath).metadata();
  const sizes = [];

  for (const width of entry.widths) {
    const targetWidth = Math.min(width, meta.width);
    const resized = sharp(srcPath).resize({ width: targetWidth, withoutEnlargement: true });
    const suffix = width === entry.widths[0] ? '' : '-sm';
    const jpgOut = join(outDir, `${basename}${suffix}.jpg`);
    const webpOut = join(outDir, `${basename}${suffix}.webp`);
    const avifOut = join(outDir, `${basename}${suffix}.avif`);

    const buf = await resized.clone().jpeg({ quality: 84, mozjpeg: true }).toBuffer();
    const info = await sharp(buf).metadata();
    writeFileSync(jpgOut, buf);
    await resized.clone().webp({ quality: 80 }).toFile(webpOut);
    await resized.clone().avif({ quality: 58 }).toFile(avifOut);

    sizes.push({ width: info.width, height: info.height });
    console.log(`✓ ${entry.out}${suffix} (${info.width}x${info.height})`);
  }

  const publicPath = `/images/${entry.out}.jpg`;
  const [full, sm] = sizes;
  manifest[publicPath] = {
    width: full.width,
    height: full.height,
    smWidth: sm?.width ?? full.width,
    smHeight: sm?.height ?? full.height,
  };
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nManifest updated: ${Object.keys(manifest).length} total entries.`);
