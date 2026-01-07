// components/FinalCTA.tsx

import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 md:py-16 lg:py-20 md:py-28 border-t border-terminal-gold/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          {/* Headline */}
          <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold">
            Want to Build Products Like This?
          </h2>

          {/* Description */}
          <p className="mb-12 text-xl leading-relaxed text-gray-300 md:text-2xl">
            Zero demonstrates Rationale's execution capability: fast iteration meets technical excellence.
            <br />
            <span className="font-semibold text-white">Let's build your product next.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-terminal-gold px-10 py-5 text-lg font-semibold text-black shadow-xl transition-all hover:bg-[#FFE34D] hover:scale-105 hover:shadow-2xl"
            >
              Work With Us
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-terminal-gold px-10 py-5 text-lg font-semibold text-terminal-gold transition-all hover:bg-terminal-gold hover:text-black"
            >
              See More Work
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Link>
          </div>

          {/* Sub-text */}
          <p className="mt-12 text-sm text-gray-400">
            AI-Powered Products · Next.js · SwiftUI · From Concept to Launch
          </p>
        </div>
      </div>
    </section>
  )
}
