/**
 * Insights Content Layer
 *
 * Blog articles and thought leadership content.
 * Structure supports both full articles and article previews.
 *
 * Source: Rationale philosophy + industry insights
 */

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface InsightArticle {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  publishedAt: string; // ISO date string
  readTime: string; // "5 min read"
  category: 'Product' | 'AI' | 'Design' | 'Strategy' | 'Process';
  tags: string[];
  author: {
    name: string;
    role: string;
  };

  // Article content (for full article page)
  content: {
    sections: {
      heading?: string;
      paragraphs: string[];
    }[];
  };

  // Related content
  relatedInsights?: string[]; // Slugs of related articles
}

// ============================================================================
// Article Data
// ============================================================================

export const insights: InsightArticle[] = [
  {
    slug: 'clarity-precedes-illumination',
    title: 'Clarity Precedes Illumination',
    subtitle: 'Why the best product teams design the circuit before the lightbulb',
    excerpt: 'A lightbulb is useless without a circuit. Modern product teams rush to ship, to glow, to producebut skip the essential work of designing the system that gives direction to energy. Here\'s why clarity must come first.',
    publishedAt: '2025-01-15',
    readTime: '6 min read',
    category: 'Strategy',
    tags: ['Product Strategy', 'Systems Thinking', 'Mental Models'],
    author: {
      name: 'Matt Hanson',
      role: 'Founder, Rationale'
    },

    content: {
      sections: [
        {
          paragraphs: [
            'A lightbulb is a brilliant invention, but it only works because a circuit directs energy with intent. Without that deliberate, structured path, the energy is just wasted heat.',
            'Modern product teams often try to be the lightbulbthe visible execution. They rush to ship, to glow, to produce. But in their haste, they skip the essential work of designing the circuit.',
            'The result is wasted brilliance: teams burn out, capital is misdirected, and the wrong things are illuminated entirely.'
          ]
        },
        {
          heading: 'The Problem: Speed Without Direction',
          paragraphs: [
            'AI has made execution cheap, fast, and abundant. Code generation, advanced prototyping tools, and instant infrastructure have removed many of the old barriers to building.',
            'But this acceleration has created a new, far more dangerous risk: building the wrong thing faster than ever.',
            'The primary bottleneck for product teams has shifted from execution to conviction. The hardest questions are no longer about how to build, but what to build, for whom, and with what intended behavior change.'
          ]
        },
        {
          heading: 'The Circuit: What Clarity Actually Means',
          paragraphs: [
            'Clarity isn\'t a document. It\'s not a PRD, a roadmap, or a Figma file. Clarity is a system of understanding that answers:',
            '" What behavior are we trying to change?',
            '" For whom, specifically, are we building this?',
            '" What is the intended path from current state to desired state?',
            '" What are the constraints and forcing functions that shape the solution?',
            'This is the circuit. The system that gives shape to energy and ensures that when the switch is flipped, the right experience is illuminated for the right people.'
          ]
        },
        {
          heading: 'How to Build the Circuit',
          paragraphs: [
            'Designing the circuit means doing the hard, unsexy work before execution begins:',
            '1. Map the problem space, not the solution space',
            '2. Identify the behavior change you\'re targeting',
            '3. Define success metrics that matter',
            '4. Surface assumptions and test the hardest risks first',
            '5. Create a clear narrative that aligns the entire team',
            'Only then do you begin building. Only then does the lightbulb make sense.'
          ]
        },
        {
          heading: 'The Cost of Skipping This Step',
          paragraphs: [
            'Teams that skip the circuit pay for it in:',
            '" Engineering cycles wasted on features that don\'t move the needle',
            '" Founder burnout from lack of conviction',
            '" Investor skepticism from unclear product narratives',
            '" User confusion from incoherent experiences',
            'Speed without clarity accelerates waste. The circuit is what protects you from the biggest risk in the AI era: building the wrong thing fast.'
          ]
        },
        {
          heading: 'What This Means for Your Team',
          paragraphs: [
            'If you\'re a founder, product leader, or investor, ask yourself:',
            '" Do we have clarity on what behavior we\'re changing?',
            '" Can we articulate our product narrative in 2 minutes?',
            '" Have we tested our hardest assumptions?',
            '" Is the team aligned on what success looks like?',
            'If the answer is no, you don\'t need more execution. You need the circuit.',
            'That\'s what Rationale builds. Not screens, not featuressystems of clarity that protect teams from the catastrophic risk of speed without direction.'
          ]
        }
      ]
    },

    relatedInsights: ['course-before-speed', 'building-wrong-thing-faster']
  },

  {
    slug: 'course-before-speed',
    title: 'Course Before Speed',
    subtitle: 'Why AI makes direction the new bottleneck',
    excerpt: 'A ship moving at high speed toward disaster is worse than a ship moving slowly in the right direction. AI has given everyone unprecedented speedbut direction is now the scarce resource.',
    publishedAt: '2025-01-10',
    readTime: '5 min read',
    category: 'Strategy',
    tags: ['Product Strategy', 'AI', 'Decision Making'],
    author: {
      name: 'Matt Hanson',
      role: 'Founder, Rationale'
    },

    content: {
      sections: [
        {
          paragraphs: [
            'A ship moving slowly in the wrong direction is a problem. A ship moving at high speed toward disaster is a catastrophe.',
            'The rise of AI has accelerated everyone\'s engines, giving founders unprecedented speed and power. But this has created a new bottleneck.',
            'Speed is no longer the primary constraint; direction is. Without a clear map, more speed only gets you lost faster.'
          ]
        },
        {
          heading: 'The Old World: Execution Was the Bottleneck',
          paragraphs: [
            'For decades, the primary constraint in product development was execution. Building software was expensive, slow, and required large teams.',
            'If you had clarity on what to build, the challenge was assembling the resources and time to build it.',
            'In that world, speed was the differentiator. The fastest team won.'
          ]
        },
        {
          heading: 'The New World: Direction Is the Bottleneck',
          paragraphs: [
            'AI has inverted this constraint. Execution is now cheap, fast, and abundant.',
            'But knowing what to build? That\'s harder than ever.',
            'Teams can ship features in days. But if those features are solving the wrong problem, speed becomes the enemy.',
            'The new bottleneck is conviction. Knowing, with confidence, that you\'re pointed in the right direction before the engines ignite.'
          ]
        },
        {
          heading: 'What This Means for Founders',
          paragraphs: [
            'If you\'re a founder in the AI era, your primary risk is no longer execution speedit\'s directional clarity.',
            'Before you accelerate, ask:',
            '" Do I have conviction on the problem I\'m solving?',
            '" Have I validated my core assumptions?',
            '" Can I articulate my product vision clearly?',
            '" Is my team aligned on what success looks like?',
            'If the answer is no, more speed is dangerous. You need the map before the engines.'
          ]
        },
        {
          heading: 'How to Navigate Before You Accelerate',
          paragraphs: [
            'Rationale serves as the navigator. Our role is to chart the map, reveal the unmapped waters, and provide a clear, confident bearing before the engines ignite.',
            'We don\'t slow teams down; we protect them from the catastrophic risk of speed without direction.',
            'This is what our Clarity Kit is designed for: fast conviction before expensive execution.',
            'Course before speed. Always.'
          ]
        }
      ]
    },

    relatedInsights: ['clarity-precedes-illumination', 'building-wrong-thing-faster']
  },

  {
    slug: 'building-wrong-thing-faster',
    title: 'Building the Wrong Thing Faster',
    subtitle: 'The paradox of AI-accelerated product development',
    excerpt: 'AI promised to accelerate progress. Instead, it introduced a new existential risk: teams now have the power to build the wrong thing faster than ever before. Here\'s how to protect against it.',
    publishedAt: '2025-01-05',
    readTime: '7 min read',
    category: 'AI',
    tags: ['AI', 'Product Development', 'Risk Management'],
    author: {
      name: 'Matt Hanson',
      role: 'Founder, Rationale'
    },

    content: {
      sections: [
        {
          paragraphs: [
            'AI was supposed to solve our problems. Build faster. Ship smarter. Scale effortlessly.',
            'But it created a new, far more dangerous risk that nobody saw coming:',
            'We can now build the wrong thing faster than ever before.'
          ]
        },
        {
          heading: 'The Paradox',
          paragraphs: [
            'The tools are incredible. Code generation, AI-powered design, instant prototyping, automated infrastructure.',
            'Execution barriers have collapsed. What used to take months now takes days.',
            'But here\'s the paradox: making execution easier doesn\'t make knowing what to execute any clearer.',
            'In fact, it makes it worse. Because when building is cheap and fast, teams skip the hard thinking that protects them from directional failure.'
          ]
        },
        {
          heading: 'The New Risk Profile',
          paragraphs: [
            'In the old world, slow execution forced teams to think carefully before building. The cost of being wrong was high, so teams validated assumptions thoroughly.',
            'In the AI era, that forcing function is gone. You can prototype in hours, build MVPs in days, and ship features in weeks.',
            'But if you\'re solving the wrong problem? All that speed just accelerates waste.',
            'The new risk isn\'t execution failureit\'s directional failure at scale.'
          ]
        },
        {
          heading: 'The Solution: Front-Load Conviction',
          paragraphs: [
            'The antidote to this risk is simple but hard: front-load conviction before you accelerate execution.',
            'This means:',
            '" Map the problem space before the solution space',
            '" Test your hardest assumptions first',
            '" Build clarity into a legible system and narrative',
            '" Align your team on behavior change, not features',
            '" Create high-fidelity prototypes that reveal real user behavior',
            'Only then do you move fast. Only then is speed an advantage.'
          ]
        },
        {
          heading: 'What Rationale Does',
          paragraphs: [
            'This is why Rationale exists. We protect founders from the biggest risk in the AI era: building the wrong thing fast.',
            'Our engagements are designed to create conviction before execution:',
            '" Clarity Kit: Fast strategic validation in 1-2 weeks',
            '" Prototype Kit: High-fidelity demonstrations that test assumptions',
            '" Product Definition Kit: Complete spec and design system for confident execution',
            'We turn ambiguous opportunities into validated conviction and tangible intellectual property.',
            'Because in the AI era, clarity is the new competitive advantage.'
          ]
        }
      ]
    },

    relatedInsights: ['clarity-precedes-illumination', 'course-before-speed']
  },

  {
    slug: 'intelligence-felt-not-flaunted',
    title: 'Intelligence Felt, Not Flaunted',
    subtitle: 'How to design AI experiences that feel magical, not mechanical',
    excerpt: 'The next generation of products will be defined by AIbut intelligence isn\'t a feature to flaunt. It\'s a behavior-shaping force that must be deeply embedded in the experience. Here\'s how.',
    publishedAt: '2024-12-20',
    readTime: '8 min read',
    category: 'AI',
    tags: ['AI UX', 'Product Design', 'User Experience'],
    author: {
      name: 'Matt Hanson',
      role: 'Founder, Rationale'
    },

    content: {
      sections: [
        {
          paragraphs: [
            'Every product is rushing to add "AI" to their feature list. But most are getting it wrong.',
            'They treat AI like a trophy to show off"Look how smart our algorithm is!"instead of a tool to make users feel more capable.',
            'The best AI experiences don\'t announce their intelligence. They demonstrate it by making the user feel smarter, faster, and more confident.',
            'Intelligence should be felt, not flaunted.'
          ]
        },
        {
          heading: 'What "Felt" Means',
          paragraphs: [
            'An intelligent product doesn\'t talk about how clever it is. It shows you through:',
            '" Anticipating your next action before you think of it',
            '" Removing friction you didn\'t know existed',
            '" Surfacing insights you couldn\'t have found manually',
            '" Adapting to your behavior without requiring explicit configuration',
            'The intelligence is invisible until you try to do the task without itthen you realize how much cognitive load it was carrying.'
          ]
        },
        {
          heading: 'The Problem with "AI Features"',
          paragraphs: [
            'Most products treat AI as a feature to market rather than a system to embed.',
            'They add "AI-powered search" or "Smart recommendations" as discrete, labeled capabilities.',
            'But this breaks the user\'s mental model. It forces them to think about the AI instead of thinking with it.',
            'The goal isn\'t to make users aware of AI. The goal is to make users feel more capable because AI is working invisibly in the background.'
          ]
        },
        {
          heading: 'How to Design Intelligence That\'s Felt',
          paragraphs: [
            '1. Embed intelligence in the flow, not as a separate feature',
            '2. Make the AI\'s actions legible and predictable, not magical',
            '3. Give users agency to override or adjust AI behavior',
            '4. Optimize for confidence, not just speed or accuracy',
            '5. Show intelligence through outcomes, not through process',
            'Examples:',
            '" Zero: AI categorizes emails invisibly, surfaces actions contextually',
            '" Project Compass: AI indexes video in real-time, populates insights as you watch',
            '" Project Atlas: AI surfaces opportunities proactively, integrates into existing workflows'
          ]
        },
        {
          heading: 'The Outcome: Enhanced Agency',
          paragraphs: [
            'When intelligence is felt rather than flaunted, users don\'t feel like they\'re using an AI product.',
            'They feel like they\'re better at their job. Faster at making decisions. More confident in their choices.',
            'That\'s the benchmark: does the AI make the user feel more capable?',
            'If yes, you\'ve designed intelligence well. If no, you\'ve just added complexity.'
          ]
        },
        {
          heading: 'What This Means for Your Product',
          paragraphs: [
            'If you\'re building an AI-powered product, ask yourself:',
            '" Does the AI enhance the user\'s sense of agency, or does it take control away?',
            '" Can users understand why the AI made a decision?',
            '" Does the experience feel magical, or just automated?',
            '" Would users describe this as "smart" or just "fast"?',
            'Intelligence felt, not flaunted. That\'s the future of AI UX.'
          ]
        }
      ]
    },

    relatedInsights: ['agentic-ux-design-principles']
  },

  {
    slug: 'agentic-ux-design-principles',
    title: 'Agentic UX: Design Principles',
    subtitle: 'How to design experiences where AI agents act on your behalf',
    excerpt: 'Agentic AIsystems that act autonomously on behalf of usersrequires a completely new approach to UX. Here are the principles we use at Rationale to design agentic experiences.',
    publishedAt: '2024-12-10',
    readTime: '10 min read',
    category: 'Design',
    tags: ['AI UX', 'Agents', 'Design Principles', 'Agentic Systems'],
    author: {
      name: 'Matt Hanson',
      role: 'Founder, Rationale'
    },

    content: {
      sections: [
        {
          paragraphs: [
            'Agentic AI represents a fundamental shift in how we design software.',
            'Traditional UX assumes the user is in control, making decisions and issuing commands.',
            'Agentic UX inverts this: the AI acts autonomously on the user\'s behalf, and the user\'s role becomes monitoring, adjusting, and approving.',
            'This requires entirely new design principles.'
          ]
        },
        {
          heading: 'Principle 1: Legibility Over Magic',
          paragraphs: [
            'Agents must make their reasoning visible. Users need to understand:',
            '" What the agent is doing',
            '" Why it made that decision',
            '" What data or assumptions it used',
            'Magic feels impressive until it fails. Legibility builds trust.',
            'Example: Project Compass shows its tagging logic as it indexes video, not just the final tags.'
          ]
        },
        {
          heading: 'Principle 2: Progressive Autonomy',
          paragraphs: [
            'Don\'t start with full autonomy. Build trust incrementally.',
            'Phase 1: Agent suggests, user approves',
            'Phase 2: Agent acts, user reviews',
            'Phase 3: Agent acts autonomously, user monitors',
            'Users need to feel they can intervene before they\'re comfortable delegating control.',
            'Example: Zero suggests email actions first, learns user preferences, then automates over time.'
          ]
        },
        {
          heading: 'Principle 3: Graceful Degradation',
          paragraphs: [
            'Agents will fail. Design for failure modes from day one.',
            '" What happens when the agent is uncertain?',
            '" How does it communicate confidence levels?',
            '" Can the user easily override or undo actions?',
            'The quality of an agentic system is measured by how it handles edge cases, not just happy paths.',
            'Example: Project Atlas surfaces confidence scores for opportunity detection, flags low-confidence findings for manual review.'
          ]
        },
        {
          heading: 'Principle 4: Agency Through Constraints',
          paragraphs: [
            'Autonomy without boundaries creates anxiety. Users need to feel in control even when the agent is acting.',
            'Define clear constraints:',
            '" What can the agent do without approval?',
            '" What requires user review?',
            '" What is completely off-limits?',
            'Constraints don\'t limit the agentthey create trust.',
            'Example: Project Amplify allows agents to generate content variations but requires athlete approval before publication.'
          ]
        },
        {
          heading: 'Principle 5: Adaptive Context',
          paragraphs: [
            'Agents must understand not just the task, but the context around it.',
            '" What is the user trying to achieve?',
            '" What are their constraints and preferences?',
            '" How does this action fit into their broader goals?',
            'Context-aware agents feel intelligent. Context-blind agents feel robotic.',
            'This is why Zero learns your email triage patterns instead of using generic categorization.'
          ]
        },
        {
          heading: 'What This Means for Your Product',
          paragraphs: [
            'If you\'re building agentic experiences, these principles are non-negotiable:',
            '1. Make agent reasoning legible',
            '2. Build trust through progressive autonomy',
            '3. Design for failure and uncertainty',
            '4. Define clear boundaries and constraints',
            '5. Adapt to user context, not just commands',
            'Agentic UX is the future of software. Get it right, and you create experiences that feel like superpowers. Get it wrong, and you create anxiety and mistrust.',
            'At Rationale, we specialize in designing these systems. Because the hardest part isn\'t the AIit\'s making users feel confident letting it act on their behalf.'
          ]
        }
      ]
    },

    relatedInsights: ['intelligence-felt-not-flaunted']
  },

  {
    slug: 'building-ar-commerce-at-scale',
    title: 'Building AR Commerce at Scale',
    subtitle: 'Lessons from shipping AR shopping to billions',
    excerpt: 'At Meta, we built the AR commerce ecosystem from prototype to production—serving 10+ retailers with 200+ products and achieving 150% platform growth. Here is what we learned about building clarity before building features.',
    publishedAt: '2024-12-01',
    readTime: '12 min read',
    category: 'Product',
    tags: ['AR', 'E-commerce', 'Platform Strategy', 'Scale'],
    author: {
      name: 'Matt Hanson',
      role: 'Founder, Rationale'
    },

    content: {
      sections: [
        {
          heading: 'The Problem: AR Was Cosmetic, Not Capable',
          paragraphs: [
            'When we started building AR commerce at Meta, the tools were limited to face filters—not extensible, not shippable, not useful for real shopping experiences.',
            'No infrastructure existed for incubating, validating, or launching new AR formats. Snap and Google had table-stakes capabilities (try-ons, branded templates, creator commerce), but Meta wasn\'t even in the race.',
            'Creators lacked tools to build utility or monetize their work. There was no pipeline to move from idea to scaled implementation.',
            'The gap was clear: AR needed to become capable, not just cosmetic.'
          ]
        },
        {
          heading: 'The Core Problem: Building Confidence to Buy',
          paragraphs: [
            'When someone is interested in a product, help them build up their confidence to buy.',
            'The challenge wasn\'t technology—it was user psychology:',
            '• Limited Visualization: 2D pictures make it hard to imagine what products look like in real life',
            '• Brand Uncertainty: Consumers lack confidence in new brands without tactile evaluation',
            '• High Return Rates: At least 30% of online products are returned because they look different than expected',
            '• Inability to Inspect: Users can\'t properly evaluate products without trying them on or seeing them in context',
            'AR commerce isn\'t about novelty—it\'s about removing friction from purchase decisions.'
          ]
        },
        {
          heading: 'The Solution: An AR Pipeline for Capabilities and Experiences',
          paragraphs: [
            'We didn\'t just ship AR commerce for Instagram—we created a system that felt native across all Meta platforms while enabling thousands of brands to participate.',
            '**Core UX Design:**',
            '• Multiple Entry Points: Various paths into the Shopping Camera, starting with product detail pages (PDP)',
            '• Object/Makeup AR View: Authentic product in real space with intuitive toggle affordance',
            '• Object 3D View: Inspect the product\'s digital twin like in a familiar image lightbox',
            '• Purchase Path: Direct conversion from AR to shopping cart with minimal steps',
            '**Scaling Strategy:**',
            '• Craft Focus: Build quality foundation that builds user trust (realism, visual fidelity, intuitive interactions)',
            '• System Design: Shared rendering primitives, cross-platform interaction patterns, self-serve implementation tools, automated quality assurance',
            'We didn\'t just ship features. We built an ecosystem.'
          ]
        },
        {
          heading: 'Barriers to Business Adoption',
          paragraphs: [
            'The technical challenges were solvable. The real barriers were business adoption:',
            '**Creation Flexibility:** Brands lacked technical expertise but wanted customization options',
            '**UX Consistency:** Desire for differentiation led to fragmented UX patterns',
            '**Technical Barriers:** Marketers needed no-code solutions with familiar interfaces',
            'Our solution:',
            '• Simplified creation tools with templated approaches',
            '• Product-specific parameters within guardrails',
            '• Standardized interactions with branded visual elements',
            '• No-code solutions with guided workflows',
            'The Container Effects System became the breakthrough—allowing bulk asset uploads via Meta Product Catalogue, brand-specific customization within guardrails, and 3D content connected at runtime from the catalogue.'
          ]
        },
        {
          heading: 'Results and Impact',
          paragraphs: [
            'We built this ecosystem in just 6 months, delivering scalable, realistic AR commerce experiences across all touchpoints.',
            '**Consumer Success:**',
            '• High-quality, intuitive experiences for informed purchasing',
            '• AR entry point on PDP, Stories entry with attribution, seamless try-on experiences',
            '**Meta Success:**',
            '• Launched AR Camera in IG Shopping, drove +0.8% lift in click-through rate, increased time spent in shopping',
            '**Business Success:**',
            '• Onboarded 10+ retailers with 200+ products',
            '• Land key retailers (Nike, Warby Parker)',
            '• Drive measurable sales impact',
            '**Platform Impact:**',
            '• 150% platform growth in Spark AR usage within 12 months',
            '• 100x inventory volume increase in AR-enabled products',
            'The key wasn\'t speed—it was building clarity of purpose, aligning execution, and protecting against the risk of building the wrong thing fast.'
          ]
        },
        {
          heading: 'What This Teaches About Product Development',
          paragraphs: [
            'Building AR commerce at Meta wasn\'t about shipping features—it was about designing a system that could scale.',
            'The lessons:',
            '• **Start with craft, build for scale:** High-quality foundation first, then systems that enable broad adoption',
            '• **Meet businesses where they are:** Simplify creation for non-technical users while giving them agency',
            '• **Build trust through realism:** Fidelity matters—users need to trust the AR representation',
            '• **Seamless integration wins:** AR adoption grows when experiences feel natural within existing flows',
            '• **Brand education is critical:** Supporting retailers with tools and knowledge drives industry-wide adoption and quality',
            'This is why Rationale exists: to apply these lessons to early-stage teams, protecting them from the catastrophic risk of building the wrong thing fast.'
          ]
        }
      ]
    },

    relatedInsights: ['clarity-precedes-illumination', 'course-before-speed']
  },

  {
    slug: 'brand-as-execution-engine',
    title: 'Brand as Execution Engine',
    subtitle: 'Lessons from RUMI: How brand identity enabled product decisions',
    excerpt: 'Building RUMI taught me that brand isn\'t just marketing—it\'s the execution engine. By establishing identity early, teams can build with confidence instead of endlessly debating hypotheticals.',
    publishedAt: '2024-11-15',
    readTime: '10 min read',
    category: 'Strategy',
    tags: ['Brand Strategy', 'Product Development', 'Decision Making', 'AI'],
    author: {
      name: 'Matt Hanson',
      role: 'Founder, Rationale'
    },

    content: {
      sections: [
        {
          heading: 'The Problem: Vision Without Identity',
          paragraphs: [
            'RUMI started as a fragmented concept—an AI companion for transforming passive media into interactive experiences.',
            'The vision was there. The technology was possible. But the product had no center.',
            '• Brand and product design were conflated—no shared system or direction',
            '• Visual identity changed constantly based on mood or stakeholder input',
            '• Internal teams and external contributors had no consistent foundation',
            'The product couldn\'t move forward because the team was stuck debating hypotheticals instead of building.'
          ]
        },
        {
          heading: 'The Insight: Brand as Execution Engine',
          paragraphs: [
            'We realized: brand isn\'t just marketing. It\'s the execution engine.',
            'By establishing RUMI\'s identity from zero, we clarified:',
            '• **What the product is:** A layer of meaning that helps AI understand the emotion, context, and culture behind content',
            '• **Who it\'s for:** People who want personal, participatory, human-centered media experiences',
            '• **How it should feel:** Curious, friendly, clever, imaginative, thoughtfully crafted, fun, emotionally intelligent, approachable, transparent, and culturally relevant',
            'With this foundation, the product became buildable.'
          ]
        },
        {
          heading: 'What We Built',
          paragraphs: [
            'We spun up and led a cross-disciplinary collaboration with a dedicated vendor team and one internal designer.',
            'We co-developed a full-spectrum brand system spanning:',
            '• **Voice:** Copy principles and conversational tone',
            '• **Visual Language:** Logo system, color palette, typography, imagery style, motion design',
            '• **Interaction Patterns:** How RUMI communicates and behaves',
            'This wasn\'t theoretical. It was practical—integrated into the product UI and used to enable product development.',
            'The brand system became the foundation our marketing team could build from, aligning product vision and public story.'
          ]
        },
        {
          heading: 'How Brand Enabled Product',
          paragraphs: [
            'Once the brand was established, product decisions became faster and more confident.',
            '• **Engineering, Product, AI, and partners aligned** to one brand system',
            '• **Integrated the system into the product UI**—ensuring consistency from prototype to production',
            '• **Visual design no longer slowed decisions**—it enabled them',
            '• **The product became buildable**—not theoretical',
            'Brand wasn\'t a layer on top of the product. It was the system that shaped the product.'
          ]
        },
        {
          heading: 'From Wireframes to Prototypes',
          paragraphs: [
            'RUMI taught me another lesson: **prototypes, not slides.**',
            'Instead of debating hypotheticals in Figma, we introduced vibe coding—prototyping in Cursor to feel functionality.',
            '• Shifted from spec-based cycles to usage-led iteration',
            '• Simplified core product surface around a single journey',
            '• Built working prototypes that revealed real user behavior',
            'The team stopped guessing and started building. Design became the alignment mechanism.'
          ]
        },
        {
          heading: 'What This Means for Your Product',
          paragraphs: [
            'If your team is stuck debating product decisions, the problem might not be lack of ideas—it might be lack of identity.',
            'Brand isn\'t a final polish. It\'s the foundation that enables confident execution.',
            'At Rationale, we apply this lesson to every engagement:',
            '• Establish identity early—not as marketing, but as a decision-making framework',
            '• Use brand to create conviction—not just aesthetics',
            '• Build prototypes that test assumptions—not decks that present hypotheticals',
            'Brand as execution engine. That\'s the shift that unlocks speed.'
          ]
        }
      ]
    },

    relatedInsights: ['prototypes-not-slides', 'clarity-precedes-illumination']
  },

  {
    slug: 'prototypes-not-slides',
    title: 'Prototypes, Not Slides',
    subtitle: 'Why vibe coding beats wireframes for product conviction',
    excerpt: 'Wireframes show what a product might look like. Prototypes show what it feels like. At RUMI, we introduced vibe coding—building in Cursor to test functionality, not aesthetics. Here\'s why it works.',
    publishedAt: '2024-11-01',
    readTime: '8 min read',
    category: 'Process',
    tags: ['Prototyping', 'Product Development', 'Rapid Iteration', 'Conviction'],
    author: {
      name: 'Matt Hanson',
      role: 'Founder, Rationale'
    },

    content: {
      sections: [
        {
          heading: 'The Problem: Wireframes Don\'t Answer the Hard Questions',
          paragraphs: [
            'RUMI had a clear problem: the team was stuck debating hypotheticals.',
            '• Product had no center—features were added without cohesion',
            '• Wireframes didn\'t reflect real usage or feel',
            '• The team was stuck in spec-based cycles instead of usage-led iteration',
            'Wireframes are useful for alignment, but they can\'t answer the hardest product questions:',
            '• Does this feel right?',
            '• Will users understand this interaction?',
            '• Does this behavior change actually work?',
            'For those questions, you need something you can use—not just look at.'
          ]
        },
        {
          heading: 'The Solution: Vibe Coding',
          paragraphs: [
            'We introduced a new approach: vibe coding.',
            'Instead of wireframing in Figma, we prototyped in Cursor—building functional surfaces to test interaction patterns.',
            'This wasn\'t about polish. It was about feeling functionality before committing to it.',
            '**How it worked:**',
            '• Built working prototypes in Cursor (fast, no production constraints)',
            '• Tested core interactions and flows',
            '• Iterated based on actual usage, not hypothetical discussions',
            '• Simplified the core product surface around a single journey',
            'The shift: from wiring to try-ing.'
          ]
        },
        {
          heading: 'What We Learned',
          paragraphs: [
            '**1. Prototypes Reveal Truth Faster Than Wireframes**',
            'You can\'t feel a wireframe. You can feel a prototype. When the team could interact with RUMI, product decisions became obvious.',
            '**2. Usage-Led Iteration Beats Spec-Based Cycles**',
            'Wireframes invite debate. Prototypes invite usage. Usage reveals what works and what doesn\'t.',
            '**3. Simplification Through Use**',
            'By building a working prototype, we realized the product needed to focus on one core journey—not multiple fragmented features.',
            '**4. Design Became the Alignment Mechanism**',
            'Once the team could use RUMI, everyone aligned. Engineers shipped with confidence. Product leaders stopped debating. AI partners understood the vision.'
          ]
        },
        {
          heading: 'When to Use Vibe Coding',
          paragraphs: [
            'Vibe coding works best when:',
            '• The core interaction model is unclear',
            '• The team is stuck debating hypotheticals',
            '• You need to test assumptions about user behavior',
            '• You\'re building something novel where patterns don\'t exist yet',
            'It\'s not a replacement for high-fidelity design or production engineering. It\'s the bridge between wireframes and confidence.'
          ]
        },
        {
          heading: 'How Rationale Uses This',
          paragraphs: [
            'At Rationale, vibe coding is core to our Prototype Kit.',
            'We build high-fidelity, interactive prototypes that:',
            '• Test the hardest assumptions first',
            '• Reveal real user behavior (not hypothetical behavior)',
            '• Create conviction before expensive engineering',
            '• Give founders something to show investors, users, and team members',
            'Prototypes aren\'t about polish. They\'re about conviction.',
            'Because in the AI era, the biggest risk isn\'t building slowly—it\'s building the wrong thing fast.',
            'Prototypes protect you from that risk. Wireframes don\'t.'
          ]
        }
      ]
    },

    relatedInsights: ['brand-as-execution-engine', 'building-wrong-thing-faster']
  }
];

// ============================================================================
// Helper Functions
// ============================================================================

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return insights.find(article => article.slug === slug);
}

export function getAllInsightSlugs(): string[] {
  return insights.map(article => article.slug);
}

export function getInsightsByCategory(category: string): InsightArticle[] {
  return insights.filter(article => article.category === category);
}

export function getInsightsByTag(tag: string): InsightArticle[] {
  return insights.filter(article => article.tags.includes(tag));
}

export function getRecentInsights(limit: number = 3): InsightArticle[] {
  return [...insights]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getRelatedInsights(slug: string, limit: number = 3): InsightArticle[] {
  const article = getInsightBySlug(slug);
  if (!article || !article.relatedInsights) return [];

  return article.relatedInsights
    .map(relatedSlug => getInsightBySlug(relatedSlug))
    .filter((a): a is InsightArticle => a !== undefined)
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  const categories = insights.map(article => article.category);
  return Array.from(new Set(categories)).sort();
}

export function getAllInsightTags(): string[] {
  const tags = insights.flatMap(article => article.tags);
  return Array.from(new Set(tags)).sort();
}
