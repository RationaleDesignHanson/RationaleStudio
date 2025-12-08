#!/usr/bin/env node

/**
 * Comprehensive Link Audit Script
 *
 * Scans all .tsx and .ts files for internal links and validates them
 * against actual file system routes
 */

import { promises as fs } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Color output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Extract links from file content
function extractLinks(content, filePath) {
  const links = [];

  // Match href="/..." and href='/...'
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;

  while ((match = hrefRegex.exec(content)) !== null) {
    const url = match[1];

    // Only include internal links (starting with /)
    if (url.startsWith('/') && !url.startsWith('//')) {
      // Extract just the path (remove query params and hash)
      const path = url.split('?')[0].split('#')[0];
      if (path !== '/' && path !== '#') {
        links.push({
          url: path,
          line: content.substring(0, match.index).split('\n').length,
          file: filePath
        });
      }
    }
  }

  return links;
}

// Check if route exists in filesystem
async function routeExists(routePath) {
  const appDir = join(projectRoot, 'app');
  const publicDir = join(projectRoot, 'public');

  // Remove leading slash
  const cleanPath = routePath.startsWith('/') ? routePath.slice(1) : routePath;

  // Possible file locations for this route
  const possiblePaths = [
    join(appDir, cleanPath, 'page.tsx'),
    join(appDir, cleanPath, 'page.ts'),
    join(appDir, `(public)/${cleanPath}/page.tsx`),
    join(appDir, `(protected)/${cleanPath}/page.tsx`),
    // Check for static files in public directory
    join(publicDir, cleanPath),
  ];

  for (const path of possiblePaths) {
    try {
      await fs.access(path);
      return true;
    } catch (e) {
      // File doesn't exist, try next
    }
  }

  return false;
}

async function main() {
  log('blue', '\n🔍 Comprehensive Link Audit\n');
  log('gray', '═'.repeat(70));

  // Find all .tsx and .ts files
  log('gray', '\n📂 Scanning files...');
  const files = await glob('**/*.{tsx,ts}', {
    cwd: projectRoot,
    ignore: ['node_modules/**', '.next/**', 'dist/**', 'build/**'],
    absolute: true
  });

  log('green', `Found ${files.length} files to scan\n`);

  // Extract all links
  const allLinks = [];
  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');
    const relativePath = relative(projectRoot, file);
    const links = extractLinks(content, relativePath);
    allLinks.push(...links);
  }

  log('blue', `📊 Found ${allLinks.length} internal links\n`);

  // Deduplicate links
  const uniqueLinks = new Map();
  for (const link of allLinks) {
    if (!uniqueLinks.has(link.url)) {
      uniqueLinks.set(link.url, []);
    }
    uniqueLinks.get(link.url).push(link);
  }

  log('gray', `🔗 Checking ${uniqueLinks.size} unique routes...\n`);

  // Check each unique link
  const brokenLinks = new Map();
  const validLinks = [];

  for (const [url, occurrences] of uniqueLinks.entries()) {
    const exists = await routeExists(url);

    if (!exists) {
      brokenLinks.set(url, occurrences);
    } else {
      validLinks.push(url);
    }
  }

  // Report results
  log('gray', '═'.repeat(70));
  log('green', `\n✅ Valid Links: ${validLinks.length}`);
  log('red', `❌ Broken Links: ${brokenLinks.size}\n`);

  if (brokenLinks.size > 0) {
    log('red', '❌ BROKEN LINKS FOUND:\n');

    const brokenArray = Array.from(brokenLinks.entries());
    brokenArray.sort((a, b) => b[1].length - a[1].length); // Sort by frequency

    for (const [url, occurrences] of brokenArray) {
      log('red', `  ${url}`);
      log('gray', `  → Used ${occurrences.length} time(s) in:`);

      // Group by file
      const byFile = new Map();
      for (const occ of occurrences) {
        if (!byFile.has(occ.file)) {
          byFile.set(occ.file, []);
        }
        byFile.get(occ.file).push(occ.line);
      }

      for (const [file, lines] of byFile.entries()) {
        log('gray', `     ${file}:${lines.join(', ')}`);
      }
      log('gray', '');
    }
  }

  // Save report
  const reportPath = join(projectRoot, 'LINK_AUDIT_REPORT.json');
  const report = {
    timestamp: new Date().toISOString(),
    totalLinks: allLinks.length,
    uniqueLinks: uniqueLinks.size,
    validLinks: validLinks.length,
    brokenLinks: brokenLinks.size,
    broken: Array.from(brokenLinks.entries()).map(([url, occurrences]) => ({
      url,
      count: occurrences.length,
      locations: occurrences.map(o => ({ file: o.file, line: o.line }))
    }))
  };

  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  log('green', `\n💾 Report saved to: ${relative(projectRoot, reportPath)}\n`);

  log('gray', '═'.repeat(70));

  if (brokenLinks.size > 0) {
    process.exit(1);
  }
}

main().catch(error => {
  log('red', `\n❌ Error: ${error.message}\n`);
  process.exit(1);
});
