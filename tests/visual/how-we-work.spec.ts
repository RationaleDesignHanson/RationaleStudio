import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('How We Work Page Visual Tests', () => {
  test('how we work full page', async ({ page }) => {
    await page.goto('/how-we-work');
    await page.waitForLoadState('networkidle');
    await percySnapshot(page, 'How We Work - Full Page');
  });
});
