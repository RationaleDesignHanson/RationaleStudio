#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts PNG/JPG to WebP and AVIF for 70-80% size reduction
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images');

const WEBP_QUALITY = 85;
const AVIF_QUALITY = 75;

let stats = {
  total: 0,
  converted: 0,
  errors: 0,
  originalSize: 0,
  webpSize: 0,
  avifSize: 0
};

async function getFileSize(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.size;
  } catch {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const dir = path.dirname(inputPath);
  const basename = path.basename(inputPath, ext);
  const webpPath = path.join(dir, `${basename}.webp`);
  const avifPath = path.join(dir, `${basename}.avif`);

  try {
    const originalSize = await getFileSize(inputPath);
    stats.originalSize += originalSize;

    console.log(`\n📸 ${path.relative(PUBLIC_DIR, inputPath)}`);
    console.log(`   Original: ${formatBytes(originalSize)}`);

    await sharp(inputPath).webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(webpPath);
    const webpSize = await getFileSize(webpPath);
    stats.webpSize += webpSize;
    console.log(`   WebP: ${formatBytes(webpSize)} (-${((1 - webpSize / originalSize) * 100).toFixed(1)}%)`);

    await sharp(inputPath).avif({ quality: AVIF_QUALITY, effort: 6 }).toFile(avifPath);
    const avifSize = await getFileSize(avifPath);
    stats.avifSize += avifSize;
    console.log(`   AVIF: ${formatBytes(avifSize)} (-${((1 - avifSize / originalSize) * 100).toFixed(1)}%)`);

    stats.converted++;
    return true;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    stats.errors++;
    return false;
  }
}

async function findImages(dir) {
  const images = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        images.push(...await findImages(fullPath));
      } else if (['.png', '.jpg', '.jpeg'].includes(path.extname(entry.name).toLowerCase())) {
        images.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading ${dir}:`, error.message);
  }
  return images;
}

async function main() {
  console.log('🎨 Image Optimization\n');
  const images = await findImages(PUBLIC_DIR);
  stats.total = images.length;

  if (images.length === 0) {
    console.log('No images found.');
    return;
  }

  console.log(`Found ${images.length} images\n`);
  for (const img of images) await optimizeImage(img);

  console.log('\n\n📊 Summary');
  console.log('===========');
  console.log(`Converted: ${stats.converted}/${stats.total}`);
  console.log(`Original: ${formatBytes(stats.originalSize)}`);
  console.log(`WebP: ${formatBytes(stats.webpSize)} (-${((1 - stats.webpSize / stats.originalSize) * 100).toFixed(1)}%)`);
  console.log(`AVIF: ${formatBytes(stats.avifSize)} (-${((1 - stats.avifSize / stats.originalSize) * 100).toFixed(1)}%)\n`);
}

main().catch(console.error);
