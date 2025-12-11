# Visual Regression Testing Strategy

**Created:** December 10, 2025
**Status:** 📋 Implementation Plan
**Phase:** 4 - Design System Consolidation Follow-up

---

## Executive Summary

This document outlines a visual regression testing strategy for the Rationale website following Phase 4 design system consolidation. The goal is to prevent visual regressions when making component updates, ensure consistent rendering across browsers/devices, and validate the mobile optimization work.

### Key Objectives

1. **Prevent Regressions** - Catch visual breaks before they reach production
2. **Validate Migrations** - Verify BaseCard and Badge migrations render identically
3. **Cross-Browser Testing** - Ensure consistency across Chrome, Firefox, Safari
4. **Mobile Verification** - Confirm mobile optimizations work as intended
5. **Component Library** - Document visual states for all components

---

## Recommended Tool: Playwright + Percy

### Why This Stack?

**Playwright:**
- Modern, fast browser automation
- Built-in screenshot capabilities
- Multi-browser support (Chromium, Firefox, WebKit)
- Network interception for consistent testing
- First-class TypeScript support

**Percy (by BrowserStack):**
- Visual diff engine
- Baseline management
- Responsive screenshot comparison
- CI/CD integration
- Free tier: 5,000 snapshots/month

### Alternative Considered: Chromatic

- More expensive ($149/mo for private repos)
- Better for Storybook-based workflows
- Percy offers better value for our use case

---

## Implementation Plan

### Phase 1: Setup (2-3 hours)

#### 1.1 Install Dependencies

```bash
npm install --save-dev @playwright/test
npm install --save-dev @percy/cli @percy/playwright
```

#### 1.2 Create Playwright Config

**File:** `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

#### 1.3 Percy Configuration

**File:** `.percy.yml`

```yaml
version: 2
snapshot:
  widths:
    - 375   # Mobile
    - 768   # Tablet
    - 1280  # Desktop
  min-height: 1024
  enable-javascript: true
  percy-css: |
    /* Hide dynamic elements */
    [data-dynamic="true"] { visibility: hidden !important; }
    .animate-pulse { animation: none !important; }
```

---

### Phase 2: Critical Path Tests (4-5 hours)

Create baseline tests for high-traffic pages.

#### 2.1 Homepage Visual Test

**File:** `tests/visual/homepage.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('Homepage Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for fonts to load
    await page.waitForLoadState('networkidle');
  });

  test('homepage hero section', async ({ page }) => {
    await percySnapshot(page, 'Homepage - Hero');
  });

  test('homepage current focus cards', async ({ page }) => {
    const currentFocus = page.locator('#current-focus');
    await currentFocus.scrollIntoViewIfNeeded();
    await percySnapshot(page, 'Homepage - Current Focus');
  });

  test('homepage three paths section', async ({ page }) => {
    const threePaths = page.locator('text=Three Ways to Work Together');
    await threePaths.scrollIntoViewIfNeeded();
    await percySnapshot(page, 'Homepage - Three Paths');
  });

  test('homepage velocity proof', async ({ page }) => {
    const velocityProof = page.locator('text=How We Ship Faster');
    await velocityProof.scrollIntoViewIfNeeded();
    await percySnapshot(page, 'Homepage - Velocity Proof');
  });

  test('homepage fit filter', async ({ page }) => {
    const fitFilter = page.locator('text=What Makes a Great Fit');
    await fitFilter.scrollIntoViewIfNeeded();
    await percySnapshot(page, 'Homepage - Fit Filter');
  });
});
```

#### 2.2 Work Page Visual Test

**File:** `tests/visual/work-page.spec.ts`

```typescript
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('Work Page Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/work');
    await page.waitForLoadState('networkidle');
  });

  test('work page hero', async ({ page }) => {
    await percySnapshot(page, 'Work - Hero');
  });

  test('work page featured projects', async ({ page }) => {
    const featured = page.locator('text=Featured Projects');
    await featured.scrollIntoViewIfNeeded();
    await percySnapshot(page, 'Work - Featured Projects');
  });

  test('work page more ventures', async ({ page }) => {
    const ventures = page.locator('text=More Ventures');
    await ventures.scrollIntoViewIfNeeded();
    await percySnapshot(page, 'Work - More Ventures');
  });

  test('work page partnership work', async ({ page }) => {
    const partnerships = page.locator('text=Partnership Work');
    await partnerships.scrollIntoViewIfNeeded();
    await percySnapshot(page, 'Work - Partnership Work');
  });
});
```

#### 2.3 Component Library Test

**File:** `tests/visual/components.spec.ts`

```typescript
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('Component Visual Tests', () => {
  test('basecard variants', async ({ page }) => {
    // Assumes you create a component gallery page
    await page.goto('/component-gallery#basecard');
    await page.waitForLoadState('networkidle');
    await percySnapshot(page, 'Components - BaseCard Variants');
  });

  test('badge variants', async ({ page }) => {
    await page.goto('/component-gallery#badge');
    await page.waitForLoadState('networkidle');
    await percySnapshot(page, 'Components - Badge Variants');
  });

  test('button hierarchy', async ({ page }) => {
    await page.goto('/component-gallery#buttons');
    await page.waitForLoadState('networkidle');
    await percySnapshot(page, 'Components - Button Hierarchy');
  });
});
```

---

### Phase 3: Mobile Optimization Validation (2-3 hours)

Verify mobile optimizations work correctly.

#### 3.1 Mobile Snapshot Test

**File:** `tests/visual/mobile-optimization.spec.ts`

```typescript
import { test, devices } from '@playwright/test';
import percySnapshot from '@percy/playwright';

const mobileDevice = devices['iPhone 12'];

test.describe('Mobile Optimization Tests', () => {
  test.use(mobileDevice);

  const pages = [
    { path: '/', name: 'Homepage' },
    { path: '/about', name: 'About' },
    { path: '/work', name: 'Work' },
    { path: '/how-we-work', name: 'How We Work' },
    { path: '/contact', name: 'Contact' },
    { path: '/partnerships', name: 'Partnerships' },
    { path: '/capabilities', name: 'Capabilities' },
  ];

  for (const { path, name } of pages) {
    test(`${name} mobile layout`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await percySnapshot(page, `Mobile - ${name}`);
    });
  }
});
```

#### 3.2 Responsive Breakpoint Test

```typescript
test.describe('Responsive Breakpoints', () => {
  const breakpoints = [
    { width: 375, name: 'Mobile' },
    { width: 640, name: 'SM' },
    { width: 768, name: 'MD' },
    { width: 1024, name: 'LG' },
    { width: 1280, name: 'XL' },
  ];

  for (const { width, name } of breakpoints) {
    test(`homepage at ${name} breakpoint`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await percySnapshot(page, `Homepage - ${name} (${width}px)`);
    });
  }
});
```

---

### Phase 4: Badge Wrapping Test (1 hour)

Specific test for Current Focus badge issue.

**File:** `tests/visual/badge-wrapping.spec.ts`

```typescript
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('Badge Wrapping Tests', () => {
  test('current focus badges at narrow widths', async ({ page }) => {
    const widths = [320, 360, 375, 390, 414];

    for (const width of widths) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');

      const currentFocus = page.locator('#current-focus');
      await currentFocus.scrollIntoViewIfNeeded();
      await page.waitForLoadState('networkidle');

      await percySnapshot(page, `Badge Wrapping - ${width}px`);
    }
  });

  test('pipeline badge with long text', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');

    const pipeline = page.locator('text=Pipeline');
    await pipeline.scrollIntoViewIfNeeded();
    await percySnapshot(page, 'Badge Wrapping - Pipeline Card');
  });
});
```

---

## Test Execution Commands

### Local Development

```bash
# Run all visual tests
npx playwright test tests/visual

# Run specific test file
npx playwright test tests/visual/homepage.spec.ts

# Run with Percy
export PERCY_TOKEN=your_percy_token
npx percy exec -- npx playwright test tests/visual

# Show test report
npx playwright show-report
```

### CI/CD Integration

**GitHub Actions:** `.github/workflows/visual-regression.yml`

```yaml
name: Visual Regression Tests

on:
  pull_request:
    branches: [main]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests with Percy
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
        run: npx percy exec -- npx playwright test tests/visual

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Coverage Matrix

### Pages to Test (11 total)

| Page | Desktop | Mobile | Tablet | Priority |
|------|---------|--------|--------|----------|
| Homepage | ✅ | ✅ | ✅ | Critical |
| Work | ✅ | ✅ | ✅ | Critical |
| How We Work | ✅ | ✅ | ⚠️ | High |
| Contact | ✅ | ✅ | ⚠️ | High |
| About | ✅ | ✅ | ⚠️ | Medium |
| Partnerships | ✅ | ✅ | - | Medium |
| Capabilities | ✅ | ✅ | - | Medium |
| Zero Product | ✅ | ✅ | - | Medium |
| Heirloom Product | ✅ | ✅ | - | Medium |
| Overview | ✅ | ✅ | - | Low |
| Thinking | ✅ | ✅ | - | Low |

### Components to Test (8 variants)

| Component | States | Variants | Priority |
|-----------|--------|----------|----------|
| BaseCard | 5 | default, featured, subtle, interactive, cta | Critical |
| Badge | 5 | status, category, priority, checkpoint, project | Critical |
| VentureCard | 2 | default, compact | High |
| InsightCard | 2 | default, list | High |
| KitCard | 2 | default, compact | High |
| FeaturedWorkCard | 1 | default | High |
| ButtonHierarchy | 3 | primary, secondary, tertiary | High |
| CaseStudyTeaser | 2 | default, grid | Medium |

---

## Success Metrics

### Test Coverage Goals

- **90%+ page coverage** (10 of 11 pages tested)
- **100% component variant coverage** (all 8 card variants)
- **3 breakpoint coverage** (mobile, tablet, desktop)
- **3 browser coverage** (Chrome, Firefox, Safari)

### Performance Goals

- **Test execution time:** < 5 minutes for full suite
- **Parallel execution:** 4-6 workers in CI
- **Snapshot comparison:** < 10 seconds per snapshot

### Quality Gates

- **0 visual regressions** to merge PR
- **Manual review** for intentional visual changes
- **Automated baseline updates** for approved changes

---

## Maintenance Plan

### Weekly Tasks

- Review Percy dashboard for new regressions
- Update baselines after approved visual changes
- Monitor test execution time

### Monthly Tasks

- Audit test coverage for new pages/components
- Review and update snapshot widths if needed
- Optimize slow-running tests

### Quarterly Tasks

- Evaluate Percy vs. alternatives (Chromatic, BackstopJS)
- Review and optimize CI/CD pipeline
- Update visual testing strategy based on team feedback

---

## Cost Estimate

### Percy Pricing

- **Free Tier:** 5,000 snapshots/month
- **Startup Plan:** $299/mo for 25,000 snapshots/month

### Current Snapshot Count

**Estimated Monthly Usage:**
- 11 pages × 3 widths × 3 browsers = 99 snapshots per run
- 8 components × 3 widths = 24 snapshots per run
- **Total:** ~125 snapshots per run

**Monthly Projections:**
- 20 PRs/month × 125 snapshots = 2,500 snapshots/month
- **Fits within free tier** (5,000 snapshots/month)

### Alternatives if Budget Constrained

1. **Playwright only** (no Percy)
   - Free screenshot capture
   - Manual baseline comparison
   - Lower maintenance overhead

2. **Chromatic** ($149/mo)
   - Better Storybook integration
   - More expensive but includes component library

3. **BackstopJS** (free, self-hosted)
   - No cloud dependency
   - Requires local baseline management

---

## Next Steps (Prioritized)

### Immediate (This Week)

1. ✅ Create visual regression strategy document (this file)
2. ✅ Install Playwright and Percy dependencies
3. ✅ Create basic homepage visual test
4. ✅ Generate baseline snapshots
5. ✅ Document test patterns for team

### Short Term (Next 2 Weeks)

6. Add work page, how-we-work, contact page tests
7. Create badge wrapping specific test
8. Set up GitHub Actions CI integration
9. Create component gallery page for testing
10. Train team on visual testing workflow

### Long Term (Next Month)

11. Achieve 90%+ page coverage
12. Add cross-browser testing
13. Set up automated baseline updates
14. Create visual regression dashboard
15. Document all component states

---

## Resources

### Documentation

- **Playwright Docs:** https://playwright.dev/
- **Percy Docs:** https://docs.percy.io/
- **Visual Testing Guide:** https://martinfowler.com/articles/visual-testing.html

### Tools

- **Percy Dashboard:** https://percy.io/
- **Playwright Trace Viewer:** https://playwright.dev/docs/trace-viewer
- **HTML Reporter:** Built-in with Playwright

### Team Training

- **Playwright Tutorial:** 1-hour onboarding session
- **Percy Workflow:** 30-minute demo
- **Visual Regression Best Practices:** Team workshop

---

**Document Prepared By:** Claude Code
**Date:** December 10, 2025
**Status:** 📋 Ready for Implementation
**Next Review:** January 2026 (post-implementation)
