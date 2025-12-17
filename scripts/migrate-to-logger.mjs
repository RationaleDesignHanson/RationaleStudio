#!/usr/bin/env node

/**
 * Automated Console to Logger Migration Script - FIXED VERSION
 *
 * Replaces console.log/error/warn/info with logger equivalents
 * Automatically adds logger import where needed
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

let filesModified = 0;
let replacementsMade = 0;

// Files to migrate
const files = glob.sync('**/*.{ts,tsx}', {
  ignore: [
    'node_modules/**',
    '.next/**',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    'lib/utils/logger.ts',
    'scripts/**',
  ],
});

console.log(`Found ${files.length} files to process\n`);

for (const file of files) {
  try {
    const content = readFileSync(file, 'utf-8');
    let modified = content;
    let fileChanged = false;
    let replacementsInFile = 0;

    // Check if file has console statements
    const hasConsole = /console\.(log|error|warn|info)/.test(content);
    if (!hasConsole) continue;

    // Check if logger is already imported
    const hasLoggerImport = /import.*\{[^}]*logger[^}]*\}.*from.*['"]@\/lib\/utils\/logger['"]/.test(content);

    // Replace console.log/error/warn/info with logger equivalents
    const consolePattern = /console\.(log|error|warn|info)\(/g;
    
    modified = modified.replace(consolePattern, (match, method) => {
      replacementsInFile++;
      return `logger.${method}(`;
    });

    if (replacementsInFile > 0) {
      fileChanged = true;
      replacementsMade += replacementsInFile;

      // Add logger import if not present
      if (!hasLoggerImport) {
        // Strategy: Add import after the last import line
        const lines = modified.split('\n');
        let lastImportIndex = -1;
        
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].trim().startsWith('import ')) {
            lastImportIndex = i;
          }
        }

        if (lastImportIndex >= 0) {
          // Insert after the last import
          lines.splice(lastImportIndex + 1, 0, "import { logger } from '@/lib/utils/logger';");
          modified = lines.join('\n');
        } else {
          // No imports found, add after 'use client' directive if present
          if (lines[0] && (lines[0].includes("'use client'") || lines[0].includes('"use client"'))) {
            lines.splice(1, 0, '', "import { logger } from '@/lib/utils/logger';");
            modified = lines.join('\n');
          } else {
            // Add at the very top
            modified = "import { logger } from '@/lib/utils/logger';\n\n" + modified;
          }
        }
      }

      if (VERBOSE) {
        console.log(`✓ ${file}: ${replacementsInFile} replacements`);
      }

      if (!DRY_RUN) {
        writeFileSync(file, modified, 'utf-8');
      }

      filesModified++;
    }
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`Migration ${DRY_RUN ? 'Preview' : 'Complete'}:`);
console.log(`  Files modified: ${filesModified}`);
console.log(`  Replacements made: ${replacementsMade}`);
console.log(`${'='.repeat(60)}\n`);

if (DRY_RUN) {
  console.log('This was a dry run. Use without --dry-run to apply changes.');
}
