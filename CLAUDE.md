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
- Internal dashboard: **`/owner/engagement`** — server-rendered, Firebase-RBAC gated, 30s cache per query. Bucket classifier in `lib/posthog/buckets.ts` mirrors the public IA — *update both the HogQL `BUCKET_CASE_HOGQL` and the JS `classifyPath()` together when adding routes.* Scroll-depth tracking (`scroll_depth` event with `depth: 0.25 | 0.5 | 0.75 | 1`) is mounted globally via `app/(public)/layout.tsx` — applies to every public route.
- Tracked events beyond pageviews + autocapture: `vault_unlock_{attempted,succeeded,failed}` (UnlockForm), `outbound_click` (PostHogProvider, includes `cta_location` + `cta_type` from `data-cta-*` ancestors), `prototype_{loaded,engaged,clicked}` (TrackedIframe), `scroll_depth` (ScrollDepthTracker). UTM params + normalized `traffic_source` are registered session-wide on first pageview.

### Known gotcha: HogQL `match()` is anchored, JS regex isn't

`lib/posthog/buckets.ts` keeps two mirrored classifiers. The HogQL `match()` function uses re2 with `RE2::FullMatch` semantics — fully anchored. JS `.test()` is unanchored. If you ever write `^/work/heirloom(/|$)` it'll match `/work/heirloom/evolution` in JS but NOT in HogQL. Always use `^...(/.*)?$` (or equivalent fully-matched pattern) when writing HogQL match patterns. Caught 2026-05-11 — sub-route pageviews were silently classifying as "other" on the dashboard.

### Known gotcha: don't reach for `window.posthog` from your own code

The SDK sets `window.posthog` only inside its `loaded` callback (async, after init). If you grab `window.posthog` at `useEffect`-time you might capture `undefined` and your captures silently no-op forever. Import `posthog from 'posthog-js'` and use the singleton directly — it queues pre-init events and flushes them later. Caught 2026-05-11 in `TrackedIframe.tsx`.

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

## Video/media assets (Cloudflare R2)

Videos are **not** in git — they live in the `rationale-media` R2 bucket and are served via `NEXT_PUBLIC_VIDEO_CDN_BASE` (set in Netlify; currently `pub-…r2.dev`). `lib/media.ts:videoUrl()` prefixes video `<src>` with that origin when set, and falls back to `/public` when unset. Untracked from git + gitignored (`public/**/*.mp4`) as of commit `a4e9269` so deploys don't ship ~590MB. **Posters stay local** (`<name>.poster.jpg` next to each clip). Local `.mp4` copies remain in the working tree for dev. `components/video-player/{LazyVideo,VideoPlayer}.tsx` both route through `videoUrl()`.

### Known gotcha: cross-origin video needs `media-src` in the CSP

Because videos are served from the R2 CDN (a different origin), the CSP `media-src` directive must list it. There is no separate `media-src` fallback — `<video>` inherits `default-src 'self'`, so a missing/incomplete `media-src` silently blocks every clip and the local poster shows instead ("an image, not a movie"). Keep `media-src` in sync across **both** `netlify.toml` and `next.config.mjs` (it currently allows `https://*.r2.dev` + `https://media.rationale.work`). Invisible in local dev because the CDN env var is unset there, so videos serve from `'self'` and play. If you add another media origin (or a new CDN), update `media-src` in both files. Caught 2026-07-14 — every video site-wide was rendering as its poster in production after the R2 migration didn't touch the CSP.

## SEO + organic-discovery surface

The full SEO play sits across several files, all touched 2026-05-11. Highlights:

- **JSON-LD schemas** — `lib/seo/jsonld.ts` exports maximalist `Person` + `WebSite` generators (mounted globally on `app/layout.tsx`) and `Article` + `Breadcrumb` generators consumed by case-study pages via `lib/seo/case-studies.ts:caseStudySchemas('<slug>')`. Use `components/seo/JsonLd.tsx` (server) for site-wide schemas and `components/seo/StructuredData.tsx` (client) inside case-study `'use client'` pages.
- **Per-route OG images** — `app/opengraph-image.tsx` (root) + 9 per-case-study `opengraph-image.tsx` files use the shared `lib/seo/og-image.tsx:renderOgImage()` helper. Add a new one by creating `app/(public)/work/<slug>/opengraph-image.tsx` with a one-line `renderOgImage({ eyebrow, title, tagline, accent })` call.
- **Canonical entity description** — `PERSON_DESCRIPTION` in `lib/seo/jsonld.ts` is the single source of truth used by JSON-LD, llms.txt, and the about page hero. Synced verbatim to LinkedIn / Substack / GitHub / Are.na via `docs/seo/identity-alignment.md`. *Don't* edit it in only one place — the consistency IS the disambiguation signal.
- **Bucket classifier** (analytics — separate surface) still in `lib/posthog/buckets.ts`.
- **AI crawler allowlist** in `app/robots.ts` explicitly lists GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended. Disallow patterns are shared. `public/llms.txt` is the LLM-targeted summary.
- **Canonical writing** — `app/(public)/writing/[slug]/page.tsx` resolves essays from `content/writing/posts.ts` (TypeScript, not MDX — keeps the build dep-free). Each post auto-publishes into sitemap + OG image. Cross-post to Substack with `rel="canonical"` block per `docs/seo/substack-canonical-workflow.md`.
- **Manual off-site checklist** at `docs/seo/launch-checklist.md` lists the actions Matt has to execute himself (Search Console, GitHub profile, Maggie Appleton list, Show HN, Product Hunt, Are.na, Wikidata).

### Known gotcha: HogQL `match()` is anchored

(Repeating because it caught us in both analytics and SEO.) HogQL's `match()` is `RE2::FullMatch`-anchored; JS `.test()` is unanchored. When mirroring regex patterns across the two — buckets.ts has this paired layout — use `^...(/.*)?$` so both engines agree. Caught sub-routes silently mis-classifying on the dashboard.

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
