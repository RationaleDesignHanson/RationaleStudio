# Cross-profile identity alignment

The disambiguation strategy (Tier H6 in the SEO plan) hinges on **every external profile carrying the same bio, the same photo, and links to every other profile**. Search engines + LLMs use this consistency as the cluster signal that says "these accounts all point to the same person."

Below: drafted copy for each profile, plus a one-time audit checklist.

---

## Master bio (long — 580 chars)

Use on: LinkedIn About section, Substack About page, GitHub README, rationale.work `/about` page, any guest-author bylines.

> Matt Hanson — designer-engineer working across AR, AI, and experiential systems for 25 years. Animation and creative direction at Psyop, Imaginary Forces, Buck, and Hush. VR/AR pitchwork at Framestore. Screen content direction at Viacom and MTV. Eight years at Meta leading product design across Spark AR (creator platform), Orion (consumer AR glasses), and FAIR Embodied AI (SIRo, Motivo). Now shipping consumer iOS apps solo with AI as coding partner — Heirloom, Silly Questions, Zero, Nimbus.

## Master bio (short — 145 chars)

Use on: Twitter/X bio, LinkedIn headline, Product Hunt tagline, Are.na bio, any 160-char-limited surface.

> Designer-engineer. 25 years across animation, mixed-reality, AR platforms (Spark/Orion/FAIR), and AI. Now solo: Heirloom, Silly Questions, Zero.

## Master bio (tiny — 80 chars)

Use where even the short bio doesn't fit.

> Designer-engineer · ex-Meta (Spark AR, Orion, FAIR) · now solo: Heirloom, Silly Q.

---

## Profile-by-profile

### LinkedIn — linkedin.com/in/thematthanson

- **Headline:** Designer-engineer · ex-Meta (Spark AR, Orion, FAIR) · now solo: Heirloom, Silly Questions, Zero
- **About:** Master bio (long)
- **Experience entries:** verify each is titled in a way the canonical bio matches — e.g., "Senior Product Design Manager · Spark AR · Meta · 2017-2023" not just "Designer · Meta"
- **Featured section** (top of profile): pin rationale.work, Heirloom (App Store link or marketing site), the Sendfull podcast episode, Substack
- **URL:** keep `linkedin.com/in/thematthanson` custom URL — it's already disambiguating
- **Profile photo:** the canonical headshot

### Substack — rationaledesign.substack.com

- **Publication About page:** Master bio (long)
- **Personal profile bio:** Master bio (short)
- **Subdomain:** stays `rationaledesign` — it's the established subscriber URL, don't break it
- **Site/URL field on profile:** https://rationale.work — critical, this is the canonical link

### GitHub — github.com/RationaleDesignHanson

- **Username:** stays `RationaleDesignHanson` for continuity (don't rename — breaks every existing repo URL)
- **Profile README:** see `docs/seo/github-profile-readme.md`
- **Profile bio (the one-liner above the README):** Master bio (tiny)
- **Pinned repos:** Heirloom + Silly Questions + rationale-public if public
- **Profile photo:** canonical headshot

### Product Hunt

- **Profile URL slug:** `matthanson` or `thematthanson` (check availability)
- **Headline:** Master bio (short)
- **Bio field:** Master bio (long)
- **Links:** website (rationale.work), Twitter, LinkedIn, GitHub, Substack — ALL of them
- **Profile photo:** canonical headshot

### Are.na

- **Username:** `matt-hanson` or `mhanson`
- **Bio:** Master bio (short)
- **Website link:** rationale.work
- **Avatar:** canonical headshot

### Twitter / X (if active)

- **Display name:** Matt Hanson
- **@handle:** @thematthanson if available, else @matthansonAR or @matthanson_xyz
- **Bio:** Master bio (tiny)
- **Pinned tweet:** link to rationale.work with a short intro

### Wikidata (if accepted — month 2+)

- **Statements** (all required for entity-resolution lift):
  - `instance of` → human
  - `occupation` → designer; software engineer; product designer
  - `employer` → Meta Platforms (start 2017, end 2025); Framestore (2017); Viacom (2015–2017)
  - `educated at` → (if Matt has notable education to list)
  - `notable work` → Heirloom Recipe Box, Silly Questions, Spark AR, Orion, FAIR Embodied AI
  - `country of citizenship` → (Matt's call to include)
  - `inventor of` → patent US11295503B1
  - `official website` → rationale.work
  - `social media identifier` → all the profiles above

---

## One-time audit checklist

Run through this in one sitting (~45 min):

- [ ] LinkedIn headline matches short bio verbatim
- [ ] LinkedIn About section matches long bio verbatim
- [ ] LinkedIn Featured section links rationale.work + Heirloom + Substack
- [ ] Substack About page matches long bio verbatim
- [ ] Substack profile site link → rationale.work
- [ ] GitHub profile README matches `docs/seo/github-profile-readme.md` verbatim
- [ ] GitHub profile bio = tiny bio
- [ ] Product Hunt maker bio + profile = long bio + all links
- [ ] Are.na profile = short bio + rationale.work link + canonical avatar
- [ ] Twitter/X bio = tiny bio + rationale.work
- [ ] **All avatars are the same photo** (Google entity reconciliation uses image-similarity)

---

## Why verbatim consistency matters

Search engines and LLMs do not parse personal sites. They cluster identity signals.

If LinkedIn says "AR designer at Meta," GitHub says "Solo iOS founder building with AI," and Substack says "Designer who writes about software" — three different framings — the algorithms have to *infer* it's the same person. They sometimes get it wrong, especially when there are other people with the same name.

If all three surfaces say "Matt Hanson — designer-engineer working across AR, AI, and experiential systems… eight years at Meta… now shipping iOS apps solo with AI" — verbatim — the clustering is mechanical. The cost of inferring drops to zero. The other Matt Hansons stop showing up in any disambiguating query.

This is one of the cheapest, highest-leverage moves on the plan. ~45 minutes of copy-paste + one good photo replaces months of authority-building.
