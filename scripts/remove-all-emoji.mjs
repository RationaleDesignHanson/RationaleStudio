#!/usr/bin/env node
/**
 * Remove All Emoji from Codebase
 *
 * Replaces common emoji with consistent alternatives:
 * - ✓ ✔ → → (arrow bullet, already used throughout)
 * - ⚡ 💡 🔥 → remove completely
 * - Other decorative emoji → remove
 */

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function removeEmoji(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    let changes = [];
    const originalContent = content;

    // Pattern 1: Checkmarks in list items → convert to arrow
    const checkmarkPattern = /<li>✓\s*/g;
    if (checkmarkPattern.test(content)) {
      content = content.replace(/<li>✓\s*/g, '<li>→ ');
      changes.push('Converted ✓ to → in list items');
    }

    // Pattern 2: Checkmarks in spans → convert to arrow
    const spanCheckPattern = /<span[^>]*>✓<\/span>/g;
    if (spanCheckPattern.test(content)) {
      content = content.replace(/<span([^>]*)>✓<\/span>/g, '<span$1>→</span>');
      changes.push('Converted ✓ to → in spans');
    }

    // Pattern 3: Large checkmark displays → convert to arrow
    const largeCheckPattern = /<div[^>]*>✓<\/div>/g;
    if (largeCheckPattern.test(content)) {
      content = content.replace(/<div([^>]*)>✓<\/div>/g, '<div$1>→</div>');
      changes.push('Converted ✓ to → in divs');
    }

    // Pattern 4: Lightning bolt emoji
    if (content.includes('⚡')) {
      content = content.replace(/⚡\s*/g, '');
      changes.push('Removed ⚡ emoji');
    }

    // Pattern 5: Other common emoji
    if (content.includes('💡')) {
      content = content.replace(/💡\s*/g, '');
      changes.push('Removed 💡 emoji');
    }

    if (content.includes('🔥')) {
      content = content.replace(/🔥\s*/g, '');
      changes.push('Removed 🔥 emoji');
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
  console.log('Removing emoji from all client pages...\n');

  // Find all TSX files in app/clients (excluding backups)
  const pattern = join(rootDir, 'app/clients/**/*.tsx');
  const files = await glob(pattern, {
    ignore: ['**/node_modules/**', '**/_backup*/**']
  });

  let processedCount = 0;

  for (const file of files) {
    const changed = await removeEmoji(file);
    if (changed) processedCount++;
  }

  console.log(`\nProcessed ${processedCount} files with changes out of ${files.length} total.`);
}

main();
