/**
 * Zero Inbox Product Overview Presentation
 *
 * Comprehensive overview for investors, partners, and strategic audiences
 * showcasing Zero's AI-powered email intelligence platform.
 *
 * Format inspired by Heirloom pitch with rich interactive diagrams.
 */

'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, Mail, Rocket, Zap, TrendingUp } from 'lucide-react';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary, ButtonTertiary } from '@/components/ui/ButtonHierarchy';

// Import Zero diagram components
import AIIntelligenceSystemDiagram from '@/components/zero/diagrams/AIIntelligenceSystemDiagramResponsive';
import InboxJourneyDiagram from '@/components/zero/diagrams/InboxJourneyDiagramResponsive';
import MicroservicesArchitectureDiagram from '@/components/zero/diagrams/MicroservicesArchitectureDiagramResponsive';
import SwipeTriageTreeDiagram from '@/components/zero/diagrams/SwipeTriageTreeDiagram';
import BetaRoadmapTimelineDiagram from '@/components/zero/diagrams/BetaRoadmapTimelineDiagramResponsive';

export default function ZeroOverviewPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">

      {/* SECTION 1: HERO */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Zero Inbox: <span className="font-light">AI That Achieves Inbox Zero</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white font-medium italic mb-6">
              Email shouldn't control you. You should control email.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Swipe to triage. AI executes compound actions. Inbox zero in minutes, not hours.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ButtonPrimary
              href="https://testflight.apple.com/join/zero-inbox"
              size="lg"
              className="gap-2"
            >
              <Rocket className="w-5 h-5" />
              Join Beta on TestFlight
            </ButtonPrimary>
            <ButtonSecondary href="/work/zero" size="lg" className="gap-2">
              View Case Study
              <ExternalLink className="w-5 h-5" />
            </ButtonSecondary>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE JOURNEY - From Chaos to Zero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The Journey: From Overwhelm to Control
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-6">
              You wake up to 47 new emails. By lunch, 83 more. Important messages drown in promotional noise.
              A meeting invitation buried on page 3. A package delivery you never tracked. A deadline you almost missed.
            </p>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Zero transforms this chaos into effortless control. 1,847 unread emails → inbox zero in 30 days. 45 minutes per day → 5 minutes per day.
            </p>
          </div>

          {/* Journey Diagram */}
          <div className="mb-8">
            <InboxJourneyDiagram />
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SECRET WEAPON - Swipe Triage */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.blueTeal}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Secret Weapon: Swipe Triage Intelligence
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              4 simple gestures replace 20+ email actions. Context-aware AI decides the right action based on email content.
            </p>
          </div>

          {/* Swipe Triage Diagram */}
          <div className="mb-8">
            <SwipeTriageTreeDiagram />
          </div>
        </div>
      </section>

      {/* SECTION 4: COMPOUND ACTIONS - The Power of AI */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.purplePink}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Compound Actions: One Swipe, Multiple Results
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              The secret to inbox zero isn't doing more—it's doing multiple things at once. One swipe triggers a cascade of intelligent actions.
            </p>
          </div>

          {/* Compound Action Examples */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Example 1: Meeting Invitation */}
            <div className="p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                  📅
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Meeting Invite</h3>
                  <p className="text-sm text-gray-400">"Join us for Q1 Planning - Thursday 2pm"</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center text-xs font-bold text-green-400 flex-shrink-0">1</div>
                  <div className="text-sm text-gray-300">Extract meeting details (time, location, attendees)</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center text-xs font-bold text-green-400 flex-shrink-0">2</div>
                  <div className="text-sm text-gray-300">Add to calendar with smart reminders</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center text-xs font-bold text-green-400 flex-shrink-0">3</div>
                  <div className="text-sm text-gray-300">Send RSVP confirmation</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center text-xs font-bold text-green-400 flex-shrink-0">4</div>
                  <div className="text-sm text-gray-300">Archive email (no longer needed)</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center text-xs font-bold text-green-400 flex-shrink-0">5</div>
                  <div className="text-sm text-gray-300">Block time for prep 30 min before</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700 flex justify-between items-center">
                <span className="text-xs text-gray-500">Traditional: 2 minutes</span>
                <span className="text-lg font-bold text-terminal-gold">Zero: 3 seconds</span>
              </div>
            </div>

            {/* Example 2: Package Tracking */}
            <div className="p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                  📦
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Shipping Confirmation</h3>
                  <p className="text-sm text-gray-400">"Your order #8472 has shipped"</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 flex-shrink-0">1</div>
                  <div className="text-sm text-gray-300">Extract tracking number and carrier</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 flex-shrink-0">2</div>
                  <div className="text-sm text-gray-300">Start monitoring delivery status</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 flex-shrink-0">3</div>
                  <div className="text-sm text-gray-300">Estimate delivery date from carrier API</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 flex-shrink-0">4</div>
                  <div className="text-sm text-gray-300">Send notification when out for delivery</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 flex-shrink-0">5</div>
                  <div className="text-sm text-gray-300">Archive email after delivery confirmed</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700 flex justify-between items-center">
                <span className="text-xs text-gray-500">Traditional: Manual tracking</span>
                <span className="text-lg font-bold text-terminal-gold">Zero: Automated</span>
              </div>
            </div>

            {/* Example 3: Newsletter with Deal */}
            <div className="p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                  🎯
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Promotional Email</h3>
                  <p className="text-sm text-gray-400">"Flash Sale: 40% off with code SAVE40"</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/30 flex items-center justify-center text-xs font-bold text-orange-400 flex-shrink-0">1</div>
                  <div className="text-sm text-gray-300">Extract promo code: SAVE40</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/30 flex items-center justify-center text-xs font-bold text-orange-400 flex-shrink-0">2</div>
                  <div className="text-sm text-gray-300">Save to promo codes collection</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/30 flex items-center justify-center text-xs font-bold text-orange-400 flex-shrink-0">3</div>
                  <div className="text-sm text-gray-300">Set reminder 24 hours before expiration</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/30 flex items-center justify-center text-xs font-bold text-orange-400 flex-shrink-0">4</div>
                  <div className="text-sm text-gray-300">Archive email (code saved)</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700 flex justify-between items-center">
                <span className="text-xs text-gray-500">Traditional: Screenshot, forget</span>
                <span className="text-lg font-bold text-terminal-gold">Zero: Saved forever</span>
              </div>
            </div>

            {/* Example 4: Important Project Update */}
            <div className="p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                  💼
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Project Update</h3>
                  <p className="text-sm text-gray-400">"Q4 roadmap changes - needs review by EOD"</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0">1</div>
                  <div className="text-sm text-gray-300">Detect urgency: EOD deadline</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0">2</div>
                  <div className="text-sm text-gray-300">Boost priority to Critical</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0">3</div>
                  <div className="text-sm text-gray-300">Create task: "Review Q4 roadmap"</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0">4</div>
                  <div className="text-sm text-gray-300">Set reminder at 3pm (2 hours before EOD)</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0">5</div>
                  <div className="text-sm text-gray-300">Keep email visible until completed</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700 flex justify-between items-center">
                <span className="text-xs text-gray-500">Traditional: Easy to miss</span>
                <span className="text-lg font-bold text-terminal-gold">Zero: Impossible to forget</span>
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div className="p-8 bg-gradient-to-br from-terminal-gold/20 to-transparent border-2 border-terminal-gold rounded-lg">
            <div className="flex items-start gap-4">
              <Zap className="w-8 h-8 text-terminal-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Why Compound Actions Change Everything</h3>
                <p className="text-base text-gray-300 leading-relaxed mb-4">
                  Traditional email apps make you choose: Archive, Delete, Reply, or Snooze. One action at a time.
                  Zero understands that most emails require 3-5 sequential actions to truly handle.
                </p>
                <p className="text-base text-gray-300 leading-relaxed">
                  The result? You take one action (swipe right). Zero executes five. That's not 5x faster—it's <span className="text-terminal-gold font-bold">40x faster</span> because you never have to context-switch or remember follow-ups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: AI INTELLIGENCE SYSTEM */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.purplePink}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works: AI Intelligence Under the Hood
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              43 intent categories, 35+ action types, 100ms processing time. Every email classified, summarized, and routed to the right action.
            </p>
          </div>

          {/* AI System Diagram */}
          <div className="mb-8">
            <AIIntelligenceSystemDiagram />
          </div>
        </div>
      </section>

      {/* SECTION 5: TECHNICAL ARCHITECTURE */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.blueTeal}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Clean Microservices Architecture
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              Production-grade infrastructure. Clean room migration from 1.9GB bloated codebase to 61MB of pure efficiency.
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className="mb-8">
            <MicroservicesArchitectureDiagram />
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY FEATURES */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Core Capabilities
            </h2>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* AI Classification */}
            <div className="p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg">
              <div className="flex justify-center mb-4">
                <Zap className="w-12 h-12 text-terminal-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Intelligent Classification</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-1">•</span>
                  <span><strong>43 intent categories</strong> from shopping to scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-1">•</span>
                  <span><strong>95% accuracy</strong> using Gemini AI models</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-1">•</span>
                  <span><strong>Context-aware</strong> learns from your behavior</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-1">•</span>
                  <span><strong>Real-time processing</strong> 100ms average latency</span>
                </li>
              </ul>
            </div>

            {/* Smart Actions */}
            <div className="p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg">
              <div className="flex justify-center mb-4">
                <TrendingUp className="w-12 h-12 text-terminal-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Smart Actions</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-1">•</span>
                  <span><strong>35+ action types</strong> from calendar to shopping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-1">•</span>
                  <span><strong>Auto-execution</strong> 60% of emails handled automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-1">•</span>
                  <span><strong>Package tracking</strong> shipping notifications monitored</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-1">•</span>
                  <span><strong>Subscription management</strong> one-tap unsubscribe</span>
                </li>
              </ul>
            </div>

            {/* Swipe Interface */}
            <div className="p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg">
              <div className="flex justify-center mb-4">
                <Mail className="w-12 h-12 text-terminal-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Swipe-Based Triage</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-1">•</span>
                  <span><strong>4 intuitive gestures</strong> left, right, up, down</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-1">•</span>
                  <span><strong>10 emails/minute</strong> 80% faster than traditional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-1">•</span>
                  <span><strong>Smart replies</strong> AI-generated response options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-1">•</span>
                  <span><strong>Email summaries</strong> 2-sentence digests</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: BETA ROADMAP & TIMELINE */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Beta to Launch: Execution Roadmap
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              Currently in Week 1 of Phase 1 beta testing. 6-month path from 5 users to public launch.
            </p>
          </div>

          {/* Roadmap Timeline Diagram */}
          <div className="mb-8">
            <BetaRoadmapTimelineDiagram />
          </div>
        </div>
      </section>

      {/* SECTION 8: WEARABLES - THE FUTURE */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.blueTeal}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Next: Invisible Email Management via Wearables
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              The phone is still too much friction. The future of email is hands-free, glanceable, and voice-first.
            </p>
          </div>

          {/* Vision Statement */}
          <div className="p-8 bg-gradient-to-br from-cyan-500/20 to-transparent border-2 border-cyan-500/50 rounded-lg mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl">⌚</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Zero on Your Wrist: Email Without Looking</h3>
                <p className="text-base text-gray-300 leading-relaxed mb-4">
                  Imagine triaging your inbox during your morning run. A gentle tap on your wrist: <span className="text-cyan-400 italic">"Meeting invite from Sarah - tomorrow 2pm."</span> You say <span className="text-cyan-400 italic">"Accept."</span> Done. Calendar updated, RSVP sent, email archived. You never broke stride.
                </p>
                <p className="text-base text-gray-300 leading-relaxed">
                  That's Zero on Apple Watch, Ray-Ban Meta, and future wearable platforms. Email becomes ambient—handled in seconds between moments, never demanding your full attention.
                </p>
              </div>
            </div>
          </div>

          {/* Wearable Platforms Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Apple Watch */}
            <div className="p-8 bg-gray-900/70 border border-cyan-500/30 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center text-3xl">
                  ⌚
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Apple Watch</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Glanceable summaries</strong> on your wrist</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Haptic triage</strong> swipe gestures on Digital Crown</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Voice actions</strong> via Siri integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Smart notifications</strong> only for critical emails</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <span className="text-xs text-cyan-400 font-bold">Phase 2 • Q2 2025</span>
              </div>
            </div>

            {/* Ray-Ban Meta Smart Glasses */}
            <div className="p-8 bg-gray-900/70 border border-cyan-500/30 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center text-3xl">
                  🕶️
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Ray-Ban Meta</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Heads-up email summaries</strong> in your field of view</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Voice-first triage</strong> "Mark as read" / "Snooze"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Context-aware alerts</strong> only when you're available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Hands-free actions</strong> while walking, driving, cooking</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <span className="text-xs text-cyan-400 font-bold">Phase 3 • Q3 2025</span>
              </div>
            </div>

            {/* Future: Neuralink & Brain-Computer Interfaces */}
            <div className="p-8 bg-gray-900/70 border border-cyan-500/30 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center text-3xl">
                  🧠
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Future Platforms</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Vision Pro</strong> spatial email triage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Humane AI Pin</strong> voice-only email assistant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Whoop / Oura</strong> health-aware email timing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Neuralink</strong> thought-based email control (5+ years)</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <span className="text-xs text-cyan-400 font-bold">Exploring • 2025-2030</span>
              </div>
            </div>
          </div>

          {/* Why Wearables Are the Endgame */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gray-900/70 border border-cyan-500/30 rounded-lg">
              <h4 className="text-lg font-bold text-white mb-4">The Problem with Phones</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>Requires pulling phone out of pocket</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>Demands full visual attention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>Interrupts flow state (avg 23 min to refocus)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>Unsafe while driving, walking, exercising</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>Social friction in meetings, dinners, conversations</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-gray-900/70 border border-cyan-500/30 rounded-lg">
              <h4 className="text-lg font-bold text-white mb-4">The Promise of Wearables</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Always accessible (already on your body)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Ambient awareness (glance, don't stare)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Minimal context-switching (seconds, not minutes)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Safe in any situation (hands-free, eyes-free)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Socially invisible (no phone staring)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* The Vision */}
          <div className="mt-12 p-8 bg-gradient-to-br from-terminal-gold/20 to-cyan-500/10 border-2 border-terminal-gold rounded-lg">
            <div className="flex items-start gap-4">
              <div className="text-4xl">✨</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">The Goal: Email You Never Think About</h3>
                <p className="text-base text-gray-300 leading-relaxed mb-4">
                  We're not building a better email app. We're building a world where email is so effortless, so ambient, that you forget it's even there.
                </p>
                <p className="text-base text-gray-300 leading-relaxed mb-4">
                  Your watch handles routine triage during your morning walk. Your glasses alert you to urgent messages while you cook dinner. Your calendar auto-populates. Your packages track themselves. Your replies write themselves.
                </p>
                <p className="text-lg text-terminal-gold font-bold italic">
                  The best email experience is the one you never notice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: MARKET OPPORTUNITY */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Market: Large, Growing, Underserved
            </h2>
          </div>

          {/* Market Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg text-center">
              <div className="text-5xl font-bold text-terminal-gold mb-2">$28B</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide mb-2">Total Addressable Market</div>
              <p className="text-xs text-gray-400">Global email management software market</p>
            </div>

            <div className="p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg text-center">
              <div className="text-5xl font-bold text-terminal-gold mb-2">333M</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide mb-2">Email Users Worldwide</div>
              <p className="text-xs text-gray-400">Growing 3% annually through 2026</p>
            </div>

            <div className="p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg text-center">
              <div className="text-5xl font-bold text-terminal-gold mb-2">67%</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide mb-2">Feel Email Overwhelm</div>
              <p className="text-xs text-gray-400">Spend 2+ hours daily on email management</p>
            </div>
          </div>

          {/* Why Now */}
          <div className="p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg">
            <h4 className="text-lg font-bold text-terminal-gold mb-4 text-center">Why Now: Technical & Market Convergence</h4>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
              <div>
                <h5 className="font-bold text-white mb-3">Technical Tailwinds</h5>
                <ul className="space-y-2 text-xs">
                  <li>• AI costs dropped 90% (Gemini $0.075/1M tokens)</li>
                  <li>• Gmail API maturity enables rich integrations</li>
                  <li>• SwiftUI/SwiftData simplify iOS development</li>
                  <li>• Microservices enable rapid iteration</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-white mb-3">Market Momentum</h5>
                <ul className="space-y-2 text-xs">
                  <li>• Email usage up 18% since 2020 (remote work)</li>
                  <li>• AI assistants normalized (ChatGPT 100M users)</li>
                  <li>• Mobile-first email consumption (63% of opens)</li>
                  <li>• Subscription fatigue favors utility apps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: THE ASK & CALL TO ACTION */}
      <section id="beta" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Emotional Close */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Stop Managing Email. Start Living.
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
              Imagine reclaiming 400 hours per year. Time for deep work. Time for family. Time for the projects that matter.
              Zero makes it possible.
            </p>
            <p className="text-2xl sm:text-3xl text-terminal-gold font-bold italic">
              Swipe. Done. Live.
            </p>
          </div>

          {/* Beta Program CTA */}
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-terminal-gold/20 to-transparent border-2 border-terminal-gold rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="w-8 h-8 text-terminal-gold" />
              <div>
                <h3 className="text-xl font-bold text-white">Join Zero Beta Program</h3>
                <p className="text-sm text-gray-400">Currently accepting applications for Phase 1 beta testing</p>
              </div>
            </div>

            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li>• Early access to AI-powered email intelligence</li>
              <li>• Direct feedback channel to product team</li>
              <li>• Lifetime discount when we launch publicly</li>
              <li>• Help shape the future of email management</li>
            </ul>

            <div className="text-center">
              <ButtonPrimary href="/contact" size="lg" className="gap-2">
                <Mail className="w-5 h-5" />
                Apply for Beta Access
              </ButtonPrimary>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <ButtonSecondary href="/work" size="lg" className="gap-2">
                All Projects
                <ExternalLink className="w-5 h-5" />
              </ButtonSecondary>
              <ButtonTertiary href="/contact" size="lg" className="gap-2">
                Contact Studio
              </ButtonTertiary>
            </div>

            <div className="text-sm text-gray-400">
              <p>Built by Rationale Studio</p>
              <p>Venture product development for founders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="py-8 px-4 text-center border-t border-gray-800">
        <p className="text-sm text-gray-500">
          Zero Inbox Product Overview • Version 1.0 • December 2024
        </p>
        <p className="text-xs text-gray-600 mt-2">
          <Link href="/work" className="hover:text-terminal-gold transition">
            View All Projects
          </Link>
          {' • '}
          <Link href="/contact" className="hover:text-terminal-gold transition">
            Contact Rationale Studio
          </Link>
        </p>
      </div>
    </main>
  );
}
