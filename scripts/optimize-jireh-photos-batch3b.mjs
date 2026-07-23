import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const sourceDir = join(root, 'public', 'images', 'jireh-originals', 'batch3-new-photos');
const publicImagesDir = join(root, 'public', 'images');
const manifestPath = join(root, 'src', 'data', 'image-manifest.json');

// Follow-up fix: the homepage Residential/Commercial pathway cards and the
// Indoor Air Quality section (homepage + dedicated page) and the AC Repair
// page were still on older, overly polished/stock-looking photos even after
// batch 3. These two additions replace them with unmistakably authentic,
// unused photos from the same client-approved batch.
const IMAGES = [
  { src: 'jireh-cooler-residential-service-van-south-florida-01.jpg', out: 'homepage/jireh-residential-service-van', widths: [1400, 700] },
  { src: 'jireh-cooler-founder-commercial-hvac-service-01.png', out: 'services/jireh-repair-diagnostic', widths: [1400, 700] },
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
    const resized = sharp(srcPath).rotate().resize({ width: targetWidth, withoutEnlargement: true });
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
