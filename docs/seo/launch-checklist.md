# SEO + organic discovery — launch checklist

Step-by-step manual actions to execute after the code-side fixes (committed) land in production. Each step has a check-mark for tracking + a rough time estimate.

---

## Day 1 — get indexed

- [ ] **Google Search Console** — add `rationale.work` as a property (10 min)
  - Verify ownership via DNS TXT record (preferred) or HTML file upload. DNS is at your registrar.
  - Once verified, **submit the sitemap**: `https://rationale.work/sitemap.xml`. Click "Submit." Confirm the success message + the "Discovered URLs" count appears within a day.
  - Run **URL Inspection** on `https://rationale.work/` → "Request Indexing." Repeat for `/about`, `/work/heirloom`, `/work/silly-questions`. This forces Google to crawl within hours rather than days.

- [ ] **Bing Webmaster Tools** — same drill (5 min)
  - Add property at bing.com/webmasters. Import from Search Console (it'll auto-pull).
  - Submit sitemap.

- [ ] **Verify robots.txt + sitemap.xml are live** (2 min)
  - `curl https://rationale.work/robots.txt` — confirms AI crawler allowlist.
  - `curl https://rationale.work/sitemap.xml` — confirms all routes including any /writing/<slug>.

- [ ] **Verify JSON-LD renders** (5 min)
  - Visit https://search.google.com/test/rich-results
  - Test `https://rationale.work/` → expect Person + WebSite + Organization to pass.
  - Test `https://rationale.work/work/heirloom` → expect Article + Breadcrumb.

- [ ] **Verify OG images** (5 min)
  - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
  - Drop in rationale.work + /work/heirloom + /work/silly-questions + /work/zero + /work/spark-ar.
  - Confirm each previews with its own custom OG image (not the generic /og.png).

---

## Week 1 — own the disambiguation

- [ ] **GitHub profile README** (15 min)
  - Create the `RationaleDesignHanson/RationaleDesignHanson` repo if it doesn't exist (name MUST exactly match the username).
  - Copy content from `docs/seo/github-profile-readme.md` into the repo's README.md.
  - Push. Verify the profile card at https://github.com/RationaleDesignHanson now renders the README.
  - Pin the Heirloom + Silly Questions + rationale-public repos (if public) for visibility.

- [ ] **LinkedIn audit** (10 min)
  - First line of headline = the H1 canonical paragraph from the plan (Tier H1, short version): "Designer-engineer. 25 years across animation, mixed-reality, AR platforms (Spark/Orion/FAIR), and AI. Now solo, shipping consumer products with AI as a coding partner."
  - Featured section: add rationale.work, Substack, Heirloom App Store, Silly Questions.
  - Custom URL: confirm `linkedin.com/in/thematthanson` is taken.

- [ ] **Substack about** (5 min)
  - Update bio to the same H1 canonical paragraph (long version).
  - Site link → rationale.work.

- [ ] **Twitter/X bio** (if active, 5 min)
  - Same short canonical bio.
  - URL → rationale.work.

- [ ] **Headshot consistency** (15 min)
  - Pick ONE photo. Use everywhere (LinkedIn, Substack, GitHub, Are.na, Product Hunt, Twitter).
  - Image-similarity is a known Google entity-reconciliation signal.

---

## Week 2 — discovery surfaces

- [ ] **Submit to Maggie Appleton's design-engineers list** (15 min)
  - Use `docs/seo/maggie-appleton-submission.md`. Check her site for current PR vs email process. Submit.

- [ ] **Are.na** (60 min for setup, then ongoing)
  - Follow `docs/seo/arena-strategy.md`. Profile + first 2 channels seeded.

- [ ] **Product Hunt maker profile** (20 min)
  - Use `docs/seo/product-hunt.md`. Set up the maker profile (do this BEFORE launching products).

- [ ] **Sidebar.io submission** (10 min, optional)
  - Once the first canonical essay is published at /writing/<slug>, submit it to https://sidebar.io.
  - Sidebar is a daily-design-links newsletter; an essay-link there drives ~50-200 readers + a backlink.

---

## Week 3-4 — content + launches

- [ ] **Migrate first essay to /writing canonical** (60 min)
  - Pick the highest-value essay (recommend "When to Hire AI" — already linked from homepage).
  - Follow `docs/seo/substack-canonical-workflow.md`.
  - Update homepage's "WRITING · LATEST" section to link to the canonical /writing URL.

- [ ] **Show HN — Heirloom** (5 min to post + monitoring through the day)
  - Use `docs/seo/show-hn-drafts.md`. Post Tuesday/Wednesday/Thursday 7:30-9am PT.
  - Comment within 10 min. Reply to every top-level comment within an hour.

- [ ] **Product Hunt — Heirloom launch** (Tuesday, ~6 hours engaged)
  - Use `docs/seo/product-hunt.md`. Launch at midnight Pacific (Tuesday in PH-time).
  - Post maker comment within 5 minutes.
  - Engage in every comment thread throughout the day.

---

## Week 5-6 — second products

- [ ] **Show HN — Silly Questions** (same drill, ~2 weeks after Heirloom)

- [ ] **Product Hunt — Silly Questions launch** (~3 weeks after Heirloom)

- [ ] **Migrate 1-2 more essays** to /writing canonical

---

## Month 2 — Wikidata + harder discovery

- [ ] **Submit Wikidata entry** (1-2 hours, may take 2-4 weeks to be accepted)
  - Use `docs/seo/wikidata-draft.md`. Submit via wikidata.org. Notability bar exists — patent + Meta press + multiple shipped products is likely enough but not guaranteed.
  - If rejected: don't fight. Cite the rejection in the next-revision attempt; supply external sources.

- [ ] **Audit + claim patent backlinks** (1 hour)
  - https://patents.google.com/?inventor=Matt+Hanson+Meta
  - Confirm any other patents you're co-named on; add them to the /about page Patents section.

- [ ] **Meta Newsroom audit** (30 min)
  - Search https://about.fb.com/news/ for any press release mentioning your name. Add each to /about Press.

- [ ] **F8 / Connect speaker pages** (30 min)
  - Search archive.org for archived F8 speaker pages where you were listed. Link from /about.

- [ ] **Conference / podcast appearances** (15 min/each)
  - Beyond Sendfull, any others? Each external mention adds a co-citation point.

---

## Month 3+ — maintenance

- [ ] **Weekly: check Search Console**
  - "Performance" tab → impressions, click-throughs, top queries.
  - "Pages" tab → indexed pages count should be growing.
  - "Coverage" tab → no "Crawled but not indexed" surprises.

- [ ] **Monthly: write + canonical-publish 1-2 essays**
  - Follow the Substack canonical workflow.
  - Each new essay targets one of the uncontested long-tail queries (H5 in plan).

- [ ] **Monthly: Are.na 30 min** — add blocks, contribute to other channels.

- [ ] **Quarterly: backlink audit** (free Ahrefs / Moz spot-check)
  - Look for new backlinks. Reach out to anyone linking you with a "thanks + here's something else of interest" follow-up. Compounds slowly.

---

## Tracking the win

The signals worth watching:

1. **Site: query**
   ```
   site:rationale.work
   ```
   Today: 0 results (audit confirmed). Target: 20+ within 30 days; 40+ within 60.

2. **Name + disambiguator query**
   ```
   "Matt Hanson" Meta Spark AR
   ```
   Today: not in top 3. Target: top 3 within 30 days; top 1 within 90.

3. **Knowledge Graph**
   - Search "Matt Hanson designer engineer" — does a knowledge panel appear on the right side of Google results?
   - If yes (sometime in months 2-3), all the Tier H work paid off.

4. **AI search**
   - In ChatGPT, ask: "Who is Matt Hanson, the ex-Meta designer building consumer products with AI?"
   - Today: probably gets it wrong or refuses. Target by month 3: cites rationale.work directly with the disambiguation paragraph.

5. **PostHog dashboard at /owner/engagement**
   - `traffic_source` distribution should diversify away from `direct`.
   - `outbound_click` events with `cta_type=press` confirm the patent + Meta links are being engaged.
   - Search Console impressions correlate with PostHog organic-traffic growth.

The plan has a 60-day arc for substantial change. The compounding (Knowledge Graph, LLM-search citations) takes 90-180 days. Don't expect Month-1 metrics to validate the whole strategy.
