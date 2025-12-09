# Admin Dashboard - Beta Signups

## Quick Access

**Admin Dashboard:** http://localhost:3000/admin/beta-signups
**Production:** https://rationale.work/admin/beta-signups

## Features

### 📊 Dashboard Overview

**Statistics Cards:**
- Total signups across both apps
- Zero signups count
- Heirloom signups count
- Invited count (manually marked)

**Filters:**
- View all signups
- Filter by Zero only
- Filter by Heirloom only

**Actions:**
- Copy individual emails (click "Copy" button)
- Copy all visible emails at once (for batch adding to TestFlight)

### 📧 Email Notifications

**You'll receive an email for every signup with:**
- App name (Zero or Heirloom)
- Email address
- Signup source (hero_cta, etc.)
- Timestamp
- Link to admin dashboard
- Quick instructions to invite

**Email goes to:** matt@rationale.work

### 📋 Signup Table

**Columns:**
- Email address
- App (with color-coded badge)
- Source (where they signed up from)
- Signed up date/time
- Status (Pending or Invited)
- Actions (Copy email button)

## Workflow

### Daily/Weekly Check

1. **Check your email** for new signup notifications
   - OR visit `/admin/beta-signups`

2. **Review signups**
   - Look at email addresses
   - Check which app they signed up for
   - See when they signed up

3. **Select testers for Phase 1** (5-10 per app)
   - Friends/colleagues
   - Technical users
   - High engagement potential

4. **Copy emails**
   - Click "Copy" for individual email
   - Or "Copy All Emails" for batch invite

5. **Add to TestFlight**
   - App Store Connect → TestFlight → Internal Testing
   - Add testers → Paste emails
   - Apple sends them TestFlight invite

6. **Send testing instructions**
   - Email them personally with testing guide
   - Zero: `/Users/matthanson/Zer0_Inbox/TESTFLIGHT_TESTING_NOTE.md`
   - Heirloom: `/Users/matthanson/Heirloom/HeriloomBetaTests/TESTFLIGHT_INSTRUCTIONS.txt`

## Email Notification Example

```
Subject: New Zero Beta Signup

New Beta Signup

App: Zero
Email: john@example.com
Source: hero_cta
Signed up: 12/9/2024, 2:30 PM

---
View all signups: Admin Dashboard
To invite: Copy email → App Store Connect → TestFlight → Internal Testing → Add Tester
```

## Tips

### Batch Processing
1. Visit dashboard weekly (e.g., every Monday)
2. Click "Copy All Emails" for new signups
3. Add all at once to TestFlight
4. Send personalized testing emails to each

### Tracking Invites
The dashboard shows "Pending" vs "Invited" status. This is currently manual - you'd need to mark them in Supabase after inviting.

**To mark as invited (optional):**
```sql
UPDATE beta_signups
SET email_sent = true, email_sent_at = NOW()
WHERE email = 'john@example.com' AND app_name = 'zero';
```

Or just use the email notifications - no need to track manually!

### Mobile Access
The dashboard is responsive and works on mobile, so you can check signups on your phone.

## Security Note

**The dashboard is currently open to anyone who knows the URL.**

For production, you may want to add authentication. Options:
1. Add simple password protection
2. Require login with your account
3. Only access from Supabase dashboard

For Phase 1 with 5-10 signups, the current setup is fine. The URL is not discoverable unless someone guesses it.

## Troubleshooting

### Dashboard shows "No signups yet"
- Check Supabase table exists: `beta_signups`
- Verify database connection in `.env.local`
- Try submitting a test signup

### Email notifications not arriving
- Check spam folder
- Verify `matt@rationale.work` is correct email
- Check Resend dashboard logs
- Verify RESEND_API_KEY in `.env.local`

### Can't copy emails
- Check browser permissions for clipboard
- Try using "Copy All Emails" instead
- Manually select and copy from table

## Future Enhancements

When ready for Phase 2:
- Auto-mark as invited when emails are sent
- Add notes field for each tester
- Track TestFlight install status
- Add bulk actions (mark multiple as invited)
- Export to CSV
- Search/filter by email or date range

---

**You're all set!** Check your email for new signups or visit the dashboard anytime. 🚀
