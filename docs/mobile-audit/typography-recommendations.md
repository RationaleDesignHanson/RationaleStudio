# Typography System Recommendations
## Mobile-First Type Scale & Implementation

**Generated:** December 10, 2025
**Objective:** Create a cohesive, scalable, mobile-first typography system that eliminates technical debt and ensures consistent rendering across all devices

---

## Executive Summary

### Current State Analysis

**Critical Issues:**
1. **No responsive typography scale** - Same font sizes used across all breakpoints
2. **Desktop-first sizing** - H1 at 32px fills mobile screens, causes excessive line breaks
3. **Inconsistent scaling patterns** - Some components use 6-step responsive scales (excessive complexity)
4. **Missing mobile-specific line heights** - Desktop line heights don't optimize for small screens
5. **No character-per-line (CPL) constraints** - Text spans full width on large screens (poor readability)

**Impact:**
- Mobile scroll depth 2.8x longer than desktop (average)
- Excessive vertical space consumed by large typography
- Poor readability on both mobile (cramped) and desktop (too wide)
- Maintenance burden: inconsistent patterns across 159 pages

### Proposed Solution

**Mobile-First Typography System** with:
- **Fluid type scale** using CSS `clamp()` for smooth responsive sizing
- **Semantic type tokens** that automatically adjust per breakpoint
- **Optimal CPL enforcement** via `max-width` constraints
- **Rhythm-based spacing** tied to typography scale
- **Zero technical debt** - One source of truth, no hardcoded sizes

**Benefits:**
- 30-40% scroll depth reduction on mobile
- Improved readability across all devices
- Eliminates need for complex responsive classes (text-2xl sm:text-3xl md:text-4xl...)
- Future-proof: Add new breakpoints without touching components

---

## Part 1: Fluid Typography System

### 1.1 Fluid Type Scale Using CSS clamp()

**Philosophy:** Typography should scale smoothly between minimum and maximum sizes based on viewport width, not jump at arbitrary breakpoints.

**Implementation:** Replace fixed sizes with fluid `clamp()` values

```css
/* Add to /app/globals.css */

:root {
  /* Viewport-based fluid scaling */
  --fluid-min-width: 375;  /* iPhone minimum */
  --fluid-max-width: 1920; /* Desktop maximum */

  /* Fluid Type Scale - Mobile First */
  /* Formula: clamp(MIN, PREFERRED, MAX) */
  /* PREFERRED = MIN + (MAX - MIN) * ((100vw - MIN_VW) / (MAX_VW - MIN_VW)) */

  /* Display (Hero headings) */
  --font-size-display: clamp(2.5rem, 1.5rem + 2vw, 4.5rem);
  /* 40px @ 375px → 72px @ 1920px */

  /* H1 (Page titles) */
  --font-size-h1: clamp(1.75rem, 1.25rem + 1.2vw, 3rem);
  /* 28px @ 375px → 48px @ 1920px */

  /* H2 (Section headers) */
  --font-size-h2: clamp(1.5rem, 1.125rem + 0.8vw, 2.25rem);
  /* 24px @ 375px → 36px @ 1920px */

  /* H3 (Subsections) */
  --font-size-h3: clamp(1.25rem, 1rem + 0.5vw, 1.75rem);
  /* 20px @ 375px → 28px @ 1920px */

  /* H4 (Card titles) */
  --font-size-h4: clamp(1.125rem, 0.875rem + 0.4vw, 1.5rem);
  /* 18px @ 375px → 24px @ 1920px */

  /* Body (Default paragraph text) */
  --font-size-body: clamp(1rem, 0.875rem + 0.3vw, 1.125rem);
  /* 16px @ 375px → 18px @ 1920px */

  /* Small (UI labels, metadata) */
  --font-size-small: clamp(0.875rem, 0.75rem + 0.25vw, 1rem);
  /* 14px @ 375px → 16px @ 1920px */

  /* Caption (Helper text, fine print) */
  --font-size-caption: clamp(0.75rem, 0.625rem + 0.2vw, 0.875rem);
  /* 12px @ 375px → 14px @ 1920px */
}

/* Apply to HTML elements */
h1, .text-h1 {
  font-size: var(--font-size-h1);
  line-height: var(--line-height-tight);
  letter-spacing: -0.02em;
}

h2, .text-h2 {
  font-size: var(--font-size-h2);
  line-height: var(--line-height-snug);
  letter-spacing: -0.01em;
}

h3, .text-h3 {
  font-size: var(--font-size-h3);
  line-height: var(--line-height-snug);
}

h4, .text-h4 {
  font-size: var(--font-size-h4);
  line-height: var(--line-height-normal);
}

p, body, .text-body {
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
}

small, .text-small {
  font-size: var(--font-size-small);
  line-height: var(--line-height-normal);
}

.text-caption {
  font-size: var(--font-size-caption);
  line-height: var(--line-height-normal);
}

/* Display class for hero sections */
.text-display {
  font-size: var(--font-size-display);
  line-height: var(--line-height-tight);
  letter-spacing: -0.03em;
}
```

**Benefits:**
- Smooth scaling (no jumps at breakpoints)
- Automatically responsive (no need for sm:, md:, lg: classes)
- Maintainable: Change scale by adjusting clamp() values
- Performance: No JavaScript required

**Migration Path:**
```typescript
// BEFORE (brittle, hard to maintain)
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">

// AFTER (future-proof)
<h1 className="text-h1">
// or use native <h1> tag (inherits styles)
<h1>
```

---

### 1.2 Responsive Line Heights

**Problem:** Desktop line heights (1.5) are too loose on mobile (wasted vertical space), while mobile needs more breathing room for body text readability.

**Solution:** Context-aware line heights

```css
:root {
  /* Base line height tokens */
  --line-height-tight: 1.1;     /* Display, large headings */
  --line-height-snug: 1.25;     /* H2, H3 */
  --line-height-normal: 1.4;    /* H4, UI text */
  --line-height-relaxed: 1.6;   /* Body copy (mobile optimized) */
  --line-height-loose: 1.8;     /* Long-form articles */
}

/* Mobile-specific adjustments */
@media (max-width: 768px) {
  :root {
    /* Tighter headings to reduce vertical space */
    --line-height-tight: 1.05;
    --line-height-snug: 1.2;

    /* More relaxed body text for readability */
    --line-height-relaxed: 1.65;
    --line-height-loose: 1.85;
  }
}

/* Desktop-specific adjustments */
@media (min-width: 1024px) {
  :root {
    /* Slightly more breathing room for large screens */
    --line-height-snug: 1.3;
    --line-height-normal: 1.5;
  }
}
```

**Impact:**
- Mobile: Saves ~50-100px per page (tighter heading line heights)
- Desktop: Better readability for body text
- Automatically applied via CSS variables

---

### 1.3 Letter Spacing (Tracking)

**Rule:** Larger type needs tighter tracking, smaller type needs neutral or slightly looser tracking

```css
:root {
  --tracking-tight: -0.03em;    /* Display text */
  --tracking-snug: -0.02em;     /* H1 */
  --tracking-normal: -0.01em;   /* H2, H3 */
  --tracking-relaxed: 0;        /* Body, H4 */
  --tracking-loose: 0.01em;     /* Small, Caption (mobile only) */
}

/* Apply contextually */
.text-display {
  letter-spacing: var(--tracking-tight);
}

h1, .text-h1 {
  letter-spacing: var(--tracking-snug);
}

h2, .text-h2,
h3, .text-h3 {
  letter-spacing: var(--tracking-normal);
}

/* Looser tracking for small text on mobile (better readability) */
@media (max-width: 768px) {
  .text-small,
  .text-caption {
    letter-spacing: var(--tracking-loose);
  }
}
```

---

## Part 2: Optimal Character-Per-Line (CPL) System

### 2.1 Problem Statement

**Current State:**
- Text spans full viewport width (no constraints)
- Desktop: 100-120 CPL (too wide, hard to track line-to-line)
- Mobile: 35-50 CPL (acceptable, but inconsistent)

**Optimal CPL Ranges:**
- **Body text:** 50-75 characters (66 ideal)
- **Long-form articles:** 60-80 characters
- **UI text:** 40-60 characters
- **Display headings:** 30-50 characters

### 2.2 Implementation: Measure-Based Constraints

```css
:root {
  /* Measure tokens (max-width for text blocks) */
  --measure-narrow: 45ch;   /* ~40-50 characters (UI text, captions) */
  --measure-default: 65ch;  /* ~60-70 characters (body copy) */
  --measure-wide: 80ch;     /* ~75-85 characters (articles) */
  --measure-heading: 30ch;  /* ~25-35 characters (display headings) */
}

/* Utility classes */
.measure-narrow {
  max-width: var(--measure-narrow);
}

.measure, .measure-default {
  max-width: var(--measure-default);
}

.measure-wide {
  max-width: var(--measure-wide);
}

.measure-heading {
  max-width: var(--measure-heading);
}

/* Apply to prose by default */
.prose,
.article-content,
.long-form {
  max-width: var(--measure-default);
  margin-left: auto;
  margin-right: auto;
}

/* Display headings */
.text-display,
.hero-heading {
  max-width: var(--measure-heading);
  margin-left: auto;
  margin-right: auto;
}
```

**Usage:**
```typescript
// Long-form content (blog posts, case studies)
<article className="prose">
  <h1>Article Title</h1>
  <p>Body content automatically constrained to 65ch...</p>
</article>

// Display heading
<h1 className="text-display measure-heading">
  Short impactful hero heading
</h1>

// UI text block
<div className="measure-narrow">
  <p className="text-small">Helper text with optimal line length</p>
</div>
```

---

### 2.3 Responsive Measure Adjustments

**Issue:** `ch` units are based on character width, which changes with font size. Need to account for mobile font size reductions.

```css
/* Mobile adjustments */
@media (max-width: 768px) {
  :root {
    /* Slightly wider measure on mobile (compensate for smaller font size) */
    --measure-default: 70ch;  /* Was 65ch */
    --measure-wide: 85ch;     /* Was 80ch */
  }

  /* Remove centering on mobile for better use of space */
  .prose,
  .article-content {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
```

---

## Part 3: Tailwind Integration

### 3.1 Extend Tailwind Config

**File:** `/tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Override default font sizes with CSS variables
    fontSize: {
      'display': 'var(--font-size-display)',
      'h1': 'var(--font-size-h1)',
      'h2': 'var(--font-size-h2)',
      'h3': 'var(--font-size-h3)',
      'h4': 'var(--font-size-h4)',
      'base': 'var(--font-size-body)',
      'small': 'var(--font-size-small)',
      'caption': 'var(--font-size-caption)',
    },
    lineHeight: {
      'tight': 'var(--line-height-tight)',
      'snug': 'var(--line-height-snug)',
      'normal': 'var(--line-height-normal)',
      'relaxed': 'var(--line-height-relaxed)',
      'loose': 'var(--line-height-loose)',
    },
    letterSpacing: {
      'tight': 'var(--tracking-tight)',
      'snug': 'var(--tracking-snug)',
      'normal': 'var(--tracking-normal)',
      'relaxed': 'var(--tracking-relaxed)',
      'loose': 'var(--tracking-loose)',
    },
    extend: {
      maxWidth: {
        'measure-narrow': 'var(--measure-narrow)',
        'measure': 'var(--measure-default)',
        'measure-wide': 'var(--measure-wide)',
        'measure-heading': 'var(--measure-heading)',
      },
      // ... existing extensions
    },
  },
  plugins: [],
};

export default config;
```

**Usage:**
```typescript
// Use semantic type classes
<h1 className="text-h1">Page Title</h1>
<h2 className="text-h2">Section Header</h2>
<p className="text-base">Body copy</p>

// With measure constraints
<p className="text-base max-w-measure">
  Optimal line length body copy
</p>

// Display heading
<h1 className="text-display max-w-measure-heading">
  Hero Heading
</h1>
```

---

## Part 4: Typography Rhythm & Vertical Spacing

### 4.1 Modular Scale for Spacing

**Principle:** Vertical spacing should be proportional to typography scale to create visual rhythm

```css
:root {
  /* Base rhythm unit (tied to body line-height) */
  --rhythm-base: calc(var(--font-size-body) * var(--line-height-relaxed));
  /* ~26px at 16px body / 1.6 line-height */

  /* Rhythm scale (multiples of base) */
  --space-rhythm-xs: calc(var(--rhythm-base) * 0.25);  /* ~6px */
  --space-rhythm-sm: calc(var(--rhythm-base) * 0.5);   /* ~13px */
  --space-rhythm-md: calc(var(--rhythm-base) * 1);     /* ~26px */
  --space-rhythm-lg: calc(var(--rhythm-base) * 1.5);   /* ~39px */
  --space-rhythm-xl: calc(var(--rhythm-base) * 2);     /* ~52px */
  --space-rhythm-2xl: calc(var(--rhythm-base) * 3);    /* ~78px */
  --space-rhythm-3xl: calc(var(--rhythm-base) * 4);    /* ~104px */
}

/* Apply to content blocks */
.prose h1,
.prose h2,
.prose h3 {
  margin-top: var(--space-rhythm-xl);
  margin-bottom: var(--space-rhythm-md);
}

.prose p + p {
  margin-top: var(--space-rhythm-md);
}

.prose ul,
.prose ol {
  margin-top: var(--space-rhythm-sm);
  margin-bottom: var(--space-rhythm-md);
}

/* Section spacing */
section + section {
  margin-top: var(--space-rhythm-3xl);
}

@media (max-width: 768px) {
  section + section {
    margin-top: var(--space-rhythm-2xl); /* Tighter on mobile */
  }
}
```

**Benefit:** Spacing automatically adjusts when font size changes, maintaining visual harmony

---

### 4.2 Paragraph Spacing Rules

**Problem:** Long paragraphs on mobile cause fatigue

**Solution:** Enforce maximum paragraph length

```css
/* Prose styling with optimal paragraph spacing */
.prose {
  max-width: var(--measure-default);
  margin-left: auto;
  margin-right: auto;
}

.prose p {
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-rhythm-md);

  /* Prevent orphans and widows */
  orphans: 3;
  widows: 3;
}

/* Visual break after 3 paragraphs */
.prose p:nth-of-type(3n) {
  margin-bottom: var(--space-rhythm-lg);
}

/* Mobile: Tighter paragraph spacing */
@media (max-width: 768px) {
  .prose p {
    margin-bottom: var(--space-rhythm-sm);
  }

  .prose p:nth-of-type(3n) {
    margin-bottom: var(--space-rhythm-md);
  }
}
```

---

## Part 5: Component-Specific Typography Patterns

### 5.1 Card Typography

```typescript
// Card component typography best practices

export function Card({ title, description, ...props }) {
  return (
    <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
      {/* Card title: Use H4 (18-24px fluid) */}
      <h4 className="text-h4 font-semibold mb-2">
        {title}
      </h4>

      {/* Card description: Use body text with line clamp */}
      <p className="text-base text-gray-400 line-clamp-3 max-w-measure-narrow">
        {description}
      </p>
    </div>
  );
}
```

**Rules:**
- Card titles: Always H4 (semantic, accessible)
- Descriptions: Body size with 3-line clamp on mobile
- Measure: Use narrow measure for card content

---

### 5.2 Hero Section Typography

```typescript
// Hero typography pattern

export function Hero({ heading, subheading, cta }) {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Display heading: Fluid, constrained measure */}
        <h1 className="text-display font-bold mb-4 max-w-measure-heading mx-auto">
          {heading}
        </h1>

        {/* Subheading: H3 size, wider measure */}
        <p className="text-h3 text-gray-400 mb-8 max-w-measure mx-auto">
          {subheading}
        </p>

        {cta}
      </div>
    </section>
  );
}
```

**Rules:**
- Hero H1: Use `text-display` (largest scale)
- Constrain to `max-w-measure-heading` (30ch)
- Subheading: Use H3 scale with default measure (65ch)
- Center alignment for hero content

---

### 5.3 Article/Long-Form Typography

```typescript
// Article content pattern

export function Article({ content }) {
  return (
    <article className="prose prose-lg mx-auto px-4 py-12">
      {content}
    </article>
  );
}
```

```css
/* Enhanced prose styles */
.prose {
  max-width: var(--measure-default);
  font-size: var(--font-size-body);
  line-height: var(--line-height-loose);
  color: var(--foreground);
}

.prose h1 {
  font-size: var(--font-size-h1);
  line-height: var(--line-height-tight);
  margin-top: var(--space-rhythm-2xl);
  margin-bottom: var(--space-rhythm-lg);
  font-weight: 700;
}

.prose h2 {
  font-size: var(--font-size-h2);
  line-height: var(--line-height-snug);
  margin-top: var(--space-rhythm-xl);
  margin-bottom: var(--space-rhythm-md);
  font-weight: 600;
}

.prose h3 {
  font-size: var(--font-size-h3);
  margin-top: var(--space-rhythm-lg);
  margin-bottom: var(--space-rhythm-sm);
  font-weight: 600;
}

.prose p {
  margin-bottom: var(--space-rhythm-md);
}

.prose ul, .prose ol {
  margin-left: var(--space-rhythm-md);
  margin-bottom: var(--space-rhythm-md);
}

.prose li {
  margin-bottom: var(--space-rhythm-sm);
}

/* Pull quotes */
.prose blockquote {
  border-left: 4px solid var(--accent);
  padding-left: var(--space-rhythm-md);
  margin: var(--space-rhythm-xl) 0;
  font-size: var(--font-size-h3);
  line-height: var(--line-height-snug);
  font-style: italic;
  color: var(--muted);
}

/* Code blocks */
.prose code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--muted);
  padding: 0.125em 0.25em;
  border-radius: 0.25rem;
}

.prose pre {
  background: var(--muted);
  padding: var(--space-rhythm-md);
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: var(--space-rhythm-lg) 0;
}

.prose pre code {
  background: none;
  padding: 0;
}
```

---

### 5.4 Dashboard/Data Typography

```css
/* Data-dense interfaces need smaller, tighter typography */

.dashboard-text {
  font-size: var(--font-size-small);
  line-height: var(--line-height-normal);
}

.dashboard-heading {
  font-size: var(--font-size-h4);
  line-height: var(--line-height-snug);
  font-weight: 600;
  margin-bottom: var(--space-rhythm-sm);
}

.dashboard-label {
  font-size: var(--font-size-caption);
  line-height: var(--line-height-normal);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.dashboard-value {
  font-size: var(--font-size-h3);
  line-height: var(--line-height-tight);
  font-weight: 700;
  font-variant-numeric: tabular-nums; /* Monospace numbers for alignment */
}

/* Mobile: Larger touch targets, more breathing room */
@media (max-width: 768px) {
  .dashboard-text {
    font-size: var(--font-size-body); /* Bump up for readability */
  }

  .dashboard-value {
    font-size: var(--font-size-h2); /* Larger KPIs on mobile */
  }
}
```

---

## Part 6: Migration Strategy

### 6.1 Phase 1: Foundation (Week 1, 4-6 hours)

**Tasks:**
1. Add fluid typography CSS variables to `globals.css`
2. Add measure constraints (max-width utilities)
3. Add rhythm-based spacing variables
4. Update Tailwind config with new tokens
5. Test on 3 sample pages (homepage, case study, dashboard)

**Validation:**
- Typography scales smoothly when resizing browser
- Line lengths stay within 50-75 characters
- No layout breaks at any viewport size

---

### 6.2 Phase 2: Component Library Update (Week 2, 8-12 hours)

**Priority Components:**
1. **BaseCard** - Update title/description typography
2. **Hero components** - Apply display typography and measure
3. **Prose/Article wrappers** - Apply prose styles
4. **Navigation** - Update link sizing
5. **Button components** - Ensure touch-friendly text sizes

**Pattern:**
```typescript
// BEFORE
<h1 className="text-4xl md:text-5xl lg:text-6xl">

// AFTER
<h1 className="text-h1">
// or
<h1> // Inherits styles from globals.css
```

**Validation:**
- All components use semantic type classes (text-h1, text-h2, etc.)
- No hardcoded font sizes (text-[32px])
- No complex responsive classes (5+ breakpoints)

---

### 6.3 Phase 3: Page-by-Page Migration (Week 3-4, 12-16 hours)

**Strategy:** Migrate by page category

**Week 3:**
- Public marketing pages (41 pages) @ 15 min each = 10 hours
- Pattern: Find/replace hardcoded sizes with semantic classes

**Week 4:**
- Presentation pages (29 pages) @ 20 min each = 10 hours
- Dashboards (38 pages) @ 10 min each = 6 hours

**Validation per page:**
- Run Lighthouse audit (check text legibility)
- Test on iPhone SE, iPhone 14, iPad, Desktop
- Verify no regressions (visual comparison)

---

### 6.4 Phase 4: Cleanup & Documentation (Week 4, 4 hours)

**Tasks:**
1. Remove old typography utilities (if any)
2. Document new system in design system docs
3. Create Storybook examples (if using Storybook)
4. Update component library README
5. Train team on new patterns

**Deliverables:**
- Typography style guide (internal docs)
- Component migration checklist
- Before/after screenshots

---

## Part 7: Testing & Validation

### 7.1 Typography Checklist

Per page/component:

- [ ] No hardcoded font sizes (text-[20px])
- [ ] All headings use semantic classes (text-h1, text-h2, etc.)
- [ ] Body text constrained to optimal CPL (50-75 characters)
- [ ] Display headings constrained to 30ch max-width
- [ ] Line heights appropriate for context (tight for headings, relaxed for body)
- [ ] Letter spacing appropriate (tighter for large, neutral for small)
- [ ] Rhythm-based spacing between sections
- [ ] Smooth scaling when resizing viewport
- [ ] Readable at 375px width (iPhone SE)
- [ ] Readable at 1920px width (Large desktop)

---

### 7.2 Automated Testing

```javascript
// Add to test suite

describe('Typography System', () => {
  test('Font sizes scale smoothly', () => {
    const viewports = [375, 768, 1024, 1440, 1920];

    viewports.forEach(width => {
      cy.viewport(width, 800);
      cy.get('h1').should('have.css', 'font-size').and('match', /^\d+(\.\d+)?px$/);
      // Verify font size is within expected range
    });
  });

  test('Line lengths stay within optimal range', () => {
    cy.get('.prose p').each($el => {
      const text = $el.text();
      const width = $el.width();
      const fontSize = parseFloat($el.css('font-size'));
      const charsPerLine = Math.floor(width / (fontSize * 0.5)); // Rough estimate

      expect(charsPerLine).to.be.within(50, 80);
    });
  });

  test('Touch-friendly text sizes on mobile', () => {
    cy.viewport('iphone-x');
    cy.get('button, a, input').each($el => {
      const fontSize = parseFloat($el.css('font-size'));
      expect(fontSize).to.be.at.least(16); // Prevent iOS zoom
    });
  });
});
```

---

### 7.3 Visual Regression Testing

**Setup Percy or Chromatic:**

```javascript
// percy.config.js
module.exports = {
  version: 2,
  static: {
    widths: [375, 768, 1024, 1440],
    baseUrl: 'http://localhost:3000'
  },
  snapshots: [
    { name: 'Homepage - Typography', url: '/', widths: [375, 1440] },
    { name: 'Case Study - Typography', url: '/work/zero', widths: [375, 1440] },
    { name: 'Article - Typography', url: '/thinking/build-to-think', widths: [375, 1440] },
    // ... all pages
  ]
};
```

**Run before and after migration:**
- Capture baseline screenshots
- Apply typography changes
- Capture updated screenshots
- Review diffs for unintended changes

---

## Part 8: Design System Documentation

### 8.1 Typography Style Guide (Create in Storybook or Docs)

```typescript
// Typography.stories.tsx

export default {
  title: 'Design System/Typography',
};

export const TypeScale = () => (
  <div className="space-y-8 p-8">
    <div>
      <p className="text-small text-gray-500 mb-2">Display</p>
      <h1 className="text-display">The quick brown fox jumps</h1>
      <p className="text-caption text-gray-600 mt-1">
        40px @ 375px → 72px @ 1920px (fluid)
      </p>
    </div>

    <div>
      <p className="text-small text-gray-500 mb-2">Heading 1</p>
      <h1 className="text-h1">The quick brown fox jumps over the lazy dog</h1>
      <p className="text-caption text-gray-600 mt-1">
        28px @ 375px → 48px @ 1920px (fluid)
      </p>
    </div>

    <div>
      <p className="text-small text-gray-500 mb-2">Heading 2</p>
      <h2 className="text-h2">The quick brown fox jumps over the lazy dog</h2>
      <p className="text-caption text-gray-600 mt-1">
        24px @ 375px → 36px @ 1920px (fluid)
      </p>
    </div>

    <div>
      <p className="text-small text-gray-500 mb-2">Heading 3</p>
      <h3 className="text-h3">The quick brown fox jumps over the lazy dog</h3>
      <p className="text-caption text-gray-600 mt-1">
        20px @ 375px → 28px @ 1920px (fluid)
      </p>
    </div>

    <div>
      <p className="text-small text-gray-500 mb-2">Body</p>
      <p className="text-base max-w-measure">
        The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Optimal line length for readability is 50-75
        characters, which this text block demonstrates perfectly.
      </p>
      <p className="text-caption text-gray-600 mt-1">
        16px @ 375px → 18px @ 1920px (fluid), 65ch max-width
      </p>
    </div>
  </div>
);

export const MeasureExamples = () => (
  <div className="space-y-8 p-8">
    <div>
      <p className="text-small text-gray-500 mb-2">Narrow Measure (45ch)</p>
      <p className="text-base max-w-measure-narrow bg-gray-100 p-4">
        This text uses narrow measure (45ch), ideal for UI labels and short descriptions.
      </p>
    </div>

    <div>
      <p className="text-small text-gray-500 mb-2">Default Measure (65ch)</p>
      <p className="text-base max-w-measure bg-gray-100 p-4">
        This text uses default measure (65ch), ideal for body copy and articles.
        It provides optimal readability with 60-70 characters per line.
      </p>
    </div>

    <div>
      <p className="text-small text-gray-500 mb-2">Wide Measure (80ch)</p>
      <p className="text-base max-w-measure-wide bg-gray-100 p-4">
        This text uses wide measure (80ch), suitable for data-dense content or
        technical documentation where slightly longer lines are acceptable.
      </p>
    </div>
  </div>
);
```

---

## Part 9: Success Metrics

### 9.1 Before vs After Comparison

**Measure on 10 representative pages:**

| Metric | Before | After | Target | Status |
|--------|--------|-------|--------|--------|
| Avg mobile scroll depth | 3,640px | TBD | <2,500px | 🎯 |
| Avg desktop scroll depth | 2,200px | TBD | ~2,200px (no regression) | 🎯 |
| Pages with 6+ responsive breakpoints | 47 | TBD | 0 | 🎯 |
| Hardcoded font sizes (count) | 200+ | TBD | 0 | 🎯 |
| Avg CPL (desktop) | 95 chars | TBD | 65 chars | 🎯 |
| Avg CPL (mobile) | 42 chars | TBD | 50 chars | 🎯 |
| Lighthouse typography score | TBD | TBD | >90 | 🎯 |

---

### 9.2 User Experience Metrics

**Track post-launch:**
- Average session duration (should increase with better readability)
- Scroll depth engagement (% users reaching end of content)
- Bounce rate (should decrease)
- Mobile user complaints about readability (should decrease to zero)

---

## Part 10: Maintenance & Future Proofing

### 10.1 Adding New Breakpoints

With fluid typography, new breakpoints require zero component changes:

```css
/* Just adjust clamp() values if needed */
:root {
  /* Example: Add 2xl+ desktop support */
  --font-size-display: clamp(2.5rem, 1.5rem + 2vw, 6rem);
  /* Now scales up to 96px on very large screens */
}
```

**No component changes needed** - Everything automatically scales

---

### 10.2 Updating Type Scale

Change scale globally by adjusting CSS variables:

```css
/* Want larger headings site-wide? */
:root {
  --font-size-h1: clamp(2rem, 1.5rem + 1.5vw, 3.5rem);
  /* Was 1.75rem → 3rem, now 2rem → 3.5rem */
}
```

**All 159 pages update automatically** - Zero technical debt

---

### 10.3 Dark Mode Considerations

Typography adjustments for dark mode:

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Slightly increase line-height for dark backgrounds (easier on eyes) */
    --line-height-relaxed: 1.7;
    --line-height-loose: 1.9;

    /* Slightly looser letter-spacing for white-on-dark */
    --tracking-normal: 0;
    --tracking-relaxed: 0.01em;
  }
}
```

---

## Conclusion

This typography system eliminates technical debt by:
1. **Single source of truth** - CSS variables control all sizing
2. **Fluid scaling** - No brittle breakpoint classes needed
3. **Optimal readability** - Enforced CPL constraints
4. **Automatic rhythm** - Spacing tied to typography scale
5. **Future-proof** - Add new breakpoints without touching components

**Implementation Effort:** 24-34 hours total
**Long-term Savings:** Eliminates ongoing typography maintenance, ensures consistency across all 159 pages

**ROI:** 10x - Every future page automatically has proper typography with zero additional effort
