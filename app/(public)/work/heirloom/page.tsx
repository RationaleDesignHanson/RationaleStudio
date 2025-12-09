'use client'

// app/work/heirloom/page.tsx
// Heirloom Case Study - Main Page Component

import './print.css'
import HeroSection from './components/HeroSection'
import AtAGlance from './components/AtAGlance'
import ProjectOverview from './components/ProjectOverview'
import MetricsComparison from './components/MetricsComparison'
import ChallengeSection from './components/ChallengeSection'
import ApproachSection from './components/ApproachSection'
import UserJourneyMap from './components/diagrams/UserJourneyMap'
import FeatureGrid from './components/FeatureGrid'
import { DesignSystem, TechnicalStack, Timeline, Outcomes, LessonsLearned } from './components/_StubComponents'
import PrototypeEmbed from './components/PrototypeEmbed'
import FinalCTA from './components/FinalCTA'

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

      {/* Comparative metrics with industry benchmarks */}
      <MetricsComparison />

      {/* The problem: recipe apps treat recipes like data */}
      <ChallengeSection />

      {/* Our approach: preserve the artifact, smart utility, native-first */}
      <ApproachSection />

      {/* User journey map: Discover → Import → Customize → Share → Cook */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <UserJourneyMap />
        </div>
      </section>

      {/* 6 key features in grid layout */}
      <FeatureGrid />

      {/* Design system showcase: colors, typography, components */}
      <DesignSystem />

      {/* Technical architecture diagram */}
      <TechnicalStack />

      {/* 5-week development timeline */}
      <Timeline />

      {/* Results and target metrics */}
      <Outcomes />

      {/* Interactive Figma prototype embed */}
      <PrototypeEmbed />

      {/* 3 lessons learned in columns */}
      <LessonsLearned />

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
            image: 'https://rationale.work/images/work/heirloom/hero-mockup.png',
            url: 'https://rationale.work/work/heirloom',
            datePublished: '2025-01-01',
            keywords: 'iOS app, recipe app, SwiftUI, product design, native development',
          }),
        }}
      />
    </main>
  )
}
