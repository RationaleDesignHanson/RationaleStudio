# Are.na strategy

Are.na is a taste-graph not a backlink farm. The discovery value here isn't link juice (it's nofollow) — it's **co-citation in curated channels** that designers, founders, and AR/AI practitioners actually scroll.

If you're connected to / referenced by the same set of channels as Andy Allen, Maggie Appleton, Brian Lovin, etc., you get included when people ask "who's adjacent to this person" — both in Are.na's UI and in LLM-indexed crawls.

**Time investment:** ~30 min/week for 8 weeks to seed, then 10 min/week to maintain. After that, Are.na's network effect does the work.

---

## Profile setup

**Username:** `matt-hanson` or `mhanson` (whatever's available; consistent with other profiles)

**Display name:** Matt Hanson

**Bio:**
> Designer-engineer. 25 years across animation, mixed-reality, AR platforms (Spark/Orion/FAIR), and AI. Now solo, shipping consumer products with AI as a coding partner.

**Profile link:** https://rationale.work

**Avatar:** Same headshot as LinkedIn / Substack / GitHub (consistency is the disambiguation signal).

---

## Channels to create (4-6 to start)

Pick channels that double as **content briefs** for future essays + as taste-graph nodes for connection.

### 1. "Designer-engineering with AI as partner"

**Description:** Notes, examples, and arguments for the design-engineer practice when AI is a real collaborator rather than a tool. The post-Heirloom workflow. The trust ceiling. CLAUDE.md as load-bearing artifact.

Seed with: links to relevant essays (Maggie Appleton, Andy Matuschak, Geoffrey Litt), screenshots from Heirloom dev, the Sendfull podcast episode.

### 2. "AR after the hype"

**Description:** Honest notes on where AR actually works, where it doesn't, and what the next-generation hardware (Orion, Apple Vision Pro, smart glasses) changes about the practice. Drawing on 8 years at Spark + Orion.

Seed with: Meta Orion press, Apple Vision Pro reviews, Tim Holman's spatial UI experiments, Niantic visual SLAM papers.

### 3. "Mixed-reality installations I'd still ship"

**Description:** Pre-AR mixed-reality work from the Studio Era — the Tilt Brush installation at the White House, projection-mapping pieces, screen-content for Viacom. The aesthetic + spatial-thinking through-line into AR.

Seed with: archive.org captures of past installations, related artists/studios, Outrage Machine billboard references.

### 4. "The indie-iOS playbook (2025+)"

**Description:** What's actually working for solo iOS developers right now — pricing, AI-assisted shipping, App Store positioning. Anti-playbook items are equally welcome.

Seed with: Pieter Levels' writing, Marc Lou's posts, Andy Allen's notbor.ing, Federico Viticci on AI-first iOS apps.

### 5. "Essays I keep returning to" (general)

**Description:** A reading list that's not topic-specific — pieces that have stuck with me across years.

Seed with: 10-15 longform pieces from Substack, Maggie Appleton's Garden, Andy Matuschak's notes, Ben Thompson's Stratechery.

### 6. (Optional, ~month 3) "Hanson Scope — the diagrams I draw"

**Description:** Diagramming framework from the Spring 2022 portfolio (per memory). Each entry is one diagram + 50-100 words of context.

Seed with: 3-4 reconstructed diagrams from past portfolios, drafted as Are.na blocks.

---

## Channels to follow + contribute to

**Follow** (gets you into the network's algorithmic graph):

- Andy Allen's channels (notbor.ing maker)
- Maggie Appleton's channels (her Garden seeds many)
- "Design Engineering" (search; multiple curated channels exist)
- "Spatial computing"
- "Indie hackers"
- "Designer founders"
- "AI tools for designers"

**Connect** (block your blocks INTO theirs — that's how Are.na's graph forms):

- Look for channels named "Solo founders," "AI-assisted development," "AR / spatial," "Design Engineering."
- For each, contribute 2-3 of your own blocks (links to your case studies, essays, or curated finds).
- Aim for ~30 cross-channel contributions in the first 2 months. After that, the network does the work.

---

## What to put in each block

Are.na blocks can be: link, image, text, attachment, or another channel. The best blocks for **discovery** are:

- **Link** to a rationale.work case study with the canonical title + your 1-sentence framing as the block title.
- **Image** with a project screenshot + caption that contains keywords from H5 in the SEO plan (e.g., "Spark AR Orion FAIR design").
- **Text** with a short essay extract (200-400 words) + link back to the canonical essay.

Avoid: bare URLs without context, low-effort screenshots, anything not connected to the rest of your channels.

---

## Cadence

- **Week 1:** Profile setup, create channels 1-2, seed each with 10-15 blocks.
- **Week 2:** Create channels 3-4, seed.
- **Week 3:** Create channel 5, seed.
- **Week 4-8:** 2-3 blocks/week, mostly cross-contributions to other people's channels.
- **Month 3+:** 10 min/week — drop in new finds, no pressure to grow.

---

## How to measure

- **Connections** — Are.na shows "X people are connected to your channels." Healthy growth: 1-3/week after month 1.
- **Inbound block adds** — when other people add your blocks to their channels. The strongest signal.
- **Profile views** — Are.na shows them. Spikes correlate with HN, PH, Substack drops.
- **Backlink referrals in PostHog** — `outbound_click` events with `traffic_source: are.na` (the existing TRAFFIC_SOURCE_ALIASES map handles this if `are.na` is in the list — check `components/analytics/PostHogProvider.tsx`. If not, add it.)

---

## Why bother

Are.na is the closest thing the design-engineering world has to a curated knowledge graph. Being a visible node — with channels that read as "this person thinks carefully about $topic" — gets you cited when researchers, journalists, and LLM training sets scrape the design web for who's serious about what.

Cost is low (~30 min/week early on). Compound is real but slow (3-6 months before it lifts discovery).
