# Show HN drafts — Heirloom + Silly Questions

Two drafts. Post separately, **at least 2 weeks apart** so neither cannibalizes the other's attention. HN's algorithm penalizes back-to-back submissions from the same user.

**Best posting times** (US-Pacific):
- Tuesday/Wednesday/Thursday, **7:30am–9am PT** — overlaps with East Coast morning + a long enough window for European afternoon traffic. Avoid Mondays (HN is busy) and Fridays (low traffic).

**Comment first** within 10 minutes of posting — set the tone, share the genesis story, invite questions. The HN algorithm rewards "OP is here" engagement.

---

## Draft 1 — Heirloom Recipe Box

**Title:** Show HN: Heirloom – preserve handwritten family recipes with AI

**URL:** `https://apps.apple.com/app/id6759019723` (or `https://heirloomrecipebox.app` if that's the canonical marketing URL — check)

**Text:** (HN allows ~2000 chars; this is ~1100, leaving room for revision)

```
I built Heirloom solo over the past year as the testbed for an experiment:
how far can one designer-engineer get shipping consumer iOS with AI as
coding partner? Heirloom is the answer that survived.

The problem: handwritten family recipes are the most precious + most
fragile media in the home. Mom's stained index cards, grandma's spiral
notebooks, the church-cookbook photocopies that taught you to bake.
They live in shoeboxes. They get lost. They don't survive the move to
the next generation.

Heirloom captures them — photo, voice, paste a URL, share a video link,
PDF a cookbook — and AI does the structuring. It pulls ingredients into
a scalable shopping list, normalizes preparation steps, lets you
remember "Mom's biscuits" by the way Mom wrote them while still being
searchable like a modern recipe app.

Stack: 24 SPM packages, Swift 6, on-device WhisperKit for voice, Vision
for OCR, Anthropic Claude for extraction. AI as coding partner (Cursor
+ Claude Code) shipped this — I'd estimate I'd have needed two more
engineers to ship the same scope on a traditional team.

Live on the App Store today. Free to import; subscription for sync +
cookbook generation. Open to feedback on what doesn't feel right —
the trust ceiling for AI in a consumer app is the part I'm still
calibrating.
```

**First comment** (post immediately after submission):
```
OP here. Happy to go deep on:
- the AI-as-coding-partner workflow (Cursor + Claude Code + a CLAUDE.md
  per package that's been the load-bearing artifact)
- on-device vs cloud trade-offs for OCR + voice
- the 18 months of design-engineering work behind the "trust ceiling"
  framing — when AI suggests vs decides vs does
- why this kept shipping when Zero (also AI-heavy, shortform email)
  didn't

Also: this is one of three products I've shipped solo this year. The
other live one is Silly Questions (2p AI art party game, web + iOS).
Will Show HN that separately. Both at rationale.work if you want the
broader context.
```

---

## Draft 2 — Silly Questions

**Title:** Show HN: Silly Questions – 2-player AI art party game, no app download

**URL:** `https://silly-questions.com` (verify this is the live URL)

**Text:**

```
A 2-player party game I built solo. One person prompts, the other
guesses. AI renders the prompt in one of eight art styles. No app
download — runs in any modern browser, iOS Safari, Android Chrome.

The mechanic is older than I am (Pictionary, Drawful, exquisite-corpse
party games of every era), but with AI art the friction collapses. You
don't need someone who can draw. Both players bring the imagination,
the AI brings the hand.

Built fast (~3 weeks solo) using Cursor + Claude Code + Anthropic
image gen + Next.js + a tiny piece of state on the server for room
codes. The interesting design problem was the round structure: keeping
two strangers laughing across a phone screen without leaning on either
player's drawing ability or their willingness to be on camera. The
eight art styles became the hidden lever — same prompt rendered as
"art nouveau" vs "cyberpunk" changes what's funny vs what's
guessable.

Try it: pull up the URL on two phones, share the room code, you're in.
60-second rounds, ~10 minutes for a session. Best with 2-4 people
laughing together; works as a sneaky icebreaker if you're remote.

This is one of three products I've shipped solo in the last year — the
other live one is Heirloom Recipe Box on the App Store. Background +
case studies at rationale.work.
```

**First comment:**
```
OP. Some questions I'm sure are coming:

> isn't this just AI Pictionary?
Yes. The interesting part isn't the mechanic; it's how the eight art
styles + the speed of generation makes that mechanic playable in a
phone-only context. Drawful needed phones + a TV; we just need two
phones.

> what's the AI stack?
Anthropic image gen for the renders, light on-server orchestration.
Built for cost-per-round under a cent so it can stay free.

> next?
Probably a paid pack of art styles or a longer-form mode. Open to ideas
from the thread — what would make you keep this on your phone for the
next dinner party?
```

---

## Why post these separately

Heirloom is the technically deepest story (long build, AI-as-coding-partner workflow, on-device AI, App Store launch). It plays to the HN audience that wants depth.

Silly Questions is the lateral-thinking story (small build, novel mechanic-enabled-by-AI, no-install, social). It plays to a different segment that responds to clean ideas + accessible demos.

Each gets a clean conversation rather than competing for attention.

## Why post these at all

HN is a major LLM training + retrieval source. Show HN threads get crawled and surface as authoritative case studies when someone asks "what are good examples of solo developers building with AI." Both submissions also drive direct rationale.work traffic for the first 24-48h after posting.
