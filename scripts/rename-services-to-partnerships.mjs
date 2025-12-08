#!/usr/bin/env node

/**
 * Rename all /services references to /partnerships
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const filesToUpdate = [
  'app/(public)/thinking/page.tsx',
  'app/(public)/about/page.tsx',
  'app/(public)/page.tsx',
  'app/(public)/partnerships/clarity-kit/page.tsx',
  'app/(public)/partnerships/build-ship-run/page.tsx',
  'app/(public)/partnerships/prototype-kit/page.tsx',
  'app/(public)/work/page.tsx',
];

async function updateFile(filePath) {
  const fullPath = join(projectRoot, filePath);

  try {
    let content = await fs.readFile(fullPath, 'utf-8');
    const originalContent = content;

    // Replace all /services references with /partnerships
    content = content.replace(/href=(["'])\/services/g, 'href=$1/partnerships');
    content = content.replace(/to=(["'])\/services/g, 'to=$1/partnerships');
    content = content.replace(/link to \/services/gi, 'link to /partnerships');
    content = content.replace(/View services/g, 'View partnerships');

    if (content !== originalContent) {
      await fs.writeFile(fullPath, content, 'utf-8');
      console.log(`✓ Updated: ${filePath}`);
      return true;
    } else {
      console.log(`- No changes: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('\n🔄 Renaming /services to /partnerships...\n');

  let updatedCount = 0;

  for (const file of filesToUpdate) {
    const updated = await updateFile(file);
    if (updated) updatedCount++;
  }

  console.log(`\n✅ Complete! Updated ${updatedCount} of ${filesToUpdate.length} files.\n`);
}

main();
