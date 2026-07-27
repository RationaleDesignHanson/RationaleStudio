# rationale.work — Performance Audit & Remediation Plan

**Stack detected from the live page:** Next.js (App Router; `next-size-adjust` meta confirms `next/font` is in use), almost certainly on Vercel. This is a code-level codebase, **not** a no-code platform — there is no app dashboard where these get fixed. The only dashboard-level levers are Vercel's image optimization, compression, and cache settings; everything that actually moves the numbers lives in the repo.

---

## 0. The framing (read before running anything)

The instinct to "make load time the minimum" usually turns into chasing a Lighthouse 100 on a Mac Studio over gigabit fiber. That number is close to meaningless. Google grades on **field data** — the 75th percentile of real Chrome users over a rolling 28-day window (CrUX). A perfect lab score with a p75 LCP of 3.4s on mid-tier Android still fails.

**Targets (2026 thresholds, unchanged):**

| Metric | Good | Alert at (80% of threshold) |
|---|---|---|
| LCP | ≤ 2.5s | 2.0s |
| INP | ≤ 200ms | 160ms |
| CLS | ≤ 0.1 | 0.08 |
| TTFB | ≤ 800ms | 600ms |

**Practical budgets for a site of this type** (portfolio/practice site, mostly static content, no auth):
- First-load JS per route: **≤ 110 KB gzipped** (Next.js's own "good" line is 128 KB; a site with no app shell should beat it)
- Total transfer, cold, homepage: **≤ 400 KB**
- Hero/LCP image: **≤ 120 KB** AVIF/WebP
- Zero render-blocking third-party requests before LCP

**Kill criteria — stop optimizing when any of these is true:**
- p75 field LCP < 2.0s, INP < 150ms, CLS < 0.05 across all route groups → done, move on
- A proposed change buys < 50ms lab LCP or < 10 KB of JS → don't ship it
- A change requires a refactor > 1 day for a metric already in the green band → reject

---

## 1. Measurement stack (set this up first — do not fix anything blind)

1. **Field data:** PageSpeed Insights on `https://rationale.work` + each route (`/work`, `/writing`, `/about`, `/work/vault`, `/contact`). If CrUX has no URL-level data (likely, low traffic), it falls back to origin-level — which means you'll be flying on lab data plus your own RUM. So:
2. **Your own RUM:** `useReportWebVitals` from `next/web-vitals` piping to Vercel Analytics or a `/api/vitals` endpoint. This is non-optional at low traffic; it's the only real field signal you'll get.
3. **Lab, agent-driven:** Chrome DevTools MCP (`chrome-devtools-mcp`) — gives Claude Code `performance_start_trace`, `lighthouse_audit`, network inspection, and CPU/network throttling. This is what makes the loop below closed rather than guesswork.
4. **Bundle:** `@next/bundle-analyzer` + the `next build` route table.

Install the MCP server before session 1:

```bash
claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest
```

---

## 2. The ordered fix list (highest leverage first, for this stack)

1. **`'use client'` boundary audit.** The single biggest JS lever in App Router. Every client component ships its subtree to the browser. Portfolio sites routinely mark whole page files client-side for one hover animation.
2. **LCP element identification.** Trace it before touching images. On a text-led hero like this one, the LCP element may be the H1 — in which case font loading, not image compression, is the fix.
3. **Font strategy.** `next/font` is already in use. Verify: subsetting, `display: swap`, preload on the LCP font only, and no more than two families/weights loaded critically.
4. **Image pipeline.** `next/image` everywhere, `priority` on the LCP image only, correct `sizes` (wrong `sizes` alone inflates payload 40–60%), AVIF before WebP, explicit dimensions on everything.
5. **Third-party scripts.** Analytics, fonts from a CDN, embeds. `next/script` with `afterInteractive` or `lazyOnload`; nothing before LCP.
6. **Caching / TTFB.** Next.js 16 made caching fully opt-in (Cache Components + `use cache`). If this site is on 16 and nobody opted in, pages that should be static shells are rendering dynamically on every request. If on 15, check `export const dynamic` / `revalidate` per route.
7. **CLS sweep.** Reserved space for every image, embed, and anything that mounts after hydration.
8. **INP.** Likely already fine on a content site, but check the nav and any view-transition/scroll-driven animation.
9. **Prefetch discipline.** A nav that prefetches every route on a card-heavy index page can pull megabytes on hover.

---

## 3. Claude Code prompts

Run these in order, one session each, in a worktree. Each has an explicit done condition. **Prompt 1 makes no code changes** — resist merging it with prompt 2.

---

### Prompt 1 — Baseline (read-only)

```
Do not change any code in this session. This is measurement only.

Context: this repo is the Next.js site deployed at https://rationale.work. I want a
performance baseline before any optimization work.

1. Report the exact Next.js and React versions, the router in use, the bundler, and
   the deploy target from package.json / next.config.
2. Run `next build` and capture the full route table: for every route, record the
   route type (static/SSG/ISR/dynamic), the per-route JS, and the First Load JS.
3. Run the bundle analyzer (add @next/bundle-analyzer behind an ANALYZE env flag if
   it isn't present — that's the only code change permitted) and list the ten largest
   modules in the client bundle with their gzipped sizes and which route pulls them in.
4. Using chrome-devtools-mcp against the production URL, record a performance trace
   for each of: /, /work, /writing, /about, /work/vault, /contact — twice per route,
   once with no throttling and once at 4x CPU slowdown + Slow 4G, mobile viewport.
   For each: LCP value, the identity of the LCP element, TTFB, CLS, total transfer
   size, render-blocking resources, and the top three insights with estimated savings.
5. Run lighthouse_audit for accessibility/SEO/best-practices on / and /work.
6. Grep the repo for every file containing 'use client' and list them with a one-line
   note on why each needs to be a client component.

Write all of this to PERF_BASELINE.md at the repo root as raw findings — tables and
numbers, no recommendations, no prose narrative. I want the recommendations to come
from a separate pass over the data.

Done when: PERF_BASELINE.md exists, every route above has both throttled and
unthrottled numbers, and the LCP element is named (not guessed) for each route.
```

---

### Prompt 2 — Diagnosis and plan

```
Read PERF_BASELINE.md. Do not change code yet.

Produce PERF_PLAN.md: a prioritized remediation backlog. For each item give:
- the metric it moves and the current measured value
- the estimated gain in ms or KB, with your reasoning
- the implementation cost in hours
- the risk of visual or behavioral regression

Rank by gain/cost. Then, and this is the part I care about most: include a section
titled "Not worth doing" listing the optimizations you considered and rejected,
with the reason each fails the bar. Our budget is First Load JS <= 110 KB gzipped
per route, total homepage transfer <= 400 KB, p75 LCP < 2.0s, CLS < 0.05.

If the baseline shows we are already inside those budgets on a given route, say so
explicitly and recommend no work on that route.

Be adversarial about your own suggestions. I would rather ship four changes that
each move a real number than fifteen that collectively move nothing.

Done when: PERF_PLAN.md has a ranked backlog, a "Not worth doing" section with at
least three entries, and a stated position on whether this site has a real
performance problem or a perceived one.
```

---

### Prompt 3 — Server/client boundary

```
Implement the 'use client' reduction from PERF_PLAN.md.

For every client component identified in PERF_BASELINE.md, do one of:
(a) remove the directive if the component uses no hooks, no browser APIs, and no
    event handlers;
(b) push the directive down — extract only the interactive leaf into its own client
    component and leave the parent as a server component;
(c) leave it and document in a code comment why it must be client-side.

Rules: no behavior changes, no visual changes, no new dependencies. Handle one
route at a time and run `next build` after each, recording the First Load JS delta.

Done when: `next build` shows a First Load JS reduction on at least one route, the
build passes, every remaining 'use client' has a justification, and you have posted
a before/after table of First Load JS per route.
```

---

### Prompt 4 — LCP path

```
Target: the LCP element on / and /work, as identified in PERF_BASELINE.md.

If the LCP element is an image: convert to next/image if it isn't already, set
priority on it and only it, set a correct sizes attribute derived from the actual
CSS breakpoints (read the CSS, don't guess), enable AVIF ahead of WebP in
next.config images.formats, and set explicit width/height.

If the LCP element is text: the fix is font delivery, not images. Audit next/font
usage — confirm subsetting to latin, display: swap, preload true on the LCP font
family only and false on all others, and no more than two families loaded before
first paint. Check for any font loaded outside next/font and eliminate it.

Then audit every non-LCP image on those routes: nothing above the fold should be
lazy, nothing below it should be eager, and no image should be missing dimensions.

After implementing, re-run the chrome-devtools-mcp trace at 4x CPU / Slow 4G on both
routes and report the LCP delta.

Done when: measured mobile-throttled LCP improved by at least 200ms on at least one
route, or you report that it did not and explain why the hypothesis was wrong.
```

---

### Prompt 5 — Third-party and script discipline

```
Inventory every network request on / that is not served from rationale.work: scripts,
fonts, analytics, embeds, iframes. For each, report the transfer size, whether it
blocks render, and whether it fires before LCP.

Then: move every non-essential script to next/script with strategy="lazyOnload",
move essential-but-not-critical to "afterInteractive", and eliminate anything that
can't justify its bytes. Any third-party font goes through next/font/local instead.
Add preconnect only for origins that survive the cull.

Do not remove analytics without asking me first.

Done when: zero third-party requests fire before LCP on /, and you have posted a
before/after table of third-party bytes.
```

---

### Prompt 6 — Rendering strategy and TTFB

```
From PERF_BASELINE.md, list every route rendering dynamically that has no
per-request data dependency.

If this project is on Next.js 16: evaluate Cache Components — enable cacheComponents
in next.config and apply "use cache" to the static shells, with explicit cacheLife
profiles. Caching is fully opt-in as of 16, so a site that upgraded from 15 without
migrating is likely re-rendering static content on every request.

If on Next.js 15: set the appropriate route segment config (dynamic, revalidate) per
route and confirm the build marks them static or ISR.

Also check for sequential awaits in server components — any two fetches without a
data dependency between them should be in a Promise.all.

Measure TTFB from a cold edge before and after.

Done when: every route with no per-request data is statically rendered or cached,
measured TTFB on / is under 400ms cold, and you have documented the cache
invalidation path for each cached route.
```

---

### Prompt 7 — CLS and INP sweep

```
Using chrome-devtools-mcp at 4x CPU / Slow 4G on every route, identify every layout
shift with its contributing element and score.

Fix by reserving space: explicit dimensions or aspect-ratio on all media, min-height
on any container whose content mounts after hydration, and font-size-adjust or a
matched fallback metric on any swapped font that causes reflow.

Then record an INP trace while interacting with the nav, any filters on /work, and
any expandable elements. Report the longest task in each interaction and break up
anything over 50ms.

Done when: CLS is 0.00 on every route in the throttled trace, and no interaction
produces a task longer than 50ms.
```

---

### Prompt 8 — Lock it in

```
Make regressions impossible to merge.

1. Add real-user monitoring: useReportWebVitals from next/web-vitals, reporting LCP,
   INP, CLS, TTFB and the current route to [Vercel Analytics / a /api/vitals
   endpoint — pick one and tell me the tradeoff]. Tag every metric with the build ID
   so a regression maps to a deploy.
2. Add a performance budget to CI that fails the build if First Load JS on any route
   exceeds 110 KB gzipped or total route JS grows more than 5% versus main.
3. Add Lighthouse CI against a preview deploy with LCP and CLS as hard failures and
   the rest as warnings.
4. Write a CLAUDE.md fragment at the repo root under a "Performance" heading stating
   the budgets, the measure-before-you-change rule, and the requirement that any new
   'use client' directive carries a justification comment.
5. Update PERF_BASELINE.md with a final before/after table across every metric.

Done when: CI fails on a deliberately introduced 200 KB dependency, RUM events are
visible in the dashboard, and the CLAUDE.md fragment is committed.
```

---

## 4. What to expect

If the site is what it looks like — a static-content Next.js portfolio with `next/font` already wired up — the realistic finding is that it is **already fast**, and prompts 1 and 2 will tell you that within an hour. The two things most likely to actually be wrong on a site of this shape:

- **Over-clienting.** A design-forward site with scroll/hover treatments tends to accumulate `'use client'` at page level rather than leaf level.
- **The Vault page.** Image-dense archive pages are where the payload hides. If any route breaks the budget, it will be that one.

Give prompt 2's "Not worth doing" section real weight. Most of what a perf audit surfaces on a site like this is noise.
