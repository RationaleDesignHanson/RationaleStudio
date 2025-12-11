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
