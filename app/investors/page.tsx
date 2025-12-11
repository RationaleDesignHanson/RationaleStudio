/**
 * Investment Opportunities Overview Page
 *
 * Blended structure combining comprehensive investment information
 * with detailed opportunity cards. Updated December 2024 with current metrics.
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { ASCIIUnifiedGrid, GlassCard } from '@/components/visual';
import { investmentContent } from '@/lib/content';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import DualEngineModel from '@/components/rationale-overview/diagrams/DualEngineModel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investment Opportunities — Rationale',
  description: 'Two ways to invest in systematic portfolio building: Zero seed round or studio investment. $900K run rate enables 2-3 ventures per year.',
};

export default function InvestorsPage() {
  const { overview, tiers, opportunities, comparison, faq } = investmentContent;

  const heroTheme = getSectionTheme('hero');
  const tiersTheme = getSectionTheme('featuredWork');
  const comparisonTheme = getSectionTheme('services');
  const faqTheme = getSectionTheme('founder');

  const getBadgeClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };
    return colorMap[color] || colorMap.green;
  };

  return ( <> {/* Hero */} <Section spacing="large" background="transparent" colorTheme={heroTheme}> <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} /> <Container className="relative z-20"> <div className="max-w-4xl mx-auto"> <GlassCard theme={heroTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem"> <div className="text-center"> <div className="mb-4"> <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl lg:text-5xl font-bold" style={{ color: heroTheme.foreground }}> {overview.hero.title} </h1> </div> <p className="text-xl mb-4" style={{ color: heroTheme.accent }}>{overview.hero.subtitle}</p> <p className="text-base" style={{ color: heroTheme.muted }}>{overview.hero.description}</p> </div> </GlassCard> </div> </Container> </Section> {/* Dual-Engine Model */} <Section spacing="large" background="transparent" colorTheme={tiersTheme} noPaddingTop={true}> <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={tiersTheme} /> <ASCIIUnifiedGrid animated={true} colorTheme={tiersTheme} opacity={0.25} /> <Container className="relative z-20 pt-16 sm:pt-20"> <div className="max-w-5xl mx-auto"> <GlassCard theme={tiersTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem"> <div className="text-center mb-8"> <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: tiersTheme.foreground }}> {overview.model.title} </h2> <p className="text-lg mb-4" style={{ color: tiersTheme.accent }}>{overview.model.subtitle}</p> <p className="text-sm" style={{ color: tiersTheme.muted }}>{overview.model.description}</p> </div> <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"> {overview.model.metrics.map((metric, idx) => ( <div
                    key={idx}
                    className="rounded-lg p-6 text-center"
                    style={{
                      border: `1px solid ${tiersTheme.border}`,
                      backgroundColor: `${tiersTheme.background}80`
                    }}
                  > <div className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{ color: tiersTheme.accent }}> {metric.value} </div> <div className="text-sm font-semibold mb-1" style={{ color: tiersTheme.foreground }}> {metric.label} </div> <div className="text-xs" style={{ color: tiersTheme.muted }}> {metric.subtext} </div> </div> ))} </div>

              {/* Visual Diagram */}
              <div className="mt-12">
                <DualEngineModel />
              </div>

              {/* Link to Full Essay */}
              <div className="mt-8 text-center">
                <Link
                  href="/investors/dual-engine-model"
                  className="inline-flex items-center gap-2 font-medium transition-colors"
                  style={{ color: tiersTheme.accent }}
                >
                  Read the full dual-engine strategy →
                </Link>
              </div>
            </GlassCard> </div> </Container> </Section> {/* AI Acceleration */} <Section spacing="large" background="transparent" colorTheme={comparisonTheme} noPaddingTop={true}> <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={comparisonTheme} /> <ASCIIUnifiedGrid animated={true} colorTheme={comparisonTheme} opacity={0.25} /> <Container className="relative z-20 pt-16 sm:pt-20"> <div className="max-w-4xl mx-auto"> <GlassCard theme={comparisonTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem"> <div className="text-center mb-6"> <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: comparisonTheme.foreground }}> {overview.aiAcceleration.title} </h2> <p className="text-lg" style={{ color: comparisonTheme.muted }}>{overview.aiAcceleration.subtitle}</p> </div> <div className="space-y-3"> {overview.aiAcceleration.points.map((point, idx) => ( <div
                    key={idx}
                    className="p-4 rounded-lg text-sm"
                    style={{
                      border: `1px solid ${comparisonTheme.border}`,
                      backgroundColor: `${comparisonTheme.background}80`,
                      color: comparisonTheme.foreground
                    }}
                  > {point} </div> ))} </div> </GlassCard> </div> </Container> </Section> {/* Portfolio Structure */} <Section spacing="large" background="transparent" colorTheme={faqTheme} noPaddingTop={true}> <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={faqTheme} /> <ASCIIUnifiedGrid animated={true} colorTheme={faqTheme} opacity={0.25} /> <Container className="relative z-20 pt-16 sm:pt-20"> <div className="max-w-5xl mx-auto"> <GlassCard theme={faqTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem"> <div className="text-center mb-8"> <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: faqTheme.foreground }}> {overview.portfolioStructure.title} </h2> <p className="text-lg mb-4" style={{ color: faqTheme.accent }}>{overview.portfolioStructure.subtitle}</p> <p className="text-sm" style={{ color: faqTheme.muted }}>{overview.portfolioStructure.description}</p> </div> {/* Holding Company */} <div
                className="mb-8 p-6 rounded-lg text-center backdrop-blur-sm"
                style={{
                  border: `2px solid ${faqTheme.accent}`,
                  backgroundColor: `${faqTheme.accent}0D`
                }}
              > <h3 className="text-xl font-bold mb-2" style={{ color: faqTheme.foreground }}> {overview.portfolioStructure.diagram.holdingCompany.name} </h3> <p className="text-sm mb-1" style={{ color: faqTheme.accent }}> {overview.portfolioStructure.diagram.holdingCompany.type} </p> <p className="text-xs mb-2" style={{ color: faqTheme.muted }}> {overview.portfolioStructure.diagram.holdingCompany.owner} </p> <p className="text-xs" style={{ color: faqTheme.foreground }}> {overview.portfolioStructure.diagram.holdingCompany.role} </p> </div> {/* Arrow */} <div className="text-center mb-8"> <div className="text-2xl md:text-3xl lg:text-4xl" style={{ color: faqTheme.accent }}>↓</div> <p className="text-xs mt-2" style={{ color: faqTheme.muted }}>Owns majority stakes in:</p> </div> {/* Portfolio Companies */} <div className="grid md:grid-cols-2 gap-6"> {overview.portfolioStructure.diagram.portfolioCompanies.map((company, idx) => ( <div
                    key={idx}
                    className="p-6 rounded-lg"
                    style={{
                      border: `1px solid ${faqTheme.border}`,
                      backgroundColor: `${faqTheme.background}80`
                    }}
                  > <div className="flex items-start justify-between mb-3"> <h4 className="text-lg font-bold" style={{ color: faqTheme.foreground }}>{company.name}</h4> <span
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: `${faqTheme.accent}33`,
                          color: faqTheme.accent
                        }}
                      > {company.status} </span> </div> <p className="text-sm mb-2" style={{ color: faqTheme.accent }}>{company.ownership}</p> <p className="text-xs mb-2" style={{ color: faqTheme.muted }}>{company.stage}</p> <p className="text-xs" style={{ color: faqTheme.foreground }}>Investors: {company.investors}</p> </div> ))} </div> {/* Two Investment Paths Explanation */} <div className="mt-8 grid sm:grid-cols-2 gap-6"> <div
                  className="p-6 rounded-lg backdrop-blur-sm"
                  style={{
                    border: `1px solid ${faqTheme.accent}4D`,
                    backgroundColor: `${faqTheme.accent}0D`
                  }}
                > <h4 className="text-lg font-bold mb-3" style={{ color: faqTheme.foreground }}>Path 1: Zero Direct</h4> <p className="text-sm mb-3" style={{ color: faqTheme.muted }}> Invest directly in Zero for concentrated exposure to our AI email platform launching Q1 2025. You become a Zero shareholder alongside the founder. </p> <p className="text-xs font-semibold" style={{ color: faqTheme.accent }}>$600K for 10% Zero equity</p> </div> <div
                  className="p-6 rounded-lg backdrop-blur-sm"
                  style={{
                    border: `1px solid ${faqTheme.accent}4D`,
                    backgroundColor: `${faqTheme.accent}0D`
                  }}
                > <h4 className="text-lg font-bold mb-3" style={{ color: faqTheme.foreground }}>Path 2: Studio Investment</h4> <p className="text-sm mb-3" style={{ color: faqTheme.muted }}> Invest in Rationale for diversified portfolio exposure across Zero, Atlas, Amplify, and future ventures. </p> <p className="text-xs font-semibold" style={{ color: faqTheme.accent }}>Flexible terms, portfolio exposure</p> </div> </div> </GlassCard> </div> </Container> </Section> {/* Two Investment Paths - Detailed Cards */} <Section spacing="large" background="transparent" colorTheme={heroTheme} noPaddingTop={true}> <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={heroTheme} /> <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} /> <Container className="relative z-20 pt-16 sm:pt-20"> <div className="max-w-5xl mx-auto"> <div className="text-center mb-12"> <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: heroTheme.foreground }}> Two Investment Paths </h2> <p className="text-lg" style={{ color: heroTheme.muted }}> Choose your strategy: concentrated bet on Zero or diversified portfolio exposure </p> </div> <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8"> {tiers.map((tier, idx) => ( <GlassCard
                  key={tier.id}
                  theme={heroTheme}
                  className="p-6 sm:p-8 flex flex-col"
                  borderRadius="1rem"
                > <div className="flex items-start justify-between mb-4"> <span
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: `${heroTheme.accent}33`,
                        color: heroTheme.accent
                      }}
                    > {tier.status} </span> </div> <h3 className="text-2xl font-bold mb-2" style={{ color: heroTheme.foreground }}> {tier.title} </h3> <p className="text-lg mb-3" style={{ color: heroTheme.accent }}>{tier.tagline}</p> <p className="text-sm font-semibold mb-4" style={{ color: heroTheme.foreground }}>{tier.highlight}</p> <p className="text-sm mb-6 flex-1" style={{ color: heroTheme.muted }}>{tier.description}</p> <div className="mt-auto"> <Link
                      href={tier.cta.href}
                      className="block w-full py-3 px-4 text-center rounded-lg font-medium transition-all"
                      style={{
                        border: `2px solid ${heroTheme.accent}`,
                        backgroundColor: `${heroTheme.accent}1A`,
                        color: heroTheme.accent
                      }}
                    > {tier.cta.primary} </Link> </div> </GlassCard> ))} </div> </div> </Container> </Section> {/* Four Opportunities - Detailed View */} <Section spacing="large" background="transparent" colorTheme={tiersTheme} noPaddingTop={true}> <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={tiersTheme} /> <ASCIIUnifiedGrid animated={true} colorTheme={tiersTheme} opacity={0.25} /> <Container className="relative z-20 pt-16 sm:pt-20"> <div className="max-w-6xl mx-auto"> <div className="text-center mb-12"> <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3" style={{ color: tiersTheme.foreground }}> Four Investment Pathways </h2> <p className="text-base" style={{ color: tiersTheme.muted }}> Each opportunity has complete documentation, clear use of funds, and defined success milestones </p> </div> <div className="grid md:grid-cols-2 gap-6"> {opportunities.map((opp, idx) => ( <GlassCard
                  key={idx}
                  theme={tiersTheme}
                  className="p-6 hover:scale-[1.01] transition-transform"
                  borderRadius="1rem"
                > <div className="flex items-start justify-between mb-4"> <p className="text-sm font-medium" style={{ color: tiersTheme.accent }}>{opp.subtitle}</p> <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getBadgeClasses(opp.badgeColor)}`}> {opp.badge} </span> </div> <h3 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ color: tiersTheme.foreground }}> <span>{opp.icon}</span> <span>{opp.title}</span> </h3> <p className="text-sm mb-6" style={{ color: tiersTheme.muted }}> {opp.description} </p> <div className="space-y-2 mb-6"> {opp.highlights.map((highlight, hidx) => ( <div key={hidx} className="flex gap-2 text-sm"> <span style={{ color: tiersTheme.accent }}>•</span> <span style={{ color: tiersTheme.foreground }}>{highlight}</span> </div> ))} </div> <Link href={opp.href}> <button
                      className="w-full px-4 py-3 rounded-lg transition-colors font-medium"
                      style={{
                        backgroundColor: tiersTheme.accent,
                        color: tiersTheme.background
                      }}
                    > Review Opportunity → </button> </Link> </GlassCard> ))} </div> </div> </Container> </Section> {/* Comparison Table */} <Section spacing="large" background="transparent" colorTheme={comparisonTheme} noPaddingTop={true}> <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={comparisonTheme} /> <ASCIIUnifiedGrid animated={true} colorTheme={comparisonTheme} opacity={0.25} /> <Container className="relative z-20 pt-16 sm:pt-20"> <div className="max-w-5xl mx-auto"> <GlassCard theme={comparisonTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem"> <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center" style={{ color: comparisonTheme.foreground }}> {comparison.title} </h2> {comparison.description && ( <p className="text-center mb-8" style={{ color: comparisonTheme.muted }}>{comparison.description}</p> )} <div className="overflow-x-auto"> <table className="w-full text-sm"> <thead> <tr style={{ borderBottom: `1px solid ${comparisonTheme.border}` }}> <th className="text-left py-3 px-4 font-semibold" style={{ color: comparisonTheme.foreground }}>Path</th> <th className="text-left py-3 px-4 font-semibold" style={{ color: comparisonTheme.foreground }}>Investment</th> <th className="text-left py-3 px-4 font-semibold" style={{ color: comparisonTheme.foreground }}>Risk Profile</th> <th className="text-left py-3 px-4 font-semibold" style={{ color: comparisonTheme.foreground }}>Return</th> <th className="text-left py-3 px-4 font-semibold" style={{ color: comparisonTheme.foreground }}>Timeline</th> <th className="text-left py-3 px-4 font-semibold" style={{ color: comparisonTheme.foreground }}>Best For</th> </tr> </thead> <tbody> {comparison.options.map((option, idx) => ( <tr key={idx} style={{ borderBottom: `1px solid ${comparisonTheme.border}80` }}> <td className="py-4 px-4 font-medium" style={{ color: comparisonTheme.accent }}>{option.name}</td> <td className="py-4 px-4" style={{ color: comparisonTheme.muted }}>{option.investment}</td> <td className="py-4 px-4" style={{ color: comparisonTheme.muted }}>{option.risk}</td> <td className="py-4 px-4" style={{ color: comparisonTheme.muted }}>{option.return}</td> <td className="py-4 px-4" style={{ color: comparisonTheme.muted }}>{option.timeline}</td> <td className="py-4 px-4 text-xs" style={{ color: comparisonTheme.muted }}>{option.best}</td> </tr> ))} </tbody> </table> </div> </GlassCard> </div> </Container> </Section> {/* Outbound Strategy */} <Section spacing="large" background="transparent" colorTheme={comparisonTheme} noPaddingTop={true}> <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={comparisonTheme} /> <ASCIIUnifiedGrid animated={true} colorTheme={comparisonTheme} opacity={0.25} /> <Container className="relative z-20 pt-16 sm:pt-20"> <div className="max-w-5xl mx-auto"> <GlassCard theme={comparisonTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem"> <div className="text-center mb-8"> <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: comparisonTheme.foreground }}> Outbound Proactive Model </h2> <p className="text-lg mb-4" style={{ color: comparisonTheme.accent }}> Not waiting for inbound - actively pursuing high-value partnerships </p> <p className="text-sm" style={{ color: comparisonTheme.muted }}> Most studios wait for clients to come to them. We identify companies where our AI and product expertise creates outsized value, then proactively pitch custom solutions. </p> </div> <div className="grid md:grid-cols-3 gap-6"> <div
                  className="p-6 rounded-lg"
                  style={{
                    border: `1px solid ${comparisonTheme.border}`,
                    backgroundColor: `${comparisonTheme.background}80`
                  }}
                > <div className="text-3xl font-bold mb-2" style={{ color: comparisonTheme.accent }}>Target</div> <p className="text-sm mb-3" style={{ color: comparisonTheme.foreground }}>Strategic Identification</p> <p className="text-xs" style={{ color: comparisonTheme.muted }}> Identify companies with AI integration gaps or product velocity problems we can solve </p> </div> <div
                  className="p-6 rounded-lg"
                  style={{
                    border: `1px solid ${comparisonTheme.border}`,
                    backgroundColor: `${comparisonTheme.background}80`
                  }}
                > <div className="text-3xl font-bold mb-2" style={{ color: comparisonTheme.accent }}>Pitch</div> <p className="text-sm mb-3" style={{ color: comparisonTheme.foreground }}>Custom Solutions</p> <p className="text-xs" style={{ color: comparisonTheme.muted }}> Create company-specific pitch decks with tailored solutions, not generic capability statements </p> </div> <div
                  className="p-6 rounded-lg"
                  style={{
                    border: `1px solid ${comparisonTheme.border}`,
                    backgroundColor: `${comparisonTheme.background}80`
                  }}
                > <div className="text-3xl font-bold mb-2" style={{ color: comparisonTheme.accent}}>Partner</div> <p className="text-sm mb-3" style={{ color: comparisonTheme.foreground }}>Aligned Engagements</p> <p className="text-xs" style={{ color: comparisonTheme.muted }}> Structure deals for cash, equity, or both based on opportunity and strategic value </p> </div> </div> <div
                className="mt-8 p-6 rounded-lg"
                style={{
                  border: `1px solid ${comparisonTheme.accent}4D`,
                  backgroundColor: `${comparisonTheme.accent}0D`
                }}
              > <p className="text-sm" style={{ color: comparisonTheme.muted }}> <span className="font-semibold" style={{ color: comparisonTheme.foreground }}>Why this matters to investors:</span> This model creates predictable partnership revenue while building our portfolio companies. We're not dependent on inbound—we control our pipeline. </p> </div> </GlassCard> </div> </Container> </Section> {/* Operational Excellence - Pitch System Showcase */} <Section spacing="large" background="transparent" colorTheme={tiersTheme} noPaddingTop={true}> <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={tiersTheme} /> <ASCIIUnifiedGrid animated={true} colorTheme={tiersTheme} opacity={0.25} /> <Container className="relative z-20 pt-16 sm:pt-20"> <div className="max-w-5xl mx-auto"> <GlassCard theme={tiersTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem"> <div className="text-center mb-8"> <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: tiersTheme.foreground }}> Operational Excellence </h2> <p className="text-lg mb-4" style={{ color: tiersTheme.accent }}> Custom internal tools that demonstrate product sophistication </p> <p className="text-sm" style={{ color: tiersTheme.muted }}> We built a secure pitch delivery system that showcases the kind of technical execution we bring to every project. </p> </div> <div className="grid md:grid-cols-2 gap-6 mb-8"> <div
                  className="p-6 rounded-lg"
                  style={{
                    border: `1px solid ${tiersTheme.border}`,
                    backgroundColor: `${tiersTheme.background}80`
                  }}
                > <h3 className="text-lg font-bold mb-3" style={{ color: tiersTheme.foreground }}> Secure Pitch System </h3> <ul className="space-y-2 text-sm" style={{ color: tiersTheme.muted }}> <li className="flex items-start gap-2"> <span style={{ color: tiersTheme.accent }}>→</span> <span>Time-limited access with automatic expiration</span> </li> <li className="flex items-start gap-2"> <span style={{ color: tiersTheme.accent }}>→</span> <span>Username gates for confidential content</span> </li> <li className="flex items-start gap-2"> <span style={{ color: tiersTheme.accent }}>→</span> <span>IP tracking and instant revocation</span> </li> <li className="flex items-start gap-2"> <span style={{ color: tiersTheme.accent }}>→</span> <span>Analytics dashboard for engagement tracking</span> </li> </ul> </div> <div
                  className="p-6 rounded-lg"
                  style={{
                    border: `1px solid ${tiersTheme.border}`,
                    backgroundColor: `${tiersTheme.background}80`
                  }}
                > <h3 className="text-lg font-bold mb-3" style={{ color: tiersTheme.foreground }}> Why It Matters </h3> <p className="text-sm mb-4" style={{ color: tiersTheme.muted }}> This is how we work: identify a need, build a solution, ship it in days. The pitch system went from concept to production in 4 days—demonstrating the velocity we bring to every engagement. </p> <p className="text-xs font-semibold" style={{ color: tiersTheme.accent }}> Same approach we use for Zero, Atlas, and Amplify </p> </div> </div> <div
                className="p-6 rounded-lg"
                style={{
                  border: `1px solid ${tiersTheme.accent}4D`,
                  backgroundColor: `${tiersTheme.accent}0D`
                }}
              > <p className="text-sm" style={{ color: tiersTheme.muted }}> <span className="font-semibold" style={{ color: tiersTheme.foreground }}>For investors:</span> This operational sophistication extends to everything—our portfolio tracking, analytics dashboards, and internal tools. You're investing in a studio that builds product-grade infrastructure for its own operations. </p> </div> </GlassCard> </div> </Container> </Section> {/* FAQ */} <Section spacing="large" background="transparent" colorTheme={faqTheme} noPaddingTop={true}> <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={faqTheme} /> <ASCIIUnifiedGrid animated={true} colorTheme={faqTheme} opacity={0.25} /> <Container className="relative z-20 pt-16 sm:pt-20"> <div className="max-w-4xl mx-auto"> <GlassCard theme={faqTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem"> <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: faqTheme.foreground }}> Frequently Asked Questions </h2> <div className="space-y-6"> {faq.map((item, idx) => ( <div
                    key={idx}
                    className="pb-6 last:border-0 last:pb-0"
                    style={{ borderBottom: `1px solid ${faqTheme.border}80` }}
                  > <h3 className="text-lg font-semibold mb-3" style={{ color: faqTheme.foreground }}> {item.question} </h3> <p className="text-sm leading-relaxed" style={{ color: faqTheme.muted }}> {item.answer} </p> </div> ))} </div> </GlassCard> </div> </Container> </Section> {/* CTA */} <Section spacing="large" background="accent" colorTheme={getSectionTheme('cta')}> <Container> <div className="max-w-3xl mx-auto text-center"> <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl lg:text-5xl font-bold mb-6" style={{ color: getSectionTheme('cta').foreground }}> Ready to Participate? </h2> <p className="text-base sm:text-lg lg:text-xl mb-8" style={{ color: getSectionTheme('cta').muted }}> Zero seed round is open now. Studio investment has flexible entry points for strategic and capital partners. </p> <div className="flex flex-col sm:flex-row gap-4 justify-center"> <ButtonPrimary href="/investors/zero" size="lg"> View Zero Investment Case </ButtonPrimary> <ButtonSecondary href="/contact" size="lg"> Schedule Investor Call </ButtonSecondary> </div> </div> </Container> </Section> </> );
}
