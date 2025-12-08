# Phase 3: Content Migration Audit

**Date:** December 8, 2025
**Purpose:** Identify all content from v01 and investor folders to migrate

---

## 1. V01 Original Site Content (`/rationale-v01-original`)

### 1.1 Case Studies (`/cases/`)

**Zero Case Study:**
- `/cases/zero/long.md` - Full case study
- `/cases/zero/short.md` - Short version
- `/cases/zero/carousel.md` - Social carousel format
- `/cases/zero/talk_outline.md` - Presentation outline
- `/cases/zero/li_post.md` - LinkedIn post

**Rumi Case Study:**
- `/cases/rumi/long.md` - Full case study
- `/cases/rumi/short.md` - Short version
- `/cases/rumi/carousel.md` - Social carousel format
- `/cases/rumi/talk_outline.md` - Presentation outline
- `/cases/rumi/li_post.md` - LinkedIn post

**FUBO Case Study:**
- `/cases/fubo/long.md` - Full case study
- `/cases/fubo/short.md` - Short version
- `/cases/fubo/carousel.md` - Social carousel format
- `/cases/fubo/talk_outline.md` - Presentation outline
- `/cases/fubo/li_post.md` - LinkedIn post

**Status:** Case study markdown exists, needs conversion to Next.js pages

### 1.2 Public Pages (`/app/(public)/`)

Existing pages in v01:
- `/about` - About page
- `/cases` - Case studies index
- `/contact` - Contact page
- `/dashboard-access` - Dashboard access
- `/how-we-work` - Methodology
- `/insights` - Blog/insights
- `/invest` - Investment page
- `/investors` - Investor portal
- `/services` - Services pages
- `/ventures` - Ventures/products
- `/work` - Work portfolio
- `/zero` - Zero product page

**Comparison with Current Site:**
Most of these pages already exist in the current `/rationale-public` site. Need to identify what's new or improved in v01.

---

## 2. Investor Materials (`/rationale-investor`)

### 2.1 Key Documents

**Analysis Documents:**
- `CUSTOMER_ANALYSIS.md` - VC perspective analysis
- `COMPLETION_SUMMARY.md` - Project completion summary
- `CONTENT_MARKETING_SUITE.md` - Marketing content
- `CONTENT-PRESERVATION-PLAN.md` - Content strategy
- `ATHLETES_FIRST_DEPLOYMENT.md` - Athletes First case study
- `AGENT_REVIEW_QUICK_START.md` - Agent system docs

**Docs Folder:**
Need to explore `/rationale-investor/docs/` for:
- VC_VALIDATION_ROADMAP.md (mentioned in SITE_RESTRUCTURE_PLAN)
- Investment deck materials
- Portfolio strategy documents

### 2.2 App Structure

Investor site has similar structure to public site with additional secure content:
- Investor dashboards
- Portfolio product pages
- Investment materials
- Partner collaboration tools

---

## 3. Current Public Site Content (`/rationale-public`)

### 3.1 Existing Work Pages (`/app/(public)/work/`)

**Current Portfolio:**
- `/athletes-first` - Athletes First pitch deck (exists)
- `/case-study-010` - Placeholder case study
- `/case-study-020` - Placeholder case study
- `/compass` - Compass project (exists)
- `/motivo` - Motivo project (exists)
- `/partnr` - Partnr project (exists)
- `/spark-ar` - Spark AR case study (exists)
- `/zero` - Zero product page (exists)

### 3.2 Missing from Current Site

**Historical Meta Work (from strategic brief):**
- Need to add Meta Reality Labs projects
- Spark AR Studio work
- Instagram AR effects
- Facebook AR platform

**From V01 that should be added:**
- Rumi case study (if appropriate)
- FUBO case study (password-protected per user request)
- Enhanced Zero case study (v01 has detailed markdown)

---

## 4. Migration Strategy

### 4.1 Priority 1: Historical Work (Public)

**Add Meta/Historical Projects:**
1. Create `/app/(public)/historical-work/page.tsx` OR
2. Add historical projects to existing `/work` directory

**Content to Add:**
- Meta Reality Labs background
- Spark AR Studio (already exists)
- Instagram AR Effects platform
- Key patents and shipped features

**User Requirement:** "Include historical work on public site (Meta projects)"

### 4.2 Priority 2: Enhanced Case Studies

**FUBO Case Study:**
- Source: `/rationale-v01-original/cases/fubo/long.md`
- Target: `/app/(protected)/work/fubo/page.tsx`
- **MUST BE PASSWORD-PROTECTED** per user request
- Add to protected routes in middleware

**Zero Case Study Enhancement:**
- Source: `/rationale-v01-original/cases/zero/long.md`
- Target: `/app/(public)/work/zero/page.tsx` (update existing)
- Add detailed case study structure from v01
- Maintain "Beta · Dogfooding" positioning

**Compass Case Study:**
- Source: May exist in v01
- Target: `/app/(public)/work/compass/page.tsx` (verify if needs update)

### 4.3 Priority 3: Owner Section (Matt-Only)

**Create `/app/owner/` route group:**

**Structure:**
```
/app/owner/
├── layout.tsx          (Owner-only layout)
├── page.tsx            (Owner dashboard)
├── content/            (Content library)
│   ├── blog/           (Blog posts for publishing)
│   ├── case-studies/   (Case study variants)
│   └── social/         (Social media content)
├── reference/          (Reference materials)
│   ├── agents/         (Agent system docs)
│   ├── playbooks/      (Process playbooks)
│   └── templates/      (Content templates)
└── tools/              (Publishing tools)
    ├── publish/        (One-click publish workflow)
    └── export/         (Export content variants)
```

**Content to Organize:**
- Case study markdown files (Zero, Rumi, FUBO in multiple formats)
- Agent system documentation
- Analysis documents (CUSTOMER_ANALYSIS, etc.)
- Marketing content variants
- Process documentation

**Publishing Workflow:**
- Owner creates/edits content in `/owner/content/`
- One-click publish to public site (`/thinking`, `/work`, etc.)
- Export variants for social media
- Recently viewed tracking

### 4.4 Priority 4: Investor Materials Migration

**Update `/app/investors/` content:**

**Portfolio Dashboard:**
- Rationale Studio overview
- Zero (Beta · Dogfooding)
- Atlas (Pipeline - Q1 2025)
- Amplify (Pipeline - Q2 2025)

**Investment Deck Content:**
- Team credentials (Meta, patents)
- Dual-engine model explanation
- Portfolio strategy and thesis
- Exit/monetization paths
- Investment terms

**Sources:**
- `/rationale-investor/CUSTOMER_ANALYSIS.md`
- `/rationale-investor/docs/VC_VALIDATION_ROADMAP.md`
- Current `/investors/` pages in public site
- Strategic brief requirements

---

## 5. Specific User Requirements

From strategic brief and conversation history:

✅ **Zero Status:** "Beta · Dogfooding" (NOT "Live") - DONE in Phase 2
✅ **FUBO:** Password-protected by client request - TODO
✅ **Historical Work:** Include Meta projects on public site - TODO
❌ **NO Specific Sectors:** Use "multiple sectors" - DONE in Phase 2
✅ **Infographic:** Keep "How We Ship Faster" - DONE in Phase 2
✅ **Owner Section:** Matt-only content organized by function - TODO
✅ **Publishing Workflow:** Ready to deploy from owner section - TODO

---

## 6. Content Gaps to Fill

### Public Site Gaps:
1. **Historical Work Page:** Meta Reality Labs background and shipped projects
2. **Enhanced Zero Case Study:** Use v01 detailed markdown
3. **FUBO Case Study:** Add to protected section with password
4. **About Page:** May need update with new positioning

### Protected Content Gaps:
1. **Owner Dashboard:** Complete content management system
2. **Publishing Tools:** One-click blog/social publishing
3. **Reference Library:** Organized by function (not date)
4. **Content Variants:** Multiple formats per case study

### Investor Content Gaps:
1. **Portfolio Cards:** Structured data for Zero/Atlas/Amplify
2. **Investment Deck:** Compiled from source materials
3. **Dual-Engine Explainer:** Visual diagram or detailed copy
4. **Traction Metrics:** Current status for each product

---

## 7. Technical Considerations

### Authentication:
- Owner section requires `role: 'owner'` check
- FUBO requires separate password protection
- Investor content requires `role: 'investor'` or higher
- Partner content requires `role: 'partner'` or higher

### Content Management:
- Owner section should support markdown editing
- Publishing workflow needs build/deploy integration
- Export tools need format conversion (markdown → social)
- Version control for content edits

### SEO & Performance:
- Historical work should be indexed (public)
- Case studies should have proper meta tags
- Owner section does NOT need SEO (private)
- Investor content should be noindex (private)

---

## 8. Migration Phases

### Phase 3.2: Historical Work (1-2 hours)
- Create historical work page or section
- Add Meta projects content
- Link from work portfolio
- Verify SEO meta tags

### Phase 3.3: Owner Section (3-4 hours)
- Create `/app/owner/` route structure
- Build owner dashboard
- Implement content library organization
- Add publishing workflow stub (full workflow in later phase)

### Phase 3.4: Enhanced Case Studies (2-3 hours)
- Update Zero case study with v01 content
- Add FUBO case study with password protection
- Verify Compass case study completeness
- Test protected route access

### Phase 3.5: Investor Materials (2-3 hours)
- Update investor dashboard with portfolio cards
- Add Zero/Atlas/Amplify structured data
- Compile investment deck content
- Add dual-engine explainer

**Total Estimated Time:** 8-12 hours

---

## 9. Files to Review

### From V01:
- `/cases/zero/long.md` - Detailed Zero case study
- `/cases/fubo/long.md` - FUBO case study (protect)
- `/cases/rumi/long.md` - Rumi case study (evaluate)
- `/app/(public)/page.tsx` - Homepage (compare)
- `/app/(public)/work/page.tsx` - Work index (compare)

### From Investor:
- `/CUSTOMER_ANALYSIS.md` - VC perspective
- `/docs/VC_VALIDATION_ROADMAP.md` - Investment thesis
- `/app/investors/` - Investor dashboard pages
- `/components/` - Investor-specific components

### Current Public:
- `/app/(public)/work/zero/page.tsx` - Update target
- `/app/(protected)/` - Add FUBO here
- `/app/investors/` - Update target
- `/middleware.ts` - Add owner route protection

---

## 10. Next Steps (Immediate)

1. **Create historical work content** from Meta background
2. **Set up Owner section structure** (`/app/owner/`)
3. **Migrate FUBO case study** with password protection
4. **Enhance Zero case study** with v01 markdown
5. **Update investor dashboard** with portfolio cards

**Ready to Begin Phase 3.2: Historical Work Migration**
