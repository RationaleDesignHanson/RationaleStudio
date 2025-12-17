# Contributing to Rationale Studio

Thank you for your interest in contributing to the Rationale Studio website! This guide will help you understand our development process, code standards, and how to submit quality contributions.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guide](#code-style-guide)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Design System Guidelines](#design-system-guidelines)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- **Node.js 20.x** or higher
- **npm 10.x** or higher
- **Git** installed and configured
- A **Firebase account** (for local testing)
- Familiarity with **Next.js 16**, **React 19**, and **TypeScript**

### Initial Setup

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/RationaleStudio.git
   cd RationaleStudio
   ```

3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/RationaleDesignHanson/RationaleStudio.git
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```
   See [docs/setup/FIREBASE_ADMIN_SETUP.md](docs/setup/FIREBASE_ADMIN_SETUP.md) for details.

6. **Start development server:**
   ```bash
   npm run dev
   ```

7. **Verify setup:**
   - Open [http://localhost:3000](http://localhost:3000)
   - You should see: `[Firebase Admin] Successfully initialized`

---

## Development Workflow

### 1. Sync with Upstream

Before starting new work, sync your fork:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

### 2. Create Feature Branch

Use descriptive branch names:

```bash
# Format: type/short-description
git checkout -b feat/add-user-dashboard
git checkout -b fix/auth-redirect-bug
git checkout -b docs/update-contributing-guide
git checkout -b refactor/consolidate-card-components
```

**Branch Types:**
- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `test/` - Test additions/modifications
- `refactor/` - Code refactoring
- `chore/` - Build/tooling changes

### 3. Make Changes

Follow these principles:
- **One feature per branch** - Keep changes focused
- **Test as you go** - Don't wait until the end
- **Commit frequently** - Small, logical commits are easier to review

### 4. Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: type(scope): subject
feat(auth): add password reset flow
fix(beta): resolve email validation bug
docs(readme): update setup instructions
test(api): add unit tests for auth routes
refactor(cards): consolidate card variants
chore(deps): update Next.js to 16.0.10
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style (formatting, missing semicolons, etc.)
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `test` - Adding or correcting tests
- `chore` - Changes to build process or auxiliary tools

**Scope** (optional):
- `auth` - Authentication
- `api` - API routes
- `ui` - UI components
- `beta` - Beta signup system
- `admin` - Admin dashboard
- `deps` - Dependencies

**Subject:**
- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Max 72 characters

### 5. Pre-commit Checks

Husky runs these automatically on commit:
- **ESLint** - Code quality checks
- **Type checking** - TypeScript validation
- **Prettier** - Code formatting

Manual run:
```bash
npm run lint       # ESLint
npx tsc --noEmit   # Type check
npm test           # Unit tests
npm run build      # Build validation
```

### 6. Push and Create PR

```bash
git push origin feat/your-feature-name
```

Then create a Pull Request on GitHub.

---

## Code Style Guide

### TypeScript

#### Type Safety

**DO:**
```typescript
// Explicit return types for functions
export function getUserProfile(uid: string): Promise<UserProfile | null> {
  // ...
}

// Proper interface definitions
interface UserProfile {
  uid: string;
  email: string;
  role: 'owner' | 'team' | 'partner' | 'investor' | 'client';
  name?: string;
}

// Use discriminated unions
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

**DON'T:**
```typescript
// Avoid 'any' type
function processData(data: any) { // ❌
  return data.something;
}

// Avoid implicit 'any'
const users = data.map(user => user.name); // ❌ 'user' is implicitly 'any'

// Avoid non-null assertions without justification
const user = users.find(u => u.id === id)!; // ❌
```

**Acceptable 'any' usage:**
Only when absolutely necessary, with a justification comment:
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(error: any) { // OK - external library may throw anything
  logger.error('Error occurred:', error);
}
```

#### Async/Await

Always use async/await over raw Promises:

**DO:**
```typescript
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error('Fetch failed:', error);
    throw error;
  }
}
```

**DON'T:**
```typescript
function fetchUserData() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      logger.error('Fetch failed:', error);
      throw error;
    });
}
```

### React Components

#### Component Structure

```typescript
'use client' // Only if needed (client component)

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { logger } from '@/lib/utils/logger'
import type { UserProfile } from '@/lib/types'

interface UserCardProps {
  user: UserProfile;
  onEdit?: (user: UserProfile) => void;
  className?: string;
}

export function UserCard({ user, onEdit, className }: UserCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      // ... logic
      onEdit?.(user);
    } catch (error) {
      logger.error('Edit failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('p-4 border rounded-lg', className)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && (
        <Button onClick={handleEdit} disabled={isLoading}>
          Edit
        </Button>
      )}
    </div>
  );
}
```

#### Component Naming

- **PascalCase** for component files and exports
- **Descriptive names** - `UserDashboard.tsx` not `Dashboard.tsx`
- **Colocation** - Keep related files together

```
components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Badge.tsx
├── auth/
│   ├── LoginForm.tsx
│   ├── PasswordReset.tsx
│   └── AuthProvider.tsx
└── zero/
    ├── ZeroDashboard.tsx
    ├── EmailList.tsx
    └── ActionSheet.tsx
```

### Styling

#### Use Design Tokens

**DO:**
```typescript
<div className="bg-terminal-gold text-black">
  <h2 className="text-2xl font-bold">Title</h2>
</div>
```

**DON'T:**
```typescript
<div style={{ backgroundColor: '#FFD700', color: '#000000' }}>
  <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Title</h2>
</div>
```

#### Responsive Classes

Use Tailwind's responsive utilities:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card className="p-4 sm:p-6 lg:p-8" />
</div>
```

#### Use cn() for Conditional Classes

```typescript
import { cn } from '@/lib/utils'

<button
  className={cn(
    'px-4 py-2 rounded-lg font-medium transition-all',
    isPrimary && 'bg-terminal-gold text-black',
    isSecondary && 'bg-gray-200 text-gray-900',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Click Me
</button>
```

### Logging

**NEVER use console.log/error/warn directly.** Use the logger utility:

**DO:**
```typescript
import { logger } from '@/lib/utils/logger'

logger.log('User logged in:', { uid, email });
logger.error('Authentication failed:', error);
logger.warn('Session expiring soon');
logger.info('Data fetched successfully');
```

**DON'T:**
```typescript
console.log('User logged in:', uid); // ❌
console.error('Auth failed:', error); // ❌
```

The logger automatically:
- Strips sensitive data (passwords, tokens)
- Only logs in development (production uses Sentry)
- Formats messages consistently
- Prevents Lighthouse Best Practices penalties

---

## Testing Requirements

### All New Code Must Have Tests

**Coverage Requirements:**
- **Utility functions:** 100% coverage
- **API routes:** 80% coverage
- **Components:** 70% coverage (critical paths)
- **E2E tests:** Required for new user flows

### Unit Tests

Located in `tests/unit/`:

```typescript
// tests/unit/lib/utils/myFunction.test.ts
import { describe, it, expect } from 'vitest'
import { myFunction } from '@/lib/utils/myFunction'

describe('myFunction', () => {
  it('should return expected result', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });

  it('should handle edge cases', () => {
    expect(myFunction('')).toBe('');
    expect(myFunction(null)).toThrow();
  });
});
```

Run tests:
```bash
npm test              # Watch mode
npm run test:run      # Single run
npm run test:coverage # With coverage
```

### E2E Tests

Located in `tests/e2e/`:

```typescript
// tests/e2e/my-feature.spec.ts
import { test, expect } from '@playwright/test'

test.describe('My Feature', () => {
  test('should complete user flow', async ({ page }) => {
    await page.goto('/my-feature');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/success');
  });
});
```

Run E2E tests:
```bash
npx playwright test
npx playwright test --ui      # Interactive mode
npx playwright test --debug   # Debug mode
```

### Accessibility Tests

Use `@axe-core/playwright` for a11y testing:

```typescript
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('should have no accessibility violations', async ({ page }) => {
  await page.goto('/my-page');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

---

## Pull Request Process

### Before Submitting

1. **Sync with upstream:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks:**
   ```bash
   npm run lint
   npm test
   npm run build
   npx playwright test
   ```

3. **Update documentation** if needed

4. **Add/update tests** for your changes

### PR Title Format

Use Conventional Commits format:

```
feat(auth): add password reset functionality
fix(beta): resolve email validation edge case
docs(readme): improve setup instructions
test(api): add unit tests for auth routes
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does and why.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Accessibility tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots to illustrate UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review of code completed
- [ ] Tests added and passing
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Accessibility requirements met (WCAG 2.1 AA)
```

### Review Process

1. **Automated checks** must pass (CI/CD)
2. **Code review** by maintainer
3. **Testing verification** in staging environment
4. **Approval** required before merge
5. **Squash and merge** strategy used

### After Merge

1. **Delete your branch:**
   ```bash
   git branch -d feat/your-feature
   git push origin --delete feat/your-feature
   ```

2. **Sync main:**
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

---

## Design System Guidelines

### Using Design Tokens

Always use design tokens instead of hardcoded values:

**Colors:**
```typescript
// Good
<div className="bg-terminal-gold text-black">

// Bad
<div style={{ backgroundColor: '#FFD700', color: '#000000' }}>
```

**Available color tokens:**
- `terminal-gold` - Primary brand color (#FFD700)
- `black` / `white` - Base colors
- `gray-50` through `gray-900` - Neutral scale
- `blue-500`, `green-500`, `red-500` - Semantic colors

**Spacing:**
```typescript
// Good
<div className="p-4 md:p-6 lg:p-8 gap-4">

// Bad
<div style={{ padding: '16px', gap: '16px' }}>
```

**Typography:**
```typescript
// Good
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">

// Bad
<h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>
```

### Component Composition

Build features using existing components:

```typescript
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      title={project.name}
      description={project.description}
      badge={<Badge variant="gold">{project.status}</Badge>}
      footer={
        <Button variant="primary" href={project.url}>
          View Project
        </Button>
      }
    />
  );
}
```

### Accessibility Requirements

**WCAG 2.1 AA Compliance:**
- ✅ Semantic HTML (`<button>` not `<div onClick>`)
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ ARIA labels for icon-only buttons
- ✅ Color contrast ratios (4.5:1 for text, 3:1 for large text)
- ✅ Touch targets minimum 44×44px
- ✅ Focus indicators visible
- ✅ Alt text on images
- ✅ Proper heading hierarchy

**Example:**
```typescript
// Good
<button
  className="p-2 min-w-[44px] min-h-[44px]"
  aria-label="Close modal"
  onClick={onClose}
>
  <X className="w-6 h-6" />
</button>

// Bad
<div
  className="p-1 cursor-pointer"
  onClick={onClose}
>
  <X className="w-4 h-4" />
</div>
```

---

## Common Patterns

### API Routes

```typescript
// app/api/my-route/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Business logic
    const result = await processData(body);

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Server Components (Default)

```typescript
// app/my-page/page.tsx
import { getServerData } from '@/lib/data'

export default async function MyPage() {
  const data = await getServerData(); // Direct server call

  return (
    <div>
      <h1>Server Component</h1>
      <DataDisplay data={data} />
    </div>
  );
}
```

### Client Components (When Needed)

```typescript
// app/my-interactive-page/page.tsx
'use client'

import { useState } from 'react'

export default function InteractivePage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Client Component</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}
```

### Firestore Queries

```typescript
import { getFirebaseDB } from '@/lib/auth/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

async function getUserProjects(userId: string) {
  const db = getFirebaseDB();
  const projectsRef = collection(db, 'projects');
  const q = query(projectsRef, where('userId', '==', userId));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
```

---

## Troubleshooting

### Common Issues

#### Firebase Admin "Credential implementation error"

**Solution:** Check `FIREBASE_PRIVATE_KEY` formatting:
```bash
# Ensure newlines are preserved
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

#### TypeScript errors after pulling

**Solution:** Rebuild TypeScript cache:
```bash
rm -rf .next tsconfig.tsbuildinfo node_modules/.cache
npm install
npm run dev
```

#### Tests failing locally but passing in CI

**Solution:** Ensure dependencies are up to date:
```bash
npm ci  # Clean install
npx playwright install --with-deps
```

#### Husky pre-commit hooks not running

**Solution:** Reinstall hooks:
```bash
npm run prepare
```

---

## Questions or Help?

- **Documentation:** Check [docs/](docs/) directory
- **Setup Issues:** See [docs/setup/SETUP_INSTRUCTIONS.md](docs/setup/SETUP_INSTRUCTIONS.md)
- **GitHub Issues:** [github.com/RationaleDesignHanson/RationaleStudio/issues](https://github.com/RationaleDesignHanson/RationaleStudio/issues)
- **Email:** matt@rationale.work

---

## Code of Conduct

Be respectful, constructive, and collaborative. We're building something great together.

---

**Thank you for contributing to Rationale Studio!**
