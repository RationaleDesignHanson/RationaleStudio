# Bundle Optimization Plan

**Created:** December 10, 2025
**Status:** 📊 Analysis Complete
**Phase:** Post-Phase 4 Performance Optimization

---

## Executive Summary

Analysis of component sizes reveals **significant opportunities for code splitting and lazy loading**. Domain-specific components (Athletes First, CREaiT, Zero) total ~10,000+ lines of code that are only used on specific pages.

### Key Findings

1. **Large Domain-Specific Components**: 10,000+ lines loaded unnecessarily
2. **Pitch Deck Components**: 800-1,158 lines each (only used on 2-3 pages)
3. **Interactive Demos**: 500-900 lines each (single-page usage)
4. **Diagram Components**: 300-450 lines each (page-specific)

### Optimization Targets

**Priority 1 (Immediate Impact):**
- Athletes First demos: 6,750+ lines (6 components)
- CREaiT pitch deck: 470 lines
- Zero interactive demo: 527 lines

**Priority 2 (High Impact):**
- Mobile diagram variants: 1,500+ lines (15 components)
- Domain-specific diagrams: 2,000+ lines (20 components)

**Expected Savings:**
- **Initial bundle reduction**: 20-30% (lazy load demos)
- **Per-page savings**: 5-10KB gzipped per route
- **Improved LCP**: 200-500ms on homepage

---

## Component Size Analysis

### Athletes First Components

**Pitch Deck & Simulator:**
```
PlatformWalkthroughDemo.tsx        1,158 lines  ← Priority 1
AISTSimulator.tsx                    964 lines  ← Priority 1
NILAnalyzerDemo.tsx                  883 lines  ← Priority 1
AgentToolkit.tsx                     812 lines  ← Priority 1
AthletesFirstPitchDeck.tsx           806 lines  ← Priority 2
AthleteDashboardDemo.tsx             755 lines  ← Priority 1
AmplifyAIDemo.tsx                    744 lines  ← Priority 1
SystemArchitectureDemo.tsx           714 lines  ← Priority 2
RecruitAIDemo.tsx                    714 lines  ← Priority 2
ImmersivePitchDemo.tsx               520 lines  ← Priority 2
```

**Total**: 8,070 lines
**Usage**: Only `/work/athletes-first` and `/work/case-study-020` pages
**Opportunity**: Lazy load all demos, eager load only pitch deck outline

### CREaiT Components

**Pitch Deck & Demos:**
```
CREaiTPitchDeck.tsx                  470 lines  ← Priority 1
AIScoreFlowDiagram.tsx               389 lines  ← Priority 2
OpportunityDashboardDemo.tsx         297 lines  ← Priority 1
CompetitiveLandscapeDiagram.tsx      304 lines  ← Priority 2
UnitEconomicsFlowDiagram.tsx         302 lines  ← Priority 2
ValidationMapDiagram.tsx             299 lines  ← Priority 2
InvestmentMilestonesDiagram.tsx      288 lines  ← Priority 2
RevenueRampDiagram.tsx               281 lines  ← Priority 2
RoadmapGanttDiagram.tsx              269 lines  ← Priority 2
```

**Total**: 2,899 lines
**Usage**: Only `/work/creait` and `/work/case-study-010` pages
**Opportunity**: Lazy load entire pitch deck + demos

### Zero Components

**Interactive Demo & Diagrams:**
```
InteractiveDemo.tsx                  527 lines  ← Priority 1
MicroservicesArchitectureDiagram     448 lines  ← Priority 2
BetaRoadmapTimelineDiagram           430 lines  ← Priority 2
ActionFlowModal.tsx                  430 lines  ← Priority 2
MicroservicesArchitectureDiagramMobile  376 lines  ← Priority 3
AIIntelligenceSystemDiagramMobile    339 lines  ← Priority 3
InboxJourneyDiagram.tsx              322 lines  ← Priority 2
AIIntelligenceSystemDiagram.tsx      306 lines  ← Priority 2
InboxJourneyDiagramMobile.tsx        299 lines  ← Priority 3
```

**Total**: 3,477 lines
**Usage**: `/work/zero`, `/work/zero/*` pages only
**Opportunity**: Lazy load all interactive elements

---

## Lazy Loading Strategy

### Priority 1: Large Demos (Immediate Impact)

**Target Components:**
- Athletes First demos (6 components, 4,500 lines)
- CREaiT demos (2 components, 767 lines)
- Zero interactive demo (1 component, 527 lines)

**Implementation Pattern:**

```typescript
// Before (eager loading)
import { PlatformWalkthroughDemo } from '@/components/athletes-first/demos/PlatformWalkthroughDemo';

function AthletesFirstPage() {
  return <PlatformWalkthroughDemo />;
}

// After (lazy loading)
import dynamic from 'next/dynamic';

const PlatformWalkthroughDemo = dynamic(
  () => import('@/components/athletes-first/demos/PlatformWalkthroughDemo'),
  {
    loading: () => <div className="animate-pulse bg-gray-900/50 rounded-lg h-96" />,
    ssr: false  // Client-side only (interactive demos)
  }
);

function AthletesFirstPage() {
  return <PlatformWalkthroughDemo />;
}
```

**Expected Savings:**
- Bundle reduction: ~5,800 lines (15-20KB gzipped)
- Homepage load: Unaffected (demos not on homepage)
- Work page load: Faster (demos load on-demand)

### Priority 2: Pitch Decks (High Impact)

**Target Components:**
- AthletesFirstPitchDeck (806 lines)
- CREaiTPitchDeck (470 lines)
- Zero diagrams (6 components, 1,800 lines)

**Implementation Pattern:**

```typescript
// Split pitch deck into sections
const PitchDeckSection1 = dynamic(() => import('./sections/Section1'));
const PitchDeckSection2 = dynamic(() => import('./sections/Section2'));

// Load on scroll or interaction
const [loadSection2, setLoadSection2] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setLoadSection2(true);
    }
  });
  observer.observe(section1Ref.current);
}, []);
```

**Expected Savings:**
- Bundle reduction: ~3,000 lines (8-12KB gzipped)
- Initial page load: 200-300ms faster
- Scroll-triggered loading: Smooth UX

### Priority 3: Mobile Diagrams (Medium Impact)

**Target Components:**
- Mobile diagram variants (15 components, 1,500 lines)
- Only loaded on mobile devices

**Implementation Pattern:**

```typescript
import dynamic from 'next/dynamic';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const DiagramMobile = dynamic(() => import('./DiagramMobile'));
const DiagramDesktop = dynamic(() => import('./DiagramDesktop'));

function ResponsiveDiagram() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <DiagramMobile /> : <DiagramDesktop />;
}
```

**Expected Savings:**
- Mobile bundle: Load only mobile variants (~750 lines)
- Desktop bundle: Load only desktop variants (~750 lines)
- Net savings: 50% reduction in diagram code per device

---

## Code Splitting Strategy

### Route-Based Splitting (Next.js Default)

**Already Implemented:**
- Each page in `app/(public)/*` is automatically code-split
- Shared components bundled in common chunk
- No additional work needed

**Current Bundle Structure:**
```
Common chunk (baseline):
  - BaseCard, Badge, Button components
  - Shared utilities, hooks
  - Design tokens

Page-specific chunks:
  - Homepage: Hero, FeaturedWorkCard, InsightCard
  - Work page: VentureCard, FeaturedWorkCard, partnership cards
  - Athletes First: Pitch deck + demos (should be lazy loaded)
  - CREaiT: Pitch deck + diagrams (should be lazy loaded)
```

### Component-Level Splitting

**Manual Dynamic Imports for:**

1. **Heavy Interactive Components**
   - Athletes First demos (6 components)
   - CREaiT demos (2 components)
   - Zero interactive demo (1 component)

2. **Domain-Specific Visualizations**
   - Athletes First diagrams (12 components)
   - CREaiT diagrams (9 components)
   - Zero diagrams (6 components)

3. **Third-Party Libraries**
   - Swiper.js (only for mobile diagrams)
   - Chart libraries (only for data viz pages)
   - Animation libraries (only for interactive demos)

---

## Implementation Plan

### Phase 1: Lazy Load Large Demos (1-2 hours)

**Files to Modify:**
1. `app/(public)/work/athletes-first/page.tsx`
2. `app/(public)/work/case-study-020/page.tsx`
3. `app/(public)/work/creait/page.tsx`
4. `app/(public)/work/case-study-010/page.tsx`
5. `app/(public)/work/zero/page.tsx`

**Changes:**
```typescript
// Replace all eager demo imports with dynamic imports
import dynamic from 'next/dynamic';

const PlatformWalkthroughDemo = dynamic(
  () => import('@/components/athletes-first/demos/PlatformWalkthroughDemo'),
  { loading: () => <LoadingSkeleton />, ssr: false }
);
```

**Testing:**
- Verify demos load correctly
- Check loading skeletons appear
- Measure bundle size reduction
- Validate lighthouse scores

### Phase 2: Pitch Deck Sectioning (2-3 hours)

**Refactor pitch decks into sections:**
1. Split AthletesFirstPitchDeck into 4-5 sections
2. Split CREaiTPitchDeck into 3-4 sections
3. Lazy load sections on scroll

**Implementation:**
```typescript
// components/athletes-first/AthletesFirstPitchDeck.tsx
import dynamic from 'next/dynamic';

const PitchSection1 = dynamic(() => import('./sections/Overview'));
const PitchSection2 = dynamic(() => import('./sections/Solution'));
const PitchSection3 = dynamic(() => import('./sections/Demos'));
const PitchSection4 = dynamic(() => import('./sections/Roadmap'));
```

### Phase 3: Mobile Diagram Optimization (1-2 hours)

**Implement device-based loading:**
```typescript
// Only load mobile diagrams on mobile devices
const isMobile = useMediaQuery('(max-width: 768px)');

const DiagramComponent = isMobile
  ? dynamic(() => import('./DiagramMobile'))
  : dynamic(() => import('./DiagramDesktop'));
```

### Phase 4: Third-Party Library Splitting (1 hour)

**Lazy load heavy dependencies:**
- Swiper.js (mobile carousels)
- Recharts (data visualizations)
- Framer Motion (animations)

```typescript
const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper));
const SwiperSlide = dynamic(() => import('swiper/react').then(mod => mod.SwiperSlide));
```

---

## Performance Targets

### Before Optimization (Baseline)

**Homepage:**
- First Contentful Paint (FCP): ~1.2s
- Largest Contentful Paint (LCP): ~2.5s
- Total Blocking Time (TBT): ~300ms
- Bundle size: ~264KB CSS + ~800KB JS (estimated)

**Work Page (with demos):**
- FCP: ~1.5s
- LCP: ~3.2s
- TBT: ~500ms
- Bundle size: ~300KB CSS + ~1.2MB JS (estimated)

### After Optimization (Target)

**Homepage:**
- FCP: ~1.0s (-200ms) ✅
- LCP: ~2.0s (-500ms) ✅
- TBT: ~200ms (-100ms) ✅
- Bundle size: ~264KB CSS + ~600KB JS (-200KB) ✅

**Work Page (lazy loaded):**
- FCP: ~1.2s (-300ms) ✅
- LCP: ~2.5s (-700ms) ✅
- TBT: ~300ms (-200ms) ✅
- Initial bundle: ~264KB CSS + ~700KB JS (-500KB) ✅
- Demos load on-demand: Additional ~200KB JS per demo

### Success Metrics

**Bundle Size Reduction:**
- Initial load: 20-30% reduction
- Per-route savings: 5-10KB gzipped
- Demo-heavy pages: 40-50% initial reduction

**Performance Improvements:**
- LCP improvement: 300-500ms
- TBT improvement: 100-200ms
- Time to Interactive (TTI): 500-800ms improvement

**User Experience:**
- Perceived load time: 30-40% faster
- Smoother scrolling: Fewer main thread blocks
- Better mobile performance: 50% reduction in diagram code

---

## Monitoring and Validation

### Tools

**Bundle Analysis:**
```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze bundles
ANALYZE=true npm run build
```

**Lighthouse CI:**
```bash
# Install Lighthouse CI
npm install --save-dev @lhci/cli

# Run Lighthouse on all pages
lhci autorun --config=lighthouserc.json
```

**Real User Monitoring (RUM):**
- Add Web Vitals tracking
- Monitor Core Web Vitals in production
- Track bundle size over time

### Validation Checklist

**Pre-Deployment:**
- [ ] Bundle size reduced by 20%+
- [ ] All demos load correctly
- [ ] Loading skeletons appear
- [ ] No console errors
- [ ] Lighthouse scores improved

**Post-Deployment:**
- [ ] Monitor Web Vitals (FCP, LCP, CLS)
- [ ] Track error rates (failed lazy loads)
- [ ] Measure user engagement (demo interactions)
- [ ] Compare bundle sizes month-over-month

---

## Rollout Strategy

### Week 1: Phase 1 (Large Demos)

**Day 1-2:**
- Implement lazy loading for Athletes First demos
- Add loading skeletons
- Test on dev server

**Day 3-4:**
- Implement lazy loading for CREaiT demos
- Implement lazy loading for Zero demo
- Bundle analysis

**Day 5:**
- Deploy to staging
- Run Lighthouse tests
- Validate bundle reduction

### Week 2: Phase 2 (Pitch Decks)

**Day 1-3:**
- Refactor pitch decks into sections
- Implement scroll-triggered loading
- Test intersection observers

**Day 4-5:**
- Deploy to staging
- Performance testing
- Fix any loading issues

### Week 3: Phase 3 + 4 (Mobile & Libraries)

**Day 1-2:**
- Implement device-based diagram loading
- Add third-party library splitting

**Day 3:**
- Final bundle analysis
- Lighthouse testing across all pages

**Day 4-5:**
- Deploy to production
- Monitor RUM metrics
- Document results

---

## Risks and Mitigations

### Risk 1: Loading Flicker

**Problem**: Lazy loaded components cause visible layout shifts

**Mitigation:**
- Add skeleton loaders matching component dimensions
- Use CSS min-height to reserve space
- Preload components on hover/scroll proximity

### Risk 2: SEO Impact

**Problem**: Client-only demos not indexed by search engines

**Mitigation:**
- Keep pitch deck outlines SSR-rendered
- Add structured data for demo descriptions
- Use semantic HTML in loading states

### Risk 3: Slower Perceived Performance

**Problem**: Users wait for demos to load after page load

**Mitigation:**
- Show engaging loading animations
- Preload demos on link hover
- Load critical demos on page mount (only non-critical on scroll)

---

## Future Optimizations

### Image Optimization (Q1 2026)

- Implement next/image for all static images
- Use WebP format with fallbacks
- Add lazy loading for below-fold images
- Optimize hero images with priority loading

### CSS Purging (Q1 2026)

- Audit Tailwind CSS for unused classes
- Implement PurgeCSS for production builds
- Remove legacy CSS from Phase 3

### API Route Optimization (Q2 2026)

- Implement edge caching for API routes
- Add Redis for session storage
- Optimize database queries

---

## References

### Documentation
- **Next.js Dynamic Imports**: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
- **Web Vitals**: https://web.dev/vitals/
- **Bundle Analyzer**: https://www.npmjs.com/package/@next/bundle-analyzer
- **Lighthouse CI**: https://github.com/GoogleChrome/lighthouse-ci

### Internal Docs
- **Phase 4 Report**: `docs/reports/PHASE_4_COMPLETION_REPORT.md`
- **Design Tokens**: `docs/design-system/DESIGN_TOKENS.md`
- **Visual Testing**: `docs/testing/VISUAL_REGRESSION_STRATEGY.md`

---

**Document Version:** 1.0
**Last Updated:** December 10, 2025
**Status:** 📊 Ready for Implementation
**Next Review:** After Phase 1 completion

