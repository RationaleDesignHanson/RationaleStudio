import { test, devices } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('Mobile Optimization Tests', () => {
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
      await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12 dimensions
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await percySnapshot(page, `Mobile - ${name}`);
    });
  }
});

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
