# Deployment Checklist

**Pre-deployment validation and post-deployment monitoring guide**

Last Updated: December 17, 2025

---

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Deployment Process](#deployment-process)
- [Post-Deployment Validation](#post-deployment-validation)
- [Rollback Procedure](#rollback-procedure)
- [Monitoring](#monitoring)

---

## Pre-Deployment Checklist

### 1. Automated Testing (CRITICAL)

Run the comprehensive pre-deployment test suite:

```bash
./scripts/pre-deploy-test.sh
```

This runs:
- ✅ Node.js version check (≥20.x)
- ✅ Dependency installation check
- ✅ Environment variables validation
- ✅ TypeScript type checking
- ✅ ESLint code quality
- ✅ Unit tests (78 tests)
- ✅ Production build
- ✅ Bundle size check
- ✅ E2E tests (23 tests)
- ✅ Accessibility tests (17 tests, WCAG 2.1 AA)
- ✅ Security checks (no credential leaks)
- ✅ Firebase connection test

**Expected Result:** All checks passed (100% pass rate)

**If tests fail:**
- Review the log file: `pre-deploy-test-YYYYMMDD-HHMMSS.log`
- Fix issues before proceeding
- Re-run test suite

---

### 2. Manual Verification

#### Code Review
- [ ] All code changes reviewed and approved
- [ ] No console.log statements (use logger instead)
- [ ] No TODO comments left in critical paths
- [ ] No commented-out code blocks

#### Documentation
- [ ] README.md is up to date
- [ ] CHANGELOG updated with new changes (if applicable)
- [ ] API documentation reflects new routes

#### Git Status
- [ ] All changes committed
- [ ] Commit messages follow Conventional Commits
- [ ] No untracked files that should be tracked

```bash
git status
```

Expected: "nothing to commit, working tree clean" or only unimportant untracked files

#### Environment Variables

**Production environment variables set in Netlify:**

```bash
# Check Netlify env vars
netlify env:list
```

Required variables:
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] `FIREBASE_PROJECT_ID`
- [ ] `FIREBASE_CLIENT_EMAIL`
- [ ] `FIREBASE_PRIVATE_KEY`
- [ ] `RESEND_API_KEY`
- [ ] `NEXT_PUBLIC_SENTRY_DSN`
- [ ] `SENTRY_AUTH_TOKEN`
- [ ] `REPLICATE_API_KEY` (optional)

---

### 3. Security Verification

#### Credentials Check
- [ ] No `serviceAccountKey.json` in repository
- [ ] No `.env.local` committed
- [ ] No hardcoded API keys in code
- [ ] All secrets in environment variables only

```bash
# Search for potential credential leaks
git grep -E "(sk-proj-|ghp_|AIza|BEGIN PRIVATE KEY)" -- '*.ts' '*.tsx' '*.js'
```

Expected: No results (or only in .md documentation files)

#### Firebase Security Rules
- [ ] Firestore security rules deployed
- [ ] Firebase Auth enabled
- [ ] Only admin SDK can write to `users` collection

#### HTTPS & CORS
- [ ] Site uses HTTPS (Netlify automatic)
- [ ] CORS configured correctly for API routes
- [ ] Security headers configured (`netlify.toml`)

---

### 4. Performance Verification

#### Bundle Size
- [ ] Total bundle size < 500KB (before compression)
- [ ] No JavaScript files > 500KB
- [ ] Three.js lazy loaded (not in main bundle)

```bash
# Analyze bundle
npm run analyze
```

#### Image Optimization
- [ ] All images in WebP/AVIF format
- [ ] Images have `sizes` attribute for responsive loading
- [ ] Large images lazy loaded

#### Lighthouse Score (Local)
- [ ] Performance: 90+
- [ ] Accessibility: 100
- [ ] Best Practices: 100
- [ ] SEO: 90+

Run Lighthouse in Chrome DevTools on localhost before deploying.

---

### 5. Database & External Services

#### Firebase
- [ ] Firestore indexes created (if needed)
- [ ] Firebase Authentication enabled
- [ ] Custom claims working (owner, team, partner, investor, client)

#### Resend (Email)
- [ ] Resend API key valid
- [ ] Email templates tested
- [ ] Beta signup notification email working

#### Sentry
- [ ] Sentry project created
- [ ] DSN configured
- [ ] Test error captured successfully

---

## Deployment Process

### Option 1: Automatic Deployment (Recommended)

**Trigger:** Push to `main` branch

```bash
# Push to main (triggers Netlify auto-deploy)
git push origin main
```

**What happens:**
1. GitHub triggers Netlify build
2. Netlify runs: `npm run build`
3. Netlify deploys to production
4. Old deployment kept for instant rollback

**Monitor:** https://app.netlify.com/sites/rationaledesign/deploys

---

### Option 2: Manual Deployment

```bash
# Build locally
npm run build

# Deploy to Netlify
netlify deploy --prod

# Or use the Netlify CLI for more control
netlify deploy --prod --dir=.next
```

---

## Post-Deployment Validation

### Automated Smoke Tests

Run the smoke test suite immediately after deployment:

```bash
./scripts/post-deploy-smoke-test.sh
```

This tests:
- ✅ Homepage loads
- ✅ All critical pages accessible
- ✅ Authentication flow works
- ✅ API routes responding
- ✅ Beta signup form works
- ✅ No JavaScript errors

---

### Manual Smoke Tests (5 minutes)

#### 1. Public Pages
- [ ] Homepage loads: https://rationale.work
- [ ] Work page loads: https://rationale.work/work
- [ ] Contact page loads: https://rationale.work/contact
- [ ] Zero page loads: https://rationale.work/zero
- [ ] Heirloom page loads: https://rationale.work/work/heirloom

#### 2. Authentication Flow
- [ ] Login page loads: https://rationale.work/login
- [ ] Can log in with test account
- [ ] Redirects to correct portal based on role
- [ ] Session persists after refresh
- [ ] Logout works

#### 3. Protected Routes (RBAC)
- [ ] Owner can access `/owner`
- [ ] Team can access `/team`
- [ ] Investor can access `/investors`
- [ ] Partner can access `/partners`
- [ ] Unauthorized users get 403 or redirect

#### 4. Beta Signup
- [ ] Beta signup form appears on homepage
- [ ] Email validation works
- [ ] Form submission successful
- [ ] Confirmation message appears
- [ ] Admin notification email received

#### 5. Interactive Demos
- [ ] Zero Inbox demo loads
- [ ] Email classification works
- [ ] Heirloom demo loads
- [ ] Athletes First demo loads

---

### Performance Validation

#### Lighthouse (Production)

Run Lighthouse on production URL:
- [ ] Performance: 90+
- [ ] Accessibility: 100
- [ ] Best Practices: 100
- [ ] SEO: 90+

#### WebPageTest

Run WebPageTest: https://www.webpagetest.org/
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 4s
- [ ] Total Blocking Time < 300ms

#### Real User Monitoring

Check Sentry Performance:
- [ ] No major performance regressions
- [ ] Average page load time acceptable
- [ ] No long tasks blocking main thread

---

### Error Monitoring

#### Sentry Dashboard

Check Sentry: https://sentry.io/
- [ ] No new unhandled errors
- [ ] No authentication errors
- [ ] No database connection errors

#### Netlify Logs

Check Netlify Functions logs:
- [ ] No 500 errors
- [ ] API routes responding correctly
- [ ] No timeout errors

#### Browser Console

Check browser console on production:
- [ ] No JavaScript errors
- [ ] No failed network requests
- [ ] No CORS errors

---

### Database Verification

#### Firestore Console

Check Firebase Console: https://console.firebase.google.com/
- [ ] New beta signups appearing in `beta_signups` collection
- [ ] User profiles created correctly
- [ ] No failed writes

#### Data Integrity
- [ ] Test user profile exists
- [ ] Beta signups recorded correctly
- [ ] Timestamps are correct (not in the future/past)

---

## Rollback Procedure

If critical issues are found after deployment:

### Immediate Rollback (< 1 minute)

**Via Netlify Dashboard:**
1. Go to: https://app.netlify.com/sites/rationaledesign/deploys
2. Find the last working deployment
3. Click "Publish deploy"
4. Site reverts instantly

**Via CLI:**
```bash
# List recent deployments
netlify deploy:list

# Restore previous deployment
netlify deploy:create --restore <deploy-id>
```

### Git Revert (if Netlify rollback not available)

```bash
# Find the last working commit
git log --oneline -10

# Revert to that commit
git revert <commit-hash>

# Push (triggers new deploy)
git push origin main
```

### Post-Rollback
- [ ] Verify site is working
- [ ] Check Sentry for new errors
- [ ] Review what went wrong
- [ ] Create GitHub issue for the bug
- [ ] Fix locally before redeploying

---

## Monitoring

### First Hour After Deployment

**Check every 15 minutes:**
- [ ] Sentry: No new errors
- [ ] Netlify Analytics: Traffic normal
- [ ] Browser console: No errors
- [ ] Test critical user flows

### First 24 Hours

**Check every 4 hours:**
- [ ] Error rate in Sentry
- [ ] Performance metrics
- [ ] User feedback (if any)
- [ ] Beta signup rate

### Ongoing Monitoring

**Daily:**
- [ ] Sentry error trends
- [ ] Netlify build status
- [ ] Firebase usage

**Weekly:**
- [ ] Lighthouse scores
- [ ] Performance trends
- [ ] Bundle size changes

---

## Emergency Contacts

- **Site Down:** Immediate rollback via Netlify
- **Database Issues:** Check Firebase Console
- **Email Issues:** Check Resend dashboard
- **Error Spike:** Check Sentry dashboard

---

## Deployment Success Criteria

### All of these must be true:

- ✅ All automated tests pass (pre-deploy-test.sh)
- ✅ All smoke tests pass (post-deploy-smoke-test.sh)
- ✅ No new Sentry errors in first hour
- ✅ Lighthouse scores maintained (90+ performance)
- ✅ All critical user flows working
- ✅ No rollback needed in first 24 hours

---

## Quick Reference Commands

```bash
# Pre-deployment
./scripts/pre-deploy-test.sh

# Deploy
git push origin main

# Post-deployment
./scripts/post-deploy-smoke-test.sh

# Rollback (Netlify CLI)
netlify deploy:list
netlify deploy:create --restore <deploy-id>

# Check logs
netlify logs

# Check environment variables
netlify env:list
```

---

## Notes

- **Always** run pre-deployment tests before pushing to main
- **Never** push directly to main without testing
- **Monitor** Sentry for first hour after deployment
- **Keep** previous deployment for instant rollback
- **Document** any issues in GitHub issues

---

**Questions?** See [docs/setup/DEPLOYMENT.md](setup/DEPLOYMENT.md) or contact matt@rationale.work
