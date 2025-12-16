# Rationale Website Transformation Plan
## v1.0 → v2.0 World-Class Codebase

**Status:** In Progress
**Started:** December 16, 2025
**Target Completion:** February 2026 (9-11 weeks)

---

## 🎯 Mission

Transform the Rationale website from a functional MVP into a world-class, performant, maintainable codebase while preserving all existing functionality and aesthetics.

---

## 📊 Success Metrics

| Metric | Current (v1.0) | Target (v2.0) | Progress |
|--------|---------------|---------------|----------|
| **Security Score** | 3/10 | 10/10 | ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ |
| **Test Coverage** | 0% | 80% | ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ |
| **Type Safety** | 82/100 | 95/100 | ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ |
| **Design Token Adoption** | 40% | 85% | ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ |
| **Hardcoded Colors** | 151 files | <20 files | ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ |
| **Bundle Size** | Baseline | -15% | ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ |
| **Performance Score** | TBD | 90+ | ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ |
| **Component Variants** | 16+ cards | 8 cards | ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ |
| **WCAG Compliance** | AA- | AA+ | ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ |
| **Diagram Files** | 132 (28 dupes) | 104 | ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ |

---

## 🚨 PHASE 0: CRITICAL SECURITY FIXES (1 Day)

**Status:** Not Started
**Priority:** P0 (MUST DO FIRST)
**Estimated Effort:** 8 hours

### Tasks

#### 1. Remove `serviceAccountKey.json` ⬜️
**File:** `/Users/matthanson/rationale-public/serviceAccountKey.json`
**Issue:** Firebase Admin credentials committed to repository
**Steps:**
1. Backup file locally (outside git)
2. Delete from filesystem: `rm serviceAccountKey.json`
3. Verify environment variables are configured:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
4. Test app still works with env vars
5. Remove from git history using BFG Repo-Cleaner
6. **Action Required:** Rotate credentials in Firebase Console

**Verification:**
```bash
# Should return nothing
git log --all --full-history -- "*serviceAccountKey.json"
```

#### 2. Remove `.env.local` from git history ⬜️
**File:** `/Users/matthanson/rationale-public/.env.local`
**Issue:** Contains real credentials (already in .gitignore but previously committed)
**Steps:**
1. Verify current .env.local is in .gitignore ✓
2. Remove from git history
3. Verify removal

**Verification:**
```bash
# Should return nothing
git log --all --full-history -- "*.env.local"
```

#### 3. Update Next.js (Security Patch) ⬜️
**Current:** 16.0.8
**Target:** 16.0.10+
**Vulnerabilities:**
- Server Actions Source Code Exposure (HIGH)
- Denial of Service with Server Components (HIGH)

**Steps:**
```bash
npm update next
npm install
npm run build  # Test build works
```

**Verification:**
```bash
npm list next  # Should show 16.0.10 or higher
```

#### 4. Add Pre-commit Hooks ⬜️
**Purpose:** Prevent future credential leaks
**Steps:**
1. Install husky: `npm install --save-dev husky`
2. Create `.husky/pre-commit` hook
3. Add git-secrets or credential scanning
4. Test with dummy credential file

**Files to create:**
- `.husky/pre-commit`
- `.husky/pre-push` (optional)

---

## 🏗️ PHASE 1: ARCHITECTURE & TESTING (2 Weeks)

**Status:** Not Started
**Estimated Effort:** 70 hours

### 1.1 Route Consolidation ⬜️

**Issue:** 9 duplicate `/zero` routes, 3 `/invest*` patterns, duplicate `/ventures`

**Current State:**
```
/zero → 9 different locations
/invest, /investment, /investors → Same content
/ventures + /clients/ventures → Duplicates
```

**Target State:**
```
/zero → Single canonical route
/investors → Single route (others redirect)
/ventures → Single route (client route redirects)
```

**Files Affected:**
- `app/zero/*/page.tsx` (multiple)
- `app/invest*/page.tsx`
- `app/ventures/page.tsx`
- `app/clients/ventures/page.tsx`
- `next.config.mjs` (update redirects)

**Steps:**
1. Audit all `/zero` routes, choose canonical
2. Move content to canonical route
3. Add redirects in `next.config.mjs`
4. Update internal links
5. Test all redirects work

**Verification:**
```bash
# Should show single route
find app -name "page.tsx" -path "*/zero/*"
```

### 1.2 Eliminate Hardcoded Colors ⬜️

**Issue:** 151 files use `#FFD700` and other hex colors

**Target:** Replace with design tokens (`bg-terminal-gold`, etc.)

**Top Offenders:**
- `components/zero/*` (25 files)
- `components/athletes-first/*` (18 files)
- `components/presentation/*` (15 files)
- `components/sanitary-waste-system/diagrams/*` (21 files)

**Steps:**
1. Create find/replace script for common colors
2. Create data visualization color palette
3. Run automated replacement
4. Manual review of edge cases
5. Test visual regression (Percy)

**Verification:**
```bash
# Should return <20 files
grep -r "#FFD700\|#FFE34D\|#E5C100" components/ app/ --include="*.tsx" | wc -l
```

### 1.3 API Route Testing ⬜️

**Current:** 0% test coverage
**Target:** 80% coverage for all API routes

**Setup:**
1. Install Vitest: `npm install -D vitest @vitest/ui`
2. Install MSW: `npm install -D msw` (API mocking)
3. Create `vitest.config.ts`
4. Create test structure: `tests/integration/api/`

**API Routes to Test (13 total):**
- `/api/auth/verify` ⬜️
- `/api/auth/session` ⬜️
- `/api/beta/signup` ⬜️
- `/api/pitch/create` ⬜️
- `/api/pitch/validate` ⬜️
- `/api/zero-sequence/classify` ⬜️
- `/api/zero-sequence/extract-entities` ⬜️
- `/api/fubo/generate` ⬜️
- Others (5 more routes)

**Test Cases per Route:**
- ✓ Success response
- ✓ Validation errors (400)
- ✓ Authentication errors (401)
- ✓ Database errors (500)
- ✓ Rate limiting (if applicable)

### 1.4 Error Monitoring Setup ⬜️

**Tool:** Sentry for Next.js

**Steps:**
1. Install: `npm install @sentry/nextjs`
2. Run setup wizard: `npx @sentry/wizard -i nextjs`
3. Configure DSN in environment variables
4. Create `app/error.tsx` (global error boundary)
5. Create `app/global-error.tsx`
6. Update existing ErrorBoundary to report to Sentry
7. Test error capture in development

**Files to Create/Modify:**
- `app/error.tsx` (new)
- `app/global-error.tsx` (new)
- `components/layout/ErrorBoundary.tsx` (update)
- `sentry.client.config.js` (auto-generated)
- `sentry.server.config.js` (auto-generated)

**Verification:**
- Trigger test error
- Check Sentry dashboard for captured error

---

## 📱 PHASE 1.5: INFOGRAPHICS & MOBILE POLISH (1 Week)

**Status:** Not Started
**Estimated Effort:** 42 hours

### Current State
- **132 diagram components** across 7 folders
- **28 separate mobile versions** (Desktop + Mobile duplicates)
- Inconsistent responsive patterns
- Touch targets < 44px in some diagrams

### 1.5.1 Consolidate Diagram Patterns ⬜️

**Create:** `components/diagrams/ResponsiveDiagram.tsx`

**Pattern:**
```tsx
<ResponsiveDiagram
  desktop={<DesktopContent />}
  mobile={<MobileContent />}
  breakpoint="md"
/>
```

**Migration Target:** 28 files
- Athletes First diagrams (8 pairs)
- CreaIT diagrams (7 pairs)
- Others (13 pairs)

**Result:** 132 files → 104 files (28 fewer files to maintain)

### 1.5.2 Fix Touch Targets ⬜️

**WCAG Requirement:** 44×44px minimum

**Files to Audit:**
- `components/athletes-first/demos/*`
- `components/zero/ActionSheet.tsx`
- All diagram accordion expansions
- Interactive SVG elements

**Steps:**
1. Audit all interactive diagram elements
2. Add padding to increase hit areas
3. Test on real devices (iPhone, Android)
4. Add Playwright tests for touch target sizes

### 1.5.3 Mobile Presentation Viewer ⬜️

**File:** `components/presentation/PresentationViewer.tsx`

**Improvements:**
- Add swipe gestures for slides
- Improve mobile navigation arrows
- Keyboard navigation (arrow keys)
- Announce slide changes to screen readers

**Dependencies:**
```bash
npm install react-swipeable
```

### 1.5.4 SVG Optimization ⬜️

**Issues:**
- Fixed width/height instead of viewBox
- Text too small on mobile
- Large file sizes

**Steps:**
1. Add `viewBox` to all SVG diagrams
2. Use relative font sizes (`1em` instead of `16px`)
3. Run SVGO optimization
4. Test on mobile viewports

**Tools:**
```bash
npm install -D svgo
npx svgo --folder components/*/diagrams
```

### 1.5.5 Responsive Token Migration ⬜️

**Current:** Manual responsive classes in diagrams
```tsx
<div className="p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6">
```

**Target:** Use design tokens
```tsx
<div className={cn(RESPONSIVE_PADDING.lg, RESPONSIVE_GAP.md)}>
```

**Files:** ~50 diagram components need migration

---

## ⚡ PHASE 2: PERFORMANCE & CODE QUALITY (2 Weeks)

**Status:** Not Started
**Estimated Effort:** 86 hours

### 2.1 Image Optimization ⬜️

**Current:** 35MB+ of unoptimized PNG/JPG images

**Script exists:** `scripts/optimize-images.mjs`

**Steps:**
1. Run optimization script
2. Convert to WebP/AVIF (60% size reduction)
3. Replace `<img>` with Next.js `<Image>` component
4. Add responsive `sizes` attribute
5. Implement lazy loading

**Verification:**
```bash
# Check image sizes
du -sh public/images/

# Audit img tags (should be minimal)
grep -r "<img" components/ app/ --include="*.tsx" | wc -l
```

### 2.2 Bundle Size Reduction ⬜️

**Current Issues:**
- Three.js loaded on every page (300KB+)
- All components loaded upfront

**Steps:**
1. Lazy load Three.js components
2. Route-based code splitting
3. Dynamic imports for demos

**Target:** 15% bundle size reduction

### 2.3 TypeScript Quality ⬜️

**Current:** 81 files use `any` type

**Priority Files:**
- `lib/pitch/security.ts` (lines 71, 85, 241, 268, 288)
- `hooks/useFirestore.ts` (lines 53, 57, 99, 103)
- `lib/zero-sequence/api.ts` (line 166)
- `components/athletes-first/demos/RecruitAIDemo.tsx` (line 65)

**Create:** Firestore type utilities
```typescript
// lib/firestore/types.ts
export type FirestoreTimestamp = Date | Timestamp;
export function timestampToDate(ts: FirestoreTimestamp): Date
```

**Enable Stricter Compiler Flags:**
```json
{
  "noUncheckedIndexedAccess": true,
  "noImplicitReturns": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

### 2.4 Component Consolidation ⬜️

**Card Migration:**
- KitCard → BaseCard
- FeaturedWorkCard → BaseCard
- InteractiveCard → BaseCard
- MaterialCard → BaseCard
- CheckpointCard → BaseCard
- ExecutiveCard → BaseCard

**Result:** 16+ card variants → 8 standardized variants

**Button Consolidation:**
- Add `ButtonTerminalGold` variant
- Migrate 50+ inline button implementations

---

## 🧪 PHASE 3: COMPREHENSIVE TESTING (2 Weeks)

**Status:** Not Started
**Estimated Effort:** 85 hours

### 3.1 Unit Test Coverage ⬜️

**Target:** 70% coverage of `lib/` directory

**Priority Files:**
- `lib/pitch/security.ts`
- `lib/pitch/analytics.ts`
- `lib/auth/firebase.ts`
- `lib/auth/firebase-admin.ts`
- All utilities in `lib/utils/`

**Target:** 50+ unit tests

### 3.2 Integration Testing ⬜️

**Form Flows:**
- Beta signup (success, validation, errors)
- Pitch creation
- Admin operations

**External Services:**
- Supabase (mocked)
- Resend (mocked)
- Replicate (mocked)

**Target:** 20+ integration tests

### 3.3 E2E Testing ⬜️

**Critical User Journeys:**
- Owner login → access /owner/* pages
- Team login → access /team/* pages
- Partner login → access /partners/* pages
- Investor login → access /investors/* pages
- Client login → access /clients/* pages

**Test RBAC:**
- Client cannot access /owner/* (403)
- Investor cannot access /team/* (403)
- Etc.

**Target:** 15+ E2E tests

### 3.4 Accessibility Testing ⬜️

**Install:** `@axe-core/playwright`

**Audit:**
- All public pages (100% coverage)
- Keyboard navigation
- Screen reader announcements
- Color contrast
- Touch targets

**Fix 12 Critical WCAG Violations:**
1. Missing form labels
2. Button vs Link semantics
3. Color contrast issues (Terminal Gold)
4. Focus indicators on custom controls
5. Heading hierarchy skips
6. Icon button aria-labels
7. Modal focus traps
8. Touch target sizes
9. Reduced motion support
10. Alt text on images
11. ARIA attributes on diagrams
12. Landmark regions

---

## 🏗️ PHASE 4: ARCHITECTURE CLEANUP (1-3 Weeks)

**Status:** Not Started
**Estimated Effort:** 46-126 hours (depends on CMS decision)

### 4.1 Database Consolidation ⬜️

**Decision:** Keep Firebase, migrate Supabase table

**Current State:**
- Firebase: User auth, profiles, projects, pitches, analytics
- Supabase: `beta_signups` table only (5 references)

**Migration Steps:**
1. Create `beta_signups` Firestore collection
2. Export data from Supabase
3. Import to Firestore
4. Update API route (`/api/beta/signup`)
5. Test signup flow
6. Remove Supabase dependencies

**Verification:**
```bash
# Should have no Supabase imports
grep -r "supabase" lib/ app/ components/ --include="*.ts" --include="*.tsx"
```

### 4.2 Logging Consolidation ⬜️

**Current:** 2,071 `console.log/error/warn` statements

**Create:** `lib/utils/logger.ts`

**Replace:**
```typescript
// Old
console.log('User logged in', { uid });

// New
logger.info('User logged in', { uid });
```

**Steps:**
1. Create logger utility with sanitization
2. Global find/replace
3. Add ESLint rule: `"no-console": "error"`

### 4.3 Content Management ⬜️

**Option A: Consolidation Only** (8 hours)
- Remove `-v2` version drift
- Consolidate 53 content files
- Standardize structure

**Option B: Headless CMS** (40 hours)
- Migrate to Sanity or Contentful
- Enable non-technical content editing
- Add content versioning

**Decision:** TBD (recommend Option A for v2.0, Option B for future)

### 4.4 CI/CD Quality Gates ⬜️

**Current:** Only visual regression tests in GitHub Actions

**Add:**
- Type checking: `tsc --noEmit`
- Linting: `npm run lint`
- Unit tests: `npm run test:unit`
- Integration tests: `npm run test:integration`
- Coverage threshold: Fail if < 70%
- Performance budgets (Lighthouse CI)
- Bundle size monitoring

**Update:** `.github/workflows/visual-regression.yml`

---

## 📚 PHASE 5: DOCUMENTATION (1 Week)

**Status:** Not Started
**Estimated Effort:** 30 hours

### 5.1 Developer Onboarding ⬜️

**Create:** `docs/SETUP.md`

**Contents:**
1. Prerequisites (Node.js, Firebase account)
2. Clone repository
3. Install dependencies
4. Configure environment variables
5. Start development server
6. Verify setup

### 5.2 Architecture Documentation ⬜️

**Create:** `docs/ARCHITECTURE.md`

**Contents:**
- System overview diagram
- Authentication flow
- Database schema
- API routes
- Component structure
- Design system

### 5.3 Testing Guide ⬜️

**Create:** `docs/TESTING.md`

**Contents:**
- Running tests
- Writing unit tests
- Writing E2E tests
- Mocking strategies
- Coverage requirements

### 5.4 Contributing Guide ⬜️

**Create:** `CONTRIBUTING.md`

**Contents:**
- Code style guide
- Git workflow
- PR requirements
- Testing requirements
- Design token usage

---

## 📈 Progress Tracking

**Update this section after each phase completion**

### Completed Phases
- None yet

### In Progress
- Phase 0: Security Fixes

### Next Up
- Phase 1: Architecture & Testing

---

## 🔄 Rollback Plan

If any phase breaks functionality:

1. **Immediate Rollback:**
   ```bash
   git log --oneline -20  # Find last working commit
   git revert <commit-hash>
   git push origin main
   ```

2. **Netlify Rollback:**
   - Go to Netlify dashboard
   - Deploys tab
   - Find last working deploy
   - Click "Publish deploy"

3. **Verify:**
   - Test critical user flows
   - Check authentication works
   - Verify public pages load

**Recovery Time:** <5 minutes

---

## 📅 Timeline

**Start Date:** December 16, 2025

| Phase | Duration | Start | End | Status |
|-------|----------|-------|-----|--------|
| Phase 0 | 1 day | Dec 16 | Dec 16 | Not Started |
| Phase 1 | 2 weeks | Dec 17 | Dec 30 | Not Started |
| Phase 1.5 | 1 week | Dec 31 | Jan 6 | Not Started |
| Phase 2 | 2 weeks | Jan 7 | Jan 20 | Not Started |
| Phase 3 | 2 weeks | Jan 21 | Feb 3 | Not Started |
| Phase 4 | 1-3 weeks | Feb 4 | Feb 24 | Not Started |
| Phase 5 | 1 week | Feb 25 | Feb 28 | Not Started |

**Target Completion:** February 28, 2026 (11 weeks)

---

## 🎯 Key Principles

Throughout this transformation, we maintain:

✅ **Zero Functionality Changes** - Everything works exactly as before
✅ **Zero Visual Changes** - Same design, same aesthetic
✅ **Zero Breaking Changes** - All URLs redirect properly
✅ **Incremental Progress** - Small commits, frequent deploys
✅ **Continuous Testing** - Test before and after each change
✅ **Reversible Changes** - Every change can be rolled back

---

## 📞 Support

**Questions or Issues?**
- Review this plan
- Check `docs/` directory for specific guides
- Review git commit history for recent changes
- Check Sentry for production errors (once set up)

---

**Last Updated:** December 16, 2025
**Version:** 1.0
**Status:** In Progress - Phase 0
