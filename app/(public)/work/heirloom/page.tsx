'use client'

// app/work/heirloom/page.tsx
// Heirloom Case Study - Main Page Component

import './print.css'
import HeroSection from './components/HeroSection'
import AtAGlance from './components/AtAGlance'
import PrototypeEmbed from './components/PrototypeEmbed'
import ProjectOverview from './components/ProjectOverview'
import MetricsComparison from './components/MetricsComparison'
import FeatureGrid from './components/FeatureGrid'
import FinalCTA from './components/FinalCTA'
import Link from 'next/link'

export default function HeirloomCaseStudy() {
  return (
    <main className="heirloom-case-study">
      {/* Hero with gradient background and device mockup */}
      <HeroSection />

      {/* Executive summary - At a Glance insight box */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <AtAGlance />
          </div>
        </div>
      </section>

      {/* Quick overview stats and description */}
      <ProjectOverview />

      {/* 6 key features in grid layout */}
      <FeatureGrid />

      {/* Interactive prototype demos */}
      <PrototypeEmbed />

      {/* Comparative metrics with industry benchmarks */}
      <MetricsComparison />

      {/* CTA Links Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h3 className="mb-8 text-center text-2xl font-bold text-[#2D2D2D]">Explore More</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/work/heirloom/design-system"
                className="group flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#E85D4D] hover:shadow-lg"
              >
                <div>
                  <h4 className="text-lg font-bold text-[#2D2D2D] group-hover:text-[#E85D4D]">
                    Design System
                  </h4>
                  <p className="text-sm text-gray-600 leading-snug">
                    Vintage-inspired colors, typography, and accessibility tokens
                  </p>
                </div>
                <svg className="h-5 w-5 flex-shrink-0 ml-4 text-[#E85D4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/work/heirloom/technical-architecture"
                className="group flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#E85D4D] hover:shadow-lg"
              >
                <div>
                  <h4 className="text-lg font-bold text-[#2D2D2D] group-hover:text-[#E85D4D]">
                    Technical Architecture
                  </h4>
                  <p className="text-sm text-gray-600 leading-snug">
                    Native iOS stack, SwiftUI implementation, and engineering decisions
                  </p>
                </div>
                <svg className="h-5 w-5 flex-shrink-0 ml-4 text-[#E85D4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/work/heirloom/timeline-and-outcomes"
                className="group flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#E85D4D] hover:shadow-lg"
              >
                <div>
                  <h4 className="text-lg font-bold text-[#2D2D2D] group-hover:text-[#E85D4D]">
                    Timeline & Outcomes
                  </h4>
                  <p className="text-sm text-gray-600 leading-snug">
                    Development process, user journey, metrics, and lessons learned
                  </p>
                </div>
                <svg className="h-5 w-5 flex-shrink-0 ml-4 text-[#E85D4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/work/heirloom/pitch"
                className="group flex items-center justify-between rounded-lg border-2 border-[#F4A460] bg-gradient-to-br from-[#FBF8F3] to-white p-6 transition-all hover:border-[#E85D4D] hover:shadow-lg"
              >
                <div>
                  <h4 className="text-lg font-bold text-[#2D2D2D] group-hover:text-[#E85D4D]">
                    Investment Pitch
                  </h4>
                  <p className="text-sm text-gray-600 leading-snug">
                    Interactive pitch deck with market analysis, technical diagrams, and financials
                  </p>
                </div>
                <svg className="h-5 w-5 flex-shrink-0 ml-4 text-[#E85D4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA: Work with us */}
      <FinalCTA />

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: 'Heirloom: iOS Recipe App',
            description: 'A native iOS app for preserving and sharing family recipes with smart shopping lists and card personalization.',
            creator: {
              '@type': 'Organization',
              name: 'Rationale Studios',
              url: 'https://rationale.work',
            },
            image: 'https://rationale.work/images/work/heirloom/hero-mockup.svg',
            url: 'https://rationale.work/work/heirloom',
            datePublished: '2025-01-01',
            keywords: 'iOS app, recipe app, SwiftUI, product design, native development',
          }),
        }}
      />
    </main>
  )
}
