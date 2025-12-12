// components/PrototypeEmbed.tsx

'use client'

import { useState, useEffect } from 'react'
import InteractiveDemo from '@/components/zero/InteractiveDemo'
import { ZeroSequenceDemo } from '@/components/zero-sequence'
import GalaxyBackground from '@/components/zero/GalaxyBackground'

export default function PrototypeEmbed() {
  const [activeDemo, setActiveDemo] = useState<'swipe' | 'classification'>('swipe')
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isMobileModalOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileModalOpen, isMobile])

  const openMobileDemo = () => {
    setIsMobileModalOpen(true)
  }

  const closeMobileDemo = () => {
    setIsMobileModalOpen(false)
  }

  return (
    <section id="demo" className="relative bg-black py-12 md:py-16 lg:py-20 md:py-28 overflow-hidden">
      {/* Galaxy Background */}
      <div className="absolute inset-0">
        <GalaxyBackground />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-white md:text-5xl">
            Try It Yourself
          </h2>
          <p className="text-xl text-gray-300">
            Experience Zero's AI-powered email triage in these interactive demos.
          </p>
        </div>

        {/* Demo Selector - Hidden on mobile when using modal approach */}
        <div className="mx-auto max-w-6xl mb-8">
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => {
                setActiveDemo('swipe')
                if (isMobile) openMobileDemo()
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeDemo === 'swipe'
                  ? 'bg-terminal-gold text-black shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              Swipe Triage
            </button>
            <button
              onClick={() => {
                setActiveDemo('classification')
                if (isMobile) openMobileDemo()
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeDemo === 'classification'
                  ? 'bg-terminal-gold text-black shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              AI Classification
            </button>
          </div>
        </div>

        {/* Desktop Demo Container - Hidden on mobile */}
        {!isMobile && (
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl border-4 border-terminal-gold/20 shadow-2xl overflow-hidden bg-gray-900/70">
              {activeDemo === 'swipe' && (
                <div className="p-8">
                  <InteractiveDemo />
                </div>
              )}
              {activeDemo === 'classification' && (
                <div className="p-8">
                  <ZeroSequenceDemo />
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-8 rounded-xl bg-gray-900/70 border border-terminal-gold/30 p-6">
              <h4 className="mb-3 font-semibold text-white">
                How to use the demos:
              </h4>

              {activeDemo === 'swipe' && (
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold">1.</span>
                    <span>Swipe right to complete actions (pay bill, RSVP, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold">2.</span>
                    <span>Swipe left to archive emails you've handled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold">3.</span>
                    <span>Swipe down to snooze for later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold">4.</span>
                    <span>Toggle between Mail and Ads to separate promotional content</span>
                  </li>
                </ul>
              )}

              {activeDemo === 'classification' && (
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold">1.</span>
                    <span>Test email classification with the golden corpus or your own examples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold">2.</span>
                    <span>Watch Zero extract entities (tracking numbers, dates, amounts)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold">3.</span>
                    <span>See how the AI identifies intent and generates response flows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terminal-gold">4.</span>
                    <span>Backend included as we refine the classification system</span>
                  </li>
                </ul>
              )}
            </div>

            {/* What the Production App Adds */}
            <div className="mt-8 rounded-xl bg-gray-900/70 border border-terminal-gold/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-4">What the Production App Adds</h3>

              <p className="text-gray-300 mb-6 leading-relaxed">
                The production app extends the prototype with real-world integrations, scalable architecture, and native iOS capabilities.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-terminal-gold mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Real Gmail integration (OAuth 2.0)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-terminal-gold mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">AI classification (43 intent categories)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-terminal-gold mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Entity extraction (tracking #s, dates, amounts)</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-terminal-gold mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Native device actions (Calendar, Contacts, Wallet)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-terminal-gold mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">10-service backend architecture</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-terminal-gold mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Summarization and smart replies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Instructions - Shown instead of demo */}
        {isMobile && !isMobileModalOpen && (
          <div className="mx-auto max-w-6xl">
            <div className="rounded-xl bg-gray-900/70 border border-terminal-gold/30 p-6 text-center">
              <p className="text-gray-300 mb-4">
                Tap a demo button above to experience Zero's interactive features in fullscreen mode.
              </p>
              <p className="text-sm text-gray-400">
                Best viewed in landscape orientation for optimal interaction.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Fullscreen Modal */}
      {isMobile && isMobileModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          {/* Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h3 className="text-lg font-bold text-white">
              {activeDemo === 'swipe' ? 'Swipe Triage Demo' : 'AI Classification Demo'}
            </h3>
            <button
              onClick={closeMobileDemo}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Close demo"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Demo Content - Fullscreen without phone mockup */}
          <div className="flex-1 overflow-auto bg-black">
            {activeDemo === 'swipe' && <InteractiveDemo />}
            {activeDemo === 'classification' && <ZeroSequenceDemo />}
          </div>

          {/* Demo Switcher at bottom */}
          <div className="p-4 border-t border-gray-800 bg-gray-900">
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setActiveDemo('swipe')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeDemo === 'swipe'
                    ? 'bg-terminal-gold text-black'
                    : 'bg-gray-800 text-gray-300 border border-gray-700'
                }`}
              >
                Swipe Triage
              </button>
              <button
                onClick={() => setActiveDemo('classification')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeDemo === 'classification'
                    ? 'bg-terminal-gold text-black'
                    : 'bg-gray-800 text-gray-300 border border-gray-700'
                }`}
              >
                AI Classification
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
