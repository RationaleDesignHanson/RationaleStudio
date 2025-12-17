# Product Marketing Pages Implementation

**Status**: Ready for review and deployment
**Created**: December 16, 2025
**Phase**: Foundation complete (Zero + Heirloom pages built, content files ready for 010-040)

---

## Overview

We've prepared a comprehensive overhaul of product marketing pages, replacing technical "overview" pages with consumer-friendly, JTBD-focused marketing pages. These pages are **self-contained and NOT deployed**—they exist but are not linked in navigation until you're ready.

### What We Built

1. **Marketing Page Framework** - Universal 8-section structure for all products
2. **Content Type System** - TypeScript interfaces for consistent content structure
3. **6 Product Content Files** - Complete marketing copy for all products
4. **2 Complete Marketing Pages** - Zero and Heirloom (fully functional)
5. **4 Ready-to-Build** - CREaiT, Athletes-First, Fubo, and 040 (content ready, pages pending)

---

## File Structure

```
/rationale-public/
├── app/(public)/
│   └── products/                    ← NEW: Consumer marketing pages
│       ├── zero/
│       │   └── page.tsx             ✅ COMPLETE
│       ├── heirloom/
│       │   └── page.tsx             ✅ COMPLETE
│       ├── creait/
│       │   └── page.tsx             🚧 PENDING (content ready)
│       ├── athletes-first/
│       │   └── page.tsx             🚧 PENDING (content ready)
│       ├── fubo/
│       │   └── page.tsx             🚧 PENDING (content ready)
│       └── sanitary-system/
│           └── page.tsx             🚧 PENDING (content ready)
│
├── lib/content/products/            ← NEW: Consumer content layer
│   ├── types.ts                     ✅ Type definitions
│   ├── zero-marketing.ts            ✅ Zero content
│   ├── heirloom-marketing.ts        ✅ Heirloom content
│   ├── creait-marketing.ts          ✅ CREaiT content
│   ├── athletes-first-marketing.ts  ✅ Athletes-First content
│   ├── fubo-marketing.ts            ✅ Fubo content
│   └── sanitary-marketing.ts        ✅ 040 content
│
└── components/products/             ← NEW: Reusable components (optional)
    └── (future component library)
```

---

## Product Overview

### ✅ Phase 1 Complete: Consumer Products

**Zero** (`/products/zero`)
- **JTBD**: Turn email into actions, not homework
- **Category**: Consumer (B2C SaaS)
- **Status**: Live beta
- **Page**: Fully functional, ready for review
- **Route**: `/products/zero` (not linked in nav)

**Heirloom** (`/products/heirloom`)
- **JTBD**: Save every recipe, cook with confidence
- **Category**: Consumer (iOS app)
- **Status**: Live beta
- **Page**: Fully functional, ready for review
- **Route**: `/products/heirloom` (not linked in nav)

### 🚧 Phase 2 Pending: B2B + Partnership Products

**CREaiT** (`/products/creait`) - 010
- **JTBD**: Stop managing your CRM, let it manage your pipeline
- **Category**: B2B
- **Status**: Pre-kickoff
- **Content**: ✅ Complete (creait-marketing.ts)
- **Page**: 🚧 Needs to be built
- **Route**: `/products/creait` (planned)

**Athletes-First** (`/products/athletes-first`) - 020
- **JTBD**: Scale personal attention across 50+ athletes
- **Category**: Partnership/Complex Systems
- **Status**: Pre-kickoff
- **Content**: ✅ Complete (athletes-first-marketing.ts)
- **Page**: 🚧 Needs to be built
- **Route**: `/products/athletes-first` (planned)

**Fubo** (`/products/fubo`) - 030
- **JTBD**: Brand-consistent thumbnails for 200+ teams, generated in seconds
- **Category**: Partnership
- **Status**: Shipped
- **Content**: ✅ Complete (fubo-marketing.ts)
- **Page**: 🚧 Needs to be built
- **Route**: `/products/fubo` (planned)

**040** (`/products/sanitary-system`)
- **JTBD**: Hygienic pet care, zero daily mess
- **Category**: Physical Product
- **Status**: Pre-seed/Prototyping
- **Content**: ✅ Complete (sanitary-marketing.ts)
- **Page**: 🚧 Needs to be built
- **Route**: `/products/sanitary-system` (planned)

---

## Marketing Page Framework

### 8-Section Structure (Universal)

All marketing pages follow this JTBD-first structure:

1. **Hero** - Answer "What job am I hiring this for?" in 6-10 words
2. **The Problem** - 3 concrete scenarios (not generic pain points)
3. **How We Solve It** - Show solution in action (not feature lists)
4. **Proof It Works** - Outcomes and metrics (not technical specs)
5. **Primary CTA** - Low-friction conversion point
6. **Who It's For** - Self-selection criteria (personas + anti-personas)
7. **How It Works** - Light technical (progressive disclosure)
8. **Secondary CTAs** - Investor/partner pathways (non-intrusive)

### Content Balance by Category

**Consumer Products** (Zero, Heirloom):
- 60% Emotional (stress, pride, connection)
- 40% Functional (speed, accuracy, convenience)
- 800-1200 words

**B2B Products** (CREaiT):
- 40% Emotional (confidence, control, reputation)
- 60% Functional (time saved, revenue impact)
- 500-700 words

**Partnership Products** (Athletes-First):
- 50% Emotional (trust, scale, relationships)
- 50% Functional (automation, compliance, efficiency)
- 600-900 words

**Physical Products** (040):
- 50% Emotional (peace of mind, cleanliness)
- 50% Functional (mess reduction, convenience)
- 400-600 words, visual-heavy

---

## Key Design Decisions

### 1. Separate from Existing Routes

- **Consumer pages**: `/products/[slug]` (new)
- **Investor pages**: `/work/[slug]` (existing, preserved)
- **No conflicts**: Both can coexist, serve different audiences

### 2. Self-Contained & Not Deployed

- Pages exist but are NOT linked in navigation
- Can be accessed via direct URL for testing: `https://yoursite.com/products/zero`
- No risk of accidental public exposure until you're ready

### 3. Consistent Content Structure

- All content follows TypeScript interfaces in `types.ts`
- Easy to maintain, update, and extend
- Content lives in separate files, not hardcoded in pages

### 4. JTBD-First Messaging

- Every page starts with the job-to-be-done
- Problem → Solution → Proof → CTA narrative flow
- Consumer language, not technical jargon (until "How It Works" section)

---

## How to Review

### Test Zero Page

1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3000/products/zero`
3. Review:
   - Does the headline communicate the JTBD clearly?
   - Do the problem scenarios feel relatable?
   - Are the solution use cases easy to understand?
   - Is the CTA compelling and low-friction?

### Test Heirloom Page

1. Visit: `http://localhost:3000/products/heirloom`
2. Compare to Zero—should feel more visual, family-focused
3. Check for brand consistency (Heirloom cyan vs Zero gold)

### Review Content for Remaining Products

1. Open content files in `lib/content/products/`
2. Read through copy for CREaiT, Athletes-First, Fubo, 040
3. Verify JTBD messaging aligns with your vision
4. Suggest edits before pages are built

---

## Next Steps

### Option A: Deploy Zero + Heirloom Now

1. **Link in Navigation**
   - Add `/products/` section to main nav
   - Link Zero and Heirloom cards on homepage

2. **Update Work Section**
   - Change "Overview" button to link to `/products/[slug]`
   - Keep "Case Study" button linking to `/work/[slug]`

3. **Add Analytics**
   - Track page views, CTA clicks, form submissions
   - Set up conversion funnels

### Option B: Build Remaining Pages First

1. **Build pages** for CREaiT, Athletes-First, Fubo, 040
   - Use Zero/Heirloom as templates
   - Adjust styling per brand (colors, accent tones)

2. **Review all 6 together**
   - Ensure consistency across products
   - Validate JTBD messaging

3. **Deploy as a batch**
   - Launch all 6 simultaneously
   - Coordinate with any marketing campaigns

### Option C: Iterate on Framework

1. **Refine Zero/Heirloom based on feedback**
   - Adjust section order, copy length, CTA placement
   - Test with real users (not investors)

2. **Update framework document**
   - Incorporate learnings into template

3. **Apply refined framework to remaining products**

---

## Content Editing Guide

### To Update Zero Content

1. Open: `lib/content/products/zero-marketing.ts`
2. Edit the `zeroMarketingContent` object
3. Changes automatically reflect in `/products/zero` page
4. No need to touch page code

### To Change Section Order

1. Open: `app/(public)/products/zero/page.tsx`
2. Reorder the `<section>` blocks
3. All data still pulls from content file

### To Add New Product

1. Create: `lib/content/products/[slug]-marketing.ts`
2. Copy structure from existing content file
3. Build page: `app/(public)/products/[slug]/page.tsx`
4. Use Zero or Heirloom as template

---

## Quality Checklist

Before marking any page "ready for deployment":

### Content Quality
- [ ] Hero communicates JTBD in <10 words
- [ ] Problem scenarios use specific details (numbers, times, contexts)
- [ ] Solution shows product in use (not feature lists)
- [ ] Proof uses outcomes/metrics (not technical specs)
- [ ] No jargon in first 5 sections
- [ ] Tone is conversational, not corporate

### User Experience
- [ ] Primary CTA appears within first screen (no scrolling)
- [ ] Mobile responsive at 375px, 768px, 1440px
- [ ] Form has ≤3 fields
- [ ] Page loads in <3 seconds
- [ ] No auto-play audio/video

### Conversion Optimization
- [ ] Single primary CTA per section (avoid choice paralysis)
- [ ] CTA button text uses action verbs
- [ ] Trust signals present (beta count, testimonials, credibility)
- [ ] Self-selection criteria clear ("Built For" + "Not Right For")

### SEO & Analytics
- [ ] Page title = Product Name + JTBD
- [ ] Meta description <160 chars, includes CTA
- [ ] OG image set (1200x630px)
- [ ] Analytics events configured
- [ ] Internal links to /work/, /partnerships/, etc.

---

## Technical Notes

### Dependencies

All pages use existing Rationale design system:
- `ASCIIUnifiedGrid` for backgrounds
- `watercolorThemes` for color palettes
- `ButtonPrimary`, `ButtonSecondary` for CTAs
- Lucide icons for visual elements

No new dependencies required.

### Routing

Next.js App Router:
- `(public)` route group for public pages
- Each product gets its own directory
- `page.tsx` defines the route

### Type Safety

All content is typed via `ProductMarketingContent` interface:
- Enforces consistent structure
- Catches missing fields at compile time
- Enables autocomplete in editors

---

## Success Metrics

### Short-Term (Week 1-2)

- [ ] Can explain each product in one sentence after reading page
- [ ] 80%+ of test users correctly identify the JTBD
- [ ] CTA click-through rate >5% (if deployed publicly)

### Medium-Term (Month 1-3)

- [ ] Organic traffic to `/products/` pages
- [ ] Reduced "What does this do?" questions from prospects
- [ ] Higher conversion on beta signups / demo requests

### Long-Term (Quarter 1-2)

- [ ] `/products/` pages drive more conversions than `/work/` pages
- [ ] User feedback: "This is the clearest product explanation I've seen"
- [ ] Framework applied successfully to future products

---

## Questions or Issues?

### Common Questions

**Q: Can I edit content without touching code?**
A: Yes! All copy lives in `lib/content/products/[product]-marketing.ts`. Edit there, changes reflect automatically.

**Q: Will these pages conflict with existing routes?**
A: No. `/products/[slug]` is separate from `/work/[slug]`. Both can coexist.

**Q: How do I deploy just Zero first?**
A: Link `/products/zero` in your nav. Other pages remain accessible only via direct URL.

**Q: Can I customize the design per product?**
A: Yes. Each page (`page.tsx`) can have unique colors, layouts, and styles while keeping the 8-section structure.

**Q: What if I want to add a new section?**
A: Add the new section data to the content file, then add a corresponding `<section>` block in `page.tsx`.

---

## Appendix: JTBD Summary

### Jobs-to-be-Done for Each Product

**Zero**: When I have 50+ unread emails, I want to find urgent actions fast, so I can respond without reading everything.

**Heirloom**: When I find a recipe I want to try, I need a single place to save, organize, and access it—whether it's from Instagram, a text, or my mom's handwriting.

**CREaiT**: When I manage 200+ CRE contacts, I need daily prioritization and contextual deal insights so I don't lose deals to follow-up gaps.

**Athletes-First**: When I represent 50+ athletes, I need to scale personal attention without hiring 10 more staff so athletes feel supported at every stage.

**Fubo**: When I stream live sports across 200+ teams and 8 leagues, I need compelling, brand-consistent thumbnails generated at scale so viewers can discover the right content.

**040**: When I manage pet waste, I need a solution that's hygienic, mess-free, and doesn't require daily trips outside.

---

## Change Log

**2025-12-16** - Initial implementation
- Created marketing page framework
- Built Zero and Heirloom pages (complete)
- Created content files for all 6 products
- Documented structure and deployment strategy
- **UPDATE**: Changed 030 from "Rumi" to "Fubo" (AI thumbnail generation for live sports streaming)

---

**Ready to proceed when you are. Let me know which option you prefer (A, B, or C above) and we'll move forward!**
