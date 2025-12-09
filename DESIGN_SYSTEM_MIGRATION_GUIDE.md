# Design System Migration Guide
**Practical Implementation Roadmap**

This guide provides actionable scripts, codemods, and specific refactoring examples to execute the design system consolidation.

---

## Quick Start: Run Automated Fixes

### Step 1: Install Dependencies

```bash
npm install --save-dev @ast-grep/cli codemod
```

### Step 2: Run Color Token Migration

```bash
# Backup your code first!
git checkout -b design-system-migration

# Replace hardcoded colors with tokens
./scripts/migrate-colors.sh
```

---

## 1. Color Token Migration Scripts

### Script: `scripts/migrate-colors.sh`

```bash
#!/bin/bash

# Replace #FFD700 (Gold) with CSS variable
echo "Migrating #FFD700 to var(--brand-gold)..."
find components -name "*.tsx" -type f -exec sed -i '' 's/#FFD700/var(--brand-gold)/g' {} +
find app -name "*.tsx" -type f -exec sed -i '' 's/#FFD700/var(--brand-gold)/g' {} +

# Replace #00FF94 (Success Green) with CSS variable
echo "Migrating #00FF94 to var(--success-bright)..."
find components -name "*.tsx" -type f -exec sed -i '' 's/#00FF94/var(--success-bright)/g' {} +

# Replace #E85D4D (Heirloom Red) with CSS variable
echo "Migrating #E85D4D to var(--brand-heirloom)..."
find components -name "*.tsx" -type f -exec sed -i '' 's/#E85D4D/var(--brand-heirloom)/g' {} +

# Replace #2D2D2D (Dark BG) with CSS variable
echo "Migrating #2D2D2D to var(--bg-elevated-dark)..."
find components -name "*.tsx" -type f -exec sed -i '' 's/#2D2D2D/var(--bg-elevated-dark)/g' {} +

# Replace text-gray-400 with text-muted (Tailwind semantic)
echo "Migrating text-gray-400 to text-muted..."
find components -name "*.tsx" -type f -exec sed -i '' 's/text-gray-400/text-muted/g' {} +

# Replace bg-gray-800 with bg-elevated
echo "Migrating bg-gray-800 to bg-elevated..."
find components -name "*.tsx" -type f -exec sed -i '' 's/bg-gray-800/bg-elevated/g' {} +

echo "✅ Color migration complete!"
echo "⚠️  Review changes with: git diff"
```

### Add to `app/globals.css`:

```css
:root {
  /* Brand colors (add to existing) */
  --brand-gold: #FFD700;
  --brand-heirloom: #E85D4D;
  --success-bright: #00FF94;
  --bg-elevated-dark: #2D2D2D;
  --info-bright: #00D9FF;

  /* Semantic aliases for Tailwind */
  --color-muted: #a3a3a3;
  --color-elevated: #262626;
}

@theme inline {
  /* Add these to make Tailwind recognize the tokens */
  --color-muted: var(--muted);
  --color-elevated: #262626;
}
```

### Update `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        border: "var(--border)",
        muted: "var(--muted)",
        elevated: "var(--color-elevated)", // NEW

        // Brand colors
        brand: {
          gold: "var(--brand-gold)",       // NEW
          heirloom: "var(--brand-heirloom)", // NEW
        },

        // Semantic colors
        success: {
          DEFAULT: "var(--color-success)",
          bright: "var(--success-bright)", // NEW
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 2. Component Consolidation Examples

### Example 1: Consolidate Card Components

#### Before (InsightCard.tsx - 151 lines):

```tsx
// components/cards/InsightCard.tsx
export function InsightCard({ article, featured = false, className = '' }) {
  const categoryColors = {
    'Product': 'bg-blue-100 text-blue-700',
    'AI': 'bg-purple-100 text-purple-700',
    'Design': 'bg-pink-100 text-pink-700',
  };

  return (
    <Link href={`/insights/${article.slug}`}>
      <ResponsiveBox
        className={`
          group relative overflow-hidden
          rounded-lg border border-border
          bg-background hover:bg-accent/5
          transition-all duration-300
          hover:border-accent hover:shadow-lg
          ${featured ? 'lg:col-span-2' : ''}
          ${className}
        `}
      >
        <div className="mb-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[article.category]}`}>
            {article.category}
          </span>
        </div>
        {/* ... rest of content ... */}
      </ResponsiveBox>
    </Link>
  );
}
```

#### After (Using consolidated Card system):

```tsx
// components/patterns/InsightCard/InsightCard.tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CardTitle } from '@/components/ui/Card/CardTitle';

export function InsightCard({ article, featured = false, className = '' }) {
  return (
    <Card
      variant="elevated"
      size={featured ? 'lg' : 'md'}
      interactive
      asChild
      className={className}
    >
      <Link href={`/insights/${article.slug}`}>
        <CardHeader>
          <Badge variant={article.category.toLowerCase()}>
            {article.category}
          </Badge>
          <CardTitle as={featured ? 'h2' : 'h3'}>
            {article.title}
          </CardTitle>
          <p className="text-muted text-sm">{article.subtitle}</p>
        </CardHeader>

        <CardContent>
          <p className="text-muted">{article.excerpt}</p>
        </CardContent>

        <CardFooter>
          <CardMeta author={article.author} date={article.date} readTime={article.readTime} />
          <CardLink>Read article →</CardLink>
        </CardFooter>
      </Link>
    </Card>
  );
}
```

**Lines of code:** 151 → 35 (77% reduction)

---

### Base Card Implementation

Create: `components/ui/Card/Card.tsx`

```tsx
'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

// ==========================================
// VARIANTS
// ==========================================

const cardVariants = {
  default: 'bg-background border-border',
  elevated: 'bg-background border-border shadow-md',
  outlined: 'bg-transparent border-border',
  glass: 'bg-white/5 border-white/10 backdrop-blur-md',
} as const;

const cardSizes = {
  sm: 'p-4 space-y-3',
  md: 'p-6 space-y-4',
  lg: 'p-8 space-y-6',
} as const;

// ==========================================
// CARD ROOT
// ==========================================

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof cardVariants;
  size?: keyof typeof cardSizes;
  interactive?: boolean;
  asChild?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', size = 'md', interactive = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(
          // Base styles
          'rounded-lg border transition-all',

          // Variant styles
          cardVariants[variant],

          // Size styles
          cardSizes[size],

          // Interactive styles
          interactive && [
            'group cursor-pointer',
            'hover:bg-accent/5',
            'hover:border-accent',
            'hover:shadow-lg',
          ],

          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// ==========================================
// CARD HEADER
// ==========================================

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-2', className)} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

// ==========================================
// CARD CONTENT
// ==========================================

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm text-muted', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

// ==========================================
// CARD FOOTER
// ==========================================

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between pt-4 border-t border-border', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

// ==========================================
// CARD TITLE
// ==========================================

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Comp = 'h3', ...props }, ref) => (
    <Comp
      ref={ref as any}
      className={cn(
        'font-semibold leading-tight tracking-tight',
        'group-hover:text-accent transition-colors', // For interactive cards
        Comp === 'h2' && 'text-2xl',
        Comp === 'h3' && 'text-xl',
        Comp === 'h4' && 'text-lg',
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';
```

---

### Example 2: Consolidate Button Components

#### Before (3 separate systems):

**System 1:** `components/ui/ButtonHierarchy.tsx` (118 lines)
**System 2:** `components/beta/BetaSignupButton.tsx` (81 lines)
**System 3:** `components/zero/BetaSignupButton.tsx` (179 lines)

**Total:** 378 lines across 3 files

#### After (Unified Button system):

Create: `components/ui/Button/Button.tsx`

```tsx
'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ==========================================
// VARIANTS
// ==========================================

const buttonVariants = {
  primary: 'bg-accent text-white hover:bg-accent/90',
  secondary: 'bg-transparent border border-border text-foreground hover:bg-accent/10 hover:border-accent',
  outline: 'bg-transparent border-2 border-current hover:bg-accent/10',
  ghost: 'bg-transparent hover:bg-accent/10',
  text: 'bg-transparent hover:underline p-0',
} as const;

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
} as const;

// ==========================================
// BUTTON COMPONENT
// ==========================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  fullWidth?: boolean;
  loading?: boolean;
  asChild?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      asChild = false,
      href,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Determine component type
    const Comp = asChild ? Slot : href ? Link : 'button';

    // Combine class names
    const classes = cn(
      // Base styles
      'inline-flex items-center justify-center',
      'font-medium rounded-md',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',

      // Variant styles
      buttonVariants[variant],

      // Size styles
      buttonSizes[size],

      // Width
      fullWidth && 'w-full',

      // Loading state
      loading && 'opacity-70 cursor-wait',

      className
    );

    // Link props
    if (href) {
      return (
        <Link href={href} className={classes}>
          {loading ? 'Loading...' : children}
        </Link>
      );
    }

    // Button props
    return (
      <Comp
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        type={props.type || 'button'}
        {...props}
      >
        {loading ? 'Loading...' : children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

// ==========================================
// SEMANTIC ALIASES
// ==========================================

export const ButtonPrimary = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="primary" {...props} />
);

ButtonPrimary.displayName = 'ButtonPrimary';

export const ButtonSecondary = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="secondary" {...props} />
);

ButtonSecondary.displayName = 'ButtonSecondary';
```

**Total:** 100 lines in 1 file (74% reduction)

---

### Example 3: Create Badge System

Create: `components/ui/Badge/Badge.tsx`

```tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// ==========================================
// BADGE VARIANTS
// ==========================================

export const STATUS_VARIANTS = {
  live: 'bg-green-500/20 text-green-600 border-green-500/30',
  beta: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
  building: 'bg-orange-500/20 text-orange-600 border-orange-500/30',
  delivered: 'bg-accent/20 text-accent border-accent/30',
  archived: 'bg-gray-500/20 text-gray-600 border-gray-500/30',
} as const;

export const CATEGORY_VARIANTS = {
  product: 'bg-blue-100 text-blue-700',
  ai: 'bg-purple-100 text-purple-700',
  design: 'bg-pink-100 text-pink-700',
  strategy: 'bg-green-100 text-green-700',
  process: 'bg-orange-100 text-orange-700',
} as const;

const semanticVariants = {
  default: 'bg-neutral-100 text-neutral-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-orange-100 text-orange-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
} as const;

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
} as const;

// ==========================================
// BADGE COMPONENT
// ==========================================

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | keyof typeof semanticVariants
    | keyof typeof STATUS_VARIANTS
    | keyof typeof CATEGORY_VARIANTS;
  size?: keyof typeof badgeSizes;
}

export function Badge({ className, variant = 'default', size = 'md', ...props }: BadgeProps) {
  // Determine which variant collection to use
  const variantClass =
    semanticVariants[variant as keyof typeof semanticVariants] ||
    STATUS_VARIANTS[variant as keyof typeof STATUS_VARIANTS] ||
    CATEGORY_VARIANTS[variant as keyof typeof CATEGORY_VARIANTS] ||
    semanticVariants.default;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantClass,
        badgeSizes[size],
        className
      )}
      {...props}
    />
  );
}
```

**Usage:**

```tsx
// Before (in InsightCard.tsx)
<span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
  Product
</span>

// After
<Badge variant="product">Product</Badge>
```

**Eliminates:** 7 duplicate badge color definitions

---

## 3. Automated Refactoring Codemod

### Install jscodeshift:

```bash
npm install -g jscodeshift
```

### Codemod: Replace Card patterns

Create: `codemods/migrate-cards.js`

```javascript
/**
 * Codemod to migrate custom card implementations to unified Card component
 *
 * Usage:
 *   jscodeshift -t codemods/migrate-cards.js components/cards/
 */

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Find all JSX elements with card-like class patterns
  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: 'div' },
      },
    })
    .filter((path) => {
      const classNameAttr = path.value.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'className'
      );

      if (!classNameAttr) return false;

      const classValue = classNameAttr.value?.value || '';

      // Check if this looks like a card pattern
      return (
        classValue.includes('rounded-lg') &&
        classValue.includes('border') &&
        classValue.includes('border-border')
      );
    })
    .replaceWith((path) => {
      // Extract className for merging
      const classNameAttr = path.value.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'className'
      );

      // Determine variant based on classes
      let variant = 'default';
      if (classNameAttr?.value?.value?.includes('shadow')) {
        variant = 'elevated';
      }

      // Create new Card component
      return j.jsxElement(
        j.jsxOpeningElement(
          j.jsxIdentifier('Card'),
          [
            j.jsxAttribute(
              j.jsxIdentifier('variant'),
              j.stringLiteral(variant)
            ),
            j.jsxAttribute(
              j.jsxIdentifier('interactive'),
              j.jsxExpressionContainer(j.booleanLiteral(true))
            ),
            classNameAttr,
          ]
        ),
        j.jsxClosingElement(j.jsxIdentifier('Card')),
        path.value.children
      );
    });

  return root.toSource({ quote: 'single' });
};
```

### Run the codemod:

```bash
jscodeshift -t codemods/migrate-cards.js components/cards/*.tsx
```

---

## 4. Utility Class Creation

### Add to `app/globals.css`:

```css
/* ==========================================
   CARD UTILITIES (Reusable patterns)
   ========================================== */

.card-interactive {
  @apply group transition-all duration-300;
  @apply hover:bg-accent/5 hover:border-accent hover:shadow-lg;
  @apply cursor-pointer;
}

.card-header {
  @apply flex flex-col space-y-2 mb-4;
}

.card-content {
  @apply text-sm text-muted leading-relaxed;
}

.card-footer {
  @apply flex items-center justify-between pt-4 border-t border-border;
}

/* ==========================================
   BADGE UTILITIES
   ========================================== */

.badge {
  @apply inline-flex items-center px-3 py-1;
  @apply text-xs font-semibold rounded-full;
}

.badge-status-live {
  @apply bg-green-500/20 text-green-600 border border-green-500/30;
}

.badge-status-beta {
  @apply bg-blue-500/20 text-blue-600 border border-blue-500/30;
}

.badge-category-product {
  @apply bg-blue-100 text-blue-700;
}

.badge-category-ai {
  @apply bg-purple-100 text-purple-700;
}

/* ==========================================
   TYPOGRAPHY UTILITIES
   ========================================== */

.text-muted {
  color: var(--muted);
}

.text-elevated {
  color: var(--foreground);
}

/* ==========================================
   SPACING UTILITIES (Token-based)
   ========================================== */

.space-section {
  @apply py-12 md:py-24;
}

.space-card {
  @apply p-6 md:p-8;
}

.gap-section {
  @apply gap-8 md:gap-12;
}
```

### Usage:

```tsx
// Before
<div className="group relative overflow-hidden rounded-lg border border-border bg-background hover:bg-accent/5 transition-all duration-300 hover:border-accent hover:shadow-lg">

// After
<div className="card-interactive rounded-lg border border-border bg-background">
```

**Impact:** Replaces 40+ inline duplications

---

## 5. Validation Scripts

### Check Token Coverage

Create: `scripts/check-token-coverage.sh`

```bash
#!/bin/bash

echo "==================================="
echo "Design Token Coverage Report"
echo "==================================="

# Count hardcoded hex colors
hex_count=$(grep -r "#[0-9A-Fa-f]\{6\}" components/ | wc -l | tr -d ' ')
echo "Hardcoded hex colors: $hex_count"

# Count text-gray usage (should be text-muted)
gray_count=$(grep -r "text-gray-[0-9]" components/ | wc -l | tr -d ' ')
echo "Direct gray utilities: $gray_count (should use text-muted)"

# Count inline styles
inline_styles=$(grep -r "style={{" components/ | wc -l | tr -d ' ')
echo "Inline styles: $inline_styles"

# Count var(--*) token usage
token_usage=$(grep -r "var(--" components/ | wc -l | tr -d ' ')
echo "CSS variable usage: $token_usage"

echo ""
echo "Target Metrics:"
echo "  Hex colors: <25"
echo "  Gray utilities: <50"
echo "  Inline styles: <100"
echo "  Token usage: >500"
```

### Lint Rule: Enforce Token Usage

Create: `.eslintrc.js` additions:

```javascript
module.exports = {
  rules: {
    // Disallow hardcoded colors
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/#[0-9A-Fa-f]{6}/]',
        message: 'Use design tokens instead of hardcoded hex colors',
      },
    ],

    // Warn on text-gray usage
    'react/forbid-component-props': [
      'warn',
      {
        forbid: [
          {
            propName: 'className',
            allowedFor: [],
            message: 'Prefer semantic tokens like text-muted over text-gray-*',
          },
        ],
      },
    ],
  },
};
```

---

## 6. Testing Strategy

### Visual Regression Tests

Install Playwright:

```bash
npm install -D @playwright/test
```

Create: `tests/visual-regression.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

const COMPONENTS = [
  { name: 'InsightCard', url: '/insights' },
  { name: 'VentureCard', url: '/ventures' },
  { name: 'Button', url: '/style-guide/buttons' },
];

test.describe('Visual Regression Tests', () => {
  COMPONENTS.forEach(({ name, url }) => {
    test(`${name} matches snapshot`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      // Take screenshot
      const screenshot = await page.screenshot();

      // Compare with baseline
      expect(screenshot).toMatchSnapshot(`${name}.png`);
    });
  });
});
```

### Run tests:

```bash
# Generate baseline
npx playwright test --update-snapshots

# Run regression tests
npx playwright test
```

---

## 7. Documentation Template

### Component Documentation Format

Create: `components/ui/Card/README.md`

```markdown
# Card Component

Base card component with support for multiple variants, sizes, and interactive states.

## Import

\`\`\`tsx
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/Card';
\`\`\`

## Variants

### Default
Basic card with border and background.

\`\`\`tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Card content goes here</CardContent>
</Card>
\`\`\`

### Elevated
Card with shadow for emphasis.

\`\`\`tsx
<Card variant="elevated">
  <CardContent>Elevated card content</CardContent>
</Card>
\`\`\`

### Interactive
Adds hover effects and cursor pointer.

\`\`\`tsx
<Card interactive>
  <CardContent>Click me!</CardContent>
</Card>
\`\`\`

### Glass
Glassmorphism effect with backdrop blur.

\`\`\`tsx
<Card variant="glass">
  <CardContent>Glass card content</CardContent>
</Card>
\`\`\`

## Sizes

- `sm`: Compact padding (p-4)
- `md`: Default padding (p-6)
- `lg`: Large padding (p-8)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' | 'elevated' | 'outlined' | 'glass'` | `'default'` | Visual variant |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | Padding size |
| `interactive` | `boolean` | `false` | Enable hover effects |
| `asChild` | `boolean` | `false` | Use with Link wrapper |

## Examples

### With Link

\`\`\`tsx
<Card interactive asChild>
  <Link href="/details">
    <CardHeader>
      <CardTitle>Clickable Card</CardTitle>
    </CardHeader>
  </Link>
</Card>
\`\`\`

### With Badge

\`\`\`tsx
<Card variant="elevated">
  <CardHeader>
    <Badge variant="live">Live</Badge>
    <CardTitle>Project Title</CardTitle>
  </CardHeader>
  <CardContent>
    Project description...
  </CardContent>
</Card>
\`\`\`

## Design Tokens

This component uses the following design tokens:

- `--radius-md` for border radius
- `--border` for border color
- `--background` for background color
- `--accent` for hover states

## Migration from Old Components

### Before (InsightCard.tsx)

\`\`\`tsx
<div className="group rounded-lg border border-border bg-background hover:bg-accent/5">
  <div className="mb-4">
    <h3 className="text-xl font-semibold">{title}</h3>
  </div>
  <p className="text-muted">{content}</p>
</div>
\`\`\`

### After

\`\`\`tsx
<Card interactive>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>{content}</CardContent>
</Card>
\`\`\`
```

---

## 8. Progress Tracking

### Checklist: Migration Progress

Create: `MIGRATION_CHECKLIST.md`

```markdown
# Design System Migration Checklist

## Phase 1: Token Foundation ⏳

- [ ] Run `migrate-colors.sh` script
- [ ] Add missing tokens to `globals.css`
- [ ] Update `tailwind.config.ts`
- [ ] Run token coverage script
- [ ] Fix ESLint warnings
- [ ] Commit: "Phase 1: Token foundation"

**Target:** 35% → 65% token coverage

---

## Phase 2: Component Consolidation ⏳

### Cards
- [ ] Create `components/ui/Card/Card.tsx`
- [ ] Migrate `InsightCard`
- [ ] Migrate `VentureCard`
- [ ] Migrate `CaseStudyTeaser`
- [ ] Migrate `KitCard`
- [ ] Deprecate old card components
- [ ] Update all references

### Buttons
- [ ] Create `components/ui/Button/Button.tsx`
- [ ] Replace `ButtonHierarchy` usage
- [ ] Replace `BetaSignupButton` usage
- [ ] Remove old button files

### Badges
- [ ] Create `components/ui/Badge/Badge.tsx`
- [ ] Replace inline badge definitions
- [ ] Update all badge usage

**Target:** 14 variants → 7 components

---

## Phase 3: Utility Migration ⏳

- [ ] Add `.card-interactive` utility class
- [ ] Replace `text-gray-*` with `text-muted`
- [ ] Replace `bg-gray-*` with semantic tokens
- [ ] Standardize spacing patterns
- [ ] Remove duplicate hover effects

**Target:** 65% → 85% token coverage

---

## Phase 4: Testing & Documentation ⏳

- [ ] Set up Playwright visual tests
- [ ] Generate snapshot baselines
- [ ] Write component documentation
- [ ] Create migration guide
- [ ] Performance audit
- [ ] Final token coverage check

**Target:** 85% → 95% token coverage

---

## Metrics Dashboard

| Metric | Baseline | Current | Target | Status |
|--------|----------|---------|--------|--------|
| Token Coverage | 35% | - | 95% | 🔴 |
| Hardcoded Colors | 500+ | - | <25 | 🔴 |
| Card Variants | 14 | - | 7 | 🔴 |
| Button Systems | 3 | - | 1 | 🔴 |

Update after each phase completion.
```

---

## 9. Rollback Plan

### If Migration Breaks Something

```bash
# Revert specific file
git checkout origin/main -- components/cards/InsightCard.tsx

# Revert entire phase
git revert <commit-hash>

# Emergency rollback
git reset --hard origin/main
```

### Gradual Migration Strategy

Instead of replacing all at once:

1. **Keep old components** with `@deprecated` comment
2. **Create new components** alongside
3. **Migrate page by page**
4. **Remove old after 1 sprint**

Example:

```tsx
/**
 * @deprecated Use Card from @/components/ui/Card instead
 * This component will be removed in v2.0.0
 */
export function InsightCard_DEPRECATED() {
  // Old implementation
}
```

---

## 10. Next Steps

### Immediate (This Week)

1. ✅ Run `migrate-colors.sh`
2. ✅ Add tokens to `globals.css`
3. ✅ Update `tailwind.config.ts`
4. ✅ Run coverage script

### Short Term (Next 2 Weeks)

1. Create `Card` component
2. Migrate 4 main cards
3. Create `Button` component
4. Create `Badge` component

### Medium Term (Next Month)

1. Migrate all remaining components
2. Set up visual regression tests
3. Write documentation
4. Remove deprecated components

---

**Questions? Issues?**

Refer to the main audit report: `DESIGN_SYSTEM_AUDIT.md`

Or check component documentation in `components/ui/*/README.md`
