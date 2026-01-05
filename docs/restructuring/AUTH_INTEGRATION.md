# Authentication Integration Guide

**Last Updated:** January 2025  
**Status:** Active

## Overview

This document describes how the Firebase authentication system integrates with the website restructuring. It ensures protected routes remain secure while allowing public routes to be created.

---

## Protected Routes

The following routes require authentication via `middleware.ts`:

| Route | Required Role(s) | Purpose |
|-------|------------------|---------|
| `/owner/*` | `owner` | Owner-only dashboard and tools |
| `/owner/heirloom/*` | `owner` | Heirloom business dashboard (moved from `/heirloom`) |
| `/team/*` | `team`, `owner` | Team dashboard and admin tools |
| `/partners/*` | `partner`, `team`, `owner` | Partner collaboration materials |
| `/investors/*` | `investor`, `owner` | Investor portal (team does NOT have access) |
| `/clients/*` | `client`, `team`, `owner` | Client portal |

**Note:** `/owner/heirloom` is protected by the `/owner` route matcher, so it doesn't need a separate entry in `protectedRoutes`.

---

## Public Routes

The following routes are public and do NOT require authentication:

| Route | Purpose |
|-------|--------|
| `/` | Homepage |
| `/work/*` | Case studies (portfolio) |
| `/zero`, `/heirloom`, `/thumby`, `/nimbus` | Product landing pages |
| `/how-we-work`, `/about`, `/contact` | Public information pages |

**Critical:** Product routes (`/zero`, `/heirloom`, `/thumby`, `/nimbus`) are NOT in the middleware matcher, ensuring they remain public.

---

## Middleware Configuration

### Protected Routes Definition

```typescript
const protectedRoutes: Record<string, string[]> = {
  '/owner': ['owner'],
  '/team': ['team', 'owner'],
  '/partners': ['partner', 'team', 'owner'],
  '/investors': ['investor', 'owner'],
  '/clients': ['client', 'team', 'owner'],
  // Note: /owner/heirloom is protected by /owner route above
};
```

### Matcher Configuration

```typescript
matcher: [
  '/owner/:path*',      // Covers /owner/* and /owner/heirloom/*
  '/team/:path*',
  '/partners/:path*',
  '/investors/:path*',
  '/clients/:path*',
  // Product routes (/zero, /heirloom, /thumby, /nimbus) are NOT here = public
],
```

---

## Route Conflict Resolution

### `/heirloom` Route Conflict (Resolved)

**Problem:** 
- `/heirloom` was protected (owner-only dashboard)
- Restructuring plan requires `/heirloom` to be public (product page)

**Solution:**
- Moved protected dashboard: `/app/heirloom/` → `/app/owner/heirloom/`
- Updated all internal links from `/heirloom` to `/owner/heirloom`
- Removed `/heirloom` from middleware protected routes
- `/heirloom` route now available for public product page

**Result:**
- `/owner/heirloom` = Protected dashboard (owner only)
- `/heirloom` = Public product page (no auth required)
- `/work/heirloom` = Public case study (no auth required)

---

## Adding New Protected Routes

To add a new protected route:

1. **Add to `protectedRoutes` object** in `middleware.ts`:
   ```typescript
   const protectedRoutes: Record<string, string[]> = {
     // ... existing routes
     '/new-route': ['required-role'],
   };
   ```

2. **Add to matcher array**:
   ```typescript
   matcher: [
     // ... existing matchers
     '/new-route/:path*',
   ],
   ```

3. **Test:**
   - Verify route requires authentication
   - Verify unauthorized users are redirected to `/login`
   - Verify authorized users can access the route

---

## Adding New Public Routes

To add a new public route:

1. **Ensure route is NOT in middleware matcher**
2. **Ensure route is NOT in `protectedRoutes` object**
3. **Test:**
   - Verify route loads without authentication
   - Verify no redirect to `/login`

---

## Testing Authentication

### Test Protected Routes

```bash
# Test without authentication (should redirect to /login)
curl -I http://localhost:3000/owner/heirloom

# Test with authentication (should return 200)
# Use browser with logged-in session
```

### Test Public Routes

```bash
# Test public route (should return 200)
curl -I http://localhost:3000/heirloom
curl -I http://localhost:3000/work/heirloom
```

---

## Common Issues

### Issue: Public Route Redirecting to Login

**Cause:** Route is in middleware matcher or `protectedRoutes`

**Solution:** Remove route from matcher and `protectedRoutes`

### Issue: Protected Route Not Requiring Auth

**Cause:** Route not in middleware matcher

**Solution:** Add route to matcher array

### Issue: Route Conflict

**Cause:** Same route path used for both protected and public routes

**Solution:** Rename one route (e.g., `/heirloom` → `/owner/heirloom`)

---

## Security Notes

1. **Middleware runs on Edge Runtime** - Cannot use Firebase Admin SDK directly
2. **Session cookies** - HTTP-only, secure, SameSite=Lax
3. **Role verification** - Done server-side in API routes, not middleware
4. **Middleware checks** - Only verifies session cookie presence, not role
5. **Actual authorization** - Handled by page/API route components

---

## Related Files

- `middleware.ts` - Route protection logic
- `lib/auth/firebase.ts` - Client-side auth
- `lib/auth/firebase-admin.ts` - Server-side auth verification
- `app/api/auth/session/route.ts` - Session cookie management
- `app/api/auth/verify/route.ts` - Session verification API

---

## Questions?

See:
- `docs/AUTH_SETUP.md` - Firebase setup guide
- `docs/phases/PHASE_1_1_COMPLETE.md` - Auth system implementation details
- `docs/ARCHITECTURE.md` - Overall architecture

