'use client'

// app/work/heirloom/timeline-and-outcomes/page.tsx
// Heirloom Timeline and Outcomes Detail Page

import Link from 'next/link'
import UserJourneyDiagram from '@/components/heirloom/diagrams/UserJourneyDiagram'
import { Timeline, Outcomes, LessonsLearned } from '../components/_StubComponents'
import FinalCTA from '../components/FinalCTA'

export default function HeirloomTimelineAndOutcomesPage() {
  return (
    <main className="heirloom-timeline-outcomes-page">
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
            <span className="font-semibold text-[#2D2D2D]">Timeline & Outcomes</span>
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

      {/* User Journey Map */}
      <section className="bg-white py-12 md:py-16 lg:py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <UserJourneyDiagram />
        </div>
      </section>

      {/* Development Timeline */}
      <Timeline />

      {/* Outcomes & Metrics */}
      <Outcomes />

      {/* Lessons Learned */}
      <LessonsLearned />

      {/* Cross-links to other detail pages */}
      <section className="bg-white py-12 md:py-16 border-t border-gray-200">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <h3 className="mb-6 text-xl font-bold text-[#2D2D2D]">Continue Exploring</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/work/heirloom/design-system"
                className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#E85D4D] hover:shadow-lg"
              >
                <h4 className="mb-2 text-lg font-bold text-[#2D2D2D] group-hover:text-[#E85D4D]">
                  Design System →
                </h4>
                <p className="text-sm text-gray-600">
                  Explore the vintage-inspired design system with colors, typography, and tokens
                </p>
              </Link>
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
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />
    </main>
  )
}
