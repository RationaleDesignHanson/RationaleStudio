// components/HeroSection.tsx

import Image from 'next/image'
import Link from 'next/link'
import { BetaSignupButton } from '@/components/beta/BetaSignupButton'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FBF8F3] via-[#FBF8F3] to-[#F4A460] py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#E85D4D]">Role:</span>
                <span>Product Strategy, UX Design, iOS Development</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#E85D4D]">Timeline:</span>
                <span>5 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#E85D4D]">Platform:</span>
                <span>iOS 17+</span>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 className="mb-4 text-5xl font-bold leading-tight text-[#2D2D2D] md:text-6xl lg:text-7xl">
                Heirloom
              </h1>
              <p className="text-2xl font-medium text-[#2D2D2D] md:text-3xl">
                Recipes Worth Passing Down
              </p>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
              A native iOS app that preserves family recipes as beautiful, shareable artifacts—not just data.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <BetaSignupButton
                appName="heirloom"
                source="hero_cta"
                size="lg"
                className="rounded-full"
              >
                Join Beta on TestFlight
              </BetaSignupButton>

              <button
                onClick={() => {
                  document.getElementById('prototype')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#E85D4D] px-8 py-4 font-semibold text-[#E85D4D] transition-all hover:bg-[#E85D4D] hover:text-white"
              >
                Try Interactive Demo
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#8B9F8D]/10 px-4 py-2 text-sm font-medium text-[#8B9F8D]">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B9F8D] opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#8B9F8D]"></span>
              </span>
              In TestFlight Beta
            </div>
          </div>

          {/* Right: Device Mockup */}
          <div className="relative">
            <div className="relative z-10">
              {/* Checkerboard placeholder for mockup */}
              <div
                className="aspect-[3/4] mx-auto max-w-md rounded-2xl border-4 border-[#E85D4D]/20 shadow-2xl overflow-hidden relative flex items-center justify-center"
                style={{
                  backgroundImage: `
                    repeating-conic-gradient(
                      #f3e8df 0% 25%,
                      #e8ddd4 0% 50%
                    )
                  `,
                  backgroundSize: '40px 40px',
                  backgroundPosition: '0 0, 20px 20px'
                }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-[#2D2D2D] font-semibold text-lg">App Mockup</p>
                  <p className="text-gray-600 text-sm">Coming Soon</p>
                </div>
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
