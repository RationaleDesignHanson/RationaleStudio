# Rationale Studio Website Restructure
## Comprehensive Specification — Final

---

## Executive Summary

Rationale Studio is building a portfolio of products across sectors, taking equity positions when the fit is right and cash engagements when they make sense. The current website conflates three audiences (clients, investors, curious visitors) and over-explains a single product (Zero) while under-communicating the actual thesis.

This spec defines:

1. **A positioning-focused homepage** that attracts equity partnerships
2. **A `/thinking` section** for essays that establish point of view
3. **A scalable portfolio system** at `/work` (public but not homepage-featured)
4. **A services architecture** at `/services` with clear engagement models
5. **Supporting pages** (`/about`, `/overview`) with clear content ownership
6. **A snippet system** that connects essays to case studies contextually

---

## Vision Alignment

### The Goal
Build equity positions in a portfolio of products across a variety of sectors — some built independently, others through partnerships where equity is earned.

### What the Site Must Communicate

| Message | Priority | Location |
|---------|----------|----------|
| "We build products with founders, equity when fit is right" | Highest | Homepage hero |
| "We have the credibility to execute" | High | Homepage, /about |
| "We have a methodology that de-risks product development" | High | /overview, /thinking |
| "We're selective about partnerships" | High | Homepage (fit filter) |
| "Cash engagements are welcome but contextualized" | Medium | /services |
| "We've shipped real things" | Medium | /work (not homepage) |
| "We have a portfolio thesis" | Medium | /about (Dual Engine) |

### What the Site Should NOT Do

- Lead with portfolio showcase (not ready for public emphasis)
- Position as a traditional agency/vendor
- Make Zero the sole proof point
- Bury the equity preference
- Attract tire-kickers and transactional clients

---

## Site Architecture

```
rationale.design/
│
├── / (homepage)
│   └── Positioning + conversion
│       - Hero (thesis)
│       - Credibility strip
│       - Velocity proof (simplified infographic)
│       - Fit filter (infographic)
│       - How we work (summary)
│       - CTA
│
├── /overview
│   └── Methodology presentation (visual, scannable)
│       - The Problem (slides)
│       - The Solution (slides)
│       - The Proof (links to /work)
│       - De-Risk (engagement overview)
│
├── /thinking (NEW)
│   └── Essays that establish point of view
│       ├── index — Essay list
│       ├── /thinking/why-specs-fail
│       ├── /thinking/the-sunk-cost-trap
│       ├── /thinking/build-to-think
│       ├── /thinking/why-seven-prototypes-is-faster
│       └── /thinking/where-this-comes-from
│
├── /work
│   └── Portfolio (public but not homepage-featured)
│       ├── index — Project grid
│       ├── /work/zero
│       ├── /work/compass
│       ├── /work/fubo-thumbnails
│       └── /work/[future-projects]
│
├── /services (NEW)
│   └── Engagement models
│       ├── index — How We Work overview
│       ├── /services/clarity-kit
│       ├── /services/prototype-kit
│       └── /services/build-ship-run
│
├── /about
│   └── Studio thesis + background
│       - What we're building toward
│       - The Dual Engine model
│       - Background/pedigree timeline
│       - Team (optional)
│
├── /clients
│   └── Gated client area (existing)
│       - Active projects
│       - Detailed portfolio positions (private)
│
└── /contact
    └── Booking/contact form
```

---

## Page Specifications

### Homepage (`/`)

#### Purpose
Position Rationale as an equity-aligned product builder, attract the right partnership conversations, filter for fit.

#### Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. HERO                                                         │
│                                                                 │
│    "We build products with founders.                           │
│     Equity when the fit is right."                             │
│                                                                 │
│    We're not an agency. We're building a portfolio of          │
│    products across sectors — sometimes our own, sometimes      │
│    with partners who need a technical co-founder without       │
│    the full-time hire.                                         │
│                                                                 │
│    [Let's talk fit]                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 2. CREDIBILITY STRIP                                            │
│                                                                 │
│    Meta · Spark AR · Reality Labs · 15+ Patents                │
│                                                                 │
│    "7 years shipping AR/AI to billions.                        │
│     Now building products with the same velocity."             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 3. VELOCITY PROOF (infographic)                                 │
│                                                                 │
│    [Simplified Traditional vs Rationale timeline]              │
│                                                                 │
│    Traditional: 24 weeks, first feedback Month 6               │
│    Rationale: 11 weeks, first feedback Day 3                   │
│                                                                 │
│    [See the methodology →] (links to /overview)                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 4. FIT FILTER (infographic)                                     │
│                                                                 │
│    WHAT WE LOOK FOR                                            │
│                                                                 │
│    ✓ Pre-product or early stage                                │
│      You have conviction but need execution                    │
│                                                                 │
│    ✓ Founder who builds, not just manages                      │
│      You'll be in the work with us                             │
│                                                                 │
│    ✓ Sector we're curious about                                │
│      We're building a diversified portfolio                    │
│                                                                 │
│    ✓ Meaningful equity for meaningful work                     │
│      If we're going to be partners, let's be partners          │
│                                                                 │
│    ┌─────────────────────────────────────────────────────────┐ │
│    │ Not sure if there's a fit?                              │ │
│    │ That's what the first call is for.                      │ │
│    │                                                         │ │
│    │ [Let's find out →]                                      │ │
│    └─────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 5. HOW WE WORK                                                  │
│                                                                 │
│    Same process. Equity or cash. You choose structure.         │
│                                                                 │
│    ┌─────────────┐   ┌─────────────┐   ┌─────────────┐         │
│    │  Clarity    │ → │  Prototype  │ → │ Build Ship  │         │
│    │  2 weeks    │   │  4-6 weeks  │   │  Run        │         │
│    │             │   │             │   │  3-6 months │         │
│    │ Validated   │   │  Working    │   │  Shipped    │         │
│    │ direction   │   │  software   │   │  product    │         │
│    └─────────────┘   └─────────────┘   └─────────────┘         │
│                                                                 │
│    Some start as cash. Some start as equity.                   │
│    The best become long-term portfolio companies.              │
│                                                                 │
│    [How we de-risk your investment →] (links to /services)     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 6. CTA                                                          │
│                                                                 │
│    "Have something worth building?"                            │
│                                                                 │
│    [Let's talk fit]                                            │
│                                                                 │
│    studio@rationale.design                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### What's NOT on Homepage

| Content | Where It Lives Instead |
|---------|------------------------|
| Portfolio grid | /work |
| Zero detailed case study | /work/zero |
| Methodology essay | /overview, /thinking |
| Dual Engine explanation | /about |
| Kit pricing details | /services |
| "What Zero Proves" | /work/zero |

---

### `/thinking` (NEW)

#### Purpose
Canonical home for essays that establish Rationale's point of view. These are the arguments that differentiate you from other studios.

#### Index Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  THINKING                                                       │
│                                                                 │
│  Ideas that shape how we work.                                 │
│                                                                 │
│  ───────────────────────────────────────────────────────────── │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  WHY SPECS FAIL                                        │   │
│  │                                                         │   │
│  │  Users don't know what they want until they feel it.   │   │
│  │  A 20-page spec describes an interaction. A prototype  │   │
│  │  lets users experience it.                             │   │
│  │                                                         │   │
│  │  Read →                                                │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  THE SUNK COST TRAP                                    │   │
│  │                                                         │   │
│  │  Why teams ship bad UX even when they know it's wrong. │   │
│  │  As investment grows, psychological pressure to ship   │   │
│  │  increases — even when the product is broken.          │   │
│  │                                                         │   │
│  │  Read →                                                │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  BUILD-TO-THINK                                        │   │
│  │                                                         │   │
│  │  The methodology behind everything we do. Rapid        │   │
│  │  prototypes answer binary questions — 7 prototypes     │   │
│  │  means 7 validated decisions before production.        │   │
│  │                                                         │   │
│  │  Read →                                                │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  WHY 7 PROTOTYPES IS FASTER                            │   │
│  │                                                         │   │
│  │  Counterintuitive math that saves months. Prototype 1  │   │
│  │  takes 2 days. Finding the same issue in production    │   │
│  │  takes 2 weeks to fix.                                 │   │
│  │                                                         │   │
│  │  Read →                                                │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  WHERE THIS COMES FROM                                 │   │
│  │                                                         │   │
│  │  7 years at Meta Reality Labs shipping AR/AI to        │   │
│  │  billions taught us: specs fail, prototypes work.      │   │
│  │  That experience shaped everything we do.              │   │
│  │                                                         │   │
│  │  Read →                                                │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Essay Inventory

| Essay Slug | Title | Core Argument | Word Count (Target) |
|------------|-------|---------------|---------------------|
| `why-specs-fail` | Why Specs Fail | Users don't know what they want until they feel it. Experience reveals problems specs can't predict. | ~800 |
| `the-sunk-cost-trap` | The Sunk Cost Trap | As investment grows, psychological pressure to ship increases — teams double down on bad UX to avoid admitting sunk cost. | ~600 |
| `build-to-think` | Build-to-Think | The complete methodology philosophy. Rapid prototypes answer binary questions. 7 prototypes = 7 validated decisions. | ~1000 |
| `why-seven-prototypes-is-faster` | Why 7 Prototypes Is Faster | Counterintuitive: more prototypes = less total time. Low-fidelity is high-speed; high-fidelity is low-speed. | ~500 |
| `where-this-comes-from` | Where This Comes From | Origin story — Meta/Reality Labs experience → methodology development → Rationale founding. | ~800 |

#### Individual Essay Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ← Back to Thinking                                            │
│                                                                 │
│  ───────────────────────────────────────────────────────────── │
│                                                                 │
│  WHY SPECS FAIL                                                │
│                                                                 │
│  ───────────────────────────────────────────────────────────── │
│                                                                 │
│  [Full essay content — markdown rendered]                      │
│                                                                 │
│  ...                                                           │
│                                                                 │
│  ───────────────────────────────────────────────────────────── │
│                                                                 │
│  RELATED                                                       │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐              │
│  │ The Sunk Cost Trap  │  │ Zero Case Study     │              │
│  │ /thinking           │  │ /work               │              │
│  └─────────────────────┘  └─────────────────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Essay Content (Source Material)

**WHY SPECS FAIL**

```markdown
# Why Specs Fail

Users don't know what they want until they feel it.

A 20-page spec describes an interaction. A prototype lets users experience it. 
Experience reveals problems specs can't predict.

## The Documentation Trap

Traditional product development starts with documentation:
- Product Requirements Document (PRD)
- User stories and acceptance criteria
- Technical specifications
- Stakeholder sign-offs

Weeks pass. Everyone agrees on paper. Then development begins.

The problem: you've built consensus around a guess.

## What Specs Can't Capture

**Specs describe behavior. Prototypes reveal behavior.**

Consider Zero's spec for email archiving:
> "As a user, I want to swipe left to archive emails so that 
> I can quickly clear my inbox."

Acceptance criteria:
- Swipe gesture detected
- Card animates left
- Item marked archived

This spec is internally consistent. It describes a complete interaction. 
Every stakeholder approved it.

It was also wrong.

## The Prototype Truth

When we put Prototype 3 in users' hands, 73% swiped right to archive — 
the opposite of what we'd specified.

Why? Because the spec described what we *thought* users would do. 
The prototype showed what they *actually* did.

The spec couldn't predict this. Only experience could.

## The Cost Difference

Discovery in Week 1 (prototype): 2 days to pivot
Discovery in Week 16 (production): 12+ weeks to fix, plus user trust damage

Specs give you false confidence. Prototypes give you real answers.

---

*This is why we build 7 prototypes before production. 
Each one answers questions specs can't ask.*
```

**THE SUNK COST TRAP**

```markdown
# The Sunk Cost Trap

Why teams ship bad UX even when they know it's wrong.

## The Pressure Curve

As investment grows, psychological pressure to ship increases — 
even when the product is broken.

- **Week 4:** $40K invested. Easy to pivot — minimal sunk cost.
- **Week 8:** $80K invested. Starting to hurt, but still rational to pivot.
- **Week 12:** $120K invested. Political pressure emerges: "we've invested so much."
- **Week 16:** $200K invested. Pivoting means admitting failure. Teams ship broken UX instead.

## Why Teams Double Down

12 weeks into development, you discover the core UX doesn't work.

**Option A: Pivot**
- Major rework
- Political fallout
- Feels like failure
- 12+ weeks additional time

**Option B: Continue**
- Ship subpar UX
- Avoid admitting the sunk cost
- No delay
- "We'll fix it in v2"

Most teams choose Option B.

Not because it's rational. Because the psychological weight of 
sunk cost makes pivoting feel worse than shipping something broken.

## The Result

Products launch with known problems. Users struggle. Reviews suffer. 
The team says "we knew about that" — but they shipped anyway.

The sunk cost trap turns rational teams into irrational decision-makers.

## How Rationale Eliminates This Trap

**7 prototypes before production.**

Every UX decision gets validated while sunk cost is near zero:
- Pivoting Prototype 3 costs 2 days
- Pivoting Week 12 production costs months

Zero's proof: 7 prototypes, 0 production pivots. Every major UX question 
answered before heavy investment. No sunk cost trap because validation 
happened early.

---

*When you validate early, pivoting is just iteration. 
When you validate late, pivoting is failure.*
```

**BUILD-TO-THINK**

```markdown
# Build-to-Think

The methodology behind everything we do.

## The Core Principle

Rapid prototypes answer binary questions.

Each prototype tests one assumption. 7 prototypes = 7 validated decisions 
before production. Zero guesswork.

## Traditional vs Build-to-Think

**Traditional:**
1. Write 20-page spec
2. Debate for weeks
3. Build for months
4. Discover issues in production
5. Expensive pivots or shipping broken UX

**Build-to-Think:**
1. Build Prototype 1 in 2 days
2. Put in user hands
3. Get answer
4. Iterate or proceed
5. Lock architecture with confidence

## The 7-Prototype Framework

Not random prototyping. Systematic.

**Prototypes 1-2: Core Interaction Model**
Test the fundamental UX hypothesis. Does the basic mechanic feel right?
- Example: Swipe direction, card layout, primary gesture

**Prototypes 3-4: Information Architecture**
Test how content is organized and accessed.
- Example: Category structure, navigation patterns, data display

**Prototypes 5-6: Edge Cases & Error States**
Test the hard parts — what happens when things go wrong?
- Example: Offline mode, empty states, error recovery

**Prototype 7: Polish & Microinteractions**
Test the feel — does it feel good to use?
- Example: Animations, haptics, transition timing

## Validation Gates

Each prototype has success criteria:
- **Pass:** Proceed to next prototype
- **Fail:** Pivot or kill

This creates checkpoints. You know exactly where you are.

## Why This Is Faster

Counterintuitive: "7 prototypes sounds slow."

Reality:
- Prototype 1 takes 2 days
- Finding the same issue in production takes 2 weeks to fix

Prototypes are low-fidelity, high-speed.
Production is high-fidelity, low-speed.

We de-risk the high-speed phase so production is single-pass, 
not iterative guessing.

Zero had 0 architectural pivots during production because we 
validated everything with 7 prototypes first.

---

*Build to think. Then build to ship.*
```

**WHY 7 PROTOTYPES IS FASTER**

```markdown
# Why 7 Prototypes Is Faster

Counterintuitive math that saves months.

## The Intuition Problem

"7 prototypes before production? That sounds slow."

It's not. Here's why.

## Two Types of Speed

**Low-fidelity, High-speed:** Prototypes
- Quick to build (2-3 days each)
- Quick to test (same day feedback)
- Quick to pivot (change direction overnight)
- Cheap to throw away

**High-fidelity, Low-speed:** Production
- Slow to build (weeks per feature)
- Slow to test (requires deployment)
- Slow to pivot (architectural changes)
- Expensive to throw away

## The Math

**Without prototypes:**
- Build production: 16 weeks
- Discover issue in Week 12
- Fix issue: 4+ weeks
- Total: 20+ weeks (plus user trust damage)

**With 7 prototypes:**
- Prototype phase: 2 weeks
- Discover issue in Prototype 3 (Day 5)
- Fix: 2 days
- Production (validated): 8 weeks
- Total: 10 weeks (with confidence)

The prototype phase adds 2 weeks upfront.
But it removes 10+ weeks of rework and uncertainty.

## Zero's Proof

- Week 1-2: 7 prototypes built and tested
- Prototype 3: Pivoted on swipe direction (Day 5)
- Week 3-4: Production development, 0 architectural changes
- Week 5: App Store submission

Total: 30 days from concept to App Store.

This speed was possible *because* of the prototypes, not despite them.

---

*Slow down to speed up. Validate early to ship fast.*
```

**WHERE THIS COMES FROM**

```markdown
# Where This Comes From

7 years at Meta Reality Labs taught us: specs fail, prototypes work.

## The Education

2015-2022: Building AR/AI products at Meta.

**Spark AR Platform**
The AR effects platform powering Instagram and Facebook Camera. 
Image tracking, body tracking, face effects, world AR.
Millions of AR experiences created.

**AR Commerce**
Platform strategy for AR shopping. Evaluated 60+ use cases for 
AR glasses and spatial commerce. F8 2018 stage presenter — 
Nike, Target, Sephora, ASUS.

**Patents**
15+ patents filed across AR, computer vision, and spatial computing.

## The Pattern

Every successful project had the same shape:
1. Start with rapid prototypes
2. Test assumptions with real users
3. Iterate before committing
4. Build production with confidence

Every failed project had a different shape:
1. Start with extensive documentation
2. Get stakeholder alignment on paper
3. Build production based on specs
4. Discover problems too late

## The Lesson

Shipping to billions teaches you what works.

It's not about moving fast. It's about validating fast.

Specs feel productive. Prototypes are productive.

## Rationale

We built Rationale to apply this methodology outside Meta.

Same systematic velocity. Same build-to-think approach. 
Now available to founders who need a technical co-founder 
without the full-time hire.

Zero was our proof: 30 days from concept to App Store.
Same process we bring to every partnership.

---

*The methodology isn't decoration. It's the accumulated 
wisdom of shipping to billions.*
```

---

### Thinking Snippet System

#### Purpose
Pull essay excerpts into case studies and other pages where contextually relevant. Creates connections between abstract ideas and concrete examples.

#### TypeScript Interface

```typescript
interface ThinkingSnippet {
  essaySlug: string;           // 'why-specs-fail'
  essayTitle: string;          // 'Why Specs Fail'
  pullQuote: string;           // The excerpt shown in context
  label?: string;              // Optional label override
                               // Default: "Related Thinking"
}

// Predefined snippets for each essay
const thinkingSnippets: Record<string, ThinkingSnippet[]> = {
  'why-specs-fail': [
    {
      essaySlug: 'why-specs-fail',
      essayTitle: 'Why Specs Fail',
      pullQuote: "Users don't know what they want until they feel it. A spec said 'swipe left to archive.' A prototype showed us that was wrong.",
      label: "Why This Matters"
    },
    {
      essaySlug: 'why-specs-fail',
      essayTitle: 'Why Specs Fail',
      pullQuote: "Specs describe behavior. Prototypes reveal behavior. Only experience shows what users actually do.",
    }
  ],
  'the-sunk-cost-trap': [
    {
      essaySlug: 'the-sunk-cost-trap',
      essayTitle: 'The Sunk Cost Trap',
      pullQuote: "As investment grows, psychological pressure to ship increases — even when UX is proven wrong.",
    },
    {
      essaySlug: 'the-sunk-cost-trap',
      essayTitle: 'The Sunk Cost Trap',
      pullQuote: "Pivoting Week 12 production costs months. Pivoting Prototype 3 costs 2 days.",
    }
  ],
  // ... etc for other essays
};
```

#### Visual Component

```
┌────────────────────────────────────────────────────────────┐
│  💡 RELATED THINKING                                       │
│                                                            │
│  "Users don't know what they want until they feel it.     │
│   A spec said 'swipe left to archive.' A prototype        │
│   showed us that was wrong."                              │
│                                                            │
│  Read: Why Specs Fail →                                   │
└────────────────────────────────────────────────────────────┘
```

#### Snippet Placement Map

| Essay | Appears As Snippet In |
|-------|----------------------|
| Why Specs Fail | /work/zero (at discovery section), /overview (Spec vs Prototype slide) |
| The Sunk Cost Trap | /work/zero (at pivot section), /work/compass, /overview (Cost of Waiting slide) |
| Build-to-Think | /services (methodology intro), /services/prototype-kit |
| Why 7 Prototypes Is Faster | /services/prototype-kit, /overview (framework slide) |
| Where This Comes From | /about (origin story section), can be linked from credibility strip |

---

### `/work` (Portfolio)

#### Purpose
Public portfolio of projects. Not featured on homepage, but accessible. Case studies include thinking snippets where relevant.

#### Index Page Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  WORK                                                                   │
│                                                                         │
│  Products we've built — our own and with partners.                     │
│                                                                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐           │
│  │                 │ │                 │ │                 │           │
│  │   [thumbnail]   │ │   [thumbnail]   │ │   [thumbnail]   │           │
│  │                 │ │                 │ │                 │           │
│  │ Zero            │ │ Compass         │ │ Fubo AI         │           │
│  │ AI Email Triage │ │ Video Intel     │ │ Thumbnails      │           │
│  │                 │ │                 │ │                 │           │
│  │ ● Live          │ │ ○ Prototype     │ │ ● Delivered     │           │
│  │                 │ │                 │ │                 │           │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Project Card Interface

```typescript
interface WorkProject {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  status: 'live' | 'beta' | 'prototype' | 'delivered' | 'building';
  tags: string[];
  ownershipType: 'founder' | 'equity-partner' | 'cash';
  // ownershipType is stored but may not be displayed publicly
}
```

#### Case Study Page Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ← Back to Work                                                        │
│                                                                         │
│  ZERO                                                                   │
│  AI Email Triage                                                       │
│                                                                         │
│  ● Live on App Store                                                   │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  THE CHALLENGE                                                          │
│                                                                         │
│  Email app for people who hate email. Core question: What              │
│  interaction model makes triage feel effortless?                       │
│                                                                         │
│  Traditional approach risk: Guess swipe direction, tap patterns,       │
│  view layouts — build for 6 months, discover problems in production.   │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  WHAT WE BUILT                                                         │
│                                                                         │
│  [Screenshots / demo video]                                            │
│                                                                         │
│  • Swipe-based inbox triage                                            │
│  • AI-powered email categorization                                     │
│  • 10 microservices in production                                      │
│  • 182 Swift files, A+ architecture                                    │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  THE PROCESS                                                           │
│                                                                         │
│  Week 1-2: Prototypes                                                  │
│  • P1-2: Core swipe mechanics                                          │
│  • P3: ⚠️ PIVOT — 73% expected opposite swipe direction               │
│  • P4-5: Gesture refinement                                            │
│  • P6-7: Polish and edge cases                                         │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │  💡 WHY THIS MATTERS                                           │    │
│  │                                                                │    │
│  │  "Users don't know what they want until they feel it.         │    │
│  │   A spec said 'swipe left to archive.' A prototype            │    │
│  │   showed us that was wrong."                                  │    │
│  │                                                                │    │
│  │  Read: Why Specs Fail →                                       │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  Week 3-4: Production                                                  │
│  Built validated approach. Zero architectural changes.                 │
│  Prototypes eliminated all risk — production was execution,            │
│  not experimentation.                                                  │
│                                                                         │
│  Week 5: Shipped                                                       │
│  App Store submission and approval.                                    │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  THE KEY DISCOVERY                                                      │
│                                                                         │
│  Day 5: User testing revealed our core assumption was wrong.           │
│  73% of users expected the opposite swipe direction.                   │
│                                                                         │
│  We pivoted in 2 days.                                                 │
│                                                                         │
│  If we'd discovered this in production:                                │
│  • $80K+ to fix                                                        │
│  • 12 weeks of rework                                                  │
│  • User trust damage                                                   │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │  💡 RELATED THINKING                                           │    │
│  │                                                                │    │
│  │  "Pivoting Week 12 production costs months.                   │    │
│  │   Pivoting Prototype 3 costs 2 days."                         │    │
│  │                                                                │    │
│  │  Read: The Sunk Cost Trap →                                   │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  RESULTS                                                               │
│                                                                         │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐                 │
│  │      30       │ │       0       │ │      10       │                 │
│  │     days      │ │    pivots     │ │ microservices │                 │
│  │ to App Store  │ │ in production │ │   in prod     │                 │
│  └───────────────┘ └───────────────┘ └───────────────┘                 │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  WHAT THIS PROVES                                                       │
│                                                                         │
│  • We can execute: Production-grade architecture, reviewed as A+       │
│  • We can move fast: 30 days concept to App Store                      │
│  • We think like operators: Complete GTM strategy, financial model     │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  [View live on App Store →]                                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### `/services` (NEW)

#### Purpose
Explain engagement models. Make equity preference clear while welcoming cash engagements.

#### Index Page Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  HOW WE WORK                                                           │
│                                                                         │
│  Same process. Equity or cash. You choose the structure.               │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  THE PROCESS                                                           │
│                                                                         │
│  Every engagement follows our build-to-think methodology:              │
│  validate with prototypes before committing to production.             │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │  💡 THE METHODOLOGY                                            │    │
│  │                                                                │    │
│  │  "Rapid prototypes answer binary questions. 7 prototypes      │    │
│  │   = 7 validated decisions before production. Zero guesswork." │    │
│  │                                                                │    │
│  │  Read: Build-to-Think →                                       │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  [Velocity Proof Infographic — Traditional vs Rationale]               │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  ENGAGEMENT MODELS                                                      │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │  CLARITY KIT                                                   │   │
│  │                                                                 │   │
│  │  Validate direction before heavy investment.                   │   │
│  │                                                                 │   │
│  │  Duration: 2 weeks                                             │   │
│  │  Deliverable: Validated direction + go/no-go recommendation   │   │
│  │  Investment: ~$15-25K (cash) or equivalent equity             │   │
│  │                                                                 │   │
│  │  [Learn more →]                                                │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │  PROTOTYPE KIT                                                 │   │
│  │                                                                 │   │
│  │  Working software you can test with real users.                │   │
│  │                                                                 │   │
│  │  Duration: 4-6 weeks                                           │   │
│  │  Deliverable: 7 prototypes + user testing + production specs  │   │
│  │  Investment: ~$50K (cash) or equivalent equity                │   │
│  │                                                                 │   │
│  │  [Learn more →]                                                │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │  BUILD SHIP RUN                                                │   │
│  │                                                                 │   │
│  │  Full product development from concept to launch.              │   │
│  │                                                                 │   │
│  │  Duration: 3-6 months                                          │   │
│  │  Deliverable: Shipped product + 60-day post-launch support    │   │
│  │  Investment: ~$150-200K+ (cash) or equity partnership         │   │
│  │                                                                 │   │
│  │  [Learn more →]                                                │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  EQUITY VS CASH                                                        │
│                                                                         │
│  We prefer equity partnerships for the right fit. Cash engagements    │
│  fund portfolio development and prove the process in new domains.     │
│                                                                         │
│  Some start as cash. Some start as equity.                            │
│  The best become long-term portfolio companies.                        │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  [De-Risk Curve Infographic]                                           │
│                                                                         │
│  Why This De-Risks Your Investment                                     │
│                                                                         │
│  Traditional agencies ask for 6-month commitments. Rationale works    │
│  in clear checkpoints with exit ramps. Start with Clarity Kit to      │
│  test hypothesis. If validated, extend to Prototype. If not, exit     │
│  after Week 2 with minimal investment.                                │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  [Let's talk fit →]                                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Individual Kit Pages

Each kit page (`/services/clarity-kit`, etc.) includes:

1. What it is (description)
2. What you get (deliverables list)
3. Timeline (week-by-week breakdown)
4. Investment (cash and equity options)
5. What makes a fit (ideal client for this kit)
6. Example (one case study reference)
7. Related thinking snippet
8. CTA

---

### `/about`

#### Purpose
Studio thesis, Dual Engine model, background/pedigree. The "why we exist" content.

#### Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ABOUT                                                                  │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  WHAT WE'RE BUILDING                                                   │
│                                                                         │
│  Rationale is building a portfolio of products across sectors.         │
│                                                                         │
│  Some we build ourselves. Others we build with founders who need       │
│  a technical co-founder without the full-time hire. Equity when        │
│  the fit is right. Cash when it makes sense.                           │
│                                                                         │
│  We're not an agency. We're not consultants. We're product builders   │
│  with skin in the game.                                                │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  THE MODEL                                                             │
│                                                                         │
│  [Dual Engine Infographic]                                             │
│                                                                         │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐      │
│  │                             │  │                             │      │
│  │  ENGINE 1                   │  │  ENGINE 2                   │      │
│  │  Internal Products          │  │  Partnerships               │      │
│  │                             │  │                             │      │
│  │  Build products (Zero,      │  │  Apply proven methodology   │      │
│  │  Compass, etc.)             │  │  to partner products        │      │
│  │                             │  │                             │      │
│  │  Validate methodology       │  │  Revenue funds internal     │      │
│  │  Generate IP                │  │  development                │      │
│  │  Prove execution            │  │  Edge cases refine process  │      │
│  │                             │  │                             │      │
│  └─────────────────────────────┘  └─────────────────────────────┘      │
│                                                                         │
│  Why Both?                                                             │
│                                                                         │
│  Internal products prove capability and fund runway.                   │
│  Partnerships fund development and harden the methodology.             │
│                                                                         │
│  Each engagement refines our systems. Each internal product            │
│  validates our approach. The flywheel accelerates — agencies          │
│  stay linear.                                                          │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  BACKGROUND                                                            │
│                                                                         │
│  [Timeline Infographic: 2000-2024]                                     │
│                                                                         │
│  2000-2014: Early career                                               │
│  2014-2017: Viacom                                                     │
│  2017-2018: Meta — Spark AR Platform                                   │
│  2018-2022: Meta — Reality Labs, AR Commerce                           │
│  2022-2024: Rationale Studio                                           │
│                                                                         │
│  15+ patents filed. F8 stage presenter. Shipped to billions.           │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │  💡 THE ORIGIN                                                 │    │
│  │                                                                │    │
│  │  "7 years at Meta Reality Labs taught us: specs fail,         │    │
│  │   prototypes work. That experience shaped everything we do."  │    │
│  │                                                                │    │
│  │  Read: Where This Comes From →                                │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  [Contact info / Team if relevant]                                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### `/overview`

#### Purpose
Visual presentation of methodology. Scannable slides with infographics. Links to `/thinking` for depth.

#### Changes from Current

| Change | Rationale |
|--------|-----------|
| Remove Dual Engine slide | Moved to /about |
| Link to /thinking essays | Instead of inline deep dives |
| Scalable proof section | Links to /work/[slug] instead of Zero-only |
| Consistent kit naming | Clarity Kit, Prototype Kit, Build Ship Run |

#### Slide Structure (Revised)

```
Section 1: THE PROBLEM
├── Slide 1: Hero — "Most Teams Waste 6 Months"
├── Slide 2: The Build-First Trap (timeline infographic)
├── Slide 3: The Cost of Waiting ($80K vs $10K)
└── Slide 4: Decision Pressure (knowledge/pressure curves)

Section 2: THE SOLUTION
├── Slide 5: Build-to-Think overview
│   └── Links to: /thinking/build-to-think
├── Slide 6: 7-Prototype Framework (process visual)
│   └── Links to: /thinking/why-seven-prototypes-is-faster
├── Slide 7: Spec vs Prototype (side-by-side)
│   └── Links to: /thinking/why-specs-fail
├── Slide 8: Checkpoint Timeline (exit ramps)
└── Slide 9: Where This Comes From (credibility)
    └── Links to: /thinking/where-this-comes-from, /about

Section 3: THE PROOF
├── Slide 10: What Our Work Proves (summary metrics)
└── Slide 11: Project showcase (links to /work)
    └── Links to: /work/zero, /work/compass, etc.

Section 4: DE-RISK
├── Slide 12: How We De-Risk (curve infographic)
├── Slide 13: Engagement Models (3 kits)
│   └── Links to: /services
└── Slide 14: CTA
```

---

## Infographics Inventory

### Existing (Keep/Adapt)

| Infographic | Location | Changes |
|-------------|----------|---------|
| Build-First Trap (timeline) | /overview | Keep as-is |
| Cost of Waiting | /overview | Keep as-is |
| 7-Prototype Framework | /overview | Keep as-is |
| Spec vs Prototype | /overview | Keep interactive element |
| Sunk Cost Trap (week selector) | /overview | Keep as-is |
| De-Risk Curve | /overview, /services | Keep, reuse on /services |
| What Zero Proves (tabs) | /overview | Refactor to "What Our Work Proves" — scalable |
| Background Timeline | /overview → /about | Move to /about |
| Dual Engine Flywheel | /overview → /about | Move to /about |
| Service Offerings / ROI | /overview | Keep for sales support |

### New (Create for Homepage)

| Infographic | Location | Purpose |
|-------------|----------|---------|
| Velocity Proof (simplified) | Homepage | Scannable Traditional vs Rationale |
| Fit Filter | Homepage | Selection criteria checklist |

### Adapt for Multiple Locations

| Infographic | Locations | Notes |
|-------------|-----------|-------|
| Velocity Proof | Homepage (simple), /overview (detailed) | Two versions |
| De-Risk Curve | /overview, /services | Same infographic, reused |

---

## Content Migration Map

### From Homepage → New Locations

| Content Block | Current | Destination |
|---------------|---------|-------------|
| Full methodology explanation | Homepage | /overview (already there), /thinking |
| "Why Specs Fail" deep dive | Homepage | /thinking/why-specs-fail |
| "The Sunk Cost Problem" deep dive | Homepage | /thinking/the-sunk-cost-trap |
| "Why This Saves Time" deep dive | Homepage | /thinking/why-seven-prototypes-is-faster |
| Zero detailed breakdown | Homepage | /work/zero |
| "What Zero Proves" (all instances) | Homepage (3x) | /work/zero |
| Portfolio grid | Homepage | /work |
| Dual Engine section | Homepage | /about |
| Kit Examples in Action | Homepage | Remove (redundant) |
| Kit pricing details | Homepage | /services |

### From /overview → New Locations

| Content Block | Current | Destination |
|---------------|---------|-------------|
| Dual Engine slide | /overview | /about |
| Background/pedigree timeline | /overview | /about (primary), /overview can link |
| Deep dive text content | /overview | /thinking (canonical), snippets in /overview |

---

## Naming Conventions (Final)

### Engagement Models

| Canonical Name | Duration | Investment Range |
|----------------|----------|------------------|
| **Clarity Kit** | 2 weeks | ~$15-25K or equity |
| **Prototype Kit** | 4-6 weeks | ~$50K or equity |
| **Build Ship Run** | 3-6 months | ~$150-200K+ or equity |

### Status Badges

| Status | Badge | Color | Meaning |
|--------|-------|-------|---------|
| `live` | ● Live | Green | Shipped, publicly available |
| `beta` | ● Beta | Yellow | Shipped, limited users |
| `prototype` | ○ Prototype | Cyan | Working software, not shipped |
| `delivered` | ● Delivered | Green | Client project, completed |
| `building` | ◐ Building | Gray | In active development |

### Ownership Types (Internal Use)

| Type | Meaning |
|------|---------|
| `founder` | Built and own it |
| `equity-partner` | Built with equity stake |
| `cash` | Built for cash payment |

---

## Responsive Design Audit

### Overview

Before implementing restructure, audit the current site for responsive issues. This ensures we don't carry forward problems into the new architecture.

### Audit Scope

**Breakpoints to Test:**

| Name | Width | Device Class |
|------|-------|--------------|
| `mobile-sm` | 320px | Small phones (iPhone SE) |
| `mobile` | 375px | Standard phones (iPhone X/12/13) |
| `mobile-lg` | 414px | Large phones (iPhone Plus/Max) |
| `tablet` | 768px | Tablets portrait (iPad) |
| `tablet-lg` | 1024px | Tablets landscape / small laptops |
| `desktop` | 1280px | Laptops |
| `desktop-lg` | 1440px | Desktop monitors |
| `desktop-xl` | 1920px | Large monitors |

**Pages to Audit:**

- `/` (Homepage)
- `/overview` (Methodology presentation)
- `/about`
- `/contact`
- Any `/work/*` pages if they exist

### Agent Assignments

| Agent | Responsibility |
|-------|----------------|
| **UX Analysis Agent** | Usability issues, touch targets, scroll behavior, interaction patterns |
| **Design System Agent** | Breakpoint consistency, spacing scale, component variants |
| **Typography Agent** | Font sizing, line length, hierarchy at each breakpoint |
| **Information Design Agent** | Data visualization scaling, infographic legibility |
| **Systems Architect Agent** | Performance implications, image optimization, lazy loading |

### Audit Checklist

#### 1. Navigation

```
□ Mobile hamburger menu present at tablet breakpoint and below
□ Menu opens/closes correctly
□ Touch targets minimum 44x44px
□ No horizontal overflow when menu closed
□ Logo scales appropriately
□ Active state visible on current page
□ Dropdown menus (Portfolio) work on touch devices
```

#### 2. Typography

```
□ H1 scales down for mobile (check hero specifically)
□ Body text readable without zooming (min 16px on mobile)
□ Line length stays within 45-75 characters
□ No text truncation cutting off meaning
□ Proper hierarchy maintained at all sizes
□ Monospace/code text doesn't break layout
```

#### 3. Layout

```
□ No horizontal scrollbar at any breakpoint
□ Content doesn't overflow viewport
□ Proper stacking order when columns collapse
□ Adequate spacing between stacked elements
□ Grid gaps scale appropriately
□ Max-width containers prevent ultra-wide line lengths
```

#### 4. Hero Section

```
□ Headline readable at mobile sizes
□ CTA buttons don't wrap awkwardly
□ Subhead text doesn't get too long on desktop
□ Background effects don't cause performance issues
□ Proper vertical spacing on all devices
```

#### 5. Methodology Section (Traditional vs Rationale)

```
□ Side-by-side comparison stacks on mobile
□ Timeline graphics scale or simplify
□ Numbers/stats remain legible
□ Deep dive accordions work on touch
□ Checkmarks/icons scale proportionally
```

#### 6. Portfolio Grid

```
□ 3-col → 2-col → 1-col transition works
□ Images scale within cards
□ Card aspect ratios maintained
□ Tags wrap gracefully
□ Hover states have touch equivalents
□ GIF animations don't cause jank
```

#### 7. Kit Cards

```
□ 3 cards → 2 cards → 1 card stacking
□ Equal heights within rows
□ Investment/duration info visible
□ CTAs accessible at all sizes
□ Adequate padding on mobile
```

#### 8. Infographics (Overview Page)

```
□ Complex diagrams have mobile alternatives or scale gracefully
□ Interactive elements have touch support
□ Text within diagrams remains legible
□ SVG viewBox set correctly for scaling
□ Fallbacks for CSS-only diagrams
```

#### 9. Forms (Contact Page)

```
□ Input fields full-width on mobile
□ Labels visible (not just placeholder)
□ Submit button easily tappable
□ Error states visible
□ Keyboard doesn't obscure inputs (iOS/Android)
```

#### 10. Footer

```
□ Links tappable with adequate spacing
□ Email address doesn't overflow
□ Copyright text doesn't wrap awkwardly
```

### Issue Severity Levels

| Level | Definition | Action |
|-------|------------|--------|
| **P0 Critical** | Unusable on device class (broken nav, unreadable text, major overflow) | Fix before launch |
| **P1 Major** | Significant UX degradation (awkward layout, hard-to-tap buttons) | Fix in Phase 1 |
| **P2 Minor** | Suboptimal but functional (spacing issues, alignment quirks) | Fix in Phase 2 |
| **P3 Polish** | Aesthetic refinements (animation timing, subtle spacing) | Backlog |

### Audit Output Format

Each agent should produce findings in this format:

```markdown
## [Agent Name] Responsive Audit Findings

### Page: [page name]
### Breakpoint: [breakpoint name and width]

#### Issue: [Brief description]
- **Severity:** P0/P1/P2/P3
- **Location:** [Component or section name]
- **Current behavior:** [What happens now]
- **Expected behavior:** [What should happen]
- **Suggested fix:** [Tailwind classes or CSS approach]
- **Screenshot:** [if available]

---
```

### Integration with Implementation

Responsive fixes should be integrated into each implementation phase:

| Phase | Responsive Work |
|-------|-----------------|
| Phase 1: Foundation | Run full audit, fix all P0 issues |
| Phase 2: Homepage | Apply fixes to new homepage components as built |
| Phase 3: Services | Ensure kit cards responsive from start |
| Phase 4: Work/Portfolio | Test case study template at all breakpoints |
| Phase 5: About + Overview | Fix any infographic scaling issues |
| Phase 6: Polish | Address P2/P3 issues |

### Tailwind Breakpoint Reference

Current Tailwind defaults (verify in `tailwind.config.js`):

```javascript
screens: {
  'sm': '640px',   // => @media (min-width: 640px)
  'md': '768px',   // => @media (min-width: 768px)
  'lg': '1024px',  // => @media (min-width: 1024px)
  'xl': '1280px',  // => @media (min-width: 1280px)
  '2xl': '1536px', // => @media (min-width: 1536px)
}
```

Common responsive patterns to use:

```jsx
// Stack on mobile, row on tablet+
<div className="flex flex-col md:flex-row">

// Full width mobile, constrained desktop
<div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8">

// Text sizing
<h1 className="text-3xl md:text-4xl lg:text-5xl">

// Grid columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Hide on mobile, show on desktop
<div className="hidden md:block">

// Show on mobile, hide on desktop
<div className="md:hidden">
```

---

## Claude Code & Agent Integration

### Agent Task Assignments

Each phase involves specific agents from the Rationale multi-agent system:

| Agent | Primary Responsibilities |
|-------|-------------------------|
| **Systems Architect** | Directory structure, routing, data flow, component architecture |
| **Design System Agent** | Component specs, Tailwind patterns, responsive implementation |
| **Typography Agent** | Font scales, hierarchy, readability audit |
| **UX Analysis Agent** | User flows, interaction patterns, usability audit |
| **Information Design Agent** | Infographic specs, data visualization, diagram scaling |
| **Brand Director** | Voice consistency, messaging alignment, visual identity |

### Claude Code Task Format

For each implementation task, structure Claude Code prompts as:

```markdown
## Task: [Task Name]

### Context
[Link to relevant spec section in this document]

### Agent: [Primary Agent]

### Input
- [Files to read/analyze]
- [Existing components to reference]

### Output
- [Files to create/modify]
- [Expected deliverables]

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

### Dependencies
- [Tasks that must complete first]
```

### Responsive Audit Task (Ready to Execute)

```markdown
## Task: Responsive Design Audit

### Context
See "Responsive Design Audit" section in this spec.

### Agents: UX Analysis, Design System, Typography

### Input
- All page files in `/app` or `/pages`
- Global styles in `/styles`
- Tailwind config
- All component files

### Process
1. For each page, test at all 8 breakpoints
2. Document issues using the severity levels (P0-P3)
3. Capture evidence (describe or screenshot)
4. Propose fixes using Tailwind classes

### Output
- `/docs/responsive-audit.md` with all findings
- Grouped by page, then by component
- Fixes prioritized by severity

### Acceptance Criteria
- [ ] All pages tested at all breakpoints
- [ ] All P0 issues identified
- [ ] Fix suggestions provided for P0 and P1
- [ ] No component left unaudited
```

### Phase-Specific Agent Prompts

**Phase 1 — Foundation**

```markdown
## Task: Create /thinking Architecture

### Agent: Systems Architect

### Input
- This spec document (Essay Inventory section)
- Current routing structure

### Output
- `/app/thinking/page.tsx` (index)
- `/app/thinking/[slug]/page.tsx` (dynamic route)
- `/lib/thinking/essays.ts` (essay metadata)
- `/lib/thinking/snippets.ts` (snippet definitions)

### Acceptance Criteria
- [ ] Dynamic routing works for all 5 essays
- [ ] Metadata structure matches spec interface
- [ ] Snippets can be queried by essay slug
```

```markdown
## Task: Create ThinkingSnippet Component

### Agent: Design System

### Input
- Snippet interface from spec
- Existing card/callout components for style reference

### Output
- `/components/thinking/ThinkingSnippet.tsx`
- Unit tests if test framework exists

### Acceptance Criteria
- [ ] Renders pullQuote, label, and link
- [ ] Matches visual spec (lightbulb icon, border treatment)
- [ ] Responsive (works at all breakpoints)
- [ ] Accessible (proper heading levels, link text)
```

**Phase 2 — Homepage**

```markdown
## Task: Implement Revised Homepage

### Agent: Design System, UX Analysis

### Input
- Homepage spec from this document
- Existing homepage for reference
- Velocity Proof and Fit Filter infographic specs

### Output
- Updated `/app/page.tsx`
- `/components/home/Hero.tsx`
- `/components/home/CredibilityStrip.tsx`
- `/components/home/VelocityProof.tsx`
- `/components/home/FitFilter.tsx`
- `/components/home/HowWeWork.tsx`

### Acceptance Criteria
- [ ] Matches section structure in spec
- [ ] All content migrated correctly
- [ ] Responsive at all breakpoints
- [ ] Single primary CTA pattern
- [ ] Links to /overview, /services work
```

**Phase 4 — Work/Portfolio**

```markdown
## Task: Create Case Study Template with Snippets

### Agent: Design System, Information Design

### Input
- Case study page structure from spec
- ThinkingSnippet component
- Zero case study content

### Output
- `/app/work/page.tsx` (index)
- `/app/work/[slug]/page.tsx` (template)
- `/components/work/CaseStudyLayout.tsx`
- `/lib/work/projects.ts`
- Populated Zero case study

### Acceptance Criteria
- [ ] Template matches spec structure
- [ ] Snippets render in correct locations
- [ ] Links to /thinking essays work
- [ ] Responsive at all breakpoints
- [ ] Status badges display correctly
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1)

| Task | Priority | Effort | Agent |
|------|----------|--------|-------|
| **Run responsive audit** | High | Medium | UX Analysis, Design System, Typography |
| Fix P0 responsive issues | High | Variable | Design System |
| Create `/thinking` directory structure | High | Low | Systems Architect |
| Write/migrate 5 canonical essays | High | Medium | — |
| Create ThinkingSnippet component | High | Low | Design System |
| Remove duplicate content from homepage | High | Low | — |

### Phase 2: Homepage (Week 2)

| Task | Priority | Effort | Agent |
|------|----------|--------|-------|
| Implement new homepage structure | High | Medium | Design System, UX Analysis |
| Create Velocity Proof infographic (simplified) | High | Medium | Information Design |
| Create Fit Filter infographic | High | Medium | Information Design, Brand Director |
| Update hero copy | High | Low | Brand Director |
| Add credibility strip | Medium | Low | Design System |

### Phase 3: Services (Week 3)

| Task | Priority | Effort | Agent |
|------|----------|--------|-------|
| Create `/services` index page | High | Medium | Design System, UX Analysis |
| Create individual kit pages | Medium | Medium | Design System |
| Add thinking snippets to kit pages | Medium | Low | — |
| Migrate De-Risk infographic | Medium | Low | Information Design |

### Phase 4: Work/Portfolio (Week 4)

| Task | Priority | Effort | Agent |
|------|----------|--------|-------|
| Create `/work` index page | High | Medium | Design System |
| Build case study template | High | Medium | Design System, Information Design |
| Migrate Zero content to `/work/zero` | High | Medium | — |
| Add thinking snippets to case studies | Medium | Low | — |
| Create Compass case study | Medium | Medium | — |

### Phase 5: About + Overview (Week 5)

| Task | Priority | Effort | Agent |
|------|----------|--------|-------|
| Build out `/about` page | Medium | Medium | Design System, Brand Director |
| Move Dual Engine to /about | Medium | Low | Information Design |
| Move pedigree timeline to /about | Medium | Low | Information Design |
| Refactor /overview proof section | Medium | Medium | Design System |
| Add essay links to /overview slides | Medium | Low | — |

### Phase 6: Polish (Week 6)

| Task | Priority | Effort | Agent |
|------|----------|--------|-------|
| Cross-link audit (all essays ↔ case studies) | Medium | Low | UX Analysis |
| Navigation updates | Medium | Low | Design System |
| Fix remaining P2/P3 responsive issues | Medium | Medium | Design System, UX Analysis |
| Final copy pass | Medium | Low | Brand Director, Typography |

---

## File Structure

### New Pages

```
app/ (or pages/)
├── page.tsx                      # Homepage (revised)
├── thinking/
│   ├── page.tsx                  # Essay index
│   ├── why-specs-fail/
│   │   └── page.tsx
│   ├── the-sunk-cost-trap/
│   │   └── page.tsx
│   ├── build-to-think/
│   │   └── page.tsx
│   ├── why-seven-prototypes-is-faster/
│   │   └── page.tsx
│   └── where-this-comes-from/
│       └── page.tsx
├── work/
│   ├── page.tsx                  # Portfolio index
│   ├── zero/
│   │   └── page.tsx
│   ├── compass/
│   │   └── page.tsx
│   └── fubo-thumbnails/
│       └── page.tsx
├── services/
│   ├── page.tsx                  # Services index
│   ├── clarity-kit/
│   │   └── page.tsx
│   ├── prototype-kit/
│   │   └── page.tsx
│   └── build-ship-run/
│       └── page.tsx
├── about/
│   └── page.tsx
├── overview/
│   └── page.tsx                  # Existing, modified
└── contact/
    └── page.tsx                  # Existing
```

### New Components

```
components/
├── thinking/
│   ├── ThinkingCard.tsx          # Card for essay index
│   ├── ThinkingSnippet.tsx       # Inline snippet component
│   └── EssayLayout.tsx           # Essay page template
├── work/
│   ├── ProjectCard.tsx           # Card for work index
│   ├── ProjectGrid.tsx           # Grid layout
│   └── CaseStudyLayout.tsx       # Case study template
├── services/
│   ├── KitCard.tsx               # Card for services index
│   └── KitDetailLayout.tsx       # Kit detail template
├── home/
│   ├── Hero.tsx                  # Revised hero
│   ├── CredibilityStrip.tsx
│   ├── VelocityProof.tsx         # Simplified infographic
│   ├── FitFilter.tsx             # Infographic
│   └── HowWeWork.tsx             # Summary section
├── about/
│   ├── DualEngine.tsx            # Moved from homepage
│   └── BackgroundTimeline.tsx    # Moved from overview
└── shared/
    ├── StatusBadge.tsx
    └── MetricCard.tsx
```

### Data Files

```
lib/
├── thinking/
│   ├── essays.ts                 # Essay metadata
│   └── snippets.ts               # Predefined snippets
├── work/
│   └── projects.ts               # Project data
└── services/
    └── kits.ts                   # Kit definitions
```

---

## Success Metrics

### Positioning

| Metric | Current | Target |
|--------|---------|--------|
| Time to understand thesis | 2-3 min | < 30 sec |
| Equity preference clarity | Buried | Immediately visible |
| Fit criteria visibility | None | Homepage section |

### Architecture

| Metric | Current | Target |
|--------|---------|--------|
| Duplicate content instances | 5+ (Zero alone) | 0 |
| Canonical locations per content | 2-3 | 1 |
| Essay discoverability | None | Dedicated section + snippets |

### Conversion

| Metric | Current | Target |
|--------|---------|--------|
| CTA clarity | Multiple competing | Single primary |
| Qualification before call | Minimal | Fit filter + self-selection |

---

## Appendix: Quick Reference

### Where Does X Live?

| Content | Canonical Location | Also Appears (as snippet/link) |
|---------|-------------------|-------------------------------|
| Why Specs Fail | /thinking/why-specs-fail | /work/zero, /overview |
| Sunk Cost Trap | /thinking/the-sunk-cost-trap | /work/zero, /work/compass |
| Build-to-Think | /thinking/build-to-think | /services, /overview |
| 7 Prototypes Speed | /thinking/why-seven-prototypes-is-faster | /services/prototype-kit |
| Origin Story | /thinking/where-this-comes-from | /about |
| Dual Engine | /about | None (single location) |
| Pedigree Timeline | /about | /overview can link |
| Zero Case Study | /work/zero | /overview links |
| Kit Details | /services/[kit] | Homepage summary |
| Methodology Presentation | /overview | Homepage links |

### URL Cheat Sheet

```
/                           Homepage (positioning)
/overview                   Methodology presentation
/thinking                   Essays index
/thinking/[slug]            Individual essay
/work                       Portfolio index
/work/[slug]                Case study
/services                   Engagement models
/services/clarity-kit       Kit detail
/services/prototype-kit     Kit detail
/services/build-ship-run    Kit detail
/about                      Studio thesis + background
/clients                    Gated client area
/contact                    Contact form
```

---

*Document version: 2.0 (Final)*
*Last updated: December 2024*
*Authors: Claude + Matt Hanson*
