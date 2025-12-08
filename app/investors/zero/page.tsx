/**
 * Zero Seed Round Investment Details
 *
 * Complete investment case for Zero AI email platform
 * Updated December 2024 with current production-ready status
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { ASCIIUnifiedGrid, GlassCard } from '@/components/visual';
import { investmentContent } from '@/lib/content';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zero Seed Round — Rationale Investment Opportunities',
  description: '$600K for 10% equity in Zero Inbox AI email platform. Production-ready infrastructure, launching Q1 2025.',
};

export default function ZeroInvestmentPage() {
  const zeroTier = investmentContent.tiers.find(t => t.id === 'zero-seed')!;

  const heroTheme = getSectionTheme('hero');
  const tiersTheme = getSectionTheme('featuredWork');
  const comparisonTheme = getSectionTheme('services');

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
                  {zeroTier.status}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: heroTheme.foreground }}>
                {zeroTier.title}
              </h1>
              <p className="text-2xl mb-3" style={{ color: heroTheme.accent }}>{zeroTier.tagline}</p>
              <p className="text-lg font-semibold mb-4" style={{ color: heroTheme.foreground }}>{zeroTier.highlight}</p>
              <p className="text-base leading-relaxed" style={{ color: heroTheme.muted }}>{zeroTier.description}</p>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Key Metrics */}
      {zeroTier.keyMetrics && (
        <Section spacing="large" background="transparent" colorTheme={tiersTheme} noPaddingTop={true}>
          <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={tiersTheme} />
          <ASCIIUnifiedGrid animated={true} colorTheme={tiersTheme} opacity={0.25} />

          <Container className="relative z-20 pt-16 sm:pt-20">
            <div className="max-w-5xl mx-auto">
              <GlassCard theme={tiersTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: tiersTheme.foreground }}>
                  Product Status & Metrics
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {zeroTier.keyMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg p-6 text-center"
                    style={{
                      border: `1px solid ${tiersTheme.border}`,
                      backgroundColor: `${tiersTheme.background}80`
                    }}
                  >
                    <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: tiersTheme.accent }}>
                      {metric.value}
                    </div>
                    <div className="text-sm font-semibold mb-1" style={{ color: tiersTheme.foreground }}>
                      {metric.label}
                    </div>
                    {metric.trend && (
                      <div className="text-xs mb-1" style={{ color: tiersTheme.accent }}>
                        {metric.trend}
                      </div>
                    )}
                    {metric.subtext && (
                      <div className="text-xs" style={{ color: tiersTheme.muted }}>
                        {metric.subtext}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Container>
        </Section>
      )}

      {/* Investment Terms */}
      {zeroTier.investment && (
        <Section spacing="large" background="transparent" colorTheme={comparisonTheme} noPaddingTop={true}>
          <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={comparisonTheme} />
          <ASCIIUnifiedGrid animated={true} colorTheme={comparisonTheme} opacity={0.25} />

          <Container className="relative z-20 pt-16 sm:pt-20">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Investment Details */}
                <GlassCard theme={comparisonTheme} className="p-6 sm:p-8" borderRadius="1rem">
                  <h3 className="text-xl font-bold mb-6" style={{ color: comparisonTheme.foreground }}>
                    Investment Terms
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold mb-1" style={{ color: comparisonTheme.muted }}>
                        Amount
                      </div>
                      <div className="text-2xl font-bold" style={{ color: comparisonTheme.accent }}>
                        {zeroTier.investment.amount}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold mb-1" style={{ color: comparisonTheme.muted }}>
                        Equity
                      </div>
                      <div className="text-2xl font-bold" style={{ color: comparisonTheme.accent }}>
                        {zeroTier.investment.equity}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold mb-1" style={{ color: comparisonTheme.muted }}>
                        Valuation
                      </div>
                      <div className="text-2xl font-bold" style={{ color: comparisonTheme.accent }}>
                        {zeroTier.investment.valuation}
                      </div>
                    </div>

                    <div
                      className="p-4 rounded-lg mt-6"
                      style={{
                        border: `1px solid ${comparisonTheme.border}`,
                        backgroundColor: `${comparisonTheme.background}80`
                      }}
                    >
                      <div className="text-sm font-semibold mb-2" style={{ color: comparisonTheme.foreground }}>
                        Use of Funds
                      </div>
                      <div className="text-sm" style={{ color: comparisonTheme.muted }}>
                        {zeroTier.investment.use}
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Round Status */}
                <GlassCard theme={comparisonTheme} className="p-6 sm:p-8" borderRadius="1rem">
                  <h3 className="text-xl font-bold mb-6" style={{ color: comparisonTheme.foreground }}>
                    {zeroTier.urgency.title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold mb-1" style={{ color: comparisonTheme.muted }}>
                        Committed
                      </div>
                      <div className="text-2xl font-bold" style={{ color: comparisonTheme.accent }}>
                        {zeroTier.urgency.committed}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold mb-1" style={{ color: comparisonTheme.muted }}>
                        Target
                      </div>
                      <div className="text-2xl font-bold" style={{ color: comparisonTheme.accent }}>
                        {zeroTier.urgency.target}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold mb-1" style={{ color: comparisonTheme.muted }}>
                        Remaining
                      </div>
                      <div className="text-2xl font-bold" style={{ color: comparisonTheme.accent }}>
                        {zeroTier.urgency.remaining}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div
                        className="h-3 rounded-full overflow-hidden"
                        style={{
                          backgroundColor: `${comparisonTheme.muted}33`
                        }}
                      >
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            backgroundColor: comparisonTheme.accent,
                            width: '25%' // $150K / $600K
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className="p-4 rounded-lg mt-6"
                      style={{
                        border: `1px solid ${comparisonTheme.accent}4D`,
                        backgroundColor: `${comparisonTheme.accent}0D`
                      }}
                    >
                      <p className="text-sm" style={{ color: comparisonTheme.muted }}>
                        {zeroTier.urgency.note}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Why Invest */}
      {zeroTier.why && (
        <Section spacing="large" background="transparent" colorTheme={heroTheme} noPaddingTop={true}>
          <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={heroTheme} />
          <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} />

          <Container className="relative z-20 pt-16 sm:pt-20">
            <div className="max-w-4xl mx-auto">
              <GlassCard theme={heroTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: heroTheme.foreground }}>
                  Why Invest in Zero?
                </h2>

                <div className="space-y-4">
                  {zeroTier.why.map((reason, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg flex items-start gap-3"
                      style={{
                        border: `1px solid ${heroTheme.border}`,
                        backgroundColor: `${heroTheme.background}80`
                      }}
                    >
                      <span className="text-xl mt-1" style={{ color: heroTheme.accent }}>✓</span>
                      <span className="text-base" style={{ color: heroTheme.foreground }}>{reason}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </Container>
        </Section>
      )}

      {/* Product Details Link */}
      <Section spacing="large" background="transparent" colorTheme={tiersTheme} noPaddingTop={true}>
        <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={tiersTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={tiersTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={tiersTheme} className="p-6 sm:p-8" borderRadius="1.5rem">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3" style={{ color: tiersTheme.foreground }}>
                  Want More Technical Details?
                </h3>
                <p className="text-base mb-6" style={{ color: tiersTheme.muted }}>
                  Review Zero's complete investor portal with technical architecture, business model analysis, and roadmap.
                </p>
                <Link href="/clients/zero/investor">
                  <button
                    className="px-6 py-3 rounded-lg font-medium transition-colors"
                    style={{
                      backgroundColor: tiersTheme.accent,
                      color: tiersTheme.background
                    }}
                  >
                    View Zero Investor Portal →
                  </button>
                </Link>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="large" background="accent" colorTheme={getSectionTheme('cta')}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: getSectionTheme('cta').foreground }}>
              Interested in Zero Seed Round?
            </h2>
            <p className="text-base sm:text-lg mb-8" style={{ color: getSectionTheme('cta').muted }}>
              Schedule a call to discuss the investment opportunity, review complete documentation, and get your questions answered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonPrimary href="/contact" size="lg">
                Schedule Investor Call
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
