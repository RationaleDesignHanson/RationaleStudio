# Wikidata entry — draft

Wikidata is the structured-data spine behind Google's Knowledge Graph and a major reference source for LLM entity resolution (ChatGPT, Perplexity, Claude). A Wikidata entry, if accepted, is the single highest-leverage discovery asset on the SEO plan.

**Notability bar**: Wikidata items must meet at least one of three criteria — (1) referenced in another Wikimedia project (Wikipedia article exists), (2) the subject is referenced in publicly accessible authority files, or (3) the subject fulfills a structural need (e.g., common reference for other items). Matt's plausible angles:

- **Patent inventor** — US11295503B1 (Meta Platforms) creates a USPTO authority record. This is structural; many patent inventors have Wikidata entries.
- **Notable creative/designer at a notable company** — design lead on Orion (Meta's first true AR glasses) is a structural reference for the Orion article.
- **Conference speaker** — F8 keynote work creates archive.org / Meta press citations.

Honest estimate: **50% chance of acceptance on first try**. If rejected, the rejection feedback tells you what's missing (often: another secondary source citing the work). Iterate and resubmit.

---

## How to submit

1. Go to https://www.wikidata.org and create an account (the same handle as elsewhere — `mhanson` or similar).
2. Click "Create a new Item." Wikidata may prompt for a draft existing-item check first — search "Matt Hanson designer" to confirm there's no existing entity that should be merged with instead.
3. Fill in the labels, descriptions, and aliases:
   - Label (en): `Matt Hanson`
   - Description (en): `American designer-engineer working in augmented reality, AI, and experiential systems`
   - Aliases: `Matthew Hanson` (if applicable); `M. Hanson`
4. Add statements (one by one — Wikidata's editor walks you through). Each statement requires a **reference** for non-trivial claims. References below.
5. Click "Save."
6. After saving, the URL becomes `https://www.wikidata.org/wiki/QXXXXXXX` — note the QID. Add it to rationale.work's Person JSON-LD `sameAs` field.

If a reviewer marks the item for deletion: don't fight. Read the rationale. Most rejections cite "no reliable secondary sources." The fix is usually to gather 2-3 external press mentions (Meta Newsroom, podcast appearances, conference speaker listings) and add them as references on the relevant statements.

---

## Statements + references to include

### Identity statements

| Property | Value | Reference |
|---|---|---|
| `instance of (P31)` | `human (Q5)` | (no reference needed) |
| `sex or gender (P21)` | (Matt's call) | |
| `country of citizenship (P27)` | (Matt's call) | |
| `name in native language (P1559)` | Matt Hanson | |
| `given name (P735)` | Matt | |
| `family name (P734)` | Hanson | |

### Occupation + employment

| Property | Value | Reference |
|---|---|---|
| `occupation (P106)` | designer (Q5322166), product designer (Q3387723), software engineer (Q11691) | rationale.work |
| `employer (P108)` | Meta Platforms (Q380), with `start time (P580)` 2017 and `end time (P582)` 2025 | LinkedIn, Meta Newsroom Orion press |
| `employer (P108)` | Framestore (Q5455048), with `start time (P580)` 2017 and `end time (P582)` 2017 | rationale.work/work/framestore |
| `employer (P108)` | Viacom (Q1112881), with `start time (P580)` 2015 and `end time (P582)` 2017 | rationale.work/work/viacom |

### Notable works + creations

| Property | Value | Reference |
|---|---|---|
| `notable work (P800)` | Spark AR Platform (need to find QID, create if missing) | F8 archive, Meta developer docs |
| `notable work (P800)` | Orion AR glasses (Q-find) | Meta Newsroom Orion launch press |
| `notable work (P800)` | FAIR Motivo (Q-find or create) | https://ai.meta.com/research/publications/motivo/ |
| `notable work (P800)` | Heirloom Recipe Box | App Store ID 6759019723, rationale.work/work/heirloom |
| `notable work (P800)` | Silly Questions | silly-questions.com |
| `inventor of (P61)` | US11295503B1 (need to add patent QID — patent items exist as Q-items) | https://patents.google.com/patent/US11295503B1 |

### Web identifiers

| Property | Value |
|---|---|
| `official website (P856)` | https://rationale.work |
| `LinkedIn personal profile ID (P6634)` | thematthanson |
| `GitHub username (P2037)` | RationaleDesignHanson |
| `Substack ID (P12260)` | rationaledesign |
| `Twitter username (P2002)` | (if applicable) |
| `Product Hunt user ID (P9275)` | (post-launch) |
| `Are.na user ID` | (no Wikidata property yet — skip) |

### Education

If Matt has notable schooling worth listing (RISD, SVA, undergrad alma mater), add:

| Property | Value | Reference |
|---|---|---|
| `educated at (P69)` | (institution) | LinkedIn |

---

## Reference URLs to gather (do this before submitting)

Wikidata expects each notable claim to have at least one reference. Collect URLs for each before opening the Wikidata editor:

- [ ] Meta Newsroom Orion announcement: https://about.fb.com/news/2024/09/introducing-orion-our-first-true-augmented-reality-glasses/
- [ ] Meta AI Research Motivo paper: https://ai.meta.com/research/publications/motivo/
- [ ] Patent: https://patents.google.com/patent/US11295503B1
- [ ] App Store Heirloom: https://apps.apple.com/app/id6759019723
- [ ] Sendfull podcast: https://sendfull.substack.com/p/ep-92-how-a-design-leader-turned
- [ ] Any conference speaker listings (F8 archive on archive.org if originals are dead)
- [ ] rationale.work itself (acceptable as a primary source for identity statements)

The denser the reference list, the more likely first-pass acceptance.

---

## After acceptance

1. **Add the QID** to `lib/seo/jsonld.ts` PERSON_SAMEAS array:
   ```ts
   `https://www.wikidata.org/wiki/Q<your-qid>`
   ```
2. **Confirm on Google** after 4-6 weeks: search "Matt Hanson designer engineer" and look for a Knowledge Panel on the right side of search results. If one appears, all the disambiguation work paid off. If not, the Wikidata entry is still helping LLM retrieval (ChatGPT + Perplexity surface Wikidata entries directly).
3. **Maintain it** — when Matt ships a new product, edit the Wikidata item to add it under `notable work`. Wikidata stays accurate, your Knowledge Graph stays accurate.

---

## Risk

The main risk is **someone else editing your Wikidata entry incorrectly**. Wikidata is open. Set up a watchlist on the item once accepted so you get notified of any edits. Most edits will be improvements; revert anything malicious.

The other risk is **rejection escalating to "delete"**. If a reviewer thinks Matt isn't notable enough and proposes deletion, defend the item with the reference list above + the Orion + patent claims (both are structural). Wikidata deletion is rare and reversible.
