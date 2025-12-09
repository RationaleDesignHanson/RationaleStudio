# ✅ Beta Signup System - Complete!

## What's Been Built

### 1. Database (Supabase)
- ✅ Table created: `beta_signups`
- ✅ Stores email, app name, signup source, timestamps
- ✅ Row Level Security enabled
- ✅ Environment variables configured

### 2. Beta Signup Flow
- ✅ Buttons live on `/work/zero` and `/work/heirloom`
- ✅ Beautiful modal for email capture
- ✅ API endpoint: `/api/beta/signup`
- ✅ Saves to database
- ✅ Shows success message to user

### 3. Admin Dashboard
- ✅ URL: `/admin/beta-signups`
- ✅ View all signups with filters
- ✅ Stats cards (total, Zero, Heirloom, invited)
- ✅ Copy individual emails or all at once
- ✅ See signup source and dates
- ✅ Track invited status

### 4. Email Notifications
- ✅ You get notified for every signup at: matt@rationale.work
- ✅ Email includes: app, email, source, timestamp
- ✅ Direct link to admin dashboard
- ✅ Quick instructions to invite

## Phase 1 Configuration (Internal Testing)

**Auto-emails disabled** - You manually invite testers:
1. Check email notifications OR visit `/admin/beta-signups`
2. Copy emails of testers you want to invite
3. Add to TestFlight Internal Group in App Store Connect
4. Apple sends TestFlight invite automatically
5. You send personal testing instructions

## How to Use

### Daily Workflow
1. **Get notified** via email when someone signs up
2. **Visit dashboard**: http://localhost:3000/admin/beta-signups
3. **Review signups** - filter by app if needed
4. **Copy emails** - click "Copy" or "Copy All Emails"
5. **Add to TestFlight**:
   - App Store Connect → TestFlight → Internal Testing
   - Add testers → Paste emails
6. **Send testing instructions**:
   - Zero: `/Users/matthanson/Zer0_Inbox/TESTFLIGHT_TESTING_NOTE.md`
   - Heirloom: `/Users/matthanson/Heirloom/HeriloomBetaTests/TESTFLIGHT_INSTRUCTIONS.txt`

### Test It Now!

1. Visit: http://localhost:3000/work/zero
2. Click "Join Beta on TestFlight"
3. Enter a test email
4. Check your email inbox (notification)
5. Visit: http://localhost:3000/admin/beta-signups
6. See the signup appear!

## Environment Variables Set

```bash
# Resend
RESEND_API_KEY=re_Mnz4aSaJ_2JK9JpNqjLyD5zBytHv6nhHY

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://dgbhtedawigjimbvmllr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

## Deploy to Production

### Netlify Deployment

1. **Add environment variables** in Netlify:
   - Site settings → Environment variables
   - Add all 4 variables (1 Resend + 3 Supabase)

2. **Deploy**:
   ```bash
   git add .
   git commit -m "Add beta signup system with admin dashboard"
   git push
   ```

3. **After deploy, test**:
   - Visit: https://rationale.work/work/zero
   - Test signup flow
   - Check: https://rationale.work/admin/beta-signups
   - Verify email notifications arrive

### Production URLs

- **Zero work page**: https://rationale.work/work/zero
- **Heirloom work page**: https://rationale.work/work/heirloom
- **Admin dashboard**: https://rationale.work/admin/beta-signups

## Transition to Phase 2 (External Testing)

When ready to scale to 20-30 users:

1. **Submit builds for External Testing**:
   - Upload new builds to TestFlight
   - Submit for Beta App Review (24-48 hours)
   - Get approved

2. **Get public TestFlight links**:
   - App Store Connect → TestFlight → External Testing
   - Copy public links for each app

3. **Re-enable automated emails**:
   - Edit `/app/api/beta/signup/route.ts`
   - Uncomment lines 90-134 (the email sending code)
   - Comment out lines 136-141 (manual response)
   - Update TestFlight URLs on lines 8-11

4. **Deploy changes**:
   ```bash
   git add .
   git commit -m "Enable automated beta emails for Phase 2"
   git push
   ```

5. **Scale**: System now runs fully automated!

## Documentation Created

- `BETA_SIGNUP_SETUP.md` - Full setup guide
- `PHASE1_MANUAL_PROCESS.md` - Phase 1 workflow
- `ADMIN_DASHBOARD_GUIDE.md` - How to use dashboard
- `SUPABASE_ENV_SETUP.md` - Environment variable setup
- `BETA_SYSTEM_COMPLETE.md` - This file!

## Quick Links

### Local Development
- Zero page: http://localhost:3000/work/zero
- Heirloom page: http://localhost:3000/work/heirloom
- Admin dashboard: http://localhost:3000/admin/beta-signups

### Production
- Zero page: https://rationale.work/work/zero
- Heirloom page: https://rationale.work/work/heirloom
- Admin dashboard: https://rationale.work/admin/beta-signups

### Testing Instructions
- Zero: `/Users/matthanson/Zer0_Inbox/TESTFLIGHT_TESTING_NOTE.md`
- Heirloom: `/Users/matthanson/Heirloom/HeriloomBetaTests/TESTFLIGHT_INSTRUCTIONS.txt`

### App Store Connect
- Zero TestFlight: [Add your link]
- Heirloom TestFlight: [Add your link]

## Support & Troubleshooting

### Email notifications not arriving
- Check spam folder
- Verify `matt@rationale.work` in API route (line 142)
- Check Resend dashboard logs

### Dashboard shows "No signups"
- Verify Supabase environment variables
- Check database has `beta_signups` table
- Try submitting a test signup

### Can't copy emails
- Check browser clipboard permissions
- Try "Copy All Emails" button instead
- Manually select and copy from table

## Next Steps

1. ✅ Test the signup flow locally
2. ✅ Submit a test signup
3. ✅ Check email notification
4. ✅ View in admin dashboard
5. ✅ Deploy to production
6. 🎉 Start collecting beta signups!

---

**You're all set!** The system is production-ready. Beta buttons are live, signups are captured, you get notified, and you have full control over Phase 1 invites. 🚀
