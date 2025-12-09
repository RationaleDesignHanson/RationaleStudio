# Beta Signup System - Setup & Configuration Guide

## Overview

The beta signup system is configured for **internal testing first** (5-10 users per app), then can scale to public beta later. This matches your Phase 1 testing strategy where you manually add users to internal TestFlight groups.

## Current Status

✅ **Completed:**
- Database schema created (`/supabase/migrations/create_beta_signups.sql`)
- Email templates created (Zero and Heirloom)
- API route built (`/app/api/beta/signup/route.ts`)
- UI components created (BetaSignupButton, BetaSignupModal)
- Beta buttons added to both work pages
- RESEND_API_KEY added to `.env.local`

⏳ **Remaining Setup:**
1. Run Supabase migration
2. Add TestFlight URLs to API route
3. Configure Resend sender domain
4. Adjust strategy for internal-only beta

---

## Step 1: Run Supabase Migration

### Option A: Via Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New query**
4. Copy/paste the SQL from `/supabase/migrations/create_beta_signups.sql`
5. Click **Run**

### Option B: Via CLI (if linked)
```bash
npx supabase link
npx supabase db push
```

---

## Step 2: Configure TestFlight URLs

You need to get your TestFlight join codes and update the API route.

### Get TestFlight Join Codes:
1. Go to **App Store Connect** → **TestFlight**
2. For each app (Zero and Heirloom):
   - Click on the app
   - Go to **External Testing** (or create internal group for Phase 1)
   - Copy the **Public Link** or **Internal Group Link**
   - Format: `https://testflight.apple.com/join/XXXXXXXX`

### Update API Route:
Edit `/app/api/beta/signup/route.ts` line 8-11:

```typescript
const TESTFLIGHT_URLS = {
  zero: 'https://testflight.apple.com/join/YOUR_ACTUAL_ZERO_CODE',
  heirloom: 'https://testflight.apple.com/join/YOUR_ACTUAL_HEIRLOOM_CODE',
}
```

---

## Step 3: Configure Resend Sender Domain

### Option A: Verify beta@rationale.work (Recommended)
1. Go to **Resend Dashboard** → **Domains**
2. Add `rationale.work` if not already added
3. Add required DNS records (SPF, DKIM, etc.)
4. Wait for verification (~10 minutes)
5. Test sending from `beta@rationale.work`

### Option B: Use Resend's Testing Domain
For testing only, Resend provides `onboarding@resend.dev`:

Update these files:
- `/lib/resend/templates/zero-beta.tsx` line 68
- `/lib/resend/templates/heirloom-beta.tsx` line 68
- `/app/api/beta/signup/route.ts` line 72

Change:
```typescript
from: 'Rationale <beta@rationale.work>',
```
To:
```typescript
from: 'Rationale <onboarding@resend.dev>',
```

---

## Step 4: Adjust Strategy for Internal-Only Beta (Phase 1)

### Current Situation
Both Zero and Heirloom are in **Phase 1: Internal Testing** with 5-10 users.

From your beta plans:
- **Zero**: "Phase 1: Current Testers (5-10 users, Week 1)" - Focus on critical bugs
- **Heirloom**: "Phase 1: Internal Testing (3-5 days)" - Developer + 2-3 trusted friends

### Recommended Approach for Phase 1

**Option 1: Direct Invite Only (No Website Signup)**
- Don't enable website beta buttons yet
- Manually invite 5-10 people via TestFlight internal groups
- Send them the TestFlight link + testing instructions directly

**Option 2: Website Signup with Manual Review**
- Enable website beta buttons
- Collect email signups via the website
- **Manually review** signups in Supabase dashboard
- **Manually add** selected testers to TestFlight internal group
- Send welcome email **manually** with TestFlight link + testing instructions

**Option 3: Hybrid Approach (Recommended for You)**
- Enable website beta buttons to capture interest
- Collect signups in database
- View signups in Supabase dashboard regularly
- For Phase 1: Only invite first 5-10 signups to internal TestFlight group
- For Phase 2 (Weeks 5-8): Invite next batch to external TestFlight group
- For Phase 3: Open public TestFlight link to all signups

### Implementation for Option 3 (Recommended)

1. **Enable website buttons** (already done!)
2. **Monitor signups** in Supabase:
   ```sql
   SELECT * FROM beta_signups
   WHERE app_name = 'zero'
   ORDER BY signed_up_at DESC;
   ```
3. **Add first 5-10 to internal TestFlight group:**
   - App Store Connect → TestFlight → Internal Testing
   - Add testers by email (the emails from your signup database)
4. **They'll receive TestFlight invite from Apple**
5. **Send follow-up email with testing instructions:**
   - Use the content from your testing instruction files
   - `/Users/matthanson/Zer0_Inbox/TESTFLIGHT_TESTING_NOTE.md`
   - `/Users/matthanson/Heirloom/HeriloomBetaTests/TESTFLIGHT_INSTRUCTIONS.txt`

### Disable Auto-Email for Internal Phase (Optional)

If you want to **prevent automatic welcome emails** during Phase 1 and only send manual invites:

Comment out the email sending code in `/app/api/beta/signup/route.ts` lines 63-89:

```typescript
// TEMPORARILY DISABLED FOR PHASE 1 - MANUAL INVITES ONLY
/*
try {
  const testflightUrl = TESTFLIGHT_URLS[appName]
  // ... rest of email sending code
} catch (emailError) {
  // ...
}
*/

// Just save the signup and return success
return NextResponse.json({
  success: true,
  message: 'Thanks for your interest! We\'ll email you a TestFlight invite soon.',
  signupId: signup.id,
})
```

Then you manually:
1. Check Supabase for new signups
2. Add them to TestFlight internal group
3. Send personalized testing instructions via email

---

## Step 5: Query Signups from Supabase

### View All Signups
```sql
SELECT * FROM beta_signups ORDER BY signed_up_at DESC;
```

### View Zero Signups
```sql
SELECT * FROM beta_signups
WHERE app_name = 'zero'
ORDER BY signed_up_at DESC;
```

### View Heirloom Signups
```sql
SELECT * FROM beta_signups
WHERE app_name = 'heirloom'
ORDER BY signed_up_at DESC;
```

### Mark as Invited
```sql
UPDATE beta_signups
SET email_sent = true, email_sent_at = NOW()
WHERE email = 'user@example.com' AND app_name = 'zero';
```

---

## Phase Transition Plan

### Phase 1 (Now - Internal Testing, 5-10 users)
- Collect signups via website
- Manually invite first 5-10 to **Internal TestFlight group**
- Send personalized testing instructions
- Focus: Critical bugs, core functionality

### Phase 2 (Weeks 5-8 - Closed Beta, 20-30 users)
- Invite next batch from signup list to **External TestFlight group**
- Can enable automated welcome emails
- Send TestFlight link + testing instructions via email template
- Focus: UX feedback, edge cases

### Phase 3 (Weeks 9+ - Public Beta, 100+ users)
- Open public TestFlight link
- Fully automated: signup → email with TestFlight link
- Scale to 100+ beta users
- Focus: Product-market fit validation

---

## Testing the Signup Flow

### Test on Localhost
1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/work/zero` or `/work/heirloom`
3. Click "Join Beta on TestFlight" button
4. Enter email address
5. Check Supabase dashboard for new row
6. Check email inbox for welcome message (if auto-email enabled)

### Test on Production
1. Deploy to Netlify/Vercel
2. Visit production URL
3. Test signup flow end-to-end

---

## Email Template Testing

You can preview the email templates:

### Zero Beta Email Preview
```bash
npm install -g @react-email/cli
cd lib/resend/templates
npx react-email preview zero-beta.tsx
```

### Heirloom Beta Email Preview
```bash
npx react-email preview heirloom-beta.tsx
```

---

## Monitoring & Analytics

### Track Signups
- Supabase dashboard → Table Editor → `beta_signups`
- Track signup sources: `hero_cta`, `footer_cta`, etc.
- Monitor email sent status

### Track Conversions
- Signup → TestFlight invite → App install → Active user
- Can add tracking fields to database:
  - `testflight_invited_at`
  - `app_installed_at`
  - `first_active_at`

---

## Security Considerations

### Environment Variables
- ✅ `RESEND_API_KEY` stored in `.env.local` (not committed to git)
- ✅ Supabase connection uses environment variables
- ✅ RLS policies prevent unauthorized access

### Rate Limiting (Future Enhancement)
Consider adding rate limiting to prevent abuse:
- Limit signups per IP address (5 per hour)
- Limit signups per email domain (10 per hour)
- Use Vercel's rate limiting or Upstash

---

## Cost Estimates

### Resend Pricing
- Free tier: 3,000 emails/month
- Your Phase 1: ~10-20 emails (well within free tier)
- Your Phase 2: ~50-100 emails (well within free tier)
- Your Phase 3: ~300 emails (still within free tier)

### Supabase Pricing
- Free tier: 500MB database, 50,000 monthly active users
- Beta signups table: ~1KB per row
- 1,000 signups = ~1MB (well within free tier)

---

## Troubleshooting

### "RESEND_API_KEY not set" Error
- Check `.env.local` exists and contains: `RESEND_API_KEY=re_Mnz4aSaJ_2JK9JpNqjLyD5zBytHv6nhHY`
- Restart dev server after adding environment variables

### Email Not Sending
- Verify Resend API key is valid
- Check Resend dashboard → Logs for error messages
- Verify sender domain is verified
- Try using `onboarding@resend.dev` for testing

### Database Insert Failing
- Check Supabase connection
- Verify table exists (run migration)
- Check RLS policies allow inserts from `anon` role

### TestFlight Link Not Working
- Verify link format: `https://testflight.apple.com/join/XXXXXXXX`
- Check App Store Connect → TestFlight for correct link
- Ensure external testing is enabled (if using external link)

---

## Next Actions

1. ✅ Run Supabase migration via dashboard
2. ✅ Get TestFlight join codes from App Store Connect
3. ✅ Update API route with TestFlight URLs
4. ✅ Decide: Auto-email or manual invites for Phase 1?
5. ✅ Test signup flow on localhost
6. ✅ Deploy to production
7. ✅ Invite first 5-10 internal testers

---

## Support

For Resend support: https://resend.com/docs
For Supabase support: https://supabase.com/docs
For TestFlight support: https://developer.apple.com/testflight/
