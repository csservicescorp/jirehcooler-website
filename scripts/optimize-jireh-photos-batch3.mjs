import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const sourceDir = join(root, 'public', 'images', 'jireh-originals', 'batch3-new-photos');
const publicImagesDir = join(root, 'public', 'images');
const manifestPath = join(root, 'src', 'data', 'image-manifest.json');

// Third batch of real, official Jireh Cooler photography (client-approved,
// renamed files, branded vans/uniforms/signage visible throughout). No
// pre-cropping to a fixed ratio — ResponsiveImage applies the visual crop
// responsively via CSS aspect-ratio + object-fit: cover.
const IMAGES = [
  // Structured content fields (replace stock or de-duplicate reused photos)
  { src: 'jireh-cooler-residential-multi-system-ac-service-01.jpg', out: 'services/jireh-ac-installation-multi-system', widths: [1400, 700] },
  { src: 'jireh-cooler-frozen-evaporator-coil-diagnosis-01.jpg', out: 'homepage/jireh-emergency-diagnosis', widths: [1080, 700] },
  { src: 'jireh-cooler-residential-ac-repair-technician-01.jpg', out: 'homepage/jireh-maintenance-visit', widths: [1400, 700] },
  { src: 'jireh-cooler-commercial-rooftop-hvac-repair-team-01.png', out: 'services/jireh-commercial-rooftop-team', widths: [1448, 800] },
  { src: 'jireh-cooler-commercial-ductwork-installation-01.jpg', out: 'services/jireh-ductwork-installation', widths: [1400, 700] },
  { src: 'jireh-cooler-commercial-rooftop-unit-crane-lift-01.jpg', out: 'backgrounds/jireh-rooftop-crane-lift', widths: [1440, 800] },
  // Gallery-only additions ("Services in Action")
  { src: 'jireh-cooler-luxury-residential-new-construction-hvac-01.jpg', out: 'gallery/jireh-luxury-new-construction', widths: [1200, 600] },
  { src: 'jireh-cooler-residential-service-team-home-01.png', out: 'gallery/jireh-estate-service-call', widths: [1200, 600] },
  { src: 'jireh-cooler-indoor-hvac-system-inspection-01.png', out: 'gallery/jireh-air-handler-inspection', widths: [1086, 600] },
  { src: 'jireh-cooler-commercial-ductwork-system-02.jpg', out: 'gallery/jireh-commercial-ductwork-system', widths: [1177, 600] },
  { src: 'jireh-cooler-commercial-project-partnership-01.jpg', out: 'gallery/jireh-construction-partnership', widths: [1200, 600] },
  { src: 'jireh-cooler-commercial-hvac-installation-auto-dealership-01.png', out: 'gallery/jireh-dealership-install', widths: [1200, 600] },
  { src: 'jireh-cooler-commercial-hvac-delivery-restaurant-01.png', out: 'gallery/jireh-restaurant-delivery', widths: [1200, 600] },
  { src: 'jireh-cooler-commercial-hvac-equipment-crane-delivery-01.jpg', out: 'gallery/jireh-crane-delivery', widths: [1200, 600] },
  { src: 'jireh-cooler-hvac-equipment-delivery-team-01.jpg', out: 'gallery/jireh-equipment-delivery-team', widths: [1200, 600] },
  { src: 'jireh-cooler-commercial-construction-project-team-01.jpg', out: 'gallery/jireh-construction-site-visit', widths: [1200, 600] },
  { src: 'jireh-cooler-commercial-package-units-installation-ready-01.jpg', out: 'gallery/jireh-package-units-ready', widths: [1080, 600] },
  { src: 'jireh-cooler-commercial-rooftop-package-unit-service-01.jpg', out: 'gallery/jireh-rooftop-package-service', widths: [1080, 600] },
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
