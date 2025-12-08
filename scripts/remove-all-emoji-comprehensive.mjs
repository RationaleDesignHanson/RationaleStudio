#!/usr/bin/env node
/**
 * Comprehensive Emoji Removal
 *
 * Removes ALL emoji from codebase using comprehensive Unicode ranges
 */

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Comprehensive emoji removal regex
// Covers all major emoji Unicode ranges
const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F910}-\u{1F96B}]|[\u{1F980}-\u{1F9E0}]/gu;

async function removeEmoji(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    const originalContent = content;
    let changes = [];

    // Extract emoji found before removal
    const foundEmoji = [...new Set(content.match(emojiRegex) || [])];

    if (foundEmoji.length > 0) {
      // Remove all emoji, preserving spacing
      content = content.replace(emojiRegex, '');

      // Clean up any resulting double spaces or trailing spaces in headings
      content = content.replace(/>\s{2,}/g, '> ');
      content = content.replace(/\s{2,}</g, ' <');

      changes.push(`Removed emoji: ${foundEmoji.join(', ')}`);
    }

    if (content !== originalContent) {
      await fs.writeFile(filePath, content, 'utf-8');
      console.log(`✓ ${filePath.replace(rootDir + '/', '')}`);
      changes.forEach(change => console.log(`  - ${change}`));
      return true;
    }

    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Comprehensive emoji removal from all pages...\n');

  // Find all TSX files in app (excluding node_modules and backups)
  const pattern = join(rootDir, 'app/**/*.tsx');
  const files = await glob(pattern, {
    ignore: ['**/node_modules/**', '**/_backup*/**', '**/.next/**']
  });

  let processedCount = 0;

  for (const file of files) {
    const changed = await removeEmoji(file);
    if (changed) processedCount++;
  }

  console.log(`\nProcessed ${processedCount} files with changes out of ${files.length} total.`);
}

main();
