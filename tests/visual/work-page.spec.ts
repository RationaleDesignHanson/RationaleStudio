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
