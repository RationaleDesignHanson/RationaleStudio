# Blank — build log

**What it is.** A password-gated collaborative tool at `/work/blank` for two people to
design a streetwear line together — name it, draw the identity, spec the styles, cost
it honestly, and look at the result. Not a public product. Two users, one shared
password, no accounts.

**Status at close of this log:** live at `https://rationale.work/work/blank`, main at
`5cf7fb6`, 69 Blank commits over five days (2026-08-07 → 2026-08-11), 73 files, ~16,000
lines, 339 tests passing.

**Raw history.** The complete session transcript — every prompt, every tool call, every
verification run — is at
`~/.claude/projects/-Users-matthewhanson-Developer-skreet/22baeb13-28a1-4d5b-b8e1-3a290bcc5df6.jsonl`
(63 MB). This document is the readable account; that file is the record.

---

## 1. The shape of the thing

Seven beats, navigated by a horizontal strip rather than a numbered checklist:

| Beat | Screen | What is decided |
|---|---|---|
| 01 | Name | The word, its treatment, and which business you are in |
| 02 | The graphic | The house mark, or the catalogue of front prints |
| 03 | Colour | The palette, costed, rendered on actual cloth |
| 04 | Applied | Artwork at honest scale on each garment |
| 05 | Direction | The aesthetic the renders inherit |
| 06 | Costs | The cost sheet, specced style by style |
| 07 | The line | Lookbook, spec, sell-through, channel, where to order |

### Two businesses, chosen first

The single most consequential decision, and it is taken on 01 before anything else:

- **Small batch** — few designs, deep runs, higher margins, cash up front.
- **High scale** — many variants, shallow runs, made to order, thinner margins.

These are not presentation modes. They fork the costing, the fulfilment comparison, the
artwork model and the readiness rules. "High scale is really how many *variants*, not how
many places" — region is one axis of variation among several.

### Stack

Next.js 16 App Router · React · TypeScript · Tailwind v4 (`@theme inline`) · Supabase
(Postgres + Storage) · Replicate · Vitest · Playwright.

Models, by job:
- `google/imagen-4` — text-to-image (garment renders, place graphics)
- `bytedance/seedream-4` — image-to-image (drawn wordmarks and marks, lookbook, worn photo)
- `claude-opus-5` — reference analysis

### Data

| Table | Holds |
|---|---|
| `blank_renders` | Every generated image, keyed by a tuple, with the prompt |
| `blank_lines` | The document: `LineConfig` + SKUs as JSONB, with a `version` |
| `blank_line_revisions` | Append-only history, pruned to the most recent 100 per line |

RLS is on with **no policies** — service-role only, written from route handlers gated on
the unlock cookie. The anon key can neither read nor write.

Concurrency is optimistic, not CRDT. A save carries the version it was based on; zero
rows affected means the other person got there first, and that is a 409 with a diff
rather than a silent overwrite. Two people making chunky edits — pick a colour, set a
price — do not need character-level merge, and Yjs or Automerge would be a large
dependency buying nothing.

---

## 2. How it got here

### 08-07 — the first cut
`f2569dd` … `2e86040`

A line-configuration tool with deviation renders. Flux 1.1 Pro swapped for Imagen 4
within the hour. Decoration split from twelve fixed graphics into independent axes,
which took the space from 12 combinations to roughly 48,000. Uploaded references
applied to garments via Seedream 4. Editable retail and real per-IP limits.

### 08-08 — the flow finds its order
`ad783f5` … `84de419`

The heaviest day. Renders persisted to Storage, because the cache was decaying to 404s
and the tool was quietly re-buying images it had already paid for. Wordmarks arrived:
type any word, see which of twelve treatments it can actually be made in. The page
became a stepper — one beat per screen.

Then the order changed four times in a single afternoon (`eeb2c98`, `b272be8`, `7a33788`,
`c32e7a7`, `02c3330`) before settling on **name → look → mark → applied → costs**. That
churn was the flow being found rather than designed, and the commits are honest about it.

The costing beat became a cost sheet specced style by style. Two of my own bugs made the
lockup options unselectable (`8cc83f5`).

**"Why are things refusing prompts? Isn't this a generative collaboration tool?"** — the
guardrails were tuned for a public surface. This is two people behind a password. Fixed
in `e01905f`.

### 08-09 — honesty passes
`510754c` … `7cc31b5`

Mobile. Then two corrections that were the same kind of error:

- **Applied scale was a fake.** The mark rendered at 187×150px on the tee, the hoodie
  *and* the cap — three different garments, one hardcoded size. Replaced with
  `GARMENT_SCALE`, derived from real inches over real garment width.
- **The mark sat *over* the cloth, not *in* it.** "Not composite but just layered over."
  Fixed by compositing into the fabric.

The catalogue engine landed — a place, a voice, six takes — with the constraint that
**image models cannot spell**. A sign panel comes back deliberately blank and the place
name is set into it in live type. A misspelling you would catch once is a misspelling you
would ship ninety-nine times in a hundred-place catalogue.

Two review passes found real errors, including several of mine (`c8fe523`).

### 08-10 — v2, and the economics get serious
`b1d855a` … `30dfe07`

The defragmentation pass, then the substance:

- **Two generative paths were burning money silently.** See §4.
- **Colour became real** — costed, instant, and rendered on actual cloth via procedural
  fabric (weight, knit and dye driving a colour shift and a CSS texture).
- **Colourways per style, and a size run** (S10 / M25 / L30 / XL25 / XXL10).
- **Durable lines** — the URL now *identifies* the document instead of *containing* it.
- **Sell-through** — see §3.
- **Make-to-order vs buying ahead**, as a switch, because it is the decision.
- **Keystone pricing** (4.5× landed cost) as a *diagnostic*, not a rule.

And a run of UX corrections driven directly by the user testing on device — see §5.

### 08-11 — the artwork model
`5cf7fb6`

The last bug of the session, and a structural one. See §6.

---

## 3. Decisions worth keeping

**Revenue is what you SELL, not what you make.** Every revenue figure was
`retail × everything made` — no markdown, no carryover, nothing unsold. A plan to make
300, sell 170 at list, 60 at half and sit on 70 was reporting a 79% margin business. The
default is now 60% at list, 25% at 40% off, and the rest never moves. The number the
model exists to produce is **cash sitting in unsold stock** — margin percentages are
comfortable and abstract; "there is $9,400 of this in boxes" changes a decision.

**Confidence is stated.** Sell-through is a property of your customers, not your garment.
POD prices are Printful-class list prices before volume discount. Both are labelled soft
and both should be replaced by your own numbers after one season.

**Defaults are not decisions.** Eleven fields have truthy defaults, so anything claiming
something is *settled* asks `isSet()` — which consults a `chosen` list — rather than
testing the value. Consequences (a budget implied by picking a business, a sign type size
auto-fitted to a place name) go through `setImplied` and are not recorded as choices.

**The mark is the house identity; the graphic is the front print; budget is a
consequence.** This is the user's framing and it reorganised beat 02.

**No production-method assertion at the mark beat.** The line used to read "8 of 8 can be
made in DTF at $3k". How a thing is printed is decided style by style on the cost sheet,
and a tee can carry different decoration from the hoodie — so there is no single answer to
state there. (The term "DTF" was also replaced with plain language: say what a method
*is*, not what the trade calls it.)

---

## 4. Bugs, including mine

Recorded because the pattern matters more than the individual fix: **the errors that
survived longest were the ones that flattered the feature I had just built.**

| Bug | Consequence |
|---|---|
| **Function timeout hole** | `netlify.toml` caps functions at 26s; routes waited 55–60s. Renders were billed, killed, and *invisible to the spend guards*. Reduced to 18s, and spend is now recorded on timeout. |
| **White-ground wordmarks** (mine, shipped) | `wordmark`/`mark` came back on white while `graphic`/`place` came back on black. The `screen` blend over white washed the entire garment white. Unified every artwork kind to a black ground. |
| **Grey rectangle around place graphics** | The generated panel carried its own background. Fixed with a pure black ground plus `screen`. |
| **Colourway vocabulary mismatch** | `PALETTES` ids did not match `COLORWAYS` keys, so 5 of 6 first-round tiles were unrenderable. `COLORWAYS` is now derived from `PALETTES`, with a `resolveColorway` alias layer. |
| **My retail ratios were wrong** (review caught) | Cap at 0.95 placed it *below* the tee and pushed cap-at-tonal under the floor; hoodie at 2.6 gave $210 for a stock blank, above the $225 cut-and-sew hero. Replaced entirely with keystone-from-cost. |
| **`purchaseBand` overstated colourway cost** | Wrong in my own feature's favour — distributors aggregate across colours. Corrected, and the test that asserted the old behaviour was rewritten. |
| **Junk rows** | Every page load wrote a row; seven accumulated. Fixed by seeding the save baseline after hydration. |
| **Nearly deleted the user's work** | My "junk = v1 + unsigned" rule was wrong — a genuine single edit lands there too. Checked before deleting, found `Chungus` and `dB0LANK` were real. Deleted only my six test rows. |
| **Production never worked** | `NEXT_PUBLIC_SUPABASE_URL` was absent from Netlify entirely, and `SUPABASE_SERVICE_ROLE_KEY` was stored with **three embedded spaces** (222 chars vs 219). CLI display-wrapping nearly masked it; reading the value back through the API proved it. |
| **`@theme inline` emits no runtime custom properties** | `var(--font-mono)` resolved to nothing, the declaration died, and text silently inherited — data was rendering in serif. |

**Two verification lessons.** Case-sensitive Playwright assertions produced repeated false
negatives against CSS-uppercased text. And an element can be present in the DOM and
invisible — the fix in §6 was found "working" by a text-count assertion while sitting
inside a closed disclosure.

---

## 5. What the user changed

Direct quotes, because the corrections were sharper than my proposals:

- *"The UX is shit. The 'next: tick some styles' makes users miss all the actions on the
  page, and name it has a field next to it which is not editable."*
- *"Calls to action like 'next tick some styles' should not come before the actions that
  supersede it."* → CTAs moved below the work.
- *"The checklist steps should not be a vertical list at the top of every screen — that
  doesn't make sense for navigation."* → became a horizontal strip, 43px desktop / 65px
  mobile, no numbers, short labels.
- *"The 'which business' needs to be dramatically condensed — small batch, or high scale.
  One line of explanation beneath. We don't need a book."*
- *"Small batch and high scale can be one row instead of 2 stacked."*
- *"High scale is really how many variants, not how many places. Region is but one way."*
- *"I don't think the typography hierarchy and information architecture are jiving yet."*
  → one type scale: `.b-h` / `.b-body` / `.b-data` / `.b-label` / `.b-note`.
- *"I don't think colour is translating through the product, or that the generated images
  are either."* → both were true.
- *"The final page should be a lookbook with costing after the user makes all the
  decisions."*
- *"I refreshed and I have a lot of decisions being remembered — I think we need a restart
  button."*

Standing constraints for this tool:

> "It is for me and 1 other person and I am not worried about misuse."
> "I don't need to give them access to anywhere else on my site or share the link."

---

## 6. The last fix — three artwork slots

**The report:** *"When I generate an image on the first page, it does not carry through to
the second page and is borderline useless. It should trickle through and probably would
even supplement the other pages."*

**The cause.** Four generators wrote one slot. `WackyWordmark`, `MarkFamily`,
`GraphicBakeoff` and `PlaceGraphics` all called `set('customGraphic', url)`. Four
different kinds of object in one box, so keeping any of them silently threw away the
last. Generate a wordmark, walk to the next screen, keep anything — the wordmark was gone
without a word.

**The fix.** They are not the same kind of thing:

- **wordmark** — the name, drawn
- **mark** — the symbol; the house identity, at the neck of every piece
- **graphic** — the front print; changes per style, per variant, per drop

Three slots, plus a `frontPrint` pointer for what is on the chest, plus one `frontArt()`
resolver that every consumer asks instead of reading a raw field. The resolver falls back
through the slots rather than showing a blank garment, and still reads `customGraphic`
last so lines saved before the change keep working. Keeping is a single `keepArt` action
rather than four independent call sites — four call sites is exactly how they diverged.

Per-variant front prints came with it. A catalogue is a print *per place*; one image
serving twenty-four of them is one product with a big number beside it. `designs` remains
the *planned* count and the shelf states how many have actually been drawn — "1 drawn of
4 planned" — so the gap is visible rather than assumed away.

**The near-miss.** The inherited-wordmark strip first went into `MarkFamily`, which on the
catalogue path sits inside a *closed disclosure*. Playwright reported the text present;
`isVisible()` reported `false`. A fix you have to open a disclosure to find is not a fix,
so the catalogue path got its own strip above the fold.

Verified end-to-end by seeding a line with the new slots and driving the real UI at
1200px and 390px: the wordmark appears on 02, carries onto three garments on **Applied**,
and lists on the final page.

---

## 7. Unfinished

- **`frontPrint` has no UI.** It is set automatically — keeping a graphic points the chest
  at it, and the resolver's fallback covers the rest. You cannot currently say "put the
  wordmark on the chest even though I have a graphic."
- **Sell-through and POD figures are planning defaults**, labelled soft. Replace with real
  numbers after a season.
- **`who` is a device, not a person.** One initial in `localStorage`. If you both use the
  same laptop it is wrong until someone changes it.
- **A short id is not a capability.** `/work/blank?l=<id>` is gated by the unlock cookie,
  not by the id being unguessable.

---

## 8. Operating notes

- Password: the shared vault password (`UNLOCK_PASSWORD`), plus per-scope override
  `UNLOCK_PASSWORD_<SCOPE>`. Cookie is `unlock`, signed with `UNLOCK_SECRET`.
- Netlify function timeout is **26s**; render routes budget 18s and record spend on
  timeout. Do not raise the route budget without raising the platform cap first.
- Env vars live in Netlify. **Read them back through the API, not the CLI display** — a
  value with embedded whitespace looks correct when the terminal wraps it.
- `npx vitest run` — 339 tests. `npx next build` before any deploy.
