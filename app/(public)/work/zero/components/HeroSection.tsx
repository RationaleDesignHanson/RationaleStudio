// components/HeroSection.tsx

'use client'

import Link from 'next/link'
import { BetaSignupButton } from '@/components/beta/BetaSignupButton'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl">
        {/* Mobile & Tablet: Stacked layout */}
        <div className="flex flex-col gap-4 xl:hidden">
          {/* Top: Logo + App Name */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-xl overflow-hidden relative">
                <img
                  src="/zero/app-mockup-hero.png"
                  alt="Zero App - AI Email Intelligence"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white leading-tight">
                Zero
              </h1>
              <p className="text-lg font-light text-white">
                AI Email Intelligence
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
          {/* Description */}
          <p className="text-sm leading-snug text-gray-300">
            Your inbox has 47 emails. Buried inside: a bill due tomorrow, a package arriving today, and a permission slip you need to sign. Zero's AI finds these actions and puts them in swipeable cards.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <BetaSignupButton
              appName="zero"
              source="work_hero_mobile"
              variant="outline"
              size="sm"
              className="text-sm font-normal"
            >
              Join Beta
            </BetaSignupButton>

            <button
              onClick={() => {
                document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-terminal-gold hover:text-terminal-gold-hover text-sm font-normal flex items-center gap-1 transition-colors"
            >
              Try Demo
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          </div>
        </div>

        {/* Desktop: Flex layout with image on left */}
        <div className="hidden xl:flex items-start gap-6">
          {/* Left: Device Mockup */}
          <div className="flex-shrink-0 max-h-[200px] max-w-[200px]">
            <img
              src="/zero/app-mockup-hero.png"
              alt="Zero App - AI Email Intelligence"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>

          {/* Right: Text Content */}
          <div className="flex flex-col space-y-2 md:space-y-3 lg:space-y-4 flex-1 max-w-2xl">
            {/* Headline */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white">
                Zero: <span className="font-light">AI Email Intelligence</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
              Your inbox has 47 emails. Buried inside: a bill due tomorrow, a package arriving today, and a permission slip you need to sign. Zero's AI finds these actions and puts them in swipeable cards.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-6">
              <BetaSignupButton
                appName="zero"
                source="work_hero_desktop"
                variant="outline"
                size="md"
                className="text-base md:text-lg font-normal"
              >
                Join Beta
              </BetaSignupButton>

              <Link
                href="/zero"
                className="text-terminal-gold hover:text-terminal-gold-hover text-base md:text-lg font-normal flex items-center gap-1 transition-colors"
              >
                Try Interactive Demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#FFD700_10px,#FFD700_11px)]"></div>
      </div>
    </section>
  )
}
