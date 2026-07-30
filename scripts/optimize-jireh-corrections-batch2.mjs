import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicImagesDir = join(root, 'public', 'images');
const manifestPath = join(root, 'src', 'data', 'image-manifest.json');
const correctionsDir = join(root, 'incoming-assets', 'Jireh_Cooler_Corrections_for_Claude', 'Jireh_Cooler_Corrections');

// Second corrections batch: UV Light Systems hero photo + the corrected
// emergency-service photo (replaces the attic photo whose shirt showed the
// wrong phone number, (954) 426-9686).
const IMAGES = [
  {
    src: join(correctionsDir, 'jireh-uv-light-installation.png'),
    out: 'services/jireh-uv-light-installation',
    widths: [1400, 700],
  },
  {
    src: join(correctionsDir, 'jireh-emergency-service-phone-corrected.png'),
    out: 'services/jireh-emergency-service-phone-corrected',
    widths: [1400, 700],
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

    const buf = await resized.clone().flatten({ background: '#ffffff' }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
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
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nManifest updated: ${Object.keys(manifest).length} total entries.`);
