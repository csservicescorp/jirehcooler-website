import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcPath = join(root, 'public', 'images', 'jireh-originals', 'jireh-cooler-logo.png');
const outDir = join(root, 'public');
mkdirSync(outDir, { recursive: true });

const ROYAL = { r: 4, g: 54, b: 136 };

const img = sharp(srcPath).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const idx = (x, y) => (y * width + x) * channels;
const brightness = (r, g, b) => (r + g + b) / 3;
const isNearGray = (r, g, b, tol = 26) => Math.max(r, g, b) - Math.min(r, g, b) <= tol;

// Pass 1: flood-fill the checkerboard background from the border.
const bg = new Uint8Array(width * height);
const stack = [];
for (let x = 0; x < width; x++) { stack.push([x, 0]); stack.push([x, height - 1]); }
for (let y = 0; y < height; y++) { stack.push([0, y]); stack.push([width - 1, y]); }

while (stack.length) {
  const [x, y] = stack.pop();
  if (x < 0 || y < 0 || x >= width || y >= height) continue;
  const p = y * width + x;
  if (bg[p]) continue;
  const i = idx(x, y);
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const isBackground = isNearGray(r, g, b) && brightness(r, g, b) >= 225;
  if (!isBackground) continue;
  bg[p] = 1;
  stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

// Pass 2: reopen small enclosed background regions (letter counters etc.)
const HOLE_MAX_SIZE = 8000;
const visited = new Uint8Array(width * height);
for (let sy = 0; sy < height; sy++) {
  for (let sx = 0; sx < width; sx++) {
    const sp = sy * width + sx;
    if (bg[sp] || visited[sp]) continue;
    const i = idx(sx, sy);
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (!(isNearGray(r, g, b) && brightness(r, g, b) >= 200)) { visited[sp] = 1; continue; }
    const region = [sp];
    visited[sp] = 1;
    let touchesBg = false;
    let qi = 0;
    while (qi < region.length) {
      const p = region[qi++];
      const x = p % width, y = (p / width) | 0;
      const neighbors = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
      for (const [nx, ny] of neighbors) {
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const np = ny * width + nx;
        if (bg[np]) { touchesBg = true; continue; }
        if (visited[np]) continue;
        const ni = idx(nx, ny);
        const nr = data[ni], ng = data[ni + 1], nb = data[ni + 2];
        if (isNearGray(nr, ng, nb) && brightness(nr, ng, nb) >= 200) {
          visited[np] = 1;
          region.push(np);
        } else {
          visited[np] = 1;
        }
      }
      if (region.length > HOLE_MAX_SIZE) break;
    }
    if (!touchesBg && region.length <= HOLE_MAX_SIZE) {
      for (const p of region) bg[p] = 1;
    }
  }
}

// Build a white-silhouette-only buffer: bear (neutral white/black pixels) -> opaque white;
// colored text pixels and background -> transparent. The "JIREH COOLER Air
// Conditioning" wordmark (and its anti-aliased halo) sits in a horizontal band
// starting around y=560 in the 897px-tall source, so that band is hard-cut
// rather than color-matched, since near-white halo pixels around the navy
// text are otherwise indistinguishable from the bear's own white fill.
const TEXT_BAND_Y = 555;
const out = Buffer.alloc(width * height * 4);
let minX = width, minY = height, maxX = 0, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const p = y * width + x;
    const i = idx(x, y);
    const oi = (y * width + x) * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const isBg = bg[p] === 1;
    const isBearPixel = !isBg && y < TEXT_BAND_Y && isNearGray(r, g, b, 40);
    if (isBearPixel) {
      out[oi] = 255; out[oi + 1] = 255; out[oi + 2] = 255; out[oi + 3] = 255;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    } else {
      out[oi] = 0; out[oi + 1] = 0; out[oi + 2] = 0; out[oi + 3] = 0;
    }
  }
}

console.log(`Bear bounding box: (${minX},${minY}) - (${maxX},${maxY})`);
const bearWidth = maxX - minX + 1;
const bearHeight = maxY - minY + 1;

const bearSilhouette = sharp(out, { raw: { width, height, channels: 4 } })
  .extract({ left: minX, top: minY, width: bearWidth, height: bearHeight });

await bearSilhouette.clone().png().toFile(join(outDir, '_bear-silhouette-debug.png'));

// Compose onto square royal-blue canvases at each required size, bear filling ~72% of canvas.
async function makeIcon(size, filename, { squareBg = true, padding = 0.14 } = {}) {
  const innerSize = Math.round(size * (1 - padding * 2));
  const scale = Math.min(innerSize / bearWidth, innerSize / bearHeight);
  const resizedW = Math.round(bearWidth * scale);
  const resizedH = Math.round(bearHeight * scale);

  const resizedBear = await bearSilhouette.clone().resize(resizedW, resizedH).png().toBuffer();

  const left = Math.round((size - resizedW) / 2);
  const top = Math.round((size - resizedH) / 2);

  let canvas = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: squareBg ? { ...ROYAL, alpha: 1 } : { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite([{ input: resizedBear, left, top }]);

  if (!squareBg) canvas = canvas.png();
  await canvas.png().toFile(join(outDir, filename));
  console.log(`✓ ${filename} (${size}x${size})`);
}

await makeIcon(16, 'favicon-16x16.png');
await makeIcon(32, 'favicon-32x32.png');
await makeIcon(180, 'apple-touch-icon.png', { padding: 0.16 });
await makeIcon(192, 'android-chrome-192x192.png');
await makeIcon(512, 'android-chrome-512x512.png');
await makeIcon(48, '_favicon-48.png');

// Build favicon.svg: royal-blue rounded square with the white bear silhouette embedded as a data URI.
const svgSourcePng = await sharp(join(outDir, 'android-chrome-512x512.png')).toBuffer();
const b64 = svgSourcePng.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#043688"/>
  <image href="data:image/png;base64,${b64.replace(/^/, '')}" x="0" y="0" width="512" height="512"/>
</svg>
`;
// The embedded 512 PNG already includes the royal-blue background + bear, so drop the redundant rect duplication risk by just using the PNG directly with rounded corners via clip-path.
const svgFinal = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <clipPath id="r"><rect width="512" height="512" rx="112"/></clipPath>
  </defs>
  <g clip-path="url(#r)">
    <image href="data:image/png;base64,${b64}" x="0" y="0" width="512" height="512"/>
  </g>
</svg>
`;
writeFileSync(join(outDir, 'favicon.svg'), svgFinal);
console.log('✓ favicon.svg');

// Build multi-size favicon.ico (16, 32, 48) using a minimal hand-rolled ICO container.
const png16 = await sharp(join(outDir, 'favicon-16x16.png')).toBuffer();
const png32 = await sharp(join(outDir, 'favicon-32x32.png')).toBuffer();
const png48 = await sharp(join(outDir, '_favicon-48.png')).toBuffer();
const images = [
  { size: 16, buf: png16 },
  { size: 32, buf: png32 },
  { size: 48, buf: png48 },
];

const headerSize = 6;
const dirEntrySize = 16;
const offsetStart = headerSize + dirEntrySize * images.length;
const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);

const dirEntries = [];
const dataChunks = [];
let offset = offsetStart;
for (const { size, buf } of images) {
  const entry = Buffer.alloc(dirEntrySize);
  entry.writeUInt8(size === 256 ? 0 : size, 0);
  entry.writeUInt8(size === 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(buf.length, 8);
  entry.writeUInt32LE(offset, 12);
  dirEntries.push(entry);
  dataChunks.push(buf);
  offset += buf.length;
}

const ico = Buffer.concat([header, ...dirEntries, ...dataChunks]);
writeFileSync(join(outDir, 'favicon.ico'), ico);
console.log('✓ favicon.ico');

// site.webmanifest
const manifest = {
  name: 'Jireh Cooler Air Conditioning',
  short_name: 'Jireh Cooler',
  icons: [
    { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
  ],
  theme_color: '#043688',
  background_color: '#043688',
  display: 'standalone',
};
writeFileSync(join(outDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');
console.log('✓ site.webmanifest');

console.log('\nDone. Inspect public/_bear-silhouette-debug.png to verify the crop before cleanup.');
