/**
 * Studio Investment Details
 *
 * Complete investment case for Rationale Studio (holding company)
 * Updated December 2024
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { ASCIIUnifiedGrid, GlassCard } from '@/components/visual';
import { investmentContent } from '@/lib/content';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio Investment — Rationale Investment Opportunities',
  description: 'Invest in Rationale holding company for diversified portfolio exposure. Partners help decide which ventures to build.',
};

export default function StudioInvestmentPage() {
  const studioTier = investmentContent.tiers.find(t => t.id === 'studio-investment')!;

  const heroTheme = getSectionTheme('hero');
  const tiersTheme = getSectionTheme('featuredWork');
  const comparisonTheme = getSectionTheme('services');
  const faqTheme = getSectionTheme('founder');

  return (
    <>
      {/* Hero */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme}>
        <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} />
        <Container className="relative z-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={heroTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="flex items-center justify-between mb-6">
                <Link href="/investors" className="text-sm hover:underline" style={{ color: heroTheme.accent }}>
                  ← Back to All Opportunities
                </Link>
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: `${heroTheme.accent}33`,
                    color: heroTheme.accent
                  }}
                >
                  {studioTier.status}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: heroTheme.foreground }}>
                {studioTier.title}
              </h1>
              <p className="text-2xl mb-3" style={{ color: heroTheme.accent }}>{studioTier.tagline}</p>
              <p className="text-lg font-semibold mb-4" style={{ color: heroTheme.foreground }}>{studioTier.highlight}</p>
              <p className="text-base leading-relaxed" style={{ color: heroTheme.muted }}>{studioTier.description}</p>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Three Entry Points */}
      {studioTier.entryPoints && (
        <Section spacing="large" background="transparent" colorTheme={tiersTheme} noPaddingTop={true}>
          <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={tiersTheme} />
          <ASCIIUnifiedGrid animated={true} colorTheme={tiersTheme} opacity={0.25} />

          <Container className="relative z-20 pt-16 sm:pt-20">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: tiersTheme.foreground }}>
                  {studioTier.entryPoints.title}
                </h2>
                <p className="text-base" style={{ color: tiersTheme.muted }}>{studioTier.entryPoints.description}</p>
              </div>

              <div className="space-y-6">
                {studioTier.entryPoints.options.map((option, idx) => (
                <GlassCard key={idx} theme={tiersTheme} className="p-6 sm:p-8" borderRadius="1rem">
                  <h3 className="text-xl font-bold mb-3" style={{ color: tiersTheme.foreground }}>
                    {option.type}
                  </h3>
                  <p className="text-base mb-4" style={{ color: tiersTheme.muted }}>
                    {option.description}
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        border: `1px solid ${tiersTheme.border}`,
                        backgroundColor: `${tiersTheme.background}80`
                      }}
                    >
                      <div className="text-xs font-semibold mb-1" style={{ color: tiersTheme.muted }}>
                        Ideal For
                      </div>
                      <div className="text-sm" style={{ color: tiersTheme.foreground }}>{option.ideal}</div>
                    </div>

                    <div
                      className="p-3 rounded-lg"
                      style={{
                        border: `1px solid ${tiersTheme.border}`,
                        backgroundColor: `${tiersTheme.background}80`
                      }}
                    >
                      <div className="text-xs font-semibold mb-1" style={{ color: tiersTheme.muted }}>
                        Involvement
                      </div>
                      <div className="text-sm" style={{ color: tiersTheme.foreground }}>{option.involvement}</div>
                    </div>

                    <div
                      className="p-3 rounded-lg"
                      style={{
                        border: `1px solid ${tiersTheme.border}`,
                        backgroundColor: `${tiersTheme.background}80`
                      }}
                    >
                      <div className="text-xs font-semibold mb-1" style={{ color: tiersTheme.muted }}>
                        Equity
                      </div>
                      <div className="text-sm" style={{ color: tiersTheme.foreground }}>{option.equity}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </Container>
        </Section>
      )}

      {/* Governance Process */}
      {studioTier.governance && (
        <Section spacing="large" background="transparent" colorTheme={comparisonTheme} noPaddingTop={true}>
        <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={comparisonTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={comparisonTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={comparisonTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: comparisonTheme.foreground }}>
                  {studioTier.governance.title}
                </h2>
                <p className="text-base mb-4" style={{ color: comparisonTheme.accent }}>
                  {studioTier.governance.subtitle}
                </p>
                <p className="text-sm" style={{ color: comparisonTheme.muted }}>
                  {studioTier.governance.description}
                </p>
              </div>

              {/* Process Steps */}
              <div className="space-y-6">
                {studioTier.governance.process.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-lg"
                    style={{
                      border: `1px solid ${comparisonTheme.border}`,
                      backgroundColor: `${comparisonTheme.background}80`
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold"
                        style={{
                          backgroundColor: comparisonTheme.accent,
                          color: comparisonTheme.background
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-2" style={{ color: comparisonTheme.foreground }}>
                          {step.phase}
                        </h4>
                        <p className="text-sm mb-2" style={{ color: comparisonTheme.muted }}>
                          {step.description}
                        </p>
                        <div className="text-xs font-semibold" style={{ color: comparisonTheme.accent }}>
                          Timeline: {step.timeline}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strategic Partner Rights */}
              <div
                className="mt-8 p-6 rounded-lg"
                style={{
                  border: `1px solid ${comparisonTheme.accent}4D`,
                  backgroundColor: `${comparisonTheme.accent}0D`
                }}
              >
                <h4 className="text-lg font-bold mb-4" style={{ color: comparisonTheme.foreground }}>
                  {studioTier.governance.rights.title}
                </h4>
                <ul className="space-y-2">
                  {studioTier.governance.rights.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span style={{ color: comparisonTheme.accent }}>•</span>
                      <span style={{ color: comparisonTheme.muted }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Example */}
              <div
                className="mt-6 p-6 rounded-lg"
                style={{
                  border: `1px solid ${comparisonTheme.border}`,
                  backgroundColor: `${comparisonTheme.background}80`
                }}
              >
                <h4 className="text-sm font-bold mb-2" style={{ color: comparisonTheme.foreground }}>
                  {studioTier.governance.example.title}
                </h4>
                <p className="text-sm italic" style={{ color: comparisonTheme.muted }}>
                  {studioTier.governance.example.scenario}
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
        </Section>
      )}

      {/* Current Portfolio */}
      {studioTier.portfolio && (
        <Section spacing="large" background="transparent" colorTheme={faqTheme} noPaddingTop={true}>
        <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={faqTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={faqTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={faqTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: faqTheme.foreground }}>
                  {studioTier.portfolio.title}
                </h2>
                <p className="text-base" style={{ color: faqTheme.muted }}>
                  {studioTier.portfolio.description}
                </p>
              </div>

              <div className="space-y-6">
                {studioTier.portfolio.ventures.map((venture, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-lg"
                    style={{
                      border: `1px solid ${faqTheme.border}`,
                      backgroundColor: `${faqTheme.background}80`
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold" style={{ color: faqTheme.foreground }}>
                        {venture.name}
                      </h3>
                      <span
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: `${faqTheme.accent}33`,
                          color: faqTheme.accent
                        }}
                      >
                        {venture.stage}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: faqTheme.muted }}>
                      {venture.status}
                    </p>
                    <p className="text-sm mb-2" style={{ color: faqTheme.foreground }}>
                      <span className="font-semibold">Market:</span> {venture.market}
                    </p>
                    <p className="text-xs" style={{ color: faqTheme.accent }}>
                      {venture.ownership}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Container>
        </Section>
      )}

      {/* Portfolio Vision */}
      {studioTier.vision && (
        <Section spacing="large" background="transparent" colorTheme={heroTheme} noPaddingTop={true}>
        <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={heroTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={heroTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: heroTheme.foreground }}>
                  {studioTier.vision.title}
                </h2>
                <p className="text-base" style={{ color: heroTheme.muted }}>
                  {studioTier.vision.description}
                </p>
              </div>

              <div className="space-y-4">
                {studioTier.vision.timeline.map((period, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg flex items-center justify-between"
                    style={{
                      border: `1px solid ${heroTheme.border}`,
                      backgroundColor: `${heroTheme.background}80`
                    }}
                  >
                    <div className="flex-1">
                      <div className="text-sm font-semibold mb-1" style={{ color: heroTheme.accent }}>
                        {period.year}
                      </div>
                      <div className="text-sm" style={{ color: heroTheme.foreground }}>
                        {period.ventures}
                      </div>
                    </div>
                    <div
                      className="text-2xl font-bold px-4"
                      style={{ color: heroTheme.accent }}
                    >
                      {period.count}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 p-4 rounded-lg text-center"
                style={{
                  border: `1px solid ${heroTheme.accent}4D`,
                  backgroundColor: `${heroTheme.accent}0D`
                }}
              >
                <p className="text-sm" style={{ color: heroTheme.muted }}>
                  <span className="font-semibold" style={{ color: heroTheme.foreground }}>Sectors: </span>
                  {studioTier.vision.sectors}
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
        </Section>
      )}

      {/* Studio Economics */}
      {studioTier.structure && (
        <Section spacing="large" background="transparent" colorTheme={tiersTheme} noPaddingTop={true}>
        <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={tiersTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={tiersTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={tiersTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center" style={{ color: tiersTheme.foreground }}>
                {studioTier.structure.title}
              </h2>

              <div className="space-y-4">
                {studioTier.structure.model.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg flex items-start gap-3"
                    style={{
                      border: `1px solid ${tiersTheme.border}`,
                      backgroundColor: `${tiersTheme.background}80`
                    }}
                  >
                    <span className="text-xl mt-1" style={{ color: tiersTheme.accent }}>✓</span>
                    <span className="text-base" style={{ color: tiersTheme.foreground }}>{point}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Container>
        </Section>
      )}

      {/* CTA */}
      <Section spacing="large" background="accent" colorTheme={getSectionTheme('cta')}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: getSectionTheme('cta').foreground }}>
              Interested in Studio Partnership?
            </h2>
            <p className="text-base sm:text-lg mb-8" style={{ color: getSectionTheme('cta').muted }}>
              Schedule a call to discuss strategic or capital partnership, review governance process, and explore how you can participate in decision-making.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonPrimary href="/contact" size="lg">
                Schedule Partnership Call
              </ButtonPrimary>
              <ButtonSecondary href="/investors" size="lg">
                Compare All Opportunities
              </ButtonSecondary>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
