# Baseline State Documentation

**Date:** January 2025  
**Version:** v1.0.0-baseline  
**Purpose:** Document current state before restructuring

---

## Route Structure

### Protected Routes (Require Authentication)

- `/owner/*` - Owner-only dashboard
- `/owner/heirloom/*` - Heirloom business dashboard (moved from `/heirloom`)
- `/team/*` - Team dashboard
- `/partners/*` - Partner portal
- `/investors/*` - Investor portal
- `/clients/*` - Client portal

### Public Routes

- `/` - Homepage
- `/work/*` - Case studies
- `/products/*` - Consumer product pages
- `/how-we-work` - Process page
- `/about` - About page
- `/contact` - Contact page

---

## Key Components

### Homepage (`/app/(public)/page.tsx`)
- Current positioning: "Your Product Design Company"
- Sections:
  - Hero
  - Current Focus (Zero, Heirloom, Pipeline)
  - Three Ways to Work Together
  - How We Ship Faster (VelocityProof)
  - Fit Filter

### Work Pages

#### Zero (`/app/(public)/work/zero/`)
- Main page: `page.tsx`
- Sub-pages:
  - `demo/` - Interactive demo
  - `overview/` - Overview
  - `architecture/` - Architecture details
  - `metrics/` - Metrics
  - `taxonomy/` - Taxonomy
  - `timeline/` - Timeline
  - `stats/` - Statistics
- Components: `components/` directory

#### Heirloom (`/app/(public)/work/heirloom/`)
- Main page: `page.tsx`
- Sub-pages:
  - `pitch/` - Pitch deck
  - `technical-architecture/` - Technical architecture
  - `design-system/` - Design system
  - `timeline-and-outcomes/` - Timeline and outcomes
  - `prototypes/` - Prototypes
- Components: `components/` directory

### Product Pages (`/app/(public)/products/`)
- `zero/` - Zero consumer page
- `heirloom/` - Heirloom consumer page
- `fubo/` - Fubo consumer page (to be renamed to thumby)

---

## Authentication System

See `docs/restructuring/AUTH_INTEGRATION.md` for full details.

**Key Points:**
- Firebase Authentication with session cookies
- 4-tier RBAC: owner, team, partner, investor, client
- Middleware protects routes at `/owner`, `/team`, `/partners`, `/investors`, `/clients`
- `/heirloom` route conflict resolved (dashboard moved to `/owner/heirloom`)

---

## Files to Archive (After Restructuring)

### Zero Sub-pages
- `/app/(public)/work/zero/demo/`
- `/app/(public)/work/zero/overview/`
- `/app/(public)/work/zero/architecture/`
- `/app/(public)/work/zero/metrics/`
- `/app/(public)/work/zero/taxonomy/`
- `/app/(public)/work/zero/timeline/`
- `/app/(public)/work/zero/stats/`

### Heirloom Sub-pages
- `/app/(public)/work/heirloom/pitch/`
- `/app/(public)/work/heirloom/technical-architecture/`
- `/app/(public)/work/heirloom/design-system/`
- `/app/(public)/work/heirloom/timeline-and-outcomes/`
- `/app/(public)/work/heirloom/prototypes/`

### Product Pages (After Move)
- `/app/(public)/products/zero/` (will move to `/app/(products)/zero/`)
- `/app/(public)/products/heirloom/` (will move to `/app/(products)/heirloom/`)
- `/app/(public)/products/fubo/` (will move to `/app/(products)/thumby/`)

---

## Current State Summary

- **Homepage:** Product studio positioning, multiple sections
- **Work Pages:** Fragmented into multiple sub-pages
- **Product Pages:** Under `/products/` route
- **Auth System:** Fully functional, route conflicts resolved
- **Ready for:** Restructuring per `rationale-cursor-prompts.md`

---

## Next Steps

1. Phase 1: Homepage redesign
2. Phase 2: Zero case study consolidation
3. Phase 3: Heirloom case study consolidation
4. Phase 4: Product landing page structure
5. Phase 5: How We Work revision
6. Phase 6: About page revision
7. Phase 7: Route cleanup

