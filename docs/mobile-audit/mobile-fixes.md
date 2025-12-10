# Mobile Fixes - Implementation Roadmap
## Ready-to-Implement Code Changes

**Generated:** December 10, 2025
**For:** Rationale Public Website Mobile Optimization
**Priority Order:** P0 (Critical) → P1 (High) → P2 (Medium) → P3 (Low)

---

## Quick Wins (20 items, <30 minutes each)

### QW1: Fix Breakpoint Inconsistency ⚠️ **CRITICAL**

**Problem:** Tailwind uses 640px for `sm:` but custom CSS defines 480px (160px gap)

**File:** `/tailwind.config.ts`

**Current Code (lines 3-31):**
```typescript
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ... colors
      },
      screens: {
        'landscape': { 'raw': '(orientation: landscape) and (max-height: 600px)' },
        'landscape-md': { 'raw': '(orientation: landscape) and (min-width: 768px) and (max-height: 700px)' },
      },
    },
  },
  plugins: [],
};
```

**Fix (Option A - Align Tailwind to Custom CSS):**
```typescript
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // Override Tailwind defaults to match custom CSS
      'sm': '480px',   // Was 640px, now matches --breakpoint-sm
      'md': '768px',   // Matches --breakpoint-md
      'lg': '1024px',  // Matches --breakpoint-lg
      'xl': '1280px',  // Matches --breakpoint-xl
      '2xl': '1536px', // Keep Tailwind default
    },
    extend: {
      colors: {
        // ... existing colors
      },
      screens: {
        'landscape': { 'raw': '(orientation: landscape) and (max-height: 600px)' },
        'landscape-md': { 'raw': '(orientation: landscape) and (min-width: 768px) and (max-height: 700px)' },
      },
    },
  },
  plugins: [],
};
```

**Impact:** Fixes 100+ components using `sm:` prefix

**Effort:** 5 minutes

---

### QW2: Add Mobile-First Breakpoints

**File:** `/tailwind.config.ts`

**Fix (Add to screens):**
```typescript
theme: {
  screens: {
    'xs': '375px',   // iPhone 12/13 Mini, standard iPhone
    'sm': '480px',   // Large phones
    'md': '768px',   // Tablets
    'lg': '1024px',  // Laptops
    'xl': '1280px',  // Desktops
    '2xl': '1536px', // Large desktops
  },
  extend: {
    screens: {
      'xs-max': { 'max': '374px' },  // iPhone SE, older Android
      'landscape': { 'raw': '(orientation: landscape) and (max-height: 600px)' },
      'landscape-md': { 'raw': '(orientation: landscape) and (min-width: 768px) and (max-height: 700px)' },
    },
  },
}
```

**Impact:** Enables optimization for small phones (iPhone SE) vs large phones (Pro Max)

**Effort:** 5 minutes

---

### QW3: Add Responsive Typography Scale

**File:** `/app/globals.css`

**Current Code (lines 81-85):**
```css
--font-size-h1: 2rem;           /* 32px */
--font-size-h2: 1.5rem;         /* 24px */
--font-size-h3: 1.25rem;        /* 20px */
--font-size-body: 1rem;         /* 16px */
--font-size-caption: 0.875rem;  /* 14px */
```

**Fix (Add after line 129):**
```css
/* Mobile Typography Scale (responsive) */
@media (max-width: 768px) {
  :root {
    --font-size-h1: 1.5rem;   /* 24px (was 32px, -25%) */
    --font-size-h2: 1.25rem;  /* 20px (was 24px, -17%) */
    --font-size-h3: 1.125rem; /* 18px (was 20px, -10%) */
    /* Body and caption unchanged (16px, 14px) */
  }
}

/* Extra small phones (iPhone SE) */
@media (max-width: 374px) {
  :root {
    --font-size-h1: 1.375rem;  /* 22px (further reduction) */
    --font-size-h2: 1.125rem;  /* 18px */
    --font-size-h3: 1rem;      /* 16px */
  }
}
```

**Impact:** Reduces heading dominance on mobile, saves vertical space

**Effort:** 5 minutes

---

### QW4: Reduce Section Padding on Mobile

**File:** `/app/globals.css`

**Fix (Add new responsive spacing utility):**
```css
/* Mobile Spacing Utilities */
.section-padding {
  @apply py-20 md:py-20;  /* Desktop: 80px, Mobile: reduce */
}

.section-padding-mobile {
  @apply py-12 md:py-20;  /* Mobile: 48px, Desktop: 80px */
}

.section-padding-tight {
  @apply py-8 md:py-12;   /* Mobile: 32px, Desktop: 48px */
}
```

**Usage Pattern:**
```typescript
// BEFORE (excessive on mobile)
<section className="py-20">

// AFTER (responsive)
<section className="section-padding-mobile">
```

**Impact:** Reduces scroll depth by 30-40% on long pages

**Effort:** 10 minutes + find/replace across pages

---

### QW5: Add Missing Spacing Tokens

**File:** `/app/globals.css`

**Current Code (lines 94-100):**
```css
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
```

**Fix (Add missing tokens):**
```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px - NEW */
--spacing-6: 1.5rem;    /* 24px */
--spacing-7: 1.75rem;   /* 28px - NEW */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px - NEW */
--spacing-12: 3rem;     /* 48px - NEW */
--spacing-16: 4rem;     /* 64px - NEW */
```

**Impact:** Fills gaps in spacing system, improves design system consistency

**Effort:** 5 minutes

---

### QW6: Add Lazy Loading to All Images

**Pattern:** Find all `<Image>` and `<img>` tags without `loading` attribute

**Search Pattern:**
```bash
# Find images without lazy loading
grep -r "<img" app/ components/ --include="*.tsx" | grep -v "loading="
```

**Fix:**
```typescript
// BEFORE
<img src="/images/hero.jpg" alt="Hero" />

// AFTER
<img src="/images/hero.jpg" alt="Hero" loading="lazy" />

// BEFORE (Next.js Image)
<Image src="/images/hero.jpg" alt="Hero" width={1200} height={600} />

// AFTER
<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  loading="lazy"  // or "eager" for above-fold
/>
```

**Impact:** Improves initial page load time, reduces bandwidth on mobile

**Effort:** 20 minutes (automated find/replace)

---

### QW7: Fix Homepage Hero Padding

**File:** `/app/(public)/page.tsx`

**Find (estimate line 30-50):**
```typescript
<section className="py-20 px-4 sm:px-6 lg:px-8">
```

**Fix:**
```typescript
<section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
```

**Impact:** Saves 32px (80px → 48px) on mobile hero section

**Effort:** 2 minutes

---

### QW8: Reduce Homepage H1 Size

**File:** `/app/(public)/page.tsx`

**Find (estimate line 35-45):**
```typescript
<h1 className="text-6xl font-bold">
```

**Fix:**
```typescript
<h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
```

**Impact:** Reduces hero heading from 60px to 36px on mobile

**Effort:** 2 minutes

---

### QW9: Fix Work Page Hero Padding

**File:** `/app/(public)/work/page.tsx`

**Pattern:** Same as QW7

**Effort:** 2 minutes

---

### QW10: Add useMediaQuery Hook

**File (NEW):** `/lib/hooks/useMediaQuery.ts`

**Create File:**
```typescript
'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect media query matches
 * @param query - Media query string (e.g., '(max-width: 768px)')
 * @returns boolean - Whether media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create media query list
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', handler);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Preset hooks for common breakpoints
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');
```

**Impact:** Enables conditional rendering for mobile component variants

**Effort:** 10 minutes

---

### QW11: Fix Button Minimum Touch Targets

**File:** `/components/ui/ButtonHierarchy.tsx`

**Find (estimate lines 20-40):**
```typescript
// Check current button sizing
```

**Fix (Add minimum touch target utility):**
```typescript
// Add to all button variants
className={cn(
  'min-h-[44px] min-w-[44px]',  // WCAG 2.1 minimum
  // ... other classes
)}
```

**Impact:** Ensures all buttons meet WCAG 2.1 touch target requirements

**Effort:** 10 minutes

---

### QW12: Prevent iOS Zoom on Form Inputs

**Pattern:** Ensure all `<input>` elements have minimum 16px font size

**Search:**
```bash
grep -r "<input" app/ components/ --include="*.tsx" | grep -v "text-base"
```

**Fix:**
```typescript
// BEFORE (will trigger iOS zoom if <16px)
<input className="text-sm px-4 py-2" />

// AFTER (prevents zoom)
<input className="text-base px-4 py-3" />
```

**Impact:** Prevents annoying iOS zoom behavior on form focus

**Effort:** 15 minutes

---

### QW13: Add Proper inputmode Attributes

**Pattern:** Add `inputmode` to all inputs for better mobile keyboards

**Fix:**
```typescript
// Email inputs
<input type="email" inputMode="email" />

// Phone inputs
<input type="tel" inputMode="tel" />

// Number inputs
<input type="number" inputMode="numeric" />

// Search inputs
<input type="search" inputMode="search" />
```

**Impact:** Shows appropriate mobile keyboard for input type

**Effort:** 10 minutes

---

### QW14: Fix Modal to Full-Screen on Mobile

**Pattern:** Find all Modal components

**Fix:**
```typescript
// BEFORE (floating modal on all devices)
<Modal className="w-[600px] rounded-lg">

// AFTER (full-screen on mobile, floating on desktop)
<Modal className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] md:rounded-lg">
```

**Impact:** Better mobile UX for modals (full viewport utilization)

**Effort:** 15 minutes

---

### QW15: Add max-w-prose to Long-Form Content

**Pattern:** Add to all blog posts, case studies, thinking pages

**Files:** All `/app/(public)/thinking/**/page.tsx`

**Fix:**
```typescript
// BEFORE (text spans full width)
<p className="text-base">Long paragraph content...</p>

// AFTER (constrained for readability)
<p className="text-base max-w-prose">Long paragraph content...</p>
```

**Impact:** Improves readability (65 characters per line optimal)

**Effort:** 20 minutes

---

### QW16: Convert Tables to Card View Hook

**File (NEW):** `/lib/hooks/useTableView.ts`

**Create File:**
```typescript
'use client';

import { useIsMobile } from './useMediaQuery';

/**
 * Hook to determine if table should show as cards
 * @returns 'table' | 'cards'
 */
export function useTableView(): 'table' | 'cards' {
  const isMobile = useIsMobile();
  return isMobile ? 'cards' : 'table';
}
```

**Impact:** Enables easy table → card conversion on mobile

**Effort:** 5 minutes

---

### QW17: Add Horizontal Scroll Hint CSS

**File:** `/app/globals.css`

**Add (after line 150):**
```css
/* Horizontal scroll hint gradient */
.scroll-hint-right {
  position: relative;
}

.scroll-hint-right::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3rem; /* 48px */
  background: linear-gradient(to left, rgb(0 0 0 / 1), rgb(0 0 0 / 0));
  pointer-events: none;
}

.scroll-hint-left {
  position: relative;
}

.scroll-hint-left::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3rem; /* 48px */
  background: linear-gradient(to right, rgb(0 0 0 / 1), rgb(0 0 0 / 0));
  pointer-events: none;
  z-index: 1;
}
```

**Usage:**
```typescript
<div className="overflow-x-auto scroll-hint-right">
  {/* Horizontally scrollable content */}
</div>
```

**Impact:** Visual cue that content is scrollable horizontally

**Effort:** 5 minutes

---

### QW18: Add Sticky Header Scroll Optimization

**File:** `/components/layout/Header.tsx`

**Find (line 85):**
```typescript
<header className="sticky top-0 z-50 border-b border-gray-800 bg-black/90 backdrop-blur-md">
```

**Fix (Add height reduction on scroll):**
```typescript
'use client';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 border-b border-gray-800 bg-black/90 backdrop-blur-md transition-all duration-200",
      isScrolled ? "h-12" : "h-16"  // Smaller when scrolled
    )}>
```

**Impact:** Saves viewport space when scrolling on mobile

**Effort:** 15 minutes

---

### QW19: Fix Card Grid Stacking

**Pattern:** Ensure all card grids stack to single column on mobile

**Search:**
```bash
grep -r "grid-cols-" app/ components/ --include="*.tsx"
```

**Fix:**
```typescript
// BEFORE (stays multi-column on mobile)
<div className="grid grid-cols-3 gap-6">

// AFTER (single column on mobile)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
```

**Impact:** Better mobile layout for card grids

**Effort:** 20 minutes (find/replace pattern)

---

### QW20: Add Performance Budget Monitoring

**File (NEW):** `/scripts/check-bundle-size.js`

**Create File:**
```javascript
// Add to package.json scripts
{
  "scripts": {
    "analyze": "ANALYZE=true next build",
    "check-bundle": "node scripts/check-bundle-size.js"
  }
}
```

**Install:**
```bash
npm install --save-dev @next/bundle-analyzer
```

**Update:** `/next.config.mjs`
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... existing config
})
```

**Impact:** Monitor bundle size to prevent mobile performance regressions

**Effort:** 15 minutes

---

## P0 (Critical) - Sales-Blocking Issues

### P0.1: Athletes First Presentation Mobile Optimization ⭐

**Priority:** CRITICAL (Sales Tool)

**Files:**
- `/app/work/athletes-first/page.tsx`
- `/components/athletes-first/diagrams/*` (19 diagram files)

**Estimated Effort:** 16-20 hours

**Implementation Plan:**

#### Step 1: Create Mobile Wrapper (2 hours)

**File (NEW):** `/components/athletes-first/AthleteFirstPitchMobile.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import mobile diagram variants
import { FourModulesSystemDiagramMobile } from './diagrams/FourModulesSystemDiagramMobile';
import { AgencyParadoxDiagramMobile } from './diagrams/AgencyParadoxDiagramMobile';
// ... import all 19 mobile variants

export function AthleteFirstPitchMobile() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: 'problem', title: 'The Agency Paradox', component: AgencyParadoxDiagramMobile },
    { id: 'solution', title: 'The Breakthrough', component: FourModulesSystemDiagramMobile },
    { id: 'modules', title: '4 Integrated Modules', component: /* ... */ },
    { id: 'metrics', title: 'Success Metrics', component: /* ... */ },
    { id: 'timeline', title: '16-Week Pilot', component: /* ... */ },
    { id: 'ask', title: 'The Ask', component: /* ... */ },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="flex overflow-x-auto">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(i)}
              className={cn(
                "flex-shrink-0 px-4 py-3 text-sm transition-colors",
                activeSection === i
                  ? "border-b-2 border-terminal-gold text-terminal-gold"
                  : "text-gray-400"
              )}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="p-4 space-y-6">
        {React.createElement(sections[activeSection].component)}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800 p-4">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <button
            onClick={() => setActiveSection(s => Math.max(0, s - 1))}
            disabled={activeSection === 0}
            className="px-6 py-3 bg-gray-800 rounded disabled:opacity-50"
          >
            ← Previous
          </button>
          <div className="text-sm text-gray-400">
            {activeSection + 1} / {sections.length}
          </div>
          <button
            onClick={() => setActiveSection(s => Math.min(sections.length - 1, s + 1))}
            disabled={activeSection === sections.length - 1}
            className="px-6 py-3 bg-terminal-gold text-black rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
```

#### Step 2: Create Mobile Diagram Variants (12-15 hours)

**Priority Diagrams (Create First):**

**P0.1a: FourModulesSystemDiagramMobile (Most Important) - 2 hours**

**File (NEW):** `/components/athletes-first/diagrams/FourModulesSystemDiagramMobile.tsx`

```typescript
'use client';

import { useState } from 'react';

const modules = [
  {
    id: 'content',
    icon: '📱',
    name: 'Digital Twins',
    description: 'AI-powered athlete profiles with real-time data',
    features: [
      'Automated profile generation',
      'Real-time social media integration',
      'Performance metrics tracking',
      'NIL deal history',
    ],
  },
  {
    id: 'community',
    icon: '🎥',
    name: 'Immersive Pitch',
    description: 'Vision Pro spatial computing experiences',
    features: [
      '3D athlete presentations',
      'Interactive deal scenarios',
      'Virtual facility tours',
      'Spatial storytelling',
    ],
  },
  {
    id: 'commerce',
    icon: '🤖',
    name: 'RecruitAI',
    description: 'Intelligent deal matching and recommendations',
    features: [
      'Brand-athlete matching',
      'Deal structure optimization',
      'Market rate analysis',
      'Automated outreach',
    ],
  },
  {
    id: 'coaching',
    icon: '📊',
    name: 'Analytics Suite',
    description: 'Performance tracking and ROI measurement',
    features: [
      'Campaign performance',
      'Engagement metrics',
      'Revenue tracking',
      'Competitive benchmarking',
    ],
  },
];

export function FourModulesSystemDiagramMobile() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  if (selectedModule) {
    const module = modules.find(m => m.id === selectedModule)!;

    return (
      <div className="space-y-6">
        {/* Back button */}
        <button
          onClick={() => setSelectedModule(null)}
          className="flex items-center text-terminal-gold text-sm"
        >
          ← Back to all modules
        </button>

        {/* Module detail */}
        <div className="bg-gray-900/70 border border-terminal-gold/30 rounded-lg p-6 space-y-4">
          <div className="text-6xl text-center">{module.icon}</div>
          <h3 className="text-2xl font-bold text-center">{module.name}</h3>
          <p className="text-gray-300 text-center">{module.description}</p>

          {/* Features */}
          <div className="space-y-3 mt-6">
            <h4 className="text-sm font-semibold text-terminal-gold uppercase tracking-wide">
              Key Features
            </h4>
            {module.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="text-terminal-gold text-lg">✓</div>
                <div className="text-base text-gray-200">{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // High-level overview (4 cards)
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">4 Integrated Modules</h2>
        <p className="text-gray-400">Tap any module to learn more</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setSelectedModule(module.id)}
            className="bg-gray-900/70 border border-gray-700 hover:border-terminal-gold/50 rounded-lg p-6 text-center space-y-3 transition-all duration-200"
          >
            <div className="text-5xl">{module.icon}</div>
            <div className="text-base font-semibold">{module.name}</div>
            <div className="text-xs text-gray-400 line-clamp-2">
              {module.description}
            </div>
          </button>
        ))}
      </div>

      {/* Integration note */}
      <div className="bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg p-4 mt-6">
        <p className="text-sm text-gray-300 text-center">
          All 4 modules work together to create a seamless NIL deal ecosystem
        </p>
      </div>
    </div>
  );
}
```

**P0.1b: AgencyParadoxDiagramMobile - 1 hour**

```typescript
// Comparison diagram: Current state vs Breakthrough
// Use side-by-side cards with icons
```

**P0.1c: SuccessMetricsDiagramMobile - 1 hour**

```typescript
// KPI cards with animated counters
// Stack vertically on mobile
```

**P0.1d-s: Remaining 16 diagrams - 8-12 hours**

Apply appropriate mobile treatment from Phase 4:
- Simple diagrams: Simplified SVG
- Medium diagrams: Progressive disclosure
- Complex diagrams: Step-by-step wizard
- Timeline diagrams: Horizontal scroll with hints

#### Step 3: Update Page to Use Mobile Variant (1 hour)

**File:** `/app/work/athletes-first/page.tsx`

**Add at top:**
```typescript
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/lib/hooks/useMediaQuery';

const AthleteFirstPitchDesktop = dynamic(() => import('@/components/athletes-first/AthleteFirstPitchDesktop'));
const AthleteFirstPitchMobile = dynamic(() => import('@/components/athletes-first/AthleteFirstPitchMobile'));

export default function AthleteFirstPage() {
  const isMobile = useIsMobile();

  return isMobile ? <AthleteFirstPitchMobile /> : <AthleteFirstPitchDesktop />;
}
```

#### Step 4: Testing & QA (2 hours)

- Test on iPhone SE (375px)
- Test on iPhone 14 Pro (390px)
- Test on iPhone 14 Pro Max (428px)
- Test on Android Pixel 7 (412px)
- Verify all diagrams render correctly
- Verify swipe/tap interactions work
- Check scroll performance

---

### P0.2: CREaiT Pitch Deck Mobile Optimization ⭐

**Priority:** CRITICAL (Sales Tool)

**Files:**
- `/app/clients/creait/pitch-deck/**/page.tsx` (12 slide pages)
- `/components/creait/diagrams/*` (10 diagram files)

**Estimated Effort:** 12-15 hours

**Implementation Plan:**

Similar to Athletes First but with slide-based navigation instead of section navigation.

#### Step 1: Create Slide Navigation Wrapper (2 hours)

**File (NEW):** `/components/creait/CREaiTPitchDeckMobileNav.tsx`

```typescript
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const slides = [
  { path: '/clients/creait/pitch-deck/01-problem', title: 'Problem', number: 1 },
  { path: '/clients/creait/pitch-deck/02-solution', title: 'Solution', number: 2 },
  // ... all 12 slides
];

export function CREaiTPitchDeckMobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  const currentSlideIndex = slides.findIndex(s => s.path === pathname);
  const currentSlide = slides[currentSlideIndex];

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      router.push(slides[currentSlideIndex - 1].path);
    }
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      router.push(slides[currentSlideIndex + 1].path);
    }
  };

  // Swipe gesture support
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        // Swipe left = next slide
        goToNextSlide();
      }
      if (touchEndX > touchStartX + 50) {
        // Swipe right = previous slide
        goToPrevSlide();
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlideIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-gray-800 p-4 md:hidden">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <button
          onClick={goToPrevSlide}
          disabled={currentSlideIndex === 0}
          className="px-6 py-3 bg-gray-800 rounded disabled:opacity-50 min-w-[100px]"
        >
          ← Prev
        </button>

        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Slide {currentSlide.number} of {slides.length}
          </div>
          <div className="text-sm font-medium text-gray-200">
            {currentSlide.title}
          </div>
        </div>

        <button
          onClick={goToNextSlide}
          disabled={currentSlideIndex === slides.length - 1}
          className="px-6 py-3 bg-terminal-gold text-black rounded disabled:opacity-50 min-w-[100px]"
        >
          Next →
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-terminal-gold transition-all duration-300"
          style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
```

#### Step 2: Add to Layout (1 hour)

**File:** `/app/clients/creait/pitch-deck/layout.tsx`

```typescript
import { CREaiTPitchDeckMobileNav } from '@/components/creait/CREaiTPitchDeckMobileNav';

export default function CREaiTPitchDeckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {/* Add padding-bottom on mobile for fixed nav */}
      <div className="pb-24 md:pb-0">
        {children}
      </div>
      <CREaiTPitchDeckMobileNav />
    </div>
  );
}
```

#### Step 3: Create Mobile Diagram Variants (8-10 hours)

**Priority Diagrams:**

**P0.2a: RoadmapGanttDiagramMobile** - Step-by-step wizard (2 hours)
**P0.2b: UnitEconomicsFlowDiagramMobile** - Simplified flow (1.5 hours)
**P0.2c: TAMFunnelDiagramMobile** - Vertical funnel (1 hour)
**P0.2d: AIScoreFlowDiagramMobile** - Step-by-step (1.5 hours)
**P0.2e: CompetitiveLandscapeDiagramMobile** - Grid with detail view (2 hours)
**P0.2f-j: Remaining 5 diagrams** - 3-4 hours

#### Step 4: Optimize Slide Content (1-2 hours)

Reduce text density on each slide:
- Max 3 bullet points per slide
- Use "Show more" expandable for details
- Larger font sizes (18px minimum)

#### Step 5: Testing & QA (2 hours)

- Test swipe gestures
- Verify slide navigation
- Check diagram interactions
- Performance testing

---

### P0.3: Fix Breakpoint Inconsistency Across All Components

**Priority:** CRITICAL (Affects 100+ components)

**Already covered in QW1** - See above

---

## P1 (High Priority) - Major UX Improvements

### P1.1: Homepage Mobile Optimization

**File:** `/app/(public)/page.tsx`

**Estimated Effort:** 4-6 hours

**Changes:**

1. **Hero Section** (1 hour)
   - Reduce padding: `py-20` → `py-12 md:py-20`
   - Reduce H1: `text-6xl` → `text-4xl md:text-5xl lg:text-6xl xl:text-7xl`
   - Stack CTAs vertically on mobile: `flex-row` → `flex-col md:flex-row`
   - Hide secondary CTA on mobile (optional)

2. **Featured Work Section** (1 hour)
   - Grid: `grid-cols-2` → `grid-cols-1 md:grid-cols-2`
   - Reduce card padding on mobile
   - Truncate descriptions: Add `line-clamp-3 md:line-clamp-none`

3. **Services Section** (1 hour)
   - Stack services vertically
   - Use accordion on mobile (hide expanded content)

4. **Social Proof Section** (30 min)
   - Single column on mobile
   - Reduce logo sizes

5. **CTA Section** (30 min)
   - Full-width button on mobile
   - Reduce padding

6. **Footer** (1 hour)
   - Stack footer columns vertically
   - Collapsible sections on mobile

**Testing:** 1 hour

---

### P1.2: Work Page Mobile Optimization

**File:** `/app/(public)/work/page.tsx`

**Estimated Effort:** 3-4 hours

**Changes:**

1. **Featured Projects** (1.5 hours)
   - Already uses FeaturedWorkCard (good)
   - Ensure cards stack properly
   - Truncate descriptions on mobile

2. **More Ventures Grid** (1 hour)
   - `grid-cols-3` → `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`
   - Tighter spacing on mobile

3. **Partnership Cards** (1 hour)
   - Stack vertically
   - Expand/collapse details on mobile

4. **Philosophy Boxes** (30 min)
   - Already well-sized
   - Minor padding adjustments

**Testing:** 30 min

---

### P1.3: Client Portal Dashboard Optimization

**Files:**
- `/clients/zero/dashboard/page.tsx`
- Other dashboard pages

**Estimated Effort:** 8-10 hours

**Changes:**

1. **Create Mobile Dashboard Layout** (2 hours)
   - Card-based layout (not table)
   - Collapsible sections
   - Bottom navigation

2. **Convert Tables to Cards** (3 hours)
   - Implement useTableView hook
   - Create card variant for each table type

3. **Simplify Charts** (2 hours)
   - Reduce data points on mobile
   - Larger labels
   - Single-series view with dropdown

4. **Mobile Filters** (2 hours)
   - Collapse into modal/bottom sheet
   - Sticky "Filter" button

5. **Testing** (1 hour)

---

## P2 (Medium Priority) - Optimization Opportunities

### P2.1: Image Optimization (All 95 Images)

**Estimated Effort:** 4-6 hours

**Process:**

1. **Install Sharp** (if not already)
   ```bash
   npm install sharp
   ```

2. **Create Conversion Script**

   **File (NEW):** `/scripts/convert-images-to-webp.js`

   ```javascript
   const sharp = require('sharp');
   const fs = require('fs');
   const path = require('path');

   const inputDir = './public/images';
   const outputDir = './public/images/webp';

   // Create output directory
   if (!fs.existsSync(outputDir)) {
     fs.mkdirSync(outputDir, { recursive: true });
   }

   // Find all PNG/JPG files
   const files = fs.readdirSync(inputDir)
     .filter(file => /\.(png|jpg|jpeg)$/i.test(file));

   console.log(`Converting ${files.length} images...`);

   files.forEach(async (file) => {
     const inputPath = path.join(inputDir, file);
     const outputPath = path.join(outputDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

     try {
       await sharp(inputPath)
         .webp({ quality: 80 })
         .toFile(outputPath);
       console.log(`✓ Converted ${file}`);
     } catch (error) {
       console.error(`✗ Failed to convert ${file}:`, error.message);
     }
   });
   ```

3. **Run Conversion** (2 hours)
   ```bash
   node scripts/convert-images-to-webp.js
   ```

4. **Create Responsive Sizes** (2 hours)
   - Create 1x (375w), 2x (750w), 3x (1125w) variants
   - Add script to automate

5. **Update Image Components** (2 hours)
   - Add `srcset` to all images
   - Add WebP with fallback

**Example Implementation:**
```typescript
<picture>
  <source
    srcSet="
      /images/webp/hero-375w.webp 375w,
      /images/webp/hero-750w.webp 750w,
      /images/webp/hero-1125w.webp 1125w
    "
    sizes="(max-width: 768px) 100vw, 1200px"
    type="image/webp"
  />
  <img
    src="/images/hero.jpg"
    alt="Hero image"
    loading="lazy"
  />
</picture>
```

---

### P2.2: Case Study Pages Optimization

**Files:** All `/work/**/page.tsx` case study pages

**Estimated Effort:** 6-8 hours (10-15 case studies)

**Pattern (Apply to Each):**

1. **Hero Section**
   - Mobile padding reduction
   - Responsive title sizing

2. **Content Sections**
   - Add `max-w-prose` to paragraphs
   - Break long paragraphs (max 3-4 sentences)
   - Add visual breaks every 2-3 paragraphs

3. **Image Galleries**
   - Single column on mobile
   - Lazy loading
   - Lightbox/modal for full view

4. **Metrics/Stats**
   - Stack vertically on mobile
   - Larger numbers
   - Animated counters

**Effort per case study:** 30-40 minutes

---

### P2.3: About Page Optimization

**File:** `/app/(public)/about/page.tsx`

**Estimated Effort:** 2-3 hours

**Changes:**

1. **Team Section**
   - `grid-cols-4` → `grid-cols-2 md:grid-cols-4`
   - Smaller images on mobile

2. **Story Section**
   - Add `max-w-prose`
   - Break paragraphs

3. **Values/Philosophy**
   - Accordion on mobile
   - Always visible on desktop

---

### P2.4: Contact Form Optimization

**File:** `/app/(public)/contact/page.tsx`

**Estimated Effort:** 1-2 hours

**Changes:**

1. **Form Layout**
   - Stack all fields (already single column likely)
   - Larger input padding: `py-2` → `py-3`
   - Full-width button

2. **Input Attributes**
   - Add `inputmode` attributes
   - Ensure 16px font (prevent zoom)

3. **Validation Messages**
   - Below inputs (not inline)
   - Clear error states

---

## P3 (Low Priority) - Polish & Nice-to-Have

### P3.1: Admin Tools Mobile Support

**Estimated Effort:** 8-12 hours

Admin tools are desktop-primary. Add mobile message:

```typescript
// Add to admin layouts
export default function AdminLayout({ children }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Desktop Required</h2>
          <p className="text-gray-400">
            Admin tools are optimized for desktop use. Please access from a laptop or desktop computer.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
```

---

### P3.2: Visual Test Pages (Skip)

Visual test pages don't need mobile optimization (internal use only).

---

### P3.3: Historical Work Archive

**File:** `/app/(public)/historical-work/page.tsx`

**Estimated Effort:** 2-3 hours

Apply standard responsive patterns:
- Stack cards
- Reduce padding
- Responsive typography

---

## Implementation Timeline

### Week 1: Quick Wins + P0 Foundation
- **Day 1:** All 20 Quick Wins (QW1-QW20) = 4-6 hours
- **Day 2-3:** Athletes First mobile variants (P0.1 Step 1-2) = 8-10 hours
- **Day 4-5:** Athletes First diagrams + testing (P0.1 Step 3-4) = 8-10 hours

**Total Week 1:** 20-26 hours

### Week 2: P0 Completion + P1 Start
- **Day 1-2:** CREaiT pitch deck mobile (P0.2 Step 1-3) = 8-10 hours
- **Day 3:** CREaiT diagrams + testing (P0.2 Step 4-5) = 6-8 hours
- **Day 4:** Homepage optimization (P1.1) = 4-6 hours
- **Day 5:** Work page optimization (P1.2) = 3-4 hours

**Total Week 2:** 21-28 hours

### Week 3: P1 Completion + P2 Start
- **Day 1-2:** Client portal dashboards (P1.3) = 8-10 hours
- **Day 3:** Image optimization (P2.1) = 4-6 hours
- **Day 4-5:** Case study pages (P2.2, 10 pages) = 6-8 hours

**Total Week 3:** 18-24 hours

### Week 4: P2 + P3 + Polish
- **Day 1:** About + Contact pages (P2.3, P2.4) = 3-5 hours
- **Day 2:** Admin tools notice (P3.1) = 2-3 hours
- **Day 3-4:** Final testing, QA, bug fixes = 8-12 hours
- **Day 5:** Documentation, handoff = 4-6 hours

**Total Week 4:** 17-26 hours

---

## Total Estimated Effort: 76-104 hours

**Note:** Original estimate was 38-55 hours for audit + documentation. The implementation phase adds 40-50 hours for code changes. Total project (audit + implementation) = 80-110 hours.

---

## Testing Checklist

After each phase, verify:

- [ ] Desktop experience unchanged (no regressions)
- [ ] Tested on iPhone SE (375px)
- [ ] Tested on iPhone 14 (390px)
- [ ] Tested on iPhone 14 Pro Max (428px)
- [ ] Tested on Android Pixel 7 (412px)
- [ ] All touch targets ≥44x44px
- [ ] All text ≥16px
- [ ] No horizontal overflow
- [ ] Images lazy-loaded
- [ ] Forms prevent iOS zoom
- [ ] Modals full-screen on mobile
- [ ] Tables convert to cards
- [ ] Charts simplified
- [ ] Scroll depth reduced
- [ ] Lighthouse mobile score >90

---

## Success Metrics

**Before Optimization:**
- Breakpoint health score: 4/10
- Mobile scroll depth: 2-3x desktop
- Bundle size: Unknown
- Lighthouse mobile: Unknown

**After Optimization (Targets):**
- Breakpoint health score: 8/10
- Mobile scroll depth: 1.2-1.5x desktop (30-50% reduction)
- Bundle size: <200KB mobile
- Lighthouse mobile: >90
- Athletes First + CREaiT presentations: 100% usable on mobile
- All touch targets WCAG compliant
- Zero horizontal overflow issues
- Forms work without zoom

---

**Next Steps:** Prioritize quick wins (Day 1), then tackle P0 sales-critical presentations (Week 1-2).
