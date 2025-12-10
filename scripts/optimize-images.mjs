#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Optimizes all images in public/ directory using Sharp:
 * - Generates responsive variants at 5 breakpoints (400w, 800w, 1200w, 1600w, 2400w)
 * - Converts to WebP with JPEG/PNG fallback
 * - Maintains original aspect ratios
 * - Skips images that are already optimized
 *
 * Usage:
 *   node scripts/optimize-images.mjs [--dry-run] [--verbose] [--force]
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');
const BREAKPOINTS = [400, 800, 1200, 1600, 2400];
const WEBP_QUALITY = 85;
const JPEG_QUALITY = 85;
const PNG_QUALITY = 90;

// CLI flags
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isVerbose = args.includes('--verbose');
const isForce = args.includes('--force');

// Statistics
const stats = {
  totalImages: 0,
  optimized: 0,
  skipped: 0,
  failed: 0,
  originalSize: 0,
  optimizedSize: 0,
};

/**
 * Find all images in public directory
 */
async function findImages(dir, baseDir = dir) {
  const images = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip optimized directory
    if (entry.isDirectory() && entry.name === 'optimized') {
      continue;
    }

    if (entry.isDirectory()) {
      images.push(...await findImages(fullPath, baseDir));
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(entry.name)) {
      const relativePath = path.relative(baseDir, fullPath);
      images.push({ fullPath, relativePath });
    }
  }

  return images;
}

/**
 * Check if image needs optimization
 */
async function needsOptimization(imagePath, relativePath) {
  if (isForce) return true;

  // Check if optimized versions exist
  const baseName = path.basename(relativePath, path.extname(relativePath));
  const dirName = path.dirname(relativePath);
  const optimizedDir = path.join(OPTIMIZED_DIR, dirName);

  try {
    await fs.access(optimizedDir);

    // Check if all breakpoints exist
    for (const width of BREAKPOINTS) {
      const webpPath = path.join(optimizedDir, `${baseName}-${width}w.webp`);
      try {
        await fs.access(webpPath);
      } catch {
        return true; // Missing breakpoint
      }
    }

    return false; // All variants exist
  } catch {
    return true; // Directory doesn't exist
  }
}

/**
 * Optimize a single image
 */
async function optimizeImage(imagePath, relativePath) {
  const baseName = path.basename(relativePath, path.extname(relativePath));
  const ext = path.extname(relativePath).toLowerCase();
  const dirName = path.dirname(relativePath);
  const outputDir = path.join(OPTIMIZED_DIR, dirName);

  if (isVerbose) {
    console.log(`\n📸 Processing: ${relativePath}`);
  }

  try {
    // Get original image metadata
    const metadata = await sharp(imagePath).metadata();
    const originalWidth = metadata.width;
    const originalHeight = metadata.height;

    if (isVerbose) {
      console.log(`   Original: ${originalWidth}x${originalHeight}, ${(metadata.size / 1024).toFixed(1)}KB`);
    }

    stats.originalSize += metadata.size || 0;

    // Create output directory
    if (!isDryRun) {
      await fs.mkdir(outputDir, { recursive: true });
    }

    // Generate responsive variants
    for (const targetWidth of BREAKPOINTS) {
      // Skip if target width is larger than original
      if (targetWidth > originalWidth) {
        if (isVerbose) {
          console.log(`   ⏭️  Skipping ${targetWidth}w (larger than original)`);
        }
        continue;
      }

      const webpPath = path.join(outputDir, `${baseName}-${targetWidth}w.webp`);
      const fallbackPath = path.join(outputDir, `${baseName}-${targetWidth}w${ext}`);

      if (!isDryRun) {
        // Generate WebP
        const webpInfo = await sharp(imagePath)
          .resize(targetWidth, null, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality: WEBP_QUALITY })
          .toFile(webpPath);

        // Generate fallback (JPEG or PNG)
        let fallbackInfo;
        if (ext === '.png') {
          fallbackInfo = await sharp(imagePath)
            .resize(targetWidth, null, {
              fit: 'inside',
              withoutEnlargement: true,
            })
            .png({ quality: PNG_QUALITY, compressionLevel: 9 })
            .toFile(fallbackPath);
        } else {
          fallbackInfo = await sharp(imagePath)
            .resize(targetWidth, null, {
              fit: 'inside',
              withoutEnlargement: true,
            })
            .jpeg({ quality: JPEG_QUALITY, progressive: true })
            .toFile(fallbackPath);
        }

        stats.optimizedSize += webpInfo.size + fallbackInfo.size;

        if (isVerbose) {
          const savings = ((1 - webpInfo.size / (metadata.size * targetWidth / originalWidth)) * 100).toFixed(1);
          console.log(`   ✅ ${targetWidth}w: ${(webpInfo.size / 1024).toFixed(1)}KB WebP (${savings}% smaller)`);
        }
      } else {
        console.log(`   [DRY RUN] Would create: ${baseName}-${targetWidth}w.webp`);
      }
    }

    stats.optimized++;
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
    stats.failed++;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log(`Mode: ${isDryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Force: ${isForce ? 'YES' : 'NO'}`);
  console.log(`Verbose: ${isVerbose ? 'YES' : 'NO'}`);
  console.log(`Breakpoints: ${BREAKPOINTS.join('w, ')}w\n`);

  // Find all images
  console.log('🔍 Finding images...');
  const images = await findImages(PUBLIC_DIR);
  stats.totalImages = images.length;
  console.log(`Found ${images.length} images\n`);

  // Filter images that need optimization
  console.log('🧹 Checking which images need optimization...');
  const imagesToOptimize = [];

  for (const image of images) {
    const needs = await needsOptimization(image.fullPath, image.relativePath);
    if (needs) {
      imagesToOptimize.push(image);
    } else {
      stats.skipped++;
      if (isVerbose) {
        console.log(`⏭️  Skipped (already optimized): ${image.relativePath}`);
      }
    }
  }

  console.log(`${imagesToOptimize.length} images need optimization`);
  console.log(`${stats.skipped} images already optimized\n`);

  if (imagesToOptimize.length === 0) {
    console.log('✅ All images are already optimized!');
    return;
  }

  // Optimize images
  console.log('⚡ Optimizing images...\n');
  const startTime = Date.now();

  for (let i = 0; i < imagesToOptimize.length; i++) {
    const image = imagesToOptimize[i];
    const progress = `[${i + 1}/${imagesToOptimize.length}]`;

    if (!isVerbose) {
      process.stdout.write(`\r${progress} ${image.relativePath}${' '.repeat(50)}`);
    }

    await optimizeImage(image.fullPath, image.relativePath);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  // Print statistics
  console.log('\n\n📊 Statistics:');
  console.log(`   Total images: ${stats.totalImages}`);
  console.log(`   Optimized: ${stats.optimized}`);
  console.log(`   Skipped: ${stats.skipped}`);
  console.log(`   Failed: ${stats.failed}`);

  if (!isDryRun && stats.optimized > 0) {
    const originalMB = (stats.originalSize / 1024 / 1024).toFixed(2);
    const optimizedMB = (stats.optimizedSize / 1024 / 1024).toFixed(2);
    const savingsPercent = ((1 - stats.optimizedSize / stats.originalSize) * 100).toFixed(1);

    console.log(`\n💾 Size:`);
    console.log(`   Original: ${originalMB}MB`);
    console.log(`   Optimized: ${optimizedMB}MB`);
    console.log(`   Savings: ${savingsPercent}%`);
  }

  console.log(`\n⏱️  Duration: ${duration}s`);
  console.log(`\n✅ Optimization complete!`);

  if (isDryRun) {
    console.log('\n💡 Run without --dry-run to perform actual optimization');
  }
}

main().catch(console.error);
