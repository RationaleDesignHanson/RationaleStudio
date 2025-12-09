# Rationale Studio Website Restructure - Implementation Plan

**Created:** December 8, 2024
**Status:** Planning Complete - Ready for Execution
**Timeline:** 18 weeks (1 dev) or 9-11 weeks (2 devs)
**Approach:** Methodical, resilient, durable architecture

---

## Executive Summary

Comprehensive website restructure with:
- Product studio first positioning (not agency)
- Secure 4-tier authentication (Investor/Partner/Team/Owner)
- Zero featured as beta/dogfooding with Q1 2025 launch
- Pipeline visibility without confidential details
- Complete content migration from v01 and investor folders
- Owner operations section for reference library + publishing workflow

---

## Table of Contents

1. [Technical Assessment](#technical-assessment)
2. [Content Audit](#content-audit)
3. [Implementation Phases](#implementation-phases)
4. [Progress Tracking](#progress-tracking)
5. [Deliverables Checklist](#deliverables-checklist)

---

## Technical Assessment

### Current State
- **Stack:** Next.js 16, React 19, TypeScript 5.9, Tailwind CSS 4
- **Architecture:** App Router, route groups (public/protected)
- **Components:** 349 TSX files, 156 client components
- **Bundle:** 149MB public directory (needs optimization)
- **Auth:** ❌ Client-side only, hardcoded credentials (CRITICAL vulnerability)

### Recommendation
**STRATEGIC REFACTOR** (not rebuild)
- Modern stack is solid
- Architecture is sound
- Debt is localized and addressable
- Rebuild would take 2x longer with more risk

### Critical Issues to Fix
1. **Authentication security** - Client-side credentials exposed
2. **Asset bloat** - 149MB public directory
3. **Visual system fragmentation** - 10+ ASCII component variants
4. **No test coverage** - Regression risk

---

## Content Audit

### v01 Original Content

**Case Studies (3 total):**
- ✅ Zero Inbox (277 lines) - Full version to migrate
- ✅ FUBO AI Thumbnail (416 lines) - **Password-protected by request** (client confidentiality)
- ✅ Project Compass/Rumi (364 lines) - Upgrade from skeleton

**Philosophy & Methodology:**
- 5 core principles (RationaleMaster.md)
- Kits methodology documentation
- Company context and positioning

**Marketing Content:**
- 8,500+ line blog post: "Conviction Before Code"
- 4 LinkedIn posts (thematic series)
- 2 Twitter threads
- Case study variants (carousel, LinkedIn, Twitter, talk, short) for each case

**Historical Work:**
- Instagram AR Shopping (2021-2023)
- Spark AR Platform (2018-2021, 2M+ creators)
- Embodied AI Research (FAIR, 4+ papers)
- **Include on public site** (About or Background section)

### Investor Folder Content

**Strategic Documents (28 files, 500+ KB):**
- CUSTOMER_ANALYSIS.md (52K) - Multi-persona evaluation
- VC_VALIDATION_ROADMAP.md (23K) - Fundraising strategy
- ADVISOR_RECRUITMENT_GUIDE.md (21K) - Advisor recruitment
- GTM_IMPLEMENTATION_SUMMARY.md (23K) - Go-to-market playbook
- LAUNCH_READINESS_REPORT.md (24K) - Pre-launch checklist
- UNIFIED_IMPLEMENTATION_ROADMAP.md (30K) - Implementation strategy
- FIGMA_FIRST_MASTER_PLAN.md (78K) - Design-to-code workflow
- AGENT_ORCHESTRATION_GUIDE.md (43K) - AI agent usage patterns

**Design System:**
- Complete design token system
- Figma workflow documentation
- Component architecture

**Client Documentation:**
- Athletes First multi-phase docs
- CREaiT complete documentation

### Current Public Site

**Existing Pages (31 public pages):**
- Core: Home, About, Contact, Overview, Services (3 kits)
- Work/Portfolio: Zero (6 pages), Compass, Motivo, Partnr, Athletes First, Spark AR
- Thinking: 5 essays on methodology
- How We Work: Engagement models

**What's Working:**
- ✅ Zero case study structure (needs content upgrade)
- ✅ Kits service pages (needs reframing as methodology)
- ✅ How We Work transparency
- ✅ Dual-engine model explanation

**What Needs Improvement:**
- ⚠️ Zero not linked to public product (beta status unclear)
- ⚠️ Pipeline visibility missing (no Q1-Q2 signal)
- ⚠️ Investor entry point not prominent
- ⚠️ Partnership positioning too generic

### Current Clients Page

**Structure:**
- 5 project groups, 45 total pages
- Password-protected (global + client-specific credentials)
- Zero: 6 pages (dashboard, tracker, investor materials)
- Athletes First: 1 page (pitch deck)
- Creait: 3 pages (deck, portal, presentation)
- Archived site: 30 pages

**Issues:**
- ❌ Client-side auth with hardcoded credentials
- ⚠️ No investor-specific view
- ⚠️ No collaborator tier
- ⚠️ Archive mixed with active content

---

## Implementation Phases

### Phase 1: Technical Foundation & Security (Weeks 1-3)

#### 1.1 Authentication & RBAC
- [ ] Remove client-side auth from `/app/clients/login/page.tsx` (keep until migration complete)
- [x] Implement Next.js middleware at `/middleware.ts`
- [x] Set up Firebase Auth
- [x] Create 4 access tiers:
  - [x] Investor tier (portfolio view access)
  - [x] Partner tier (active collaboration access)
  - [x] Team tier (full access + admin)
  - [x] Owner tier (Matt-only, includes publishing tools)
- [x] Move credentials to environment variables (Firebase config)
- [ ] Add audit logging for content access (TODO: implement in middleware)
- [x] Implement session management with proper expiration (7-day cookies)
- [x] Add password hashing/encryption (Firebase handles this)

**Files Created:**
- [x] `/lib/auth/firebase.ts` - Firebase auth configuration
- [x] `/lib/auth/AuthContext.tsx` - Auth state management
- [x] `/middleware.ts` - Route protection with 4-tier RBAC
- [x] `/app/login/page.tsx` - New secure login
- [x] `/app/api/auth/session/route.ts` - Session management
- [x] `/docs/AUTH_SETUP.md` - Complete setup guide
- [x] Updated `/app/layout.tsx` - Added AuthProvider

**Deliverables:**
- [x] Secure authentication system
- [x] RBAC middleware
- [ ] Audit logging (next step)
- [x] Documentation for adding users

#### 1.2 Asset Optimization
- [x] Audit `/public/` directory (was 149MB)
- [x] Remove duplicate files (-26MB)
- [x] Convert GIFs to MP4 (-49MB)
- [x] Delete original GIF files
- [x] Next.js image optimization (AVIF/WebP already configured)
- [ ] PNG compression (optional - tools needed: pngquant/ImageOptim)
- [ ] CDN migration for videos (optional - can do when deploying)

**Results:**
- **Before:** 149MB
- **After:** 78MB
- **Savings:** 71MB (48% reduction)
- **Remaining:** PNGs (25MB) + Videos (22MB) can be optimized with additional tools

**Files Created:**
- [x] `/scripts/convert-gifs-to-mp4.sh` - Automated GIF→MP4 conversion
- [x] `/scripts/compress-pngs.sh` - PNG compression script (requires tools)
- [x] `/docs/ASSET_OPTIMIZATION.md` - Complete optimization strategy

**Deliverables:**
- [x] Optimized assets (78MB, 48% reduction achieved)
- [x] Conversion scripts for future use
- [ ] CDN configuration (optional, for production deployment)

#### 1.3 Visual System Consolidation
- [ ] Audit 10+ ASCII component variants
- [ ] Identify most performant implementation
- [ ] Create migration guide
- [ ] Update all component references
- [ ] Deprecate redundant variants
- [ ] Document canonical system (2-3 variants max)

**Deliverables:**
- Consolidated ASCII system
- Documentation
- 15-20% bundle size reduction

---

### Phase 2: Homepage Restructure (Weeks 4-6)

#### 2.1 Hero Section
- [ ] Update hero copy: "We build and ship products fast"
- [ ] Add positioning: "Sometimes our own. Sometimes with partners."
- [ ] Include equity positioning: "Equity when the fit is right"

#### 2.2 Current Focus Section (Above Fold)
- [ ] Create `CurrentFocusSection` component
- [ ] **Zero announcement:**
  - [ ] Badge: "Beta • Dogfooding"
  - [ ] Timeline: Q1 2025
  - [ ] Link to product journey
- [ ] **Pipeline section:**
  - [ ] "Q1-Q2 2025" timeline
  - [ ] "New products in development"
  - [ ] "Partnerships across multiple sectors" (NO specific sectors)
  - [ ] "Can't share all details, but we're building"
- [ ] Add sector-agnostic language (no sports tech, CRE, AI/SaaS mentions)

#### 2.3 Kits Methodology Section (Below Fold)
- [ ] Create `KitsMethodologySection` component
- [ ] Reframe as systematic approach (not product)
- [ ] Structure:
  - [ ] Clarity Kit (2 weeks, validation)
  - [ ] Prototype Kit (4 weeks, de-risk)
  - [ ] Build Ship Run (8-12 weeks, launch)
- [ ] Add Zero as example: "Validated through all three phases"
- [ ] **Feature "How We Ship Faster" infographic:**
  - [ ] 54% faster time to market
  - [ ] 75% risk reduction
  - [ ] 7x more validation cycles
  - [ ] Traditional (24 weeks) vs Rationale (11 weeks)

#### 2.4 Three-Path CTAs
- [ ] Create `ThreePathCTA` component
- [ ] **Invest path:**
  - [ ] Headline: "Invest"
  - [ ] Copy: "Explore portfolio investments"
  - [ ] CTA: "View Portfolio" → `/invest`
- [ ] **Partner path:**
  - [ ] Headline: "Partner"
  - [ ] Copy: "Selective equity partnerships"
  - [ ] CTA: "See Criteria" → `/partner`
- [ ] **Collaborate path:**
  - [ ] Headline: "Collaborate"
  - [ ] Copy: "Engage us for your product sprint"
  - [ ] CTA: "Explore Kits" → `/collaborate`

**Deliverables:**
- Redesigned homepage
- Zero featured with correct status (beta/dogfooding)
- Pipeline visibility without confidential details
- Kits properly positioned as methodology
- Three distinct entry paths

---

### Phase 3: Content Migration from v01 & Investor Folders (Weeks 7-9)

#### 3.1 Public Site Content

**Case Studies:**
- [ ] **Zero Inbox** - Migrate full version
  - [ ] Source: `/rationale-v01-original/cases/zero/long.md` (277 lines)
  - [ ] Update `/app/(public)/work/zero/page.tsx`
  - [ ] Add complete narrative with execution proof
  - [ ] Preserve existing Zero pages (architecture, metrics, stats, taxonomy, timeline)

- [ ] **FUBO AI Thumbnail** - Password-protected by request
  - [ ] Source: `/rationale-v01-original/cases/fubo/long.md` (416 lines)
  - [ ] Create `/app/(public)/work/fubo/page.tsx` with public teaser
  - [ ] Public landing: Title, summary, "Request Access" CTA
  - [ ] Full case study: `/app/partners/fubo/page.tsx` (behind auth)
  - [ ] Content: Flask backend, 24-style catalog, bulk processing, 2-week sprint proof

- [ ] **Project Compass** - Upgrade from skeleton
  - [ ] Source: `/rationale-v01-original/cases/rumi/long.md` (364 lines)
  - [ ] Update `/app/(public)/work/compass/page.tsx`
  - [ ] Add multi-agent deployment, browser extension, content intelligence

**Philosophy & About:**
- [ ] Migrate 5 core principles
  - [ ] Source: `/rationale-v01-original/docs/RationaleMaster.md`
  - [ ] Add to About page or Philosophy section
  - [ ] Principles:
    1. Clarity is the First Deployment
    2. Systems Create Possibility
    3. Prototype Function Over Form
    4. Intelligence Over Intuition
    5. Own the IP You Create

- [ ] **Historical Work** - Include on public site
  - [ ] Source: `/rationale-v01-original/inputs/site-work.md`
  - [ ] Add to About page or separate Background section
  - [ ] Projects:
    - [ ] Instagram AR Shopping (2021-2023, 100%+ inventory growth)
    - [ ] Spark AR Platform (2018-2021, 2M+ creators)
    - [ ] Embodied AI Research (FAIR, 4+ papers)
  - [ ] Focus on learnings, not credential-waving

- [ ] Enhance Kits methodology documentation
  - [ ] Source: `/rationale-v01-original/inputs/company-context.md`
  - [ ] Clear framework explanation
  - [ ] Zero as validation example

#### 3.2 Private Portal Content

**Investor Dashboard (`/investors`):**
- [ ] Create `/app/investors/page.tsx` (new investor landing)
- [ ] **Rationale Studio Investment** (NEW):
  - [ ] Compile from sources:
    - [ ] `/rationale-investor/CUSTOMER_ANALYSIS.md` (52K - VC perspective, team credentials)
    - [ ] `/rationale-investor/docs/VC_VALIDATION_ROADMAP.md` (23K - portfolio thesis)
    - [ ] `/rationale-investor/docs/ADVISOR_RECRUITMENT_GUIDE.md` (21K)
    - [ ] Company context (dual-engine model)
  - [ ] Create `/app/investors/rationale-studio/page.tsx`
  - [ ] Content sections:
    - [ ] Studio background (Meta pedigree, 15+ patents, velocity proof)
    - [ ] Dual-engine model explanation
    - [ ] Portfolio strategy (3 active products Q1-Q2 2025)
    - [ ] Team capability metrics
    - [ ] Investment terms
    - [ ] Exit/monetization thesis
  - [ ] Create `/components/investors/StudioOverview.tsx`

- [ ] **Zero Seed Round**:
  - [ ] Ensure all 6 existing pages migrated
  - [ ] Verify investor-only demos included (detailed in Phase 4)

- [ ] **Atlas Partnership**:
  - [ ] Migrate from `/app/clients/creait/`
  - [ ] Update to `/app/investors/atlas/`
  - [ ] Partnership structure: $165K

- [ ] **Amplify Partnership**:
  - [ ] Migrate from `/app/clients/athletes-first/`
  - [ ] Update to `/app/investors/amplify/`
  - [ ] Partnership structure: $60-250K

- [ ] Create `/components/investors/PortfolioCard.tsx` (reusable investment opportunity card)
- [ ] Add "Schedule Investor Call" CTA

**Partner Dashboard (`/partners`):**
- [ ] Create `/app/partners/page.tsx` (partner landing)
- [ ] **Athletes First**:
  - [ ] Migrate from `/app/clients/athletes-first/`
  - [ ] Create landing page with Kits emphasis
  - [ ] Add Kits phase mapping to timeline:
    - [ ] Clarity: 2-week NIL landscape analysis
    - [ ] Prototype: 4-week interactive pitch deck (13+ demos)
    - [ ] Build Ship Run: 12-week platform blueprint
  - [ ] Preserve all 20+ component files
  - [ ] Create `/app/partners/athletes-first/timeline/` (NEW)
  - [ ] Add progress tracker (replicate Zero execution tracker pattern)

- [ ] **Creait**:
  - [ ] Migrate from `/app/clients/creait/`
  - [ ] Create landing page with Kits emphasis
  - [ ] Add Kits phase mapping to roadmap:
    - [ ] Clarity: 2-week CRE market validation
    - [ ] Prototype: 4-week pitch deck with diagrams
    - [ ] Build Ship Run: 12-week technical roadmap
  - [ ] Preserve all 21+ component files
  - [ ] Create `/app/partners/creait/roadmap/` with Kits phases

- [ ] **FUBO** (NEW - by request only):
  - [ ] Create `/app/partners/fubo/page.tsx`
  - [ ] Full case study (416 lines)
  - [ ] Add Kits phase breakdown

#### 3.3 Owner Section (`/owner`) - Matt-Only Access

**Directory Structure:**
```
/app/owner/
├── dashboard/
├── research/
├── strategy/
├── operations/
├── systems/
├── marketing/
├── content/
├── clients/
├── products/
└── history/
```

**Create `/app/owner/dashboard/page.tsx`:**
- [ ] Quick access dashboard
- [ ] Publishing tools (blog, social, case studies)
- [ ] Recently viewed tracking
- [ ] Quick links to most-referenced docs

**Migrate Content by Function:**

**`/app/owner/research/`:**
- [ ] `customer-analysis.md` - Source: `/rationale-investor/CUSTOMER_ANALYSIS.md` (52K)
- [ ] `client-evaluation.md` - Source: `/rationale-investor/docs/PROSPECTIVE-CLIENT-AGENT-EVALUATION.md`
- [ ] `market-positioning.md` - Competitive research compilation
- [ ] `vc-perspectives.md` - What investors look for

**`/app/owner/strategy/`:**
- [ ] `gtm-summary.md` - Source: `/rationale-investor/docs/GTM_IMPLEMENTATION_SUMMARY.md` (23K)
- [ ] `future-options.md` - Source: `/rationale-investor/docs/ALTERNATIVE_OPTIONS_FOR_FUTURE.md` (23K)
- [ ] `fundraising/vc-roadmap.md` - Source: `/rationale-investor/docs/VC_VALIDATION_ROADMAP.md` (23K)
- [ ] `fundraising/advisor-guide.md` - Source: `/rationale-investor/docs/ADVISOR_RECRUITMENT_GUIDE.md` (21K)
- [ ] `portfolio-thesis.md` - Investment thesis compilation

**`/app/owner/operations/`:**
- [ ] `launch-checklist.md` - Source: `/rationale-investor/LAUNCH-READINESS-REPORT.md` (24K)
- [ ] `review-process.md` - Source: `/rationale-investor/docs/DESIGN_MARKETING_REVIEW_PLAN.md` (21K)
- [ ] `roadmaps/site-restructure.md` - Source: `/rationale-investor/docs/UNIFIED_IMPLEMENTATION_ROADMAP.md` (30K)
- [ ] `roadmaps/simplification.md` - Source: `/rationale-investor/docs/SIMPLIFICATION_ROADMAP.md` (33K)

**`/app/owner/systems/`:**
- [ ] `design-system.md` - Source: `/rationale-v01-original/docs/RationaleMaster.md`
- [ ] `figma-workflow.md` - Source: `/rationale-investor/docs/FIGMA_FIRST_MASTER_PLAN.md` (78K)
- [ ] `agent-orchestration.md` - Source: `/rationale-investor/docs/AGENT_ORCHESTRATION_GUIDE.md` (43K)
- [ ] `kits-methodology.md` - Framework documentation compilation

**`/app/owner/marketing/`:**
- [ ] `content-suite.md` - Source: `/rationale-v01-original/CONTENT_MARKETING_SUITE.md` (14K)
- [ ] `messaging-framework.md` - Core positioning by audience
- [ ] `channel-playbooks/linkedin.md`
- [ ] `channel-playbooks/twitter.md`
- [ ] `channel-playbooks/blog.md`

**`/app/owner/content/` - PUBLISHING WORKFLOW:**
- [ ] `blog/conviction-before-code.md` - Source: `/rationale-v01-original/content/blog/` (8,500+ lines)
- [ ] `social/linkedin/01-three-million-dollar-prototype.md`
- [ ] `social/linkedin/02-usage-is-oxygen.md`
- [ ] `social/linkedin/03-visionary-bottleneck.md`
- [ ] `social/linkedin/04-conviction-not-code.md`
- [ ] `social/twitter/zero-story-thread.md`
- [ ] `social/twitter/conviction-speed-thread.md`
- [ ] `distribution/zero/` - All variants (carousel, LinkedIn, Twitter, talk, short)
- [ ] `distribution/fubo/` - All variants
- [ ] `distribution/compass/` - All variants (from "rumi" folder)

**`/app/owner/clients/`:**
- [ ] `athletes-first/project-history.md`
- [ ] `athletes-first/lessons-learned.md`
- [ ] `athletes-first/commercial-terms.md`
- [ ] `creait/project-history.md`
- [ ] `creait/lessons-learned.md`

**`/app/owner/products/`:**
- [ ] `zero/simplification-roadmap.md`
- [ ] `zero/feature-decisions.md`
- [ ] `zero/launch-strategy.md`

**`/app/owner/history/`:**
- [ ] `v01-migration/content-preservation-plan.md` - Source: `/rationale-v01-original/CONTENT-PRESERVATION-PLAN.md` (10K)
- [ ] `v01-migration/migration-map.md` - Source: `/rationale-v01-original/migration-map.md` (10K)
- [ ] `v01-migration/progress-summary.md` - Source: `/rationale-v01-original/progress-summary.md` (8.6K)
- [ ] `decision-logs/` - Timestamp-based logs

**Create Owner Publishing Workflow Components:**
- [ ] `/components/owner/PublishBlogTool.tsx` - Deploy blog → `/thinking`
- [ ] `/components/owner/ExportSocialTool.tsx` - Copy/export social content
- [ ] `/components/owner/DeployCaseStudyTool.tsx` - Export case study variants
- [ ] `/components/owner/QuickLinks.tsx` - Most-referenced docs
- [ ] `/components/owner/RecentlyViewed.tsx` - Track usage

**Deliverables:**
- Complete content migration from v01 and investor folders
- 3 case studies (Zero public, FUBO password-protected, Compass public)
- Historical work on public site
- Investor dashboard with 4 opportunities (including Studio)
- Partner dashboard with Kits emphasis
- Owner section organized by function with publishing workflow

---

### Phase 4: Zero Demo Migration (Week 10)

#### 4.1 Public Demos
- [ ] Identify "Zero Sequence Live" component in `/components/zero/`
- [ ] Identify "in-phone mockup demo" component
- [ ] Create `/components/zero/public/` directory
- [ ] Move public demos to public directory
- [ ] Update `/app/(public)/work/zero/page.tsx` to embed public demos

**Public Demos:**
- [ ] Zero Sequence Live (live email classification)
- [ ] In-phone mockup demo (iOS app simulation)

#### 4.2 Investor-Only Demos
- [ ] Create `/components/zero/investor/` directory
- [ ] Move sensitive demos to investor directory
- [ ] Create `/app/investors/zero/page.tsx` (if doesn't exist)
- [ ] Embed all investor demos

**Investor-Only Demos:**
- [ ] Action intent demo
- [ ] Intent categorization demo (detailed version)
- [ ] Interactive roadmap/execution tracker (Firebase sync)
- [ ] Product dashboard
- [ ] Business model analysis
- [ ] Technical architecture deep dive

#### 4.3 Component Organization
- [ ] Update all import paths for split demos
- [ ] Test public demo functionality
- [ ] Test investor demo functionality
- [ ] Verify Firebase sync still works for execution tracker

**Deliverables:**
- Zero demos split by audience
- Public demos on case study page
- Investor-only demos in investor portal
- All functionality preserved

---

### Phase 5: Visual Assets & Infographics (Week 11)

#### 5.1 Audit Visual Assets
- [ ] Find "How We Ship Faster" infographic (search in `/components/` and `/public/`)
- [ ] Locate Athletes First diagrams (5 PNG files)
  - [ ] Source: `/rationale-v01-original/public/athletes-first/diagrams/`
- [ ] Find Zero architecture visualizations
- [ ] Identify all process diagrams in current site

#### 5.2 Organize Visual Assets
- [ ] Create `/public/infographics/` directory
- [ ] Create `/components/investors/infographics/` directory
- [ ] Create `/app/owner/content/visual-assets/` directory

**Storage by Audience:**
- [ ] **Public infographics** → `/public/infographics/`
  - [ ] How We Ship Faster
  - [ ] Any methodology diagrams
  - [ ] Process visualizations

- [ ] **Private/investor** → `/components/investors/infographics/`
  - [ ] Athletes First diagrams (if needed for investor materials)
  - [ ] Zero detailed architecture

- [ ] **Owner reference** → `/app/owner/content/visual-assets/`
  - [ ] All source files
  - [ ] Editable versions
  - [ ] Design files

#### 5.3 Feature "How We Ship Faster"
- [ ] Create `/components/visual/HowWeShipFaster.tsx` wrapper component
- [ ] Add to homepage Kits methodology section
- [ ] Add to `/how-we-work` page
- [ ] Include in investor materials
- [ ] Include in partner pitch materials

**Infographic Content:**
- Traditional Approach: 24 weeks (Specs → Production → Testing)
- Rationale Approach: 11 weeks (7 Prototypes → Lock → Production validated)
- Metrics: 54% faster, 75% risk reduction, 7x validation cycles

#### 5.4 Implement Visual Assets
- [ ] Ensure responsive display (mobile/tablet/desktop)
- [ ] Add alt text for accessibility
- [ ] Optimize file sizes (compression without quality loss)
- [ ] Create consistent styling wrapper

**Deliverables:**
- "How We Ship Faster" prominently featured on homepage
- All visual assets organized by audience
- Athletes First diagrams preserved
- Owner reference library with all source files

---

### Phase 6: Private Portal Architecture (Weeks 12-14)

#### 6.1 Route Structure
- [ ] Update route organization for 4-tier access
- [ ] Implement middleware route protection

**New Routes:**
```
/investors → Investor dashboard
/partners → Partner/collaborator dashboard
/team → Internal team dashboard
/owner → Matt-only operations section
```

#### 6.2 Investor Dashboard
- [ ] Create `/app/investors/page.tsx` (main landing)
- [ ] Portfolio overview section (4 opportunities):
  - [ ] Rationale Studio card (NEW)
  - [ ] Zero Inbox card
  - [ ] Atlas/Creait card
  - [ ] Amplify/Athletes First card
- [ ] Add metrics strip: "3 active ventures, Q1-Q2 2025, X months execution"
- [ ] Schedule investor call CTA
- [ ] Create `/components/investors/InvestorDashboard.tsx`
- [ ] Create `/components/investors/PortfolioCard.tsx`

**Portfolio Card Structure:**
- [ ] Name & one-liner
- [ ] Problem statement
- [ ] Solution overview
- [ ] Status/stage (with visual indicator)
- [ ] Traction/validation signals
- [ ] Market opportunity
- [ ] Next milestone
- [ ] Investment CTA

#### 6.3 Partner Dashboard
- [ ] Create `/app/partners/page.tsx` (main landing)
- [ ] Active partnerships section:
  - [ ] Athletes First card (with Kits phase indicator)
  - [ ] Creait card (with Kits phase indicator)
  - [ ] FUBO card (if applicable)
- [ ] Add progress tracking for each project
- [ ] Create `/components/partners/PartnerDashboard.tsx`
- [ ] Create `/components/partners/ProjectCard.tsx`

**Project Card Structure:**
- [ ] Project name
- [ ] Kits phase indicator (Clarity/Prototype/Build Ship Run)
- [ ] Timeline & milestones
- [ ] Links to materials (pitch deck, timeline, tech specs)
- [ ] Next steps/meeting notes

#### 6.4 Team Dashboard
- [ ] Create `/app/team/page.tsx` (main landing)
- [ ] Full access to all 45 pages
- [ ] Archive section (collapsible, default: collapsed)
- [ ] Admin tools section:
  - [ ] User management
  - [ ] Access control
  - [ ] Analytics dashboard
- [ ] Create `/components/team/TeamDashboard.tsx`

**Archive Section:**
- [ ] Migrate 30 archived pages from `/app/clients/`
- [ ] Create collapsible archive UI
- [ ] Keep organized by original structure
- [ ] Add search/filter capability

#### 6.5 Owner Dashboard (Separate from Team)
- [ ] Already created in Phase 3.3
- [ ] Ensure authentication restricts to Matt-only
- [ ] Test publishing workflow tools
- [ ] Verify recently viewed tracking
- [ ] Test quick links functionality

**Deliverables:**
- 4 separate dashboards with proper access control
- Investor portfolio view with 4 opportunities
- Partner dashboard with Kits emphasis and progress tracking
- Team dashboard with archive and admin tools
- Owner dashboard with publishing workflow

---

### Phase 7: Copy & Content Development (Weeks 15-16)

#### 7.1 Homepage Copy

**Hero Section:**
```markdown
# We build and ship products fast.

Rationale is a product studio. We develop our own IP and
selectively partner with founders who need to move faster
than they can alone.

Equity when the fit is right. Always conviction-first.
```

**Current Focus Section:**
```markdown
## Now: Zero Inbox

AI email intelligence platform
[Beta • Dogfooding • Q1 2025]

We're building Zero in the open. From concept to functional
prototype in 6 weeks. Production engineering underway.

→ See the product journey

---

## Next: Q1–Q2 2025

New products in development. Active partnerships across
multiple sectors.

We can't share all details yet, but we're building—both
independently and with select partners. Typically 2-3 active
equity collaborations at a time.
```

**Kits Methodology Section:**
```markdown
## How We Work: Rationale Kits

A systematic approach to rapid product development:

**Clarity Kit** (2 weeks)
Validate the problem before committing to a solution.
Interactive prototypes, user testing, market validation.

**Prototype Kit** (4 weeks)
De-risk development with a functional prototype.
Core flows working, technical feasibility proven.

**Build Ship Run** (8-12 weeks)
Production-ready MVP with real users. Launch, measure, iterate.

---

[How We Ship Faster infographic]

Example: Zero Inbox validated through all three phases
(Sep–Nov 2024) before committing to production engineering.
We proved demand, de-risked the technical approach, and
shipped a functional beta in 12 weeks total.

This is our methodology. Not a service package, but how we
systematically validate conviction before we build.
```

- [ ] Write hero section copy
- [ ] Write Current Focus section copy
- [ ] Write Kits methodology copy
- [ ] Review tone consistency (direct, confident, founder-to-founder)

#### 7.2 Three-Path Landing Pages

**Create `/app/(public)/invest/page.tsx`:**
```markdown
# Invest in Rationale

Portfolio exposure to multiple products, or direct investment
in specific opportunities.

## Investment Options

### Rationale Studio (Portfolio)
Diversified exposure to all IP. Studio equity. Active: 3 products
in development (Q1–Q2 2025), selective partnerships, proven
velocity (Meta pedigree, 15+ patents).
→ View studio investment deck

### Zero Inbox (Direct)
AI email intelligence. Beta, Q1 2025 launch. $600K seed round
for 10% equity.
→ View investment materials

### Atlas & Amplify (Partnerships)
Partnership-based products with external collaborators.
→ View partnership structures

[Schedule Investor Call CTA]
```

**Create `/app/(public)/partner/page.tsx`:**
```markdown
# Partner with Rationale

Selective equity partnerships for founders who need to ship fast.

## What We Look For

- Conviction-worthy ideas (we take equity, so we have to believe)
- Founders who want a product partner, not a vendor
- Speed as a priority (months, not years)
- Equity or hybrid structures (we're selective about cash-only)

## Typical Structure

0.5–3% equity + cash (hybrid) or pure equity
6–18 months engagement
Highly selective: 2-3 active partnerships at a time

## Current Portfolio

Active partnerships across multiple sectors. We're working
with founders modernizing legacy businesses and building
category-defining products.

We can't share client details publicly, but momentum is real.

[Pitch Your Idea Form]
```

**Create `/app/(public)/collaborate/page.tsx`:**
```markdown
# Collaborate with Rationale

Engagement models for founders who need systematic validation
and rapid product development.

## Rationale Kits Methodology

**Clarity Kit** (2 weeks, $15-25K)
Validate before you build. Interactive prototypes, user testing.

**Prototype Kit** (4 weeks, $40-60K)
De-risk development with functional prototype.

**Build Ship Run** (8-12 weeks, $80-150K+)
Production-ready MVP, real users, launch.

## Hybrid Structures

Most engagements involve equity + cash (50-70% discount on
cash, 0.5-2% equity). Preserves runway while aligning incentives.

[Contact Us CTA]
```

- [ ] Write /invest page copy
- [ ] Write /partner page copy
- [ ] Write /collaborate page copy
- [ ] Create contact/pitch forms for each path
- [ ] Add CTAs with proper routing

#### 7.3 Investor Materials - Rationale Studio Deck

Compile investment deck from source documents:

**Studio Background:**
- [ ] Team credentials (Meta Reality Labs, FAIR, 7 years AR/AI)
- [ ] Patents (15+ in AR/AI domains)
- [ ] Velocity proof (concept to prototype in weeks)
- [ ] Products shipped to billions (Instagram AR, Spark AR)

**Dual-Engine Model:**
- [ ] Services fund portfolio development
- [ ] Cash engagements: Fixed-scope sprints
- [ ] Equity partnerships: 0.5-3%, highly selective
- [ ] Portfolio IP: Own products, own timeline

**Portfolio Strategy:**
- [ ] Current: 3 active products (Zero, Atlas, Amplify)
- [ ] Timeline: Q1-Q2 2025 launches
- [ ] Approach: AI-first, rapid validation, systematic execution
- [ ] Sectors: AI/SaaS, vertical intelligence platforms

**Exit/Monetization Thesis:**
- [ ] Zero: B2B/prosumer SaaS, subscription model
- [ ] Atlas: Commercial real estate intelligence, enterprise SaaS
- [ ] Amplify: NIL platform, sports tech vertical
- [ ] Exit paths: Acquisition (primary) or continue building

**Investment Terms:**
- [ ] Studio equity for portfolio exposure
- [ ] Valuation and structure
- [ ] Use of funds
- [ ] Milestones and timeline

Sources:
- [ ] `/rationale-investor/CUSTOMER_ANALYSIS.md` (VC perspective)
- [ ] `/rationale-investor/docs/VC_VALIDATION_ROADMAP.md` (thesis)
- [ ] `/rationale-v01-original/inputs/company-context.md` (model)

**Deliverables:**
- Homepage copy finalized
- Three-path landing pages written
- Rationale Studio investment deck compiled
- All copy reviewed for tone consistency

---

### Phase 8: Polish, Testing & Launch (Weeks 17-18)

#### 8.1 Authentication Testing
- [ ] Test investor tier access (can access /investors, cannot access /partners or /team or /owner)
- [ ] Test partner tier access (can access /partners, cannot access /investors or /team or /owner)
- [ ] Test team tier access (can access /team and all content, cannot access /owner)
- [ ] Test owner tier access (Matt-only, can access everything including /owner)
- [ ] Verify audit logging captures all access
- [ ] Test session management (proper expiration, refresh tokens)
- [ ] Test password reset flows
- [ ] Verify credentials are encrypted and in environment variables

#### 8.2 Publishing Workflow Testing
- [ ] Test blog publishing: /owner/content/blog → /thinking
- [ ] Test social export: Copy to clipboard functionality
- [ ] Test case study variant export: Select format, export
- [ ] Verify recently viewed tracking works
- [ ] Test quick links navigation

#### 8.3 Performance Optimization
- [ ] Run Lighthouse audit (target: >90 score)
- [ ] Test homepage load time (target: <2 seconds)
- [ ] Profile Three.js/shader performance (target: 60fps)
- [ ] Test animation performance on low-end devices
- [ ] Run bundle analysis (verify reductions from Phase 1)
- [ ] Test lazy loading for heavy assets
- [ ] Verify CDN serving assets correctly

#### 8.4 Content Review
- [ ] Verify Zero positioned as "Beta • Dogfooding" (not "Live" or "Launch")
- [ ] Check pipeline messaging: Q1-Q2, multiple sectors (no specific sectors)
- [ ] Confirm Kits framed as methodology (not product)
- [ ] Verify NO confidential client data public (only sector-agnostic hints)
- [ ] Check all case studies complete (Zero, FUBO password-protected, Compass)
- [ ] Verify historical work included on public site
- [ ] Review all investor materials for accuracy
- [ ] Check partner materials have Kits phase mapping

#### 8.5 User Experience Testing

**Investor Journey:**
- [ ] Homepage → Invest CTA → /invest → View Portfolio → /investors dashboard
- [ ] Test all 4 investment opportunity cards
- [ ] Verify schedule call CTA works
- [ ] Test demo functionality (Zero investor demos)

**Partner Journey:**
- [ ] Homepage → Partner CTA → /partner → Pitch form submission
- [ ] Test authenticated partner access to /partners dashboard
- [ ] Verify project materials accessible (Athletes First, Creait)
- [ ] Test Kits phase mapping display

**Collaborator Journey:**
- [ ] Homepage → Collaborate CTA → /collaborate → Contact form
- [ ] Verify Kits methodology clearly explained
- [ ] Test engagement model descriptions

**Owner Workflow:**
- [ ] Login as Matt → /owner dashboard
- [ ] Test blog publishing workflow
- [ ] Test social export functionality
- [ ] Test case study variant deployment
- [ ] Verify all reference docs accessible

#### 8.6 Mobile Experience Audit
- [ ] Test all pages on mobile (iOS Safari, Android Chrome)
- [ ] Verify responsive layouts work correctly
- [ ] Test touch interactions (CTAs, forms)
- [ ] Check mobile performance (load time, animations)
- [ ] Test Three.js/shader performance on mobile
- [ ] Verify navigation works on mobile

#### 8.7 SEO & Metadata
- [ ] Add meta descriptions to all pages
- [ ] Create Open Graph images for social sharing
- [ ] Update sitemap.xml with new routes
- [ ] Add Schema.org structured data:
  - [ ] Organization markup
  - [ ] Product markup (Zero)
  - [ ] Service markup (Kits)
- [ ] Verify robots.txt configuration
- [ ] Test social preview cards (Twitter, LinkedIn)

#### 8.8 Final Security Review
- [ ] Run security audit (check for XSS, CSRF vulnerabilities)
- [ ] Verify all environment variables properly configured
- [ ] Check CSP headers
- [ ] Test authentication edge cases
- [ ] Verify audit logging captures sensitive actions
- [ ] Review HTTPS configuration

**Deliverables:**
- All authentication flows tested and working
- Publishing workflow functional
- Performance metrics documented (load time, Lighthouse score)
- Content reviewed and accurate
- Mobile experience optimized
- SEO/metadata complete
- Security audit passed
- Launch-ready site

---

## Progress Tracking

### Phase 1: Technical Foundation & Security (Weeks 1-3)
- [ ] 1.1 Authentication & RBAC - 0% complete
- [ ] 1.2 Asset Optimization - 0% complete
- [ ] 1.3 Visual System Consolidation - 0% complete

### Phase 2: Homepage Restructure (Weeks 4-6)
- [ ] 2.1 Hero Section - 0% complete
- [ ] 2.2 Current Focus Section - 0% complete
- [ ] 2.3 Kits Methodology Section - 0% complete
- [ ] 2.4 Three-Path CTAs - 0% complete

### Phase 3: Content Migration (Weeks 7-9)
- [ ] 3.1 Public Site Content - 0% complete
- [ ] 3.2 Private Portal Content - 0% complete
- [ ] 3.3 Owner Section - 0% complete

### Phase 4: Zero Demo Migration (Week 10)
- [ ] 4.1 Public Demos - 0% complete
- [ ] 4.2 Investor-Only Demos - 0% complete
- [ ] 4.3 Component Organization - 0% complete

### Phase 5: Visual Assets & Infographics (Week 11)
- [ ] 5.1 Audit Visual Assets - 0% complete
- [ ] 5.2 Organize Visual Assets - 0% complete
- [ ] 5.3 Feature "How We Ship Faster" - 0% complete
- [ ] 5.4 Implement Visual Assets - 0% complete

### Phase 6: Private Portal Architecture (Weeks 12-14)
- [ ] 6.1 Route Structure - 0% complete
- [ ] 6.2 Investor Dashboard - 0% complete
- [ ] 6.3 Partner Dashboard - 0% complete
- [ ] 6.4 Team Dashboard - 0% complete
- [ ] 6.5 Owner Dashboard - 0% complete

### Phase 7: Copy & Content Development (Weeks 15-16)
- [ ] 7.1 Homepage Copy - 0% complete
- [ ] 7.2 Three-Path Landing Pages - 0% complete
- [ ] 7.3 Investor Materials - 0% complete

### Phase 8: Polish, Testing & Launch (Weeks 17-18)
- [ ] 8.1 Authentication Testing - 0% complete
- [ ] 8.2 Publishing Workflow Testing - 0% complete
- [ ] 8.3 Performance Optimization - 0% complete
- [ ] 8.4 Content Review - 0% complete
- [ ] 8.5 User Experience Testing - 0% complete
- [ ] 8.6 Mobile Experience Audit - 0% complete
- [ ] 8.7 SEO & Metadata - 0% complete
- [ ] 8.8 Final Security Review - 0% complete

**Overall Progress: 0%**

---

## Deliverables Checklist

### Technical
- [ ] Secure 4-tier authentication (Investor/Partner/Team/Owner)
- [ ] Asset optimization (149MB → <50MB)
- [ ] Visual system consolidated (10+ → 2-3 components)
- [ ] Owner publishing workflow functional

### Public Site
- [ ] Homepage with Zero beta + pipeline visibility
- [ ] Kits methodology properly positioned as framework
- [ ] 3 complete case studies:
  - [ ] Zero (public, full version)
  - [ ] FUBO (password-protected by request)
  - [ ] Compass (public, upgraded)
- [ ] Historical work included (Meta projects)
- [ ] "How We Ship Faster" infographic featured
- [ ] Three-path CTAs (Invest/Partner/Collaborate)
- [ ] NO confidential client data public

### Private Portal
- [ ] Investor dashboard with 4 opportunities:
  - [ ] Rationale Studio investment deck
  - [ ] Zero seed materials
  - [ ] Atlas partnership
  - [ ] Amplify partnership
- [ ] Partner dashboard with:
  - [ ] Athletes First (Kits phase mapping)
  - [ ] Creait (Kits phase mapping)
  - [ ] FUBO (by request)
  - [ ] Progress tracking for all projects
- [ ] Team dashboard with:
  - [ ] Full access to all content
  - [ ] Archive section (collapsible)
  - [ ] Admin tools
- [ ] Zero demos split:
  - [ ] Public: Sequence live, phone mockup
  - [ ] Investor: Action intent, categorization, detailed roadmap, dashboard, architecture

### Owner Section
- [ ] Reference library organized by function:
  - [ ] Research (customer analysis, VC perspectives)
  - [ ] Strategy (GTM, fundraising, future options)
  - [ ] Operations (launch checklist, roadmaps)
  - [ ] Systems (design system, Figma workflow, agent orchestration)
  - [ ] Marketing (content suite, messaging, playbooks)
  - [ ] Content (blog, social, case study variants)
  - [ ] Clients (project history, lessons learned)
  - [ ] Products (Zero strategy and roadmaps)
  - [ ] History (migration docs, decision logs)
- [ ] Publishing workflow:
  - [ ] Blog → /thinking deployment
  - [ ] Social content export (copy/image)
  - [ ] Case study variant deployment
- [ ] All v01 and investor folder content migrated

### Content Quality
- [ ] Zero positioned as "Beta • Dogfooding" (not "Live")
- [ ] Pipeline: Q1-Q2, multiple sectors (no specifics)
- [ ] Kits: Methodology framework (not product)
- [ ] NO confidential partnership details public
- [ ] Tone: Direct, confident, founder-to-founder
- [ ] All copy reviewed and approved

### Performance & Quality
- [ ] Homepage load time <2 seconds
- [ ] Lighthouse score >90
- [ ] 60fps animations on modern devices
- [ ] Mobile experience optimized
- [ ] SEO/metadata complete
- [ ] Security audit passed

---

## Timeline Summary

**With 1 Developer:**
- Phase 1-3: Weeks 1-9 (Foundation + Content)
- Phase 4-5: Weeks 10-11 (Demos + Visuals)
- Phase 6: Weeks 12-14 (Portal Architecture)
- Phase 7: Weeks 15-16 (Copy)
- Phase 8: Weeks 17-18 (Testing + Launch)
- **Total: 18 weeks (4.5 months)**

**With 2 Developers:**
- Parallelization opportunities in Phases 3-7
- **Total: 9-11 weeks (2-3 months)**

**Approach:** Methodical, resilient, durable architecture. No shortcuts. Proper foundation for scale.

---

## Notes

- This document is the single source of truth for the restructure
- Update progress checkboxes as work completes
- Add notes/blockers inline as discovered
- Reference this document to maintain context during long execution
- All source file paths documented for easy migration
- Owner section enables self-sufficiency for content publishing

**Last Updated:** December 8, 2024
