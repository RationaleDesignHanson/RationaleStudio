# CLAUDE.md — rationale-public orientation

A short file for any agent (or future-Matt) walking into this repo cold. Read this before touching analytics, auth, or the vault.

## Stack

- **Next.js 16 App Router** with Turbopack
- Hosted on **Netlify** (NOT Vercel — `netlify.toml` is the source of truth; build is `npm run build`; the `@netlify/plugin-nextjs` plugin handles SSR/ISR)
- **Firebase** for auth (`/owner/*`, `/admin/*`, `/clients/*` are all RBAC-gated by `middleware.ts`)
- **Supabase** for some persisted data (see `.env.example`)
- **PostHog** for product analytics (US Cloud, project 415605)
- **Sentry** for errors (PostHog owns ambient session replay; Sentry only captures replays on errors — `sentry.client.config.ts`)

## Two distinct auth/access patterns — DON'T confuse them

1. **Firebase RBAC** (real session login) gates `/owner/*`, `/admin/*`, `/clients/*`. Enforced by `middleware.ts`. The login page is at `/login` (or `/clients/login`).
2. **UnlockGate cookie+HMAC** (just a password) gates public-but-confidential case studies — `/work/{rumi,fubo,vault,nimbus,nimbus/deck}`. Implementation in `components/unlock/UnlockGate.tsx` + `lib/unlock.ts`. Per-scope env passwords live as `UNLOCK_PASSWORD_<SCOPE>`; a master `UNLOCK_PASSWORD` opens everything.

When a vault visitor needs to reach a deck, the deck route must be in the public tree (e.g. `/work/nimbus/deck`), NOT under `/clients/*` — the latter dead-ends at Firebase login.

## Analytics pipeline

- Public client: `components/analytics/PostHogProvider.tsx` (wraps the whole app in `app/layout.tsx`). Inits posthog-js inside `useEffect`, captures `$pageview` on App Router pathname change, autocapture + replay + heatmaps on, custom outbound-click delegate, vault-unlock events fired from `UnlockForm.tsx`.
- Server queries: `lib/posthog/client.ts` + `lib/posthog/queries.ts`. Personal API key (`POSTHOG_PERSONAL_API_KEY`) drives them; the file imports `'server-only'` to keep the key out of any client bundle.
- Internal dashboard: **`/owner/engagement`** — server-rendered, Firebase-RBAC gated, 30s cache per query. Bucket classifier in `lib/posthog/buckets.ts` mirrors the public IA — *update both the HogQL `BUCKET_CASE_HOGQL` and the JS `classifyPath()` together when adding routes.*

### Known gotcha: PostHog through Netlify ≠ rewrite

The `/ingest/*` proxy is a **Route Handler** (`app/ingest/[[...path]]/route.ts`), NOT a `next.config.mjs` rewrite. Earlier we tried the rewrite — every capture POST came back as `400 invalid GZIP data` because Netlify's edge layer mangles gzipped bodies in transit. The handler streams raw bytes through `req.arrayBuffer()` + `duplex: 'half'`, preserving Content-Encoding cleanly. **Do not "simplify" this back into a rewrite.** Diagnostic: a plain-JSON POST to `/ingest/e/?compression=gzip-js` returns 400 if the proxy is broken; same call without the `compression` query param returns 200.

## Vault content

- `app/(public)/work/vault/VaultContent.tsx` is the index. Each `VaultItem` may have `href` (case study) and/or `deckHref` (deck) — both render as side-by-side CTAs.
- Existing public case studies under UnlockGate: rumi, fubo, nimbus.
- Existing deck under UnlockGate: `/work/nimbus/deck` (mounts `SanitaryWasteDeck` from `components/sanitary-waste-system/`).
- All of these have `loading.tsx` skeletons (via `components/unlock/UnlockGateSkeleton.tsx`) so cold-start serverless invocations don't look unresponsive. The `*Content` components are `dynamic()`-imported so the locked-state response ships less JS.

## Dead code we deliberately left in place

- `components/heirloom/{demos,diagrams,pitch}/` and `components/heirloom/shared/{services,shopping-lab}/` have **no external imports** as of 2026-05-08, but Matt's caveat — *"some prototypes have old data which is required for their use"* — means these subtrees are not safe to delete without an item-by-item audit. The `loveMarks.ts` orphan that broke the Netlify build was already removed (commit 9308751).

## Pre-commit hook quirks

`.husky/pre-commit` greps staged diffs for credential prefixes. The patterns now require ≥20 alphanumeric chars after each prefix (e.g. `re_[a-zA-Z0-9]{20,}`) so substrings inside ordinary identifiers (`captu*re_p*ageview`) don't trip them. `.husky/*` is excluded from the self-check so the hook doesn't match its own pattern strings. macOS BSD grep doesn't support `\b` reliably — use length anchors instead of word boundaries.

## Env vars worth knowing

All in `.env.example`. The four that drive analytics:

- `NEXT_PUBLIC_POSTHOG_KEY` (phc_...) — public, ships in client bundle
- `NEXT_PUBLIC_POSTHOG_HOST` — `https://us.i.posthog.com`
- `POSTHOG_PERSONAL_API_KEY` (phx_...) — server-only, NEVER prefix with `NEXT_PUBLIC_`
- `POSTHOG_PROJECT_ID` — numeric, server-only

`NEXT_PUBLIC_*` are inlined at build time. After changing one in Netlify, **clear cache and redeploy** — bumping the var alone won't update the client bundle.

## Build expectations

- `npm run build` runs `next build` (Turbopack). TypeScript runs as a post-compile pass — Netlify will fail the build on any TS error.
- `npm run lint` is currently a no-op pending ESLint 9 flat-config migration (see `package.json`).
- The `outputFileTracingExcludes` in `next.config.mjs` excludes `public/**` from serverless bundle tracing — important; do not remove unless you've measured the deploy size impact.
