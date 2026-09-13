/**
 * Generate PNG app icons from public/icons/icon.svg
 * Run: node scripts/generate-icons.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '../public/icons');
const svg = readFileSync(join(iconsDir, 'icon.svg'));

mkdirSync(iconsDir, { recursive: true });

async function writeAny(size, filename) {
  const buf = await sharp(svg)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  writeFileSync(join(iconsDir, filename), buf);
  console.log('wrote', filename);
}

/**
 * Maskable: full-bleed brand background with icon art inset ~20% safe zone.
 */
async function writeMaskable(size, filename) {
  const inset = Math.round(size * 0.2);
  const artSize = size - inset * 2;
  const art = await sharp(svg)
    .resize(artSize, artSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const buf = await sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: { r: 243, g: 238, b: 232 }, // #F3EEE8
    },
  })
    .composite([{ input: art, left: inset, top: inset }])
    .png()
    .toBuffer();

  writeFileSync(join(iconsDir, filename), buf);
  console.log('wrote', filename);
}

await writeAny(192, 'icon-192.png');
await writeAny(512, 'icon-512.png');
await writeAny(180, 'apple-touch-icon.png');
await writeMaskable(192, 'icon-192-maskable.png');
await writeMaskable(512, 'icon-512-maskable.png');
console.log('Icons ready.');
