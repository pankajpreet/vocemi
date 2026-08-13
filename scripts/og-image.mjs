import sharp from "sharp";

const FONT = "Segoe UI, Inter, Arial, sans-serif";

// Vocemi's waveform motif, drawn as plain rects so no font or asset is needed.
const bars = [0.35, 0.7, 1, 0.5, 0.85, 0.3, 0.6, 0.95, 0.45, 0.75, 0.4, 0.9, 0.55, 0.3]
  .map((h, i) => {
    // Baseline sits well below the sub-headline's descenders — at the
    // original height the bars ran straight through the line of text.
    const barH = Math.round(h * 56);
    const x = 80 + i * 22;
    const y = 505 - barH;
    return `<rect x="${x}" y="${y}" width="9" height="${barH}" rx="4.5" fill="url(#g)" opacity="0.9"/>`;
  })
  .join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#3B54F4"/>
      <stop offset="1" stop-color="#7C90FF"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#3B54F4" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#3B54F4" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#FAFAF7"/>
  <circle cx="1080" cy="120" r="300" fill="url(#glow)"/>

  <rect x="80" y="72" width="52" height="52" rx="15" fill="#3B54F4"/>
  <circle cx="106" cy="98" r="8.5" fill="#FFFFFF"/>
  <text x="150" y="116" font-family="${FONT}" font-size="34" font-weight="700"
        letter-spacing="-0.8" fill="#16181C">Vocemi</text>

  <text x="80" y="252" font-family="${FONT}" font-size="70" font-weight="700"
        letter-spacing="-2.4" fill="#16181C">Never miss another</text>
  <text x="80" y="336" font-family="${FONT}" font-size="70" font-weight="700"
        letter-spacing="-2.4" fill="#3B54F4">call, lead, or booking.</text>

  <text x="80" y="400" font-family="${FONT}" font-size="27" font-weight="400"
        fill="#5C5F66">AI employees that answer, qualify, and book — 24/7.</text>

  ${bars}

  <rect x="80" y="536" width="1040" height="1" fill="#16181C" opacity="0.1"/>
  <text x="80" y="580" font-family="${FONT}" font-size="23" font-weight="600"
        fill="#16181C" opacity="0.55">vocemi.com</text>
  <text x="1120" y="580" text-anchor="end" font-family="${FONT}" font-size="23"
        font-weight="400" fill="#16181C" opacity="0.4">Calgary, Alberta</text>
</svg>`;

// Rendered at 2x then resized down, so the type keeps clean edges at the
// 1200x630 the Open Graph metadata declares.
const out = process.argv[2] || "public/og-image.png";
await sharp(Buffer.from(svg), { density: 144 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(out);
const meta = await sharp(out).metadata();
console.log(`wrote ${out} — ${meta.width}x${meta.height}, ${Math.round(meta.size / 1024)} KB`);
