# Authentication Setup Guide

## Overview

Secure 4-tier RBAC authentication system using Firebase Authentication.

### Access Tiers

1. **Owner** (`owner`) - Matt only
   - Access: Everything including `/owner` publishing tools
   - Dashboard: `/owner`

2. **Team** (`team`) - Internal team members
   - Access: All content + admin tools (no owner section)
   - Dashboard: `/team`

3. **Partner** (`partner`) - Active collaboration partners
   - Access: Partnership materials, pitch decks, timelines
   - Dashboard: `/partners`

4. **Investor** (`investor`) - Portfolio investors
   - Access: Investment opportunities, product overviews
   - Dashboard: `/investors`

---

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project: "rationale-auth" (or your preferred name)
3. Enable Google Analytics (optional)

### 2. Enable Authentication

1. In Firebase Console → Authentication → Sign-in method
2. Enable **Email/Password** authentication
3. Save

### 3. Enable Firestore

1. In Firebase Console → Firestore Database
2. Click "Create database"
3. Start in **production mode**
4. Choose location (us-central1 recommended)

### 4. Set Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - only authenticated users can read their own profile
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false; // Only admins can create/update users
    }

    // Audit logs collection - only admins can write
    match /audit_logs/{logId} {
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['owner', 'team'];
      allow write: if false; // System writes only
    }
  }
}
```

### 5. Get Firebase Config

1. In Firebase Console → Project Settings → General
2. Scroll to "Your apps" section
3. Click "Web" icon to add web app
4. Copy configuration values
5. Add to `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## Creating Users

### Using Firebase Console (Manual)

1. **Create Auth User**
   - Firebase Console → Authentication → Users
   - Click "Add user"
   - Enter email and password
   - Copy the UID

2. **Create User Profile in Firestore**
   - Firebase Console → Firestore Database
   - Create collection: `users`
   - Add document with the UID as document ID
   - Fields:
     ```json
     {
       "uid": "firebase_uid_here",
       "email": "user@example.com",
       "role": "investor",
       "name": "User Name",
       "createdAt": 1234567890000,
       "lastLogin": 0
     }
     ```

### Role Values

- `"owner"` - Matt only (full access)
- `"team"` - Internal team (full access except owner section)
- `"partner"` - Active partners (collaboration materials)
- `"investor"` - Investors (portfolio view)

### Example Users Setup

**Owner (Matt):**
```json
{
  "uid": "matt_firebase_uid",
  "email": "matt@rationale.design",
  "role": "owner",
  "name": "Matt Hanson",
  "createdAt": 1733702400000,
  "lastLogin": 0
}
```

**Investor:**
```json
{
  "uid": "investor_firebase_uid",
  "email": "investor@example.com",
  "role": "investor",
  "name": "Jane Investor",
  "createdAt": 1733702400000,
  "lastLogin": 0
}
```

**Partner:**
```json
{
  "uid": "partner_firebase_uid",
  "email": "partner@company.com",
  "role": "partner",
  "name": "Partner Name",
  "createdAt": 1733702400000,
  "lastLogin": 0
}
```

---

## Testing Authentication

### 1. Start Development Server

```bash
npm run dev
```

### 2. Navigate to Login

Go to: `http://localhost:3000/login`

### 3. Sign In

- Enter email and password
- Should redirect to appropriate dashboard based on role

### 4. Test Route Protection

Try accessing:
- `/owner` - Should redirect if not owner
- `/team` - Should redirect if not team or owner
- `/partners` - Should redirect if not partner, team, or owner
- `/investors` - Should redirect if not authenticated

### 5. Verify Session Cookie

- Open browser DevTools → Application → Cookies
- Should see `session` cookie (HTTP-only)
- Cookie should persist across page reloads

---

## Migration from Old Auth

### Step 1: Create Users in Firebase

For each credential in old system, create Firebase user:

**Old Credentials:**
- Global: `claracharliecolette` / `123456` → Create as Owner
- A1: `A1` / `halloffame` → Create as Partner (Athletes First)
- CREAIT: `CREAIT` / `realestate` → Create as Partner (Creait)
- ZERO: `ZERO` / `123456` → Create as Investor

**New Firebase Users:**
```
matt@rationale.design → role: owner
athletesfirst@rationale.design → role: partner
creait@rationale.design → role: partner
zero.investor@rationale.design → role: investor
```

### Step 2: Notify Users

Send email with new credentials:
- New email address
- Temporary password
- Link to login page
- Instructions to change password

### Step 3: Remove Old Auth

Once all users migrated:
1. Delete `/app/clients/login/page.tsx` (old insecure login)
2. Update any links to `/clients/login` → `/login`
3. Remove session storage checks from client components

---

## Security Best Practices

### Password Management

1. **Enforce strong passwords** in Firebase Console:
   - Authentication → Settings → Password policy
   - Enable "Require uppercase letters, numbers, and symbols"

2. **Enable password reset**:
   - Users can reset via Firebase Authentication UI
   - Or implement custom reset flow

### Session Management

1. **Cookies are HTTP-only**: JavaScript cannot access session tokens
2. **Secure flag in production**: HTTPS only
3. **7-day expiration**: Sessions expire after 1 week
4. **SameSite=Lax**: CSRF protection

### Audit Logging

Implement audit logs for sensitive actions:
- User logins (tracked automatically in `lastLogin`)
- Content access (implement in middleware)
- Admin actions (implement in admin tools)

Store in Firestore collection: `audit_logs`

### Environment Variables

1. **Never commit** `.env.local` to git
2. **Use different projects** for dev/staging/production
3. **Rotate Firebase API keys** periodically
4. **Restrict API key usage** in Google Cloud Console

---

## Troubleshooting

### "User profile not found"

- Check Firestore: User document exists with correct UID
- Verify role field is one of: `owner`, `team`, `partner`, `investor`

### "Authentication failed"

- Check Firebase Console → Authentication for user
- Verify email and password are correct
- Check browser console for detailed error

### Middleware redirect loop

- Check session cookie is being set correctly
- Verify middleware `getUserRoleFromSession` is working
- Check browser cookies in DevTools

### Can't access protected route

- Verify user role in Firestore
- Check role hierarchy in middleware (owner > team > partner > investor)
- Ensure session cookie exists and is valid

---

## Next Steps

1. ✅ Firebase project created
2. ✅ Authentication enabled
3. ✅ Firestore enabled with security rules
4. ✅ Environment variables configured
5. ⏳ Create first user (owner - Matt)
6. ⏳ Test login and route protection
7. ⏳ Create investor/partner/team users as needed
8. ⏳ Migrate from old authentication system
9. ⏳ Implement audit logging
10. ⏳ Set up password reset flow

---

## Contact

For assistance with auth setup, contact Matt Hanson.
