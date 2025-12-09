// components/HeroSection.tsx

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BetaSignupButton } from '@/components/beta/BetaSignupButton'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#FFD700]">Role:</span>
                <span>Product Strategy, AI Engineering, iOS Development</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#FFD700]">Platform:</span>
                <span>iOS 17+ with Cloud Backend</span>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 className="mb-4 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Zero
              </h1>
              <p className="text-2xl font-medium text-white md:text-3xl">
                AI Email Intelligence
              </p>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
              Your inbox has 47 emails. Buried inside: a bill due tomorrow, a package arriving today, and a permission slip you need to sign. Zero's AI finds these actions and puts them in swipeable cards.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <BetaSignupButton
                appName="zero"
                source="hero_cta"
                size="lg"
                className="rounded-full"
              >
                Join Beta on TestFlight
              </BetaSignupButton>

              <button
                onClick={() => {
                  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#FFD700] px-8 py-4 font-semibold text-[#FFD700] transition-all hover:bg-[#FFD700] hover:text-black"
              >
                Try Interactive Demo
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#4ADE80]/10 px-4 py-2 text-sm font-medium text-[#4ADE80]">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#4ADE80]"></span>
              </span>
              In TestFlight Beta
            </div>
          </div>

          {/* Right: Device Mockup or Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Checkerboard placeholder for mockup */}
              <div
                className="aspect-[3/4] mx-auto max-w-md rounded-2xl border-4 border-[#FFD700]/20 shadow-2xl overflow-hidden relative flex items-center justify-center"
                style={{
                  backgroundImage: `
                    repeating-conic-gradient(
                      #1f2937 0% 25%,
                      #374151 0% 50%
                    )
                  `,
                  backgroundSize: '40px 40px',
                  backgroundPosition: '0 0, 20px 20px'
                }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-white font-semibold text-lg">App Mockup</p>
                  <p className="text-gray-300 text-sm">Coming Soon</p>
                </div>
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
