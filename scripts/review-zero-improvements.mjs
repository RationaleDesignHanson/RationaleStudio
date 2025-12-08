#!/usr/bin/env node

/**
 * Automated Review Script for Zero Improvements
 *
 * Validates Phase D completion:
 * - Onboarding flow components
 * - Dashboard implementation
 * - App Store optimization content
 * - TypeScript compilation
 */

import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { execSync } from 'child_process';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

const checks = {
  passed: [],
  failed: [],
  warnings: []
};

function pass(message) {
  checks.passed.push(message);
  console.log(`${GREEN}✓${RESET} ${message}`);
}

function fail(message) {
  checks.failed.push(message);
  console.log(`${RED}✗${RESET} ${message}`);
}

function warn(message) {
  checks.warnings.push(message);
  console.log(`${YELLOW}⚠${RESET} ${message}`);
}

console.log(`${BOLD}\n📋 Zero Improvements Review\n${RESET}`);

// Check 1: Onboarding Components
console.log(`${BOLD}Onboarding System:${RESET}`);
const onboardingFiles = [
  'components/zero/OnboardingFlow.tsx',
  'components/zero/OnboardingProgressTracker.tsx',
  'components/zero/BetaSignupButton.tsx',
  'app/api/zero/beta-signup/route.ts'
];

for (const file of onboardingFiles) {
  if (existsSync(file)) {
    pass(`${file} exists`);
  } else {
    fail(`${file} missing`);
  }
}

// Check 2: Dashboard
console.log(`\n${BOLD}Dashboard:${RESET}`);
const dashboardFile = 'app/clients/zero/dashboard/page.tsx';
if (existsSync(dashboardFile)) {
  pass(`${dashboardFile} exists`);

  try {
    const content = await readFile(dashboardFile, 'utf-8');
    if (content.includes('OnboardingProgressTracker')) {
      pass('Dashboard integrates onboarding tracker');
    } else {
      warn('Dashboard may not integrate onboarding tracker');
    }

    if (content.includes('Usage Stats')) {
      pass('Dashboard includes usage stats section');
    }

    if (content.includes('Beta Program')) {
      pass('Dashboard includes beta program info');
    }
  } catch (error) {
    fail(`Could not read dashboard file: ${error.message}`);
  }
} else {
  fail(`${dashboardFile} missing`);
}

// Check 3: App Store Optimization
console.log(`\n${BOLD}App Store Optimization:${RESET}`);
const asoFiles = [
  'lib/zero/app-store-optimization.ts',
  'app/clients/zero/app-store-guide/page.tsx'
];

for (const file of asoFiles) {
  if (existsSync(file)) {
    pass(`${file} exists`);

    if (file.includes('app-store-optimization.ts')) {
      try {
        const content = await readFile(file, 'utf-8');

        // Check character limits
        if (content.includes('30 characters max')) {
          pass('App name character limit documented');
        }

        if (content.includes('keywords:')) {
          pass('Keywords strategy defined');
        }

        if (content.includes('screenshots:')) {
          pass('Screenshot specifications included');
        }

        if (content.includes('abTestingPlan')) {
          pass('A/B testing plan included');
        }
      } catch (error) {
        fail(`Could not validate ASO content: ${error.message}`);
      }
    }
  } else {
    fail(`${file} missing`);
  }
}

// Check 4: TypeScript Compilation
console.log(`\n${BOLD}TypeScript Compilation:${RESET}`);
try {
  execSync('npx tsc --noEmit', { stdio: 'pipe' });
  pass('TypeScript compilation successful (0 errors)');
} catch (error) {
  fail('TypeScript compilation has errors');
  console.log(error.stdout?.toString() || error.message);
}

// Check 5: Integration Points
console.log(`\n${BOLD}Integration Points:${RESET}`);
try {
  const betaSignupContent = await readFile('components/zero/BetaSignupButton.tsx', 'utf-8');
  if (betaSignupContent.includes('OnboardingFlow')) {
    pass('BetaSignupButton integrates OnboardingFlow');
  } else {
    warn('BetaSignupButton may not integrate OnboardingFlow');
  }

  if (betaSignupContent.includes('/api/zero/beta-signup')) {
    pass('BetaSignupButton calls API endpoint');
  } else {
    warn('BetaSignupButton may not call API endpoint');
  }
} catch (error) {
  warn(`Could not verify integrations: ${error.message}`);
}

// Summary
console.log(`\n${BOLD}═══════════════════════════════════════${RESET}`);
console.log(`${BOLD}Review Summary:${RESET}`);
console.log(`${GREEN}Passed:${RESET} ${checks.passed.length}`);
console.log(`${RED}Failed:${RESET} ${checks.failed.length}`);
console.log(`${YELLOW}Warnings:${RESET} ${checks.warnings.length}`);

if (checks.failed.length === 0) {
  console.log(`\n${GREEN}${BOLD}✓ Phase D: Zero Product Focus - COMPLETE${RESET}`);
  console.log(`${GREEN}All critical components validated successfully${RESET}\n`);
  process.exit(0);
} else {
  console.log(`\n${RED}${BOLD}✗ Phase D: Zero Product Focus - ISSUES FOUND${RESET}`);
  console.log(`${RED}Please address failed checks before proceeding${RESET}\n`);
  process.exit(1);
}
