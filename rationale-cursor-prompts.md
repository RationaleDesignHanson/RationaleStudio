# Rationale Site Restructuring: Cursor Prompts

A comprehensive set of prompts for restructuring rationale.studio with Cursor. Execute in order.

---

## Execution Order

| Order | Task | Prompt | Dependency |
|-------|------|--------|------------|
| 1 | Homepage redesign | Prompt 7 | None |
| 2 | Zero case study consolidation | Prompt 1 | Homepage links to /work/zero |
| 3 | Heirloom case study consolidation | Prompt 2 | Homepage links to /work/heirloom |
| 4 | How We Work revision | Prompt 4 (discuss first) | Receives components from homepage |
| 5 | About revision | Prompt 5 (discuss first) | After homepage establishes voice |
| 6 | Product page structure | Prompt 3 | After case studies exist |
| 7 | Route cleanup | Prompt 6 | Last |

---

## Prompt 1: Consolidate Zero Case Study

```
## Context
I'm restructuring the Work section of rationale.studio. Currently `/work/zero` has multiple sub-pages (demo, overview, architecture, metrics, taxonomy, timeline, stats) that fragment the case study narrative. 

## Goal
Consolidate `/work/zero` into a SINGLE cohesive case study page that tells Rationale's story about building Zero. This is NOT a product page—it's a portfolio piece for investors, potential acqui-hirers, and prospective clients.

## The case study should include:
1. **Hero**: Product name, one-line value prop, hero image/video
2. **At a Glance**: Timeline (30 days concept to App Store), team size, role, key outcomes (3-4 metrics)
3. **The Challenge**: What problem we set out to solve (from Rationale's POV)
4. **Our Approach**: How we applied build-to-think methodology
5. **Key Decisions**: 2-3 pivotal product/design decisions with rationale
6. **Technical Highlights**: Architecture overview (condensed, not exhaustive)
7. **Outcomes & Learnings**: Results + what we'd do differently
8. **CTA**: Links to try the product (→ /zero) and contact us

## Instructions
1. Review the existing content in `/app/(public)/work/zero/` including all sub-pages and components
2. Extract the best content from each sub-page
3. Create a new consolidated `page.tsx` that tells ONE cohesive story
4. Keep the interactive demo component but embed it inline (don't link out)
5. Remove or archive the sub-page folders (demo, overview, architecture, etc.)
6. Update `/app/(public)/work/page.tsx` to remove any multi-page navigation for Zero

## Design constraints
- Match existing visual system (ASCIIUnifiedGrid, GlassCard, terminal-gold palette)
- Mobile-first, single scroll experience
- No sidebar navigation—this is a single artifact
- Keep total page length reasonable (aim for 2-3 min read time)

## Files to review first
- /app/(public)/work/zero/page.tsx
- /app/(public)/work/zero/components/*.tsx
- /app/(public)/work/zero/overview/page.tsx
- /app/(public)/products/zero/page.tsx (for reference on what NOT to duplicate—that's the consumer page)
```

---

## Prompt 2: Consolidate Heirloom Case Study

```
## Context
Same restructuring as Zero. Currently `/work/heirloom` has sub-pages (pitch, technical-architecture, design-system, timeline-and-outcomes, prototypes) that fragment the narrative.

## Goal
Consolidate into ONE case study page. Heirloom is in beta, so the story arc is different from Zero—emphasize the validation journey and what we're learning.

## Case study sections:
1. **Hero**: Product name, value prop, hero visual
2. **At a Glance**: Stage (beta), timeline, role, key validation metrics
3. **The Opportunity**: Why recipe preservation + meal planning matters (market + personal angle)
4. **Design Challenges**: Recipe data is messy, heritage recipes need special handling, meal planning integration
5. **Prototype Evolution**: Show 2-3 iterations with what we learned
6. **Technical Approach**: AI extraction, data model, cross-platform considerations
7. **Current Status**: Beta metrics, what we're testing now
8. **What's Next**: Roadmap hints without overpromising
9. **CTA**: Beta signup, contact

## Instructions
1. Review existing content in `/app/(public)/work/heirloom/` 
2. The prototypes/ShoppingListDemo.tsx and CardCustomizationDemo.tsx might be worth embedding
3. Consolidate into single page.tsx
4. Archive sub-folders
5. Update work index page

## Files to review
- /app/(public)/work/heirloom/page.tsx
- /app/(public)/work/heirloom/components/*.tsx
- /app/(public)/work/heirloom/prototypes/*.tsx
- /app/(public)/products/heirloom/page.tsx (for differentiation—that's the consumer page)
```

---

## Prompt 3: Create Product Landing Page Structure with Variant Support

```
## Context
We need consumer-facing product pages separate from case studies. These pages need to support A/B testing different value propositions.

The distinction:
- /work/zero = Case study (Rationale's story about building it, for investors/clients)
- /zero = Consumer landing page (product marketing, for end users)

## Goal
Create a routing structure for product landing pages that:
1. Lives at `/zero`, `/heirloom`, `/thumby`, `/nimbus` (top-level, not under /products/)
2. Supports variant testing via `/zero/v/[variant]` pattern
3. Can eventually be split to separate domains

## Architecture
```
/app/(products)/
├── zero/
│   ├── page.tsx              → Default landing (redirects to current best variant or shows default)
│   └── v/
│       └── [variant]/
│           └── page.tsx      → Dynamic variant page
├── heirloom/
│   ├── page.tsx
│   └── v/[variant]/page.tsx
├── thumby/                   → Renamed from fubo
│   ├── page.tsx
│   └── v/[variant]/page.tsx
└── nimbus/
    ├── page.tsx
    └── v/[variant]/page.tsx
```

## Instructions
1. Create the (products) route group
2. Move and refactor `/app/(public)/products/zero/page.tsx` to `/app/(products)/zero/page.tsx`
3. Create the variant routing structure
4. Create a shared layout for product pages (different header/footer than main site—these are product brands, not Rationale portfolio)
5. Set up a simple variant config system (can be a JSON file or lib/content for now)
6. Handle the `/products/zero` → `/zero` redirect for backward compatibility

## Variant page requirements
- Each variant gets its own headline, subheadline, hero visual, and CTA copy
- Core product demo/features can be shared components
- Track which variant via URL (for analytics)
- Default page.tsx can either show a canonical version or redirect to current "winning" variant

## Note on fubo → thumby rename
The fubo product needs to be renamed to thumby. Handle this rename as part of this work.
```

---

## Prompt 4: Revise How We Work Page (Discussion First)

```
## Context
The homepage redesign removes several components that need a new home:
- VelocityProof component
- FitFilter component  
- "Three Ways to Work Together" section

These should move to /how-we-work. But before implementing, let's discuss what the page should become.

## Current page review
Review `/app/(public)/how-we-work/page.tsx` and tell me:

1. **What's working well** - sections that clearly communicate value
2. **What's redundant** - content that repeats or could be condensed  
3. **What's missing** - gaps in the story
4. **Structural issues** - ordering, hierarchy, flow problems

## Components being added from homepage
- VelocityProof (methodology visualization)
- FitFilter (qualification criteria)
- "Three Ways to Work Together" (Invest/Partner/Collaborate paths)

## Questions to answer
- Where should each incoming component live in the page flow?
- Is the "Our Process" 4-phase visual earning its space, or redundant with VelocityProof?
- Are three engagement models the right number? Too many? Too few?
- Is the equity explanation necessary on this page or should it live elsewhere?
- Should this page have a clear primary CTA, or is it purely informational?
- What's the narrative arc? (Current page feels like a list of facts, not a story)

## Output
Give me a structured analysis with specific recommendations. Don't implement yet—I want to discuss the direction first.
```

---

## Prompt 5: Revise About Page (Discussion First)

```
## Context
The homepage now establishes Rationale's positioning as "product co-founder" with Meta Reality Labs credentials. The About page needs to support this without repeating it.

About page audiences:
- Investors evaluating the studio/portfolio
- Clients deciding if we're credible
- Potential acqui-hirers assessing Matt's background

## Current page review
Review `/app/(public)/about/page.tsx` and analyze:

1. **Narrative arc** - Does the page tell a coherent story?
2. **Proof density** - Are we showing enough evidence without overwhelming?
3. **Matt vs Rationale** - Is the balance right between founder story and studio positioning?
4. **Call to action clarity** - Is it clear what we want people to do next?

## Specific questions
- The "What We Learned" section with 3 insights—is this the right content?
- "Proof at Scale" with Meta work—necessary or too much given homepage now has proof bar?
- The timeline image—valuable or vanity?
- "How We Work" section on About page—redundant with dedicated How We Work page?
- Should Matt's face/personal branding appear here since we kept it off homepage?

## Homepage voice established
The homepage uses:
- Studio voice ("we")
- Co-founder positioning
- Meta credentials: "Led product design at Meta Reality Labs—new product categories, 2B+ users, no room for guesswork"
- Specific products: Spark AR, AR Commerce, Ray-Ban AI, World AR, Avatars

The About page can go deeper on these without repeating the homepage framing verbatim.

## Output
Structured analysis with recommendations. Don't implement—discuss first.
```

---

## Prompt 6: Clean Up Legacy Routes

```
## Context
After consolidating case studies and restructuring products, we have legacy routes to clean up.

## Routes to evaluate for removal or redirect

### Definite redirects needed (old → new):
- /products/zero → /zero
- /products/heirloom → /heirloom
- /products/fubo → /thumby
- /work/zero/overview → /work/zero
- /work/zero/demo → /work/zero
- /work/zero/architecture → /work/zero
- /work/zero/metrics → /work/zero
- /work/zero/taxonomy → /work/zero
- /work/zero/timeline → /work/zero
- /work/zero/stats → /work/zero
- /work/heirloom/pitch → /work/heirloom
- /work/heirloom/technical-architecture → /work/heirloom
- /work/heirloom/design-system → /work/heirloom
- /work/heirloom/timeline-and-outcomes → /work/heirloom
- /work/heirloom/prototypes → /work/heirloom

### Folders to archive or delete:
- /app/(public)/products/ (if all products moved to top-level)
- /app/(public)/work/zero/ sub-folders
- /app/(public)/work/heirloom/ sub-folders

### Components to relocate if still needed:
- Any reusable components from work/*/components/ → /components/

## Instructions
1. Create redirects in next.config.js for all old routes
2. Verify no internal links reference the old routes (search codebase)
3. Move any reusable components to /components/
4. Archive or delete orphaned files
5. Test all redirects work correctly

## Important
- Don't break any live links—redirects first, deletion after verification
- Check for hardcoded links in content files and components
- Preserve SEO by using 301 permanent redirects
```

---

## Prompt 7: Homepage Redesign (Execute First)

```
## Context
Redesigning the Rationale homepage based on strategic decisions:

### Voice & Positioning
- Studio voice ("we" throughout)—Matt's personal story lives on /about
- Co-founder positioning: peer relationship, not vendor
- Equity model referenced conceptually, no specifics published
- The filter we want: founders who want a partner, not a vendor

### Credibility Angle
The founder led product design at Meta Reality Labs—not as a contributor, but leading a 400+ person org. The key differentiator: experience bringing NEW technology categories to market (0→1) at MASSIVE scale (2B users). Most people have one or the other. This is both.

Products shipped: Spark AR platform, AR Commerce (Nike, Sephora, Target), Ray-Ban AI, World AR, Avatars.

### Product Portfolio
Zero and Heirloom appear as proof of methodology, not as consumer pitches. They link to case studies (/work/zero, /work/heirloom), not consumer product pages.

---

## Page Structure

### Section 1: Hero

**Pre-headline** (small, monospace, terminal-gold):
```
Led product design at Meta Reality Labs—new product categories, 2B+ users, no room for guesswork.
```

**Headline** (large, bold):
```
Your product co-founder.
Without the cap table drama.
```

**Subheadline** (medium, gray-300):
```
We design and ship production software in weeks—with skin in the game so we're aligned on outcomes, not hours.
```

**CTAs**:
- Primary: "Book intro call" → /contact
- Secondary: "See the work →" → /work

---

### Section 2: Proof Bar (immediately below hero)

Three-column layout, subtle styling (borders, monospace labels):

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| META REALITY LABS | NEW CATEGORIES TO MARKET | SHIPPED TO 2B+ USERS |
| Led product design for 400+ person org | AR Commerce · Ray-Ban AI · World AR · Avatars | The discipline that comes from no room for guesswork |

Mobile: Stack vertically, same content.

---

### Section 3: How It Works

**Headline**: How It Works
**Subheadline**: You bring the vision. We bring the build.

Three cards (horizontal on desktop, vertical on mobile):

**Card 1: DISCOVER**
Map your product thesis and biggest risks. Weeks, not months.

**Card 2: PROTOTYPE**
Working software that tests real assumptions. Not mockups. Not specs.

**Card 3: SCALE**
We stay involved as product partners. Aligned incentives, long-term.

**Below cards** (small text, gray-400):
Flexible structures: cash, equity, or hybrid—depending on fit. Details on a call.

---

### Section 4: Portfolio

**Headline**: We Ship Our Own Products
**Subheadline**: Same methodology. Our own capital. Real users.

Two cards side-by-side (stack on mobile):

**Zero Card**:
- Title: Zero
- Description: AI email intelligence
- Proof point: Concept → App Store in 30 days
- Link: "View case study →" → /work/zero
- Border color: terminal-gold

**Heirloom Card**:
- Title: Heirloom
- Description: Recipe preservation + meal planning
- Proof point: In beta
- Link: "View case study →" → /work/heirloom
- Border color: #00D9FF (existing heirloom color)

---

### Section 5: Why This, Not That

**Headline**: Why This, Not That

Three cards or columns comparing alternatives:

**HIRE A TECHNICAL CO-FOUNDER**
- 6+ months to find the right person
- 15-25% equity for an unknown
- Relationship risk if it doesn't work
- Still need to manage the build

**HIRE AN AGENCY**
- No skin in the game
- Optimizes for billable hours
- Hands off after delivery
- You're still the product person

**WORK WITH RATIONALE**
- Start in weeks, not months
- Aligned incentives from day one
- Discipline forged shipping new categories at billion-user scale
- We stay involved through launch and beyond

Visual note: The Rationale column should be visually emphasized (terminal-gold border, slightly larger, or highlighted background).

---

### Section 6: Final CTA

**Headline**: Ready to talk?
**Subheadline**: Let's figure out if there's a fit. 30-minute call, no pitch deck required.

**Primary CTA**: "Book intro call" → /contact

**Secondary links** (smaller, inline):
"See more work →" → /work
"Read about us →" → /about

---

## Sections to REMOVE from homepage

These components should be removed from page.tsx and their functionality moved:

1. **"Three Ways to Work Together"** → Move to /how-we-work
2. **VelocityProof component** → Move to /how-we-work
3. **FitFilter component** → Move to /how-we-work or /contact
4. **The NEXT_PUBLIC_SHOW_SHIPPING_SECTION feature flag** → Remove entirely. Portfolio section always visible.

---

## Design Implementation Notes

- Maintain existing visual system: ASCIIUnifiedGrid backgrounds, GlassCard where appropriate, terminal-gold accent color
- Mobile-first responsive design
- Proof bar should feel confident but not boastful—monospace text, subtle borders, not flashy
- Keep lazy loading for below-fold sections
- Preserve existing SEO structured data (MultipleStructuredData component)

---

## Files to modify

**Primary:**
- `/app/(public)/page.tsx` — Full rewrite

**New components (if needed):**
- `/components/home/ProofBar.tsx` — The three-column credentials section
- `/components/home/ComparisonSection.tsx` — The "Why This, Not That" section

**Components to relocate:**
- VelocityProof, FitFilter — ensure they still work when imported to /how-we-work

---

## Success Criteria

5-second test: A visitor can articulate "This is a product studio that works as a co-founder, not a vendor. They shipped AR stuff at Meta to billions of people."

Clear next action: Book a call.

Appropriate filter: Founders who want a partner self-select in. People who want cheap hourly dev work bounce.
```

---

## Architecture Reference

### Current Structure (Problems)
```
/app/(public)/
├── work/
│   ├── zero/           → 9 sub-pages (fragmented)
│   ├── heirloom/       → 7 sub-pages (fragmented)
│   └── ...
├── products/
│   ├── zero/           → Consumer page (duplicate concept)
│   ├── heirloom/       → Consumer page
│   └── fubo/           → Needs rename to thumby
└── page.tsx            → Homepage (unfocused)
```

### Target Structure (After All Prompts)
```
/app/
├── (public)/                    → Rationale studio site
│   ├── page.tsx                 → Homepage (redesigned)
│   ├── work/
│   │   ├── page.tsx             → Work index
│   │   ├── zero/page.tsx        → Single case study page
│   │   ├── heirloom/page.tsx    → Single case study page
│   │   └── [other-work]/        → Other case studies
│   ├── how-we-work/page.tsx     → Process + engagement models
│   ├── about/page.tsx           → Studio + founder story
│   ├── contact/page.tsx         → Contact
│   └── thinking/                → POV content (keep as-is)
│
├── (products)/                  → Consumer product sites
│   ├── zero/
│   │   ├── page.tsx             → Default landing
│   │   └── v/[variant]/page.tsx → A/B test variants
│   ├── heirloom/
│   │   ├── page.tsx
│   │   └── v/[variant]/page.tsx
│   ├── thumby/                  → Renamed from fubo
│   │   ├── page.tsx
│   │   └── v/[variant]/page.tsx
│   └── nimbus/
│       ├── page.tsx
│       └── v/[variant]/page.tsx
│
└── [other routes as needed]
```

### Key Distinctions

| Route | Audience | Purpose | CTA |
|-------|----------|---------|-----|
| /work/zero | Investors, clients | "Here's how we built this" | See how we work / Book call |
| /zero | Consumers | "Here's what this does for you" | Download / Join waitlist |
| / (homepage) | Potential partners | "Here's why Rationale" | Book intro call |

---

## Notes

- **Prompts 4 and 5 are discussion prompts.** Run them, review the output, then iterate before implementing.
- **Prompt 7 (Homepage) should be executed first** since it establishes the voice and removes components that other pages need to absorb.
- **Prompts 1 and 2 (Case Studies) should be done before Prompt 3 (Product Pages)** so you have clean separation between portfolio and consumer content.
- **Prompt 6 (Cleanup) should be done last** after all other routes are stable.

---

*Generated: January 2025*
*For use with Cursor AI*
