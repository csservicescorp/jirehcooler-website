import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync, existsSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicImagesDir = join(root, 'public', 'images');
const manifestPath = join(root, 'src', 'data', 'image-manifest.json');
const incomingPhotos = join(root, 'incoming-assets', 'jireh_package', 'photos');

// New photos from the client's July 2026 package, plus the three placeholder
// PNGs from the prior in-progress session re-encoded into the site's
// standard jpg/webp/avif + manifest pipeline (PNG had no manifest entry, so
// ResponsiveImage was falling back to a plain unoptimized <img>).
const IMAGES = [
  {
    src: join(incomingPhotos, 'jireh-cooler-founder-luxury-residential-project-01.jpg'),
    out: 'homepage/jireh-founder-luxury-residential-project',
    widths: [1400, 700],
  },
  {
    src: join(incomingPhotos, 'jireh-cooler-new-construction-hvac-site-crew-01.jpg'),
    out: 'homepage/jireh-commercial-site-crew',
    widths: [1400, 700],
  },
  {
    src: join(incomingPhotos, 'jireh-cooler-commercial-package-unit-inventory-01.jpg'),
    out: 'services/jireh-commercial-package-inventory',
    widths: [1400, 700],
  },
  {
    src: join(incomingPhotos, 'jireh-cooler-commercial-ductwork-installation-01.jpg'),
    out: 'gallery/jireh-commercial-duct-drop-installation',
    widths: [1200, 600],
  },
  {
    src: join(incomingPhotos, 'jireh-cooler-modern-commercial-construction-site-01.jpg'),
    out: 'gallery/jireh-modern-commercial-construction-site',
    widths: [1200, 600],
  },
  {
    src: join(publicImagesDir, 'services', 'jireh-commercial-service-final.png'),
    out: 'services/jireh-commercial-service-final',
    widths: [1448, 800],
    deleteSource: true,
  },
  {
    src: join(publicImagesDir, 'gallery', 'jireh-indoor-air-handler-inspection-final.png'),
    out: 'gallery/jireh-indoor-air-handler-inspection-final',
    widths: [1086, 600],
    deleteSource: true,
  },
  {
    src: join(publicImagesDir, 'gallery', 'jireh-indoor-air-quality-team.png'),
    out: 'services/jireh-indoor-air-quality-team',
    widths: [1200, 700],
    deleteSource: true,
  },
];

const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};

for (const entry of IMAGES) {
  if (!existsSync(entry.src)) {
    console.warn(`MISSING SOURCE: ${entry.src}`);
    continue;
  }

  const [category, basename] = entry.out.split('/');
  const outDir = join(publicImagesDir, category);
  mkdirSync(outDir, { recursive: true });

  const meta = await sharp(entry.src).metadata();
  const sizes = [];

  for (const width of entry.widths) {
    const targetWidth = Math.min(width, meta.width);
    const resized = sharp(entry.src).rotate().resize({ width: targetWidth, withoutEnlargement: true });
    const suffix = width === entry.widths[0] ? '' : '-sm';
    const jpgOut = join(outDir, `${basename}${suffix}.jpg`);
    const webpOut = join(outDir, `${basename}${suffix}.webp`);
    const avifOut = join(outDir, `${basename}${suffix}.avif`);

    const buf = await resized.clone().jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    const info = await sharp(buf).metadata();
    writeFileSync(jpgOut, buf);
    await resized.clone().webp({ quality: 78 }).toFile(webpOut);
    await resized.clone().avif({ quality: 55 }).toFile(avifOut);

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

  if (entry.deleteSource) {
    unlinkSync(entry.src);
    console.log(`  removed source ${entry.src}`);
  }
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nManifest updated: ${Object.keys(manifest).length} total entries.`);
