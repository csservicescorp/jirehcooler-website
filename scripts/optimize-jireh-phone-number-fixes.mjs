import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicImagesDir = join(root, 'public', 'images');
const manifestPath = join(root, 'src', 'data', 'image-manifest.json');
const incomingPhotos = join(root, 'incoming-assets', 'jireh_package', 'photos');

// Replacements for photos that showed the old phone number (954-254-5910,
// and in one case a further variant) somewhere in the frame. Each of these
// source photos was manually verified to show only the correct number
// (954-426-6010) or no phone number at all.
const IMAGES = [
  {
    src: join(incomingPhotos, 'jireh-cooler-founder-commercial-construction-project-01.jpg'),
    out: 'services/jireh-founder-commercial-construction',
    widths: [1400, 700],
  },
  {
    src: join(incomingPhotos, 'jireh-cooler-founder-new-construction-project-01.jpg'),
    out: 'homepage/jireh-founder-new-construction-project',
    widths: [1400, 700],
  },
  {
    src: join(incomingPhotos, 'jireh-cooler-luxury-residential-new-construction-hvac-01.jpg'),
    out: 'homepage/jireh-luxury-residential-new-construction',
    widths: [1400, 700],
  },
  {
    src: join(incomingPhotos, 'jireh-cooler-founder-commercial-hvac-service-01.png'),
    out: 'homepage/jireh-founder-commercial-hvac-service',
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
