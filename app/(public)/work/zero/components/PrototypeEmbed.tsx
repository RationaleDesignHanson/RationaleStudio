// components/PrototypeEmbed.tsx

'use client'

import { ZeroSequenceDemo } from '@/components/zero-sequence'
import GalaxyBackground from '@/components/zero/GalaxyBackground'

/**
 * Prototype Embed for Zero Case Study
 * Shows only the AI Classification demo for technical audiences
 */
export default function PrototypeEmbed() {

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
            AI Classification Demo
          </h2>
          <p className="text-xl text-gray-300">
            See how Zero's AI pipeline processes emails in real-time: intent classification, entity extraction, and action routing.
          </p>
        </div>

        {/* Demo Container */}
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border-4 border-terminal-gold/20 shadow-2xl overflow-hidden bg-gray-900/70">
            <div className="p-4 md:p-8">
              <ZeroSequenceDemo />
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 rounded-xl bg-gray-900/70 border border-terminal-gold/30 p-6">
            <h4 className="mb-3 font-semibold text-white">
              How to use the demo:
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-terminal-gold">1.</span>
                <span>Test email classification with the golden corpus or paste your own examples</span>
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
                <span>Observe the 4-step pipeline: Classification → Entity Extraction → Action Routing → Modal Flow Analysis</span>
              </li>
            </ul>
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

          {/* Link to swipe demo */}
          <div className="mt-8 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 p-6 text-center">
            <p className="text-white/90 mb-3">
              Want to see the user experience?
            </p>
            <a
              href="/zero"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full transition-all shadow-lg shadow-purple-500/30"
            >
              Try the Swipe Demo →
            </a>
            <p className="text-white/60 text-sm mt-3">
              Experience the swipeable card interface on our product page
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
