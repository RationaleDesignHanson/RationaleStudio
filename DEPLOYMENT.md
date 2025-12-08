# Deployment Guide

Complete guide for deploying Rationale to production on Netlify with Firebase.

## Prerequisites

- Netlify account with site configured
- Firebase project (Production)
- Node.js 22+
- Access to Firebase Console and Netlify Dashboard

---

## Phase 1: Firebase Production Setup

### 1.1 Create Production Firebase Project

```bash
# Go to Firebase Console: https://console.firebase.google.com
# 1. Create new project: "rationale-production"
# 2. Enable Google Analytics (optional)
# 3. Choose "Default Account for Firebase"
```

### 1.2 Enable Required Services

In Firebase Console:

1. **Authentication**
   - Go to Authentication > Sign-in method
   - Enable Email/Password provider
   - Add authorized domain: `rationale.work`

2. **Firestore Database**
   - Go to Firestore Database > Create database
   - Start in **production mode**
   - Choose location: `us-central1` (or closest to users)

3. **Storage** (if needed for file uploads)
   - Go to Storage > Get started
   - Start in **production mode**

### 1.3 Configure Security Rules

**Firestore Rules** (`firestore.rules`):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Pitch access tokens (read-only for authenticated)
    match /pitch-access/{pitchId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.role == 'owner';
    }

    // User profiles (users can read/write own profile)
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Outbound tracking (owner-only)
    match /outbound-leads/{leadId} {
      allow read, write: if request.auth != null && request.auth.token.role == 'owner';
    }
  }
}
```

**Storage Rules** (if using Storage):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.role == 'owner';
    }
  }
}
```

### 1.4 Generate Service Account Key

1. Go to Firebase Console > Project Settings > Service Accounts
2. Click "Generate new private key"
3. Save as `serviceAccountKey.json` (DO NOT COMMIT)
4. Extract these values for Netlify:
   - `project_id`
   - `client_email`
   - `private_key` (keep `\n` characters intact)

---

## Phase 2: Netlify Environment Variables

### 2.1 Navigate to Netlify Dashboard

```bash
# Go to: https://app.netlify.com/sites/[your-site]/settings/env
# Or via Netlify CLI:
netlify open:admin
```

### 2.2 Required Environment Variables

Add these in Netlify Dashboard > Site settings > Environment variables:

#### Firebase Client (Public)
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=rationale-production.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=rationale-production
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=rationale-production.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

#### Firebase Admin (Secret - Production only)
```
FIREBASE_PROJECT_ID=rationale-production
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@rationale-production.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMII...\n-----END PRIVATE KEY-----\n"
```

**CRITICAL**: When adding `FIREBASE_PRIVATE_KEY`:
- Keep quotes around the value
- Keep `\n` characters (do NOT replace with actual newlines)
- Select "Sensitive variable" option in Netlify

#### Pitch System
```
PITCH_TOKEN_SECRET=[generate-32-char-secret]
NEXT_PUBLIC_BASE_URL=https://rationale.work
```

Generate secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Optional Integrations
```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_ORG=your-organization

FIGMA_ACCESS_TOKEN=figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FIGMA_FILE_KEY=your-design-system-file-key

NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LINEAR_API_KEY=lin_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 2.3 Set Build Environment Variables

In `netlify.toml` (already configured):
```toml
[build.environment]
  NODE_VERSION = "22"
  NODE_OPTIONS = "--max-old-space-size=4096"
```

---

## Phase 3: Deployment Configuration

### 3.1 Verify netlify.toml

Current configuration in `/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "22"
  NODE_OPTIONS = "--max-old-space-size=4096"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  node_bundler = "esbuild"

[[functions."*"]]
  timeout = 26

# Cache optimization
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 3.2 Deploy to Production

#### Option A: Automatic Deployment (Recommended)
```bash
# Push to main branch (auto-deploys if Netlify is connected to repo)
git add .
git commit -m "Production deployment configuration"
git push origin main
```

#### Option B: Manual Deployment via CLI
```bash
# Install Netlify CLI if needed
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod
```

### 3.3 Verify Deployment

1. Check build logs in Netlify Dashboard
2. Visit deployed site: `https://rationale.work`
3. Test authentication: Try logging in
4. Test protected routes: Visit `/owners/dashboard`
5. Test pitch system: Create and access a test pitch

---

## Phase 4: Post-Deployment Verification

### 4.1 Functionality Checklist

- [ ] Homepage loads correctly
- [ ] All public pages accessible
- [ ] Firebase authentication works
- [ ] Protected routes require login
- [ ] Owner dashboard accessible to authenticated owners
- [ ] Pitch system generates secure links
- [ ] Zero beta signup form submits
- [ ] All images and assets load
- [ ] No console errors

### 4.2 Performance Verification

```bash
# Run Lighthouse audit
npm run audit

# Or use Chrome DevTools:
# 1. Open site in Chrome
# 2. DevTools > Lighthouse tab
# 3. Run audit for Performance, Accessibility, Best Practices, SEO
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### 4.3 Security Verification

- [ ] All API routes require authentication where needed
- [ ] Service account key NOT exposed in client
- [ ] Firestore rules properly restrict access
- [ ] HTTPS enforced (Netlify handles this)
- [ ] No sensitive data in console logs
- [ ] CORS configured properly

---

## Phase 5: Monitoring & Error Tracking

### 5.1 Netlify Analytics (Built-in)

Enable in Netlify Dashboard:
1. Go to Site > Analytics
2. Enable Netlify Analytics ($9/month)
3. View real-time traffic, performance, errors

### 5.2 Firebase Crashlytics (Optional)

For production error tracking:
```bash
# In Firebase Console:
# 1. Go to Crashlytics
# 2. Enable Crashlytics for web
# 3. Add SDK to next.config.js
```

### 5.3 Custom Error Logging

Already configured in `/app/error.tsx`:
- Catches React errors
- Logs to console (upgrade to error service in production)
- Shows user-friendly error UI

---

## Phase 6: Performance Optimization

### 6.1 Next.js Build Optimization

Already configured in `next.config.js`:
```javascript
// Image optimization
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [...],
}

// Compression
compress: true,

// React strict mode
reactStrictMode: true,
```

### 6.2 Asset Optimization

Automatically handled by Netlify:
- Image CDN with automatic format selection
- Brotli compression for text assets
- HTTP/2 server push for critical assets

### 6.3 Caching Strategy

Configured in `netlify.toml`:
- Static assets: 1 year cache
- Next.js pages: Revalidation via ISR
- API routes: No cache (dynamic)

---

## Phase 7: Rollback Plan

### 7.1 Netlify Rollback

```bash
# Via Netlify Dashboard:
# 1. Go to Deploys
# 2. Find previous working deploy
# 3. Click "Publish deploy"

# Via CLI:
netlify rollback
```

### 7.2 Database Rollback

Firebase Firestore supports point-in-time recovery:
1. Contact Firebase support if needed
2. Or maintain backups via Cloud Functions

---

## Common Issues & Solutions

### Issue: Build Fails with TypeScript Errors

**Solution**:
```bash
# Run TypeScript check locally first
npx tsc --noEmit

# Fix errors before deploying
```

### Issue: Firebase Admin SDK Errors

**Solution**:
- Verify `FIREBASE_PRIVATE_KEY` has `\n` characters intact
- Check `FIREBASE_CLIENT_EMAIL` matches service account
- Ensure Firestore is enabled in Firebase Console

### Issue: Environment Variables Not Working

**Solution**:
- Check variable names match exactly (case-sensitive)
- For secret variables, ensure "Sensitive" option is checked
- Redeploy after adding new variables

### Issue: 404 on Dynamic Routes

**Solution**:
- Ensure `@netlify/plugin-nextjs` is in `netlify.toml`
- Check Next.js routing configuration
- Verify `.next` directory is published

---

## Maintenance

### Regular Tasks

**Weekly**:
- Check Netlify build logs for warnings
- Monitor Firebase quota usage
- Review error logs

**Monthly**:
- Run `npm audit` and update dependencies
- Check Lighthouse scores
- Review Firebase security rules

**Quarterly**:
- Rotate Firebase service account keys
- Update Node.js version if needed
- Performance optimization review

---

## Support

For deployment issues:
- Netlify Support: https://answers.netlify.com
- Firebase Support: https://firebase.google.com/support
- Next.js Docs: https://nextjs.org/docs

For Rationale-specific issues:
- Check internal documentation
- Review GitHub issues
- Contact development team
