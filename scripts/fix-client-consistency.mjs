#!/usr/bin/env node
/**
 * Fix Client Pages Consistency
 *
 * 1. Replace /services with /partnerships in hrefs
 * 2. Remove emoji from headings
 */

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const filesToUpdate = [
  'app/clients/home/page.tsx',
  'app/clients/about/page.tsx',
  'app/clients/ventures/page.tsx',
  'app/clients/insights/page.tsx',
  'app/clients/services/[slug]/page.tsx',
];

async function updateFile(filePath) {
  const fullPath = join(rootDir, filePath);

  try {
    let content = await fs.readFile(fullPath, 'utf-8');
    let changes = [];

    // Replace /services hrefs with /partnerships
    const servicesRegex = /href=(["'])\/services/g;
    if (servicesRegex.test(content)) {
      content = content.replace(/href=(["'])\/services/g, 'href=$1/partnerships');
      changes.push('Updated /services → /partnerships');
    }

    // Remove emoji from specific patterns
    // Pattern 1: Emoji in headings like "🛠️ Rationale Kits"
    if (content.includes('🛠️')) {
      content = content.replace(/🛠️\s*/g, '');
      changes.push('Removed 🛠️ emoji');
    }

    if (content.includes('💎')) {
      content = content.replace(/💎\s*/g, '');
      changes.push('Removed 💎 emoji');
    }

    if (content.includes('⚡')) {
      content = content.replace(/⚡\s*/g, '');
      changes.push('Removed ⚡ emoji');
    }

    if (changes.length > 0) {
      await fs.writeFile(fullPath, content, 'utf-8');
      console.log(`✓ ${filePath}`);
      changes.forEach(change => console.log(`  - ${change}`));
    } else {
      console.log(`- ${filePath} (no changes needed)`);
    }
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('Fixing client pages consistency...\n');

  for (const filePath of filesToUpdate) {
    await updateFile(filePath);
  }

  console.log('\nDone!');
}

main();
