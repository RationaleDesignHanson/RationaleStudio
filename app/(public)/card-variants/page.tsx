'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';

export default function CardVariantsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-[#FFD700] font-semibold transition-colors mb-6 inline-block"
          >
            ← Back to Home
          </Link>

          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4">
            DESIGN SYSTEM PREVIEW
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Card Variant Gallery
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-6">
            Five dark-optimized card variants designed for readability and visual hierarchy on dark backgrounds.
          </p>
        </div>
      </section>

      {/* Featured Variant */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Featured Variant</h2>
            <p className="text-sm text-gray-400">
              Use for: Hero content, primary case studies, portfolio highlights
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Gray-900 background • Yellow border with glow • High contrast
            </p>
          </div>

          <OS8Window
            title="Featured Content Example"
            variant="featured"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#FFD700]">
                Premium Content Heading
              </h3>
              <p className="text-base text-gray-100 leading-relaxed">
                This variant demands attention with its yellow border and subtle glow effect. Perfect for hero sections, featured case studies, or portfolio highlights that need to stand out. The gray-900 background provides excellent contrast for both text and imagery.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• High visual prominence with yellow accent</li>
                <li>• Excellent readability with gray-100 text</li>
                <li>• Subtle shadow creates depth</li>
              </ul>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Body Variant */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Body Variant</h2>
            <p className="text-sm text-gray-400">
              Use for: Standard content sections, descriptions, detailed information
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Gray-800 background • Gray border • Comfortable reading
            </p>
          </div>

          <OS8Window
            title="Standard Content Example"
            variant="body"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-100">
                Standard Section Heading
              </h3>
              <p className="text-base text-gray-100 leading-relaxed">
                The workhorse variant for standard content. Gray-800 background provides comfortable reading without glare, while gray-600 borders create subtle definition. Use this for detailed descriptions, process explanations, or any content that requires sustained reading.
              </p>
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-sm font-semibold text-gray-200 mb-2">Key Features</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Easy on the eyes</li>
                    <li>• Neutral hierarchy</li>
                    <li>• Flexible use case</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-200 mb-2">Best For</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Process sections</li>
                    <li>• Detailed copy</li>
                    <li>• Content blocks</li>
                  </ul>
                </div>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Subtle Variant */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Subtle Variant</h2>
            <p className="text-sm text-gray-400">
              Use for: Supporting details, side content, metadata, footnotes
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Gray-800/60 transparent • Backdrop blur • De-emphasized
            </p>
          </div>

          <OS8Window
            title="Supporting Information"
            variant="subtle"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300">
                Secondary Content
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                This variant recedes into the background with its transparent overlay and muted colors. Perfect for supporting information, technical details, or content that shouldn't compete with primary sections. The backdrop blur adds subtle sophistication.
              </p>
              <div className="pt-3 border-t border-gray-700/50">
                <p className="text-xs text-gray-500">
                  Note: This variant intentionally de-emphasizes content to create visual hierarchy and reduce cognitive load.
                </p>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* CTA Variant */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">CTA Variant</h2>
            <p className="text-sm text-gray-400">
              Use for: Call-to-action sections, conversion goals, contact prompts
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Black background • Strong yellow border + glow • Maximum impact
            </p>
          </div>

          <OS8Window
            title="Get Started Today"
            variant="cta"
            animateIn={false}
            className="max-w-lg mx-auto"
          >
            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-bold text-[#FFD700]">
                Ready to Ship?
              </h3>
              <p className="text-base text-[#FFD700] leading-relaxed">
                The highest-impact variant with black background and strong yellow glow. Demands immediate attention and action. Use sparingly for conversion points like contact CTAs, booking prompts, or critical next steps.
              </p>
              <div className="pt-4">
                <button className="px-8 py-4 bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-colors">
                  Start a Conversation →
                </button>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Interactive Variant */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Interactive Variant</h2>
            <p className="text-sm text-gray-400">
              Use for: Clickable cards, portfolio items, navigation elements
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Gray-900/90 backdrop blur • Hover states • Yellow border on hover
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <OS8Window
              title="Portfolio Item #1"
              variant="interactive"
              animateIn={false}
              className="cursor-pointer"
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-100 leading-relaxed">
                  Hover over this card to see the interactive state. The border transitions to yellow and a subtle glow appears. Perfect for portfolio grids, clickable case studies, or navigation cards.
                </p>
                <span className="text-sm font-semibold text-gray-300 inline-block">
                  Explore →
                </span>
              </div>
            </OS8Window>

            <OS8Window
              title="Portfolio Item #2"
              variant="interactive"
              animateIn={false}
              className="cursor-pointer"
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-100 leading-relaxed">
                  The backdrop blur creates depth, and the smooth transition provides tactile feedback. Use this variant whenever content is clickable and needs to signal interactivity.
                </p>
                <span className="text-sm font-semibold text-gray-300 inline-block">
                  View Details →
                </span>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Visual Hierarchy in Action</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              All five variants together demonstrate clear content hierarchy without white glare or contrast switching.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <OS8Window
              title="Featured"
              variant="featured"
              animateIn={false}
            >
              <p className="text-sm text-gray-100">
                High-impact content that demands attention. Yellow border creates immediate hierarchy.
              </p>
            </OS8Window>

            <OS8Window
              title="Body"
              variant="body"
              animateIn={false}
            >
              <p className="text-sm text-gray-100">
                Standard readable content. Comfortable for sustained reading without glare.
              </p>
            </OS8Window>

            <OS8Window
              title="Subtle"
              variant="subtle"
              animateIn={false}
            >
              <p className="text-sm text-gray-400">
                Supporting information that recedes visually. Reduces cognitive load.
              </p>
            </OS8Window>

            <OS8Window
              title="CTA"
              variant="cta"
              animateIn={false}
            >
              <p className="text-sm text-[#FFD700]">
                Maximum conversion focus. Use sparingly for critical action points.
              </p>
            </OS8Window>

            <OS8Window
              title="Interactive"
              variant="interactive"
              animateIn={false}
              className="cursor-pointer"
            >
              <p className="text-sm text-gray-100">
                Signals clickability with hover states. Perfect for cards and links.
              </p>
            </OS8Window>

            {/* Legacy for comparison */}
            <OS8Window
              title="Old Default"
              variant="default"
              animateIn={false}
            >
              <p className="text-sm text-gray-700">
                Original white card. Notice the glare and contrast switching compared to dark variants.
              </p>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Implementation Recommendations"
            variant="body"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-100 mb-3">Suggested Page Applications</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#FFD700] pl-4">
                    <p className="text-sm font-semibold text-gray-200">Homepage</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Featured: Hero portfolio showcase • Body: Process sections • Interactive: Portfolio grid • CTA: Contact prompt
                    </p>
                  </div>
                  <div className="border-l-2 border-gray-600 pl-4">
                    <p className="text-sm font-semibold text-gray-200">About Page</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Featured: Founder background • Body: Company narrative • Subtle: Timeline metadata
                    </p>
                  </div>
                  <div className="border-l-2 border-gray-600 pl-4">
                    <p className="text-sm font-semibold text-gray-200">Work Pages (Case Studies)</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Featured: Project overview • Body: Deliverables & outcomes • CTA: Conversion prompt
                    </p>
                  </div>
                  <div className="border-l-2 border-gray-600 pl-4">
                    <p className="text-sm font-semibold text-gray-200">Contact Page</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Featured: Main contact info • Body: What to include • Interactive: Quick links • CTA: Email prompt
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-700">
                <h3 className="text-lg font-bold text-gray-100 mb-3">Design Rationale</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  These variants solve the contrast switching problem (21:1 ratio flip between dark site and white cards) that causes eye strain. By keeping all content in the dark-to-mid range (gray-900 to gray-400), users can read comfortably without constant pupil dilation/contraction.
                </p>
                <p className="text-xs text-gray-400">
                  Visual hierarchy is created through background darkness, border treatments, and glow effects—not through light/dark switching.
                </p>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>
    </main>
  );
}
