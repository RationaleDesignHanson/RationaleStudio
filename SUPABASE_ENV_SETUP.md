# Supabase Environment Variables Setup

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend (already added)
RESEND_API_KEY=re_Mnz4aSaJ_2JK9JpNqjLyD5zBytHv6nhHY
```

## How to Get Supabase Keys

1. Go to your Supabase project dashboard
2. Click on **Settings** (gear icon) in sidebar
3. Click on **API**
4. You'll see:
   - **Project URL** → Copy to `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Copy to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (click "Reveal") → Copy to `SUPABASE_SERVICE_ROLE_KEY`

## Example `.env.local`

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmno.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend
RESEND_API_KEY=re_Mnz4aSaJ_2JK9JpNqjLyD5zBytHv6nhHY
```

## After Adding Keys

1. Restart your dev server: `Ctrl+C` then `npm run dev`
2. Test the signup flow
3. Check admin dashboard

## Security Notes

- ✅ `NEXT_PUBLIC_*` variables are safe to expose (client-side)
- ⚠️ `SERVICE_ROLE_KEY` should NEVER be exposed to client (server-only)
- ✅ `.env.local` is already in `.gitignore` (not committed to git)

## Deployment (Netlify/Vercel)

Add these same environment variables in your deployment platform:
- Netlify: Site settings → Environment variables
- Vercel: Project settings → Environment Variables

Make sure to add all 4 variables (3 Supabase + 1 Resend).
