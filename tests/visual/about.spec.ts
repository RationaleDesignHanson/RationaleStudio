import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('About Page Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
  });

  test('about page hero', async ({ page }) => {
    await percySnapshot(page, 'About - Hero');
  });

  test('about page approach', async ({ page }) => {
    const approach = page.locator('text=Our Approach').first();
    await approach.scrollIntoViewIfNeeded();
    await percySnapshot(page, 'About - Approach');
  });

  test('about page meta context', async ({ page }) => {
    const meta = page.locator('text=Meta Reality Labs').first();
    await meta.scrollIntoViewIfNeeded();
    await percySnapshot(page, 'About - Meta Context');
  });

  test('about page full scroll', async ({ page }) => {
    // Scroll to bottom to capture full page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await percySnapshot(page, 'About - Full Scroll');
  });
});
