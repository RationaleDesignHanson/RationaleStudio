/**
 * Zero Seed Round Investment Case
 *
 * Comprehensive investment case for Zero Inbox seed round
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { ASCIIWaveDivider, SectionMarker, ASCIIUnifiedGrid, GlassCard } from '@/components/visual';
import { getVentureBySlug, investmentContent } from '@/lib/content';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zero Seed Round — $600K for 10% Equity — Rationale',
  description: 'Live AI email triage product with 37K users and $4K MRR. Direct investment opportunity with clear path to $50K MRR and liquidity within 24-36 months.',
};

export default function ZeroInvestmentPage() {
  const zero = getVentureBySlug('zero');
  const zeroTier = investmentContent.tiers.find(t => t.id === 'zero-seed');

  const heroTheme = getSectionTheme('hero');
  const tractionTheme = getSectionTheme('featuredWork');
  const technicalTheme = getSectionTheme('services');
  const financialsTheme = getSectionTheme('process');
  const roadmapTheme = getSectionTheme('philosophy');
  const riskTheme = getSectionTheme('founder');

  return (
    <>
      {/* Hero */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme}>
        <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} />
        <Container className="relative z-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={heroTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 mb-4">
                    OPEN FOR INVESTMENT
                  </span>
                  <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                    Zero Seed Round
                  </h1>
                  <p className="text-2xl text-accent mb-4">$600K for 10% Equity</p>
                  <p className="text-base text-muted mb-6">
                    Live AI email triage product with real traction. Direct equity in a revenue-generating iOS app with clear path to profitability.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <ButtonPrimary href="/contact" size="lg">
                      Schedule Investor Call
                    </ButtonPrimary>
                    <ButtonSecondary href="/ventures/zero" size="lg">
                      View Full Product Details
                    </ButtonSecondary>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-border bg-background/50 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">37K</div>
                    <div className="text-xs text-muted">Active Users</div>
                    <div className="text-xs text-green-400 mt-1">+40% monthly</div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-background/50 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">$4K</div>
                    <div className="text-xs text-muted">Monthly Revenue</div>
                    <div className="text-xs text-green-400 mt-1">Growing</div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-background/50 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">LIVE</div>
                    <div className="text-xs text-muted">iOS App Store</div>
                    <div className="text-xs text-muted mt-1">Production</div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-background/50 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">24-36</div>
                    <div className="text-xs text-muted">Months to Exit</div>
                    <div className="text-xs text-muted mt-1">Target</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Investment Terms */}
      <Section spacing="large" background="transparent" colorTheme={tractionTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={tractionTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={tractionTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={tractionTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                Investment Terms
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-lg border border-border bg-background/50">
                  <h3 className="text-lg font-semibold text-accent mb-4">Deal Structure</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Amount Raising:</span>
                      <span className="font-semibold text-foreground">$600,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Equity Offered:</span>
                      <span className="font-semibold text-foreground">10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Post-Money Valuation:</span>
                      <span className="font-semibold text-foreground">$6,000,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Structure:</span>
                      <span className="font-semibold text-foreground">SAFE or Equity</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg border border-border bg-background/50">
                  <h3 className="text-lg font-semibold text-accent mb-4">Use of Funds</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Product Development:</span>
                      <span className="font-semibold text-foreground">$250K (42%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Growth & Marketing:</span>
                      <span className="font-semibold text-foreground">$200K (33%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Infrastructure:</span>
                      <span className="font-semibold text-foreground">$100K (17%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Operations & Legal:</span>
                      <span className="font-semibold text-foreground">$50K (8%)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-sm text-center">
                <p className="text-sm text-foreground">
                  <span className="font-bold text-accent">18-month runway to $50K MRR.</span>
                  {' '}No hiring required. Solo founder model means every dollar goes to product and growth.
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Round Status / Urgency */}
      <Section spacing="large" background="transparent" colorTheme={getSectionTheme('cta')} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={getSectionTheme('cta')} />
        <ASCIIUnifiedGrid animated={true} colorTheme={getSectionTheme('cta')} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={getSectionTheme('cta')} className="p-6 sm:p-8 lg:p-10" borderRadius="1.5rem">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {zeroTier?.urgency?.title}
                </h2>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Committed</span>
                  <span className="text-accent font-bold">{zeroTier?.urgency?.committed} / {zeroTier?.urgency?.target}</span>
                </div>
                <div className="w-full h-4 bg-background/50 rounded-full overflow-hidden border border-border">
                  <div
                    className="h-full bg-gradient-to-r from-accent/80 to-accent"
                    style={{ width: '25%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-muted">{zeroTier?.urgency?.remaining} remaining</span>
                  <span className="text-muted">{zeroTier?.urgency?.remaining}</span>
                </div>
              </div>

              {/* Note */}
              <div className="p-6 rounded-lg border-2 border-accent bg-accent/10 backdrop-blur-sm text-center">
                <p className="text-base text-foreground font-semibold">
                  {zeroTier?.urgency?.note}
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Traction & Metrics */}
      <Section spacing="large" background="transparent" colorTheme={technicalTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={technicalTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={technicalTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={technicalTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                Current Traction
              </h2>

              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 rounded-lg border border-border bg-background/50">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent mb-2">37,000</div>
                  <div className="text-sm font-semibold text-foreground mb-1">Active Users</div>
                  <div className="text-xs text-green-400">+40% monthly growth</div>
                  <div className="text-xs text-muted mt-2">Organic acquisition</div>
                </div>

                <div className="text-center p-6 rounded-lg border border-border bg-background/50">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent mb-2">$4,000</div>
                  <div className="text-sm font-semibold text-foreground mb-1">Monthly Revenue</div>
                  <div className="text-xs text-green-400">$48K ARR</div>
                  <div className="text-xs text-muted mt-2">Pre-marketing</div>
                </div>

                <div className="text-center p-6 rounded-lg border border-border bg-background/50">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent mb-2">10</div>
                  <div className="text-sm font-semibold text-foreground mb-1">Microservices</div>
                  <div className="text-xs text-accent">Production-ready</div>
                  <div className="text-xs text-muted mt-2">Meta-grade architecture</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border bg-background/50">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Product Status</h3>
                  <ul className="text-xs text-muted space-y-1">
                    <li>→ Live on iOS App Store (production)</li>
                    <li>→ 182 Swift files, 10 microservices, full AI/ML pipeline</li>
                    <li>→ 7 working prototypes built during development</li>
                    <li>→ Complete technical documentation (116KB+)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-border bg-background/50">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Market Validation</h3>
                  <ul className="text-xs text-muted space-y-1">
                    <li>→ 40% monthly user growth (organic, no marketing spend)</li>
                    <li>→ Revenue from day 1 (users pay for AI email intelligence)</li>
                    <li>→ Competing against Superhuman ($33M raised) and SaneBox</li>
                    <li>→ Built for 100x less capital than competitors</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Financial Projections */}
      <Section spacing="large" background="transparent" colorTheme={financialsTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={financialsTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={financialsTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={financialsTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                18-Month Growth Plan
              </h2>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Milestone</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Users</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">MRR</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">ARR</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Key Focus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium text-accent">Today</td>
                      <td className="py-4 px-4 text-muted">37,000</td>
                      <td className="py-4 px-4 text-muted">$4,000</td>
                      <td className="py-4 px-4 text-muted">$48K</td>
                      <td className="py-4 px-4 text-xs text-muted">Organic growth</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium text-accent">Month 6</td>
                      <td className="py-4 px-4 text-muted">100,000</td>
                      <td className="py-4 px-4 text-muted">$15,000</td>
                      <td className="py-4 px-4 text-muted">$180K</td>
                      <td className="py-4 px-4 text-xs text-muted">Android launch + marketing</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium text-accent">Month 12</td>
                      <td className="py-4 px-4 text-muted">250,000</td>
                      <td className="py-4 px-4 text-muted">$30,000</td>
                      <td className="py-4 px-4 text-muted">$360K</td>
                      <td className="py-4 px-4 text-xs text-muted">Team features + enterprise</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-accent/5">
                      <td className="py-4 px-4 font-bold text-accent">Month 18</td>
                      <td className="py-4 px-4 font-semibold text-foreground">500,000</td>
                      <td className="py-4 px-4 font-semibold text-foreground">$50,000</td>
                      <td className="py-4 px-4 font-semibold text-foreground">$600K</td>
                      <td className="py-4 px-4 text-xs font-semibold text-accent">Profitable, exit-ready</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-sm text-center">
                  <div className="text-3xl font-bold text-accent mb-2">$50K</div>
                  <div className="text-sm font-semibold text-foreground mb-1">MRR Target</div>
                  <div className="text-xs text-muted">$600K ARR = Profitable</div>
                </div>

                <div className="p-6 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-sm text-center">
                  <div className="text-3xl font-bold text-accent mb-2">12.5x</div>
                  <div className="text-sm font-semibold text-foreground mb-1">Revenue Growth</div>
                  <div className="text-xs text-muted">$4K → $50K MRR</div>
                </div>

                <div className="p-6 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-sm text-center">
                  <div className="text-3xl font-bold text-accent mb-2">13.5x</div>
                  <div className="text-sm font-semibold text-foreground mb-1">User Growth</div>
                  <div className="text-xs text-muted">37K → 500K users</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Roadmap */}
      <Section spacing="large" background="transparent" colorTheme={roadmapTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={roadmapTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={roadmapTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={roadmapTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                Product Roadmap
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-accent pl-6 py-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Q1 2025: Platform Expansion</h3>
                  <ul className="text-sm text-muted space-y-1">
                    <li>• Android app launch (access 2.5B Android users)</li>
                    <li>• Web app for desktop power users</li>
                    <li>• Enhanced AI models (faster, more accurate)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-accent/60 pl-6 py-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Q2 2025: Team Features</h3>
                  <ul className="text-sm text-muted space-y-1">
                    <li>• Shared inbox intelligence for teams</li>
                    <li>• Delegation workflows</li>
                    <li>• Analytics dashboard</li>
                  </ul>
                </div>

                <div className="border-l-4 border-accent/40 pl-6 py-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Q3-Q4 2025: Enterprise</h3>
                  <ul className="text-sm text-muted space-y-1">
                    <li>• SSO and enterprise auth</li>
                    <li>• Company-wide intelligence</li>
                    <li>• Premium support tiers</li>
                  </ul>
                </div>

                <div className="border-l-4 border-accent/20 pl-6 py-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">2026: Scale & Exit</h3>
                  <ul className="text-sm text-muted space-y-1">
                    <li>• $50K+ MRR achieved</li>
                    <li>• Profitable operations</li>
                    <li>• Strategic acquisition or continue growth</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Exit Strategy */}
      <Section spacing="large" background="transparent" colorTheme={riskTheme} noPaddingTop={true}>
        <ASCIIWaveDivider opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={riskTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={riskTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={riskTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Exit Strategy</h2>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-border bg-background/50">
                      <h3 className="text-sm font-semibold text-accent mb-2">Primary: Strategic Acquisition</h3>
                      <p className="text-xs text-muted">
                        Email/productivity companies (Superhuman, Shortwave, Gmail team, Outlook team) acquire for technology and user base. Target: 24-36 months at $50K+ MRR.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-background/50">
                      <h3 className="text-sm font-semibold text-accent mb-2">Secondary: Continued Growth</h3>
                      <p className="text-xs text-muted">
                        If no acquisition, continue growing to $100K+ MRR as profitable standalone business. Revenue-based distributions to shareholders.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-background/50">
                      <h3 className="text-sm font-semibold text-accent mb-2">Tertiary: Consolidation</h3>
                      <p className="text-xs text-muted">
                        Roll Zero into larger Rationale portfolio for bundled sale. Increases enterprise value of studio acquisition.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Risk Factors</h2>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                      <h3 className="text-sm font-semibold text-foreground mb-2">Solo Founder Risk</h3>
                      <p className="text-xs text-muted">
                        Single point of failure. Mitigated by: complete documentation, systematic processes, potential advisory board.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                      <h3 className="text-sm font-semibold text-foreground mb-2">Competition</h3>
                      <p className="text-xs text-muted">
                        Superhuman ($33M raised), SaneBox, and Gmail's AI features. Mitigated by: unique architecture, AI sophistication, 100x capital efficiency.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                      <h3 className="text-sm font-semibold text-foreground mb-2">Platform Dependency</h3>
                      <p className="text-xs text-muted">
                        iOS-first creates App Store dependency. Mitigated by: Android + Web expansion in Q1 2025, diversified distribution.
                      </p>
                    </div>
                  </div>
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
            <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Invest in Zero
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted mb-8">
              $600K seed round for 10% equity. Live product with real traction and clear path to $50K MRR within 18 months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonPrimary href="/contact" size="lg">
                Schedule Investor Call
              </ButtonPrimary>
              <ButtonSecondary href="/ventures/zero" size="lg">
                View Full Product Details
              </ButtonSecondary>
            </div>
            <p className="text-sm text-muted mt-6">
              Want to learn more? <Link href="/investment" className="text-accent hover:underline">View all investment options</Link> or <Link href="/founder" className="text-accent hover:underline">meet the founder</Link>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
