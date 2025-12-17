/**
 * Accessibility Tests (WCAG 2.1 AA Compliance)
 *
 * Uses axe-core to scan for accessibility violations
 * Target: WCAG 2.1 Level AA compliance
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility: Homepage', () => {
  test('should not have any automatically detectable accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have accessible landmarks', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for main landmark
    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible();

    // Check for navigation landmark
    const nav = page.locator('nav, [role="navigation"]').first();
    await expect(nav).toBeVisible();

    // Check for footer landmark
    const footer = page.locator('footer, [role="contentinfo"]').first();
    await expect(footer).toBeVisible();
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // All headings should be visible
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('should have alt text for all images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get all img elements
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // Alt attribute should exist (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });
});

test.describe('Accessibility: Work Page', () => {
  test('should not have any automatically detectable accessibility violations', async ({ page }) => {
    await page.goto('/work');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have accessible card links', async ({ page }) => {
    await page.goto('/work');
    await page.waitForLoadState('networkidle');

    // All clickable elements should have accessible names
    const links = page.locator('a[href^="/work/"]');
    const count = await links.count();

    if (count > 0) {
      for (let i = 0; i < Math.min(count, 5); i++) {
        const link = links.nth(i);
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        
        // Link should have either visible text or aria-label
        expect(text || ariaLabel).toBeTruthy();
      }
    }
  });
});

test.describe('Accessibility: Contact Page', () => {
  test('should not have any automatically detectable accessibility violations', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have properly labeled form fields', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check for form inputs
    const inputs = page.locator('input[type="text"], input[type="email"], textarea');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      // Input should have associated label via id, aria-label, or aria-labelledby
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count();
        expect(hasLabel > 0 || ariaLabel || ariaLabelledBy).toBeTruthy();
      } else {
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });

  test('should have accessible submit button', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Try different button selectors
    const submitButton = page.locator('button[type="submit"], button:has-text("Send"), button:has-text("Submit"), input[type="submit"]').first();

    if (await submitButton.count() > 0) {
      await expect(submitButton).toBeVisible();

      // Button should have accessible text
      const text = await submitButton.textContent();
      const ariaLabel = await submitButton.getAttribute('aria-label');
      const value = await submitButton.getAttribute('value');
      expect(text?.trim() || ariaLabel || value).toBeTruthy();
    }
  });
});

test.describe('Accessibility: How We Work Page', () => {
  test('should not have any automatically detectable accessibility violations', async ({ page }) => {
    await page.goto('/how-we-work');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Accessibility: Color Contrast', () => {
  test('should have sufficient color contrast on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .disableRules(['color-contrast']) // We'll check this separately for better reporting
      .analyze();

    // Check contrast specifically
    const contrastResults = await new AxeBuilder({ page })
      .include('body')
      .withRules(['color-contrast'])
      .analyze();

    expect(contrastResults.violations).toEqual([]);
  });
});

test.describe('Accessibility: Keyboard Navigation', () => {
  test('should be able to navigate with keyboard on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Start from the page
    await page.keyboard.press('Tab');

    // Check that focus is visible
    const focusedElement = await page.evaluateHandle(() => document.activeElement);
    const tagName = await focusedElement.evaluate(el => el?.tagName);
    
    // Should have moved focus to an interactive element
    expect(['A', 'BUTTON', 'INPUT']).toContain(tagName);
  });

  test('should have visible focus indicators', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Tab to first interactive element
    await page.keyboard.press('Tab');

    // Get focused element
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Check that focused element has some kind of outline/border
    const outline = await focusedElement.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.outline !== 'none' || 
             styles.outlineWidth !== '0px' ||
             styles.boxShadow !== 'none';
    });

    expect(outline).toBe(true);
  });

  test('should allow skip to main content link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Tab once - should focus skip link if it exists
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');
    const href = await focusedElement.getAttribute('href');

    // If first focused element is a skip link, verify it works
    if (href && (href.startsWith('#main') || href.startsWith('#content'))) {
      await page.keyboard.press('Enter');
      
      // Should jump to main content
      const main = page.locator('main, [role="main"], #main, #content').first();
      await expect(main).toBeFocused();
    }
  });
});

test.describe('Accessibility: Mobile Touch Targets', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should have minimum 44x44px touch targets (WCAG 2.5.5)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check all buttons and links in viewport
    const interactiveElements = page.locator('button, a, input[type="button"], input[type="submit"]');
    const count = await interactiveElements.count();

    const tooSmallTargets: string[] = [];

    for (let i = 0; i < Math.min(count, 10); i++) {
      const element = interactiveElements.nth(i);
      const isVisible = await element.isVisible();

      if (isVisible) {
        const box = await element.boundingBox();
        if (box) {
          const elementText = await element.textContent() || await element.getAttribute('aria-label') || `element-${i}`;
          
          if (box.height < 44 || box.width < 44) {
            tooSmallTargets.push(`${elementText.substring(0, 30)}: ${box.width}x${box.height}px`);
          }
        }
      }
    }

    if (tooSmallTargets.length > 0) {
      console.log('Touch targets below 44x44px:', tooSmallTargets);
    }

    expect(tooSmallTargets).toEqual([]);
  });
});

test.describe('Accessibility: ARIA Attributes', () => {
  test('should not have invalid ARIA attributes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .include('body')
      .analyze();

    // Filter for ARIA-related violations
    const ariaViolations = accessibilityScanResults.violations.filter(v => 
      v.id.includes('aria') || v.id.includes('role')
    );

    expect(ariaViolations).toEqual([]);
  });

  test('should have proper button roles and labels', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // All buttons should have accessible names
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');

      expect(text?.trim() || ariaLabel || ariaLabelledBy).toBeTruthy();
    }
  });
});
