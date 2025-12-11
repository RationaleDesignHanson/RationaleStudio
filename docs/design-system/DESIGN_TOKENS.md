# Design Token System

**Version:** 1.0
**Last Updated:** December 10, 2025
**Status:** ✅ Production
**Phase:** 4 - Design System Consolidation

---

## Table of Contents

1. [Overview](#overview)
2. [Color Tokens](#color-tokens)
3. [Typography Tokens](#typography-tokens)
4. [Spacing Tokens](#spacing-tokens)
5. [Responsive Patterns](#responsive-patterns)
6. [Semantic Color System](#semantic-color-system)
7. [Usage Guidelines](#usage-guidelines)
8. [Migration Guide](#migration-guide)

---

## Overview

The Rationale design token system provides a centralized, type-safe foundation for all visual styling. Design tokens are defined in CSS custom properties and consumed via Tailwind CSS utilities.

### Key Principles

1. **Single Source of Truth**: All tokens defined in `app/globals.css`
2. **Type Safety**: TypeScript types for semantic colors in `lib/design-tokens/semantic-colors.ts`
3. **Responsive by Default**: All spacing/typography scales across breakpoints
4. **Accessibility First**: WCAG 2.1 AA compliant color contrast ratios
5. **Component Agnostic**: Tokens work across all component libraries

### Token Architecture

```
app/globals.css                              # CSS custom properties
├── Color tokens (:root + @theme inline)
├── Typography tokens (fluid type scale)
├── Spacing tokens (responsive patterns)
└── Animation tokens (transitions, easing)

lib/design-tokens/
├── semantic-colors.ts                       # Badge/status colors (TypeScript)
└── colors.ts                                # Legacy color definitions

lib/styles/
└── responsive-patterns.ts                   # Responsive utility classes
```

---

## Color Tokens

### Terminal Gold System (Phase 4.1)

**Primary Brand Color**

```css
--color-terminal-gold: #FFD700;              /* Base gold */
--color-terminal-gold-hover: #FFE34D;        /* Hover state */
--color-terminal-gold-dark: #E5C100;         /* Dark variant */
--color-terminal-gold-light: #FFF5CC;        /* Light variant */
```

**Tailwind Classes:**
```tsx
// Text colors
<div className="text-terminal-gold" />
<div className="text-terminal-gold-hover" />
<div className="text-terminal-gold-dark" />

// Background colors
<div className="bg-terminal-gold" />
<div className="bg-terminal-gold-hover" />

// Border colors
<div className="border-terminal-gold/30" />  // With opacity
<div className="border-terminal-gold-hover" />

// Shadow effects
<div className="shadow-terminal-gold/20" />
```

**Use Cases:**
- Primary CTAs (buttons, links)
- Active navigation states
- Featured card borders
- Hover effects
- Badge accents

### Neutral Scale (Dark Mode Optimized)

```css
--color-neutral-50: #FAFAFA;                 /* Lightest */
--color-neutral-100: #F5F5F5;
--color-neutral-200: #E5E5E5;
--color-neutral-300: #D4D4D4;
--color-neutral-400: #A3A3A3;
--color-neutral-500: #626262;                /* Mid-point */
--color-neutral-600: #525252;
--color-neutral-700: #404040;
--color-neutral-800: #262626;
--color-neutral-900: #171717;
--color-neutral-950: #0A0A0A;                /* Darkest */
```

**Tailwind Classes:**
```tsx
// Grays for UI elements
<div className="bg-gray-900 text-gray-300" />
<div className="border-gray-700/50" />
```

### Data Visualization Colors

**WCAG AA Accessible on Dark Backgrounds**

```css
--color-data-blue: #3B82F6;                  /* Primary data */
--color-data-cyan: #06B6D4;                  /* Complementary */
--color-data-green: #10B981;                 /* Positive */
--color-data-yellow: #F59E0B;                /* Warning */
--color-data-red: #EF4444;                   /* Negative */
--color-data-purple: #8B5CF6;                /* Accent */
--color-data-orange: #F97316;                /* Highlight */
```

**Use Cases:**
- Charts and graphs
- Status indicators
- Progress bars
- Metrics visualization

### Status Colors

```css
--color-success: #10B981;                    /* Green */
--color-warning: #F59E0B;                    /* Amber */
--color-error: #EF4444;                      /* Red */
--color-info: #3B82F6;                       /* Blue */
```

**Tailwind Classes:**
```tsx
<div className="text-green-500" />           // Success
<div className="text-amber-500" />           // Warning
<div className="text-red-500" />             // Error
<div className="text-blue-500" />            // Info
```

---

## Typography Tokens

### Font Families

```css
--font-sans: var(--font-geist-sans);         /* Primary UI font */
--font-mono: var(--font-geist-mono);         /* Code blocks */
--font-terminal: var(--font-ibm-plex-mono);  /* Terminal aesthetics */
```

**Usage:**
```tsx
<div className="font-sans" />                // Geist Sans
<div className="font-mono" />                // Geist Mono
<code className="font-terminal" />           // IBM Plex Mono
```

### Fluid Type Scale (Viewport-Based)

**Format:** `clamp(min, preferred, max)` where preferred uses viewport units

```css
/* Display / Hero */
--font-size-h1: clamp(1.75rem, 1.25rem + 1.2vw, 3rem);      /* 28px → 48px */
--font-size-h2: clamp(1.5rem, 1.125rem + 0.8vw, 2.25rem);   /* 24px → 36px */
--font-size-h3: clamp(1.25rem, 1rem + 0.5vw, 1.875rem);     /* 20px → 30px */

/* Body text */
--font-size-body: clamp(0.9375rem, 0.875rem + 0.2vw, 1.125rem);   /* 15px → 18px */
--font-size-caption: clamp(0.8125rem, 0.75rem + 0.15vw, 0.9375rem); /* 13px → 15px */
```

**Tailwind Responsive Classes:**
```tsx
// Display (largest)
<h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl" />

// Headings
<h1 className="text-3xl sm:text-4xl lg:text-5xl" />
<h2 className="text-2xl sm:text-3xl lg:text-4xl" />
<h3 className="text-xl sm:text-2xl lg:text-3xl" />

// Body text
<p className="text-sm sm:text-base lg:text-lg" />
<span className="text-xs sm:text-sm" />
```

**Responsive Text Patterns:**

See `lib/styles/responsive-patterns.ts` for pre-defined combinations:

```typescript
import { RESPONSIVE_TEXT } from '@/lib/styles/responsive-patterns';

<h1 className={RESPONSIVE_TEXT.display} />   // Hero text
<h2 className={RESPONSIVE_TEXT.h1} />        // Main heading
<p className={RESPONSIVE_TEXT.body} />       // Body copy
```

### Line Heights

```css
--line-height-tight: 1.25;                   /* Headings */
--line-height-snug: 1.375;                   /* Subheadings */
--line-height-normal: 1.5;                   /* Body */
--line-height-relaxed: 1.625;                /* Long-form */
--line-height-loose: 1.75;                   /* Extra spacing */
```

**Tailwind Classes:**
```tsx
<h1 className="leading-tight" />             // 1.25
<p className="leading-relaxed" />            // 1.625
```

### Measure Constraints (Character-Per-Line)

```css
--measure-narrow: 45ch;                      /* UI text, captions */
--measure-default: 65ch;                     /* Body copy, paragraphs */
--measure-wide: 80ch;                        /* Long-form articles */
```

**Optimal Reading Widths:**
```tsx
<p className="max-w-[45ch]" />               // Narrow (UI)
<article className="max-w-[65ch]" />         // Default (body)
<div className="max-w-[80ch]" />             // Wide (articles)
```

---

## Spacing Tokens

### Base Spacing Scale (6 tokens)

```css
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
```

**Tailwind Classes:**
```tsx
<div className="p-1" />   // 4px padding
<div className="m-2" />   // 8px margin
<div className="gap-4" /> // 16px gap
```

### Responsive Padding Tokens

**From `lib/styles/responsive-patterns.ts`:**

```typescript
export const RESPONSIVE_PADDING = {
  none: '',
  xs: 'p-2 sm:p-3',                          // 8px → 12px
  sm: 'p-4 sm:p-6',                          // 16px → 24px
  md: 'p-6 sm:p-8',                          // 24px → 32px
  lg: 'p-6 sm:p-8 lg:p-12',                  // 24px → 32px → 48px
  xl: 'p-8 sm:p-12 lg:p-16',                 // 32px → 48px → 64px
};
```

**Usage:**
```tsx
import { RESPONSIVE_PADDING } from '@/lib/styles/responsive-patterns';

<BaseCard paddingSize="md" />                // Uses p-6 sm:p-8
<div className={RESPONSIVE_PADDING.lg} />    // Manual application
```

**Directional Padding:**

```typescript
// Horizontal only
RESPONSIVE_PADDING_X.sm = 'px-4 sm:px-6';

// Vertical only
RESPONSIVE_PADDING_Y.md = 'py-6 sm:py-8';
```

### Responsive Gap Tokens

```typescript
export const RESPONSIVE_GAP = {
  xs: 'gap-1 sm:gap-2',                      // 4px → 8px
  sm: 'gap-2 sm:gap-3 lg:gap-4',             // 8px → 12px → 16px
  md: 'gap-4 sm:gap-6 lg:gap-8',             // 16px → 24px → 32px
  lg: 'gap-6 sm:gap-8 lg:gap-12',            // 24px → 32px → 48px
  xl: 'gap-8 sm:gap-12 lg:gap-16',           // 32px → 48px → 64px
};
```

**Usage:**
```tsx
<div className={RESPONSIVE_GAP.md}>          // 16px → 24px → 32px
  <Card />
  <Card />
</div>
```

### Responsive Margins

```typescript
// Bottom margins
export const RESPONSIVE_MARGIN_BOTTOM = {
  sm: 'mb-4 sm:mb-6',
  md: 'mb-8 sm:mb-10 lg:mb-12',
  lg: 'mb-12 sm:mb-16 lg:mb-20',
  xl: 'mb-16 sm:mb-20 lg:mb-24',
};

// Top margins (same scale)
export const RESPONSIVE_MARGIN_TOP = { ... };
```

---

## Responsive Patterns

### Breakpoints

**Standardized across design system (matches Tailwind defaults):**

```css
--breakpoint-sm: 480px;                      /* Mobile → Tablet */
--breakpoint-md: 768px;                      /* Tablet → Desktop */
--breakpoint-lg: 1024px;                     /* Desktop → Large */
--breakpoint-xl: 1280px;                     /* Large → XL */
```

**Tailwind Breakpoint Classes:**
```tsx
<div className="hidden sm:block md:flex lg:grid" />
```

### Grid Patterns

```typescript
export const RESPONSIVE_GRID_COLS = {
  1: 'grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};
```

**Usage:**
```tsx
<div className={`grid ${RESPONSIVE_GRID_COLS[3]}`}>
  <Card />
  <Card />
  <Card />
</div>
```

### Container Patterns

```typescript
export const RESPONSIVE_CONTAINER = {
  default: 'mx-auto px-6 sm:px-8 lg:px-12',
  narrow: 'mx-auto px-6 sm:px-8 lg:px-12 max-w-3xl',
  wide: 'mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl',
};
```

**Usage:**
```tsx
<main className={RESPONSIVE_CONTAINER.wide}>
  {/* Content */}
</main>
```

---

## Semantic Color System

**From `lib/design-tokens/semantic-colors.ts`**

### Status Colors (Project Lifecycle)

```typescript
export const STATUS_COLORS = {
  'In Development': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  'Active': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  'Spinout': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  'Archived': { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' },
  'Completed': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  'On Hold': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
} as const;

export type StatusKey = keyof typeof STATUS_COLORS;
```

**Usage:**
```tsx
import { StatusBadge } from '@/components/ui/Badge';

<StatusBadge status="Active" size="md" />
<StatusBadge status="In Development" size="sm" />
```

### Category Colors (Content Classification)

```typescript
export const CATEGORY_COLORS = {
  'Product': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  'AI': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  'Design': { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-200' },
  'Strategy': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  'Process': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  'Engineering': { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200' },
} as const;

export type CategoryKey = keyof typeof CATEGORY_COLORS;
```

**Usage:**
```tsx
import { CategoryBadge } from '@/components/ui/Badge';

<CategoryBadge category="Product" size="md" />
<CategoryBadge category="AI" size="sm" />
```

### Priority Colors (Task Urgency)

```typescript
export const PRIORITY_COLORS = {
  'Critical': { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/20' },
  'High': { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-500/20' },
  'Medium': { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-500/20' },
  'Low': { bg: 'bg-green-500/10', text: 'text-green-600', border: 'border-green-500/20' },
  'None': { bg: 'bg-gray-500/10', text: 'text-gray-600', border: 'border-gray-500/20' },
} as const;

export type PriorityKey = keyof typeof PRIORITY_COLORS;
```

**Usage:**
```tsx
import { PriorityBadge } from '@/components/ui/Badge';

<PriorityBadge priority="High" size="sm" />
<PriorityBadge priority="Medium" size="md" />
```

### Checkpoint Type Colors (Milestones)

```typescript
export const CHECKPOINT_TYPE_COLORS = {
  'design': { bg: 'bg-green-500/10', text: 'text-green-600', border: 'border-green-500/20' },
  'data': { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-500/20' },
  'technical': { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-500/20' },
  'integration': { bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-500/20' },
  'qa': { bg: 'bg-pink-500/10', text: 'text-pink-600', border: 'border-pink-500/20' },
  'launch': { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/20' },
} as const;

export type CheckpointType = keyof typeof CHECKPOINT_TYPE_COLORS;
```

**Usage:**
```tsx
import { CheckpointBadge } from '@/components/ui/Badge';

<CheckpointBadge type="design" size="sm" />
<CheckpointBadge type="technical" size="md" />
```

### Project Status Colors (Product Delivery Stages)

```typescript
export const PROJECT_STATUS_COLORS = {
  'live': { bg: 'bg-green-500/10', text: 'text-green-600', border: 'border-green-500/20', label: 'LIVE' },
  'beta': { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-500/20', label: 'BETA' },
  'delivered': { bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-500/20', label: 'DELIVERED' },
  'building': { bg: 'bg-yellow-500/10', text: 'text-yellow-600', border: 'border-yellow-500/20', label: 'BUILDING' },
} as const;

export type ProjectStatusKey = keyof typeof PROJECT_STATUS_COLORS;
```

**Usage:**
```tsx
import { ProjectStatusBadge } from '@/components/ui/Badge';

<ProjectStatusBadge status="live" size="md" />
<ProjectStatusBadge status="building" size="sm" />
```

---

## Usage Guidelines

### Color Best Practices

**✅ DO:**
- Use terminal-gold for primary CTAs and active states
- Use semantic colors for badges (StatusBadge, CategoryBadge, etc.)
- Use neutral grays for backgrounds and borders
- Maintain WCAG AA contrast ratios (4.5:1 for text, 3:1 for UI)

**❌ DON'T:**
- Use hardcoded hex colors (e.g., `#FFD700`) - use tokens instead
- Mix multiple accent colors in single component
- Use low-contrast color combinations
- Override semantic badge colors with custom styles

### Typography Best Practices

**✅ DO:**
- Use responsive text patterns from `RESPONSIVE_TEXT`
- Apply proper line heights for text types (tight for headings, relaxed for body)
- Set max-width on long-form text (45-65ch)
- Use fluid type scale for smooth viewport transitions

**❌ DON'T:**
- Use fixed font sizes (e.g., `text-2xl` only) - add responsive variants
- Set paragraph widths wider than 80ch
- Mix font families within same content block
- Override fluid type scale with fixed sizes

### Spacing Best Practices

**✅ DO:**
- Use responsive padding tokens from `RESPONSIVE_PADDING`
- Apply consistent gap patterns in grids/flexbox
- Scale spacing across breakpoints (mobile → tablet → desktop)
- Use section padding tokens for page-level spacing

**❌ DON'T:**
- Use arbitrary values (e.g., `p-[13px]`) - stick to design scale
- Mix fixed and responsive spacing in same component
- Use margin for component internal spacing - prefer padding
- Create spacing tokens outside the 6-token base scale

---

## Migration Guide

### From Hardcoded Colors to Tokens

**Before (Phase 3):**
```tsx
<button className="bg-[#FFD700] hover:bg-[#FFE34D]">
  Click me
</button>
```

**After (Phase 4):**
```tsx
<button className="bg-terminal-gold hover:bg-terminal-gold-hover">
  Click me
</button>
```

**Migration Script:**
```bash
# Automated migration (23 instances per run)
node scripts/migrate-terminal-gold.js --execute

# Check remaining instances
grep -r "#FFD700" app/ components/ --exclude-dir=node_modules
```

### From Inline Badges to Semantic Components

**Before:**
```tsx
<span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase">
  LIVE
</span>
```

**After:**
```tsx
import { ProjectStatusBadge } from '@/components/ui/Badge';

<ProjectStatusBadge status="live" size="md" />
```

**Benefits:**
- Type-safe status values
- Centralized color management
- Consistent sizing across site
- Automatic WCAG compliance

### From Fixed Spacing to Responsive Patterns

**Before:**
```tsx
<div className="p-6">
  <h2 className="text-2xl mb-4">Title</h2>
  <p className="text-base">Content</p>
</div>
```

**After:**
```tsx
import { RESPONSIVE_PADDING, RESPONSIVE_TEXT } from '@/lib/styles/responsive-patterns';

<div className={RESPONSIVE_PADDING.md}>
  <h2 className={`${RESPONSIVE_TEXT.h2} mb-4`}>Title</h2>
  <p className={RESPONSIVE_TEXT.body}>Content</p>
</div>
```

**Benefits:**
- Automatic scaling across breakpoints
- Consistent component sizing
- Mobile-first responsive design
- Reduced CSS bloat

---

## Component Gallery

View live examples of all design tokens in action:

**URL:** `/design-system`

**Page Contents:**
- BaseCard variants (default, featured, interactive, cta)
- Badge system (status, category, priority, checkpoint, project)
- Button hierarchy (primary, secondary, tertiary)
- Real-world component examples

---

## Tools and Scripts

### Migration Scripts

**Terminal Gold Migration:**
```bash
# Dry run (preview changes)
node scripts/migrate-terminal-gold.js --dry-run

# Execute migration
node scripts/migrate-terminal-gold.js --execute

# Check results
npm run build
```

**Button Migration:**
```bash
# Preview button migrations
node scripts/migrate-inline-buttons.js --dry-run

# Execute migrations
node scripts/migrate-inline-buttons.js --execute
```

### Development Tools

**Live Design System:**
```bash
# Start dev server
npm run dev

# Visit component gallery
open http://localhost:3000/design-system
```

**Visual Regression Tests:**
```bash
# Run visual tests
npm run test:visual

# With Percy visual diffing
export PERCY_TOKEN=your_token
npm run test:visual:percy
```

---

## References

### Documentation
- **Badge API**: `docs/components/BADGE_API.md`
- **BaseCard Usage**: `docs/components/BASECARD_USAGE.md`
- **Phase 4 Report**: `docs/reports/PHASE_4_COMPLETION_REPORT.md`
- **Visual Testing**: `docs/testing/VISUAL_REGRESSION_STRATEGY.md`

### Source Files
- **CSS Tokens**: `app/globals.css`
- **Semantic Colors**: `lib/design-tokens/semantic-colors.ts`
- **Responsive Patterns**: `lib/styles/responsive-patterns.ts`
- **BaseCard Component**: `components/ui/BaseCard.tsx`
- **Badge Components**: `components/ui/Badge.tsx`
- **Button Components**: `components/ui/ButtonHierarchy.tsx`

### External Resources
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **WCAG Contrast Guidelines**: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
- **Fluid Typography**: https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/

---

**Document Version:** 1.0
**Last Review:** December 10, 2025
**Status:** ✅ Complete
**Next Review:** Q1 2026

