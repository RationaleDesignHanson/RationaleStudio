/**
 * Investment Overview Page
 *
 * Three-tier investment opportunities in systematic portfolio building
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { ASCIIWaveDivider, SectionMarker, ASCIIUnifiedGrid, GlassCard } from '@/components/visual';
import { investmentContent } from '@/lib/content';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investment Opportunities — Rationale',
  description: 'Three ways to invest in systematic portfolio building: Zero seed round, portfolio ventures, or studio investment. $900K run rate enables 2-3 ventures per year.',
};

export default function InvestmentPage() {
  const { overview, tiers, comparison, faq } = investmentContent;

  const heroTheme = getSectionTheme('hero');
  const tiersTheme = getSectionTheme('featuredWork');
  const comparisonTheme = getSectionTheme('services');
  const faqTheme = getSectionTheme('founder');

  return (
    <>
      {/* Hero */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme}>
        <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} charSet="default" />
        <Container className="relative z-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={heroTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="text-center">
                <SectionMarker symbol="$" className="justify-center mb-4" color={heroTheme.primary}>
                  <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl lg:text-5xl font-bold text-foreground">
                    {overview.hero.title}
                  </h1>
                </SectionMarker>
                <p className="text-xl text-accent mb-4">{overview.hero.subtitle}</p>
                <p className="text-base text-muted">{overview.hero.description}</p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Dual-Engine Model */}
      <Section spacing="large" background="transparent" colorTheme={tiersTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={tiersTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={tiersTheme} opacity={0.25} charSet="default" />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={tiersTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {overview.model.title}
                </h2>
                <p className="text-lg text-accent mb-4">{overview.model.subtitle}</p>
                <p className="text-sm text-muted">{overview.model.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {overview.model.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-border p-6 text-center bg-background/50"
                  >
                    <div className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-accent mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm font-semibold text-foreground mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xs text-muted">
                      {metric.subtext}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* AI Acceleration */}
      <Section spacing="large" background="transparent" colorTheme={comparisonTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={comparisonTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={comparisonTheme} opacity={0.25} charSet="default" />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={comparisonTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {overview.aiAcceleration.title}
                </h2>
                <p className="text-lg text-muted">{overview.aiAcceleration.subtitle}</p>
              </div>

              <div className="space-y-3">
                {overview.aiAcceleration.points.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-border bg-background/50 text-sm text-foreground"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Portfolio Structure */}
      <Section spacing="large" background="transparent" colorTheme={faqTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={faqTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={faqTheme} opacity={0.25} charSet="default" />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={faqTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {overview.portfolioStructure.title}
                </h2>
                <p className="text-lg text-accent mb-4">{overview.portfolioStructure.subtitle}</p>
                <p className="text-sm text-muted">{overview.portfolioStructure.description}</p>
              </div>

              {/* Holding Company */}
              <div className="mb-8 p-6 rounded-lg border-2 border-accent bg-accent/5 backdrop-blur-sm text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {overview.portfolioStructure.diagram.holdingCompany.name}
                </h3>
                <p className="text-sm text-accent mb-1">{overview.portfolioStructure.diagram.holdingCompany.type}</p>
                <p className="text-xs text-muted mb-2">{overview.portfolioStructure.diagram.holdingCompany.owner}</p>
                <p className="text-xs text-foreground">{overview.portfolioStructure.diagram.holdingCompany.role}</p>
              </div>

              {/* Arrow */}
              <div className="text-center mb-8">
                <div className="text-2xl md:text-3xl lg:text-4xl text-accent">↓</div>
                <p className="text-xs text-muted mt-2">Owns majority stakes in:</p>
              </div>

              {/* Portfolio Companies */}
              <div className="grid md:grid-cols-2 gap-6">
                {overview.portfolioStructure.diagram.portfolioCompanies.map((company, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-lg border border-border bg-background/50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-bold text-foreground">{company.name}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">
                        {company.status}
                      </span>
                    </div>
                    <p className="text-sm text-accent mb-2">{company.ownership}</p>
                    <p className="text-xs text-muted mb-2">{company.stage}</p>
                    <p className="text-xs text-foreground">Investors: {company.investors}</p>
                  </div>
                ))}
              </div>

              {/* Two Investment Paths Explanation */}
              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg border border-accent/30 bg-accent/5 backdrop-blur-sm">
                  <h4 className="text-lg font-bold text-foreground mb-3">Path 1: Zero Direct</h4>
                  <p className="text-sm text-muted mb-3">
                    Invest directly in Zero for concentrated exposure to our live product. You become a Zero shareholder alongside the founder.
                  </p>
                  <p className="text-xs text-accent font-semibold">$600K for 10% Zero equity</p>
                </div>

                <div className="p-6 rounded-lg border border-accent/30 bg-accent/5 backdrop-blur-sm">
                  <h4 className="text-lg font-bold text-foreground mb-3">Path 2: Studio Investment</h4>
                  <p className="text-sm text-muted mb-3">
                    Invest in Rationale for diversified portfolio exposure across Zero, Atlas, Amplify, and future ventures.
                  </p>
                  <p className="text-xs text-accent font-semibold">Flexible terms, portfolio exposure</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Two Investment Paths */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={heroTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} charSet="default" />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Two Investment Paths
              </h2>
              <p className="text-lg text-muted">
                Choose your strategy: concentrated bet on Zero or diversified portfolio exposure
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {tiers.map((tier, idx) => (
                <GlassCard
                  key={tier.id}
                  theme={heroTheme}
                  className="p-6 sm:p-8 flex flex-col"
                  borderRadius="1rem"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent font-medium">
                      {tier.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {tier.title}
                  </h3>
                  <p className="text-lg text-accent mb-3">{tier.tagline}</p>
                  <p className="text-sm font-semibold text-foreground mb-4">{tier.highlight}</p>
                  <p className="text-sm text-muted mb-6 flex-1">{tier.description}</p>

                  <div className="mt-auto">
                    <Link
                      href={tier.cta.href}
                      className="block w-full py-3 px-4 text-center rounded-lg border-2 border-accent bg-accent/10 text-accent font-medium hover:bg-accent hover:text-black transition-all"
                    >
                      {tier.cta.primary}
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Comparison Table */}
      <Section spacing="large" background="transparent" colorTheme={tiersTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={tiersTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={tiersTheme} opacity={0.25} charSet="default" />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={tiersTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center">
                {comparison.title}
              </h2>
              {comparison.description && (
                <p className="text-center text-muted mb-8">{comparison.description}</p>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Path</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Investment</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Risk Profile</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Return</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Timeline</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.options.map((option, idx) => (
                      <tr key={idx} className="border-b border-border/50 hover:bg-accent/5">
                        <td className="py-4 px-4 font-medium text-accent">{option.name}</td>
                        <td className="py-4 px-4 text-muted">{option.investment}</td>
                        <td className="py-4 px-4 text-muted">{option.risk}</td>
                        <td className="py-4 px-4 text-muted">{option.return}</td>
                        <td className="py-4 px-4 text-muted">{option.timeline}</td>
                        <td className="py-4 px-4 text-muted text-xs">{option.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section spacing="large" background="transparent" colorTheme={faqTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={faqTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={faqTheme} opacity={0.25} charSet="default" />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={faqTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faq.map((item, idx) => (
                  <div key={idx} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {item.question}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="large" background="accent" colorTheme={getSectionTheme('cta')}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Participate?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted mb-8">
              Zero seed round is open now. Portfolio ventures are selective. Studio investment opens late 2025/2026.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonPrimary href="/investment/zero" size="lg">
                View Zero Investment Case
              </ButtonPrimary>
              <ButtonSecondary href="/contact" size="lg">
                Schedule Investor Call
              </ButtonSecondary>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
