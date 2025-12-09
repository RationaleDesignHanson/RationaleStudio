# Phase 2: Route Consolidation Plan

**Generated**: 2025-12-09
**Status**: Ready for Implementation

## Executive Summary

Analysis of 152 pages reveals significant route duplication across investor/client portals. While there are 0 exact duplicate routes, there are **30 semantic duplicates** serving similar content through different paths.

### Impact
- **30 routes** to consolidate
- **8 redirect rules** to implement
- **Protected routes** require authentication integration

---

## 1. Investor Routes Consolidation

### Problem
Three overlapping namespaces serving investor content:
- `/invest/*` (5 pages) - Redirect pages
- `/investment/*` (2 pages) - Redirect pages
- `/investors/*` (7 pages) - **CANONICAL** destination

### Consolidation Strategy

**Keep**: `/investors/*` as canonical investor namespace
**Remove**: `/invest/*` and `/investment/*`

| Old Route | New Route | Action | Notes |
|-----------|-----------|--------|-------|
| `/invest` | `/investors` | Permanent redirect (301) | Main investor page |
| `/invest/amplify` | `/investors/amplify` | Permanent redirect (301) | Already exists |
| `/invest/atlas` | `/investors/atlas` | Permanent redirect (301) | Already exists |
| `/invest/studio` | `/investors/studio` | Permanent redirect (301) | Already exists |
| `/invest/studio/data-room` | `/investors/studio/data-room` | Move content | Unique page |
| `/invest/zero` | `/investors/zero` | Permanent redirect (301) | Already exists |
| `/investment` | `/investors` | Permanent redirect (301) | Same as /invest |
| `/investment/zero` | `/investors/zero` | Permanent redirect (301) | Already exists |

**Implementation**:
1. Create `/investors/studio/data-room` with content from `/invest/studio/data-room`
2. Add Next.js redirects in `next.config.js`
3. Delete `/invest/*` and `/investment/*` pages
4. Update internal links

---

## 2. Client Portal Investor Content

### Problem
Investor content duplicated inside `/clients/*` namespace:
- `/clients/invest/*` (6 pages)
- `/clients/investment/*` (2 pages)
- `/clients/investors/*` (2 pages)

### Consolidation Strategy

**Decision**: These may serve a different purpose (client-specific investment opportunities vs public investor pages).

**Recommended Action**:
1. Review with stakeholder: Are these meant for different audiences?
2. If duplicate: Redirect to `/investors/*`
3. If unique: Keep but rename for clarity (e.g., `/clients/portfolio-investments`)

**Pending User Decision** - Marked as "Review Required" in checkpoint

---

## 3. Dashboard Access Routes

### Problem
Three different dashboard access patterns:
- `/client/*/dashboard` (3 pages) - Public, unprotected
- `/clients/*/dashboard` (1 page) - Protected
- `/clients/dashboard-access` (1 page) - Protected

### Consolidation Strategy

**Keep**: `/clients/dashboard-access` as single entry point
**Decision on project dashboards**: Review with stakeholder

| Old Route | Recommended Action | Notes |
|-----------|-------------------|-------|
| `/client/athletes-first/dashboard` | Archive or protect | Currently public, may be test |
| `/client/creait/dashboard` | Archive or protect | Currently public, may be test |
| `/client/zero/dashboard` | Archive or protect | Currently public, may be test |
| `/clients/zero/dashboard` | Keep | Protected, active |
| `/clients/dashboard-access` | Keep as main entry | Protected, active |

**Pending User Decision** - Marked as "Review Required" in checkpoint

---

## 4. Additional Duplicates

### /about Routes
- `/clients/about` - Client portal about page
- `/(public)/about` - Public about page

**Action**: Keep both (different contexts)

### /contact Routes
- `/clients/contact` - Client portal contact
- `/(public)/contact` - Public contact

**Action**: Keep both (different contexts)

### /home Routes
- `/clients/home` - Client portal home
- `/(public)/page.tsx` (renders as `/`) - Public home

**Action**: Keep both (different contexts)

### /partnerships Routes
- `/clients/partnerships` - Client portal partnerships
- `/(public)/partnerships` - Public partnerships

**Action**: Keep both (different contexts)

---

## 5. Implementation Plan

### Step 1: Create New Content (if needed)
- [ ] Move `/invest/studio/data-room` → `/investors/studio/data-room`

### Step 2: Add Redirects
Add to `next.config.js`:
```javascript
async redirects() {
  return [
    // Investor route consolidation
    { source: '/invest', destination: '/investors', permanent: true },
    { source: '/invest/amplify', destination: '/investors/amplify', permanent: true },
    { source: '/invest/atlas', destination: '/investors/atlas', permanent: true },
    { source: '/invest/studio', destination: '/investors/studio', permanent: true },
    { source: '/invest/studio/data-room', destination: '/investors/studio/data-room', permanent: true },
    { source: '/invest/zero', destination: '/investors/zero', permanent: true },
    { source: '/investment', destination: '/investors', permanent: true },
    { source: '/investment/zero', destination: '/investors/zero', permanent: true },
  ];
}
```

### Step 3: Update Internal Links
Search and replace across codebase:
- `/invest` → `/investors`
- `/investment` → `/investors`

### Step 4: Archive Old Pages
Move to `_archive/phase-2-route-consolidation/`:
- `app/invest/**/*`
- `app/investment/**/*`

### Step 5: Test
- [ ] Verify all redirects work
- [ ] Check authentication on protected routes
- [ ] Run broken link checker
- [ ] Test from external bookmarks/links

---

## 6. Review Required

Before implementing, need user decision on:

1. **Client Portal Investor Content** (`/clients/invest/*`, `/clients/investment/*`, `/clients/investors/*`)
   - Same as public investor pages? → Redirect to `/investors/*`
   - Different content for clients? → Keep separate

2. **Public Dashboard Routes** (`/client/*/dashboard`)
   - Old test pages? → Archive
   - Active functionality? → Protect and keep

---

## 7. Expected Results

### Before
- 152 total pages
- 30 semantic duplicates
- 3 investor namespaces
- Confusing navigation

### After
- ~130 total pages (22 archived/consolidated)
- 0 semantic duplicates
- 1 canonical investor namespace (`/investors/*`)
- Clear, predictable routing
- 8 permanent redirects for SEO/bookmarks

---

## Next Steps

1. ✅ Create this consolidation plan
2. 🔄 Create Visual Checkpoint 1 HTML
3. ⏸️  Get user approval on "Review Required" items
4. ⏸️  Implement consolidation
5. ⏸️  Test and verify
