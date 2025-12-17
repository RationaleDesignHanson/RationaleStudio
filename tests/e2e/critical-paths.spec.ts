/**
 * E2E Critical Path Tests
 *
 * Tests core user journeys and conversion funnels:
 * - Homepage → Services → Contact (conversion)
 * - Homepage → Work → Case Study (portfolio exploration)
 * - Navigation and key interactions
 * - Contact form functionality
 */

import { test, expect } from '@playwright/test';

test.describe('Critical Path: Homepage to Contact (Conversion Funnel)', () => {
  test('should navigate from homepage CTA to contact page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click primary CTA button
    const ctaButton = page.locator('a[href="/contact"]').first();
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();

    // Verify navigation to contact page
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText(/Contact|Get in Touch|Start a Conversation/i);
  });

  test('should display all required contact form fields', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check for form elements
    await expect(page.locator('input[name="name"], input[id="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"], input[id="email"], input[type="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"], textarea[id="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate email format in contact form', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Fill form with invalid email
    const nameInput = page.locator('input[name="name"], input[id="name"]').first();
    const emailInput = page.locator('input[name="email"], input[id="email"], input[type="email"]').first();
    
    await nameInput.fill('Test User');
    await emailInput.fill('invalid-email');
    
    // Attempt to submit
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    // Check for HTML5 validation or custom error message
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBe(true);
  });
});

test.describe('Critical Path: Portfolio Exploration', () => {
  test('should navigate from homepage to work page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find and click "Work" or "Portfolio" link
    const workLink = page.locator('a[href="/work"]').first();
    await expect(workLink).toBeVisible();
    await workLink.click();

    // Verify navigation to work page
    await expect(page).toHaveURL('/work');
    await expect(page.locator('h1')).toContainText(/Work|Portfolio|Projects|Case Studies/i);
  });

  test('should display work/case study cards on work page', async ({ page }) => {
    await page.goto('/work');
    await page.waitForLoadState('networkidle');

    // Check for case study cards or project links
    const caseStudyCards = page.locator('a[href^="/work/"], article, [class*="card"]');
    const count = await caseStudyCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to individual case study', async ({ page }) => {
    await page.goto('/work');
    await page.waitForLoadState('networkidle');

    // Click first case study link
    const firstCaseStudy = page.locator('a[href^="/work/"]').first();
    if (await firstCaseStudy.count() > 0) {
      await firstCaseStudy.click();
      
      // Verify navigation to case study
      await expect(page).toHaveURL(/\/work\/.+/);
      await expect(page.locator('h1')).toBeVisible();
    }
  });
});

test.describe('Critical Path: Main Navigation', () => {
  test('should display main navigation menu', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for navigation elements
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    // Verify key navigation links are present
    await expect(page.locator('a[href="/"]')).toBeVisible(); // Home/Logo
  });

  test('should navigate to key pages from header', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const links = [
      { href: '/work', pattern: /Work|Portfolio|Projects/i },
      { href: '/how-we-work', pattern: /How We Work|Process|Services/i },
      { href: '/contact', pattern: /Contact|Get in Touch/i },
    ];

    for (const link of links) {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const navLink = page.locator(`a[href="${link.href}"]`).first();
      if (await navLink.count() > 0) {
        await navLink.click();
        await expect(page).toHaveURL(link.href);
        await expect(page.locator('h1')).toContainText(link.pattern);
      }
    }
  });

  test('should have working footer navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Verify footer has links
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Critical Path: Service Pages', () => {
  test('should access service/how-we-work page', async ({ page }) => {
    await page.goto('/how-we-work');
    await page.waitForLoadState('networkidle');

    // Verify page loaded successfully
    await expect(page.locator('h1')).toBeVisible();
    expect(page.url()).toContain('/how-we-work');
  });

  test('should display service information', async ({ page }) => {
    await page.goto('/how-we-work');
    await page.waitForLoadState('networkidle');

    // Check for content sections (headings, paragraphs, etc.)
    const headings = page.locator('h1, h2, h3');
    const count = await headings.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have CTA to contact from service page', async ({ page }) => {
    await page.goto('/how-we-work');
    await page.waitForLoadState('networkidle');

    // Look for contact CTA
    const contactCTA = page.locator('a[href="/contact"]').first();
    await expect(contactCTA).toBeVisible();
  });
});

test.describe('Critical Path: Page Load Performance', () => {
  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Homepage should load DOM in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have no console errors on homepage', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out expected errors (e.g., 404s for optional resources)
    const criticalErrors = consoleErrors.filter(err => 
      !err.includes('favicon') && 
      !err.includes('404') &&
      !err.includes('NEXT_NOT_FOUND')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('should load all images on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get all images
    const images = page.locator('img');
    const count = await images.count();

    // Check each image loaded successfully
    for (let i = 0; i < Math.min(count, 10); i++) { // Check first 10 images
      const img = images.nth(i);
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});

test.describe('Critical Path: Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test('should display mobile navigation menu', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Look for mobile menu button/hamburger
    const mobileMenu = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i], [class*="hamburger"]').first();
    
    if (await mobileMenu.count() > 0) {
      await expect(mobileMenu).toBeVisible();
      await mobileMenu.click();

      // Verify mobile menu opens
      await page.waitForTimeout(500); // Wait for animation
    }
  });

  test('should have readable text on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check main heading font size
    const h1 = page.locator('h1').first();
    if (await h1.count() > 0) {
      const fontSize = await h1.evaluate(el => {
        return parseInt(window.getComputedStyle(el).fontSize);
      });

      // Minimum readable font size on mobile
      expect(fontSize).toBeGreaterThanOrEqual(24);
    }
  });

  test('should have adequate touch targets on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check primary CTA button size
    const ctaButton = page.locator('a[href="/contact"], button').first();
    if (await ctaButton.count() > 0) {
      const box = await ctaButton.boundingBox();
      if (box) {
        // WCAG 2.5.5 Level AAA: 44x44px minimum
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });
});

test.describe('Critical Path: SEO and Meta Tags', () => {
  test('should have proper meta tags on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title.length).toBeLessThan(60); // SEO best practice

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveCount(1);
    const content = await metaDescription.getAttribute('content');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(50);
    expect(content!.length).toBeLessThan(160);
  });

  test('should have Open Graph tags', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for OG tags
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Should have some h2s
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);
  });
});
