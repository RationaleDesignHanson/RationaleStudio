'use client';

import Link from 'next/link';
import { OS8Window, CollapsibleOS8Window } from '@/components/visual-test';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4 animate-fade-in-up">
            CONVICTION-FIRST EXECUTION
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up delay-100">
            About Rationale
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-8 animate-fade-in-up delay-200">
            Two Engines, One System. Rationale Kits fund runway. Portfolio IP accumulates value. Mental models for systematic execution.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Who We Are"
            variant="body"
            delay={100}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 text-gray-100">
              <p className="text-base leading-relaxed">
                Rationale is a product development studio founded by Matt Hanson—former creative director turned design leader who spent 7 years at Meta (Reality Labs AR platform, Superhuman AI Intelligence Org) and led design at FuboTV (publicly traded streaming platform). We build products that ship, not prototypes that stay in Figma.
              </p>
              <p className="text-base leading-relaxed">
                Before the product work: motion design, art direction, and brand strategy for enterprise clients. That creative foundation shapes how we think about product—as systems that feel right, not just function correctly.
              </p>
              <p className="text-base leading-relaxed">
                Now we're applying that systematic execution to our own portfolio IP and select equity partnerships. We prove it with Zero: 7 prototypes validated core mechanics before a single line of production code.
              </p>
              <p className="text-base leading-relaxed">
                <span className="font-bold">Core belief:</span> Feel what works early. Build with conviction. Ship with speed.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* The Whiteboard Moment */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              The Whiteboard Moment
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              The origin story
            </p>
          </div>

          <OS8Window
            title="The Whiteboard Moment"
            variant="featured"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 text-gray-100 leading-relaxed">
              <p className="text-base">
                When I worked at Meta, right after they acquired Oculus, I wanted to create a vision video for our augmented reality platform. I went to my skip manager (who would later form Reality Labs) to request budget approval.
              </p>
              <p className="text-base">
                He stopped me and told me this story: Someone once came to his office asking for a few million dollars to finish a feature film about virtual reality. It was impressive, expensive, but the entire film only had about 10 minutes of actual in-headset product experience. You couldn't really understand what it did.
              </p>
              <p className="text-base">
                He went to the whiteboard. On the left, he drew a lightbulb (an idea). On the right, a ship (a shipping product). He drew a line connecting them.
              </p>
              <p className="text-base">
                He made a checkmark close to the lightbulb and said, "This is where vision videos are." Then he walked to the right side and made a mark close to the ship: "This is where you want to be. Get the work so close to shipping that all you need is engineering resources to make it real."
              </p>
              <p className="text-base font-semibold text-[#FFD700]">
                Anything to the left of that mark doesn't get you much value.
              </p>
              <p className="text-base border-t border-[#FFD700]/30 pt-4 mt-6 italic text-gray-300">
                That conversation changed everything for me. It's why I founded Rationale: to help teams get to that critical point before committing resources.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Why Build My Own IP? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Why Build My Own IP?"
            variant="body"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 text-gray-100">
              <p className="text-base leading-relaxed">
                After 7 years at Meta and a Head of Design role at FuboTV, I had proof I could operate at scale. But I kept seeing the same pattern: teams would spend months debating direction, then rush to ship something that didn't work. The wrong things got built because the right questions weren't asked early enough.
              </p>
              <p className="text-base leading-relaxed">
                I didn't want to just advise on that problem. I wanted to solve it by building products that prove a better way exists—and help other founders apply that same systematic execution to their ideas.
              </p>
              <p className="text-base leading-relaxed font-semibold">
                Rationale is that solution: portfolio IP that proves the methodology, and client partnerships that fund the runway while hardening the systems.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Dual-Engine Model */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Two Engines, One System
            </h2>
            <p className="text-base sm:text-lg text-gray-400 font-mono tracking-wide">
              ONE FLYWHEEL
            </p>
          </div>

          {/* Desktop: Side-by-Side */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 mb-12">
            <OS8Window
              title="Engine 1 — Portfolio IP"
              variant="featured"
              delay={100}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#FFD700]">Products We Own</h3>
                <p className="text-sm text-gray-100 leading-relaxed">
                  Proprietary products that prove systematic execution and generate scalable IP.
                </p>

                <div className="space-y-3">
                  <div className="border-l-2 border-[#FFD700] pl-3">
                    <p className="font-semibold text-[#FFD700] text-sm">Zero</p>
                    <p className="text-xs text-gray-300">7 prototypes validated mechanics before production</p>
                  </div>
                  <div className="border-l-2 border-[#FFD700] pl-3">
                    <p className="font-semibold text-[#FFD700] text-sm">Compass</p>
                    <p className="text-xs text-gray-300">AI video intelligence for executive clarity</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#FFD700]">
                  <Link href="/work/zero" className="text-sm text-gray-100 font-semibold hover:text-[#FFD700] transition-colors">
                    View Portfolio →
                  </Link>
                </div>
              </div>
            </OS8Window>

            <OS8Window
              title="Engine 2 — Client Kits"
              variant="featured"
              delay={200}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#FFD700]">Partnerships</h3>
                <p className="text-sm text-gray-100 leading-relaxed">
                  Equity + fee engagements. Shared systems. Co-invested growth.
                </p>

                <div className="space-y-3">
                  <div className="border-l-2 border-[#FFD700] pl-3">
                    <p className="font-semibold text-[#FFD700] text-sm">Clarity Kits</p>
                    <p className="text-xs text-gray-300">2-week sprints to validate direction</p>
                  </div>
                  <div className="border-l-2 border-[#FFD700] pl-3">
                    <p className="font-semibold text-[#FFD700] text-sm">Build Ship Run</p>
                    <p className="text-xs text-gray-300">8-12 week production-ready builds</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#FFD700]">
                  <Link href="/how-we-work" className="text-sm text-gray-100 font-semibold hover:text-[#FFD700] transition-colors">
                    How We Work →
                  </Link>
                </div>
              </div>
            </OS8Window>
          </div>

          {/* Mobile: Stacked */}
          <div className="md:hidden space-y-8 mb-12">
            <OS8Window
              title="Engine 1 — Portfolio IP"
              variant="featured"
              animateIn={false}
            >
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#FFD700]">Products We Own</h3>
                <p className="text-sm text-gray-100 leading-relaxed">
                  Proprietary products that prove systematic execution and generate scalable IP.
                </p>
                <Link href="/work/zero" className="text-sm text-gray-100 font-semibold hover:text-[#FFD700] transition-colors">
                  View Portfolio →
                </Link>
              </div>
            </OS8Window>

            <OS8Window
              title="Engine 2 — Client Kits"
              variant="featured"
              animateIn={false}
            >
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#FFD700]">Partnerships</h3>
                <p className="text-sm text-gray-100 leading-relaxed">
                  Equity + fee engagements. Shared systems. Co-invested growth.
                </p>
                <Link href="/how-we-work" className="text-sm text-gray-100 font-semibold hover:text-[#FFD700] transition-colors">
                  How We Work →
                </Link>
              </div>
            </OS8Window>
          </div>

          {/* Explanation */}
          <div className="max-w-3xl mx-auto text-center">
            <OS8Window
              title="Why Both?"
              variant="subtle"
              animateIn={false}
            >
              <p className="text-sm text-gray-400 leading-relaxed">
                <span className="font-bold text-gray-300">Portfolio IP proves capability.</span> Client Kits fund runway and generate market insights. Both engines feed each other. Portfolio learnings improve Client systems. Client work seeds Portfolio concepts. One flywheel, compounding value.
              </p>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Core Beliefs
            </h2>
            <p className="text-base sm:text-lg text-gray-400 font-mono tracking-wide">
              MENTAL MODELS FROM YEARS SHIPPING
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Mental Model 1: Expanded by default */}
            <CollapsibleOS8Window
              title="01 // Clarity Precedes Illumination"
              variant="body"
              defaultExpanded={true}
            >
              <div className="space-y-4">
                <p className="text-base text-gray-100 leading-relaxed">
                  <span className="font-bold text-gray-100">Design the circuit before the lightbulb.</span> The most elegant execution is meaningless without an underlying system of clarity, behavior, and intent.
                </p>
                <div className="border-l-2 border-gray-700 pl-4">
                  <p className="text-sm text-gray-100 leading-relaxed mb-2">
                    <span className="font-semibold text-gray-100">In practice:</span>
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Map the problem space before the solution space</li>
                    <li>• Define behavior change, not features</li>
                    <li>• Build conviction before execution</li>
                  </ul>
                </div>
              </div>
            </CollapsibleOS8Window>

            {/* Mental Model 2: Collapsed */}
            <CollapsibleOS8Window
              title="02 // Course Before Speed"
              variant="body"
              defaultExpanded={false}
            >
              <div className="space-y-4">
                <p className="text-base text-gray-100 leading-relaxed">
                  <span className="font-bold text-gray-100">Direction is the new bottleneck.</span> AI has given everyone unprecedented speed. But without clear direction, more speed only gets you lost faster.
                </p>
                <div className="border-l-2 border-gray-700 pl-4">
                  <p className="text-sm text-gray-100 leading-relaxed mb-2">
                    <span className="font-semibold text-gray-100">In practice:</span>
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Validate assumptions before scaling execution</li>
                    <li>• Test the hardest risks first</li>
                    <li>• Build the map before accelerating</li>
                  </ul>
                </div>
              </div>
            </CollapsibleOS8Window>

            {/* Mental Model 3: Collapsed */}
            <CollapsibleOS8Window
              title="03 // Build to Prove"
              variant="body"
              defaultExpanded={false}
            >
              <div className="space-y-4">
                <p className="text-base text-gray-100 leading-relaxed">
                  <span className="font-bold text-gray-100">Working software is the most honest form of thinking.</span> Prototypes don't show what something looks like. They show what something works like.
                </p>
                <div className="border-l-2 border-gray-700 pl-4">
                  <p className="text-sm text-gray-100 leading-relaxed mb-2">
                    <span className="font-semibold text-gray-100">In practice:</span>
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Build functional prototypes, not static mocks</li>
                    <li>• Test with real users early and often</li>
                    <li>• Let evidence guide decisions, not opinions</li>
                  </ul>
                </div>
              </div>
            </CollapsibleOS8Window>
          </div>
        </div>
      </section>

      {/* Founder Background */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Founder Background
            </h2>
          </div>

          <OS8Window
            title="Matt Hanson"
            variant="body"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-6 text-gray-100">
              <div className="border-b border-gray-700 pb-6">
                <p className="text-base text-gray-100 leading-relaxed mb-4">
                  Matt Hanson builds products the way he learned to think: by making things real enough to feel whether they work. That approach was shaped across 15+ years spanning creative direction, AR platform work, AI research tools, and consumer product leadership.
                </p>
              </div>

              <div>
                <p className="text-lg font-bold mb-3">Meta (2018–2025) — 7 Years Across Three Teams</p>
                <div className="space-y-4 ml-4">
                  <div>
                    <p className="font-semibold">Superhuman AI Intelligence Org — Embodied AI</p>
                    <p className="text-sm text-gray-300 mb-2">2023–2025 | Senior Product Design Manager</p>
                    <p className="text-sm text-gray-100 leading-relaxed mb-2">
                      Led design for AI research tools that helped scientists build and test embodied AI agents. Shipped prototypes to validate interaction models before committing to production systems. Increased research team prototype velocity by 60% through systematic design frameworks.
                    </p>
                    <p className="text-xs text-gray-400 italic">
                      This is where "build to prove" became doctrine. Research demands evidence, not opinions.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">Reality Labs — AR/MR Platform + Hardware</p>
                    <p className="text-sm text-gray-300 mb-2">2018–2023 | Senior Product Design Manager</p>
                    <p className="text-sm text-gray-100 leading-relaxed mb-2">
                      Led design for AR platform products across Instagram, Facebook, and Spark AR. Launched AR Shopping (100%+ inventory growth first year). Shipped features to millions of users across mobile and emerging AR hardware. F8 2018 stage presenter with Nike, Target, Sephora, ASUS.
                    </p>
                    <p className="text-sm text-gray-100 leading-relaxed mb-2">
                      Patent holder: "Interactive Avatars in Artificial Reality" (2021) — contributed to Spark AR avatar systems.
                    </p>
                    <p className="text-xs text-gray-400 italic">
                      This is where systematic execution at scale became muscle memory.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <p className="text-lg font-bold mb-3">FuboTV (2024–2025) — Head of Design</p>
                <p className="text-sm text-gray-100 leading-relaxed mb-2">
                  Led Growth, Design Systems, and New Features at a publicly traded live streaming platform. Scaled design operations across consumer and B2B products. Built AI-powered tooling for production-scale feature development.
                </p>
                <p className="text-xs text-gray-400 italic">
                  Proof I can operate across consumer subscription models and enterprise workflows.
                </p>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <p className="text-lg font-bold mb-3">Before Product: Creative Direction & Motion Design</p>
                <p className="text-sm text-gray-100 leading-relaxed mb-2">
                  Creative director, artist, and motion designer working with enterprise clients and emerging brands. Built visual systems, directed motion work, and created brand strategies before transitioning into product design.
                </p>
                <p className="text-xs text-gray-400 italic">
                  This creative foundation shapes how Rationale thinks about product—systems that feel right, not just function correctly.
                </p>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <p className="text-lg font-bold mb-2">Education & Recognition</p>
                <p className="text-sm text-gray-100 mb-1">BFA in Computer Art, SUNY Buffalo (1996–2000)</p>
                <p className="text-sm text-gray-100">Patent: "Interactive Avatars in Artificial Reality" (USPTO, 2021)</p>
                <p className="text-sm text-gray-100">F8 2018 Stage Presenter (Meta Developer Conference)</p>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Beyond Work */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Beyond Work"
            variant="subtle"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 text-gray-400">
              <p className="text-base leading-relaxed">
                Father of three daughters. When not building products, you'll find me throwing pottery, experimenting in the kitchen (beef wellington is a specialty), or logging miles on the Peloton.
              </p>
              <p className="text-base leading-relaxed">
                These pursuits aren't separate from the work—they're all about the same thing: systematic practice, iterative improvement, and finding joy in the process of making things better.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title="Let's Work Together"
            variant="cta"
            animateIn={false}
            className="max-w-lg"
          >
            <div className="space-y-6">
              <p className="text-base text-[#FFD700] leading-relaxed">
                Ready to apply these mental models to your product challenge? Let's talk about how we can help you build conviction.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/contact"
                  className="flex-1 bg-[#FFD700] hover:bg-[#FFE34D] text-black text-center px-6 py-3 font-semibold transition-colors"
                >
                  Start a Conversation →
                </Link>
                <Link
                  href="/how-we-work"
                  className="flex-1 border border-[#FFD700] hover:border-[#FFE34D] text-[#FFD700] hover:text-[#FFE34D] text-center px-6 py-3 font-semibold transition-colors"
                >
                  How We Work →
                </Link>
              </div>

              <div className="pt-3 border-t border-[#FFD700]/30 text-center">
                <p className="text-xs text-[#FFD700]/70">
                  studio@rationale.design
                </p>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>
    </main>
  );
}
