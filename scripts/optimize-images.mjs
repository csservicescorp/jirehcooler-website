import sharp from 'sharp';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const sourceDir = join(root, 'public', 'images', '_source');
const publicImagesDir = join(root, 'public', 'images');

// Each entry: source file in public/images/_source, output category folder + basename,
// target widths to generate (largest first), and optional crop (fraction of height to keep,
// removes distracting elements at the bottom of a couple of source photos).
const IMAGES = [
  { src: 'hero-technician-air-conditioner-repair-6471913.jpg', out: 'homepage/hero-ac-technician-repair', widths: [1920, 800] },
  { src: 'residential-modern-home-exterior-3665354.jpg', out: 'homepage/residential-modern-home-exterior', widths: [1400, 700], cropTopFraction: 0.82 },
  { src: 'commercial-rooftop-hvac-skyline-8065903.jpg', out: 'homepage/commercial-rooftop-hvac-skyline', widths: [1400, 700] },
  { src: 'emergency-technician-gauges-6471911.jpg', out: 'homepage/emergency-technician-response', widths: [1400, 700] },
  { src: 'membership-technician-drilling-5463581.jpg', out: 'homepage/membership-technician-inspection', widths: [1400, 700] },
  { src: 'financing-suburban-homes-sunset-30433180.jpg', out: 'homepage/financing-suburban-homes', widths: [1400, 700] },
  { src: 'cta-rooftop-hvac-industrial-2539462.jpg', out: 'backgrounds/cta-background-rooftop-units', widths: [1920, 800] },
  { src: 'ac-repair-manifold-gauge-6471912.jpg', out: 'services/ac-repair-manifold-gauge', widths: [1400, 700] },
  { src: 'ac-installation-technician-5463582.jpg', out: 'services/ac-installation-technician', widths: [1400, 700] },
  { src: 'indoor-air-quality-bright-interior-8146213.jpg', out: 'services/indoor-air-quality-bright-interior', widths: [1400, 700] },
  { src: 'duct-cleaning-industrial-ducts-8297856.jpg', out: 'services/duct-cleaning-industrial-ducts', widths: [1400, 700] },
  { src: 'uv-light-ventilation-pipes-36129008.jpg', out: 'services/uv-light-ventilation-system', widths: [1400, 700] },
  { src: 'pool-villa-sunset-miami-7313084.jpg', out: 'services/pool-heater-miami-villa-sunset', widths: [1400, 700] },
  { src: 'water-heater-installation-34938439.jpg', out: 'services/water-heater-installation', widths: [1400, 700] },
  { src: 'dryer-vent-laundry-closet-9515294.jpg', out: 'services/dryer-vent-laundry-closet', widths: [1400, 700] },
  { src: 'smart-thermostat-woman-adjust-36730582.jpg', out: 'services/smart-thermostat-wall-adjust', widths: [1400, 700] },
  { src: 'technician-rooftop-repair-5463587.jpg', out: 'about/technician-rooftop-work', widths: [1400, 700] },
  { src: 'commercial-technicians-rooftop-repair-5463577.jpg', out: 'gallery/commercial-technicians-rooftop', widths: [1000, 600] },
  { src: 'technician-inspecting-outdoor-unit-32497161.jpg', out: 'gallery/technician-inspecting-outdoor-unit', widths: [1000, 600] },
  { src: 'technician-outdoor-maintenance-kneeling-6471914.jpg', out: 'gallery/technician-outdoor-maintenance', widths: [1000, 600] },
];

const manifest = {};

for (const entry of IMAGES) {
  const srcPath = join(sourceDir, entry.src);
  if (!existsSync(srcPath)) {
    console.warn(`MISSING SOURCE: ${entry.src}`);
    continue;
  }

  const [category, basename] = entry.out.split('/');
  const outDir = join(publicImagesDir, category);
  mkdirSync(outDir, { recursive: true });

  let pipeline = sharp(srcPath).rotate(); // auto-orient from EXIF, then strip EXIF on output
  const meta = await pipeline.metadata();

  let cropHeight = meta.height;
  if (entry.cropTopFraction) {
    cropHeight = Math.round(meta.height * entry.cropTopFraction);
    pipeline = pipeline.extract({ left: 0, top: 0, width: meta.width, height: cropHeight });
  }

  const sizes = [];

  for (const width of entry.widths) {
    const targetWidth = Math.min(width, meta.width);
    const resized = sharp(srcPath).rotate();
    if (entry.cropTopFraction) {
      resized.extract({ left: 0, top: 0, width: meta.width, height: cropHeight });
    }
    resized.resize({ width: targetWidth, withoutEnlargement: true });

    const suffix = width === entry.widths[0] ? '' : '-sm';
    const jpgOut = join(outDir, `${basename}${suffix}.jpg`);
    const webpOut = join(outDir, `${basename}${suffix}.webp`);
    const avifOut = join(outDir, `${basename}${suffix}.avif`);

    const buf = await resized.clone().jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    const info = await sharp(buf).metadata();
    writeFileSync(jpgOut, buf);
    await resized.clone().webp({ quality: 78 }).toFile(webpOut);
    await resized.clone().avif({ quality: 55 }).toFile(avifOut);

    sizes.push({ width: info.width, height: info.height, suffix: suffix || 'default' });
    console.log(`✓ ${entry.out}${suffix} (${info.width}x${info.height}) — jpg/webp/avif`);
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

writeFileSync(join(root, 'src', 'data', 'image-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nManifest written with ${Object.keys(manifest).length} entries.`);
