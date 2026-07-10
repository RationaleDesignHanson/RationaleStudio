/**
 * Vault Writing — gated, partner-vetting essays.
 *
 * These are first-person essays staged for Substack but kept behind the
 * Vault UnlockGate (scope: "vault") while Matt vets them with partners.
 * Rendered at /work/vault/writing/<slug>.
 *
 * Voice spec (locked 2026-06-01):
 *  - first person, reflective (matches the /about register)
 *  - no studio "we / Rationale / clients / Kits / engagements", no sales tails
 *  - not platform-specific (no "iOS"), not output-specific (apps are lived
 *    examples, never the identity)
 *  - lived history (Meta AR scale, RUMI, solo building) kept as credibility
 *  - principle-first
 *
 * Provenance note: this set is the de-duplicated 15->10 cut. Cluster A (the
 * three "direction is the new bottleneck" insights) merges to one; Cluster B
 * (build-first-trap + build-to-think + spec-vs-prototype) merges to one;
 * dual-engine-model was cut as off-thesis.
 */

export interface VaultEssay {
  slug: string;
  title: string;
  subtitle: string;
  /** e.g. "8 min" */
  readTime: string;
  /** short uppercase tag shown on the card + reader */
  category: string;
  /** Source pieces this essay consolidates (provenance, not shown). */
  sourcedFrom: string[];
  sections: {
    heading?: string;
    paragraphs: string[];
  }[];
}

export const VAULT_ESSAYS: VaultEssay[] = [
  {
    slug: 'build-first-trap',
    title: 'The Build-First Trap',
    subtitle: 'How prototyping became the way I think.',
    readTime: '8 min',
    category: 'METHOD',
    sourcedFrom: ['thinking/build-first-trap', 'thinking/build-to-think', 'thinking/spec-vs-prototype'],
    sections: [
      {
        paragraphs: [
          'There is a failure mode I have watched teams fall into for years, and I have fallen into it myself. You commit to production architecture before you have validated the one or two assumptions the whole product rests on. The spec reads clean. The plan looks responsible. Then, a few months in, the first real users touch it and the core interaction does not work the way anyone imagined.',
          'By then pivoting means throwing away weeks of engineering, and killing it means admitting in public that the bet was wrong. So teams do neither. They ship the thing they already know is broken, because the sunk cost feels heavier than the person on the other side of the screen.',
        ],
      },
      {
        heading: 'The gap between describing and doing',
        paragraphs: [
          'A spec describes what something should do; only a prototype shows what it actually does once built. That sounds like a small distinction until you have lived on both sides of it.',
          'A spec can only ask the reader to imagine the experience. Hand them a prototype and they feel it directly, which matters because imagination is unreliable and feeling is data. You can write "fast feedback" into a document and still not know whether two hundred milliseconds is fast enough until your thumb is on the screen. You can draw a clean mockup and still have no idea which element a person looks at first, or whether a gesture feels natural or awkward in the hand.',
          'The things that decide whether a product works, timing, cognitive load, muscle memory, are exactly the things a spec cannot hold.',
        ],
      },
      {
        heading: 'The timeline of regret',
        paragraphs: [
          'The build-first trap has a shape, and it is always the same. Early on, money goes in and a small UX problem is quietly noticed and set aside. A few weeks later more is sunk and the core interaction is failing its own tests. By the middle of the project the user feedback confirms what everyone suspected, and by the end you are too deep to turn. The choice that remains is to launch with known problems or to kill the work outright.',
          'None of that comes from a lack of discipline. It is a sequencing problem: the validation happened after the commitment, when it needed to come before.',
        ],
      },
      {
        heading: 'Build to think',
        paragraphs: [
          'The way out is to treat building as a way of thinking. A prototype does not have to be a smaller version of the product. It can be a question made concrete: one assumption, isolated, put in front of a real person to get a real answer.',
          'On an email app I worked on, the plan said swipe left to archive. It read as obvious. The prototype said otherwise. Most people reached the other direction without thinking about it. That correction cost a couple of days because it happened before any production code existed. The same discovery in a shipped build would have cost weeks, and the weight of those weeks would have tempted us to argue with the users instead of believing them.',
          'That is the whole point. Each prototype answers one binary question. Enough of them, in sequence, and you reach production with the expensive decisions already made. The fast phase becomes a single confident pass, the guessing already done.',
        ],
      },
      {
        heading: 'Specs still matter, afterward',
        paragraphs: [
          'This is not an argument against writing things down. A spec is useful for recording what you have already validated, for carrying a decision to people who were not in the room, for leaving a trace of what was built and why.',
          'The mistake is only in the order. Document what you have already proven, once you have proven it. Specs come after prototypes.',
        ],
      },
      {
        paragraphs: [
          'I did not arrive at this from theory. I arrived at it from years of shipping at a scale where a gesture that confused a fraction of a percent of people still meant millions of broken moments, and then from building on my own, where there is no team large enough to absorb a wrong bet.',
          'Validate early. Pivot while it is cheap. Commit only once you have something you can stand behind.',
        ],
      },
    ],
  },

  {
    slug: 'direction-is-the-bottleneck',
    title: 'Direction Is the Bottleneck Now',
    subtitle: 'When building gets cheap, knowing what to build is the whole game.',
    readTime: '7 min',
    category: 'METHOD',
    sourcedFrom: ['insights/clarity-precedes-illumination', 'insights/course-before-speed', 'insights/building-wrong-thing-faster'],
    sections: [
      {
        paragraphs: [
          'For most of my career the constraint was execution. Building software was slow and expensive and took a lot of people. If you knew what to build, the hard part was assembling the time and the team to build it. Speed was the differentiator, and the fastest team usually won.',
          'That constraint has quietly inverted. Execution is now cheap, fast, and close to abundant. I can stand up a working surface in a day that would once have taken a quarter. And the moment that became true, a more dangerous problem moved to the front: it is now possible to build the wrong thing faster than ever before.',
        ],
      },
      {
        heading: 'The new risk is a bad heading',
        paragraphs: [
          'A ship moving slowly in the wrong direction is a problem. A ship moving at full speed in the wrong direction is a catastrophe. Acceleration does not fix a bad heading. It just gets you lost sooner.',
          'When building was expensive, the cost itself forced a kind of thinking. You validated before you committed because being wrong was ruinous. Cheap building removes that forcing function. You can prototype in hours and ship in days, and if you are pointed at the wrong problem, all of that speed only compounds the waste.',
        ],
      },
      {
        heading: 'Clarity is the circuit',
        paragraphs: [
          'A lightbulb is a brilliant thing, but it only works because a circuit directs energy with intent. Without the circuit, the same energy is just heat. Most teams want to be the lightbulb, the visible output, the thing that glows, and they skip the unglamorous work of designing the circuit.',
          'Clarity is the circuit. It is not a document or a roadmap or a tidy design file. It is a working understanding of what behavior you are trying to change, for whom exactly, from what state to what state, and inside which constraints. When that understanding is real, flipping the switch lights the right thing. When it is missing, you produce brilliance and waste it.',
        ],
      },
      {
        heading: 'Front-load conviction',
        paragraphs: [
          'The discipline I try to hold is to front-load conviction before accelerating execution. Map the problem before the solution. Name the behavior you want to change, then the features that serve it. Test the hardest assumptions first, while they are still cheap to be wrong about. Only then move fast, because only then does speed actually help you.',
          'The questions worth answering before the engines ignite are simple and uncomfortable. Do I have conviction about the problem? Have I tested the assumptions the whole thing rests on? Can I say what this is for in a sentence a stranger would understand? If the answer is no, more speed is the last thing I need.',
        ],
      },
      {
        paragraphs: [
          'Course before speed. When execution was the bottleneck, that would have sounded lazy. Now it is the whole game.',
        ],
      },
    ],
  },

  {
    slug: 'prototypes-not-slides',
    title: 'Thinking in Prototypes',
    subtitle: 'The fastest way to know how something feels is to build it and use it.',
    readTime: '6 min',
    category: 'METHOD',
    sourcedFrom: ['insights/prototypes-not-slides'],
    sections: [
      {
        paragraphs: [
          'On RUMI, an AI companion meant to turn passive media into something you could participate in, the team kept getting stuck in the same place. The product had no center. Features accumulated without cohesion. We would debate in wireframes, and the wireframes could not answer the only questions that mattered.',
        ],
      },
      {
        heading: 'Wireframes cannot answer the hard questions',
        paragraphs: [
          'A wireframe is useful for alignment. It is good at showing where things go. But it cannot tell you whether an interaction feels right, whether a person will understand it without being told, whether the behavior you are designing for actually happens. For those questions you need something you can use, something with real behavior under your hands.',
        ],
      },
      {
        heading: 'Build it to feel it',
        paragraphs: [
          'So we stopped wireframing and built. Functional surfaces, fast, with none of the constraints of production. Rough, but usable enough to feel the thing before committing to it. The shift was from describing an interaction to trying one.',
          'It changes the conversation immediately. You cannot feel a wireframe. You can feel a prototype. The moment the team could actually use RUMI, the arguments stopped. Decisions that had been stuck for weeks became obvious in an afternoon, because everyone was reacting to the same real thing instead of to their own imagined version of it.',
        ],
      },
      {
        heading: 'Usage reveals what debate hides',
        paragraphs: [
          'Usage-led iteration beats spec-based cycles for a simple reason. A wireframe invites opinion. A working surface invites behavior, and behavior is honest. Watching people use the prototype is what told us the product needed to collapse around a single core journey instead of spreading across a dozen half-features. No meeting would have produced that. Use did.',
        ],
      },
      {
        heading: 'When this is worth it',
        paragraphs: [
          'Building to feel it is not always the right move. It earns its keep when the core interaction model is unclear, when the team is stuck litigating hypotheticals, when you are making something novel enough that the patterns do not exist yet. It is the bridge between a sketch and conviction, not a replacement for either careful design or real engineering.',
          'The value of a prototype is certainty, well before anything looks finished. And in a moment where the biggest risk is building the wrong thing quickly, being sure before you commit is the only protection there is.',
        ],
      },
    ],
  },

  {
    slug: 'mental-models',
    title: 'Four Frames I Build With',
    subtitle: 'How I build conviction before spending anything expensive.',
    readTime: '6 min',
    category: 'FRAMES',
    sourcedFrom: ['thinking/mental-models'],
    sections: [
      {
        paragraphs: [
          'These are not abstractions. They are the four frames I actually reach for when I am deciding what to build and in what order. Each one is a way of refusing to spend expensive effort before I have earned the conviction to spend it.',
        ],
      },
      {
        heading: 'Clarity precedes illumination',
        paragraphs: [
          'The most elegant execution is meaningless without a system of clarity underneath it. A lightbulb only works because a circuit gives its energy direction. I try to design the circuit first: the problem before the solution, the behavior change before the feature.',
        ],
      },
      {
        heading: 'Direction is the bottleneck',
        paragraphs: [
          'Speed used to be the scarce resource. It is not anymore. A ship at full speed toward the wrong shore is worse than one moving slowly toward the right one. Before accelerating I want the map as much as the engine: the hardest assumptions tested, the bearing confirmed.',
        ],
      },
      {
        heading: 'Environment shapes behavior',
        paragraphs: [
          'To change something, I have learned to build a new system that makes the old one irrelevant rather than fighting it head-on. It is Buckminster Fuller\'s idea, and it has held up. Most products try to change behavior through friction or persuasion. I would rather design an environment where the better outcome is simply the default, the easy choice, the path of least resistance.',
        ],
      },
      {
        heading: 'Working software as a thinking tool',
        paragraphs: [
          'Prototypes are for generating ideas as much as testing them. The act of building surfaces constraints and opportunities that no amount of planning reveals. A spec captures what I think I know; a working build exposes what I do not. So I use software as a way to think out loud, externalizing assumptions and testing them against reality before committing to anything costly.',
        ],
      },
      {
        paragraphs: [
          'None of these are rules. They are habits of sequencing, ways of putting the cheap question before the expensive commitment. They shape how I scope a thing, where I point my attention, and how I order the work to take risk off the table early.',
        ],
      },
    ],
  },

  {
    slug: 'vision-proof-burden',
    title: 'Vision, Proof, and the Work Between',
    subtitle: 'The gift of vision carries the burden of proof. The work lives in the gap between them.',
    readTime: '9 min',
    category: 'ESSAY',
    sourcedFrom: ['thinking/vision-proof-burden'],
    sections: [
      {
        paragraphs: [
          'The gift of vision is often misunderstood. Beyond the ability to imagine what could exist, it carries the responsibility to stand in the gap between what is visible and what is provable. Vision, by its nature, arrives early, and proof arrives late. The distance between the two is where most ideas die, less often because they are wrong than because they are unvalidated.',
          'That gap creates a burden. People who can see a future state clearly are routinely asked to defend it in the language, tools, and metrics of the present. They are expected to produce certainty before the conditions for certainty exist. It is the quiet curse of vision: the obligation to justify what cannot yet be measured, benchmarked, or tested.',
          'Most product development collapses that gap too quickly. It either demands premature proof, forcing everything into timid incrementalism, or it indulges vision with no discipline, producing things that inspire and never ship. Both avoid the hard work in the middle. The middle is where I try to work.',
        ],
      },
      {
        paragraphs: [
          'The approach I trust turns vision into evidence without reducing it to guesswork or false confidence. I build real, working artifacts early: prototypes that behave, systems that respond, experiences a person can actually feel. They are instruments of inquiry, a way to learn what is true before committing to what is expensive.',
          'I do not ask people to believe me. I put something in front of them and let them use it, so friction and behavior surface the truth. Proof stops being a gate at the very end and becomes something earned gradually, through contact with reality.',
          'I came to this from years of carrying that burden alone, having to translate conviction into confidence for other people over and over. The work does not eliminate vision or worship it. It respects vision enough to give it a fair path to proof.',
          'That means designing so that insight becomes unavoidable. I prototype to interrogate an idea rather than dress it up. I try to ship learning as aggressively as other people ship features. And I accept that method does not guarantee outcomes. It only reduces the amount of self-deception on the way to them.',
          'Vision needs more than blind faith. It needs a disciplined process that can meet it where it is, early and incomplete and fragile, and carry it forward until it can stand on its own. That is the work.',
        ],
      },
    ],
  },

  {
    slug: 'methodology-origins',
    title: 'Where This Came From',
    subtitle: 'Eight years shipping AR and AI at a scale where mistakes were measured in millions.',
    readTime: '7 min',
    category: 'ORIGIN',
    sourcedFrom: ['thinking/methodology-origins'],
    sections: [
      {
        paragraphs: [
          'None of how I work is theoretical. It came from eight years at Meta Reality Labs, shipping AR and AI to billions of people. At that scale, small mistakes stop being small. A gesture that confuses a tenth of a percent of users is still millions of people having a bad moment.',
          'I learned to validate everything before production because the cost of being wrong was enormous, and money was the smallest part of it. It was in experiences broken at scale, the kind you cannot quietly patch.',
        ],
      },
      {
        heading: 'You cannot spec a gesture',
        paragraphs: [
          'AR interactions are physical. They depend on body movement, spatial awareness, gesture memory. You cannot write your way to understanding how a pinch should feel, or how quickly a virtual object should answer a turn of the head. We built prototypes constantly, treating them as thinking tools rather than deliverables. A two-day prototype routinely answered questions that two weeks of meetings could not. We did it out of necessity: the specs were always wrong in ways no one could predict.',
        ],
      },
      {
        heading: 'The pattern held everywhere',
        paragraphs: [
          'Over those years a pattern hardened. It worked for gesture recognition. It worked for commerce. It worked for hardware that had never existed before, like the early glasses program. The domain did not matter. The principle did. Validate the riskiest thing first, with the cheapest possible artifact, before committing to the expensive build.',
        ],
      },
      {
        heading: 'It matters even more alone',
        paragraphs: [
          'Building on my own, the stakes are different but the lesson is sharper. A large organization can absorb a wrong bet. A single builder cannot. Limited runway means you genuinely cannot afford to build the wrong thing, which makes validated learning more important at small scale, not less. The method that worked at a billion users works even better at zero to one.',
          'Validate early. Pivot cheap. Ship with conviction. That is the whole inheritance.',
        ],
      },
    ],
  },

  {
    slug: 'ar-commerce-at-scale',
    title: 'Building AR Commerce at Scale',
    subtitle: 'What shipping AR shopping to a global platform taught me about building the whole system.',
    readTime: '12 min',
    category: 'CASE',
    sourcedFrom: ['insights/building-ar-commerce-at-scale'],
    sections: [
      {
        paragraphs: [
          'When I started on AR commerce at Meta, the tools were basically face filters, with no path from an AR idea to a scaled launch. Competitors had the table stakes, try-ons, branded templates, creator commerce, and we were not really in the race. The gap was clear. AR had to become genuinely useful for shopping, well beyond cosmetic.',
        ],
      },
      {
        heading: 'The real problem was confidence',
        paragraphs: [
          'The hard part was never the rendering. It was human. When someone is interested in a product, the job is to help them build the confidence to buy it. A flat photo makes it hard to picture a thing in your own life. People hesitate with unfamiliar brands they cannot inspect. A large share of online purchases come back because the product looked different than expected. AR commerce earns its place by removing friction from a purchase decision. The novelty is beside the point.',
        ],
      },
      {
        heading: 'A system, not a feature',
        paragraphs: [
          'So the work was not shipping one AR shopping feature. It was building a system that felt native everywhere and let thousands of brands participate without bespoke engineering. Multiple ways into the experience, an authentic view of the product in real space, a way to inspect the digital object like a familiar image, and a short path from looking to buying. Underneath it, shared rendering primitives, consistent interaction patterns, self-serve tools, and automated quality checks. We started with craft to earn trust, then designed for scale.',
        ],
      },
      {
        heading: 'The barriers were about adoption',
        paragraphs: [
          'The technical problems were solvable. The real barriers were business ones. Brands wanted customization but lacked technical depth. The desire to differentiate fragmented the experience. Marketers needed no-code tools that felt familiar. The answer was templated creation with guardrails, brand-specific parameters within a consistent frame, and content connected at runtime from existing catalogs so a brand could light up hundreds of products without building each by hand. That container approach was the breakthrough that made scale real.',
        ],
      },
      {
        heading: 'What the numbers were, and what they meant',
        paragraphs: [
          'In about six months it became a working ecosystem. The AR camera launched in shopping, lifted click-through, and increased time spent. We onboarded more than ten retailers and a couple hundred products, including names people know. Platform usage grew dramatically and the volume of AR-enabled inventory jumped by orders of magnitude. But the lesson I actually take from it lives underneath the growth chart: the win came from clarity of purpose and aligned execution, and speed was almost incidental.',
          'Start with craft and build for scale. Meet people where they are. Earn trust through fidelity. Make the experience feel native to what someone is already doing. That is what shipping AR commerce taught me, and it is what I try to carry into everything smaller since.',
        ],
      },
    ],
  },

  {
    slug: 'brand-as-execution-engine',
    title: 'Brand as Execution Engine',
    subtitle: 'On RUMI I learned brand is the system that lets you decide, long before it is polish.',
    readTime: '9 min',
    category: 'CASE',
    sourcedFrom: ['insights/brand-as-execution-engine'],
    sections: [
      {
        paragraphs: [
          'RUMI began as a fragmented concept, an AI companion for turning passive media into interactive experience. The vision was there and the technology was possible, but the product had no center. Brand and product design were tangled together with no shared direction. The visual identity shifted with whoever was in the room that day. Internal and external contributors had nothing consistent to build from. The product could not move because the team was stuck debating hypotheticals.',
        ],
      },
      {
        heading: 'Brand as the execution engine',
        paragraphs: [
          'What broke the logjam was a reframing. Brand is the execution engine. Establishing RUMI\'s identity from zero forced answers to the questions the product actually depended on. What is this, precisely. Who is it for. How should it feel. Once those were settled as a shared system rather than a matter of taste, the product became buildable.',
        ],
      },
      {
        heading: 'How identity unlocked decisions',
        paragraphs: [
          'With the identity in place, decisions got faster and more confident. Engineering, product, and the AI work aligned to one system. It went into the product UI itself, so consistency held from prototype to production. Visual design stopped slowing decisions and started enabling them. The product became real. Brand turned out to be the thing that shaped the product from the inside.',
          'When a team is stuck endlessly debating product decisions, the shortage is usually one of identity, not ideas. Establish identity early, treat it as a decision-making framework rather than a coat of paint, and it becomes the thing that lets the work move.',
        ],
      },
    ],
  },

  {
    slug: 'intelligence-felt-not-flaunted',
    title: 'Intelligence You Feel',
    subtitle: 'The best AI works quietly and just makes you more capable.',
    readTime: '8 min',
    category: 'AI',
    sourcedFrom: ['insights/intelligence-felt-not-flaunted'],
    sections: [
      {
        paragraphs: [
          'Almost every product is racing to put AI on its feature list, and most are getting it backwards. They treat intelligence as a trophy to show off, look how clever our system is, when it should be a tool that makes the person using it feel more capable. The best AI experiences demonstrate their intelligence quietly, by making you faster, surer, and a little smarter than you were.',
        ],
      },
      {
        heading: 'What felt means',
        paragraphs: [
          'An intelligent product does not talk about how clever it is. It shows you, by anticipating the next thing you need, removing friction you did not know was there, surfacing something you could not have found on your own, adapting to how you work without making you configure it. The intelligence is invisible right up until you try to do the task without it, and realize how much it was quietly carrying.',
        ],
      },
      {
        heading: 'The trouble with AI features',
        paragraphs: [
          'Most products bolt AI on as a labeled feature. Smart this, AI-powered that. It breaks the person\'s mental model, pulling their attention onto the AI when it should stay on the work. The goal is simple: make them feel more capable because the intelligence is working quietly in the background.',
        ],
      },
      {
        heading: 'Designing intelligence that is felt',
        paragraphs: [
          'A few things I hold to. Embed the intelligence in the flow, part of the work itself. Keep its actions legible and predictable. Always leave the person room to override or adjust it. Optimize for confidence above raw speed or accuracy. And show the intelligence through outcomes, letting the process stay out of sight.',
        ],
      },
      {
        heading: 'The test',
        paragraphs: [
          'When intelligence works this quietly, people forget they are using an AI product at all. They just feel better at their job. That is the only benchmark I trust. Does this make the person more capable? If yes, the intelligence is well designed. If no, you have just added complexity and called it smart.',
        ],
      },
    ],
  },

  {
    slug: 'agentic-ux',
    title: 'Designing for Agents',
    subtitle: 'When software acts on your behalf, the user\'s real job becomes trust.',
    readTime: '10 min',
    category: 'AI',
    sourcedFrom: ['insights/agentic-ux-design-principles'],
    sections: [
      {
        paragraphs: [
          'Agentic AI is a real shift in how software gets designed. Traditional interfaces assume the person is in control, issuing commands and making the calls. Agentic systems invert that. The software acts on the person\'s behalf, and their role moves to monitoring, adjusting, and approving. That inversion breaks a lot of old assumptions and asks for new principles.',
        ],
      },
      {
        heading: 'Legibility over magic',
        paragraphs: [
          'An agent has to make its reasoning visible. People need to see what it is doing, why it decided that, and what it assumed. Magic is impressive right up until it fails, and then it is alarming. Legibility is what builds the trust that magic spends.',
        ],
      },
      {
        heading: 'Progressive autonomy',
        paragraphs: [
          'Do not start at full autonomy. Earn it. First the agent suggests and the person approves. Then it acts and the person reviews. Eventually it acts and the person merely monitors. People need to feel they can intervene before they will ever be comfortable handing over control.',
        ],
      },
      {
        heading: 'Graceful degradation',
        paragraphs: [
          'Agents will fail, so design for failure from the first day. What happens when it is uncertain? How does it communicate its own confidence? Can the person easily undo what it did? The quality of an agentic system shows up in how it handles the edges, not in how it performs on the happy path.',
        ],
      },
      {
        heading: 'Agency through constraints',
        paragraphs: [
          'Autonomy without boundaries creates anxiety rather than relief. People need to feel in control even while the agent is acting, and clear constraints are what give them that. What can it do without asking? What needs review? What is simply off limits? Those constraints are what make the agent trustworthy in the first place.',
        ],
      },
      {
        heading: 'Adaptive context',
        paragraphs: [
          'An agent has to understand the whole situation around a task: what the person is really trying to achieve, what their constraints and preferences are, how this action fits their larger goal. Context-aware agents feel intelligent; context-blind ones feel like robots, however capable they are.',
          'The hardest part of agentic design was always human: making a person feel confident letting something act for them. Get that right and the experience feels like a superpower. Get it wrong and it just feels like a loss of control with extra steps.',
        ],
      },
    ],
  },
];

export function getVaultEssay(slug: string): VaultEssay | undefined {
  return VAULT_ESSAYS.find((e) => e.slug === slug);
}

export function listVaultEssays(): VaultEssay[] {
  return VAULT_ESSAYS;
}
