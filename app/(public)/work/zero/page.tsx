/**
 * Zero Public Marketing Page
 *
 * Full public page showcasing Zero as Rationale's product.
 * Focus on technical execution and development process.
 *
 * CORRECTED VERSION - Accurate claims, proper styling
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import InteractiveDemo from '@/components/zero/InteractiveDemo';
import type { Metadata } from 'next';

export default function ZeroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/work"
            className="text-sm text-gray-400 hover:text-[#FFD700] font-semibold transition-colors mb-6 inline-block"
          >
            ← Back to Work
          </Link>

          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4">
            RATIONALE PRODUCT // PRODUCTION-READY · PRE-LAUNCH
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Zero: AI Email Intelligence
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-6">
            Your inbox has 47 emails. Buried inside: a bill due tomorrow, a package arriving today, and a permission slip you need to sign. Zero's AI finds these actions and puts them in swipeable cards.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all"
            >
              Join Beta Waitlist
            </Link>
            <a
              href="#demo"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
            >
              Try Interactive Demo
            </a>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            <div className="p-4 rounded bg-gray-800/50 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-[#FFD700]">268</div>
              <div className="text-xs text-gray-400">Swift Files</div>
            </div>
            <div className="p-4 rounded bg-gray-800/50 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-[#FFD700]">10</div>
              <div className="text-xs text-gray-400">Microservices</div>
            </div>
            <div className="p-4 rounded bg-gray-800/50 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-[#FFD700]">A-</div>
              <div className="text-xs text-gray-400">Architecture Grade</div>
            </div>
            <div className="p-4 rounded bg-gray-800/50 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-[#FFD700]">43</div>
              <div className="text-xs text-gray-400">Intent Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="The Problem: Your Inbox Is Full of Hidden Work"
            variant="yellow"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-base">
                You get <span className="font-bold text-black">47 emails today</span>. Somewhere in there: a bill that's due tomorrow, a package arriving in an hour, a form your kid needs signed, and an event you need to RSVP to. But to find them, you have to read everything.
              </p>
              <p className="text-base">
                Email tools organize your inbox. They don't extract what matters. You still have to open each email, scan for actions, then context-switch to pay the bill or track the package. <span className="font-bold text-black">Your inbox is a todo list you have to manually decode.</span>
              </p>
              <p className="text-base border-t border-[#FFD700] pt-4 font-semibold text-black">
                Zero's AI reads your emails and extracts the actions automatically. RSVP to events. Track packages. Pay bills. Sign forms. All in swipeable cards, sorted into Mail and Ads. No reading. Just acting.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Try Zero: Interactive Demo
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience Zero's swipe-based email triage. Swipe right to complete actions, left to archive, down to snooze.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <InteractiveDemo />
          </div>

          <OS8Window
            title="What the Production App Adds"
            variant="minimal"
            className="max-w-3xl mx-auto"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <ul className="text-sm text-gray-100 space-y-2">
                <li>• Real Gmail integration (OAuth 2.0)</li>
                <li>• AI classification (43 intent categories)</li>
                <li>• Entity extraction (tracking #s, dates, amounts)</li>
              </ul>
              <ul className="text-sm text-gray-100 space-y-2">
                <li>• Native device actions (Calendar, Contacts, Wallet)</li>
                <li>• 10-service backend architecture</li>
                <li>• Summarization and smart replies</li>
              </ul>
            </div>
          </OS8Window>

          <div className="max-w-3xl mx-auto mt-6 text-center">
            <p className="text-xs text-gray-500">
              Curious about our process? We built a <a href="https://swipeer.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] hover:underline">weekend prototype</a> (password: 111111) to validate the concept before investing in production architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Development Journey */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Development Journey
            </h2>
            <p className="text-lg text-gray-300">
              From weekend prototype to production-ready architecture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <OS8Window
              title="Phase 1: Weekend Prototype"
              variant="minimal"
              delay={100}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Built interactive swipe prototype to validate the core UX mechanic before committing to production.
                </p>
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs text-gray-600 mb-2"><span className="font-bold text-black">Goal:</span> Test if swipe-based email triage felt natural</p>
                  <p className="text-xs text-gray-600 mb-3"><span className="font-bold text-black">Result:</span> Validated UX direction, moved to production build</p>
                  <a
                    href="https://swipeer.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#FFD700] hover:underline font-medium"
                  >
                    Try the weekend prototype → (password: 111111)
                  </a>
                </div>
              </div>
            </OS8Window>

            <OS8Window
              title="Phase 2: Production Architecture"
              variant="minimal"
              delay={200}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Designed and built production-grade systems from the ground up.
                </p>
                <div className="grid grid-cols-2 gap-3 border-t border-gray-200 pt-3">
                  <div>
                    <p className="text-xs font-bold text-black mb-1">iOS App:</p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      <li>• 268 Swift files</li>
                      <li>• Protocol-driven</li>
                      <li>• A- grade</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black mb-1">Backend:</p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      <li>• 10 microservices</li>
                      <li>• Gmail OAuth</li>
                      <li>• Cloud Run</li>
                    </ul>
                  </div>
                </div>
              </div>
            </OS8Window>

            <OS8Window
              title="Current Status"
              variant="minimal"
              delay={300}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  All systems built and deployed. Pre-launch, preparing for user onboarding.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• Production infrastructure deployed</li>
                  <li>• Gmail OAuth implemented</li>
                  <li>• Classification system complete</li>
                  <li>• iOS app with device integrations ready</li>
                </ul>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Technical Architecture
            </h2>
            <p className="text-lg text-gray-300">
              Production-ready systems designed for scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
            <OS8Window
              title="iOS Application"
              variant="minimal"
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600"><span className="font-bold text-black">268 Swift files</span> organized as:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Core Services (ActionRouter, EmailAPI)</li>
                  <li>• Integration Services (Calendar, Contacts, Reminders)</li>
                  <li>• Action Modals (43+ actions)</li>
                  <li>• Data Services (email persistence)</li>
                </ul>
                <p className="text-xs text-gray-600 pt-2 border-t border-gray-200">
                  <span className="font-bold text-[#FFD700]">Grade: A-</span> (Claude Sonnet assessment)
                </p>
              </div>
            </OS8Window>

            <OS8Window
              title="Backend Microservices"
              variant="minimal"
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600"><span className="font-bold text-black">10 production services:</span></p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Gateway (OAuth, routing)</li>
                  <li>• Email (Gmail API)</li>
                  <li>• Classifier (43 intent categories)</li>
                  <li>• Summarization (Gemini AI)</li>
                  <li>• Smart Replies, Shopping, Actions...</li>
                </ul>
                <p className="text-xs text-gray-600 pt-2 border-t border-gray-200">
                  <span className="font-bold text-[#FFD700]">Platform:</span> Google Cloud Run
                </p>
              </div>
            </OS8Window>
          </div>

          <OS8Window
            title="AI Classification System"
            variant="default"
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-black">43 Intent Categories</span> including commerce (shipping, delivery, returns), billing (invoices, receipts), calendar (meetings, events), and family (school, childcare).
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-black">Processing Pipeline:</span> Email ingestion → Intent classification → Entity extraction → Action suggestion → Priority scoring → UI rendering. Average processing time: 45-85ms.
              </p>
              <p className="text-sm text-gray-600 border-t border-gray-200 pt-4">
                <span className="font-bold text-black">Baseline Performance:</span> Initial testing shows 91.7% intent classification accuracy, 100% action extraction accuracy. These baselines established before building broader email corpus. Core business intents (billing, finance, healthcare) currently at 100%.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* What Zero Demonstrates */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="What Zero Demonstrates"
            variant="yellow"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-base">
                <span className="font-bold text-black">For potential clients:</span> Zero proves Rationale ships real products, not just client work. We built this to demonstrate our execution capability—same speed and technical depth we bring to client engagements.
              </p>
              <p className="text-base">
                <span className="font-bold text-black">Validation → Production:</span> We built a weekend prototype to test the core UX before investing in production infrastructure. Once validated, we designed clean-room production architecture (A- grade) with zero technical debt.
              </p>
              <p className="text-base">
                <span className="font-bold text-black">Technical execution:</span> 268 Swift files with protocol-driven architecture. 10 microservices on Google Cloud Run. Gmail OAuth integration. AI classification with 43 intent categories. Native iOS with device integrations (Calendar, Contacts, Wallet).
              </p>
              <p className="text-base border-t border-[#FFD700] pt-4 font-semibold text-black">
                This is how we build products: fast iteration meets technical excellence.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Why We Built This */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Why We Built Zero"
            variant="default"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-sm">
                <span className="font-bold text-black">Personal need:</span> As busy professionals and parents, we all drown in email. Bills, packages, permission slips, RSVPs—they're all buried in your inbox, and you have to manually hunt for them every day.
              </p>
              <p className="text-sm">
                <span className="font-bold text-black">Market gap:</span> Email tools organize. They don't extract actions. Nobody is automatically pulling out the bill due tomorrow or the package arriving today. That's the gap Zero fills.
              </p>
              <p className="text-sm">
                <span className="font-bold text-black">Proof of execution:</span> We don't just plan products—we build working software. Zero demonstrates our process: validate with prototypes, design production-grade architecture, ship real products.
              </p>
              <p className="text-sm border-t border-gray-200 pt-4 font-semibold text-black">
                This is how we work. Fast iteration, technical excellence, and products built to scale.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Work With Us
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Zero demonstrates how Rationale builds products: validation, technical excellence, and execution speed. Let's build yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all"
            >
              Start a Conversation
            </Link>
            <Link
              href="/work"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
            >
              See More Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
