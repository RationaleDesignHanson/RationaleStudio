# Phase 8: Firebase Admin SDK Setup Instructions

## Overview

To enable authentication and protect the Owner, Investor, Partner, and Team portals, you need to configure the Firebase Admin SDK. This allows the server to verify user sessions securely.

**Time Required:** 5-10 minutes
**Difficulty:** Easy (just downloading a file and running a script)

---

## Step-by-Step Instructions

### 1. Download Service Account Key from Firebase Console

1. **Open Firebase Console:**
   - Go to: https://console.firebase.google.com/
   - Select your project: **zer0inbox**

2. **Navigate to Service Accounts:**
   - Click the gear icon (⚙️) next to "Project Overview"
   - Select **"Project settings"**
   - Click the **"Service accounts"** tab

3. **Generate New Private Key:**
   - Scroll down to "Firebase Admin SDK"
   - Click the button: **"Generate new private key"**
   - A dialog will appear warning you to keep this file secure
   - Click **"Generate key"**

4. **Download the JSON file:**
   - The file will download automatically (e.g., `zer0inbox-firebase-adminsdk-xxxxx.json`)
   - This file contains your Firebase Admin SDK credentials

### 2. Save the Service Account Key

1. **Rename and move the downloaded file:**
   ```bash
   # In your Downloads folder, rename the file
   mv ~/Downloads/zer0inbox-firebase-adminsdk-*.json ~/Downloads/serviceAccountKey.json

   # Move it to the project root
   mv ~/Downloads/serviceAccountKey.json /Users/matthanson/rationale-public/
   ```

   Or simply:
   - Rename the downloaded file to: `serviceAccountKey.json`
   - Move it to: `/Users/matthanson/rationale-public/`

2. **Verify the file is in the right place:**
   ```bash
   ls -la /Users/matthanson/rationale-public/serviceAccountKey.json
   ```

   You should see the file listed.

### 3. Run the Automated Setup Script

1. **Run the setup script:**
   ```bash
   cd /Users/matthanson/rationale-public
   ./scripts/setup-firebase-admin.sh
   ```

2. **Choose configuration method:**
   - The script will ask: "Choose configuration method: (1 or 2)"
   - **Enter 1** for development (uses JSON file path - simpler)
   - **Enter 2** for production-ready setup (extracts values into .env.local)

3. **The script will:**
   - Extract credentials from `serviceAccountKey.json`
   - Update your `.env.local` file
   - Confirm successful configuration

### 4. Restart Development Server

1. **Kill the current dev server** (if running):
   - Press `Ctrl+C` in the terminal running `npm run dev`

2. **Start the dev server again:**
   ```bash
   npm run dev
   ```

3. **Check for success message:**
   - Look for this in the terminal:
   ```
   [Firebase Admin] Successfully initialized
   ```

### 5. Test Authentication

1. **Open the login page:**
   - Go to: http://localhost:3000/login

2. **Try logging in:**
   - Use your Firebase account credentials
   - You should be redirected to the appropriate portal based on your role

3. **Test protected routes:**
   - Try accessing: http://localhost:3000/owner (if you're owner)
   - Try accessing: http://localhost:3000/team
   - You should either see the portal (if authenticated) or be redirected to login

---

## Troubleshooting

### "serviceAccountKey.json not found"
- ✅ Make sure you downloaded the file from Firebase Console
- ✅ Make sure you renamed it to `serviceAccountKey.json`
- ✅ Make sure it's in the project root: `/Users/matthanson/rationale-public/`

### "[Firebase Admin] Initialization error"
- ✅ Check that the JSON file is valid (not corrupted)
- ✅ Try re-downloading from Firebase Console
- ✅ Verify you selected the correct Firebase project (zer0inbox)

### "Session verification failed"
- ✅ Restart the dev server after configuring
- ✅ Clear browser cookies and try logging in again
- ✅ Check that Firebase project ID matches in both client and server configs

### Script says "permission denied"
- ✅ Make the script executable:
   ```bash
   chmod +x ./scripts/setup-firebase-admin.sh
   ```

---

## Security Notes

- ✅ `serviceAccountKey.json` is already in `.gitignore` - **never commit it**
- ✅ The file contains sensitive credentials - keep it secure
- ✅ For production deployment, use environment variables (Option 2)
- ✅ Only share these credentials with trusted team members

---

## What This Enables

Once configured, you'll be able to:

1. ✅ **Log in to protected portals** (Owner, Investor, Partner, Team)
2. ✅ **Session verification** - Securely verify user authentication on the server
3. ✅ **User management** - Create, update, and manage user roles via the Team Admin page
4. ✅ **Custom claims** - Assign roles (owner, team, partner, investor) to users
5. ✅ **Protected routes** - Middleware will block unauthorized access
6. ✅ **Production deployment** - Deploy to Netlify with secure authentication

---

## Next Steps After Setup

Once Firebase Admin SDK is configured:

1. **Test all four portals:**
   - `/owner` - Owner portal (gold accent)
   - `/investors` - Investor portal (blue accent)
   - `/partners` - Partner portal (green accent)
   - `/team` - Team portal (purple accent)

2. **Add team members:**
   - Go to `/team/admin`
   - Use "Add User" to create new team member accounts
   - Assign roles (team, partner, investor)

3. **Deploy to production:**
   - Set up environment variables in Netlify
   - Deploy and test authentication in production

---

## Direct Firebase Console Links

Quick links for your project:

- **Service Accounts:** https://console.firebase.google.com/project/zer0inbox/settings/serviceaccounts/adminsdk
- **Authentication Users:** https://console.firebase.google.com/project/zer0inbox/authentication/users
- **Project Settings:** https://console.firebase.google.com/project/zer0inbox/settings/general

---

## Need Help?

- See `FIREBASE_ADMIN_SETUP.md` for manual configuration instructions
- See `PHASE_4_COMPLETE.md` for detailed security documentation
- Check Firebase Admin SDK logs in the terminal for error messages
