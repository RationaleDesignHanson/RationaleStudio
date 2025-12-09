'use client'

// app/work/heirloom/design-system/page.tsx
// Heirloom Design System Detail Page

import Link from 'next/link'
import { DesignSystem } from '../components/_StubComponents'
import FinalCTA from '../components/FinalCTA'

export default function HeirloomDesignSystemPage() {
  return (
    <main className="heirloom-design-system-page">
      {/* Breadcrumb Navigation */}
      <section className="bg-white py-6 border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#E85D4D]">
              Home
            </Link>
            <span>/</span>
            <Link href="/work" className="hover:text-[#E85D4D]">
              Work
            </Link>
            <span>/</span>
            <Link href="/work/heirloom" className="hover:text-[#E85D4D]">
              Heirloom
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#2D2D2D]">Design System</span>
          </nav>
        </div>
      </section>

      {/* Back Link */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <Link
            href="/work/heirloom"
            className="inline-flex items-center gap-2 text-[#E85D4D] hover:text-[#d54d3d] font-semibold"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Heirloom Case Study
          </Link>
        </div>
      </section>

      {/* Design System Content */}
      <DesignSystem />

      {/* Cross-links to other detail pages */}
      <section className="bg-gray-50 py-12 md:py-16 border-t border-gray-200">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <h3 className="mb-6 text-xl font-bold text-[#2D2D2D]">Continue Exploring</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/work/heirloom/technical-architecture"
                className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#E85D4D] hover:shadow-lg"
              >
                <h4 className="mb-2 text-lg font-bold text-[#2D2D2D] group-hover:text-[#E85D4D]">
                  Technical Architecture →
                </h4>
                <p className="text-sm text-gray-600">
                  Explore the native iOS stack, SwiftUI implementation, and engineering decisions
                </p>
              </Link>
              <Link
                href="/work/heirloom/timeline-and-outcomes"
                className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#E85D4D] hover:shadow-lg"
              >
                <h4 className="mb-2 text-lg font-bold text-[#2D2D2D] group-hover:text-[#E85D4D]">
                  Timeline & Outcomes →
                </h4>
                <p className="text-sm text-gray-600">
                  See the complete development process, user journey, and results
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />
    </main>
  )
}
