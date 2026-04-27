// Generates public/og-image.jpg from an inline SVG.
// Run manually after brand/visual changes: `node scripts/generate-og.mjs`
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "public", "og-image.jpg");

// G-code helix (same math as Hero.astro, scaled for 1200×630)
const turns = 14;
const stepsPerTurn = 56;
const cx = 940;
const baseY = 470;
const totalHeight = 280;
const rxBase = 100;
const ryBase = 30;
const profile = (t) => 0.78 - 0.42 * Math.sin(Math.PI * t) + 0.30 * t;

let pathD = "";
for (let i = 0; i <= turns * stepsPerTurn; i++) {
  const t = i / (turns * stepsPerTurn);
  const theta = (i / stepsPerTurn) * 2 * Math.PI;
  const r = profile(t);
  const x = cx + rxBase * r * Math.cos(theta);
  const y = baseY - totalHeight * t + ryBase * r * Math.sin(theta);
  pathD += `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
}

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="stroke" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#c2410c" stop-opacity="0.5"/>
      <stop offset="40%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#fdba74"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f97316" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
    <filter id="bloom" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Subtle grid -->
  <g opacity="0.07" stroke="#ffffff" stroke-width="1" fill="none">
    ${Array.from({ length: 26 }, (_, i) => `<path d="M ${i * 48} 0 V 630"/>`).join("")}
    ${Array.from({ length: 14 }, (_, i) => `<path d="M 0 ${i * 48} H 1200"/>`).join("")}
  </g>

  <!-- Glow under helix -->
  <ellipse cx="${cx}" cy="${baseY + 10}" rx="160" ry="100" fill="url(#glow)"/>

  <!-- Build plate ellipse -->
  <ellipse cx="${cx}" cy="${baseY + 8}" rx="${rxBase * 1.05}" ry="${ryBase * 0.42}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" stroke-dasharray="2 4"/>

  <!-- Helix glow underlay -->
  <path d="${pathD}" stroke="#f97316" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.35" filter="url(#bloom)"/>
  <!-- Helix main stroke -->
  <path d="${pathD}" stroke="url(#stroke)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Logo mark -->
  <g transform="translate(80, 80)">
    <rect width="56" height="56" rx="12" fill="#ffffff"/>
    <g transform="translate(28, 28)" stroke="#0f172a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M -14 -6 L 0 -12 L 14 -6 L 0 0 Z"/>
      <path d="M -14 -6 V 8 L 0 14 L 14 8 V -6"/>
      <path d="M 0 0 V 14"/>
    </g>
    <text x="76" y="38" font-family="'Space Grotesk', 'Inter', sans-serif" font-size="36" font-weight="700" fill="#ffffff">Panum</text>
  </g>

  <!-- Headline -->
  <g transform="translate(80, 240)" font-family="'Space Grotesk', 'Inter', sans-serif" fill="#ffffff">
    <text font-size="64" font-weight="700" letter-spacing="-1.5">
      <tspan x="0" dy="0">Druk 3D</tspan>
      <tspan x="0" dy="76">na zamówienie</tspan>
    </text>
  </g>

  <!-- Subtext / tagline -->
  <text x="80" y="445" font-family="Inter, sans-serif" font-size="24" font-weight="500" fill="#cbd5e1">
    Wycena w 4h · Realizacja 2–5 dni · Druk od 1 szt.
  </text>

  <!-- Bottom badge bar -->
  <g transform="translate(80, 510)">
    <rect width="280" height="48" rx="24" fill="#f97316"/>
    <text x="140" y="31" font-family="Inter, sans-serif" font-size="18" font-weight="600" fill="#ffffff" text-anchor="middle">panum.pl</text>
  </g>

  <text x="80" y="595" font-family="Inter, sans-serif" font-size="14" fill="#64748b">
    Prototypy · Części techniczne · Modele · Modelowanie 3D
  </text>
</svg>`;

const buffer = await sharp(Buffer.from(svg))
  .jpeg({ quality: 88, progressive: true, mozjpeg: true })
  .toBuffer();

writeFileSync(out, buffer);
console.log(`Wrote ${out} (${(buffer.length / 1024).toFixed(1)} KB)`);
