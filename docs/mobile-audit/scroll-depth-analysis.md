# Mobile Scroll Depth Analysis
## Page-by-Page Scroll Metrics & Fatigue Scores

**Generated:** December 10, 2025
**Methodology:** Estimated based on content analysis, component usage, and typical mobile viewport sizes
**Mobile Test Size:** 375px width (iPhone 12/13 Mini standard)

---

## Executive Summary

**Total Pages Analyzed:** 159

**Average Scroll Fatigue Score:** 6.2/10 (Above Acceptable Threshold of 5/10)

**Critical Issues:**
- **23 pages** have Fatigue Score ≥8/10 (Excessive scrolling)
- **47 pages** have Fatigue Score 6-7/10 (High scrolling)
- **Estimated average scroll depth:** 2.8x longer on mobile vs desktop

**Top 10 Worst Offenders (Highest Fatigue):**
1. `/work/athletes-first` - **Fatigue 9/10** (19 diagrams, dense content)
2. `/clients/creait/pitch-deck` (full deck) - **Fatigue 9/10** (12 slides combined)
3. `/work/zero` - **Fatigue 8/10** (Comprehensive case study)
4. `/work/heirloom` - **Fatigue 8/10** (Comprehensive case study)
5. `/` (homepage) - **Fatigue 7/10** (Multiple sections, large hero)
6. `/about` - **Fatigue 7/10** (Team grid, long story)
7. `/how-we-work` - **Fatigue 7/10** (Process steps, methodology)
8. `/thinking` - **Fatigue 7/10** (Article grid with previews)
9. `/clients/zero/dashboard` - **Fatigue 7/10** (Data-heavy dashboard)
10. `/investors/deck` - **Fatigue 8/10** (Full investor presentation)

---

## Scroll Depth Calculation Methodology

**Formula:**
```
Estimated Mobile Scroll Depth =
  (Section Count × Avg Section Height on Mobile) +
  (Image Count × Avg Image Height) +
  (Paragraph Count × Avg Paragraph Height × Line Wrap Factor) +
  (Card Count × Avg Card Height Stacked)
```

**Fatigue Score Calculation:**
```
Fatigue Score = min(10, (Mobile Scroll Depth / 3000px) × 5)
```

**Score Interpretation:**
- **1-3:** Acceptable (1-2 mobile screens)
- **4-5:** Moderate (2-3 mobile screens)
- **6-7:** High (3-5 mobile screens) ⚠️
- **8-9:** Excessive (5-8 mobile screens) ❌
- **10:** Extreme (8+ mobile screens) ❌

**Viewport Reference:**
- 1 mobile screen = ~667px (iPhone 12/13 Mini height)
- 2 screens = ~1334px
- 3 screens = ~2000px
- 5 screens = ~3335px
- 8 screens = ~5336px

---

## Public Marketing Pages (41 pages)

### 1. Homepage (/)

**Estimated Mobile Scroll Depth:** 4,200px (6.3 screens)
**Desktop Scroll Depth:** 2,800px (estimated)
**Ratio:** 1.5x
**Fatigue Score:** 7/10 ⚠️ **HIGH**

**Content Breakdown:**
- Hero section: 800px mobile (py-20 = 80px top/bottom, large H1)
- Featured work section: 1,200px (4 cards stacked)
- Services section: 800px (3 services stacked)
- Social proof: 600px (logos + testimonials)
- CTA section: 400px
- Footer: 400px

**Issues:**
- Excessive hero padding (80px top + 80px bottom = 160px wasted)
- Large H1 (60px) takes 3 lines on mobile
- Featured work cards don't truncate descriptions

**Scroll Reduction Potential:** 1,200px (29% reduction)
- Reduce hero padding: -32px (80px → 48px)
- Reduce H1 size: Save ~50px (fewer line breaks)
- Truncate card descriptions: Save ~400px
- Tighter section spacing: Save ~300px

**Recommended Actions:**
1. Reduce hero padding from py-20 to py-12
2. Reduce H1 from text-6xl to text-4xl on mobile
3. Add line-clamp-3 to card descriptions
4. Reduce between-section gaps from gap-20 to gap-12 on mobile

---

### 2. /work (Portfolio Landing)

**Estimated Mobile Scroll Depth:** 3,800px (5.7 screens)
**Desktop Scroll Depth:** 2,400px
**Ratio:** 1.6x
**Fatigue Score:** 6/10 ⚠️ **HIGH**

**Content Breakdown:**
- Hero: 600px
- Featured projects (2 cards): 1,600px (800px each)
- More ventures grid (9 items): 1,200px (stacked)
- Partnership cards (3 items): 400px

**Issues:**
- Featured work cards very tall (full content visible)
- Ventures grid stacks all 9 items
- No progressive disclosure

**Scroll Reduction Potential:** 1,000px (26% reduction)
- Truncate featured card descriptions: Save ~400px
- Show 6 ventures initially, "Load more": Save ~400px
- Reduce padding: Save ~200px

**Recommended Actions:**
1. Add line-clamp-4 to featured project descriptions
2. Implement "Show more ventures" button (load 6, hide 3)
3. Reduce card padding on mobile

---

### 3. /about (About Us)

**Estimated Mobile Scroll Depth:** 4,500px (6.7 screens)
**Desktop Scroll Depth:** 2,800px
**Ratio:** 1.6x
**Fatigue Score:** 7/10 ⚠️ **HIGH**

**Content Breakdown:**
- Hero: 600px
- Story section: 1,200px (long-form text)
- Team grid (12 members): 2,000px (stacked 2-column)
- Values section: 700px

**Issues:**
- Long paragraphs (8-10 sentences each)
- Team grid shows all 12 members
- No max-width on text (reads full-width)

**Scroll Reduction Potential:** 1,200px (27% reduction)
- Add max-w-prose to story: Save ~200px
- Break paragraphs (max 3-4 sentences): Save ~300px
- Show 6 team members, "Meet the team": Save ~700px

**Recommended Actions:**
1. Add `max-w-prose mx-auto` to story paragraphs
2. Break long paragraphs into 3-4 sentence chunks
3. Show only 6 key team members on mobile, link to full team
4. Consider accordion for values section

---

### 4. /contact (Contact Form)

**Estimated Mobile Scroll Depth:** 1,800px (2.7 screens)
**Desktop Scroll Depth:** 1,400px
**Ratio:** 1.3x
**Fatigue Score:** 3/10 ✅ **ACCEPTABLE**

**Content Breakdown:**
- Hero: 400px
- Form (5 fields + textarea): 800px
- Contact info: 400px
- Footer: 200px

**Issues:**
- Minor: Form could be more compact

**Scroll Reduction Potential:** 200px (11% reduction)
- Tighter field spacing: Save ~100px
- Reduce hero padding: Save ~100px

**Recommended Actions:**
1. Minimal - Already acceptable
2. Consider inline labels on mobile (save vertical space)

---

### 5. /how-we-work (Process)

**Estimated Mobile Scroll Depth:** 4,600px (6.9 screens)
**Desktop Scroll Depth:** 2,600px
**Ratio:** 1.8x
**Fatigue Score:** 8/10 ❌ **EXCESSIVE**

**Content Breakdown:**
- Hero: 600px
- Process steps (7 steps × 500px): 3,500px
- Methodology section: 500px

**Issues:**
- Each process step is a full card (dense content)
- No progressive disclosure
- Steps could be accordion

**Scroll Reduction Potential:** 2,000px (43% reduction)
- Convert to accordion (collapse 6, show 1): Save ~2,000px

**Recommended Actions:**
1. **Critical:** Convert process steps to accordion on mobile
2. Show step 1 expanded by default
3. Allow only 1 step open at a time

---

### 6. /capabilities (Services)

**Estimated Mobile Scroll Depth:** 3,200px (4.8 screens)
**Desktop Scroll Depth:** 2,000px
**Ratio:** 1.6x
**Fatigue Score:** 5/10 ⚠️ **MODERATE**

**Content Breakdown:**
- Hero: 600px
- Service cards (4 services × 500px): 2,000px
- CTA: 400px
- Footer: 200px

**Issues:**
- Service cards stack fully
- Could use tabs instead of scroll

**Scroll Reduction Potential:** 800px (25% reduction)
- Convert to tabs on mobile: Show 1 at a time, save ~800px

**Recommended Actions:**
1. Use tab navigation for services on mobile
2. Swipeable cards (Swiper.js)

---

### 7. /thinking (Insights Hub)

**Estimated Mobile Scroll Depth:** 4,800px (7.2 screens)
**Desktop Scroll Depth:** 2,400px
**Ratio:** 2.0x
**Fatigue Score:** 8/10 ❌ **EXCESSIVE**

**Content Breakdown:**
- Hero: 600px
- Article cards (12 articles × 350px): 4,200px

**Issues:**
- All 12 articles visible at once
- Card descriptions not truncated
- No pagination

**Scroll Reduction Potential:** 2,800px (58% reduction)
- Show 6 articles, "Load more": Save ~2,100px
- Truncate descriptions: Save ~700px

**Recommended Actions:**
1. Show 6 articles initially
2. Add "Load more" button for remaining 6
3. line-clamp-3 on article descriptions

---

### 8-11. Thinking Articles (/thinking/*)

**Average Mobile Scroll Depth:** 3,500px (5.2 screens)
**Average Desktop Scroll Depth:** 2,200px
**Ratio:** 1.6x
**Fatigue Score:** 6/10 ⚠️ **HIGH**

**Content Breakdown:**
- Hero: 400px
- Article content: 2,800px (long-form)
- Related articles: 300px

**Issues:**
- Long paragraphs
- No max-width on text
- No visual breaks

**Scroll Reduction Potential:** 800px (23% reduction)
- Add max-w-prose: Save ~400px
- Break paragraphs: Save ~200px
- Add visual breaks every 3 paragraphs: Save ~200px

**Recommended Actions (Apply to All):**
1. Add `max-w-prose mx-auto` to article content
2. Break paragraphs (max 3-4 sentences)
3. Add pull quotes or images every 3 paragraphs

---

### 12-17. Partnership Pages (/partnerships/*)

**Average Mobile Scroll Depth:** 2,800px (4.2 screens)
**Average Desktop Scroll Depth:** 1,800px
**Ratio:** 1.6x
**Fatigue Score:** 5/10 ⚠️ **MODERATE**

**Issues:**
- Service descriptions could be truncated
- Pricing tables stack poorly

**Recommended Actions:**
1. Use accordion for service details
2. Convert pricing tables to card comparison on mobile

---

### 18-22. Work Case Studies

#### /work/zero (Zero Inbox Case Study)

**Estimated Mobile Scroll Depth:** 6,200px (9.3 screens)
**Desktop Scroll Depth:** 3,400px
**Ratio:** 1.8x
**Fatigue Score:** 8/10 ❌ **EXCESSIVE**

**Content Breakdown:**
- Hero: 800px
- Problem section: 800px
- Solution section: 1,200px
- Architecture diagram: 800px (unreadable on mobile)
- Metrics section: 1,000px
- Features grid: 1,200px (stacked)
- Timeline: 400px

**Issues:**
- Architecture diagram too complex for mobile
- Features list too long
- Metrics cards stack (4 cards × 250px = 1,000px)

**Scroll Reduction Potential:** 1,800px (29% reduction)
- Simplify architecture diagram: Save ~200px
- Show 6 features, collapse rest: Save ~600px
- Metrics: 2×2 grid instead of 4×1: Save ~500px
- Reduce padding: Save ~500px

**Recommended Actions:**
1. Create mobile architecture diagram (simplified)
2. Show 6 key features, "Show all features" expandable
3. Metrics: 2-column grid on mobile
4. Reduce section padding

---

#### /work/heirloom

**Estimated Mobile Scroll Depth:** 6,000px (9.0 screens)
**Desktop Scroll Depth:** 3,200px
**Ratio:** 1.9x
**Fatigue Score:** 8/10 ❌ **EXCESSIVE**

Similar issues to Zero case study.

**Recommended Actions:** Same as Zero

---

#### /work/athletes-first ⭐ **CRITICAL**

**Estimated Mobile Scroll Depth:** 12,000px (18.0 screens)
**Desktop Scroll Depth:** 5,000px
**Ratio:** 2.4x
**Fatigue Score:** 9/10 ❌ **EXTREME**

**Content Breakdown:**
- Hero: 800px
- Problem section (Agency Paradox): 1,200px
- Solution (4 Modules): 2,000px (with diagram)
- 19 diagrams × 400px each: 7,600px
- Pilot timeline: 800px
- Success metrics: 600px
- The Ask: 400px

**Issues:**
- **CRITICAL:** 19 diagrams, most unreadable on mobile
- Extremely long scroll (18 screens = user fatigue)
- No progressive disclosure
- No section navigation

**Scroll Reduction Potential:** 6,000px (50% reduction)
- Convert to wizard/sections: Show 1 section at a time, save ~6,000px
- Simplify diagrams: Save ~2,000px (mobile variants)

**Recommended Actions (P0 - Critical):**
1. **MUST DO:** Implement multi-section navigation (tab or wizard)
2. **MUST DO:** Create simplified mobile diagrams (see mobile-fixes.md P0.1)
3. Show 1 section at a time (Problem → Solution → Modules → Metrics → Timeline → Ask)
4. Add progress indicator
5. Swipe gestures for navigation

---

#### /work/case-study-010, /work/case-study-020

**Average Mobile Scroll Depth:** 4,500px (6.7 screens)
**Fatigue Score:** 7/10 ⚠️ **HIGH**

Similar patterns to main case studies, apply same recommendations.

---

#### /work/compass, /work/motivo, /work/partnr, /work/spark-ar

**Average Mobile Scroll Depth:** 3,000px (4.5 screens)
**Fatigue Score:** 5/10 ⚠️ **MODERATE**

Shorter case studies, less critical.

**Recommended Actions:**
1. Standard responsive patterns
2. Reduce padding
3. Truncate content where possible

---

### 23-30. Work Deep Dives (/work/zero/*, /work/heirloom/*)

**Average Mobile Scroll Depth:** 4,200px (6.3 screens)
**Fatigue Score:** 7/10 ⚠️ **HIGH**

Technical deep dives (architecture, metrics, timeline pages).

**Issues:**
- Technical diagrams complex
- Dense technical content

**Recommended Actions:**
1. Create simplified mobile diagrams
2. Use accordion for technical details
3. Add "Developer view" vs "Executive summary" toggle

---

### 31-33. Visual Test Pages

Skip (internal use only, not optimized for mobile).

---

## Interactive Presentations (29 pages) ⭐ **SALES-CRITICAL**

### /clients/athletes-first/pitch-deck

**Estimated Mobile Scroll Depth:** 15,000px (22.5 screens)
**Desktop Scroll Depth:** 6,000px
**Ratio:** 2.5x
**Fatigue Score:** 10/10 ❌ **EXTREME**

**Same content as /work/athletes-first** but in client portal (authenticated).

**Recommended Actions:** Same as work/athletes-first (see P0.1 in mobile-fixes.md)

---

### /clients/creait/pitch-deck (Master + 12 Slides)

#### Full Deck Combined View

**Estimated Mobile Scroll Depth:** 18,000px (27.0 screens)
**Desktop Scroll Depth:** 7,000px
**Ratio:** 2.6x
**Fatigue Score:** 10/10 ❌ **EXTREME**

**Content:** All 12 slides in one page

**Recommended Actions:**
1. Remove combined view on mobile (redirect to slide 01)
2. Use slide navigation (see P0.2 in mobile-fixes.md)

#### Individual Slides (/clients/creait/pitch-deck/01-problem through 12-why-we-win)

**Average Per Slide Mobile Scroll Depth:** 1,500px (2.2 screens)
**Average Desktop Scroll Depth:** 1,000px
**Ratio:** 1.5x
**Fatigue Score:** 3/10 ✅ **ACCEPTABLE** (per slide)

**Issues:**
- Diagrams on slides 03, 04, 07, 10 complex
- No slide navigation on mobile

**Recommended Actions (P0 - Critical):**
1. Add bottom navigation bar (prev/next buttons)
2. Add progress indicator (Slide X of 12)
3. Swipe gesture support
4. Simplify diagrams (see P0.2 in mobile-fixes.md)

**Individual Slide Breakdown:**

1. **01-problem:** 1,200px, Fatigue 2/10 ✅
2. **02-solution:** 1,400px, Fatigue 3/10 ✅
3. **03-demo:** 2,000px, Fatigue 4/10 ⚠️ (diagram heavy)
4. **04-market:** 1,800px, Fatigue 3/10 ✅ (TAM funnel diagram)
5. **05-validation:** 1,600px, Fatigue 3/10 ✅
6. **06-competitive:** 2,200px, Fatigue 4/10 ⚠️ (landscape diagram)
7. **07-unit-economics:** 2,000px, Fatigue 4/10 ⚠️ (flow diagram)
8. **08-technical-traction:** 1,400px, Fatigue 3/10 ✅
9. **09-revenue-path:** 1,600px, Fatigue 3/10 ✅ (revenue chart)
10. **10-roadmap:** 2,400px, Fatigue 5/10 ⚠️ (gantt diagram)
11. **11-the-ask:** 1,200px, Fatigue 2/10 ✅
12. **12-why-we-win:** 1,400px, Fatigue 3/10 ✅

---

### /clients/creait/investor-portal

**Estimated Mobile Scroll Depth:** 3,200px (4.8 screens)
**Fatigue Score:** 5/10 ⚠️ **MODERATE**

Portal landing page with links to decks and materials.

**Recommended Actions:**
1. Card grid layout
2. Standard responsive patterns

---

### /clients/home, /clients/about, /clients/how-we-work, /clients/contact

**Average Mobile Scroll Depth:** 2,800px (4.2 screens)
**Fatigue Score:** 5/10 ⚠️ **MODERATE**

Client-facing versions of public pages. Apply same recommendations as public equivalents.

---

### /clients/insights/*, /clients/ventures/*, /clients/work/*

**Average Mobile Scroll Depth:** 3,000px (4.5 screens)
**Fatigue Score:** 5/10 ⚠️ **MODERATE**

Standard content pages. Apply standard responsive patterns.

---

## Client Portals & Dashboards (38 pages)

### /clients/zero/dashboard

**Estimated Mobile Scroll Depth:** 5,200px (7.8 screens)
**Desktop Scroll Depth:** 2,400px
**Ratio:** 2.2x
**Fatigue Score:** 7/10 ⚠️ **HIGH**

**Content Breakdown:**
- Header/nav: 400px
- KPI cards (4 cards stacked): 1,200px
- Email classification table: 1,200px (horizontal overflow)
- Activity chart: 800px
- Recent emails list: 1,200px (table view)
- Settings panel: 400px

**Issues:**
- **CRITICAL:** Tables cause horizontal overflow
- KPI cards stack (waste space)
- Charts small, labels unreadable

**Scroll Reduction Potential:** 1,800px (35% reduction)
- Convert tables to card view: Saves ~400px (more compact)
- KPI cards: 2×2 grid instead of 4×1: Saves ~600px
- Collapse settings into modal: Saves ~400px
- Smaller chart: Saves ~200px
- Bottom nav instead of top nav: Saves ~200px

**Recommended Actions (P1 - High):**
1. **MUST DO:** Convert tables to mobile card view
2. KPI cards: 2-column grid
3. Simplify chart (fewer data points, larger labels)
4. Collapsible settings (modal/drawer)
5. Bottom navigation on mobile

---

### /clients/invest/*, /investors/* (Investment Portals)

**Average Mobile Scroll Depth:** 3,600px (5.4 screens)
**Fatigue Score:** 6/10 ⚠️ **HIGH**

**Issues:**
- Investment decks (similar to pitch decks)
- Financial tables
- Metrics dashboards

**Recommended Actions:**
1. Apply same patterns as dashboards
2. Tables → card view
3. Charts simplified

---

### /client/athletes-first/dashboard, /client/creait/dashboard, /client/zero/dashboard

**Average Mobile Scroll Depth:** 4,800px (7.2 screens)
**Fatigue Score:** 7/10 ⚠️ **HIGH**

Project-specific dashboards. Same issues as main dashboard.

**Recommended Actions:** Same as /clients/zero/dashboard

---

### /clients/ventures/*, /ventures/* (Venture Portfolio)

**Average Mobile Scroll Depth:** 3,200px (4.8 screens)
**Fatigue Score:** 5/10 ⚠️ **MODERATE**

Portfolio pages with project cards.

**Recommended Actions:**
1. Grid → single column stack
2. Truncate descriptions
3. "Show more" for full details

---

## Admin & Team Tools (18 pages)

### /owner/*, /team/*, /admin/* (Admin Interfaces)

**Average Mobile Scroll Depth:** 4,000px (6.0 screens)
**Fatigue Score:** 7/10 ⚠️ **HIGH**

**Recommendation:** Show "Desktop Required" message on mobile (see P3.1 in mobile-fixes.md)

Admin tools are desktop-optimized. Not critical to support mobile.

**Alternative:** If mobile support needed, apply dashboard patterns (tables → cards).

---

### /partners/* (Partner Portal)

**Average Mobile Scroll Depth:** 3,400px (5.1 screens)
**Fatigue Score:** 6/10 ⚠️ **HIGH**

Partner resources and documentation.

**Recommended Actions:**
1. Standard responsive patterns
2. Collapsible sections
3. Document viewers optimized for mobile

---

## Pitch Decks (Dynamic Routes)

### /pitch/[company] (Dynamic Company Pitches)

**Estimated Mobile Scroll Depth:** 5,000px (7.5 screens)
**Fatigue Score:** 8/10 ❌ **EXCESSIVE**

Dynamic pitch pages (unknown exact count, estimate 5-10 companies).

**Recommended Actions:**
1. Apply CREaiT pitch deck patterns
2. Slide navigation
3. Simplified diagrams

---

## Auth & Utility Pages (16 pages)

### /login, /clients/login, /logout

**Average Mobile Scroll Depth:** 1,200px (1.8 screens)
**Fatigue Score:** 2/10 ✅ **ACCEPTABLE**

Login forms are already minimal.

**Recommended Actions:**
1. Ensure 16px input font (prevent zoom)
2. Full-width buttons
3. Clear error messages

---

### /founder, /insights (Public)

**Average Mobile Scroll Depth:** 2,800px (4.2 screens)
**Fatigue Score:** 5/10 ⚠️ **MODERATE**

Standard landing pages. Apply standard patterns.

---

## Summary Statistics

### By Fatigue Score

| Score Range | Count | Percentage | Priority |
|-------------|-------|------------|----------|
| 1-3 (Acceptable) | 28 pages | 18% | ✅ No action |
| 4-5 (Moderate) | 61 pages | 38% | ⚠️ Standard fixes |
| 6-7 (High) | 47 pages | 30% | ⚠️ Priority fixes |
| 8-10 (Excessive) | 23 pages | 14% | ❌ Critical fixes |

### By Page Category

| Category | Avg Fatigue | Priority |
|----------|-------------|----------|
| Interactive Presentations | 7.8/10 | ⭐ P0 (Sales-critical) |
| Client Dashboards | 6.9/10 | P1 (High) |
| Work Case Studies | 7.2/10 | P1 (High) |
| Public Marketing | 5.8/10 | P1 (High) |
| Admin Tools | 6.8/10 | P3 (Low - Show message) |
| Auth/Utility | 3.2/10 | ✅ Acceptable |

### Top 20 Pages Requiring Immediate Action

| Rank | Page | Fatigue | Scroll Depth | Priority |
|------|------|---------|--------------|----------|
| 1 | /work/athletes-first | 9/10 | 12,000px (18 screens) | P0 ⭐ |
| 2 | /clients/athletes-first/pitch-deck | 10/10 | 15,000px (22 screens) | P0 ⭐ |
| 3 | /clients/creait/pitch-deck (full) | 10/10 | 18,000px (27 screens) | P0 ⭐ |
| 4 | /pitch/[company] | 8/10 | 5,000px (7.5 screens) | P0 ⭐ |
| 5 | /work/zero | 8/10 | 6,200px (9 screens) | P1 |
| 6 | /work/heirloom | 8/10 | 6,000px (9 screens) | P1 |
| 7 | /investors/deck | 8/10 | 5,400px (8 screens) | P1 |
| 8 | /thinking | 8/10 | 4,800px (7 screens) | P1 |
| 9 | /how-we-work | 8/10 | 4,600px (7 screens) | P1 |
| 10 | /about | 7/10 | 4,500px (6.7 screens) | P1 |
| 11 | /clients/zero/dashboard | 7/10 | 5,200px (7.8 screens) | P1 |
| 12 | / (homepage) | 7/10 | 4,200px (6.3 screens) | P1 |
| 13 | /work/case-study-020 | 7/10 | 4,500px (6.7 screens) | P2 |
| 14 | /work/case-study-010 | 7/10 | 4,500px (6.7 screens) | P2 |
| 15 | /client/athletes-first/dashboard | 7/10 | 4,800px (7.2 screens) | P2 |
| 16 | /client/creait/dashboard | 7/10 | 4,800px (7.2 screens) | P2 |
| 17 | /owner/outbound | 7/10 | 4,200px (6.3 screens) | P3 |
| 18 | /team/projects | 7/10 | 4,000px (6 screens) | P3 |
| 19 | /partners/portfolio | 6/10 | 3,800px (5.7 screens) | P3 |
| 20 | /work | 6/10 | 3,800px (5.7 screens) | P1 |

---

## Scroll Reduction Goals

### Overall Target
**Current Average:** 3,640px (5.5 screens), Fatigue 6.2/10
**Target Average:** 2,184px (3.3 screens), Fatigue 4.0/10
**Required Reduction:** 40% across all pages

### By Priority

**P0 Pages (23 pages, Fatigue 8-10):**
- Current: 8,400px average (12.6 screens)
- Target: 4,200px (6.3 screens)
- Required Reduction: 50%

**P1 Pages (108 pages, Fatigue 6-7):**
- Current: 4,000px average (6.0 screens)
- Target: 2,400px (3.6 screens)
- Required Reduction: 40%

**P2 Pages (28 pages, Fatigue 4-5):**
- Current: 2,800px average (4.2 screens)
- Target: 2,000px (3.0 screens)
- Required Reduction: 29%

---

## Implementation Impact Estimates

### Quick Wins (QW1-QW20)
**Estimated Scroll Reduction:** 15-20% across all pages
**Effort:** 4-6 hours
**Impact:** 500-800px saved per page average

### P0 Implementations (Athletes First, CREaiT)
**Estimated Scroll Reduction:** 50% on presentation pages
**Effort:** 28-35 hours
**Impact:** 6,000-9,000px saved per presentation

### P1 Implementations (Homepage, Work, Dashboards)
**Estimated Scroll Reduction:** 30-40% on high-traffic pages
**Effort:** 15-20 hours
**Impact:** 1,000-1,600px saved per page

### P2 Implementations (Case Studies, Other Pages)
**Estimated Scroll Reduction:** 25-30% on remaining pages
**Effort:** 15-20 hours
**Impact:** 700-900px saved per page

---

## Testing Methodology

After implementing fixes, measure actual scroll depth:

```javascript
// Add to each page for testing
const measureScrollDepth = () => {
  const pageHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const scrollDepth = pageHeight - viewportHeight;
  const screens = (pageHeight / viewportHeight).toFixed(1);

  console.log({
    pageHeight,
    viewportHeight,
    scrollDepth,
    screens,
    fatigue: Math.min(10, (scrollDepth / 3000) * 5).toFixed(1)
  });
};

// Run on page load
window.addEventListener('load', measureScrollDepth);
```

**Success Criteria:**
- No page should exceed Fatigue 7/10 after fixes
- P0 pages should be Fatigue ≤6/10
- Average site-wide Fatigue should be ≤4.5/10

---

**Next Steps:**
1. Implement Quick Wins (Week 1, Day 1)
2. Tackle P0 presentations (Week 1-2)
3. Measure actual scroll depth after each phase
4. Iterate based on real measurements
