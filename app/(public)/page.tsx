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
import { VelocityProof } from '@/components/home/VelocityProof';
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
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight mb-4 md:mb-6">
              Vision bears the burden of proof.
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 md:mb-6 max-w-3xl">
              Prototype fast. Validate early. Scale what works.
            </p>

            {/* Supporting copy */}
            <p className="text-base md:text-lg text-gray-300 mb-8 md:mb-10 max-w-3xl">
              We design and ship production software with intention and speed. When the alignment is there, we partner with founders and teams—with skin in the game—so we're aligned on outcomes, not hours.
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

        {/* 2. HOW WE SHIP FASTER */}
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
            {/* Mobile: simplified version */}
            <div className="block md:hidden">
              <VelocityProof simplified={true} />
            </div>

            {/* Desktop: full version */}
            <div className="hidden md:block">
              <VelocityProof simplified={false} />
            </div>
          </div>
        </section>

        {/* 3. HOW WE BUILD CONVICTION */}
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
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                How we build conviction
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-2xl">
                We turn vision into proof—then ship what’s validated.
              </p>
            </div>

            <ConvictionStepper
              steps={[
                { title: 'DECIDE', description: 'Reduce uncertainty with working software.' },
                { title: 'DELIVER', description: 'Ship production systems without handoffs.' },
                { title: 'COMPOUND', description: 'Stay involved as outcomes emerge.' },
              ]}
            />

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
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Products we ship and sustain
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-2xl">
                Built end to end, then refined through usage and feedback.
              </p>
            </div>

            {/* Two cards side-by-side */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <PortfolioCard
                title="Zero"
                description="Turn email into actions—not homework."
                href="/work/zero"
                borderColor="terminal-gold"
                iconSrc="/images/icons/zero-icon.avif"
                iconAlt="Zero app icon"
              />
              <PortfolioCard
                title="Heirloom"
                description="Save every recipe. Cook with confidence."
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

function ConvictionStepper({
  steps,
}: {
  steps: Array<{ title: string; description: string }>;
}) {
  return (
    <div className="relative max-w-5xl mx-auto mb-8">
      {/* Desktop connector line */}
      <div className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-gray-700/70" />

      <ol className="grid gap-6 md:gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            <div className="flex gap-4 md:block">
              {/* Step marker */}
              <div className="flex-shrink-0">
                <div className="relative z-10 w-9 h-9 rounded-full bg-gray-900 border border-terminal-gold/40 flex items-center justify-center">
                  <span className="font-mono text-xs text-terminal-gold tracking-wider">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                {/* Mobile connector */}
                {i !== steps.length - 1 && (
                  <div className="md:hidden w-px h-10 bg-gray-700/70 mx-auto" />
                )}
              </div>

              {/* Content */}
              <div className="pt-0.5 md:pt-6">
                <div className="font-mono text-xs text-terminal-gold tracking-wider mb-2">
                  {step.title}
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Portfolio Card Component
function PortfolioCard({
  title,
  description,
  href,
  borderColor,
  iconSrc,
  iconAlt,
}: {
  title: string;
  description: string;
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
        </div>
      </div>
      <div className="flex items-center text-terminal-gold group-hover:gap-2 transition-all">
        <span className="text-sm md:text-base font-medium">View case study</span>
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
