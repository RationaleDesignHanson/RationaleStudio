# Firebase Admin SDK Setup Guide

## Automated Setup (Recommended)

Run the setup script to configure Firebase Admin SDK automatically:

```bash
./scripts/setup-firebase-admin.sh
```

The script will:
1. Check if you have `serviceAccountKey.json`
2. Extract credentials automatically
3. Update `.env.local` with the configuration
4. Provide next steps for testing

If you don't have the service account key yet, the script will guide you to download it from Firebase Console.

---

## Manual Setup

### Step 1: Get Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **zer0inbox**
3. **Project Settings** (gear icon) → **Service Accounts**
4. Click **"Generate New Private Key"**
5. Download the JSON file

### Step 2: Configure Environment Variables

**Option A: Use JSON File Path (Recommended for Development)**

1. Save the JSON file as `serviceAccountKey.json` in project root
2. Create `.env.local`:
   ```env
   FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
   ```
3. Add to `.gitignore`:
   ```
   serviceAccountKey.json
   .env.local
   ```

**Option B: Use Individual Variables (Recommended for Production)**

Open the JSON file and extract these values:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG...\n-----END PRIVATE KEY-----\n"
```

⚠️ **Important:** Keep the `\n` characters in FIREBASE_PRIVATE_KEY exactly as shown.

### Step 3: Verify Setup

1. Restart dev server:
   ```bash
   npm run dev
   ```

2. Check terminal for:
   ```
   [Firebase Admin] Successfully initialized
   ```

3. Test login at http://localhost:3000/login

---

## Production Deployment

### Netlify

```bash
netlify env:set FIREBASE_PROJECT_ID your-project-id
netlify env:set FIREBASE_CLIENT_EMAIL firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
netlify env:set FIREBASE_PRIVATE_KEY "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` (paste entire key with \n preserved)

---

## Troubleshooting

### Error: "Firebase Admin SDK credentials not found"
- ✅ Check `.env.local` exists
- ✅ Verify environment variable names are correct
- ✅ Restart dev server after adding variables

### Error: "Invalid private key"
- ✅ Ensure `\n` characters are preserved in FIREBASE_PRIVATE_KEY
- ✅ Wrap private key in double quotes
- ✅ Check for extra spaces or line breaks

### Error: "Session verification failed"
- ✅ Check Firebase project ID matches
- ✅ Verify service account has correct permissions
- ✅ Ensure ID token is being sent correctly from client

---

## Security Checklist

- [ ] Service account JSON is NOT committed to git
- [ ] `.env.local` is in `.gitignore`
- [ ] Production environment variables are set
- [ ] Service account has minimal required permissions
- [ ] Private key is stored securely

---

## What This Fixes

**Before:** Session tokens used insecure base64 encoding. Anyone could forge tokens.

**After:** Session tokens are Firebase-signed JWTs. Cannot be forged without Firebase private keys.

**Impact:** Blocks production deployment until configured, but eliminates critical security vulnerability.

---

## Need Help?

See `/PHASE_4_COMPLETE.md` for detailed documentation and security analysis.
