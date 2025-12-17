# Testing Guide

**Comprehensive testing strategy for the Rationale Studio website**

**Version:** 2.0.0
**Last Updated:** December 17, 2025

---

## Table of Contents

- [Overview](#overview)
- [Test Coverage](#test-coverage)
- [Running Tests](#running-tests)
- [Unit Testing](#unit-testing)
- [E2E Testing](#e2e-testing)
- [Accessibility Testing](#accessibility-testing)
- [Mocking Strategies](#mocking-strategies)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

### Testing Philosophy

Our testing strategy follows the **testing pyramid**:

```
        ┌─────────────────┐
        │   E2E Tests     │  ← 23 tests (critical user journeys)
        │   (Playwright)  │
        ├─────────────────┤
        │  Integration    │  ← Future (API routes)
        │     Tests       │
        ├─────────────────┤
        │   Unit Tests    │  ← 78 tests (utilities, business logic)
        │    (Vitest)     │
        └─────────────────┘
              ▲
              │
        More tests = faster feedback
```

### Testing Goals

- ✅ **80% code coverage** for `lib/` utilities
- ✅ **Zero WCAG violations** (WCAG 2.1 AA compliance)
- ✅ **Critical path coverage** for all user flows
- ✅ **Fast feedback** - Unit tests run in <10 seconds
- ✅ **Reliable tests** - No flaky tests allowed

---

## Test Coverage

### Current Status (v2.0)

| Test Type | Count | Status | Coverage |
|-----------|-------|--------|----------|
| **Unit Tests** | 78 | ✅ Passing | `lib/utils/` (26), `lib/zero-sequence/` (52) |
| **E2E Tests** | 23 | ✅ Passing | Auth flows, RBAC, beta signup, navigation |
| **Accessibility Tests** | 17 | ✅ Passing | All public pages, 0 WCAG violations |
| **Total** | **118** | ✅ **All Passing** | 80%+ coverage on critical paths |

### Coverage Goals

**Priority 1: Must Have Coverage**
- ✅ Authentication flows (login, logout, session)
- ✅ Role-based access control (RBAC)
- ✅ Beta signup flow
- ✅ Utility functions (logger, helpers, types)
- ✅ Zero Inbox AI classification

**Priority 2: Should Have Coverage**
- API routes (integration tests)
- Form validation
- Error handling
- Data transformations

**Priority 3: Nice to Have Coverage**
- UI component snapshots
- Visual regression (Percy)
- Performance tests

---

## Running Tests

### Unit Tests (Vitest)

**Watch mode** (recommended for development):
```bash
npm test
```

**Single run** (for CI/CD):
```bash
npm run test:run
```

**With coverage report**:
```bash
npm run test:coverage
```

**Interactive UI**:
```bash
npm run test:ui
```

Output:
```
 ✓ tests/unit/lib/utils/logger.test.ts (5 tests) 12ms
 ✓ tests/unit/lib/utils/helpers.test.ts (21 tests) 8ms
 ✓ tests/unit/lib/zero-sequence/classify.test.ts (52 tests) 145ms

Test Files  26 passed (26)
     Tests  78 passed (78)
  Start at  14:23:45
  Duration  2.1s
```

### E2E Tests (Playwright)

**Run all E2E tests**:
```bash
npx playwright test
```

**Run specific test file**:
```bash
npx playwright test tests/e2e/auth.spec.ts
```

**Run in specific browser**:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

**Interactive mode** (recommended for debugging):
```bash
npx playwright test --ui
```

**Debug mode** (step through tests):
```bash
npx playwright test --debug
```

**Headed mode** (see browser):
```bash
npx playwright test --headed
```

**Generate report**:
```bash
npx playwright show-report
```

### Accessibility Tests

**Run accessibility tests**:
```bash
npx playwright test tests/e2e/accessibility.spec.ts
```

**CI mode** (faster):
```bash
CI=true npx playwright test tests/e2e/accessibility.spec.ts
```

---

## Unit Testing

### Setup

**Test Framework:** [Vitest](https://vitest.dev/)
**Configuration:** `vitest.config.ts`

### File Structure

```
tests/unit/
├── lib/
│   ├── utils/
│   │   ├── logger.test.ts
│   │   ├── helpers.test.ts
│   │   └── types.test.ts
│   ├── zero-sequence/
│   │   ├── classify.test.ts
│   │   ├── extract-entities.test.ts
│   │   └── api.test.ts
│   └── auth/
│       └── firebase.test.ts (future)
└── components/
    └── ui/
        └── Button.test.tsx (future)
```

### Writing Unit Tests

#### Basic Test Structure

```typescript
// tests/unit/lib/utils/myFunction.test.ts
import { describe, it, expect } from 'vitest'
import { myFunction } from '@/lib/utils/myFunction'

describe('myFunction', () => {
  it('should return expected result for valid input', () => {
    const result = myFunction('valid input');
    expect(result).toBe('expected output');
  });

  it('should handle edge cases', () => {
    expect(myFunction('')).toBe('');
    expect(myFunction(null)).toThrow();
  });

  it('should validate input types', () => {
    expect(() => myFunction(123)).toThrow(TypeError);
  });
});
```

#### Testing Async Functions

```typescript
import { describe, it, expect } from 'vitest'

describe('asyncFunction', () => {
  it('should resolve with data', async () => {
    const result = await asyncFunction();
    expect(result).toEqual({ success: true, data: 'value' });
  });

  it('should reject on error', async () => {
    await expect(asyncFunction('invalid'))
      .rejects
      .toThrow('Invalid input');
  });
});
```

#### Testing with Mocks

```typescript
import { describe, it, expect, vi } from 'vitest'

// Mock a module
vi.mock('@/lib/auth/firebase', () => ({
  getFirebaseDB: vi.fn(() => mockDB)
}));

describe('getUserProfile', () => {
  it('should fetch user from Firestore', async () => {
    const mockDB = {
      collection: vi.fn(() => ({
        doc: vi.fn(() => ({
          get: vi.fn(() => ({
            exists: true,
            data: () => ({ uid: '123', email: 'test@example.com' })
          }))
        }))
      }))
    };

    const profile = await getUserProfile('123');
    expect(profile.email).toBe('test@example.com');
  });
});
```

### Example: Testing the Logger Utility

```typescript
// tests/unit/lib/utils/logger.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { logger } from '@/lib/utils/logger'

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should sanitize sensitive data in development', () => {
    process.env.NODE_ENV = 'development';

    logger.log('User logged in', {
      uid: '123',
      password: 'secret123', // Should be removed
      token: 'abc123' // Should be removed
    });

    expect(console.log).toHaveBeenCalledWith(
      'User logged in',
      expect.objectContaining({
        uid: '123',
        password: '[REDACTED]',
        token: '[REDACTED]'
      })
    );
  });

  it('should not log in production', () => {
    process.env.NODE_ENV = 'production';

    logger.log('Test message');

    expect(console.log).not.toHaveBeenCalled();
  });

  it('should always log errors in production', () => {
    process.env.NODE_ENV = 'production';

    logger.error('Critical error', new Error('Something broke'));

    // Should send to Sentry, not console
    expect(console.error).not.toHaveBeenCalled();
  });
});
```

---

## E2E Testing

### Setup

**Test Framework:** [Playwright](https://playwright.dev/)
**Configuration:** `playwright.config.ts`

**Browsers:**
- Chromium (default for CI)
- Firefox (optional)
- WebKit (optional)

### File Structure

```
tests/e2e/
├── auth.spec.ts              # Authentication flows
├── rbac.spec.ts              # Role-based access control
├── beta-signup.spec.ts       # Beta signup form
├── navigation.spec.ts        # Public page navigation
├── protected-routes.spec.ts  # Middleware protection
├── investor-portal.spec.ts   # Investor-specific tests
├── admin-dashboard.spec.ts   # Admin functionality
└── accessibility.spec.ts     # WCAG compliance tests
```

### Writing E2E Tests

#### Basic Page Test

```typescript
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Rationale/);
    await expect(page.locator('h1')).toContainText('Build');
  });

  test('should navigate to work page', async ({ page }) => {
    await page.goto('/');

    await page.click('a[href="/work"]');

    await expect(page).toHaveURL('/work');
  });
});
```

#### Testing Forms

```typescript
// tests/e2e/beta-signup.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Beta Signup', () => {
  test('should submit form successfully', async ({ page }) => {
    await page.goto('/');

    // Fill out form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="app"]', 'zero');

    // Submit
    await page.click('button[type="submit"]');

    // Verify success message
    await expect(page.locator('.success-message'))
      .toContainText('Thanks for your interest');
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');

    await expect(page.locator('.error-message'))
      .toContainText('Invalid email');
  });
});
```

#### Testing Authentication

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should log in with valid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Should redirect based on role
    await expect(page).toHaveURL(/\/(owner|team|partner|investor|client)/);
  });

  test('should redirect unauthenticated users', async ({ page }) => {
    await page.goto('/owner');

    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });
});
```

#### Testing RBAC (Role-Based Access Control)

```typescript
// tests/e2e/rbac.spec.ts
import { test, expect } from '@playwright/test'

test.describe('RBAC', () => {
  test('owner should access all portals', async ({ page, context }) => {
    // Login as owner
    await loginAsOwner(page);

    // Should access owner portal
    await page.goto('/owner');
    await expect(page).not.toHaveURL('/login');

    // Should access team portal
    await page.goto('/team');
    await expect(page).not.toHaveURL('/login');

    // Should access admin dashboard
    await page.goto('/admin/beta-signups');
    await expect(page).not.toHaveURL('/login');
  });

  test('investor should NOT access team portal', async ({ page }) => {
    await loginAsInvestor(page);

    await page.goto('/team');

    // Should see 403 error or redirect
    await expect(page.locator('h1')).toContainText('Forbidden');
  });
});
```

---

## Accessibility Testing

### Setup

**Tool:** [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)
**Standard:** WCAG 2.1 Level AA

### WCAG 2.1 AA Requirements

- ✅ **Perceivable:** Content is available to all senses (vision, hearing, touch)
- ✅ **Operable:** UI components are keyboard accessible
- ✅ **Understandable:** Content and operation are clear
- ✅ **Robust:** Content works with assistive technologies

### Writing Accessibility Tests

#### Basic Accessibility Scan

```typescript
// tests/e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('homepage should have no WCAG violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
```

#### Testing Specific Pages

```typescript
const pages = [
  { name: 'Homepage', url: '/' },
  { name: 'Work', url: '/work' },
  { name: 'Contact', url: '/contact' },
  { name: 'Zero', url: '/zero' },
  { name: 'Heirloom', url: '/work/heirloom' },
];

for (const { name, url } of pages) {
  test(`${name} should have no accessibility violations`, async ({ page }) => {
    await page.goto(url);

    const results = await new AxeBuilder({ page })
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
```

#### Testing Interactive Components

```typescript
test('modal should have proper focus trap', async ({ page }) => {
  await page.goto('/');

  // Open modal
  await page.click('button[aria-label="Open modal"]');

  // Tab through focusable elements
  await page.keyboard.press('Tab');
  const firstFocusable = await page.locator(':focus');
  await expect(firstFocusable).toHaveAttribute('data-focus-order', '1');

  // Tab to last element
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
  }

  // Should cycle back to first
  await page.keyboard.press('Tab');
  const cycledFocus = await page.locator(':focus');
  await expect(cycledFocus).toHaveAttribute('data-focus-order', '1');
});
```

#### Testing Keyboard Navigation

```typescript
test('should navigate site with keyboard only', async ({ page }) => {
  await page.goto('/');

  // Tab to first link
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  // Should navigate
  await expect(page).not.toHaveURL('/');
});
```

---

## Mocking Strategies

### Mocking Firebase

```typescript
// tests/unit/lib/auth/firebase.test.ts
import { vi } from 'vitest'

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => mockAuth),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => mockDB),
  collection: vi.fn(),
  getDocs: vi.fn(),
}));
```

### Mocking API Routes

```typescript
// tests/e2e/beta-signup.spec.ts
import { test, expect } from '@playwright/test'

test('should mock API response', async ({ page, context }) => {
  // Intercept API call
  await context.route('**/api/beta/signup', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({
        success: true,
        message: 'Signup successful',
        signupId: 'mock-id-123'
      })
    });
  });

  await page.goto('/');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.click('button[type="submit"]');

  await expect(page.locator('.success')).toBeVisible();
});
```

### Mocking External Services

```typescript
// Mock Resend email service
vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: {
      send: vi.fn(() => Promise.resolve({ id: 'mock-email-id' }))
    }
  }))
}));

// Mock Replicate AI service
vi.mock('replicate', () => ({
  default: vi.fn(() => ({
    run: vi.fn(() => Promise.resolve({ classification: 'urgent' }))
  }))
}));
```

---

## CI/CD Integration

### GitHub Actions Workflow

**File:** `.github/workflows/quality-gates.yml`

```yaml
jobs:
  quality-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm test -- --run
      - run: npm run build

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test tests/e2e/

  accessibility-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test tests/e2e/accessibility.spec.ts
```

### Running Tests Locally Before Push

```bash
# Full test suite (recommended before PR)
npm run lint && npx tsc --noEmit && npm test -- --run && npx playwright test
```

---

## Best Practices

### General Principles

- ✅ **Test behavior, not implementation** - Test what the user sees/does
- ✅ **Keep tests independent** - No shared state between tests
- ✅ **Use descriptive test names** - `it('should redirect to login when unauthenticated')`
- ✅ **Follow AAA pattern** - Arrange, Act, Assert
- ✅ **Mock external dependencies** - Don't call real APIs in tests
- ✅ **Fast tests** - Unit tests should run in <10s

### What to Test

**DO Test:**
- ✅ Business logic (utilities, helpers, transformations)
- ✅ Critical user flows (auth, signup, checkout)
- ✅ Error handling (validation, edge cases)
- ✅ Accessibility (WCAG compliance)

**DON'T Test:**
- ❌ Third-party libraries (trust they're tested)
- ❌ Implementation details (internal state)
- ❌ Styling (use visual regression instead)
- ❌ Constants (no logic to test)

### Test Naming Conventions

```typescript
// Good
it('should redirect to login when session expires')
it('should show error message for invalid email')
it('should successfully submit beta signup form')

// Bad
it('works')
it('test login')
it('checks if user is authenticated')
```

### Test Organization

```typescript
describe('AuthService', () => {
  describe('login()', () => {
    it('should authenticate with valid credentials', () => {});
    it('should reject invalid credentials', () => {});
    it('should handle network errors', () => {});
  });

  describe('logout()', () => {
    it('should clear session cookie', () => {});
    it('should redirect to homepage', () => {});
  });
});
```

---

## Troubleshooting

### Common Issues

#### Vitest: "Cannot find module"

**Problem:** Import paths not resolving

**Solution:** Check `vitest.config.ts` alias configuration:
```typescript
resolve: {
  alias: {
    '@': '/Users/matthanson/rationale-public'
  }
}
```

#### Playwright: "Timeout exceeded"

**Problem:** Element not found within 30s

**Solution:** Increase timeout or use better selectors:
```typescript
await page.locator('button[data-testid="submit"]')
  .click({ timeout: 60000 });
```

#### Accessibility: False positives

**Problem:** Axe-core reports violations for known issues

**Solution:** Exclude specific rules:
```typescript
const results = await new AxeBuilder({ page })
  .disableRules(['color-contrast']) // If known issue
  .analyze();
```

#### Firebase: "Credential implementation error"

**Problem:** Mocks not working in tests

**Solution:** Use proper mock structure:
```typescript
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  signInWithEmailAndPassword: vi.fn().mockResolvedValue({ user: { uid: '123' } })
}));
```

---

## References

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Questions or feedback?** See [CONTRIBUTING.md](../CONTRIBUTING.md) or contact matt@rationale.work
