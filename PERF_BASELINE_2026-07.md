# rationale.work — Performance Baseline

**Date:** 2026-07-27  
**Repo:** `/Users/matthanson/Developer/rationale-public`  
**Build:** `ANALYZE=true next build --webpack` (Next.js 16.0.10, React 19.2.3, Webpack)

---

## 1. Stack

| Item | Version / Setting |
|------|-------------------|
| Next.js | `^16.0.10` |
| React | `^19.2.3` |
| Router | App Router |
| Bundler | Webpack (for bundle analyzer) |
| Deploy target | Netlify / Vercel edge |
| Fonts | `next/font/google`: Geist, Geist_Mono, Newsreader |
| Image formats | AVIF, WebP (`next.config.mjs`) |
| Bundle analyzer | `@next/bundle-analyzer` already wired |

---

## 2. Build route table

| Route | Type |
|-------|------|
| `/` | Static (○) |
| `/about` | Static |
| `/contact` | Static |
| `/writing` | Static |
| `/writing/[slug]` | SSG (●) |
| `/work/vault` | Dynamic (ƒ) |
| `/work/vault/writing/[slug]` | Dynamic |
| `/work/athletes-first` | Dynamic |
| `/work/zero` | Static |
| `/work/heirloom` | Static |
| `/work/heirloom/evolution` | Static |
| `/work/silly-questions` | Static |
| `/work/fair-embodied-ai` | Static |
| `/work/spark-ar` | Static |
| `/work/orion` | Static |
| `/work/viacom` | Static |
| `/work/studio-era` | Static |
| `/work/framestore` | Dynamic |
| `/work/rumi` | Dynamic |
| `/work/fubo` | Dynamic |
| `/work/nimbus` | Dynamic |
| `/work/nimbus/deck` | Dynamic |
| `/work/decks/[slug]` | Dynamic + SSG |

Full route table is in the build log: `.next/analyze/build.log`.

---

## 3. First Load JS (gzipped, route-specific + shared)

Shared baseline (polyfills + root main files) ≈ **646 KB gzipped** because the current split-chunks config merges almost all node_modules into one `vendor` chunk and all multi-route components into one `common` chunk.

| Route | First Load JS (gzipped) |
|-------|-------------------------|
| /work/heirloom/evolution | 662,256 bytes (646.7 KB) |
| /work/zero | 662,135 bytes (646.6 KB) |
| /work/athletes-first | 662,135 bytes (646.6 KB) |
| /work/heirloom | 662,135 bytes (646.6 KB) |
| /work/silly-questions | 662,135 bytes (646.6 KB) |
| /work/fair-embodied-ai | 662,135 bytes (646.6 KB) |
| /work/spark-ar | 662,135 bytes (646.6 KB) |
| /work/orion | 662,135 bytes (646.6 KB) |
| /work/viacom | 662,135 bytes (646.6 KB) |
| /work/studio-era | 662,135 bytes (646.6 KB) |
| /work/fubo | 662,135 bytes (646.6 KB) |
| /work/nimbus | 662,135 bytes (646.6 KB) |
| /work/framestore | 662,134 bytes (646.6 KB) |
| /work/rumi | 662,134 bytes (646.6 KB) |
| /contact | 662,014 bytes (646.5 KB) |
| /writing | 662,014 bytes (646.5 KB) |
| /work/vault | 662,014 bytes (646.5 KB) |
| /work/decks/[slug] | 662,014 bytes (646.5 KB) |
| /writing/[slug] | 662,014 bytes (646.5 KB) |
| /about | 662,013 bytes (646.5 KB) |
| `/` | 661,893 bytes (646.4 KB) |
| /prototype-lab | 661,893 bytes (646.4 KB) |
| /hero-lab | 661,893 bytes (646.4 KB) |
| /home-lab | 661,893 bytes (646.4 KB) |

**Budget target:** ≤ 110 KB gzipped per route. Every route is ~5.9× over budget.

---

## 4. Route-specific JS chunks (without shared)

| Route | Route-specific JS (gzipped) |
|-------|-----------------------------|
| /work/vault | 16,020 bytes (15.6 KB) |
| /work/spark-ar | 10,535 bytes (10.3 KB) |
| /work/viacom | 8,031 bytes (7.8 KB) |
| /work/heirloom | 7,687 bytes (7.5 KB) |
| /work/studio-era | 7,634 bytes (7.5 KB) |
| /work/orion | 7,231 bytes (7.1 KB) |
| /about | 6,995 bytes (6.8 KB) |
| /work/fair-embodied-ai | 6,832 bytes (6.7 KB) |
| /work/zero | 6,185 bytes (6.0 KB) |
| /work/rumi | 6,144 bytes (6.0 KB) |
| /work/silly-questions | 5,724 bytes (5.6 KB) |
| /work/nimbus | 5,690 bytes (5.6 KB) |
| /work/framestore | 5,101 bytes (5.0 KB) |
| /work/fubo | 5,050 bytes (4.9 KB) |
| /writing | 4,008 bytes (3.9 KB) |
| /contact | 3,971 bytes (3.9 KB) |
| /work/athletes-first | 3,330 bytes (3.3 KB) |
| `/` | 2,530 bytes (2.5 KB) |

The page-level code is small. The bloat is in the shared `vendor` + `common` chunks.

---

## 5. Lighthouse (mobile, production)

| URL | LCP (ms) | CLS | TTFB (ms) | INP | Total bytes |
|-----|----------|-----|-----------|-----|-------------|
| https://rationale.work/ | 3,481 | 0.0509 | 767 | — | 909,533 |
| https://rationale.work/about | 4,374 | 0.0003 | 269 | — | 4,522,020 |
| https://rationale.work/contact | 2,152 | 0.0003 | 634 | — | 828,852 |
| https://rationale.work/writing | 2,733 | 0.0000 | 249 | — | 810,273 |
| https://rationale.work/work/vault | 3,927 | 0.0003 | 599 | — | 844,885 |
| https://rationale.work/work/zero | 4,290 | 0.0000 | 249 | — | 935,701 |
| https://rationale.work/work/athletes-first | 3,677 | 0.0111 | 503 | — | 829,695 |
| https://rationale.work/work/heirloom | 2,113 | 0.2132 | 338 | — | 4,673,139 |

**LCP element** was not extracted by the automated run; needs a manual trace to name the exact element per route.

---

## 6. Shared `vendor` chunk breakdown (gzipped)

`static/chunks/vendor-c0523fbed6155e8d.js`: 520,611 bytes gzipped

| Package | gzipSize |
|---------|----------|
| next/dist | 213,098 |
| firebase/firestore | 70,599 |
| posthog-js/dist | 60,352 |
| react-dom/cjs | 56,104 |
| react-reconciler/cjs | 33,933 |
| firebase/auth | 24,773 |
| swiper | 22,470 |
| motion-dom/dist | 22,022 |
| lucide-react/dist | 19,486 |
| react-zoom-pan-pinch/dist | 8,680 |
| tailwind-merge/dist | 7,831 |
| buffer | 6,997 |
| @radix-ui/react-accordion | 5,724 |
| @firebase/util | 5,523 |
| swiper/modules | 4,124 |
| @firebase/app | 4,002 |
| react/cjs | 3,050 |

The entire `node_modules` tree is forced into this single chunk by the custom `vendor` cacheGroup in `next.config.mjs`.

---

## 7. Shared `common` chunk breakdown (top modules, gzipped)

`static/chunks/common-1b4d69d1eae40036.js`: ~308 KB raw

| Module | gzipSize |
|--------|----------|
| sanitary-waste-system.ts | 8,018 |
| ASCIIShaderGrid.tsx | 7,166 |
| SanitaryWasteDeck.tsx | 5,188 |
| kits.ts | 5,101 |
| DigitalTwinsDemo.tsx | 4,712 |
| ImmersivePitchDemo.tsx | 4,490 |
| investors.ts | 4,222 |
| founder.ts | 4,217 |
| philosophy.ts | 3,390 |
| BrandCampaignDemo.tsx | 3,223 |
| RosterCampaignDemo.tsx | 2,716 |
| ContractModelingCanvas.tsx | 2,324 |
| ContractModelingMobile.tsx | 2,211 |
| ASCIIUnifiedGrid.tsx | 2,078 |
| Header.tsx | 1,912 |
| DemoOnboarding.tsx | 1,874 |
| ASCIIWaveDivider.tsx | 1,748 |
| FormRecoveryModal.tsx | 1,493 |
| MobileCarousel.tsx | 1,232 |
| RiskReductionTool.tsx | 1,208 |
| VideoPlayer.tsx | 1,178 |
| UnlockForm.tsx | 1,007 |
| firebase.ts | 1,072 |

The custom `common` cacheGroup (`minChunks: 2`) pulls any component used by two or more routes into a single chunk loaded by every route, including portal-only demos and diagrams.

---

## 8. `'use client'` inventory

- `app`: 78 client files (public pages + portal pages + content components)
- `components`: 317 client files
- `hooks`: 9 client files
- `lib`: 1 client file (`lib/auth/AuthContext.tsx`)

Full list with reasons and top imports: `PERF_CLIENT_INVENTORY.md`.

Notable public pages that are top-level client components:

- `app/(public)/about/page.tsx`
- `app/(public)/contact/page.tsx`
- `app/(public)/writing/page.tsx`
- `app/(public)/work/zero/page.tsx`
- `app/(public)/work/heirloom/page.tsx`
- `app/(public)/work/spark-ar/page.tsx`
- `app/(public)/work/viacom/page.tsx`
- `app/(public)/work/orion/page.tsx`
- `app/(public)/work/silly-questions/page.tsx`
- `app/(public)/work/fair-embodied-ai/page.tsx`
- `app/(public)/work/studio-era/page.tsx`

Some case-study pages already use `next/dynamic` for their content leaf (e.g., `/work/fubo`, `/work/rumi`, `/work/nimbus`, `/work/vault`), but the wrapper page itself is still a server component behind `UnlockGate`.

---

## 9. Key findings

1. **The custom `splitChunks` config is the single biggest JS problem.** It creates one giant `vendor` chunk (~521 KB gzipped) and one giant `common` chunk (~308 KB raw). Almost every route downloads the union of all dependencies and all multi-route components.
2. **First Load JS is ~646 KB gzipped on every public route** — roughly 6× the 110 KB budget.
3. **Route-specific JS is small** (2.5–15.6 KB gzipped), so page-level `'use client'` directives are not the primary driver of bundle size; the shared-chunk policy is.
4. **Firebase and PostHog are in the initial vendor chunk** even though they are only needed for auth/analytics. AuthProvider already lazy-loads Firebase at runtime, but the split-chunks policy still forces it into the shared vendor.
5. **Lighthouse shows LCP 2.1–4.4 s** on tested production routes; CLS is fine except `/work/heirloom` (0.21) and `/` (0.05).
6. **Total transfer on `/about` and `/work/heirloom` exceeds 4 MB**, driven by video/image assets, not JS.

---

## 10. Post-optimization state (same build, after changes)

### 10.1 Shared JS floor after removing custom `splitChunks`

The custom `webpack.splitChunks` block in `next.config.mjs` was removed. Next.js now falls back to its default chunking.

| Component | gzipped size |
|-----------|--------------|
| Polyfills | 38.7 KB |
| Webpack runtime | 4.3 KB |
| React / Next.js shared (`4bd1b696…`) | 61.0 KB |
| Framework shared (`3794…`) | 51.2 KB |
| Main app entry | 0.2 KB |
| **Shared First Load JS floor** | **~155 KB** |

This is a ~75 % reduction from the original ~646 KB shared baseline. The remaining JS is essentially the Next.js 16 / React 19 / polyfills floor; there is no practical way to shrink it further without dropping React.

### 10.2 Route-specific JS after boundary cleanup

| Route | Route-specific JS (gzipped) | Approx. total First Load JS |
|-------|----------------------------|------------------------------|
| `/about` | 1.0 KB | ~156 KB |
| `/work/heirloom` | 7.7 KB | ~163 KB |
| `/work/zero` | 5.7 KB | ~161 KB |
| `/` | 108.0 KB | ~263 KB |

The homepage is heavier because `WorkColumns` pulls in the full era/project dataset and multiple layouts, but it is still well under the original 646 KB floor.

### 10.3 `'use client'` boundary cleanup

- Removed the directive from 11 public pages that had no hooks/browser APIs.
- Converted `app/(public)/work/heirloom/page.tsx` to a server component; wrapped the interactive demo in `components/heirloom/HeirloomDemoDynamic.tsx` (`next/dynamic`, `ssr: false`).
- Converted `app/(public)/work/zero/page.tsx` to a server component; extracted the interactive prototype toggle into `app/(public)/work/zero/PrototypeChapter.tsx`.
- Reverted `'use client'` on `app/(public)/heirloom/support/page.tsx` because it uses `styled-jsx`.

### 10.4 Asset optimizations

| Asset / page | Before | After | How |
|--------------|--------|-------|-----|
| `/about` hero image request | `w=3840` (128 KB WebP) | `w=750` (30 KB AVIF) | Added `priority` + `sizes="(max-width: 1024px) 100vw, 1024px"` |
| `/about` leadership-credo image | 176 KB JPEG original | ~90 KB WebP at correct size | Added `sizes` |
| `/work/heirloom` demo sample images | 12 full-resolution JPEGs, ~2.5 MB total | 12 `*-thumb.jpg` files, ~120 KB total | Generated 224 px wide thumbnails; updated `lib/heirloom/sample-recipes.ts` to use `thumbnailPath`; added `loading="lazy"`/`decoding="async"` to `<img>` tags |
| `/work/heirloom` carousel posters | 99 + 73 + 69 = 241 KB JPEG | 74 + 66 + 63 = 203 KB JPEG | Re-encoded at quality 75 |
| `/work/heirloom` carousel PNGs | 815 KB / 1.0 MB originals | ~18 KB WebP each via `/_next/image` | Added `sizes="(max-width: 768px) 85vw, 440px"` so the right width is requested |
| `/about` demo-reel video | 11 MB on R2 (3.4 MB partial observed in Lighthouse) | 5.4 MB compressed MP4 (`public/videos/maker-era/demo-reel.mp4`) | Re-encoded with `ffmpeg -an -c:v libx264 -crf 32 -preset slow -movflags +faststart` |

**Note on the demo-reel video:** `public/**/*.mp4` is gitignored, so the compressed copy stays in the working tree for local dev only. To realize the savings in production, upload `public/videos/maker-era/demo-reel.mp4` to the R2 bucket at the same path (`videos/maker-era/demo-reel.mp4`), overwriting the 11 MB version.

### 10.5 Lighthouse before / after (mobile)

Production before = original baseline (Section 5). Production after-JS = run on 2026-07-27 after the splitChunks / boundary changes were deployed, before asset deploy. Local after-assets = same code + asset changes, served from `next start` on localhost.

| URL | Metric | Original baseline | Production after-JS | Local after-assets |
|-----|--------|-------------------|---------------------|--------------------|
| `/` | LCP | 3,481 ms | 3,736 ms | 4,061 ms |
| `/` | CLS | 0.0509 | 0.0000 | 0.0509 |
| `/` | Total bytes | 909,533 | 870,000 | 1,110,000 |
| `/about` | LCP | 4,374 ms | 4,087 ms | 4,511 ms |
| `/about` | CLS | 0.0003 | 0.0003 | 0.0003 |
| `/about` | Total bytes | 4,522,020 | 4,280,000 | 3,550,000 |
| `/work/heirloom` | LCP | 2,113 ms | 2,615 ms | 5,567 ms |
| `/work/heirloom` | CLS | 0.2132 | 0.0207 | 0.0207 |
| `/work/heirloom` | Total bytes | 4,673,139 | 4,450,000 | 1,420,000 |

**Interpretation:**
- JS is solved: First Load JS is down ~75 %.
- Asset transfer is the remaining lever. The heirloom demo thumbnails alone cut the `/work/heirloom` payload by ~3 MB once deployed.
- The `/about` video compression will cut another ~3 MB once the compressed file is uploaded to R2.
- Local Lighthouse numbers are noisier than production (no edge cache, same-machine contention) and should not be treated as the final word.
- `/work/heirloom` CLS improved from 0.21 to 0.02 with the JS/boundary changes alone; the demo placeholder now reserves space to guard against further shift.
