// components/HeroSection.tsx

import Image from 'next/image'
import Link from 'next/link'
import { BetaSignupButton } from '@/components/beta/BetaSignupButton'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FBF8F3] via-[#FBF8F3] to-[#F4A460] py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Mobile & Tablet: Horizontal compact layout (image left, text right) */}
        <div className="flex items-start gap-4 lg:hidden">
          {/* Left: Small Image (always on left) */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-xl overflow-hidden relative shadow-lg">
              <Image
                src="/heirloom/app-mockup-hero.png"
                alt="Heirloom App - Recipes Worth Passing Down"
                width={160}
                height={160}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: Compact Text (always on right) */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-[#E85D4D]">Role:</span>
                <span>Product Strategy, UX Design</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-[#E85D4D]">Timeline:</span>
                <span>5 weeks</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-[#2D2D2D] mb-1">
              Heirloom
            </h1>
            <p className="text-lg font-medium text-[#2D2D2D] mb-3">
              Recipes Worth Passing Down
            </p>

            <p className="text-sm leading-relaxed text-gray-700 mb-4">
              A native iOS app that preserves family recipes as beautiful, shareable artifacts—not just data.
            </p>

            <div className="flex flex-wrap gap-3">
              <BetaSignupButton
                appName="heirloom"
                source="hero_cta"
                size="lg"
                className="rounded-full text-sm"
              >
                Join Beta
              </BetaSignupButton>

              <button
                onClick={() => {
                  document.getElementById('prototype')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#E85D4D] px-4 py-2 text-sm font-semibold text-[#E85D4D] transition-all hover:bg-[#E85D4D] hover:text-white"
              >
                Try Demo
              </button>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-[#8B9F8D]/10 px-3 py-1.5 text-xs font-medium text-[#8B9F8D] mt-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B9F8D] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8B9F8D]"></span>
              </span>
              In TestFlight Beta
            </div>
          </div>
        </div>

        {/* Desktop: 2-column layout with image on left */}
        <div className="hidden lg:grid items-start gap-6 md:gap-6 lg:gap-8 lg:grid-cols-2">
          {/* Left: Device Mockup (scaled to fit content height) */}
          <div className="relative flex items-start">
            <div className="relative z-10 w-full">
              {/* App Hero Image - scaled to match text content height */}
              <div className="rounded-2xl overflow-hidden relative shadow-2xl max-w-sm">
                <Image
                  src="/heirloom/app-mockup-hero.png"
                  alt="Heirloom App - Recipes Worth Passing Down"
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
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
              <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#2D2D2D]">
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
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#E85D4D] px-4 sm:px-6 md:px-8 py-4 font-semibold text-[#E85D4D] transition-all hover:bg-[#E85D4D] hover:text-white"
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
        </div>
      </div>

      {/* Background Pattern (optional) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#2D2D2D_10px,#2D2D2D_11px)]"></div>
      </div>
    </section>
  )
}
