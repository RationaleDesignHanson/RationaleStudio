#!/usr/bin/env node
/**
 * Inline Button Migration Script
 *
 * Converts hardcoded #FFD700 inline buttons to ButtonPrimary component from ButtonHierarchy system.
 *
 * Patterns to migrate:
 * 1. <a className="...bg-[#FFD700]..." href="...">Text</a>
 *    → <ButtonPrimary href="..." className="...">Text</ButtonPrimary>
 *
 * 2. <button className="...bg-[#FFD700]..." onClick={...}>Text</button>
 *    → <ButtonPrimary onClick={...} className="...">Text</ButtonPrimary>
 *
 * Phase 4.3: Button System Unification
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');

// Files to migrate (from grep results)
const TARGET_FILES = [
  'app/clients/creait/investor-portal/page.tsx',
  'app/clients/invest/amplify/page.tsx',
  'app/clients/invest/studio/page.tsx',
  'app/clients/invest/atlas/page.tsx',
  'app/clients/invest/zero/page.tsx',
  'app/clients/partnerships/[slug]/page.tsx',
  'app/investors/studio/data-room/page.tsx',
  'components/athletes-first/demos/ImmersivePitchDemo.tsx',
  'app/(public)/historical-work/page.tsx',
  'app/clients/invest/page.tsx',
  'app/clients/login/page.tsx',
  'app/investors/deck/page.tsx',
  'app/owner/outbound/page.tsx',
  'app/pitch/[company]/page.tsx',
  'components/pitches/GannettPitch.tsx',
  'app/insights/page.tsx',
  'app/login/page.tsx',
  'app/logout/page.tsx',
];

// Statistics
const stats = {
  filesProcessed: 0,
  filesModified: 0,
  buttonsConverted: 0,
  importsAdded: 0,
  errors: [],
};

/**
 * Extract className attributes, removing button-specific styles
 */
function cleanClassName(className) {
  if (!className) return '';

  // Remove these button-specific styles (ButtonPrimary provides them)
  const removePatterns = [
    /bg-\[#FFD700\]/g,
    /bg-terminal-gold/g,
    /text-black/g,
    /text-white/g,
    /hover:bg-terminal-gold\/90/g,
    /hover:bg-\[#FFE34D\]/g,
    /px-\d+/g,
    /py-\d+/g,
    /rounded(-\w+)?/g,
    /transition(-\w+)?/g,
    /font-medium/g,
    /font-semibold/g,
  ];

  let cleaned = className;
  removePatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });

  // Clean up extra spaces
  return cleaned.trim().replace(/\s+/g, ' ');
}

/**
 * Check if file already imports ButtonPrimary
 */
function hasButtonImport(content) {
  return /import\s+{[^}]*ButtonPrimary[^}]*}\s+from\s+['"]@\/components\/ui\/ButtonHierarchy['"]/.test(content);
}

/**
 * Add ButtonPrimary import if not already present
 */
function addButtonImport(content) {
  if (hasButtonImport(content)) {
    return content;
  }

  // Find the first import statement
  const importMatch = content.match(/^import\s+/m);
  if (!importMatch) {
    // No imports found, add at top after 'use client' if present
    const useClientMatch = content.match(/^'use client';?\n/m);
    if (useClientMatch) {
      return content.replace(
        /^'use client';?\n/m,
        `'use client';\n\nimport { ButtonPrimary } from '@/components/ui/ButtonHierarchy';\n`
      );
    }
    return `import { ButtonPrimary } from '@/components/ui/ButtonHierarchy';\n\n${content}`;
  }

  // Add after last import
  const lastImportIndex = content.lastIndexOf('\nimport ');
  const nextLineIndex = content.indexOf('\n', lastImportIndex + 1);

  return content.slice(0, nextLineIndex + 1) +
         `import { ButtonPrimary } from '@/components/ui/ButtonHierarchy';\n` +
         content.slice(nextLineIndex + 1);
}

/**
 * Convert <a> tag with bg-[#FFD700] to ButtonPrimary
 */
function convertAnchorToButton(content) {
  // Pattern: <a className="...bg-[#FFD700]..." href="..." ...>Text</a>
  const anchorPattern = /<a\s+([^>]*?)className="([^"]*?)bg-\[#FFD700\]([^"]*?)"([^>]*?)>([\s\S]*?)<\/a>/g;

  let modified = false;
  const result = content.replace(anchorPattern, (match, beforeClass, classPrefix, classSuffix, afterClass, children) => {
    const fullClassName = (classPrefix + classSuffix).trim();
    const cleanedClassName = cleanClassName(fullClassName);

    // Extract href
    const hrefMatch = (beforeClass + afterClass).match(/href="([^"]*)"/);
    const href = hrefMatch ? hrefMatch[1] : '';

    // Build ButtonPrimary
    const classAttr = cleanedClassName ? ` className="${cleanedClassName}"` : '';
    modified = true;
    stats.buttonsConverted++;

    return `<ButtonPrimary href="${href}"${classAttr}>\n              ${children.trim()}\n            </ButtonPrimary>`;
  });

  if (modified) {
    stats.filesModified++;
  }

  return result;
}

/**
 * Migrate a single file
 */
function migrateFile(filePath) {
  const fullPath = path.join(PROJECT_ROOT, filePath);

  if (!fs.existsSync(fullPath)) {
    stats.errors.push(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;

  // Check if file has bg-[#FFD700] buttons
  if (!content.includes('bg-[#FFD700]')) {
    return;
  }

  console.log(`\nProcessing: ${filePath}`);

  // Step 1: Add import if needed
  const needsImport = !hasButtonImport(content);
  if (needsImport) {
    content = addButtonImport(content);
    stats.importsAdded++;
    console.log('  ✓ Added ButtonPrimary import');
  }

  // Step 2: Convert anchor tags
  content = convertAnchorToButton(content);

  // Only write if content changed
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  ✓ Migrated ${stats.buttonsConverted} button(s)`);
    stats.filesModified++;
  }

  stats.filesProcessed++;
}

/**
 * Main migration function
 */
function main() {
  console.log('🚀 Starting Inline Button Migration (Phase 4.3)\n');
  console.log('Converting bg-[#FFD700] buttons to ButtonPrimary component...\n');

  // Process each target file
  TARGET_FILES.forEach(filePath => {
    try {
      migrateFile(filePath);
    } catch (error) {
      stats.errors.push(`${filePath}: ${error.message}`);
      console.error(`  ✗ Error: ${error.message}`);
    }
  });

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('MIGRATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Files processed:    ${stats.filesProcessed}`);
  console.log(`Files modified:     ${stats.filesModified}`);
  console.log(`Buttons converted:  ${stats.buttonsConverted}`);
  console.log(`Imports added:      ${stats.importsAdded}`);

  if (stats.errors.length > 0) {
    console.log(`\nErrors: ${stats.errors.length}`);
    stats.errors.forEach(err => console.log(`  - ${err}`));
  }

  console.log('\n✅ Migration complete!');
  console.log('\nNext steps:');
  console.log('1. Review changes: git diff');
  console.log('2. Test affected pages visually');
  console.log('3. Run build: npm run build');
  console.log('4. Commit: git commit -m "Phase 4.3: Migrate inline buttons to ButtonPrimary"');
}

// Run migration
main();
