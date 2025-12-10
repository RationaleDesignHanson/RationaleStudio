# Master Mobile Optimization Execution Plan

**Created:** December 10, 2025 (Session 3)
**Status:** In Progress - Phase 1
**Total Scope:** 76-104 hours remaining
**Completion:** 29/29 diagrams done, ~75% remaining

---

## 📊 Overall Progress

### Completed (Sessions 1-3)
- ✅ **Pattern Library:** 5 reusable diagram patterns (Swipeable, Step-by-Step, Accordion, Progressive Disclosure, Responsive SVG)
- ✅ **Diagrams:** 29/29 mobile-optimized (100%)
  - Athletes First: 5 diagrams
  - CREaiT: 7 diagrams
  - Zero: 5 diagrams
  - Heirloom: 4 diagrams
  - Rationale Overview: 6 diagrams (3 new + 3 already responsive)
- ✅ **Fluid Typography System:** clamp() functions for smooth viewport scaling
- ✅ **Image Optimization:** 90/95 images converted to WebP with responsive variants
- ✅ **TypeScript:** All 19 mobile implementation errors fixed
- ✅ **Breakpoints:** Tailwind + CSS alignment standardized

### Remaining Work Summary
- ☐ Phase 1: Quick Wins (8-10 hours)
- ☐ Phase 2: Homepage + Work Page (12-16 hours)
- ☐ Phase 3: Athletes First Presentation (8-10 hours)
- ☐ Phase 4: CREaiT Presentation (6-8 hours)
- ☐ Phase 5: Client Portal Dashboards (7-10 hours)
- ☐ Phase 6: All Remaining Pages (30-40 hours)
- ☐ Phase 7: Testing & QA (7-12 hours)
- ☐ Phase 8: Zero Demo Full-Screen Modal (2-3 hours)

**Total Remaining:** 76-104 hours

---

## Phase 1: Quick Wins (8-10 hours)

### Breakpoint Fixes (2-3 hours)

☐ **1.1 Header Navigation Mobile Menu**
- File: `components/layout/Header.tsx`
- Issue: Hamburger menu items too close together
- Fix: Increase spacing to 44x44px minimum tap targets
- Lines: ~180-295
- Time: 30 min

☐ **1.2 Footer Mobile Stacking**
- File: `components/layout/Footer.tsx`
- Issue: Footer columns cramped on mobile
- Fix: Stack columns vertically, increase spacing
- Time: 20 min

☐ **1.3 Card Grid Responsive**
- Files: `components/cards/*.tsx` (15 card components)
- Issue: `grid-cols-3` doesn't break to mobile
- Fix: Change to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Time: 1 hour

☐ **1.4 Button Group Stacking**
- Files: Multiple pages with button groups
- Issue: Horizontal button groups overflow on mobile
- Fix: Stack vertically with `flex-col` on mobile
- Time: 30 min

### Typography Mobile Reductions (1-2 hours)

☐ **1.5 Hero Heading Mobile Scale**
- Files: `app/(public)/page.tsx`, `app/(public)/work/page.tsx`, etc.
- Issue: `text-6xl` (72px) fills entire mobile screen
- Fix: Change to `text-4xl md:text-5xl lg:text-6xl` (36px → 48px → 60px)
- Time: 45 min

☐ **1.6 Section Heading Reduction**
- Files: All public pages
- Issue: `text-4xl` too large on mobile
- Fix: Change to `text-2xl md:text-3xl lg:text-4xl`
- Time: 30 min

☐ **1.7 Paragraph Max Width**
- Files: All long-form content pages
- Issue: No max-width on paragraphs (100+ characters per line)
- Fix: Add `max-w-prose` (65ch) to all body text containers
- Time: 30 min

### Spacing Mobile Condensation (1-2 hours)

☐ **1.8 Section Padding Reduction**
- Files: All pages
- Issue: `py-20` (80px) wastes mobile viewport
- Fix: Change to `py-12 md:py-16 lg:py-20` (48px → 64px → 80px)
- Time: 1 hour

☐ **1.9 Container Horizontal Padding**
- Files: All pages
- Issue: `px-8` too wide on small phones
- Fix: Change to `px-4 sm:px-6 md:px-8` (16px → 24px → 32px)
- Time: 30 min

☐ **1.10 Gap Reduction in Grids**
- Files: All grid layouts
- Issue: `gap-8` too large on mobile
- Fix: Change to `gap-4 md:gap-6 lg:gap-8`
- Time: 30 min

### Image & Asset Optimization (2-3 hours)

☐ **1.11 Lazy Loading Images**
- Files: All pages with images
- Issue: All images load immediately
- Fix: Add `loading="lazy"` to all `<img>` tags below fold
- Time: 1 hour

☐ **1.12 Hero Image Mobile Crops**
- Files: Homepage, Work page, About page
- Issue: Landscape hero images don't fit mobile portrait
- Fix: Create mobile portrait crops (4:5 or 9:16 aspect ratio)
- Time: 1 hour (asset creation + implementation)

☐ **1.13 Remaining 5 Images WebP Conversion**
- Files: 5 remaining images not yet optimized
- Fix: Convert to WebP with responsive variants
- Time: 20 min

### Form & Interactive Elements (1-2 hours)

☐ **1.14 Contact Form Mobile**
- File: `app/(public)/contact/page.tsx`
- Issue: Form inputs too small, labels cramped
- Fix: Increase input height to 48px, stack labels vertically
- Time: 30 min

☐ **1.15 Search Form Mobile**
- Files: Pages with search functionality
- Issue: Search input + button overflow
- Fix: Stack vertically or use full-width input
- Time: 20 min

☐ **1.16 Modal Full-Screen Mobile**
- Files: All modal components
- Issue: Modals don't go full-screen on mobile
- Fix: Add `h-full w-full` classes on mobile breakpoint
- Time: 45 min

☐ **1.17 Tooltip → Tap for Mobile**
- Files: All components with tooltips
- Issue: Hover tooltips don't work on touch devices
- Fix: Change to click/tap to show tooltip on mobile
- Time: 30 min

### Touch Target Verification (1 hour)

☐ **1.18 Verify All Touch Targets ≥44x44px**
- Files: All interactive elements
- Issue: Some buttons/links too small
- Fix: Audit and increase to minimum 44x44px (WCAG 2.1 AA)
- Time: 1 hour

☐ **1.19 Navigation Link Spacing**
- File: `components/layout/Header.tsx`
- Issue: Nav links too close together in mobile menu
- Fix: Increase padding/margin to 44x44px minimum
- Time: 20 min

☐ **1.20 CTA Button Mobile Sizing**
- Files: All pages with CTAs
- Issue: Some CTAs too small on mobile
- Fix: Increase to `h-12` (48px) minimum on mobile
- Time: 20 min

---

## Phase 2: Homepage + Work Page (12-16 hours)

### Homepage (app/(public)/page.tsx) (8-10 hours)

☐ **2.1 Hero Section Condensation**
- Lines: ~15-80
- Issue: 80px vertical padding, H1 too large
- Fix:
  - Reduce `py-20` → `py-12 md:py-16 lg:py-20`
  - Reduce H1 `text-6xl` → `text-4xl md:text-5xl lg:text-6xl`
  - Reduce subtitle `text-xl` → `text-lg md:text-xl`
  - Consider removing secondary CTA on mobile
- Time: 1 hour

☐ **2.2 Featured Work Section Mobile Grid**
- Lines: ~85-150
- Issue: 2-column grid cramped on mobile
- Fix: Change to `grid-cols-1 lg:grid-cols-2` (stack on mobile)
- Time: 30 min

☐ **2.3 Work Cards Mobile Optimization**
- Issue: FeaturedWorkCard shows all content (too tall)
- Fix:
  - Truncate descriptions to 3 lines with `line-clamp-3`
  - Reduce metrics from 3 to 2 most important on mobile
  - Smaller badge sizes
- Time: 1 hour

☐ **2.4 Services/Capabilities Section**
- Lines: ~155-220
- Issue: 3-column grid too cramped on mobile
- Fix: Change to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Time: 30 min

☐ **2.5 Testimonials/Social Proof Section**
- Issue: Horizontal scroll or overflow
- Fix: Convert to vertical stack or carousel on mobile
- Time: 1 hour

☐ **2.6 CTA Section Mobile**
- Lines: Bottom of page
- Issue: Multiple CTAs side-by-side
- Fix: Stack CTAs vertically with spacing
- Time: 20 min

☐ **2.7 Stats/Metrics Section**
- Issue: 4-column stats grid
- Fix: Change to `grid-cols-2 lg:grid-cols-4` (2x2 on mobile)
- Time: 30 min

☐ **2.8 Footer Condensation**
- Issue: 4-column footer too wide
- Fix: Stack columns vertically on mobile
- Time: 30 min

☐ **2.9 Scroll Depth Reduction Testing**
- Issue: Current mobile scroll depth ~8-10 screens
- Target: Reduce to 5-6 screens (30% reduction)
- Method: Test all condensation changes, measure improvement
- Time: 1 hour

### Work Page (app/(public)/work/page.tsx) (4-6 hours)

☐ **2.10 Featured Projects Grid**
- Lines: ~30-180
- Issue: Zero + Heirloom side-by-side cramped
- Fix: Stack vertically on mobile
- Time: 30 min

☐ **2.11 More Ventures Grid**
- Lines: ~200-280
- Issue: 3-column grid too cramped
- Fix: Change to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Time: 30 min

☐ **2.12 Partnership Cards Mobile**
- Lines: ~290-350
- Issue: Card content too dense
- Fix: Truncate descriptions, reduce metrics
- Time: 45 min

☐ **2.13 Status Badges Mobile**
- Issue: Some badges too small to read
- Fix: Increase to `size="md"` minimum on mobile
- Time: 15 min

☐ **2.14 "Quick Overview" Buttons Mobile**
- Lines: ~360-380
- Issue: Button positioning awkward
- Fix: Full-width buttons on mobile
- Time: 20 min

☐ **2.15 Philosophy Boxes Mobile**
- Lines: ~400-450
- Issue: Dense text paragraphs
- Fix: Break into shorter paragraphs, add bullets
- Time: 30 min

---

## Phase 3: Athletes First Presentation (8-10 hours)

### Mobile Navigation Wrapper (2-3 hours)

☐ **3.1 Create Presentation Mobile Navigation Component**
- File: `components/presentation/PresentationMobileNav.tsx` (new)
- Features:
  - Sticky header with progress indicator
  - Prev/Next slide buttons
  - "X of Y" counter
  - Exit button
  - Swipe gestures support
- Time: 2 hours

☐ **3.2 Integrate Mobile Nav into Athletes First Deck**
- File: `components/athletes-first/AthletesFirstPitchDeck.tsx`
- Replace desktop slide navigation with mobile wrapper
- Time: 1 hour

### Content Condensation (3-4 hours)

☐ **3.3 Break Long Paragraphs**
- Files: All Athletes First content components
- Issue: 8-10 sentence paragraphs (wall of text on mobile)
- Fix: Break into 3-4 sentence chunks, add spacing
- Time: 1.5 hours

☐ **3.4 Progressive Disclosure for Dense Sections**
- Issue: Some slides have 5+ bullet points
- Fix: Show first 3 bullets, "Show more" button for rest
- Time: 1 hour

☐ **3.5 Hero Slide Mobile Optimization**
- Issue: Title + subtitle + stats too tall
- Fix: Reduce font sizes, condense spacing
- Time: 30 min

☐ **3.6 Metrics Dashboard Mobile**
- Issue: 4-6 metrics shown side-by-side
- Fix: Show 2x2 grid or vertical stack
- Time: 45 min

### Presentation Flow (2-3 hours)

☐ **3.7 Add Swipe Gestures**
- Library: Use existing Swiper.js from diagram patterns
- Enable left/right swipe for prev/next slide
- Time: 1 hour

☐ **3.8 Slide Transition Animations**
- Add smooth transitions between slides
- Optimize for 60fps on mobile
- Time: 45 min

☐ **3.9 Progress Persistence**
- Save current slide to localStorage
- Resume on page reload
- Time: 30 min

☐ **3.10 Full-Screen Mode Toggle**
- Add button to enter/exit full-screen
- Hide browser chrome
- Time: 30 min

---

## Phase 4: CREaiT Presentation (6-8 hours)

### Slide Navigation System (2-3 hours)

☐ **4.1 12-Page Deck Mobile Navigation**
- Files: `app/clients/creait/pitch-deck/[01-12]/page.tsx`
- Create consistent mobile nav across all 12 pages
- Prev/Next buttons, progress dots
- Time: 2 hours

☐ **4.2 Slide Thumbnails Overview (Optional on Mobile)**
- Show grid of slide thumbnails to jump to any slide
- Accessed via menu button
- Time: 1 hour

### Content Hierarchy Mobile (3-4 hours)

☐ **4.3 Problem Slide Mobile (01-problem)**
- Issue: Dense problem description
- Fix: Break into bullet points, add icons
- Time: 30 min

☐ **4.4 Solution Slide Mobile (02-solution)**
- Issue: 4-5 solution points
- Fix: Progressive disclosure or carousel
- Time: 30 min

☐ **4.5 Demo Slide Mobile (03-demo)**
- Issue: Screenshot too small
- Fix: Make full-width, allow pinch-zoom
- Time: 20 min

☐ **4.6 Market Analysis Mobile (04-market)**
- Issue: TAM/SAM/SOM funnel diagram
- Fix: Already done via RoadmapGanttDiagramMobile ✅
- Time: 0 (complete)

☐ **4.7 Validation Slide Mobile (05-validation)**
- Issue: List of interviews/validations
- Fix: Condense to key stats + "Show details" expandable
- Time: 30 min

☐ **4.8 Competitive Landscape Mobile (06-competitive)**
- Issue: 2x2 matrix diagram
- Fix: Already done via CompetitiveLandscapeDiagramMobile ✅
- Time: 0 (complete)

☐ **4.9 Unit Economics Mobile (07-unit-economics)**
- Issue: Flow diagram
- Fix: Already done via UnitEconomicsFlowDiagramMobile ✅
- Time: 0 (complete)

☐ **4.10 Technical Traction Mobile (08-technical-traction)**
- Issue: Dense technical details
- Fix: Show key metrics, "Learn more" accordion for details
- Time: 30 min

☐ **4.11 Revenue Path Mobile (09-revenue-path)**
- Issue: Chart diagram
- Fix: Already done via RevenueRampDiagramMobile ✅
- Time: 0 (complete)

☐ **4.12 Roadmap Mobile (10-roadmap)**
- Issue: Gantt chart
- Fix: Already done via RoadmapGanttDiagramMobile ✅
- Time: 0 (complete)

☐ **4.13 The Ask Slide Mobile (11-the-ask)**
- Issue: Investment terms + timeline
- Fix: Stack vertically, larger fonts
- Time: 30 min

☐ **4.14 Why We Win Mobile (12-why-we-win)**
- Issue: 4-6 competitive advantages
- Fix: Show 3 most important, accordion for rest
- Time: 30 min

### Deck-Wide Optimizations (1 hour)

☐ **4.15 Consistent Slide Padding**
- All 12 pages use same mobile padding
- `px-4 py-6` on mobile
- Time: 20 min

☐ **4.16 Consistent Typography Scale**
- All slide titles use same mobile scale
- All body text uses same size
- Time: 20 min

☐ **4.17 Add "View Full Deck" Download Button**
- PDF export of full pitch deck
- Available on all slides
- Time: 20 min

---

## Phase 5: Client Portal Dashboards (7-10 hours)

### Zero Dashboard (app/clients/zero/dashboard/page.tsx) (2-3 hours)

☐ **5.1 Email Table → Card View**
- Lines: Data table with 5-8 columns
- Issue: Horizontal overflow on mobile
- Fix: Convert to vertical cards showing key data
- Time: 1.5 hours

☐ **5.2 Filter Bar → Modal**
- Issue: 4-5 filters take up too much space
- Fix: Collapse into "Filters" button that opens modal
- Time: 45 min

☐ **5.3 Charts Mobile Simplification**
- Issue: Chart labels too small
- Fix: Reduce data points, increase label font size
- Time: 30 min

☐ **5.4 Stats Cards Grid**
- Issue: 4-column stats grid
- Fix: Change to `grid-cols-2 lg:grid-cols-4`
- Time: 15 min

### Investment Portals (3-4 hours)

☐ **5.5 Investment Hub (app/clients/invest/page.tsx)**
- Issue: 4 investment cards side-by-side
- Fix: Stack vertically on mobile
- Time: 30 min

☐ **5.6 Amplify Portal (app/clients/invest/amplify/page.tsx)**
- Issue: Dense metrics dashboard
- Fix: Condense to 2-column grid, hide less important metrics
- Time: 1 hour

☐ **5.7 Atlas Portal (app/clients/invest/atlas/page.tsx)**
- Issue: Similar to Amplify
- Fix: Same condensation approach
- Time: 1 hour

☐ **5.8 Studio Investment (app/clients/invest/studio/page.tsx)**
- Issue: Financial projections table
- Fix: Show summary on mobile, "View details" for full table
- Time: 45 min

☐ **5.9 Zero Investment (app/clients/invest/zero/page.tsx)**
- Issue: Roadmap + metrics combined
- Fix: Tabs or accordion to separate sections
- Time: 45 min

### Venture Portals (2-3 hours)

☐ **5.10 Ventures Hub (app/clients/ventures/page.tsx)**
- Issue: 3-column grid
- Fix: Change to `grid-cols-1 lg:grid-cols-3`
- Time: 20 min

☐ **5.11 Dynamic Venture Pages (app/clients/ventures/[slug]/page.tsx)**
- Issue: Mixed content layouts
- Fix: Ensure all use mobile-responsive patterns
- Time: 1.5 hours

☐ **5.12 Venture Project Cards**
- Issue: Card content too dense
- Fix: Truncate descriptions, show key metrics only
- Time: 30 min

---

## Phase 6: All Remaining Pages (30-40 hours)

### Public Pages - Core (6-8 hours)

☐ **6.1 About Page (app/(public)/about/page.tsx)**
- Issue: Long-form content, team photos, timeline
- Fix:
  - Break paragraphs into shorter chunks
  - Stack team photos vertically
  - Timeline use accordion or step-by-step
- Time: 2 hours

☐ **6.2 Contact Page (app/(public)/contact/page.tsx)**
- Issue: Form + map side-by-side
- Fix: Stack vertically, form first then map
- Time: 1 hour

☐ **6.3 How We Work (app/(public)/how-we-work/page.tsx)**
- Issue: Process steps in multi-column layout
- Fix: Single column step-by-step flow
- Time: 1.5 hours

☐ **6.4 Capabilities (app/(public)/capabilities/page.tsx)**
- Issue: Service offerings in 3 columns
- Fix: Accordion or vertical stack
- Time: 1.5 hours

☐ **6.5 Overview (app/(public)/overview/page.tsx)**
- Issue: Studio overview with diagrams
- Fix: Ensure all diagrams mobile-optimized (mostly done ✅)
- Time: 30 min

### Thinking/Insights Pages (4-5 hours)

☐ **6.6 Thinking Hub (app/(public)/thinking/page.tsx)**
- Issue: Article grid
- Fix: Change to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Time: 30 min

☐ **6.7 Build-First Trap Article (app/(public)/thinking/build-first-trap/page.tsx)**
- Issue: Long-form article
- Fix: Add max-width, break paragraphs, add section navigation
- Time: 1 hour

☐ **6.8 Build to Think Article (app/(public)/thinking/build-to-think/page.tsx)**
- Fix: Same as 6.7
- Time: 1 hour

☐ **6.9 Methodology Origins (app/(public)/thinking/methodology-origins/page.tsx)**
- Fix: Same as 6.7
- Time: 1 hour

☐ **6.10 Spec vs Prototype (app/(public)/thinking/spec-vs-prototype/page.tsx)**
- Fix: Same as 6.7 + diagram already responsive ✅
- Time: 45 min

### Partnership Pages (2-3 hours)

☐ **6.11 Partnerships Hub (app/(public)/partnerships/page.tsx)**
- Issue: 3 partnership models side-by-side
- Fix: Stack vertically on mobile
- Time: 45 min

☐ **6.12 Build-Ship-Run Model (app/(public)/partnerships/build-ship-run/page.tsx)**
- Issue: Dense feature list
- Fix: Use accordion or progressive disclosure
- Time: 45 min

☐ **6.13 Clarity Kit (app/(public)/partnerships/clarity-kit/page.tsx)**
- Fix: Same as 6.12
- Time: 30 min

☐ **6.14 Prototype Kit (app/(public)/partnerships/prototype-kit/page.tsx)**
- Fix: Same as 6.12
- Time: 30 min

### Case Studies - Zero (3-4 hours)

☐ **6.15 Zero Main Case Study (app/(public)/work/zero/page.tsx)**
- Issue: Long-form case study with multiple sections
- Fix: Add section navigation, progressive disclosure
- Time: 1.5 hours

☐ **6.16 Zero Architecture (app/(public)/work/zero/architecture/page.tsx)**
- Issue: Technical architecture details
- Fix: Ensure diagrams mobile-optimized (done ✅), condense text
- Time: 45 min

☐ **6.17 Zero Demo Page (app/(public)/work/zero/demo/page.tsx)**
- Issue: Embedded demo
- Fix: Full-width demo, remove unnecessary chrome
- Time: 30 min

☐ **6.18 Zero Metrics (app/(public)/work/zero/metrics/page.tsx)**
- Issue: Dashboard with charts
- Fix: Simplify charts, stack vertically
- Time: 45 min

☐ **6.19 Zero Overview (app/(public)/work/zero/overview/page.tsx)**
- Issue: Multiple diagrams + content
- Fix: Diagrams already done ✅, condense text sections
- Time: 30 min

☐ **6.20 Zero Stats (app/(public)/work/zero/stats/page.tsx)**
- Fix: Similar to 6.18
- Time: 30 min

☐ **6.21 Zero Taxonomy (app/(public)/work/zero/taxonomy/page.tsx)**
- Issue: Classification system details
- Fix: Use accordion for categories
- Time: 30 min

☐ **6.22 Zero Timeline (app/(public)/work/zero/timeline/page.tsx)**
- Issue: Development timeline
- Fix: Vertical timeline with milestones
- Time: 45 min

### Case Studies - Heirloom (2-3 hours)

☐ **6.23 Heirloom Case Study (app/(public)/work/heirloom/page.tsx)**
- Fix: Similar to Zero main case study
- Time: 1 hour

☐ **6.24 Heirloom Design System (app/(public)/work/heirloom/design-system/page.tsx)**
- Issue: Design tokens, color palettes
- Fix: Ensure responsive grid layouts
- Time: 30 min

☐ **6.25 Heirloom Pitch (app/(public)/work/heirloom/pitch/page.tsx)**
- Issue: Pitch deck
- Fix: Similar to Athletes First/CREaiT mobile nav
- Time: 45 min

☐ **6.26 Heirloom Technical Architecture (app/(public)/work/heirloom/technical-architecture/page.tsx)**
- Fix: Diagrams done ✅, condense text
- Time: 30 min

☐ **6.27 Heirloom Timeline and Outcomes (app/(public)/work/heirloom/timeline-and-outcomes/page.tsx)**
- Fix: Similar to Zero timeline
- Time: 30 min

### Case Studies - Others (2-3 hours)

☐ **6.28 Compass Project (app/(public)/work/compass/page.tsx)**
- Time: 30 min

☐ **6.29 Motivo Project (app/(public)/work/motivo/page.tsx)**
- Time: 30 min

☐ **6.30 Partnr Project (app/(public)/work/partnr/page.tsx)**
- Time: 30 min

☐ **6.31 Spark AR Project (app/(public)/work/spark-ar/page.tsx)**
- Time: 30 min

☐ **6.32 Case Study 010 (app/(public)/work/case-study-010/page.tsx)**
- Fix: Ensure CREaiT overview page mobile-optimized
- Time: 30 min

☐ **6.33 Case Study 020 (app/(public)/work/case-study-020/page.tsx)**
- Fix: Ensure Athletes First overview page mobile-optimized
- Time: 30 min

### Historical Work (1 hour)

☐ **6.34 Historical Work Archive (app/(public)/historical-work/page.tsx)**
- Issue: Gallery grid
- Fix: Change to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Time: 1 hour

### Admin Pages (3-4 hours)

☐ **6.35 Owner Dashboard (app/owner/page.tsx)**
- Issue: Admin metrics dashboard
- Fix: Simplify for mobile, stack cards
- Time: 1 hour

☐ **6.36 Outbound Tracker (app/owner/outbound/page.tsx)**
- Issue: Data table
- Fix: Convert to card view on mobile
- Time: 45 min

☐ **6.37 Site Admin (app/owner/site-admin/page.tsx)**
- Issue: Already mobile-optimized in Session 2 ✅
- Time: 0 (complete)

☐ **6.38 Content Management (app/owner/content/page.tsx)**
- Issue: Complex forms and tables
- Fix: Simplify forms, convert tables to cards
- Time: 1 hour

☐ **6.39 Reference Library (app/owner/reference/page.tsx)**
- Issue: Document list
- Fix: Ensure responsive list/grid
- Time: 30 min

☐ **6.40 Team Portal (app/team/page.tsx)**
- Fix: Similar to Owner Dashboard
- Time: 30 min

☐ **6.41 Beta Signups Admin (app/admin/beta-signups/page.tsx)**
- Issue: User list table
- Fix: Card view on mobile
- Time: 30 min

### Visual Test Pages (1-2 hours)

☐ **6.42 Card Variants Showcase (app/(public)/card-variants/page.tsx)**
- Issue: Component showcase grid
- Fix: Stack vertically on mobile
- Time: 30 min

☐ **6.43 Terminal Republic Test (app/(visual-test)/terminal-republic/page.tsx)**
- Fix: Ensure terminal aesthetic works on mobile
- Time: 30 min

☐ **6.44 Other Visual Test Pages**
- Files: comparison, institutional-grid, window-shrine
- Fix: Ensure responsive
- Time: 30 min each = 1.5 hours

### Dynamic Routes & Misc (2-3 hours)

☐ **6.45 Dynamic Pitch Routes (app/pitch/[company]/page.tsx)**
- Issue: Dynamic company pitch decks
- Fix: Apply mobile navigation pattern from Athletes First
- Time: 1.5 hours

☐ **6.46 Login Pages (app/login, app/clients/login, app/logout)**
- Issue: Form centering and sizing
- Fix: Ensure responsive forms
- Time: 30 min

☐ **6.47 Founder Landing (app/founder/page.tsx)**
- Fix: Ensure responsive layout
- Time: 30 min

☐ **6.48 Insights Hub (app/insights/page.tsx)**
- Issue: Article grid
- Fix: Responsive grid
- Time: 30 min

---

## Phase 7: Testing & QA (7-12 hours)

### Cross-Device Testing (2-3 hours)

☐ **7.1 iPhone SE (375x667) Testing**
- Test all critical pages
- Verify minimum font sizes (16px body)
- Check touch targets (44x44px)
- Time: 1 hour

☐ **7.2 iPhone 14 Pro Max (428x926) Testing**
- Test layout at larger phone size
- Verify content doesn't look too sparse
- Time: 45 min

☐ **7.3 Pixel 7 (412x915) Testing**
- Test Android-specific issues
- Verify fonts render correctly
- Time: 45 min

☐ **7.4 iPad (768x1024) Testing**
- Test tablet breakpoint behavior
- Verify layouts don't break
- Time: 30 min

### Accessibility Audit (2-3 hours)

☐ **7.5 Keyboard Navigation Testing**
- Tab through all pages
- Verify focus indicators visible
- Ensure all interactive elements reachable
- Time: 1 hour

☐ **7.6 Screen Reader Testing (VoiceOver/TalkBack)**
- Test all diagrams have ARIA labels
- Verify heading hierarchy
- Check image alt text
- Time: 1.5 hours

☐ **7.7 WCAG 2.1 AA Color Contrast**
- Verify all text meets 4.5:1 contrast ratio
- Check terminal-gold on dark backgrounds
- Time: 30 min

☐ **7.8 WAVE Accessibility Tool Audit**
- Run WAVE on all critical pages
- Fix any critical errors
- Time: 30 min

### Performance Testing (2-3 hours)

☐ **7.9 Lighthouse Mobile Scores**
- Run Lighthouse on all critical pages
- Target: >90 Performance, >90 Accessibility
- Fix any critical issues
- Time: 1.5 hours

☐ **7.10 Image Lazy Loading Verification**
- Verify all below-fold images lazy load
- Check loading="lazy" attribute present
- Time: 30 min

☐ **7.11 Bundle Size Analysis**
- Run `npm run build` and analyze bundle
- Ensure mobile bundle <500KB (gzipped)
- Time: 30 min

☐ **7.12 3G Network Testing**
- Throttle to 3G speeds
- Verify page loads in <5 seconds
- Time: 30 min

### Visual Regression Testing (1-2 hours)

☐ **7.13 Screenshot Comparison**
- Take screenshots of all critical pages before/after
- Verify no unintended layout breaks
- Time: 1 hour

☐ **7.14 Diagram Rendering Verification**
- Test all 29 mobile diagrams render correctly
- Verify touch interactions work
- Time: 1 hour

### Touch Interaction Testing (1 hour)

☐ **7.15 Swipe Gesture Testing**
- Test all swipeable diagrams
- Test presentation navigation
- Verify smooth 60fps animations
- Time: 30 min

☐ **7.16 Tap Target Testing**
- Physically test tapping all interactive elements
- Verify no accidental adjacent taps
- Time: 30 min

---

## Phase 8: Zero Demo Full-Screen Modal (2-3 hours) - LAST

☐ **8.1 Create DemoModal Component**
- File: `components/demos/DemoModal.tsx` (new)
- Features:
  - Full-screen overlay (z-50)
  - Close button (X in top-right)
  - Swipe down to close gesture
  - Escape key to close
  - Backdrop click to close
- Time: 1 hour

☐ **8.2 Add "See Demo" Button to Zero Work Page**
- File: `app/(public)/work/zero/page.tsx`
- Add button below Zero description
- Opens DemoModal on mobile
- Desktop: Keep existing behavior or also use modal
- Time: 30 min

☐ **8.3 Embed Zero Demo in Modal**
- Load demo iframe in modal
- Remove phone UI frame (show full demo)
- Ensure touch interactions work within modal
- Time: 45 min

☐ **8.4 Test Demo Modal on Physical Devices**
- Test on iPhone, Android
- Verify full-screen works
- Test close gestures
- Time: 30 min

---

## Session Tracking

### Session 3 (Current)
**Date:** December 10, 2025
**Work Completed:**
- Created MASTER_EXECUTION_PLAN.md
- Ready to begin Phase 1: Quick Wins

**Next Session Start Here:**
- Continue from Phase 1 checkpoint
- Reference this document for all tasks
- Update checkboxes as completed
- Add session notes below

### Session 4 (Future)
**Work to Resume:** [Add checkpoint here]

### Session 5+ (Future)
**Work to Resume:** [Add checkpoint here]

---

## Completion Tracking

### Phase Completion
- ☐ Phase 1: Quick Wins (0/20 tasks, 0%)
- ☐ Phase 2: Homepage + Work (0/15 tasks, 0%)
- ☐ Phase 3: Athletes First (0/10 tasks, 0%)
- ☐ Phase 4: CREaiT (0/17 tasks, 0%)
- ☐ Phase 5: Dashboards (0/12 tasks, 0%)
- ☐ Phase 6: All Pages (0/48 tasks, 0%)
- ☐ Phase 7: Testing (0/16 tasks, 0%)
- ☐ Phase 8: Zero Demo (0/4 tasks, 0%)

**Overall Progress: 0/142 tasks (0%)**

---

## Reference Documents

1. **mobile-fixes.md** (1,519 lines) - Implementation roadmap with Quick Wins
2. **mobile-audit-report.md** (1,629 lines) - Comprehensive audit of 159 pages
3. **mobile-responsive-analysis-agent.md** (422 lines) - Audit methodology
4. **diagram-mobile-strategy.md** (1,146 lines) - 47 diagram treatment plan
5. **IMPLEMENTATION_PROGRESS.md** (235 lines) - Session 1 completion status

---

## Success Criteria

### Definition of Done
- ✅ All 142 tasks completed
- ✅ All pages mobile-responsive at 375px, 428px, 768px
- ✅ Lighthouse mobile scores >90 (Performance + Accessibility)
- ✅ WCAG 2.1 AA compliant
- ✅ Zero TypeScript errors
- ✅ All diagrams interactive and readable on mobile
- ✅ Scroll depth reduced by 30% on key pages
- ✅ Touch targets ≥44x44px
- ✅ No horizontal overflow on any page
- ✅ All images lazy-loaded and optimized

### Final Deliverable
**World-class mobile experience across all 159 pages.**

---

*This document will be updated throughout execution. Keep checkboxes current for session continuity.*
