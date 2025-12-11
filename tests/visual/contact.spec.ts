import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('Contact Page Visual Tests', () => {
  test('contact page full page', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await percySnapshot(page, 'Contact - Full Page');
  });
});
