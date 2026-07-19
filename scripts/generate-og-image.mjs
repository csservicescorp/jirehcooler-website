import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images', 'og');
mkdirSync(outDir, { recursive: true });

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#082b4c"/>
      <stop offset="100%" stop-color="#061f38"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="80" y="80" width="96" height="96" rx="20" fill="url(#markGrad)"/>
  <defs>
    <linearGradient id="markGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1268b3"/>
      <stop offset="100%" stop-color="#2f8fe5"/>
    </linearGradient>
  </defs>
  <text x="128" y="148" font-family="Arial, sans-serif" font-weight="800" font-size="46" fill="#ffffff" text-anchor="middle">JC</text>
  <text x="80" y="280" font-family="Arial, sans-serif" font-weight="800" font-size="64" fill="#ffffff">Jireh Cooler</text>
  <text x="80" y="335" font-family="Arial, sans-serif" font-weight="600" font-size="30" fill="#2f8fe5" letter-spacing="1">South Florida Air Conditioning Experts</text>
  <text x="80" y="420" font-family="Arial, sans-serif" font-weight="400" font-size="26" fill="#eaf5fc">Family-owned. State-certified. Serving Broward &amp; Palm Beach County since 1994.</text>
  <line x1="80" y1="470" x2="1120" y2="470" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1"/>
  <text x="80" y="530" font-family="Arial, sans-serif" font-weight="700" font-size="28" fill="#ffffff">(954) 426-6010</text>
  <text x="80" y="568" font-family="Arial, sans-serif" font-weight="400" font-size="22" fill="#b7cbe0">24/7 Emergency Service Available</text>
</svg>
`;

await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(join(outDir, 'default-og.jpg'));
console.log('Generated default-og.jpg');
