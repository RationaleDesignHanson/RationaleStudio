'use client';

import { useState } from 'react';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ChevronDown, ChevronUp, Mail, MessageSquare, Calendar, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [showWhatToInclude, setShowWhatToInclude] = useState(false);
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Email obfuscation - decoded on click
  const getEmail = () => {
    const parts = ['hanson', '@', 'rationale', '.', 'work'];
    return parts.join('');
  };

  const handleRevealEmail = () => {
    setEmailRevealed(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(getEmail());
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      // Fallback - just reveal the email
      setEmailRevealed(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.04}
          animated={true}
          colorTheme={watercolorThemes.terminalSubtle}
          charSet="default"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs font-mono text-terminal-gold tracking-widest mb-3">
            START A CONVERSATION
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let's Figure Out the Right Fit
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl">
            Whether you need a 2-week strategy sprint or an 18-month technical co-founder,
            we're here to help you ship.
          </p>
        </div>
      </section>

      {/* Primary Email CTA */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-terminal-gold" />
            <h2 className="text-xl md:text-2xl font-bold text-white">Get in Touch</h2>
          </div>

          <div className="p-5 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-terminal-gold" />
              </div>
              <div className="flex-1">
                <p className="text-gray-300 mb-4">
                  Send us an email and we'll respond within 24 hours with initial thoughts on fit, approach, and next steps.
                </p>

                {!emailRevealed ? (
                  <button
                    onClick={handleRevealEmail}
                    className="px-6 py-3 bg-terminal-gold hover:bg-[#FFE34D] text-black font-semibold rounded-lg transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
                  >
                    Click to Reveal Email
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${getEmail()}`}
                      className="px-6 py-3 bg-terminal-gold hover:bg-[#FFE34D] text-black font-semibold rounded-lg transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
                    >
                      {getEmail()}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="text-sm text-terminal-gold hover:text-terminal-gold-hover transition-colors"
                    >
                      {emailCopied ? '✓ Copied!' : 'Copy to clipboard'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Collapsible What to Include */}
            <div className="border-t border-gray-700 pt-4">
              <button
                onClick={() => setShowWhatToInclude(!showWhatToInclude)}
                className="flex items-center justify-between w-full text-left group"
              >
                <span className="text-sm font-medium text-terminal-gold group-hover:text-terminal-gold-hover transition-colors">
                  What to Include in Your Email
                </span>
                {showWhatToInclude ? (
                  <ChevronUp className="w-4 h-4 text-terminal-gold" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-terminal-gold" />
                )}
              </button>

              {showWhatToInclude && (
                <div className="mt-3 space-y-2 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <span className="text-terminal-gold flex-shrink-0">•</span>
                    <span>What you're building and the problem you're solving</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-terminal-gold flex-shrink-0">•</span>
                    <span>Your timeline (weeks? months?)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-terminal-gold flex-shrink-0">•</span>
                    <span>Your preference: cash, equity, or hybrid engagement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-terminal-gold flex-shrink-0">•</span>
                    <span>Any existing work (prototypes, specs, etc.)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-900/30 border border-gray-700 rounded-lg">
            <p className="text-sm text-gray-400">
              <span className="text-terminal-gold font-medium">Not the right fit?</span> We'll tell you
              honestly and recommend alternatives. No hard feelings.
            </p>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-terminal-gold" />
            <h2 className="text-xl md:text-2xl font-bold text-white">What Happens Next</h2>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="p-5 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-terminal-gold" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-terminal-gold">STEP 1</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">24 hours</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Initial Review</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    We review your email and respond with initial thoughts on fit, approach, and
                    feasibility. If we're not the right partner, we'll recommend alternatives.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-terminal-gold" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-terminal-gold">STEP 2</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">2-3 days</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Discovery Call</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    30-minute conversation to dig deeper into your goals, constraints, and success
                    criteria. We'll discuss which engagement model (cash, equity, hybrid) makes sense.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-terminal-gold" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-terminal-gold">STEP 3</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">1 week</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Proposal & Terms</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    We send a detailed proposal with scope, timeline, deliverables, and commercial
                    terms. You review, we adjust if needed, and finalize the agreement.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-terminal-gold" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-terminal-gold">STEP 4</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">Kickoff</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Start Building</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    We kick off with day 1 planning, establish communication cadence, and start
                    shipping. You'll see progress daily with working software every sprint.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
