/**
 * Zero Beta User Dashboard
 *
 * Dashboard for Zero beta testers with onboarding progress,
 * usage stats, settings, and help resources.
 */

'use client';

import Link from 'next/link';
import { OnboardingProgressTracker } from '@/components/zero/OnboardingProgressTracker';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { Mail, Zap, TrendingUp, HelpCircle, MessageSquare, Settings, Download, ExternalLink, Book, FileText } from 'lucide-react';

export default function ZeroDashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* ASCII Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.04}
          animated={true}
          colorTheme={watercolorThemes.terminalSubtle}
          charSet="default"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/work/zero"
            className="text-sm text-gray-400 hover:text-terminal-gold transition-colors mb-4 inline-block"
          >
            ← Back to Zero
          </Link>
          <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            Zero Beta Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome to Zero beta. Track your setup progress and get help below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Left Column - Onboarding & Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Onboarding Progress */}
            <section>
              <OnboardingProgressTracker />
            </section>

            {/* Usage Stats (Placeholder) */}
            <section className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-terminal-gold" />
                Your Usage Stats
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-terminal-gold mb-1">--</div>
                  <div className="text-xs text-gray-400">Emails Processed</div>
                </div>
                <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-terminal-gold mb-1">--</div>
                  <div className="text-xs text-gray-400">Actions Completed</div>
                </div>
                <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-terminal-gold mb-1">--</div>
                  <div className="text-xs text-gray-400">Time Saved</div>
                </div>
                <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-terminal-gold mb-1">--</div>
                  <div className="text-xs text-gray-400">Days Active</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Stats will appear after you connect your Gmail account
              </p>
            </section>

            {/* Feedback Form */}
            <section className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-terminal-gold" />
                Send Feedback
              </h2>
              <p className="text-sm text-gray-300 mb-4">
                As a beta tester, your feedback is crucial. Let us know what's working and what needs improvement.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:hello@rationale.work?subject=Zero Beta Feedback"
                  className="flex items-center gap-2 px-4 py-3 bg-terminal-gold hover:bg-[#FFE34D] text-black font-medium rounded-lg transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Email Feedback
                </a>
                <p className="text-xs text-gray-500">
                  Or report issues directly in the app using the feedback button
                </p>
              </div>
            </section>
          </div>

          {/* Right Column - Quick Actions & Resources */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <section className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a
                  href="https://apps.apple.com/us/app/zer0-inbox/id6754212668"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-800/50 border border-gray-700 hover:border-terminal-gold rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-terminal-gold" />
                    <span className="text-sm text-white">Download App</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-terminal-gold" />
                </a>

                <Link
                  href="/work/zero"
                  className="flex items-center justify-between p-3 bg-gray-800/50 border border-gray-700 hover:border-terminal-gold rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Book className="w-5 h-5 text-terminal-gold" />
                    <span className="text-sm text-white">View Documentation</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-terminal-gold" />
                </Link>

                <a
                  href="mailto:hello@rationale.work"
                  className="flex items-center justify-between p-3 bg-gray-800/50 border border-gray-700 hover:border-terminal-gold rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-terminal-gold" />
                    <span className="text-sm text-white">Get Help</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-terminal-gold" />
                </a>
              </div>
            </section>

            {/* Help Resources */}
            <section className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">Help Resources</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">Getting Started</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold mt-0.5">→</span>
                      <span>Connect your Gmail account for read-only access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold mt-0.5">→</span>
                      <span>Swipe right to complete actions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold mt-0.5">→</span>
                      <span>Swipe left to archive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold mt-0.5">→</span>
                      <span>Swipe down to snooze</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">Privacy & Security</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold mt-0.5">→</span>
                      <span>Read-only Gmail access via OAuth 2.0</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold mt-0.5">→</span>
                      <span>No email content stored on servers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold mt-0.5">→</span>
                      <span>All data encrypted in transit</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Beta Program Info */}
            <section className="p-6 bg-gradient-to-b from-[#FFD700]/10 to-transparent border border-terminal-gold/30 rounded-lg">
              <h2 className="text-lg font-bold text-white mb-2">Beta Program</h2>
              <p className="text-sm text-gray-300 mb-4">
                You're part of our systematic 4-cohort beta rollout. Your feedback helps us achieve 95%+ AI accuracy.
              </p>
              <div className="text-xs text-gray-400">
                <p>Current phase: Cohort 1 (Friends & Family)</p>
                <p>Target: 10 active users</p>
                <p>Next milestone: Week 8 checkpoint</p>
              </div>
            </section>
          </div>
        </div>

        {/* Additional Resources */}
        <section className="mt-8 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Additional Resources</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link
              href="/work/zero/taxonomy"
              className="p-4 bg-gray-800/50 border border-gray-700 hover:border-terminal-gold rounded-lg transition-colors"
            >
              <FileText className="w-6 h-6 text-terminal-gold mb-2" />
              <h3 className="text-sm font-semibold text-white mb-1">Intent Categories</h3>
              <p className="text-xs text-gray-400">
                View all 43 intent categories Zero recognizes
              </p>
            </Link>

            <Link
              href="/work/zero/architecture"
              className="p-4 bg-gray-800/50 border border-gray-700 hover:border-terminal-gold rounded-lg transition-colors"
            >
              <Zap className="w-6 h-6 text-terminal-gold mb-2" />
              <h3 className="text-sm font-semibold text-white mb-1">Technical Architecture</h3>
              <p className="text-xs text-gray-400">
                See how Zero processes your emails
              </p>
            </Link>

            <Link
              href="/contact"
              className="p-4 bg-gray-800/50 border border-gray-700 hover:border-terminal-gold rounded-lg transition-colors"
            >
              <HelpCircle className="w-6 h-6 text-terminal-gold mb-2" />
              <h3 className="text-sm font-semibold text-white mb-1">Need Help?</h3>
              <p className="text-xs text-gray-400">
                Contact us for technical support
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
