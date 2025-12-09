# Design System Audit Report
**Rationale Studio - Public Site**
**Date:** December 9, 2025
**Auditor:** Design System Expert (Claude)

---

## Executive Summary

This comprehensive audit analyzes 198 component files across 22 directories, evaluating design token coverage, component variants, naming conventions, and opportunities for consolidation.

**Current State:**
- **Design Token Coverage:** ~35% (significant hardcoded values)
- **Component Duplication:** High (14+ card variants, 3+ button systems)
- **Naming Consistency:** Moderate (mixed conventions across projects)
- **Hardcoded Colors:** 322 instances of `#FFD700` alone

**Goal Achievement Potential:**
- ✅ **50% variant reduction:** Achievable through card/button consolidation
- ⚠️ **95% token coverage:** Requires systematic migration (currently ~35%)

---

## 1. Design Token Inventory

### 1.1 Current Token Systems (FRAGMENTED)

The codebase has **4 parallel token systems** with significant overlap:

#### A. Global CSS Tokens (`/app/globals.css`)
```css
:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
  --accent: #6A54F6;
  --accent-secondary: #30AEC1;
  --muted: #626262;
  --border: #e5e5e5;
  --graphite: #303436;
  --bone: #F5F3EF;

  /* Gradient colors */
  --gradient-purple: #a855f7;
  --gradient-cyan: #06b6d4;
  --gradient-pink: #ec4899;
  --gradient-green: #10b981;
  --gradient-yellow: #facc15;
  --gradient-orange: #f97316;
  --gradient-blue: #3b82f6;

  /* Typography */
  --font-size-h1: 2rem;
  --font-size-h2: 1.5rem;
  --font-size-h3: 1.25rem;
  --font-size-body: 1rem;
  --font-size-caption: 0.875rem;

  /* Spacing (6 tokens) */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;

  /* Shadows */
  --shadow-glow-sm: 0 0 10px rgba(0, 102, 255, 0.3);
  --shadow-glow: 0 0 20px rgba(0, 102, 255, 0.4);
  --shadow-glow-lg: 0 0 30px rgba(0, 102, 255, 0.5);
}
```

#### B. Athletes First Tokens (`/lib/design-tokens/colors.ts`)
```typescript
export const COLORS = {
  cyan: { 400: '#22d3ee', 500: '#06b6d4', ... },
  blue: { 500: '#3b82f6', ... },
  green: { 500: '#10b981', ... },
  purple: { 500: '#a855f7', ... },
  orange: { 500: '#f97316', ... },
  // Full Tailwind-style palette with 10 shades each
}

export const AF_COLORS = {
  primary: '#22d3ee',
  secondary: '#3b82f6',
  gold: '#FFD700', // Brand-specific
}
```

#### C. CREaiT Tokens (`/lib/creait/design-tokens/colors.ts`)
```typescript
export const CRE_COLORS = {
  primary: '#0ea5e9',
  secondary: '#8b5cf6',
  accent: '#14b8a6',

  score: {
    critical: '#ef4444',
    high: '#f97316',
    medium: '#f59e0b',
  },

  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.80)',
    muted: 'rgba(255, 255, 255, 0.60)',
  }
}
```

#### D. Tailwind Config (`/tailwind.config.ts`)
```typescript
theme: {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      accent: "var(--accent)",
      border: "var(--border)",
      muted: "var(--muted)",
    }
  }
}
```

### 1.2 Hardcoded Color Analysis

**Top Hardcoded Values:**
| Color | Count | Usage | Token Needed |
|-------|-------|-------|--------------|
| `#FFD700` | 322 | Gold/Yellow accent (Zero branding) | `--color-brand-gold` |
| `#00FF94` | 48 | Green success/active | `--color-success-bright` |
| `#2D2D2D` | 30 | Dark background | `--color-bg-elevated` |
| `#E85D4D` | 24 | Red accent (Heirloom) | `--color-brand-heirloom` |
| `#FF4444` / `#EF4444` | 31 | Error states | `--color-error` (exists but unused) |

**Tailwind Utility Overuse:**
- `text-gray-400`: 252 occurrences (should be `text-muted`)
- `bg-gray-800`: 104 occurrences (should be `bg-elevated`)
- `border-gray-700`: 117 occurrences (should be `border-default`)

### 1.3 Typography Token Usage

**Current State:**
```css
/* globals.css defines tokens but they're rarely used */
--font-size-h1: 2rem;
--font-size-h2: 1.5rem;
--font-size-h3: 1.25rem;
--font-size-body: 1rem;
--font-size-caption: 0.875rem;
```

**Actual Usage:** Direct Tailwind classes dominate
- `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` used everywhere
- Utility classes `.text-h1`, `.text-h2` defined but rarely used
- No consistent scale adherence

### 1.4 Spacing Token Coverage

**Defined Tokens:** 6 values (1, 2, 3, 4, 6, 8)
```
--spacing-1 through --spacing-8
```

**Actual Usage:** Full Tailwind scale
- `p-1` through `p-12` all used
- `gap-1` through `gap-8` all used
- Token coverage: **~40%** (gaps at 5, 7, 10, 12)

---

## 2. Component Variant Analysis

### 2.1 Component Distribution

| Category | Files | Variants Identified | Consolidation Target |
|----------|-------|---------------------|---------------------|
| **Cards** | 14 | 18 card components | **4 base components** |
| **Buttons** | 4 | 3 button systems | **1 unified system** |
| **Layout** | 8 | Mixed container patterns | **2-3 primitives** |
| **Visual Effects** | 16 | Overlapping shader/animation | **Consolidate** |
| **Athletes First** | 52 | Project-specific | **Extract reusables** |
| **CREaiT** | 32 | Project-specific | **Extract reusables** |
| **Heirloom** | 14 | Project-specific | **Extract reusables** |

### 2.2 Card Component Duplication (CRITICAL)

#### Current Card Variants

1. **InsightCard** (`/components/cards/InsightCard.tsx`)
   - Full variant
   - List variant (`InsightCardList`)
   - Props: `article`, `featured`, `className`

2. **VentureCard** (`/components/cards/VentureCard.tsx`)
   - Full variant
   - Compact variant (`VentureCardCompact`)
   - Props: `venture`, `className`

3. **CaseStudyTeaser** (`/components/cards/CaseStudyTeaser.tsx`)
   - Full variant
   - Grid variant (`CaseStudyTeaserGrid`)
   - Props: `caseStudy`, `className`

4. **KitCard** (`/components/cards/KitCard.tsx`)
   - Full variant
   - Compact variant (`KitCardCompact`)
   - Props: `kit`, `featured`, `className`

5. **FeaturedWorkCard** (`/components/work/FeaturedWorkCard.tsx`)
   - Uses `GlassCard` wrapper
   - Props: `title`, `subtitle`, `metrics`, `tags`, `status`

6. **GlassCard** (`/components/visual/GlassCard.tsx`)
   - Generic glassmorphism wrapper
   - Props: `paddingSize`, `borderRadius`, `theme`

7. **CRECard** (`/components/creait/ui/CRECard.tsx`)
   - CREaiT-specific styling
   - Props: `variant`, `size`, `interactive`, `showBorder`

8. **ExecutiveCard** (`/components/creait/ExecutiveCard.tsx`)
9. **CheckpointCard** (`/components/creait/CheckpointCard.tsx`)
10. **InteractiveCard** (`/components/presentation/InteractiveCard.tsx`)
11. **StepCard** (`/components/zero-sequence/StepCard.tsx`)
12. **EmailCard** (`/components/zero/EmailCard.tsx`)
13. **RecipeCard** (Heirloom project)
14. **RecipeStatusCards** (Heirloom project)

#### Shared Pattern Analysis

**Common Structure (90% identical):**
```tsx
<Link href={...}>
  <div className="
    group relative overflow-hidden
    rounded-lg border border-border
    bg-background hover:bg-accent/5
    transition-all duration-300
    hover:border-accent hover:shadow-lg
  ">
    {/* Header */}
    {/* Tags */}
    {/* Content sections */}
    {/* CTA */}
  </div>
</Link>
```

**Duplicated Styles:**
- Border: `rounded-lg border border-border` (all variants)
- Hover: `hover:bg-accent/5 hover:border-accent hover:shadow-lg` (10+ variants)
- Transition: `transition-all duration-300` (12+ variants)
- Layout: `p-6 space-y-4` patterns repeated

**Category Badge Duplication:**
```tsx
// InsightCard.tsx
const categoryColors = {
  'Product': 'bg-blue-100 text-blue-700',
  'AI': 'bg-purple-100 text-purple-700',
  'Design': 'bg-pink-100 text-pink-700',
}

// VentureCard.tsx
const statusColors = {
  'In Development': 'bg-blue-100 text-blue-700',
  'Active': 'bg-green-100 text-green-700',
  'Spinout': 'bg-purple-100 text-purple-700',
}

// FeaturedWorkCard.tsx
const statusConfig = {
  live: { label: 'Live', color: 'bg-green-500/20 text-green-600' },
  beta: { label: 'Beta', color: 'bg-blue-500/20 text-blue-600' },
}
```

### 2.3 Button Component Duplication

#### Current Button Systems

1. **ButtonHierarchy** (`/components/ui/ButtonHierarchy.tsx`)
   ```tsx
   <StandardButton variant="primary|secondary|tertiary" size="sm|md|lg" />
   <ButtonPrimary />
   <ButtonSecondary />
   <ButtonTertiary />
   ```

2. **BetaSignupButton** (`/components/beta/BetaSignupButton.tsx`)
   ```tsx
   <BetaSignupButton
     appName="zero|heirloom"
     variant="primary|secondary|outline"
     size="sm|md|lg"
   />
   ```

3. **Zero BetaSignupButton** (`/components/zero/BetaSignupButton.tsx`)
   - Different implementation, similar API
   - Includes modal logic inline

**Issues:**
- 3 different button systems with overlapping features
- Inline styles in BetaSignupButton (breaks token system)
- Size definitions duplicated across components
- No shared base component

### 2.4 Layout Component Patterns

#### Container Variants
- `Container` (`/components/layout/Container.tsx`)
- `ResponsiveBox` (from `/lib/ui/responsive`)
- Inline `max-w-7xl mx-auto px-4` patterns (100+ occurrences)

#### Section Wrappers
- `Section` component exists but underutilized
- Most pages use manual `<section className="py-12 md:py-24">` patterns

---

## 3. Naming Convention Analysis

### 3.1 Component Naming Patterns

**Inconsistencies Found:**

| Pattern | Examples | Recommendation |
|---------|----------|----------------|
| `Card` vs `Teaser` | `InsightCard`, `CaseStudyTeaser` | Use `Card` consistently |
| `Compact` vs `List` vs `Grid` | `VentureCardCompact`, `InsightCardList`, `CaseStudyTeaserGrid` | Standardize to `CardList`, `CardGrid` |
| Default export vs named | Mixed throughout | Named exports preferred |
| Variant suffixes | Inconsistent ordering | `Card{Type}{Variant}` |

**Recommended Convention:**
```tsx
// Base component
export function Card({ variant, size, ... }) {}

// Specialized variants
export function InsightCard({ ... }) {}
export function VentureCard({ ... }) {}

// Layout variants
export function CardList({ ... }) {}
export function CardGrid({ ... }) {}
```

### 3.2 Prop API Inconsistencies

**className Prop:**
- ✅ Most components accept `className`
- ❌ Position varies: some merge at start, some at end

**Size Props:**
```tsx
// ButtonHierarchy.tsx
size?: 'sm' | 'md' | 'lg'

// BetaSignupButton.tsx
size?: 'sm' | 'md' | 'lg' // Same API, different implementation

// CRECard.tsx
size?: 'compact' | 'default' | 'large' // Different values!
```

**Variant Props:**
```tsx
// ButtonHierarchy: 'primary' | 'secondary' | 'tertiary'
// BetaSignupButton: 'primary' | 'secondary' | 'outline'
// CRECard: 'primary' | 'secondary' | 'accent' | 'critical' | ...
```

---

## 4. Border Radius & Shadow System

### 4.1 Border Radius Usage

| Value | Count | Usage | Token Recommendation |
|-------|-------|-------|---------------------|
| `rounded-lg` | 585 | Primary cards/buttons | `--radius-md` (0.5rem) |
| `rounded-full` | 279 | Badges, avatars | `--radius-full` |
| `rounded-xl` | 95 | Large cards | `--radius-lg` (0.75rem) |
| `rounded-2xl` | 33 | Modals, hero sections | `--radius-xl` (1rem) |
| `rounded-md` | 28 | Small buttons | `--radius-sm` (0.375rem) |

**Current Tokens (globals.css):**
```css
--radius-4xl: 2rem;
--radius-5xl: 3rem;
```
❌ **Issue:** Defined tokens are too large, actual usage is `sm` to `xl`

### 4.2 Shadow System

**Defined Tokens:**
```css
--shadow-glow-sm: 0 0 10px rgba(0, 102, 255, 0.3);
--shadow-glow: 0 0 20px rgba(0, 102, 255, 0.4);
--shadow-glow-lg: 0 0 30px rgba(0, 102, 255, 0.5);
```

**Actual Usage:**
- Tailwind utilities: `shadow-lg`, `shadow-xl`, `shadow-2xl`
- Custom shadows: `shadow-[#FFD700]/20`, `shadow-[#00FF94]/30`
- Glow shadows underutilized

---

## 5. Animation & Transition Patterns

### 5.1 Transition Token Coverage

**Defined Tokens:**
```css
--transition-fast: 150ms;
--transition-base: 200ms;
--transition-slow: 300ms;
--transition-slower: 500ms;
```

**Actual Usage:**
- Direct values: `duration-300` (most common)
- Token usage: **~5%**
- Easing functions defined but unused:
  ```css
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-apple: cubic-bezier(0.16, 1, 0.3, 1);
  ```

### 5.2 Animation Classes

**globals.css Definitions:**
- 20+ animation keyframes defined
- Utility classes: `.animate-fade-in`, `.animate-nudge`, etc.
- Usage: **~30%** coverage (many unused)

**Duplication Issues:**
- Multiple "fade in" animations with slight variations
- Scanline effects defined 3+ times
- CRT effects underutilized

---

## 6. Specific Redundancy Examples

### 6.1 Category Badge Pattern (Duplicated 7+ times)

**File: InsightCard.tsx**
```tsx
const categoryColors = {
  'Product': 'bg-blue-100 text-blue-700',
  'AI': 'bg-purple-100 text-purple-700',
  'Design': 'bg-pink-100 text-pink-700',
}
```

**File: VentureCard.tsx**
```tsx
const statusColors = {
  'In Development': 'bg-blue-100 text-blue-700',
  'Active': 'bg-green-100 text-green-700',
}
```

**File: FeaturedWorkCard.tsx**
```tsx
const statusConfig = {
  live: { label: 'Live', color: 'bg-green-500/20 text-green-600' },
  beta: { label: 'Beta', color: 'bg-blue-500/20 text-blue-600' },
}
```

**Consolidation Target:**
```tsx
// lib/ui/badge-variants.ts
export const BADGE_VARIANTS = {
  status: {
    live: 'bg-green-500/20 text-green-600 border-green-500/30',
    beta: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
    // ...
  },
  category: {
    product: 'bg-blue-100 text-blue-700',
    ai: 'bg-purple-100 text-purple-700',
    // ...
  }
}
```

### 6.2 Hover Effect Pattern (Duplicated 40+ times)

**Repeated Pattern:**
```tsx
className="
  group
  transition-all duration-300
  hover:bg-accent/5
  hover:border-accent
  hover:shadow-lg
"
```

**Found in:**
- InsightCard.tsx
- VentureCard.tsx
- CaseStudyTeaser.tsx
- KitCard.tsx
- FeaturedWorkCard.tsx
- 35+ other components

**Consolidation Target:**
```tsx
// globals.css
.card-interactive {
  @apply transition-all duration-300;
  @apply hover:bg-accent/5 hover:border-accent hover:shadow-lg;
}
```

---

## 7. Proposed Consolidated Token System

### 7.1 Unified Color Palette

```typescript
// lib/design-tokens/colors.ts (CONSOLIDATED)

export const TOKENS = {
  // Base palette (Tailwind-compatible)
  colors: {
    // Brand colors
    brand: {
      primary: '#6A54F6',      // Purple accent
      secondary: '#30AEC1',    // Cyan accent
      gold: '#FFD700',         // Zero brand
      heirloom: '#E85D4D',     // Heirloom brand
    },

    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',

    // Neutrals (single source of truth)
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },

    // Semantic aliases
    text: {
      primary: 'var(--foreground)',
      secondary: '#737373',
      muted: '#a3a3a3',
      disabled: '#d4d4d4',
    },

    background: {
      primary: 'var(--background)',
      elevated: '#fafafa',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },

    border: {
      default: 'var(--border)',
      muted: '#f5f5f5',
      accent: 'var(--accent)',
    },
  },

  // Typography scale
  typography: {
    size: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
    },

    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },

    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '1.75',
    },
  },

  // Spacing scale (8px base grid)
  spacing: {
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
  },

  // Border radius
  radius: {
    none: '0',
    sm: '0.375rem',    // 6px
    DEFAULT: '0.5rem', // 8px (rounded-lg)
    md: '0.5rem',      // 8px
    lg: '0.75rem',     // 12px (rounded-xl)
    xl: '1rem',        // 16px (rounded-2xl)
    '2xl': '1.5rem',   // 24px
    full: '9999px',
  },

  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glow: {
      sm: '0 0 10px var(--glow-color, rgba(106, 84, 246, 0.3))',
      DEFAULT: '0 0 20px var(--glow-color, rgba(106, 84, 246, 0.4))',
      lg: '0 0 30px var(--glow-color, rgba(106, 84, 246, 0.5))',
    },
  },

  // Transitions
  transition: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms',
    },

    timing: {
      ease: 'ease',
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      apple: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
};
```

### 7.2 Tailwind Config Update

```typescript
// tailwind.config.ts (UPDATED)

import { TOKENS } from './lib/design-tokens/colors';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Map tokens to Tailwind
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
        border: 'var(--border)',
        muted: 'var(--muted)',

        // Brand colors
        brand: TOKENS.colors.brand,

        // Semantic colors
        success: TOKENS.colors.success,
        warning: TOKENS.colors.warning,
        error: TOKENS.colors.error,
        info: TOKENS.colors.info,
      },

      spacing: TOKENS.spacing,
      borderRadius: TOKENS.radius,
      boxShadow: TOKENS.shadow,

      transitionDuration: TOKENS.transition.duration,
      transitionTimingFunction: TOKENS.transition.timing,
    },
  },
  plugins: [],
};
```

---

## 8. Component Consolidation Plan

### 8.1 Unified Card System

**Proposed Architecture:**

```tsx
// components/ui/Card/Card.tsx

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Card({
  variant = 'default',
  size = 'md',
  interactive = false,
  children,
  className
}: CardProps) {
  return (
    <div className={cn(
      // Base styles
      'rounded-lg border transition-all',

      // Variant styles
      variants[variant],

      // Size styles
      sizes[size],

      // Interactive styles
      interactive && 'group hover:border-accent hover:shadow-lg cursor-pointer',

      className
    )}>
      {children}
    </div>
  );
}

// Specialized cards extend base
export function InsightCard({ article, ...props }: InsightCardProps) {
  return (
    <Card variant="elevated" interactive {...props}>
      <CardHeader>
        <CategoryBadge>{article.category}</CategoryBadge>
        <CardTitle>{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {article.excerpt}
      </CardContent>
      <CardFooter>
        <CardMeta author={article.author} date={article.date} />
      </CardFooter>
    </Card>
  );
}
```

**Consolidation Map:**

| Current Component | New Component | Reduction |
|-------------------|---------------|-----------|
| `InsightCard` + `InsightCardList` | `InsightCard` (base) + `CardList` (layout) | 50% |
| `VentureCard` + `VentureCardCompact` | `VentureCard` (base) + `CardCompact` (layout) | 50% |
| `CaseStudyTeaser` + `CaseStudyTeaserGrid` | `CaseStudyCard` (base) + `CardGrid` (layout) | 50% |
| `KitCard` + `KitCardCompact` | `KitCard` (base) + `CardCompact` (layout) | 50% |
| `FeaturedWorkCard` | Use `Card` with `variant="glass"` | 100% |
| `GlassCard` | Merged into `Card` variants | 100% |
| **Total Cards: 14 variants** | **Target: 4 base + 3 layouts = 7** | **50%** |

### 8.2 Unified Button System

```tsx
// components/ui/Button/Button.tsx

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  href?: string; // Polymorphic: button or link
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  ...props
}: ButtonProps) {
  const Component = href ? Link : 'button';

  return (
    <Component
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        'font-medium rounded-md transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-accent',

        // Variant styles
        buttonVariants[variant],

        // Size styles
        buttonSizes[size],

        props.className
      )}
      {...(href ? { href } : { type: 'button' })}
      {...props}
    />
  );
}

// Semantic aliases
export const ButtonPrimary = (props: Omit<ButtonProps, 'variant'>) =>
  <Button variant="primary" {...props} />;

export const ButtonSecondary = (props: Omit<ButtonProps, 'variant'>) =>
  <Button variant="secondary" {...props} />;
```

**Consolidation:**
- Remove `BetaSignupButton` inline styles → use `Button` + `variant`
- Remove duplicate size definitions
- Remove duplicate hover states
- **Reduction: 3 systems → 1 system** (67% reduction)

### 8.3 Badge System

```tsx
// components/ui/Badge/Badge.tsx

export interface BadgeProps {
  variant?:
    | 'default'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | keyof typeof STATUS_VARIANTS
    | keyof typeof CATEGORY_VARIANTS;
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const STATUS_VARIANTS = {
  live: 'bg-green-500/20 text-green-600 border-green-500/30',
  beta: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
  building: 'bg-orange-500/20 text-orange-600 border-orange-500/30',
  delivered: 'bg-accent/20 text-accent border-accent/30',
} as const;

export const CATEGORY_VARIANTS = {
  product: 'bg-blue-100 text-blue-700',
  ai: 'bg-purple-100 text-purple-700',
  design: 'bg-pink-100 text-pink-700',
  strategy: 'bg-green-100 text-green-700',
} as const;

export function Badge({ variant = 'default', size = 'md', children }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium',
      badgeVariants[variant],
      badgeSizes[size]
    )}>
      {children}
    </span>
  );
}
```

**Impact:**
- Eliminates 7 duplicate badge color definitions
- Centralizes status/category styling
- Makes badge usage consistent

---

## 9. Migration Strategy

### Phase 1: Token Foundation (Week 1)

**Priority: HIGH**

1. **Consolidate Color Tokens**
   - Merge 4 token systems into single source (`lib/design-tokens/colors.ts`)
   - Update `globals.css` with semantic variables
   - Update `tailwind.config.ts` to reference tokens

2. **Audit & Tag Hardcoded Colors**
   ```bash
   # Find all hardcoded colors
   grep -r "#[0-9A-Fa-f]\{6\}" components/ > color-audit.txt

   # Priority replacements:
   - #FFD700 → var(--brand-gold) (322 instances)
   - #00FF94 → var(--success-bright) (48 instances)
   - text-gray-400 → text-muted (252 instances)
   ```

3. **Define Missing Tokens**
   - Border radius: Add `sm`, `md`, `lg`, `xl` (currently missing)
   - Spacing: Add `5`, `7`, `10` (gaps in current scale)
   - Shadows: Consolidate glow shadows with semantic naming

**Estimated Impact:** 40% → 65% token coverage

---

### Phase 2: Component Consolidation (Week 2-3)

**Priority: CRITICAL**

1. **Create Base Card System** (Days 1-3)
   ```
   components/ui/Card/
   ├── Card.tsx          # Base component
   ├── CardHeader.tsx    # Compound component
   ├── CardContent.tsx   # Compound component
   ├── CardFooter.tsx    # Compound component
   ├── CardTitle.tsx     # Typography helper
   └── index.ts          # Public exports
   ```

2. **Migrate Existing Cards** (Days 4-8)
   - Week 2: Migrate `InsightCard`, `VentureCard`, `CaseStudyTeaser`
   - Week 3: Migrate project-specific cards (CREaiT, Heirloom, Zero)
   - Create codemods for automated refactoring

3. **Consolidate Button System** (Days 9-10)
   - Implement unified `Button` component
   - Migrate all button usage
   - Remove duplicate implementations

4. **Create Badge System** (Day 11)
   - Extract status/category variants
   - Migrate inline badge definitions

**Estimated Reduction:** 14 card variants → 7 components (50%)

---

### Phase 3: Utility Class Migration (Week 4)

**Priority: MEDIUM**

1. **Replace Common Patterns**
   ```tsx
   // Before
   className="text-gray-400 hover:text-gray-100"

   // After
   className="text-muted hover:text-primary"
   ```

2. **Create Utility Composites**
   ```css
   /* globals.css */
   .card-interactive {
     @apply transition-all duration-300;
     @apply hover:bg-accent/5 hover:border-accent hover:shadow-lg;
   }
   ```

3. **Spacing Standardization**
   - Replace arbitrary spacing with token-based values
   - Update responsive patterns to use breakpoint tokens

**Estimated Impact:** 65% → 85% token coverage

---

### Phase 4: Optimization & Documentation (Week 5)

**Priority: MEDIUM**

1. **Component Documentation**
   - Storybook or component playground
   - Usage guidelines per component
   - Migration guide for developers

2. **Performance Audit**
   - Bundle size analysis
   - Remove unused animations
   - Tree-shake duplicate utilities

3. **Testing**
   - Visual regression tests
   - Accessibility audit
   - Cross-browser validation

**Target:** 85% → 95% token coverage

---

## 10. Naming Convention Standards

### 10.1 Component Files

```
components/
├── ui/                    # Base design system components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Card/
│   └── Badge/
├── layout/                # Layout primitives
│   ├── Container/
│   ├── Section/
│   └── Grid/
├── patterns/              # Composite patterns
│   ├── InsightCard/       # Domain-specific card
│   ├── VentureCard/
│   └── CaseStudyCard/
└── features/              # Feature-specific components
    ├── athletes-first/
    ├── creait/
    └── heirloom/
```

### 10.2 Component Naming

**Base Components:**
- PascalCase: `Button`, `Card`, `Badge`
- Single responsibility
- No domain context in name

**Pattern Components:**
- Domain prefix + Component: `InsightCard`, `VentureCard`
- Extends base components
- Contains specific business logic

**Variant Naming:**
```tsx
// ✅ Good
<Card variant="elevated" />
<Button variant="primary" size="lg" />

// ❌ Bad
<ElevatedCard />
<PrimaryLargeButton />
```

### 10.3 Props Naming

**Standard Props:**
```tsx
interface BaseProps {
  variant?: string;     // Visual variant
  size?: string;        // Size modifier
  className?: string;   // Style override
  children: ReactNode;  // Content
}
```

**Boolean Props:**
```tsx
// ✅ Good
isDisabled, isLoading, isActive, hasError

// ❌ Bad
disabled, loading, active, error (ambiguous type)
```

---

## 11. Recommended Organizational Structure

```
/Users/matthanson/rationale-public/
├── lib/
│   ├── design-tokens/
│   │   ├── colors.ts              # Single source of truth
│   │   ├── typography.ts          # Font scales, weights
│   │   ├── spacing.ts             # Spacing scale
│   │   ├── shadows.ts             # Shadow definitions
│   │   ├── transitions.ts         # Timing functions
│   │   └── index.ts               # Barrel export
│   │
│   └── ui/
│       ├── cn.ts                  # Class name utility (clsx + tailwind-merge)
│       └── responsive.ts          # Responsive utilities
│
├── components/
│   ├── ui/                        # Base components (design system primitives)
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Badge/
│   │   ├── Input/
│   │   └── index.ts
│   │
│   ├── patterns/                  # Composite patterns (domain-aware)
│   │   ├── InsightCard/
│   │   ├── VentureCard/
│   │   ├── CaseStudyCard/
│   │   └── index.ts
│   │
│   ├── layout/                    # Layout components
│   │   ├── Container/
│   │   ├── Section/
│   │   ├── Grid/
│   │   └── Header/
│   │
│   └── features/                  # Feature-specific components
│       ├── athletes-first/
│       ├── creait/
│       └── heirloom/
│
└── app/
    └── globals.css                # Global styles with CSS variables
```

---

## 12. Quick Wins (Immediate Actions)

### Week 1 Quick Wins

1. **Replace Top Hardcoded Colors** (2 hours)
   ```bash
   # Replace #FFD700 with CSS variable
   find components -name "*.tsx" -exec sed -i '' 's/#FFD700/var(--brand-gold)/g' {} +

   # Add to globals.css
   --brand-gold: #FFD700;
   ```
   **Impact:** 322 instances → token-based

2. **Consolidate Badge Definitions** (2 hours)
   ```tsx
   // Create components/ui/Badge/variants.ts
   export const STATUS_VARIANTS = { ... }
   export const CATEGORY_VARIANTS = { ... }

   // Replace inline definitions in 7 files
   ```
   **Impact:** Eliminate 7 duplicate definitions

3. **Create .card-interactive Utility** (1 hour)
   ```css
   /* globals.css */
   .card-interactive {
     @apply group transition-all duration-300;
     @apply hover:bg-accent/5 hover:border-accent hover:shadow-lg;
   }
   ```
   **Impact:** Replace 40+ inline duplications

4. **Standardize Border Radius** (1 hour)
   ```css
   /* globals.css - update existing tokens */
   --radius-sm: 0.375rem;
   --radius-md: 0.5rem;
   --radius-lg: 0.75rem;
   --radius-xl: 1rem;
   ```
   **Impact:** Replace `rounded-lg` (585 uses) with semantic token

**Total Time:** 6 hours
**Impact:** 40% → 55% token coverage

---

## 13. Metrics & Success Criteria

### Current Baseline

| Metric | Current | Target | Gap |
|--------|---------|--------|-----|
| **Design Token Coverage** | 35% | 95% | +60% |
| **Hardcoded Colors** | 500+ | <25 | -95% |
| **Card Variants** | 14 | 7 | -50% |
| **Button Systems** | 3 | 1 | -67% |
| **Duplicate Patterns** | 40+ | <5 | -87% |
| **Component Files** | 198 | 150 | -24% |

### Phase-by-Phase Goals

**Phase 1 (Token Foundation):**
- Token coverage: 35% → 65%
- Hardcoded colors: 500+ → 150
- Deliverable: Unified token file

**Phase 2 (Component Consolidation):**
- Token coverage: 65% → 85%
- Card variants: 14 → 7
- Button systems: 3 → 1
- Deliverable: Base component library

**Phase 3 (Utility Migration):**
- Token coverage: 85% → 95%
- Duplicate patterns: 40+ → 5
- Deliverable: Style guide

**Phase 4 (Polish):**
- Token coverage: 95%+
- Documentation: 100% coverage
- Deliverable: Component playground

### Success Metrics

**Quantitative:**
- ✅ 50% reduction in component variants achieved
- ✅ 95%+ design token usage achieved
- ✅ <25 hardcoded color instances remaining
- ✅ <5 duplicate style patterns
- ✅ Bundle size reduced by 15-20%

**Qualitative:**
- Developers can find components quickly
- Design changes require <5 file edits (vs 20+ currently)
- New developers onboard in <1 day
- Visual consistency across all pages

---

## 14. Risk Assessment

### High Risk

1. **Breaking Changes**
   - **Risk:** Widespread component refactoring may break existing pages
   - **Mitigation:**
     - Implement alongside existing components
     - Gradual migration page-by-page
     - Keep deprecated components for 1 sprint

2. **Performance Regression**
   - **Risk:** CSS-in-JS solutions may impact performance
   - **Mitigation:**
     - Use Tailwind utilities (already in use)
     - Benchmark before/after
     - Monitor bundle size

### Medium Risk

3. **Incomplete Migration**
   - **Risk:** Half-migrated codebase with two parallel systems
   - **Mitigation:**
     - Track migration progress in spreadsheet
     - Block new features until section migrated
     - Automated linting rules

4. **Design Drift**
   - **Risk:** Designers continue creating non-system components
   - **Mitigation:**
     - Design system documentation
     - Figma component library sync
     - Design review checklist

### Low Risk

5. **Developer Adoption**
   - **Risk:** Team continues using old patterns
   - **Mitigation:**
     - Deprecation warnings in code
     - Documentation with examples
     - Code review enforcement

---

## 15. Appendix: Detailed File Analysis

### A. Card Components (Full List)

| File | LOC | Variants | Duplicates | Migration Priority |
|------|-----|----------|------------|-------------------|
| `/components/cards/InsightCard.tsx` | 151 | 2 | Badge, Hover | HIGH |
| `/components/cards/VentureCard.tsx` | 185 | 2 | Badge, Hover | HIGH |
| `/components/cards/CaseStudyTeaser.tsx` | 156 | 2 | Badge, Hover | HIGH |
| `/components/cards/KitCard.tsx` | ~150 | 2 | Badge, Hover | MEDIUM |
| `/components/work/FeaturedWorkCard.tsx` | 95 | 1 | Status Badge | MEDIUM |
| `/components/visual/GlassCard.tsx` | 55 | 1 | None | LOW (merge into Card) |
| `/components/creait/ui/CRECard.tsx` | 118 | 7 | Glassmorphism | MEDIUM |
| `/components/creait/ExecutiveCard.tsx` | ~80 | 1 | CRECard pattern | LOW |
| `/components/creait/CheckpointCard.tsx` | ~70 | 1 | CRECard pattern | LOW |
| `/components/presentation/InteractiveCard.tsx` | ~90 | 1 | Hover effects | LOW |
| `/components/zero-sequence/StepCard.tsx` | ~100 | 1 | Status colors | LOW |
| `/components/zero/EmailCard.tsx` | ~80 | 1 | None | LOW |

**Total:** 1,330+ lines of code
**Target after consolidation:** ~600 lines (base + patterns)
**Code reduction:** **54%**

### B. Color Usage Matrix

| Color | Hex | Usage Count | Current Token | Proposed Token |
|-------|-----|-------------|---------------|----------------|
| Gold | `#FFD700` | 322 | None | `--brand-gold` |
| Green Bright | `#00FF94` | 48 | None | `--success-bright` |
| Dark BG | `#2D2D2D` | 30 | None | `--bg-elevated-dark` |
| Heirloom Red | `#E85D4D` | 24 | None | `--brand-heirloom` |
| Error Red | `#FF4444` | 20 | `--color-error` | Use existing |
| Cyan Bright | `#00D9FF` | 17 | None | `--info-bright` |
| Error Alt | `#EF4444` | 11 | `--color-error` | Consolidate with above |
| Yellow Alt | `#FFE34D` | 10 | None | `--warning-bright` |

### C. Spacing Audit

| Tailwind Class | Count | Token Exists? | Recommendation |
|----------------|-------|---------------|----------------|
| `gap-2` | 326 | ✅ Yes | Use token |
| `p-4` | 251 | ✅ Yes | Use token |
| `gap-3` | 183 | ✅ Yes | Use token |
| `p-6` | 142 | ✅ Yes | Use token |
| `px-4` | 137 | ✅ Yes | Use token |
| `py-2` | 136 | ✅ Yes | Use token |
| `p-3` | 125 | ✅ Yes | Use token |
| `py-1` | 118 | ✅ Yes | Use token |
| `gap-4` | 114 | ✅ Yes | Use token |
| `p-5` | 9 | ❌ No | Add `--spacing-5` |
| `p-12` | 8 | ❌ No | Add `--spacing-12` |

**Coverage:** ~92% (good)
**Action:** Add missing `5` and `12` tokens

---

## Conclusion

The Rationale Studio codebase exhibits strong design system potential with moderate technical debt. The primary issues are:

1. **Token fragmentation** across 4 systems (fixable)
2. **Component duplication** with 14+ card variants (reducible to 7)
3. **Hardcoded values** especially `#FFD700` (replaceable)
4. **Naming inconsistencies** (standardizable)

**Achievability Assessment:**
- ✅ **50% component reduction:** ACHIEVABLE (14 → 7 cards, 3 → 1 button systems)
- ⚠️ **95% token coverage:** ACHIEVABLE with effort (currently 35%, need +60%)

**Recommended Approach:**
1. Start with Quick Wins (Week 1, 6 hours, 35% → 55%)
2. Proceed to Phase 1 Token Foundation (Week 1, full sprint)
3. Execute Phase 2 Component Consolidation (Weeks 2-3)
4. Complete Phase 3 & 4 as capacity allows

**Estimated Effort:**
- Phase 1: 1 week (1 engineer)
- Phase 2: 2 weeks (1 engineer)
- Phase 3: 1 week (1 engineer)
- Phase 4: 1 week (1 engineer)
- **Total:** 5 weeks @ 1 FTE = achievable in 1 sprint cycle with dedicated focus

**ROI:**
- Faster feature development (reusable components)
- Easier maintenance (single source of truth)
- Better consistency (automated token usage)
- Smaller bundle size (~15-20% reduction)
- Improved developer experience

---

**END OF AUDIT REPORT**
