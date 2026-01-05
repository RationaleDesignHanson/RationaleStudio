/**
 * Rationale Homepage
 *
 * Redesigned with new positioning:
 * - Co-founder positioning: peer relationship, not vendor
 * - Meta Reality Labs credentials as proof
 * - Portfolio as proof of methodology
 * - Clear call to action: Book intro call
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowRight } from '@/lib/icons';
import { MultipleStructuredData } from '@/components/seo/StructuredData';
import { generateOrganizationStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata';
import { ButtonPrimary, ButtonTertiary } from '@/components/ui/ButtonHierarchy';
import { ProofBar } from '@/components/home/ProofBar';
import { ComparisonSection } from '@/components/home/ComparisonSection';

export default function HomePage() {
  const structuredData = [
    generateOrganizationStructuredData(),
    generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }]),
  ];

  return (
    <>
      <MultipleStructuredData dataBlocks={structuredData} />

      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        {/* 1. HERO SECTION */}
        <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          {/* ASCII Grid Background */}
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.terminalGold}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Pre-headline */}
            <div className="mb-4 md:mb-6">
              <p className="font-mono text-xs md:text-sm text-terminal-gold tracking-wider">
                Led product design at Meta Reality Labs—new product categories, 2B+ users, no room for guesswork.
              </p>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight mb-4 md:mb-6">
              Your product co-founder.
              <br />
              <span className="font-normal">Without the cap table drama.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-10 max-w-3xl">
              We design and ship production software in weeks—with skin in the game so we're aligned on outcomes, not hours.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonPrimary href="/contact" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                Book intro call
              </ButtonPrimary>
              <ButtonTertiary href="/work" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                See the work <ArrowRight className="w-4 h-4 md:w-5 md:h-5 inline ml-2" />
              </ButtonTertiary>
            </div>
          </div>
        </section>

        {/* 2. PROOF BAR */}
        <ProofBar />

        {/* 3. HOW IT WORKS */}
        <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.03}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
                You bring the vision. We bring the build.
              </p>
            </div>

            {/* Three cards */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8">
              <HowItWorksCard
                title="DISCOVER"
                description="Map your product thesis and biggest risks. Weeks, not months."
              />
              <HowItWorksCard
                title="PROTOTYPE"
                description="Working software that tests real assumptions. Not mockups. Not specs."
              />
              <HowItWorksCard
                title="SCALE"
                description="We stay involved as product partners. Aligned incentives, long-term."
              />
            </div>

            {/* Flexible structures note */}
            <p className="text-center text-sm md:text-base text-gray-400">
              Flexible structures: cash, equity, or hybrid—depending on fit. Details on a call.
            </p>
          </div>
        </section>

        {/* 4. PORTFOLIO */}
        <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.03}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                We Ship Our Own Products
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
                Same methodology. Our own capital. Real users.
              </p>
            </div>

            {/* Two cards side-by-side */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <PortfolioCard
                title="Zero"
                description="AI email intelligence"
                proofPoint="Concept → App Store in 30 days"
                href="/work/zero"
                borderColor="terminal-gold"
                iconSrc="/images/icons/zero-icon.avif"
                iconAlt="Zero app icon"
              />
              <PortfolioCard
                title="Heirloom"
                description="Recipe preservation + meal planning"
                proofPoint="In beta"
                href="/work/heirloom"
                borderColor="#00D9FF"
                iconSrc="/images/icons/heirloom-icon.avif"
                iconAlt="Heirloom app icon"
              />
            </div>
          </div>
        </section>

        {/* 5. WHY THIS, NOT THAT */}
        <ComparisonSection />

        {/* 6. FINAL CTA */}
        <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.03}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              Ready to talk?
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
              Let's figure out if there's a fit. 30-minute call, no pitch deck required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <ButtonPrimary href="/contact" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                Book intro call
              </ButtonPrimary>
            </div>

            {/* Secondary links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base">
              <Link href="/work" className="text-gray-400 hover:text-white transition-colors">
                See more work <ArrowRight className="w-4 h-4 inline ml-1" />
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                Read about us <ArrowRight className="w-4 h-4 inline ml-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// How It Works Card Component
function HowItWorksCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 md:p-8 hover:border-terminal-gold/50 transition-colors">
      <h3 className="text-lg md:text-xl font-bold text-terminal-gold mb-3 md:mb-4 font-mono tracking-wider">
        {title}
      </h3>
      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// Portfolio Card Component
function PortfolioCard({
  title,
  description,
  proofPoint,
  href,
  borderColor,
  iconSrc,
  iconAlt,
}: {
  title: string;
  description: string;
  proofPoint: string;
  href: string;
  borderColor: string;
  iconSrc: string;
  iconAlt: string;
}) {
  const borderColorClass =
    borderColor === 'terminal-gold'
      ? 'border-terminal-gold/40 hover:border-terminal-gold/60'
      : 'border-[#00D9FF]/40 hover:border-[#00D9FF]/60';

  return (
    <Link
      href={href}
      className={`group block p-6 md:p-8 lg:p-10 bg-gray-900/70 border-2 ${borderColorClass} rounded-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden relative flex-shrink-0">
          <Image
            src={iconSrc}
            alt={iconAlt}
            fill
            sizes="(max-width: 768px) 48px, 64px"
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-base text-gray-300 mb-3">
            {description}
          </p>
          <div className="inline-block px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs md:text-sm text-gray-300">
            {proofPoint}
          </div>
        </div>
      </div>
      <div className="flex items-center text-terminal-gold group-hover:gap-2 transition-all">
        <span className="text-sm md:text-base font-medium">View case study</span>
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
