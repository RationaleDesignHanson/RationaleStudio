'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';

export default function SparkARPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#portfolio"
            className="text-sm text-gray-400 hover:text-terminal-gold font-semibold transition-colors mb-6 inline-block"
          >
            ← Back to Portfolio
          </Link>

          <p className="text-xs sm:text-sm font-mono text-terminal-gold tracking-widest mb-4">
            META 2018-2022 // AR PLATFORM LEADERSHIP
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Spark AR Platform
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-6">
            Built Meta's AR creation platform from ground up, scaling to millions of creators and unifying camera experiences across Facebook, Instagram, and Messenger
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Platform Development
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Team Scaling
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              AR/VR
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
              Product Strategy
            </span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Project Overview"
            variant="yellow"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-base">
                <span className="font-bold text-black">Challenge:</span> Meta needed a unified AR creation platform that could scale across Facebook, Instagram, and Messenger while empowering millions of creators to build interactive camera experiences. The platform had to balance creative flexibility with performance, privacy, and platform consistency.
              </p>
              <p className="text-base">
                <span className="font-bold text-black">Approach:</span> Led Spark AR platform development from inception, defining product vision, building the team from 2 to 22 people, and establishing the technical architecture for AR experiences at Meta scale. Unified camera UX across products while enabling creator innovation.
              </p>
              <p className="text-base border-t border-terminal-gold pt-4 font-semibold text-black">
                Impact: 150% YoY platform growth, millions of active creators, unified AR experience across Meta's family of apps.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              What We Delivered
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <OS8Window
              title="Platform Foundation"
              variant="minimal"
              delay={100}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Built AR creation platform from ground up, enabling creators to build interactive effects with performance and privacy guardrails.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• Creator tooling and SDK</li>
                  <li>• Performance optimization</li>
                  <li>• Privacy-first architecture</li>
                </ul>
              </div>
            </OS8Window>

            <OS8Window
              title="Team & Scale"
              variant="minimal"
              delay={200}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Grew team from 2 to 22 people, achieving 150% year-over-year platform growth while maintaining product quality and creator satisfaction.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• 2→22 team members</li>
                  <li>• 150% YoY growth</li>
                  <li>• High-performing team culture</li>
                </ul>
              </div>
            </OS8Window>

            <OS8Window
              title="Cross-Platform Unity"
              variant="minimal"
              delay={300}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Unified camera UX across Facebook, Instagram, and Messenger, creating consistent AR experiences for billions of users.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-3">
                  <li>• Unified camera experience</li>
                  <li>• Cross-app consistency</li>
                  <li>• Billion-user scale</li>
                </ul>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Outcomes & Impact */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Outcomes & Impact"
            variant="default"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Spark AR became the foundation for Meta's AR strategy, enabling millions of creators to build interactive experiences used by billions. The platform balanced creative freedom with technical constraints, establishing AR as a core part of Meta's camera products.
              </p>
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs font-bold text-black uppercase tracking-wide mb-2">Platform Growth</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 150% YoY growth</li>
                    <li>• Millions of creators</li>
                    <li>• Billions of users reached</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-black uppercase tracking-wide mb-2">Team Impact</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 11x team growth</li>
                    <li>• High-performing culture</li>
                    <li>• Hired strong leads</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-black uppercase tracking-wide mb-2">Product Success</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Unified camera UX</li>
                    <li>• Creator satisfaction</li>
                    <li>• Strategic platform asset</li>
                  </ul>
                </div>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* What This Proves */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="What This Proves About Rationale"
            variant="yellow"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-3 text-gray-700">
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-black">0→1 platform building:</span> Led platform development from inception to millions of users, establishing technical architecture and product vision from scratch.
              </p>
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-black">Team scaling:</span> Grew team 11x while maintaining quality, culture, and 150% YoY growth trajectory.
              </p>
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-black">Enterprise complexity:</span> Unified experiences across multiple products at billion-user scale, balancing creator needs with platform constraints.
              </p>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title="Building an AR/VR Platform?"
            variant="yellow"
            animateIn={false}
            className="max-w-lg"
          >
            <div className="space-y-6">
              <p className="text-base text-gray-700 leading-relaxed">
                Whether you're building AR tools, creator platforms, or scaled infrastructure—Rationale brings Meta-level platform expertise to your product.
              </p>

              <div className="flex flex-col gap-3 pt-4">
                <Link
                  href="/contact"
                  className="w-full bg-terminal-gold hover:bg-[#FFE34D] text-black text-center px-6 py-3 font-semibold transition-colors"
                >
                  Start a Conversation →
                </Link>
                <Link
                  href="/how-we-work"
                  className="w-full border border-gray-300 hover:border-terminal-gold text-black text-center px-6 py-3 font-semibold transition-colors"
                >
                  How We Work
                </Link>
              </div>

              <div className="pt-3 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">
                  <a href="/contact" className="hover:text-terminal-gold transition-colors">Contact us</a>
                </p>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>
    </main>
  );
}
