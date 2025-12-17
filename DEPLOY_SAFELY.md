# Deploy Safely - Quick Start Guide

**Don't be nervous! Follow these steps for confident deployment.**

---

## Before You Deploy

### Step 1: Run Pre-Deployment Tests (5-10 minutes)

This runs **all** tests and validations automatically:

```bash
npm run predeploy
```

**What it checks:**
- ✅ Node.js version (≥20.x)
- ✅ Dependencies installed
- ✅ Environment variables set
- ✅ TypeScript compiles (no type errors)
- ✅ ESLint passes (code quality)
- ✅ Unit tests pass (78 tests)
- ✅ Production build successful
- ✅ Bundle size reasonable
- ✅ E2E tests pass (23 tests)
- ✅ Accessibility tests pass (17 tests, WCAG 2.1 AA)
- ✅ No credential leaks
- ✅ Firebase connection working

**Expected output:**
```
========================================
✓ ALL CHECKS PASSED
✓ READY FOR DEPLOYMENT
========================================

Next steps:
  1. Review the log: pre-deploy-test-20251217-143022.log
  2. Push to main: git push origin main
  3. Monitor Netlify deployment
  4. Run post-deployment validation
```

**If tests fail:**
- Review the log file (see output for filename)
- Fix the issues
- Re-run `npm run predeploy`
- Don't deploy until all tests pass

---

### Step 2: Review Checklist (2 minutes)

Open the checklist and verify manually:

```bash
open docs/DEPLOYMENT_CHECKLIST.md
```

Key things to check:
- [ ] All changes committed
- [ ] No untracked files that should be committed
- [ ] Environment variables set in Netlify
- [ ] No hardcoded credentials

---

## Deploying

### Deploy to Production

```bash
git push origin main
```

This automatically triggers Netlify to:
1. Pull latest code
2. Run `npm run build`
3. Deploy to production
4. Keep previous deployment for rollback

**Monitor deployment:**
https://app.netlify.com/sites/rationaledesign/deploys

---

## After You Deploy

### Step 3: Run Smoke Tests (2 minutes)

Immediately after deployment shows "Published":

```bash
npm run postdeploy
```

Or specify production URL:
```bash
npm run postdeploy https://rationale.work
```

**What it tests:**
- ✅ Homepage loads
- ✅ All critical pages accessible
- ✅ Product pages (Zero, Heirloom) work
- ✅ Authentication pages load
- ✅ Protected routes accessible
- ✅ API routes responding
- ✅ SSL certificate valid
- ✅ Page load time < 3s
- ✅ Static assets serving
- ✅ 404 page works

**Expected output:**
```
========================================
✓ ALL SMOKE TESTS PASSED
✓ DEPLOYMENT SUCCESSFUL
========================================

Next steps:
  1. Monitor Sentry for errors: https://sentry.io/
  2. Check Netlify analytics: https://app.netlify.com/
  3. Test critical user flows manually
  4. Monitor for first hour
```

---

### Step 4: Manual Verification (5 minutes)

Visit the live site and test:

1. **Homepage:** https://rationale.work
   - [ ] Loads without errors
   - [ ] Images display correctly
   - [ ] Beta signup form visible

2. **Work Page:** https://rationale.work/work
   - [ ] Project cards display
   - [ ] Links work

3. **Authentication:**
   - [ ] Can access login: https://rationale.work/login
   - [ ] Can log in with test account
   - [ ] Redirects to correct portal

4. **Beta Signup:**
   - [ ] Fill out form
   - [ ] Submit successfully
   - [ ] See confirmation message

5. **Browser Console:**
   - [ ] Open DevTools (F12)
   - [ ] No red errors in Console
   - [ ] No failed network requests

---

### Step 5: Monitor (First Hour)

**Check every 15 minutes for the first hour:**

1. **Sentry:** https://sentry.io/
   - Look for new errors
   - Check error rate

2. **Netlify:** https://app.netlify.com/sites/rationaledesign/deploys
   - Verify deployment successful
   - Check function logs

3. **Site Health:**
   - Visit key pages
   - Test critical flows

---

## If Something Goes Wrong

### Immediate Rollback (< 1 minute)

**Option 1: Netlify Dashboard (Easiest)**
1. Go to: https://app.netlify.com/sites/rationaledesign/deploys
2. Find the last working deployment (before current one)
3. Click "Publish deploy"
4. Site reverts instantly ✅

**Option 2: CLI**
```bash
netlify deploy:list
netlify deploy:create --restore <previous-deploy-id>
```

**After rollback:**
- [ ] Verify site is working
- [ ] Check what went wrong in logs
- [ ] Fix locally
- [ ] Re-run pre-deployment tests
- [ ] Deploy again

---

## Confidence Checklist

Before pushing to production, you should have:

- ✅ **Pre-deployment tests passed** (`npm run predeploy`)
- ✅ **Manual checklist reviewed**
- ✅ **Environment variables confirmed**
- ✅ **All changes committed**
- ✅ **Netlify access ready** (for monitoring)
- ✅ **Rollback plan understood**

After deployment, you should have:

- ✅ **Smoke tests passed** (`npm run postdeploy`)
- ✅ **Manual verification done** (5 key checks)
- ✅ **Sentry checked** (no new errors)
- ✅ **Monitoring active** (first hour)

---

## Quick Reference

### Commands

```bash
# Before deploying
npm run predeploy          # Run all pre-deployment tests
open docs/DEPLOYMENT_CHECKLIST.md  # Review checklist

# Deploy
git push origin main       # Auto-deploy via Netlify

# After deploying
npm run postdeploy         # Run smoke tests on production
npm run postdeploy https://rationale.work  # Explicit URL

# Rollback (if needed)
netlify deploy:list        # See all deployments
netlify deploy:create --restore <id>  # Rollback
```

### URLs

- **Production Site:** https://rationale.work
- **Netlify Dashboard:** https://app.netlify.com/sites/rationaledesign/deploys
- **Sentry Dashboard:** https://sentry.io/
- **Firebase Console:** https://console.firebase.google.com/project/zer0inbox

---

## Test Results Summary (Current)

| Test Suite | Count | Status |
|------------|-------|--------|
| Unit Tests | 78 | ✅ Passing |
| E2E Tests | 23 | ✅ Passing |
| Accessibility Tests | 17 | ✅ Passing (0 WCAG violations) |
| **Total** | **118** | ✅ **All Passing** |

**Code Quality:**
- TypeScript: 95% type safety (27 any types)
- ESLint: No errors
- Bundle Size: Optimized (Three.js lazy loaded)
- Images: Optimized (69.7MB → 5.35MB)

**Your codebase is in excellent shape!** 🎉

---

## Why You Can Deploy Confidently

1. **118 Comprehensive Tests** - All critical paths validated
2. **Automated Safety Checks** - Pre-deployment tests catch issues early
3. **Zero WCAG Violations** - Accessibility guaranteed
4. **Instant Rollback** - Can revert in <1 minute if needed
5. **Production Smoke Tests** - Validates live site immediately
6. **Error Monitoring** - Sentry tracks any production issues
7. **Previous 20+ Commits** - Proven stability

**You've done the work. The tests prove it. Deploy with confidence!** 💪

---

## Still Nervous?

### Lowest Risk Approach

1. **Deploy at a low-traffic time** (late evening/early morning)
2. **Watch the first 30 minutes closely**
3. **Have rollback URL ready:** https://app.netlify.com/sites/rationaledesign/deploys
4. **Keep Sentry dashboard open:** https://sentry.io/

### What Could Go Wrong (and solutions)

| Issue | Probability | Fix Time |
|-------|-------------|----------|
| Environment variable missing | Low (tested in predeploy) | 5 min (add in Netlify) |
| Build fails | Very Low (tested locally) | Rollback instant |
| Page loads slowly | Very Low (tested) | Monitor, optimize later |
| JavaScript error | Very Low (118 tests) | Rollback instant |
| Firebase connection issues | Very Low (tested in predeploy) | Check credentials |

**Worst case: Instant rollback. Best case: Smooth deployment!**

---

**Questions?** See [docs/DEPLOYMENT_CHECKLIST.md](docs/DEPLOYMENT_CHECKLIST.md) for full details.

**Ready to deploy?** Run `npm run predeploy` and let's go! 🚀
