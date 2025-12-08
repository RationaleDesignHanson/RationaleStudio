#!/usr/bin/env node

/**
 * Performance Optimization Audit
 *
 * Comprehensive audit of build output, bundle sizes, and performance metrics
 * Run before deployment to ensure optimal production performance
 */

import { readdir, stat, readFile } from 'fs/promises';
import { join, relative } from 'path';
import { execSync } from 'child_process';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

const results = {
  passed: [],
  warnings: [],
  failed: []
};

function pass(message) {
  results.passed.push(message);
  console.log(`${GREEN}✓${RESET} ${message}`);
}

function warn(message) {
  results.warnings.push(message);
  console.log(`${YELLOW}⚠${RESET} ${message}`);
}

function fail(message) {
  results.failed.push(message);
  console.log(`${RED}✗${RESET} ${message}`);
}

function info(message) {
  console.log(`${BLUE}ℹ${RESET} ${message}`);
}

console.log(`${BOLD}\n🔍 Performance Optimization Audit\n${RESET}`);

// Check 1: Build Output Size
console.log(`${BOLD}Bundle Size Analysis:${RESET}`);

async function analyzeBundleSize() {
  try {
    const nextDir = '.next';
    const staticDir = join(nextDir, 'static');

    // Check if .next directory exists
    try {
      await stat(nextDir);
    } catch {
      warn('.next directory not found. Run `npm run build` first');
      return;
    }

    // Get total size of .next directory
    const getTotalSize = async (dir) => {
      let totalSize = 0;
      const files = await readdir(dir, { withFileTypes: true });

      for (const file of files) {
        const fullPath = join(dir, file.name);
        if (file.isDirectory()) {
          totalSize += await getTotalSize(fullPath);
        } else {
          const stats = await stat(fullPath);
          totalSize += stats.size;
        }
      }

      return totalSize;
    };

    const totalSize = await getTotalSize(nextDir);
    const sizeMB = (totalSize / 1024 / 1024).toFixed(2);

    info(`Total build size: ${sizeMB} MB`);

    if (totalSize < 50 * 1024 * 1024) {
      pass(`Build size (${sizeMB} MB) is under 50 MB`);
    } else if (totalSize < 100 * 1024 * 1024) {
      warn(`Build size (${sizeMB} MB) is between 50-100 MB`);
    } else {
      fail(`Build size (${sizeMB} MB) exceeds 100 MB`);
    }

    // Check JavaScript bundle sizes
    try {
      const chunksDir = join(staticDir, 'chunks');
      const chunks = await readdir(chunksDir);
      let largeChunks = 0;

      for (const chunk of chunks) {
        const chunkPath = join(chunksDir, chunk);
        const stats = await stat(chunkPath);
        const sizeKB = (stats.size / 1024).toFixed(2);

        if (stats.size > 500 * 1024) {
          warn(`Large chunk: ${chunk} (${sizeKB} KB)`);
          largeChunks++;
        }
      }

      if (largeChunks === 0) {
        pass('No JavaScript chunks exceed 500 KB');
      } else {
        warn(`${largeChunks} JavaScript chunks exceed 500 KB`);
      }
    } catch (error) {
      info('Could not analyze chunk sizes');
    }
  } catch (error) {
    fail(`Bundle analysis failed: ${error.message}`);
  }
}

await analyzeBundleSize();

// Check 2: TypeScript Compilation
console.log(`\n${BOLD}TypeScript Validation:${RESET}`);

try {
  execSync('npx tsc --noEmit', { stdio: 'pipe' });
  pass('TypeScript compilation successful (0 errors)');
} catch (error) {
  fail('TypeScript compilation has errors');
  const output = error.stdout?.toString() || error.stderr?.toString();
  if (output) {
    console.log(output.split('\n').slice(0, 10).join('\n'));
    info('... (showing first 10 errors)');
  }
}

// Check 3: Dependencies Audit
console.log(`\n${BOLD}Dependencies Security:${RESET}`);

try {
  const auditOutput = execSync('npm audit --json', { encoding: 'utf-8' });
  const audit = JSON.parse(auditOutput);

  if (audit.metadata.vulnerabilities.total === 0) {
    pass('No security vulnerabilities found');
  } else {
    const { low, moderate, high, critical } = audit.metadata.vulnerabilities;

    if (critical > 0) {
      fail(`${critical} critical vulnerabilities found`);
    }
    if (high > 0) {
      fail(`${high} high vulnerabilities found`);
    }
    if (moderate > 0) {
      warn(`${moderate} moderate vulnerabilities found`);
    }
    if (low > 0) {
      info(`${low} low vulnerabilities found`);
    }
  }
} catch (error) {
  warn('Could not run npm audit');
}

// Check 4: Environment Variables
console.log(`\n${BOLD}Environment Configuration:${RESET}`);

try {
  const envExample = await readFile('.env.local.example', 'utf-8');
  const requiredVars = envExample
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#') && line.includes('='))
    .map(line => line.split('=')[0]);

  const criticalVars = requiredVars.filter(v =>
    v.includes('FIREBASE') || v.includes('PUBLIC')
  );

  info(`Found ${requiredVars.length} environment variables in .env.local.example`);
  info(`${criticalVars.length} are critical for production`);

  pass('Environment variables documented in .env.local.example');
} catch (error) {
  warn('.env.local.example not found or unreadable');
}

// Check 5: Image Optimization
console.log(`\n${BOLD}Asset Optimization:${RESET}`);

async function checkImages() {
  try {
    const publicDir = 'public';
    const findLargeImages = async (dir, results = []) => {
      const files = await readdir(dir, { withFileTypes: true });

      for (const file of files) {
        const fullPath = join(dir, file.name);

        if (file.isDirectory() && !file.name.startsWith('.')) {
          await findLargeImages(fullPath, results);
        } else if (file.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)) {
          const stats = await stat(fullPath);
          if (stats.size > 500 * 1024) {
            results.push({
              path: relative('.', fullPath),
              size: (stats.size / 1024).toFixed(2)
            });
          }
        }
      }

      return results;
    };

    const largeImages = await findLargeImages(publicDir);

    if (largeImages.length === 0) {
      pass('No images exceed 500 KB');
    } else {
      warn(`${largeImages.length} images exceed 500 KB:`);
      largeImages.forEach(img => {
        console.log(`  - ${img.path} (${img.size} KB)`);
      });
    }
  } catch (error) {
    info('Could not analyze images');
  }
}

await checkImages();

// Check 6: Build Configuration
console.log(`\n${BOLD}Build Configuration:${RESET}`);

try {
  const nextConfig = await readFile('next.config.mjs', 'utf-8');

  if (nextConfig.includes('compress: true')) {
    pass('Compression enabled in next.config.mjs');
  } else {
    warn('Compression not explicitly enabled');
  }

  if (nextConfig.includes('reactStrictMode: true')) {
    pass('React Strict Mode enabled');
  } else {
    warn('React Strict Mode not enabled');
  }

  if (nextConfig.includes('poweredByHeader: false')) {
    pass('X-Powered-By header disabled');
  } else {
    info('Consider disabling X-Powered-By header for security');
  }
} catch (error) {
  warn('Could not read next.config.mjs');
}

// Check 7: Netlify Configuration
console.log(`\n${BOLD}Netlify Configuration:${RESET}`);

try {
  const netlifyToml = await readFile('netlify.toml', 'utf-8');

  if (netlifyToml.includes('@netlify/plugin-nextjs')) {
    pass('Netlify Next.js plugin configured');
  } else {
    fail('Netlify Next.js plugin missing from netlify.toml');
  }

  if (netlifyToml.includes('NODE_VERSION')) {
    pass('Node.js version specified in netlify.toml');
  } else {
    warn('Node.js version not specified');
  }

  if (netlifyToml.includes('Cache-Control')) {
    pass('Cache headers configured for static assets');
  } else {
    warn('Cache headers not configured');
  }
} catch (error) {
  fail('netlify.toml not found');
}

// Summary
console.log(`\n${BOLD}═══════════════════════════════════════${RESET}`);
console.log(`${BOLD}Audit Summary:${RESET}`);
console.log(`${GREEN}Passed:${RESET} ${results.passed.length}`);
console.log(`${YELLOW}Warnings:${RESET} ${results.warnings.length}`);
console.log(`${RED}Failed:${RESET} ${results.failed.length}`);

// Recommendations
if (results.warnings.length > 0 || results.failed.length > 0) {
  console.log(`\n${BOLD}Recommendations:${RESET}`);

  if (results.failed.length > 0) {
    console.log(`\n${RED}Critical Issues (must fix before deploy):${RESET}`);
    results.failed.forEach(issue => console.log(`  • ${issue}`));
  }

  if (results.warnings.length > 0) {
    console.log(`\n${YELLOW}Warnings (should address):${RESET}`);
    results.warnings.forEach(issue => console.log(`  • ${issue}`));
  }

  console.log(`\n${BOLD}Next Steps:${RESET}`);
  console.log('1. Address critical issues above');
  console.log('2. Run `npm run build` to verify fixes');
  console.log('3. Re-run this audit before deploying');
  console.log('4. Review DEPLOYMENT.md for production checklist');
}

if (results.failed.length === 0) {
  console.log(`\n${GREEN}${BOLD}✓ Ready for deployment${RESET}`);
  console.log(`${GREEN}All critical checks passed${RESET}\n`);
  process.exit(0);
} else {
  console.log(`\n${RED}${BOLD}✗ Not ready for deployment${RESET}`);
  console.log(`${RED}Fix critical issues before deploying${RESET}\n`);
  process.exit(1);
}
