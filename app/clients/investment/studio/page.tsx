/**
 * Studio Investment Waitlist Page
 *
 * Future investment opportunity - diversified portfolio exposure
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { ASCIIWaveDivider, SectionMarker, ASCIIUnifiedGrid, GlassCard } from '@/components/visual';
import { investmentContent } from '@/lib/content';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio Investment — Rationale Equity — Rationale',
  description: 'Invest in Rationale (holding company) for portfolio exposure across Zero, Atlas, Amplify, and future ventures. Partners help decide which bets we make. Flexible entry points: strategic partner, capital partner, or future fund.',
};

export default function StudioInvestmentPage() {
  const studioTier = investmentContent.tiers.find(t => t.id === 'studio-investment');

  const heroTheme = getSectionTheme('hero');
  const visionTheme = getSectionTheme('philosophy');
  const economicsTheme = getSectionTheme('process');
  const timelineTheme = getSectionTheme('services');

  return (
    <>
      {/* Hero */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme}>
        <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} />
        <Container className="relative z-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={heroTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent mb-4">
                  {studioTier?.status}
                </span>
                <SectionMarker symbol="⬢" className="justify-center mb-4" color={heroTheme.primary}>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                    {studioTier?.title}
                  </h1>
                </SectionMarker>
                <p className="text-xl text-accent mb-4">{studioTier?.tagline}</p>
                <p className="text-base font-semibold text-foreground mb-3">{studioTier?.highlight}</p>
                <p className="text-base text-muted">{studioTier?.description}</p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Entry Points */}
      <Section spacing="large" background="transparent" colorTheme={visionTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={visionTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={visionTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={visionTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center">
                {studioTier?.entryPoints?.title}
              </h2>
              <p className="text-center text-muted mb-8">{studioTier?.entryPoints?.description}</p>

              <div className="space-y-6">
                {studioTier?.entryPoints?.options.map((option, idx) => (
                  <div key={idx} className="p-6 rounded-lg border border-border bg-background/50">
                    <h3 className="text-lg font-semibold text-accent mb-3">{option.type}</h3>
                    <p className="text-sm text-foreground mb-4">{option.description}</p>

                    <div className="grid sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="font-semibold text-foreground">Ideal For:</span>
                        <p className="text-muted mt-1">{option.ideal}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">Involvement:</span>
                        <p className="text-muted mt-1">{option.involvement}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">Equity:</span>
                        <p className="text-muted mt-1">{option.equity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Governance */}
      <Section spacing="large" background="transparent" colorTheme={timelineTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={timelineTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={timelineTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={timelineTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {studioTier?.governance?.title}
                </h2>
                <p className="text-lg text-accent mb-4">{studioTier?.governance?.subtitle}</p>
                <p className="text-sm text-muted">{studioTier?.governance?.description}</p>
              </div>

              {/* Process */}
              <div className="space-y-4 mb-8">
                {studioTier?.governance?.process.map((step, idx) => (
                  <div key={idx} className="p-6 rounded-lg border border-border bg-background/50">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent font-bold">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{step.phase}</h3>
                        <p className="text-sm text-muted mb-2">{step.description}</p>
                        <p className="text-xs text-accent font-medium">{step.timeline}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strategic Partner Rights */}
              <div className="p-6 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-sm mb-8">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {studioTier?.governance?.rights?.title}
                </h3>
                <ul className="space-y-2">
                  {studioTier?.governance?.rights?.items.map((right, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted">
                      <span className="text-accent mt-0.5">→</span>
                      <span>{right}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Example */}
              <div className="p-6 rounded-lg border border-border bg-background/50">
                <h3 className="text-lg font-bold text-accent mb-3">
                  {studioTier?.governance?.example?.title}
                </h3>
                <p className="text-sm text-muted">
                  {studioTier?.governance?.example?.scenario}
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Current Portfolio */}
      <Section spacing="large" background="transparent" colorTheme={economicsTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={economicsTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={economicsTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={economicsTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center">
                {studioTier?.portfolio?.title}
              </h2>
              <p className="text-center text-muted mb-8">{studioTier?.portfolio?.description}</p>

              <div className="space-y-6">
                {studioTier?.portfolio?.ventures.map((venture, idx) => (
                  <div key={idx} className="p-6 rounded-lg border border-accent/20 bg-background/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{venture.name}</h3>
                        <p className="text-sm text-accent">{venture.market}</p>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent font-medium">
                        {venture.stage}
                      </span>
                    </div>
                    <p className="text-sm text-muted mb-3">{venture.status}</p>
                    <p className="text-xs text-foreground font-medium">{venture.ownership}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Portfolio Vision */}
      <Section spacing="large" background="transparent" colorTheme={timelineTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={timelineTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={timelineTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={timelineTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center">
                {studioTier?.vision?.title}
              </h2>
              <p className="text-center text-muted mb-8">{studioTier?.vision?.description}</p>

              <div className="space-y-4 mb-8">
                {studioTier?.vision?.timeline.map((milestone, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-4 rounded-lg border border-border bg-background/50">
                    <div className="flex-shrink-0 w-24 text-center">
                      <div className="text-sm font-semibold text-accent">{milestone.year}</div>
                      <div className="text-xs text-muted mt-1">{milestone.count} total</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-foreground">{milestone.ventures}</div>
                    </div>
                    <div className="flex-shrink-0 w-16 text-right">
                      <div className="text-2xl font-bold text-accent">{milestone.count}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-sm text-center">
                <p className="text-sm text-foreground mb-2">
                  <span className="font-bold text-accent">Target Sectors:</span>
                </p>
                <p className="text-xs text-muted">
                  {studioTier?.vision?.sectors}
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Studio Economics */}
      <Section spacing="large" background="transparent" colorTheme={economicsTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={economicsTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={economicsTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={economicsTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                {studioTier?.structure?.title}
              </h2>

              <div className="space-y-4">
                {studioTier?.structure?.model.map((point, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-border bg-background/50 flex items-start gap-3">
                    <span className="text-accent text-xl mt-0.5">→</span>
                    <span className="text-sm text-foreground">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid sm:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-accent mb-2">2-3</div>
                  <div className="text-sm font-semibold text-foreground mb-1">Ventures/Year</div>
                  <div className="text-xs text-muted">Systematic launch rate</div>
                </div>

                <div className="text-center p-6 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-accent mb-2">50-80%</div>
                  <div className="text-sm font-semibold text-foreground mb-1">Equity Retained</div>
                  <div className="text-xs text-muted">Majority ownership model</div>
                </div>

                <div className="text-center p-6 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-accent mb-2">$50-500M</div>
                  <div className="text-sm font-semibold text-foreground mb-1">Portfolio Value</div>
                  <div className="text-xs text-muted">10 ventures × exits</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>


      {/* CTA */}
      <Section spacing="large" background="accent" colorTheme={getSectionTheme('cta')}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Become a Studio Partner
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted mb-8">
              We're seeking strategic partners who bring more than capital—partners who help us decide which bets to make and accelerate execution through domain expertise, distribution, and relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonPrimary href="/contact" size="lg">
                Discuss Studio Partnership
              </ButtonPrimary>
              <ButtonSecondary href="/investment/zero" size="lg">
                Or Invest Directly in Zero
              </ButtonSecondary>
            </div>
            <p className="text-sm text-muted mt-6">
              Prefer concentrated exposure? <Link href="/investment/zero" className="text-accent hover:underline">Zero seed round ($600K for 10%)</Link> offers direct equity in our live product.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
