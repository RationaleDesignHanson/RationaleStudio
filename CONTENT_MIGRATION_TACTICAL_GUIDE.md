# Content Migration: Tactical Implementation Guide

**Date:** 2025-12-02
**Purpose:** Specific copy, structure, and implementation recommendations for porting rationale-site content to RationaleStudio

---

## SECTION 1: `/how-we-work` PAGE IMPLEMENTATION

### Page Structure

```typescript
// File: /Users/matthanson/RationaleStudio/app/(public)/how-we-work/page.tsx

export const metadata: Metadata = {
  title: 'How We Work — Rationale Studio',
  description: 'Cash, equity, or hybrid partnerships. 0.5-3% equity typical for 6-18 month builds. Like Zero—we take equity when we believe.',
};
```

### Hero Section (Copy from rationale-site, minimal edits)

**Title:** How We Work
**Subtitle:** Engagement models built for speed and alignment
**Description:** From 2-week validation sprints to multi-year equity partnerships. We structure every engagement around what you need—and what we believe is worth building together.

### Three Engagement Models Section

✅ **Port exactly as-is from rationale-site** — this is already lean and commercial.

**Copy structure:**
1. Cash Engagements
   - When you need speed and certainty
   - Best For: 2-6 week sprints, pre-seed validation, Series A+ de-risking
   - Structure: Fixed deliverables, 2-12 weeks, upfront or milestone payment

2. Equity Partnerships (featured)
   - When we believe in what you're building
   - Best For: 6-18 month builds, fractional CPO, AI/AR/0-1 expertise
   - Structure: 0.5-3% equity typical, vesting, board observer rights optional
   - **Callout:** "Like Zero: We're building our own AI email platform. Same conviction we bring to equity partnerships."

3. Hybrid (Cash + Equity)
   - Most common for longer engagements
   - Best For: 3-12 month builds, seed-stage runway preservation
   - Structure: 50-70% cash discount, 0.5-2% equity, milestone payments

### Process Timeline Section

✅ **Port exactly as-is from rationale-site** — already buyer-comprehensible.

**Copy structure:**
1. Week 1: Align
   - "Map your product thesis, biggest unknowns, success criteria"

2. Weeks 2-4: Prototype
   - "Build functional software that tests core assumptions. Not mockups—working demos."

3. Weeks 4-6: Test & Validate
   - "Run prototype through real usage. Evidence, not opinions."

4. Week 6+: Refine or Build
   - "Based on what we learned: pivot, persevere, or scale."

### "Why Equity Alignment Matters" Section

✅ **Port exactly as-is from rationale-site** — authentic and differentiated.

**Two-column layout:**
- What Changes (with equity)
  - We say no to bad ideas (even if billable)
  - We prioritize long-term value over scope
  - We care about your Series A, not just handoff

- What Doesn't Change
  - We still move fast (equity ≠ slow)
  - You still own your company
  - Clear deliverables and milestones still exist

### CTA Section

**Title:** Figure Out the Right Structure Together
**Description:** Every engagement starts with a conversation about your timeline, runway, and what you're trying to prove.
**Button:** Start the Conversation → `/contact`

---

## SECTION 2: ENHANCED `/about` PAGE IMPLEMENTATION

### Current Structure (needs enhancement):
- Who We Are (basic)
- Philosophy (quote only)
- How We Work (basic)
- Founder Background (detailed but needs refinement)
- Beyond Work (personal hobbies)

### Recommended New Structure:

```typescript
// File: /Users/matthanson/RationaleStudio/app/(public)/about/page.tsx

export const metadata: Metadata = {
  title: 'About — Conviction-First Product Studio | Rationale',
  description: 'Dual-engine model: Portfolio IP proves execution, Client Kits fund runway. Ex-Meta Reality Labs. Building with conviction and systematic execution.',
};
```

---

### 1. HERO SECTION

**Title:** About Rationale
**Subtitle:** Conviction before code
**Description:** We're a product development studio built on one principle: prove it with working software, not slides.

✅ **Keep current copy** — concise and clear.

---

### 2. WHO WE ARE SECTION (Enhanced from rationale-site)

**Current RationaleStudio copy:**
> "Rationale is a product development studio founded by Matt Hanson, former Meta Reality Labs Senior Product Design Manager (7 years) and current FUBO VP of Design. We build products that ship—not prototypes that sit in Figma."

**Recommended enhanced copy:**

#### **Who We Are**

Rationale is a product development studio founded by Matt Hanson, former Meta Reality Labs Senior Product Design Manager (7 years). We build products that ship—not prototypes that sit in Figma.

After a decade building at scale for Meta and publicly traded companies, we're now applying that same systematic execution to our own Portfolio IP and select client partnerships. We operate on a dual-engine model: Portfolio IP (products we own) proves our capability, and Client Kits (structured engagements) fund our runway.

Our work is governed by a simple belief: **clarity precedes execution, course precedes speed, and conviction is the scarcest resource.**

---

### 3. DUAL-ENGINE MODEL SECTION (New — from rationale-site)

**Add this as a new section after "Who We Are"**

#### **Two Engines, One System**

Rationale grows through two tightly integrated engines that create a virtuous cycle of proof and revenue.

**Portfolio IP — Products We Own**
Design, build, and launch proprietary products like Zero and Compass. These prove our systematic execution and generate IP we can scale or license.

*Zero proof: 1 month concept to App Store. Compass: 6-week prototype sprint. Both demonstrate velocity across domains.*

**Client Kits — Partnerships We Build**
Transform client product challenges into shipped software via structured engagements: Clarity Kits (2 weeks), Prototype Kits (4-6 weeks), Build Ship Run (6-18 months).

*Cash, equity, or hybrid structures. Same systematic velocity.*

**Why Both?**
Portfolio IP proves capability and funds runway. Client Kits fund Portfolio development and harden our frameworks. Both engines compound: every pilot hardens our systems, every product validates our approach.

This isn't a studio that does client work on the side. This is a studio that builds IP through both channels—yours and ours.

[Button: View Portfolio IP → `/work/zero`]
[Button: View Client Kits → `/how-we-work`]

---

### 4. CORE BELIEFS SECTION (New — condensed from rationale-site)

**Replace current "Philosophy" section with this:**

#### **Core Beliefs**

Our work is guided by mental models forged through years of shipping 0-1 products at scale.

**Clarity Precedes Illumination**
Design the circuit before the lightbulb. The most elegant execution is meaningless without an underlying system of clarity, behavior, and intent. We map the problem space before the solution space, define behavior change (not features), and build conviction before execution.

**Course Before Speed**
Direction is the new bottleneck. AI has given everyone unprecedented speed, but without clear direction, more speed only gets you lost faster. We validate assumptions before scaling, test the hardest risks first, and build the map before accelerating.

**Build to Prove**
Working software > pitch decks. We don't just plan products—we build functional prototypes to validate assumptions. Zero went from concept to App Store in 1 month with 7 interactive prototypes validating core mechanics before launch.

[Optional: "Learn more about our frameworks" → `/frameworks` or skip entirely]

---

### 5. PORTFOLIO PROOF SECTION (New — from rationale-site)

**Add this after Core Beliefs:**

#### **Portfolio IP — Proof of Systematic Execution**

These mental models aren't theoretical—we apply them to our own Portfolio IP. Conviction-backed ventures that prove our systematic execution.

**Metrics:**
- 3 Active Ventures
- 1 Month Concept to Complete Plan
- 350KB+ Documentation
- 7 Interactive Prototypes (Zero)
- 10 Microservices in Production (Zero)

**Zero · AI Email Triage**
Full transparency: Live on App Store, 4-cohort beta rollout, complete fundraising deck. This is how we prove speed.
[Link: View complete details → `/work/zero`]

**Compass · AI Video Intelligence**
AI video indexing with cultural and emotional intelligence. Proof of range: AI across different domains.
[Link: View details → `/work/compass`]

**Building in Public**
We ship 1-2 products per quarter. Zero took 6 weeks from concept to complete execution plan. Follow our progress as we build the next one.
[Link: Partner with us → `/contact`]

---

### 6. FOUNDER BACKGROUND SECTION (Enhanced — condensed from rationale-site)

**Current copy is good, enhance with past experience:**

#### **Founder Background**

**Matt Hanson**
*Founder, Rationale Studio*

Matt founded Rationale in response to a critical problem: AI has made execution cheap and fast, but teams are building the wrong things faster than ever. His mission is to protect founders from the biggest risk in product development—speed without direction.

**Experience:**
- **Meta (2018–2025) — 7 Years**
  - Senior Product Design Manager, FAIR (Embodied AI Research)
  - Product Lead, Reality Labs (AR Shopping, Spark AR Platform)
  - UX Lead, Orion AR Glasses & Quest MR Mode
  - Led 20+ teams from 0-1 across AR shopping, spatial computing, mixed reality
  - F8 2018 presenter with Nike, Target, Sephora, ASUS
  - Patent: "Interactive Avatars in Artificial Reality" (Spark AR, 2021)

- **Head of Design, Publicly Traded Company (2025)**
  - Led Growth, Design Systems, and New Features at live streaming platform
  - Scaled design operations and product development at production scale

**What Meta Taught Us:**
Build-to-think methodology, structured experimentation, multi-disciplinary velocity. Zero went concept to App Store in 1 month because we applied these systems. Same rigor, same velocity for client partnerships.

**Education & Recognition:**
- BFA in Computer Art, SUNY Buffalo (1996–2000)
- Patent holder: "Interactive Avatars in Artificial Reality" (USPTO)

[Link: View full operator background → LinkedIn or keep on page]

---

### 7. BEYOND WORK SECTION (Simplified)

**Current copy is good, keep as-is:**

#### **Beyond Work**

Father of three daughters. When not building products, you'll find me throwing pottery, experimenting in the kitchen (beef wellington is a specialty), or logging miles on the Peloton.

These pursuits aren't separate from the work—they're all about the same thing: systematic practice, iterative improvement, and finding joy in the process of making things better.

---

### 8. CTA SECTION (Enhanced)

**Current:**
> "Let's work together" (basic CTA)

**Recommended:**

#### **Let's Work Together**

Ready to build with conviction? Whether you need a 2-week validation sprint or a multi-year equity partnership, we're here to help you de-risk direction before accelerating execution.

[Button Primary: Book a Kit Scoping Call → `/contact`]
[Button Secondary: View How We Work → `/how-we-work`]

---

## SECTION 3: HOMEPAGE UPDATES (MINIMAL)

### Current Structure is EXCELLENT — Keep mostly as-is

**Only additions:**

1. **Navigation update:**
   - Add "How We Work" to main nav
   - Ensure `/about` is easily discoverable

2. **Services section enhancement (optional):**
   - Add one sentence: "Every engagement can be structured as cash, equity, or hybrid."
   - Link to `/how-we-work` for full details

3. **Dual-engine callout (already exists):**
   - ✅ Keep current section "How Rationale Grows: Two Engines, One System"
   - No changes needed

---

## SECTION 4: NAVIGATION STRUCTURE

### Current RationaleStudio Nav:
```
Home | About | Contact
```

### Recommended Enhanced Nav:
```
Home | About | How We Work | Contact
```

**Mobile nav:**
```
Home
About
How We Work
  → Engagement Models
  → Process Timeline
  → Equity Partnerships
Portfolio
  → Zero
  → Compass
Contact
```

---

## SECTION 5: OPTIONAL `/frameworks` PAGE (Future Enhancement)

**IF you want to preserve full framework content for deep-dive seekers:**

Create `/frameworks` page with:
1. Hardest Risk First (full detail from rationale-site)
2. Behavior-First Design (full detail from rationale-site)
3. Progressive Conviction (full detail from rationale-site)
4. Circuit Before Lightbulb (full detail from rationale-site)

**Metadata:**
```typescript
export const metadata: Metadata = {
  title: 'Frameworks — Rationale Studio',
  description: 'Practical frameworks for building conviction: Hardest Risk First, Behavior-First Design, Progressive Conviction, Circuit Before Lightbulb.',
};
```

**When to build this:**
- Not required for launch
- Add if you notice buyers asking for deeper methodology
- Link from `/about` as "Learn more about our frameworks"

---

## SECTION 6: COPY TONE CORRECTIONS

### ❌ AVOID (from rationale-site)

**Too theoretical:**
> "Rationale was not founded in a vacuum. It is a direct and deliberate response to a new, critical problem that has emerged in the world of product development."

**Better (commercial):**
> "Rationale exists to de-risk direction before accelerating execution."

---

**Too philosophical:**
> "The most elegant user interface is meaningless without an underlying structure of clarity, behavior, and intent."

**Better (commercial):**
> "We design the system before the interface. Clarity precedes execution."

---

**Too abstract:**
> "In an era where execution has become cheap and fast, the true challenge is no longer what you build, but how it is designed."

**Better (commercial):**
> "AI made execution cheap. Knowing what to build is now the bottleneck."

---

### ✅ USE (from rationale-site — already commercial)

**Clear and direct:**
> "We only partner when our expertise creates strategic advantage in AI, AR, or 0-1 products."

**Authentic proof:**
> "Like Zero: We're building our own AI email platform from concept to market. Same conviction we bring to equity partnerships."

**Buyer-focused:**
> "Fixed-scope sprints and validation engagements. You pay, we deliver, no equity complexity."

---

## SECTION 7: VISUAL & DESIGN RECOMMENDATIONS

### Window Shrine Styling (Already Established)

✅ **Keep RationaleStudio's current visual system:**
- Refined OS8Window components
- Yellow as disciplined accent (not overdone)
- GlassCard components
- ASCII grid backgrounds (subtle, not gimmicky)
- Clean typography hierarchy

### Layout Recommendations

**`/how-we-work` page:**
- Hero section (full width)
- Three engagement model cards (grid layout, Equity model featured with border)
- Process timeline (vertical stepper or cards)
- "Why Equity Matters" two-column layout
- CTA section (centered, accent background)

**`/about` page:**
- Hero section
- Dual-engine model (two-column cards)
- Core beliefs (stacked cards, each with icon)
- Portfolio proof (metrics grid + product cards)
- Founder background (single column, left-aligned text)
- Beyond Work (optional, single column)
- CTA section

### Color Usage

**Yellow accent usage:**
- Equity partnership callouts
- Key metrics (1 month, 7 prototypes, etc.)
- Primary CTAs
- Section markers

**Avoid:**
- Overuse of yellow (keep disciplined)
- Gimmicky animations or effects
- Excessive ASCII art

---

## SECTION 8: IMPLEMENTATION CHECKLIST

### Phase 1: Critical Path (Week 1)

- [ ] Create `/how-we-work` page
  - [ ] Hero section
  - [ ] Three engagement models (Cash, Equity, Hybrid)
  - [ ] Process timeline (4 phases)
  - [ ] "Why Equity Alignment Matters" section
  - [ ] CTA section

- [ ] Update `/about` page
  - [ ] Enhance "Who We Are" section (2-3 paragraphs)
  - [ ] Add "Dual-Engine Model" section
  - [ ] Add "Core Beliefs" section (2-3 models)
  - [ ] Add "Portfolio Proof" section (metrics + Zero/Compass)
  - [ ] Enhance "Founder Background" with past experience

- [ ] Update navigation
  - [ ] Add "How We Work" to main nav
  - [ ] Ensure mobile nav includes new pages

### Phase 2: Enhancement (Week 2)

- [ ] Review all copy for commercial tone
- [ ] Tighten founder bio (remove hobby details if too long)
- [ ] Add internal links between pages (About → How We Work, etc.)
- [ ] Ensure all CTAs are clear and prominent
- [ ] Test mobile layouts

### Phase 3: Polish (Week 3)

- [ ] Final review for over-leveraging (Meta credentials)
- [ ] Final review for gimmicks (excessive ASCII, over-designed elements)
- [ ] Ensure engagement tiers are immediately legible
- [ ] Test buyer journey: "Can I explain Rationale after visiting homepage?"
- [ ] Optional: Create `/frameworks` page for deep content

### Phase 4: QA & Launch

- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Link integrity check
- [ ] SEO metadata review
- [ ] Analytics setup
- [ ] Launch

---

## SECTION 9: DONE WHEN CRITERIA

Content migration is **DONE WHEN:**

**Buyer Comprehension:**
- [ ] Buyer can explain Rationale in one sentence
- [ ] Two growth engines (Portfolio + Kits) are instantly legible
- [ ] Founders can self-qualify for engagement tier without exhaustion
- [ ] Pricing structure (if not exact numbers) is clear

**Commercial Clarity:**
- [ ] Equity model is explicit and coherent (0.5-3%, 6-18 months)
- [ ] Three engagement models are discoverable within 2 clicks
- [ ] Zero is hero proof, Meta is supporting context
- [ ] Portfolio IP metrics are visible (3 ventures, 1 month, 350KB+ docs)

**Tone & Positioning:**
- [ ] No gimmicky language or over-leveraged authority
- [ ] Philosophy is practical, not theoretical
- [ ] Copy is commercial, not consultant-speak
- [ ] Mental models reduced to 2-3 core beliefs (not 4+)

**Technical:**
- [ ] All pages mobile responsive
- [ ] Navigation updated and tested
- [ ] Internal links working
- [ ] SEO metadata optimized

**Proof Before Philosophy:**
- [ ] Zero featured prominently on homepage
- [ ] Engagement tiers clear on `/how-we-work`
- [ ] Core beliefs concise on `/about`
- [ ] Founder background authentic but not credential-waving

---

## FINAL NOTES

**Key principle: Lead with proof (Zero), not philosophy.**

**RationaleStudio's current homepage is BETTER than rationale-site's inferred structure. Keep that. Enhance `/about`, add `/how-we-work`, tighten everything else.**

**When in doubt: Cut. Complexity kills conversion.**

**Meta credentials = context, not primary authority.**

**Equity model = feature, not footnote.**

**Zero = hero, Compass = supporting actor, Meta = background.**
