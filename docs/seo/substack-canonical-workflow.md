# Substack canonical workflow

**Strategy:** publish first on rationale.work/writing/&lt;slug&gt;; cross-post to Substack with a `rel="canonical"` block pointing back. SEO authority and entity-clustering accrue to rationale.work; Substack continues to drive subscriber growth and distribution.

This is the playbook Andy Allen, Emil Kowalski, Paco Coursey, and Marc Lou all use — none host the canonical version of their essays on Substack.

---

## How Substack handles canonical (it's a workaround)

Substack doesn't expose a native "canonical URL" field. The workaround: add an **HTML block** at the **top** of every cross-posted Substack essay containing the canonical link tag. Google reads `rel="canonical"` from the post body markup; Substack passes it through.

The canonical block is invisible to readers (it's empty HTML other than the link tag) and Substack doesn't strip it.

---

## Workflow per essay

### 1. Write + publish on rationale.work first

1. Add the essay to `content/writing/posts.ts`:
   ```ts
   {
     slug: 'when-to-hire-ai',
     title: 'When to Hire AI — the longer version',
     description: '...',
     publishedAt: '2026-05-15',
     substackUrl: 'https://rationaledesign.substack.com/p/when-to-hire-ai-the-longer-version', // fill after cross-post
     tags: ['ai', 'building-solo', 'design-engineering'],
     body: <>...JSX or imported component...</>,
   }
   ```
2. Verify locally: `npm run dev` → `http://localhost:3000/writing/when-to-hire-ai`.
3. Commit + push. The route, sitemap entry, and OG image all auto-generate.
4. After deploy: confirm `https://rationale.work/writing/<slug>` is live + indexed in Search Console.

### 2. Cross-post to Substack with canonical block

1. In Substack composer, paste the essay body.
2. **At the very top** of the post, add an HTML block with this content (Substack composer: `/html` for raw HTML, or use the "embed" → "HTML" option depending on plan):

   ```html
   <link rel="canonical" href="https://rationale.work/writing/when-to-hire-ai">
   ```

   Replace the slug per-post. Make sure this is in the **post body**, not the post header — Substack header HTML is stripped.

3. **At the bottom** of the Substack post, add a footer block:

   ```
   This essay was originally published at rationale.work/writing/when-to-hire-ai. Subscribe here on Substack for new pieces twice monthly; the canonical archive lives at rationale.work/writing.
   ```

   This gives readers the link back AND functions as an HTML anchor link Google reads as a "go to canonical" signal.

4. Publish on Substack.

5. **Update the `substackUrl` field** in `content/writing/posts.ts` with the live Substack URL so the rationale.work page surfaces a "Read on Substack" link in its footer. Commit + push.

### 3. Search Console verification (one-time, then check monthly)

After ~2 weeks:

1. Google Search Console → URL Inspection on `https://rationale.work/writing/<slug>`.
2. Check "Indexed" status. Should be "URL is on Google."
3. Click "View crawled page" → see the rendered HTML. Confirm `<link rel="canonical">` appears in the head.
4. Search Google for an exact phrase from the essay (in quotes). Both versions may appear in initial results — the canonical link tells Google which to surface long-term. If after 30 days the Substack version still outranks, something's wrong with the canonical wiring on Substack — re-check the HTML block.

---

## Backfill — migrating existing Substack essays

Audit your Substack archive (`rationaledesign.substack.com/archive`). Each existing essay falls into one of three buckets:

**Tier 1 — Migrate first (top 3-5 posts):**

- Highest-performing posts by view count or subscriber-driving impact
- Essays that target the long-tail queries from H5 in the SEO plan (e.g., anything about "ex-Meta," "designer engineer," "building solo with AI," "AR design")
- The Sendfull-companion "When to Hire AI" piece — currently linked from homepage, so high natural traffic

For each:
1. Copy essay content into a new `posts.ts` entry.
2. Set `publishedAt` to the original Substack publish date (so the canonical URL doesn't look newer than the Substack copy).
3. Edit the existing Substack post to ADD the canonical block at the top.

**Tier 2 — Migrate over time (the next ~10 posts):**

Same workflow, but spread over 2-3 months. Don't migrate all at once or you flood your own search results with newly-published-looking content (Google's freshness signal will confuse).

**Tier 3 — Leave on Substack (older / lower-stakes posts):**

If a Substack post is 2+ years old and has minimal traffic, leave it. The migration cost outweighs the SEO win. Just make sure newer essays follow the workflow.

---

## Substack vs rationale.work — what each does

| Surface | Job |
|---|---|
| Substack | Subscriber acquisition; distribution; email open + click; comments + thread responses |
| rationale.work/writing | Canonical archive; search authority; LLM-indexable corpus; portfolio context |

Don't try to get rationale.work to do Substack's job (email subscriptions). Don't try to get Substack to do rationale.work's job (SEO authority for your name).

---

## Required: update the homepage "WRITING · LATEST" section

`app/(public)/page.tsx` currently links the latest essay directly to Substack:

```
<a href="https://rationaledesign.substack.com/p/when-to-hire-ai-the-longer-version">
```

**Once that essay is migrated to rationale.work/writing**, update the homepage to link to the canonical URL first, with the Substack link as a secondary "Read on Substack" affordance. This is the pattern I implemented for individual essay pages in `app/(public)/writing/[slug]/page.tsx`.

---

## Why the canonical strategy matters

Without it: Google indexes both versions. Substack ranks higher (older domain, more backlinks). When someone searches the title, Substack wins. Authority accrues to substack.com.

With it: Google indexes both, recognizes rationale.work as canonical, ranks rationale.work for the title query. Authority accrues to your personal domain. Three years from now your domain is the entity Google uses for "Matt Hanson."

This is the single most important content-strategy lever in the whole SEO plan. Without it, you're paying rent to Substack for your own writing.
