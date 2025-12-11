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
    const velocityProof = page.locator('text=How We Ship Faster').first();
    await velocityProof.scrollIntoViewIfNeeded();
    await percySnapshot(page, 'Homepage - Velocity Proof');
  });

  test('homepage fit filter', async ({ page }) => {
    const fitFilter = page.locator('text=What Makes a Great Fit');
    await fitFilter.scrollIntoViewIfNeeded();
    await percySnapshot(page, 'Homepage - Fit Filter');
  });
});
