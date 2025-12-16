import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcon(size, filename) {
  // Read the SVG and convert to PNG at the specified size
  const svgPath = path.join(__dirname, '..', 'app', 'icon.svg');
  const outputPath = path.join(__dirname, '..', 'app', filename);

  await sharp(svgPath)
    .resize(size, size)
    .png()
    .toFile(outputPath);

  console.log(`Generated ${filename} (${size}x${size})`);
}

// Generate icons
async function main() {
  await generateIcon(180, 'apple-icon.png'); // Apple Touch Icon (180x180)
  await generateIcon(512, 'icon.png'); // PWA icon (512x512)
  console.log('Icon generation complete!');
}

main().catch(console.error);
