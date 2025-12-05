'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        {/* ASCII Grid Background - Terminal Republic Hero */}
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4 animate-fade-in-up">
            PROVEN VELOCITY // 7 PROTOTYPES BEFORE PRODUCTION
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up delay-100">
            Don't Spend 6 Months
            <br />
            Building the Wrong Thing
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 animate-fade-in-up delay-200">
            Rationale gets you to working prototypes in weeks, not quarters. Feel what works early. Build with conviction. Ship with speed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link
              href="#portfolio"
              className="px-8 py-4 bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              See How We De-Risk →
            </Link>
            <Link
              href="#services"
              className="px-8 py-4 border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
            >
              View Our Kits
            </Link>
          </div>
        </div>
      </section>

      {/* Why We Ship Fast → REDESIGNED WITH ATHLETES FIRST STRUCTURE */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        {/* ASCII Grid Background */}
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* SECTION HEADER */}
          <div className="text-center mb-16">
            <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-3 uppercase">
              Our Methodology
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Why Most Teams Waste 6 Months
              <br />
              <span className="text-[#FFD700]">Building the Wrong Thing</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              You're 4 months into development. Users finally test it.{' '}
              <span className="text-white font-semibold">They hate it.</span>{' '}
              Pivoting is expensive. Killing is painful. Rationale eliminates this risk.
            </p>
          </div>

          {/* SLIDE 1: THE PROBLEM */}
          <div className="mb-16">
            <div className="max-w-5xl mx-auto">
              <OS8Window
                title="The Problem: Building Before You Know What Works"
                variant="featured"
                delay={100}
              >
                <div className="space-y-6">
                  <p className="text-sm text-gray-100 leading-relaxed">
                    Most teams commit to production architecture before validating core assumptions.
                    By the time users see it, you're 3-6 months in. <span className="text-[#FFD700] font-semibold">Pivoting means throwing away weeks of work. Killing means political fallout.</span>
                  </p>

                  {/* Comparison Diagram */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Traditional Approach */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
                      <div className="text-xs font-mono text-red-400 mb-3 uppercase tracking-wide">
                        ⚠️ Traditional Approach
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center">
                            <span className="text-xs font-mono font-bold text-red-400">4w</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-100">Write Specs</div>
                            <div className="text-xs text-gray-400">Debate, document, guess</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center">
                            <span className="text-xs font-mono font-bold text-red-400">16w</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-100">Build Production</div>
                            <div className="text-xs text-gray-400">No user validation yet</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center">
                            <span className="text-xs font-mono font-bold text-red-400">4w</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-100">User Testing</div>
                            <div className="text-xs text-red-400">😱 Core UX doesn't work</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="text-xs text-gray-400">
                          <span className="font-semibold text-red-400">Risk:</span> $200K+ invested before validation
                        </div>
                      </div>
                    </div>

                    {/* Rationale Approach */}
                    <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-5">
                      <div className="text-xs font-mono text-[#FFD700] mb-3 uppercase tracking-wide">
                        ✓ Rationale Approach
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center">
                            <span className="text-xs font-mono font-bold text-[#FFD700]">2w</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-100">7 Prototypes</div>
                            <div className="text-xs text-gray-400">Real user testing, rapid pivots</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center">
                            <span className="text-xs font-mono font-bold text-[#FFD700]">1w</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-100">Lock Architecture</div>
                            <div className="text-xs text-gray-400">7 validated decisions</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center">
                            <span className="text-xs font-mono font-bold text-[#FFD700]">8w</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-100">Build Right Thing</div>
                            <div className="text-xs text-[#00FF94]">✓ Zero rework needed</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-[#FFD700]/30">
                        <div className="text-xs text-gray-400">
                          <span className="font-semibold text-[#FFD700]">Risk:</span> $50K invested before lock-in, pivot-friendly
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deep Dive Accordion */}
                  <details className="mt-6 border-t border-gray-700 pt-6">
                    <summary className="text-sm font-mono uppercase tracking-wide text-[#FFD700] cursor-pointer hover:text-[#FFE34D] transition-colors">
                      Deep Dive: The Build-First Trap →
                    </summary>
                    <div className="mt-6 space-y-5">
                      <div className="border-l-2 border-[#FFD700] pl-4">
                        <h4 className="text-sm font-semibold text-[#FFD700] mb-2">Why Specs Fail</h4>
                        <p className="text-sm text-white leading-relaxed">
                          Users don't know what they want until they feel it. A 20-page spec describes an interaction.
                          A prototype <span className="font-semibold">lets users experience it</span>.
                          Experience reveals problems specs can't predict. Example: Zero's spec said "swipe left to archive."
                          Prototype testing: 73% of users expected swipe right. We pivoted in Day 3, not Month 4.
                        </p>
                      </div>
                      <div className="border-l-2 border-[#FFD700] pl-4">
                        <h4 className="text-sm font-semibold text-[#FFD700] mb-2">The Sunk Cost Problem</h4>
                        <p className="text-sm text-white leading-relaxed">
                          12 weeks into development, you discover the core UX doesn't work. Pivoting means throwing away
                          weeks of engineering work. Politically, it's a failure. Financially, it's a write-off.
                          Teams double down on bad UX to avoid admitting the sunk cost. Result: Ship subpar product to "not waste the investment."
                        </p>
                      </div>
                      <div className="border-l-2 border-[#FFD700] pl-4">
                        <h4 className="text-sm font-semibold text-[#FFD700] mb-2">The Proof: Zero's 7-Prototype Framework</h4>
                        <p className="text-sm text-white leading-relaxed">
                          Zero tested 7 interaction patterns in 2 weeks. Prototype 3 failed user testing—users expected
                          opposite swipe direction. We pivoted immediately. Cost: 2 days of prototype work.
                          If we'd discovered this in production: 2 weeks to fix, plus user trust damage.
                          Prototypes saved 8 weeks of wasted development and a failed launch.
                        </p>
                      </div>
                    </div>
                  </details>
                </div>
              </OS8Window>
            </div>
          </div>

          {/* SLIDE 2: THE SOLUTION */}
          <div className="mb-16">
            <div className="max-w-5xl mx-auto">
              <OS8Window
                title="The Solution: 7 Prototypes in 2 Weeks, Each Testing One Assumption"
                variant="featured"
                delay={200}
              >
                <div className="space-y-6">
                  <p className="text-sm text-gray-100 leading-relaxed">
                    Rationale's <span className="font-semibold text-[#FFD700]">build-to-think methodology</span>:
                    Rapid prototypes answer binary questions. Each prototype tests one assumption.
                    7 prototypes = 7 validated decisions before production. <span className="text-white font-semibold">Zero guesswork.</span>
                  </p>

                  {/* 7-Prototype Framework Visual */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <div className="text-xs font-mono text-[#FFD700] mb-4 uppercase tracking-wide">
                      The 7-Prototype Framework (Zero Case Study)
                    </div>

                    <div className="space-y-3">
                      {[
                        { num: '1-2', title: 'Core Interaction Model', example: 'Zero: Swipe direction, card layout', result: '✓ Pass (1 pivot)', color: '#00FF94' },
                        { num: '3-4', title: 'Information Architecture', example: 'Zero: Category chips, email metadata', result: '✓ Pass', color: '#00D9FF' },
                        { num: '5-6', title: 'Edge Cases & Error States', example: 'Zero: Offline mode, empty states', result: '✓ Pass', color: '#9D4EDD' },
                        { num: '7', title: 'Polish & Microinteractions', example: 'Zero: Swipe animations, haptics', result: '✓ Pass', color: '#FFD700' }
                      ].map((stage, i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center"
                               style={{ borderColor: stage.color, backgroundColor: `${stage.color}10` }}>
                            <span className="text-xs font-mono font-bold" style={{ color: stage.color }}>
                              {stage.num}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-100 mb-1">{stage.title}</div>
                            <div className="text-xs text-gray-400 mb-1">{stage.example}</div>
                            <div className="text-xs font-mono" style={{ color: stage.color }}>{stage.result}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-5 border-t border-gray-700">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Timeline:</span>
                        <span className="font-mono text-[#FFD700]">2 weeks, 7 prototypes, 1 pivot, 0 false starts</span>
                      </div>
                    </div>
                  </div>

                  {/* Deep Dive Accordion */}
                  <details className="mt-6 border-t border-gray-700 pt-6">
                    <summary className="text-sm font-mono uppercase tracking-wide text-[#FFD700] cursor-pointer hover:text-[#FFE34D] transition-colors">
                      Deep Dive: How Build-to-Think Works in Practice →
                    </summary>
                    <div className="mt-6 space-y-5">
                      <div className="border-l-2 border-[#FFD700] pl-4">
                        <h4 className="text-sm font-semibold text-[#FFD700] mb-2">Prototypes as Decision Tools</h4>
                        <p className="text-sm text-white leading-relaxed">
                          Traditional: Write 20-page spec, debate for weeks, build, discover issues in production.
                          Rationale: Build Prototype 1 in 2 days, put in user hands, get answer. Example: Zero Prototype 3
                          tested swipe direction. 73% of users expected opposite of our hypothesis. We pivoted
                          immediately—before writing any production code. Cost: 2 days. Savings: 2 weeks of rework.
                        </p>
                      </div>
                      <div className="border-l-2 border-[#FFD700] pl-4">
                        <h4 className="text-sm font-semibold text-[#FFD700] mb-2">The Systematic Framework</h4>
                        <p className="text-sm text-white leading-relaxed">
                          Not random prototyping. Systematic: (1-2) Core interaction model, (3-4) Information architecture,
                          (5-6) Edge cases and error states, (7) Polish and microinteractions. Each prototype has success
                          criteria. Pass → Next prototype. Fail → Pivot or kill. Zero used this exact framework to go from
                          concept to production-ready architecture in 2 weeks.
                        </p>
                      </div>
                      <div className="border-l-2 border-[#FFD700] pl-4">
                        <h4 className="text-sm font-semibold text-[#FFD700] mb-2">Why This Saves Time</h4>
                        <p className="text-sm text-white leading-relaxed">
                          Counterintuitive: "7 prototypes sounds slow." Reality: Prototype 1 takes 2 days. Finding the same
                          issue in production takes 2 weeks to fix. Prototypes are low-fidelity, high-speed. Production is
                          high-fidelity, low-speed. We de-risk the high-speed phase so production is single-pass, not
                          iterative guessing. Zero had 0 architectural pivots during production because we validated with 7 prototypes first.
                        </p>
                      </div>
                      <div className="border-l-2 border-[#FFD700] pl-4">
                        <h4 className="text-sm font-semibold text-[#FFD700] mb-2">Where This Methodology Comes From</h4>
                        <p className="text-sm text-white leading-relaxed">
                          7 years at Meta Reality Labs shipping AR/AI products to billions taught us: specs fail, prototypes work.
                          Spark AR Platform (Instagram/Facebook AR), AR Commerce strategy (Nike, Target, Sephora), 15+ patents
                          filed—all built with rapid prototyping. That experience isn't decoration—it's the methodology we bring to every Rationale engagement.
                        </p>
                      </div>
                    </div>
                  </details>
                </div>
              </OS8Window>
            </div>
          </div>

          {/* SLIDE 3: THE PROOF */}
          <div className="mb-16">
            <div className="max-w-5xl mx-auto">
              <OS8Window
                title="The Proof: Zero Went Concept to App Store in 1 Month"
                variant="featured"
                delay={300}
              >
                <div className="space-y-6">
                  <p className="text-sm text-gray-100 leading-relaxed">
                    Not a toy prototype. Not a demo.{' '}
                    <span className="font-semibold text-[#FFD700]">A production iOS app with real users, 10 microservices, and 182 Swift files.</span>{' '}
                    Achieved because we validated with 7 prototypes first. Same systematic velocity for every Rationale engagement.
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Timeline Metric */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
                      <div className="text-xs font-mono text-[#FFD700] mb-2 uppercase tracking-wide">Timeline</div>
                      <div className="text-2xl font-bold text-white mb-2">1 Month</div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>Week 1-2: 7 prototypes</div>
                        <div>Week 3-4: Production build</div>
                        <div>Week 5: App Store launch</div>
                      </div>
                    </div>

                    {/* Scale Metric */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
                      <div className="text-xs font-mono text-[#FFD700] mb-2 uppercase tracking-wide">Scale</div>
                      <div className="text-2xl font-bold text-white mb-2">182 Files</div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>10 microservices</div>
                        <div>A+ Swift architecture</div>
                        <div>Production-grade quality</div>
                      </div>
                    </div>

                    {/* Validation Metric */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
                      <div className="text-xs font-mono text-[#FFD700] mb-2 uppercase tracking-wide">Validation</div>
                      <div className="text-2xl font-bold text-white mb-2">0 Pivots</div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>0 architectural false starts</div>
                        <div>7 assumptions validated</div>
                        <div>Single-pass production</div>
                      </div>
                    </div>
                  </div>

                  {/* What This Proves Box */}
                  <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-5">
                    <h4 className="text-sm font-semibold text-[#FFD700] mb-3">What Zero Proves About Rationale</h4>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="text-[#FFD700] flex-shrink-0">→</span>
                        <p className="text-sm text-gray-100">
                          <span className="font-semibold">Technical execution:</span> 10 microservices in production
                          (Gateway, Email, Classifier, Summarization, Shopping Agent, Steel Agent, Scheduled Purchase,
                          Smart Replies, Actions, Analytics). Not a prototype—production infrastructure.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-[#FFD700] flex-shrink-0">→</span>
                        <p className="text-sm text-gray-100">
                          <span className="font-semibold">Systematic velocity:</span> 7 prototypes de-risked development.
                          0 architectural pivots during production. Same process we bring to client engagements.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-[#FFD700] flex-shrink-0">→</span>
                        <p className="text-sm text-gray-100">
                          <span className="font-semibold">Product thinking:</span> Live on App Store with 4-cohort beta
                          rollout strategy. Complete financial model. 24-week roadmap. This is what conviction looks like.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Deep Dive Accordion */}
                  <details className="mt-6 border-t border-gray-700 pt-6">
                    <summary className="text-sm font-mono uppercase tracking-wide text-[#FFD700] cursor-pointer hover:text-[#FFE34D] transition-colors">
                      Deep Dive: Zero's Complete Technical Breakdown →
                    </summary>
                    <div className="mt-6 space-y-5">
                      <div className="border-l-2 border-[#FFD700] pl-4">
                        <h4 className="text-sm font-semibold text-[#FFD700] mb-2">Architecture Proof</h4>
                        <p className="text-sm text-white leading-relaxed">
                          10 microservices: Gateway (routing), Email (IMAP/SMTP), Classifier (AI categorization),
                          Summarization (AI summaries), Shopping Agent (deal detection), Steel Agent (action execution),
                          Scheduled Purchase (recurring orders), Smart Replies (AI suggestions), Actions (workflow),
                          Analytics (telemetry). 182 Swift files organized with MVVM pattern, SwiftUI views, Combine
                          publishers, async/await concurrency. A+ architecture reviewed by senior iOS engineers.
                        </p>
                      </div>
                      <div className="border-l-2 border-[#FFD700] pl-4">
                        <h4 className="text-sm font-semibold text-[#FFD700] mb-2">Velocity Proof</h4>
                        <p className="text-sm text-white leading-relaxed">
                          Week 1-2: 7 prototypes built and tested. Prototype 3 pivot on swipe direction. Week 3-4:
                          Production development with 0 architectural changes (prototypes validated everything). Week 5:
                          App Store submission and approval. Total: Concept to live product in 30 days. Same velocity
                          model available for client partnerships via Rationale Kits.
                        </p>
                      </div>
                      <div className="border-l-2 border-[#FFD700] pl-4">
                        <h4 className="text-sm font-semibold text-[#FFD700] mb-2">Product Thinking Proof</h4>
                        <p className="text-sm text-white leading-relaxed">
                          Not just engineering. Complete product strategy: 4-cohort beta rollout (friends → power users →
                          general → scale), progressive quality scaling from 85% to 95%+ AI accuracy through structured
                          user feedback, 8-week go/no-go checkpoint with clear metrics, 24-week roadmap with bootstrap and
                          funded scenarios, complete financial model with TAM/SAM/SOM analysis. This is what working software
                          with validated execution plans looks like.
                        </p>
                      </div>
                    </div>
                  </details>
                </div>
              </OS8Window>
            </div>
          </div>

          {/* NEW SECTION: HOW WE DE-RISK YOUR INVESTMENT */}
          <div className="mb-16">
            <div className="max-w-5xl mx-auto">
              <OS8Window
                title="How We De-Risk Your Investment"
                variant="featured"
                delay={400}
              >
                <div className="space-y-6">
                  <p className="text-sm text-gray-100 leading-relaxed">
                    Most agencies ask for 3-6 month commitments. Rationale works in{' '}
                    <span className="font-semibold text-[#FFD700]">2-week sprints with clear go/no-go checkpoints</span>.
                    Low commitment, high confidence.
                  </p>

                  {/* Checkpoint Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Week 1 Checkpoint */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs font-mono text-[#FFD700] mb-2 uppercase tracking-wide">Week 1 Checkpoint</div>
                      <h4 className="text-sm font-semibold text-gray-100 mb-2">Core Hypothesis Defined</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        We align on the core assumption to test. If we can't articulate it clearly in one sentence, we pause.
                        No ambiguity, no wasted prototyping.
                      </p>
                    </div>

                    {/* Week 2 Checkpoint */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs font-mono text-[#FFD700] mb-2 uppercase tracking-wide">Week 2 Checkpoint</div>
                      <h4 className="text-sm font-semibold text-gray-100 mb-2">Prototypes 1-3 Tested</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        Core hypothesis validated? → Go to production. Failed? → Pivot or stop. Minimal sunk cost at this stage.
                      </p>
                    </div>

                    {/* Week 3 Checkpoint */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs font-mono text-[#FFD700] mb-2 uppercase tracking-wide">Week 3 Checkpoint</div>
                      <h4 className="text-sm font-semibold text-gray-100 mb-2">Architecture Locked</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        All 7 prototypes tested. Production architecture defined. You know exactly what you're building and why.
                      </p>
                    </div>

                    {/* Investment Summary */}
                    <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-4">
                      <div className="text-xs font-mono text-[#FFD700] mb-2 uppercase tracking-wide">Your Investment</div>
                      <h4 className="text-sm font-semibold text-gray-100 mb-2">~15 Hours Over 3 Weeks</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        Product owner + 2-3 stakeholders. Prototype reviews, feedback sessions. We handle all build work.
                      </p>
                    </div>
                  </div>

                  {/* Comparison Footer */}
                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        <span className="font-semibold text-white">Compare:</span> Traditional 6-month build
                      </div>
                      <div className="text-xs text-red-400">$200K+ at risk before validation</div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-gray-400">
                        <span className="font-semibold text-white">Rationale:</span> 3-week validation sprint
                      </div>
                      <div className="text-xs text-[#FFD700]">$50K, pivot-friendly, clear exit points</div>
                    </div>
                  </div>
                </div>
              </OS8Window>
            </div>
          </div>

          {/* CTA - Move from later in page */}
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-colors shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              Start Your 3-Week Validation Sprint →
            </Link>
            <p className="text-xs text-gray-400 mt-4">
              No long-term commitment. Clear checkpoints. Pivot-friendly.
            </p>
          </div>

        </div>
      </section>

      {/* Portfolio IP */}
      <section id="portfolio" className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        {/* ASCII Grid Background - Zero Product Showcase (darkGalaxy to protect brand) */}
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
            Our Portfolio IP
          </h2>

          {/* ZERO: Featured */}
          <div className="mb-8">
            <div
              onClick={() => {
                const password = prompt('Enter password to view Zero project details:');
                if (password === '123456') {
                  window.location.href = '/work/zero';
                } else if (password !== null) {
                  alert('Incorrect password');
                }
              }}
              className="block group cursor-pointer"
            >
              <OS8Window
                title="Zero · AI Email Triage"
                variant="featured"
                animateIn={false}
                className="max-w-6xl mx-auto hover:scale-[1.01] transition-transform duration-300"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Zero Visual - Interactive Demo Screenshot */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent flex items-center justify-center rounded-lg overflow-hidden border border-purple-500/20 relative">
                    <img
                      src="/images/work/zero/zero-demo-screenshot.png"
                      alt="Zero AI email triage app showing swipeable cards interface with intelligent categorization"
                      className="object-contain w-full h-full p-4"
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-[#FFD700] bg-[#FFD700]/10 px-3 py-1 rounded-full border border-[#FFD700]/30">
                      Live on App Store
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center space-y-4">
                    <div>
                      <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wide">
                        Flagship Product · Concept to App Store &lt;1 Month · Equity Partnership
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#FFD700]">
                      Proving AI-Powered Speed: Real Product, Real Users, Real Fast
                    </h3>
                    <p className="text-sm text-gray-100 leading-relaxed">
                      Built to prove we could move faster using AI tools. First prototype in a weekend. Live on App Store with beta users in under a month. Swipeable email triage with intelligent categorization solves real problems for real people. 10 microservices in production. 182 Swift files with A+ architecture.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#FFD700]/20 border border-[#FFD700] text-[#FFD700] text-xs font-semibold">iOS Native</span>
                      <span className="px-3 py-1 rounded-full bg-[#FFD700]/20 border border-[#FFD700] text-[#FFD700] text-xs font-semibold">AI Categorization</span>
                      <span className="px-3 py-1 rounded-full bg-[#FFD700]/20 border border-[#FFD700] text-xs font-semibold">Production Ready</span>
                    </div>
                    <div className="pt-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-sm font-semibold text-[#FFD700] group-hover:underline">
                        View complete details (password protected) →
                      </span>
                    </div>
                  </div>
                </div>
              </OS8Window>
            </div>
          </div>

          {/* AR Commerce @ Meta (with subtle Orion reference) */}
          <div className="mb-8 max-w-4xl mx-auto">
            <OS8Window
              title="AR Commerce · Meta Reality Labs"
              variant="interactive"
              animateIn={false}
            >
              <div className="space-y-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-100 leading-relaxed mb-3">
                    Platform strategy for AR shopping experiences. Evaluated 60+ use cases for next-gen AR glasses and spatial commerce. F8 2018 stage presenter (Nike, Target, Sephora, ASUS). Contributed to 15+ patents filed.
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    2015-2018 · Specific implementation details subject to confidentiality
                  </p>
                </div>

                {/* AR Commerce Demo Grid with GIFs */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="aspect-[9/16] rounded-lg overflow-hidden border border-[#FFD700]/20">
                    <img
                      src="/images/work/orion/ar-commerce-glasses.gif"
                      alt="AR glasses try-on showing real-time virtual eyewear fitting"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-[9/16] rounded-lg overflow-hidden border border-[#FFD700]/20">
                    <img
                      src="/images/work/orion/ar-commerce-makeup.gif"
                      alt="AR makeup try-on with real-time beauty product visualization"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-[9/16] rounded-lg overflow-hidden border border-[#FFD700]/20">
                    <img
                      src="/images/work/orion/ar-commerce-3d-bags.gif"
                      alt="3D product visualization for e-commerce with spatial browsing"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Virtual Try-On</span>
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">3D Product Viz</span>
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Spatial Shopping</span>
                </div>
              </div>
            </OS8Window>
          </div>

          {/* SPARK AR CAMERA PLATFORM: Supporting */}
          <div className="mb-8 max-w-4xl mx-auto">
            <OS8Window
              title="Spark AR Camera Platform · Meta"
              variant="interactive"
              animateIn={false}
            >
              <div className="space-y-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-100 leading-relaxed mb-3">
                    Built the AR effects platform powering Instagram and Facebook Camera. Platform architecture, computer vision pipelines, and creator tools enabling millions of AR experiences. Shipped image tracking, body tracking, face effects, and world AR capabilities.
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    2015-2019 · Platform publicly documented
                  </p>
                </div>

                {/* AR Effects Grid with GIFs */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="aspect-[9/16] rounded-lg overflow-hidden border border-[#FFD700]/20">
                    <img
                      src="/images/work/spark-ar/ar-try-on.gif"
                      alt="AR try-on effects showing real-time fashion accessory placement"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-[9/16] rounded-lg overflow-hidden border border-[#FFD700]/20">
                    <img
                      src="/images/work/spark-ar/image-tracking.gif"
                      alt="Image tracking AR placing 3D objects on target images"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-[9/16] rounded-lg overflow-hidden border border-[#FFD700]/20">
                    <img
                      src="/images/work/spark-ar/creative-effects.gif"
                      alt="Creative AR effects with real-time visual overlays"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Computer Vision</span>
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Platform Architecture</span>
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Creator Tools</span>
                </div>
              </div>
            </OS8Window>
          </div>

          {/* COMPASS: Supporting */}
          <div className="mb-8 max-w-4xl mx-auto">
            <Link href="/work/compass" className="block group">
              <OS8Window
                title="Compass · AI Video Intelligence"
                variant="interactive"
                animateIn={false}
                className="cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 border border-teal-500/30">
                    <img
                      src="/images/work/compass/genre-channel-interface.png"
                      alt="Compass AI video indexing interface showing genre channels"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-100 leading-relaxed mb-2">
                      AI video indexing with cultural and emotional intelligence. Proof of range: AI across different domains.
                    </p>
                    <span className="text-sm font-semibold text-gray-300 group-hover:text-[#FFD700] transition-colors">
                      View details →
                    </span>
                  </div>
                </div>
              </OS8Window>
            </Link>
          </div>

          {/* FUBO: AI Thumbnail Generator */}
          <div className="mb-8 max-w-4xl mx-auto">
            <OS8Window
              title="FUBO · AI Sports Thumbnail Generator"
              variant="interactive"
              animateIn={false}
            >
              <div className="space-y-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-100 leading-relaxed mb-3">
                    AI-powered generative thumbnail system using Google Gemini. 27 visual styles from blueprint to painterly, sport-aware styling, and bulk processing pipeline. Built complete Flask backend + Tailwind frontend with real-time preview.
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    2024 · Strategic pitch work · Head of Design
                  </p>
                </div>

                {/* AI Generated Thumbnail Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="aspect-[2/3] rounded-lg overflow-hidden border border-[#FFD700]/20">
                    <img
                      src="/images/work/fubo/thumbnail-1.jpg"
                      alt="AI-generated sports thumbnail showing video game style"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-[2/3] rounded-lg overflow-hidden border border-[#FFD700]/20">
                    <img
                      src="/images/work/fubo/thumbnail-2.jpg"
                      alt="AI-generated sports thumbnail showing painterly style"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-[2/3] rounded-lg overflow-hidden border border-[#FFD700]/20">
                    <img
                      src="/images/work/fubo/thumbnail-3.jpg"
                      alt="AI-generated sports thumbnail showing sportsnet style"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Generative AI</span>
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Style Transfer</span>
                  <span className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">Full-Stack Tool</span>
                </div>
              </div>
            </OS8Window>
          </div>

          {/* Building in Public */}
          <div className="max-w-4xl mx-auto mb-16">
            <OS8Window
              title="Building in Public"
              variant="subtle"
              animateIn={false}
            >
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-400 leading-relaxed">
                  We ship 1-2 products per quarter. Zero took 6 weeks from concept to complete execution plan. Follow our progress as we build the next one.
                </p>
                <Link href="/contact" className="inline-block text-sm text-gray-300 font-semibold hover:text-[#FFD700] transition-colors">
                  Partner with us →
                </Link>
              </div>
            </OS8Window>
          </div>

          {/* Kit Examples */}
          <div className="max-w-7xl mx-auto border-t border-gray-700 pt-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              Kit Examples in Action
            </h3>
            <p className="text-sm text-gray-400 text-center mb-8 max-w-2xl mx-auto">
              Real engagement examples showing how we apply our kits to synthesize complex domains, define product vision, and create investor-ready narratives.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Clarity Kit Example */}
              <OS8Window
                title="Clarity Kit · Marketplace Platform"
                variant="interactive"
                animateIn={false}
                className="h-full"
              >
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wide">
                    Clarity Kit · 2 Weeks · Strategic Positioning
                  </span>
                  <h4 className="text-lg font-bold text-gray-100">
                    Emerging Market Platform Strategy
                  </h4>
                  <p className="text-sm text-gray-100 leading-relaxed">
                    Comprehensive platform strategy for a regulated marketplace, including market positioning, UX architecture, technical feasibility assessment, and go/no-go recommendation with competitive analysis.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-300 text-xs">Platform Strategy</span>
                    <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-300 text-xs">Product Vision</span>
                    <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-300 text-xs">Technical Architecture</span>
                  </div>
                </div>
              </OS8Window>

              {/* Prototype Kit Example */}
              <OS8Window
                title="Clarity Kit · AI Intelligence Platform"
                variant="interactive"
                animateIn={false}
                className="h-full"
              >
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wide">
                    Clarity Kit · 2 Weeks · AI Product Vision
                  </span>
                  <h4 className="text-lg font-bold text-gray-100">
                    AI-Powered Domain Intelligence
                  </h4>
                  <p className="text-sm text-gray-100 leading-relaxed">
                    Strategic positioning for an AI-powered vertical intelligence platform, covering market analysis, AI capabilities roadmap, go-to-market strategy, and investor narrative development.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-300 text-xs">Market Strategy</span>
                    <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-300 text-xs">AI Product Vision</span>
                    <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-300 text-xs">Go-to-Market</span>
                  </div>
                </div>
              </OS8Window>
            </div>
          </div>
        </div>
      </section>

      {/* What Zero Proves */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        {/* ASCII Grid Background - Proof Content (Subtle) */}
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <OS8Window
            title="What Zero Proves About Rationale"
            variant="featured"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 text-gray-100 leading-relaxed">
              <p className="text-sm">
                <span className="font-bold text-[#FFD700]">Technical execution:</span> 10 microservices in production (Gateway, Email, Classifier, Summarization, Shopping Agent, Steel Agent, Scheduled Purchase, Smart Replies, Actions, Analytics). 182 Swift files with A+ architecture.
              </p>
              <p className="text-sm">
                <span className="font-bold text-[#FFD700]">Systematic execution:</span> Live on App Store with 4-cohort beta rollout strategy. Progressive quality scaling from 85% to 95%+ AI accuracy through structured user feedback. 8-week go/no-go checkpoint with clear metrics.
              </p>
              <p className="text-sm">
                <span className="font-bold text-[#FFD700]">Product thinking:</span> 7 working prototypes built to test assumptions before production code. 24-week roadmap with bootstrap and funded scenarios. Complete financial model with TAM/SAM/SOM analysis.
              </p>
              <p className="text-base font-semibold text-[#FFD700] border-t border-[#FFD700] pt-4">
                This is what conviction looks like: working software, validated architecture, and execution plans ready to scale. The same speed and depth we bring to client engagements.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Tier 1: Budget Signals - Investment Levels */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        {/* ASCII Grid Background - Engagement Models (Commercial Clarity) */}
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-3">
            ENGAGEMENT MODELS
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Work With Us
          </h2>
          <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto">
            We work with teams at different stages — from validating an idea to shipping production software
          </p>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* Clarity Kit Signal */}
            <div className="bg-gray-800/50 border border-gray-700 p-5 rounded hover:border-[#FFD700]/50 transition-colors">
              <p className="text-base font-semibold text-gray-100 mb-3">Clarity Kit</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Validate direction, technical plan, go/no-go recommendation
              </p>
            </div>

            {/* Prototype Kit Signal */}
            <div className="bg-gray-800/50 border border-gray-700 p-5 rounded hover:border-[#FFD700]/50 transition-colors">
              <p className="text-base font-semibold text-gray-100 mb-3">Prototype Kit</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Working software you can test with real users before full build
              </p>
            </div>

            {/* Build Ship Run Signal */}
            <div className="bg-gray-800/50 border border-gray-700 p-5 rounded hover:border-[#FFD700]/50 transition-colors">
              <p className="text-base font-semibold text-gray-100 mb-3">Build Ship Run</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Full product development from concept to App Store launch
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-8">
            All engagements structured as cash, equity, or hybrid partnerships
          </p>
        </div>
      </section>

      {/* Dual-Engine Model */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        {/* ASCII Grid Background - Services/Process (Balanced) */}
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              How Rationale Grows
            </h2>
            <p className="text-base sm:text-lg text-gray-400 font-mono tracking-wide">
              TWO ENGINES // ONE SYSTEM
            </p>
          </div>

          {/* Desktop: Side-by-Side */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
            <OS8Window
              title="Engine 1 — Portfolio IP"
              variant="featured"
              delay={100}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#FFD700]">Products We Own</h3>
                <p className="text-sm text-gray-100 leading-relaxed">
                  We design, build, and launch proprietary products like Zero and Compass. These prove our systematic execution and generate IP we can scale or license.
                </p>
                <p className="text-xs text-gray-300 border-t border-[#FFD700] pt-3">
                  Zero: 1 month to App Store. Compass: 6-week prototype sprint. Both demonstrate velocity across domains.
                </p>
              </div>
            </OS8Window>

            <OS8Window
              title="Engine 2 — Client Kits"
              variant="featured"
              delay={200}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#FFD700]">Partnerships We Fund</h3>
                <p className="text-sm text-gray-100 leading-relaxed">
                  We transform client product challenges into shipped software via structured engagements: Clarity Kits (2 weeks), Prototype Kits (4-6 weeks), and Build Ship Run (6-18 months).
                </p>
                <p className="text-xs text-gray-300 border-t border-[#FFD700] pt-3">
                  Cash, equity, or hybrid structures. Same systematic velocity.
                </p>
              </div>
            </OS8Window>
          </div>

          {/* Mobile: Stacked */}
          <div className="md:hidden space-y-6 max-w-2xl mx-auto mb-8">
            <OS8Window title="Engine 1 — Portfolio IP" variant="featured" animateIn={false}>
              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#FFD700]">Products We Own</h3>
                <p className="text-sm text-gray-100">
                  Zero and Compass. Prove execution. Generate IP.
                </p>
              </div>
            </OS8Window>

            <OS8Window title="Engine 2 — Client Kits" variant="featured" animateIn={false}>
              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#FFD700]">Partnerships We Fund</h3>
                <p className="text-sm text-gray-100">
                  Clarity Kits, Prototype Kits, Build Ship Run. Cash, equity, or hybrid.
                </p>
              </div>
            </OS8Window>
          </div>

          {/* Explanation */}
          <div className="max-w-3xl mx-auto">
            <OS8Window title="Why Both?" variant="featured" animateIn={false}>
              <p className="text-sm text-gray-100 leading-relaxed">
                <span className="font-bold text-gray-100">Portfolio IP proves capability and funds runway.</span> Client Kits fund Portfolio development and harden our frameworks. Both engines compound: every pilot hardens our systems, every product validates our approach. This isn't a studio that does client work on the side. This is a studio that builds IP through both channels—yours and ours.
              </p>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        {/* ASCII Grid Background - Services (Blueprint Feel) */}
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Rationale Kits
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Clarity to Build Ship Run. Productized engagements from 2-week sprints to 18-month builds. Structured as cash, cash + equity, or equity-only.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            <OS8Window
              title="Clarity Kit"
              variant="featured"
              delay={100}
              className="h-full"
            >
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#FFD700]">2 Weeks to Validated Direction</p>
                <p className="text-sm text-gray-100 leading-relaxed">
                  Walk in with an idea. Walk out with a production-ready technical plan, go-to-market positioning, and go/no-go recommendation.
                </p>
                <p className="text-xs text-gray-300">
                  Same rigor we used on Zero: complete technical plan in 1 month.
                </p>

                {/* Tier 2: Value Anchoring */}
                <div className="border-t border-gray-700 pt-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-100">What This Saves You:</p>
                  <p className="text-xs text-gray-300">
                    3 months of internal debate, $50K+ in wasted development, clarity on what NOT to build
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-3">
                  <p className="text-xs font-semibold text-gray-100 mb-1">Investment Level:</p>
                  <p className="text-xs text-gray-300">
                    Comparable to 2-3 weeks of senior engineering time
                  </p>
                  <p className="text-xs text-gray-100 font-semibold mt-2">
                    Cash or equity structures
                  </p>
                </div>
              </div>
            </OS8Window>

            <OS8Window
              title="Prototype Kit"
              variant="featured"
              delay={200}
              className="h-full"
            >
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#FFD700]">4-6 Weeks to Working Software</p>
                <p className="text-sm text-gray-100 leading-relaxed">
                  Interactive prototypes you can test with real users. Feel what works before committing to full development. Test assumptions, not guesses.
                </p>
                <p className="text-xs text-gray-300">
                  Zero proof: 7 working prototypes built to validate core mechanics before production.
                </p>

                {/* Tier 2: Value Anchoring */}
                <div className="border-t border-gray-700 pt-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-100">What This Saves You:</p>
                  <p className="text-xs text-gray-300">
                    6 months building the wrong thing, $200K+ in misdirected development, user-validated features before production
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-3">
                  <p className="text-xs font-semibold text-gray-100 mb-1">Investment Level:</p>
                  <p className="text-xs text-gray-300">
                    Comparable to a mid-level full-stack developer for 2 months
                  </p>
                  <p className="text-xs text-gray-100 font-semibold mt-2">
                    Cash or equity structures
                  </p>
                </div>
              </div>
            </OS8Window>

            <OS8Window
              title="Build Ship Run"
              variant="featured"
              delay={300}
              className="h-full"
            >
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#FFD700]">6-18 Months to Production Product</p>
                <p className="text-sm text-gray-100 leading-relaxed">
                  Full product development from concept to App Store/launch. We become your technical co-founder—especially for equity partnerships. All in, just like Zero.
                </p>
                <p className="text-xs text-gray-300">
                  Zero proof: 10 microservices, 182 Swift files, complete beta strategy in 6 weeks.
                </p>

                {/* Tier 2: Value Anchoring */}
                <div className="border-t border-gray-700 pt-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-100">What This Gets You:</p>
                  <p className="text-xs text-gray-300">
                    Production-grade software, App Store/launch execution, 60 days post-launch support, avoided hiring headaches
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-3">
                  <p className="text-xs font-semibold text-gray-100 mb-1">Investment Level:</p>
                  <p className="text-xs text-gray-300">
                    Comparable to your first technical co-founder (senior full-stack + designer)
                  </p>
                  <p className="text-xs text-gray-100 font-semibold mt-2">
                    Cash, equity, or hybrid partnerships
                  </p>
                </div>
              </div>
            </OS8Window>
          </div>

          <div className="text-center">
            <Link
              href="/how-we-work"
              className="inline-block px-8 py-4 bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-colors"
            >
              View All Engagement Models →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - COMMENTED OUT TEMPORARILY */}
      {/*
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-2">
              CLIENT FEEDBACK
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              What Partners Say
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Real feedback from founders and teams we've worked with — from strategy to shipped products
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <OS8Window
              title="testimonial_01.txt"
              variant="subtle"
              delay={100}
              className="h-full"
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-100 leading-relaxed italic">
                  "Most agencies talk. Rationale ships. They became our technical co-founder for 6 months and delivered a production app that our users actually love."
                </p>
                <div className="border-t border-gray-700 pt-3">
                  <p className="text-xs font-semibold text-gray-100">Sarah Chen</p>
                  <p className="text-xs text-gray-400">CEO, HealthTech Startup</p>
                  <p className="text-xs text-gray-500 mt-1">Build Ship Run // 6 months</p>
                </div>
              </div>
            </OS8Window>

            <OS8Window
              title="testimonial_02.txt"
              variant="subtle"
              delay={200}
              className="h-full"
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-100 leading-relaxed italic">
                  "The Clarity Kit saved us 3 months of wandering. We got a technical plan, market positioning, and go/no-go in 2 weeks. Worth every dollar."
                </p>
                <div className="border-t border-gray-700 pt-3">
                  <p className="text-xs font-semibold text-gray-100">Marcus Rodriguez</p>
                  <p className="text-xs text-gray-400">Founder, Enterprise SaaS</p>
                  <p className="text-xs text-gray-500 mt-1">Clarity Kit // 2 weeks</p>
                </div>
              </div>
            </OS8Window>

            <OS8Window
              title="testimonial_03.txt"
              variant="subtle"
              delay={300}
              className="h-full"
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-100 leading-relaxed italic">
                  "They understand AI products because they build their own. Zero Inbox is proof they know how to navigate the complexity — not just advise on it."
                </p>
                <div className="border-t border-gray-700 pt-3">
                  <p className="text-xs font-semibold text-gray-100">Alex Thompson</p>
                  <p className="text-xs text-gray-400">CTO, FinTech Platform</p>
                  <p className="text-xs text-gray-500 mt-1">Prototype Kit // 6 weeks</p>
                </div>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>
      */}

      {/* Final CTA */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* ASCII Grid Background - Final CTA (High Intensity for Conversion) */}
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.12}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title="Start Feeling What Works in 2 Weeks"
            variant="cta"
            animateIn={false}
            className="max-w-lg"
          >
            <div className="space-y-6">
              <p className="text-base text-[#FFD700] leading-relaxed">
                Don't wait 6 months to discover what doesn't work. Get to working prototypes in weeks, not quarters. Same velocity we brought to Zero.
              </p>

              <div className="flex flex-col gap-3 pt-4">
                <Link
                  href="/contact"
                  className="w-full bg-[#FFD700] hover:bg-[#FFE34D] text-black text-center px-6 py-3 font-semibold transition-colors"
                >
                  Book a Kit Scoping Call →
                </Link>
                <Link
                  href="/how-we-work"
                  className="w-full border border-[#FFD700] hover:border-[#FFE34D] text-[#FFD700] hover:text-[#FFE34D] text-center px-6 py-3 font-semibold transition-colors"
                >
                  How We Work
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
