import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('Work Page Visual Tests', () => {
  test('work page full page', async ({ page }) => {
    await page.goto('/work');
    await page.waitForLoadState('networkidle');
    await percySnapshot(page, 'Work - Full Page');
  });
});
