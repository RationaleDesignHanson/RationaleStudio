#!/usr/bin/env node
/**
 * Terminal Gold Migration Script
 *
 * Systematically replaces hardcoded #FFD700 with terminal-gold design tokens
 * across the entire codebase.
 *
 * Phase 4.3: Design System - Terminal Gold Token Migration
 *
 * Usage:
 *   node scripts/migrate-terminal-gold.js --dry-run  # Preview changes
 *   node scripts/migrate-terminal-gold.js            # Apply changes
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Configuration
const DRY_RUN = process.argv.includes('--dry-run');
const TARGET_COLOR = '#FFD700';
const TARGET_COLOR_LOWER = TARGET_COLOR.toLowerCase();

// Directories to exclude
const EXCLUDE_DIRS = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  '_archive',
  'public/zero/originalprototype', // Legacy prototype code
];

// File patterns to process
const FILE_PATTERNS = [
  'app/**/*.{tsx,ts,jsx,js}',
  'components/**/*.{tsx,ts,jsx,js}',
  'lib/**/*.{tsx,ts,jsx,js}',
];

// Replacement patterns
const REPLACEMENTS = [
  // Tailwind classes
  { pattern: /className="([^"]*)\btext-\[#FFD700\]([^"]*)"/gi, replace: 'className="$1text-terminal-gold$2"' },
  { pattern: /className="([^"]*)\bbg-\[#FFD700\]([^"]*)"/gi, replace: 'className="$1bg-terminal-gold$2"' },
  { pattern: /className="([^"]*)\bborder-\[#FFD700\]([^"]*)"/gi, replace: 'className="$1border-terminal-gold$2"' },
  { pattern: /className="([^"]*)\bshadow-\[0_0_[0-9]+px_#FFD700\]([^"]*)"/gi, replace: (match, before, after) => {
    const shadowMatch = match.match(/shadow-\[0_0_([0-9]+)px_#FFD700\]/i);
    if (shadowMatch) {
      const size = shadowMatch[1];
      return `className="${before}shadow-[0_0_${size}px_rgb(255_215_0_/_0.5)]${after}"`;
    }
    return match;
  }},

  // Template literals in className
  { pattern: /className={`([^`]*)\btext-\[#FFD700\]([^`]*)`}/gi, replace: 'className={`$1text-terminal-gold$2`}' },
  { pattern: /className={`([^`]*)\bbg-\[#FFD700\]([^`]*)`}/gi, replace: 'className={`$1bg-terminal-gold$2`}' },
  { pattern: /className={`([^`]*)\bborder-\[#FFD700\]([^`]*)`}/gi, replace: 'className={`$1border-terminal-gold$2`}' },

  // Inline styles - color property
  { pattern: /style={{([^}]*)\bcolor:\s*['"]#FFD700['"]([^}]*)}}/gi, replace: 'className="text-terminal-gold" style={{$1$2}}' },
  { pattern: /style={{([^}]*)\bbackgroundColor:\s*['"]#FFD700['"]([^}]*)}}/gi, replace: 'className="bg-terminal-gold" style={{$1$2}}' },
  { pattern: /style={{([^}]*)\bborderColor:\s*['"]#FFD700['"]([^}]*)}}/gi, replace: 'className="border-terminal-gold" style={{$1$2}}' },

  // CSS/Tailwind config (keep as-is, these are token definitions)
  // SVG fill/stroke attributes
  { pattern: /fill="(#FFD700)"/gi, replace: 'fill="rgb(255 215 0)"' },
  { pattern: /stroke="(#FFD700)"/gi, replace: 'stroke="rgb(255 215 0)"' },

  // boxShadow in inline styles
  { pattern: /boxShadow:\s*['"]0\s+0\s+([0-9]+)px\s+#FFD700['"]/gi, replace: 'boxShadow: "0 0 $1px rgba(255, 215, 0, 0.5)"' },
];

// Statistics
const stats = {
  filesProcessed: 0,
  filesModified: 0,
  replacements: 0,
  errors: 0,
};

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    let fileModified = false;

    // Count instances before replacement
    const instancesBefore = (content.match(new RegExp(TARGET_COLOR, 'gi')) || []).length;

    if (instancesBefore === 0) {
      return false; // No changes needed
    }

    // Apply all replacement patterns
    for (const { pattern, replace } of REPLACEMENTS) {
      const before = newContent;
      newContent = newContent.replace(pattern, replace);
      if (newContent !== before) {
        fileModified = true;
      }
    }

    // Count instances after replacement
    const instancesAfter = (newContent.match(new RegExp(TARGET_COLOR, 'gi')) || []).length;
    const replacedCount = instancesBefore - instancesAfter;

    if (fileModified && replacedCount > 0) {
      if (!DRY_RUN) {
        fs.writeFileSync(filePath, newContent, 'utf8');
      }

      console.log(`✓ ${filePath}`);
      console.log(`  Replaced ${replacedCount} instances (${instancesAfter} remaining)`);

      stats.filesModified++;
      stats.replacements += replacedCount;

      return true;
    } else if (instancesBefore > 0) {
      console.log(`⚠ ${filePath}`);
      console.log(`  ${instancesBefore} instances found but not automatically migrated`);
      console.log(`  Manual review required (likely in comments, strings, or complex patterns)`);
    }

    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    stats.errors++;
    return false;
  }
}

/**
 * Main migration function
 */
async function migrateTerminalGold() {
  console.log('🎨 Terminal Gold Token Migration');
  console.log('================================\n');

  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  console.log('Scanning for files with #FFD700...\n');

  // Find all matching files
  const files = await glob(FILE_PATTERNS, {
    ignore: EXCLUDE_DIRS.map(dir => `**/${dir}/**`),
    absolute: true,
  });

  console.log(`Found ${files.length} files to process\n`);

  // Process each file
  for (const file of files) {
    stats.filesProcessed++;
    processFile(file);
  }

  // Print summary
  console.log('\n================================');
  console.log('Migration Summary');
  console.log('================================');
  console.log(`Files Processed: ${stats.filesProcessed}`);
  console.log(`Files Modified: ${stats.filesModified}`);
  console.log(`Total Replacements: ${stats.replacements}`);
  console.log(`Errors: ${stats.errors}`);

  if (DRY_RUN) {
    console.log('\n💡 Run without --dry-run to apply changes');
  } else {
    console.log('\n✅ Migration complete!');
    console.log('\n⚠️  Next steps:');
    console.log('1. Review git diff to verify changes');
    console.log('2. Manually fix any remaining #FFD700 instances flagged above');
    console.log('3. Run npm run build to verify no TypeScript errors');
    console.log('4. Test visual appearance in browser');
    console.log('5. Commit changes: "Phase 4.3: Migrate hardcoded #FFD700 to terminal-gold tokens"');
  }
}

// Run migration
migrateTerminalGold().catch(console.error);
