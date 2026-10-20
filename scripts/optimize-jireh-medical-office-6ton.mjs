import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicImagesDir = join(root, 'public', 'images');
const manifestPath = join(root, 'src', 'data', 'image-manifest.json');
const incoming = join(root, '_incoming', 'medical-office-6ton');

// "6-Ton HVAC Installation for a Medical Office" (October 2026). Originals are
// kept untouched in _incoming/medical-office-6ton/ (gitignored). No cropping:
// each photo keeps its own proportions, only re-encoded and resized down.
const IMAGES = [
  { src: 'Foto_03.jpg', out: 'gallery/jireh-medical-office-crane-lift-wide' },
  { src: 'Foto_02.jpg', out: 'gallery/jireh-medical-office-crane-lift-entrance' },
  { src: 'Foto_01.jpg', out: 'gallery/jireh-medical-office-crane-lift-roof' },
  { src: 'Foto_04.jpg', out: 'gallery/jireh-medical-office-crane-lift-evening' },
  { src: 'Foto_07.jpg', out: 'gallery/jireh-medical-office-technician-wiring' },
  { src: 'Foto_06.jpg', out: 'gallery/jireh-medical-office-rooftop-unit-curb' },
  { src: 'Foto_05.jpg', out: 'gallery/jireh-medical-office-rooftop-unit-disconnect' },
];
const WIDTHS = [1600, 700];

const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};

for (const entry of IMAGES) {
  const srcPath = join(incoming, entry.src);
  if (!existsSync(srcPath)) {
    console.warn(`MISSING SOURCE: ${srcPath}`);
    continue;
  }

  const [category, basename] = entry.out.split('/');
  const outDir = join(publicImagesDir, category);
  mkdirSync(outDir, { recursive: true });

  const meta = await sharp(srcPath).metadata();
  const sizes = [];

  for (const width of WIDTHS) {
    const targetWidth = Math.min(width, meta.width);
    const resized = sharp(srcPath).rotate().resize({ width: targetWidth, withoutEnlargement: true });
    const suffix = width === WIDTHS[0] ? '' : '-sm';
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

  const [full, sm] = sizes;
  manifest[`/images/${entry.out}.jpg`] = {
    width: full.width,
    height: full.height,
    smWidth: sm?.width ?? full.width,
    smHeight: sm?.height ?? full.height,
  };
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nManifest updated: ${Object.keys(manifest).length} total entries.`);
