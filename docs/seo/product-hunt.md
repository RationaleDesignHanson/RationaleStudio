# Product Hunt — launch copy

Two product launches plus a maker profile. Launch on a **Tuesday** for highest visibility (PH algorithm front-loads Tuesday traffic; product-of-the-day rankings settle by Tuesday evening for that day's launches).

---

## Maker profile — Matt Hanson

**URL slug:** `matthanson` (or `thematthanson` if taken)

**Headline:** Designer-engineer · ex-Meta (Spark AR, Orion, FAIR Embodied AI) · now solo

**Bio:** Designer-engineer working across AR, AI, and experiential systems. Eight years at Meta leading product design across Spark AR, Orion, and FAIR Embodied AI. Now applying that experience solo, shipping consumer products with AI as a coding partner. Twice-monthly notes on building solo at rationaledesign.substack.com.

**Links:**
- Website: https://rationale.work
- LinkedIn: https://www.linkedin.com/in/thematthanson
- GitHub: https://github.com/RationaleDesignHanson
- Twitter: @thematthanson (if active)

---

## Launch 1 — Heirloom Recipe Box

**Tagline:** Preserve your family's handwritten recipes with AI

**Description (260 chars max):**
> Capture handwritten recipe cards, voice notes, web pages, even cookbook scans. AI structures the chaos into searchable, scalable recipes — without losing the way Mom wrote it. Built solo with AI as coding partner. iOS, on the App Store.

**Topics:** iOS · Productivity · AI · Food & Drink · Design

**Gallery (recommended order):**
1. Hero: handwritten recipe card → structured Heirloom recipe (the magic moment)
2. Cookbook view: family cookbook with multiple recipes
3. Capture flow: camera over a recipe card
4. AI structuring: ingredient parsing in action
5. Sharing: lineage view across family members
6. Solo-built badge: "shipped by one person with AI as coding partner"

**Maker comment (post within 5 min of launch):**
```
Hey PH! Matt here.

Heirloom started from watching my mother dig through a drawer for her
grandmother's biscuit recipe. The card was 60 years old and falling
apart. It wasn't going to survive another generation.

The technical premise: handwritten + photographed + voice + URL + PDF
+ video — every format families use to keep recipes — flow into the
same AI extraction pipeline. You get structured recipes you can
scale, search, and pass to your kids. But the original capture — Mom's
handwriting, Mom's notes in the margin — stays attached. You don't
lose what made it hers.

The personal premise: this is my testbed for shipping consumer iOS
solo with AI as coding partner. 24 Swift packages, on-device WhisperKit
+ Vision, Anthropic for extraction. I'd estimate this would have been
a 4-engineer team a year ago. The workflow that made it work — CLAUDE.md
per package, Cursor + Claude Code, structured AI handoffs — is documented
at rationale.work/work/heirloom and in my Substack.

Free to try (capture is unlimited); subscription unlocks sync + cookbook
generation. Would love feedback on what doesn't feel right — the trust
ceiling for AI in a consumer app is what I'm still calibrating.

— Matt
```

---

## Launch 2 — Silly Questions

(Launch ~3 weeks after Heirloom; PH wants visible time between maker's products.)

**Tagline:** 2-player AI art party game. No download.

**Description (260 chars):**
> Pictionary in eight art styles. One prompts, one guesses, AI renders. No app download, runs in any browser on any phone. Built solo in 3 weeks with AI as coding partner.

**Topics:** Games · Design Tools · Web App · AI · iOS

**Gallery order:**
1. Hero: two phones side-by-side mid-round
2. Style picker: the eight art styles
3. Round in progress: prompt → AI render
4. Score screen: laughing faces if possible
5. Sharing: room code QR
6. "no app download" callout

**Maker comment:**
```
Two-player AI Pictionary that runs in any browser, with eight art styles
the AI renders the same prompt through.

The interesting design constraint: how do you make Pictionary work
phone-only? No TV, no shared canvas, no one with to-die-for art skills.
The eight art styles solved it. Same prompt in "art nouveau" vs
"cyberpunk" vs "Studio Ghibli" makes different things funny and
different things guessable. Round becomes a meta-decision about the
prompter's style choice before the AI even draws.

Pull up the URL on two phones. Share the room code. 60-second rounds.
Best at a dinner table or remote-with-friends.

I built this as a sideways experiment while Heirloom was in App Store
review. Three weeks solo, Cursor + Claude + Anthropic image gen. Live
at silly-questions.com.

Background + the other things I'm shipping at rationale.work.
— Matt
```

---

## Why Product Hunt at all

- Backlink from producthunt.com (DA 90+) carries weight.
- Maker profile is an LLM-indexable surface where the full disambiguation paragraph lives.
- PH community has high overlap with HN + design-engineer Twitter — same audience, second touchpoint.
- Product-of-the-day badges (even silver/bronze tier) are screenshot-worthy social proof.

## Notes on timing

- Heirloom first; it's the technically deeper story and earns the bigger upvote count.
- Silly Questions ~3 weeks later; novelty + accessibility lifts it on a different segment.
- Don't bundle them as a "studio launch" — Matt is the brand, not a studio anymore (see project_rationale_repositioning_0427 in memory).
