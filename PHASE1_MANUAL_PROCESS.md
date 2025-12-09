# Phase 1: Internal Testing - Manual Invite Process

## Overview

For Phase 1, the system collects beta signups but doesn't send automated emails (since TestFlight public links aren't available yet). You manually review signups and invite chosen testers.

## The Flow

### 1. User Signs Up
- User visits `/work/zero` or `/work/heirloom`
- Clicks "Join Beta on TestFlight"
- Enters email → Sees: "Thanks for your interest! We'll send you a TestFlight invite soon."
- Email is saved to Supabase database

### 2. You Check Signups Daily/Weekly

**View all signups in Supabase:**

Go to: Supabase Dashboard → Table Editor → `beta_signups`

Or run SQL query:
```sql
-- View all Zero signups
SELECT email, signed_up_at, signup_source
FROM beta_signups
WHERE app_name = 'zero'
ORDER BY signed_up_at DESC;

-- View all Heirloom signups
SELECT email, signed_up_at, signup_source
FROM beta_signups
WHERE app_name = 'heirloom'
ORDER BY signed_up_at DESC;
```

### 3. Select Your Phase 1 Testers (5-10 per app)

Choose testers based on:
- Friends/colleagues you trust
- Technical background (for detailed bug reports)
- High email engagement (cooking frequency for Heirloom, email volume for Zero)
- Device diversity (different iPhone models)

### 4. Add Testers to Internal TestFlight Group

**For each chosen tester:**

1. Go to **App Store Connect** → **My Apps**
2. Select the app (Zero or Heirloom)
3. Click **TestFlight** tab
4. Click **Internal Testing** in sidebar
5. Click on your testing group (create one if needed)
6. Click **Add Testers** (+ button)
7. Enter their email address
8. Click **Add**

**Apple automatically sends them:**
- TestFlight app download link (if they don't have it)
- Invitation to install your app
- TestFlight code to redeem

### 5. Send Personal Follow-Up Email

**Send them a personal email with testing instructions:**

**For Zero:**
```
Subject: Zero Beta Testing - You're In! 🎉

Hi [Name],

You're in the Zero beta! You should have received a TestFlight invite from Apple.

Here's how to get started:
1. Install TestFlight app (if you don't have it)
2. Accept the invite from Apple
3. Open Zero and connect your Gmail account
4. Watch as Zero analyzes your emails

Testing Instructions:
[Paste content from /Users/matthanson/Zer0_Inbox/TESTFLIGHT_TESTING_NOTE.md]

Questions or bugs? Just reply to this email.

Thanks for being an early tester!

Best,
Matt
```

**For Heirloom:**
```
Subject: Heirloom Beta Testing - You're In! 🎉

Hi [Name],

You're in the Heirloom beta! You should have received a TestFlight invite from Apple.

Here's how to get started:
1. Install TestFlight app (if you don't have it)
2. Accept the invite from Apple
3. Open Heirloom and import your first recipe
4. Customize with stickers and vintage styles

Testing Instructions:
[Paste content from /Users/matthanson/Heirloom/HeriloomBetaTests/TESTFLIGHT_INSTRUCTIONS.txt]

Questions or bugs? Just reply to this email.

Thanks for being an early tester!

Best,
Matt
```

### 6. Mark as Invited in Database (Optional)

Track who you've invited:

```sql
UPDATE beta_signups
SET email_sent = true, email_sent_at = NOW()
WHERE email = 'tester@example.com' AND app_name = 'zero';
```

## Transition to Phase 2 (External Testing)

When you're ready to scale to 20-30 users:

### 1. Submit Builds for External Testing
- Upload new builds to TestFlight
- Submit for Beta App Review (24-48 hour approval)
- Once approved, you'll get public links

### 2. Re-Enable Automated Emails

Edit `/app/api/beta/signup/route.ts`:

**Uncomment lines 90-134** (remove the `/*` and `*/`)

**Comment out lines 136-141** (the Phase 1 manual response)

**Update TestFlight URLs** on lines 8-11:
```typescript
const TESTFLIGHT_URLS = {
  zero: 'https://testflight.apple.com/join/YOUR_ZERO_CODE',
  heirloom: 'https://testflight.apple.com/join/YOUR_HEIRLOOM_CODE',
}
```

### 3. Deploy Updated Code
```bash
git add .
git commit -m "Enable automated beta emails for Phase 2"
git push
```

### 4. Invite Next Batch
- Check Supabase for signups since Phase 1
- System automatically emails them with TestFlight link + instructions
- No manual adding needed - they use the public link

## Monitoring Progress

### Track Phase 1 Metrics

```sql
-- Total signups per app
SELECT app_name, COUNT(*) as total_signups
FROM beta_signups
GROUP BY app_name;

-- Signups by source
SELECT app_name, signup_source, COUNT(*) as count
FROM beta_signups
GROUP BY app_name, signup_source
ORDER BY count DESC;

-- Recent signups (last 7 days)
SELECT *
FROM beta_signups
WHERE signed_up_at > NOW() - INTERVAL '7 days'
ORDER BY signed_up_at DESC;

-- Who you've invited
SELECT email, app_name, signed_up_at
FROM beta_signups
WHERE email_sent = true
ORDER BY email_sent_at DESC;
```

## Quick Reference

### Check Signups
Supabase Dashboard → Table Editor → `beta_signups`

### Add TestFlight Tester
App Store Connect → TestFlight → Internal Testing → Add Testers

### Testing Instructions
- Zero: `/Users/matthanson/Zer0_Inbox/TESTFLIGHT_TESTING_NOTE.md`
- Heirloom: `/Users/matthanson/Heirloom/HeriloomBetaTests/TESTFLIGHT_INSTRUCTIONS.txt`

### Support
Testers reply to your email, you respond directly

## Tips

- **Set a schedule**: Check signups Monday/Thursday
- **Batch invites**: Add 2-3 testers at once
- **Personal touch**: Customize each email with their name
- **Quick response**: Reply to tester questions within 24 hours
- **Track feedback**: Keep notes on who reports what bugs

---

## You're All Set!

Beta buttons are live → Signups are collected → You control Phase 1 → Scale when ready 🚀
