// components/HeroSection.tsx

import Link from 'next/link'
import { BetaSignupButton } from '@/components/beta/BetaSignupButton'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FBF8F3] via-[#FBF8F3] to-[#F4A460] py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl">
        {/* Mobile & Tablet: Stacked layout */}
        <div className="flex flex-col gap-4 xl:hidden">
          {/* Top: Logo + App Name */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-xl overflow-hidden relative shadow-lg">
                <img
                  src="/heirloom/app-mockup-hero.png"
                  alt="Heirloom App - Recipes Worth Passing Down"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#2D2D2D]">
              Heirloom: <span className="font-light">Recipes Worth Passing Down</span>
            </h1>
          </div>

          <div className="flex flex-col gap-4">
          {/* Description */}
          <p className="text-sm leading-snug text-gray-700">
            A native iOS app that preserves family recipes as beautiful, shareable artifacts—not just data.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://testflight.apple.com/join/gs6EU81Z"
              className="text-[#E85D4D] hover:text-[#D84D3D] text-sm font-normal flex items-center gap-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Beta
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <button
              onClick={() => {
                document.getElementById('prototype')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-[#E85D4D] hover:text-[#D84D3D] text-sm font-normal flex items-center gap-1 transition-colors"
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
              src="/heirloom/app-mockup-hero.png"
              alt="Heirloom App - Recipes Worth Passing Down"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>

          {/* Right: Text Content */}
          <div className="flex flex-col space-y-2 md:space-y-3 lg:space-y-4 flex-1 max-w-2xl">

            {/* Headline */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-[#2D2D2D]">
                Heirloom: <span className="font-light">Recipes Worth Passing Down</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
              A native iOS app that preserves family recipes as beautiful, shareable artifacts—not just data.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-6">
              <Link
                href="https://testflight.apple.com/join/gs6EU81Z"
                className="text-[#E85D4D] hover:text-[#D84D3D] text-base md:text-lg font-normal flex items-center gap-1 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Beta on TestFlight
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <button
                onClick={() => {
                  document.getElementById('prototype')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-[#E85D4D] hover:text-[#D84D3D] text-base md:text-lg font-normal flex items-center gap-1 transition-colors"
              >
                Try Interactive Demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Background Pattern (optional) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#2D2D2D_10px,#2D2D2D_11px)]"></div>
      </div>
    </section>
  )
}
