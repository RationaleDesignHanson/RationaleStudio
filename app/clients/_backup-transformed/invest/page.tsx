/**
 * Investment Opportunities Hub Page - Window Shrine Design
 *
 * Multi-opportunity investment structure across different risk profiles.
 * Four pathways: Studio, Zero, Atlas, Amplify
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';

export default function InvestPage() {
  const opportunities = [
    {
      title: 'Rationale Studio',
      subtitle: '$500K SAFE · 18-24 Month Runway',
      description: 'Back the systematic venture creation engine. Dual-engine model: Rationale Kits (80% revenue) + Portfolio IP (appreciation over time). Lowest risk, diversified across sectors.',
      highlights: [
        'Founder: Ex-Meta Reality Labs (7 years), FUBO VP',
        'Model: Kits fund Portfolio exploration',
        'Outcome: 2-3 ventures/year, 1-2 commercialized in 12-18 months',
      ],
      href: '/invest/studio',
      badge: 'Lowest Risk',
      badgeColor: 'green',
      icon: '🏢',
    },
    {
      title: 'Zero',
      subtitle: '$600K Seed Round · Live Product',
      description: 'AI email intelligence for busy parents. Live on App Store, active beta rollout. Product-market fit phase with structured traction milestones.',
      highlights: [
        'Status: Live product, beta testing',
        'Market: $12B+ productivity software TAM',
        'Traction: Week 8 milestone approaching (75+ users)',
        'Economics: 6:1 LTV:CAC ratio',
      ],
      href: '/invest/zero',
      badge: 'Live Product',
      badgeColor: 'blue',
      icon: '📧',
    },
    {
      title: 'Project Atlas',
      subtitle: 'Partnership + Capital Opportunity',
      description: 'CRE intelligence platform with complete 12-week roadmap. Seeking strategic partner with industry distribution + execution capital.',
      highlights: [
        'Documentation: 103KB complete technical architecture',
        'Market: Commercial real estate brokerages',
        'Budget: $165K recommended for full MVP',
        'Timeline: 12 weeks to production-ready',
      ],
      href: '/invest/atlas',
      badge: 'Pre-Build',
      badgeColor: 'yellow',
      icon: '🏢',
    },
    {
      title: 'Project Amplify',
      subtitle: 'Partnership + Capital Opportunity',
      description: 'NIL + recruiting platform for sports agents. Complete 16-week roadmap with 4 integrated modules. Seeking agency partner network + capital.',
      highlights: [
        'Documentation: 129KB complete blueprint',
        'Market: Sports agencies, athlete management',
        'Budget: $60-80K pilot, $200-250K full platform',
        'Timeline: 16 weeks to MVP',
      ],
      href: '/invest/amplify',
      badge: 'Pre-Build',
      badgeColor: 'yellow',
      icon: '🏈',
    },
  ];

  const getBadgeClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4 text-center animate-fade-in-up">
            MULTIPLE INVESTMENT PATHWAYS
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center animate-fade-in-up delay-100">
            Investment Opportunities
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto text-center mb-8 animate-fade-in-up delay-200">
            Rationale offers four investment opportunities across different risk profiles and business sectors. Invest in the studio, a live product, or pre-build venture opportunities with complete roadmaps.
          </p>

          <div className="max-w-3xl mx-auto p-6 rounded-lg border border-[#FFD700]/20 bg-black/40 text-center animate-fade-in-up delay-300">
            <p className="text-sm text-gray-100">
              <span className="font-bold text-[#FFD700]">Choose based on your investment thesis:</span>
              {' '}Diversified studio bet, single-product traction, or sector-specific pre-build opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              💰 Four Investment Pathways
            </h2>
            <p className="text-base text-gray-300">
              Each opportunity has complete documentation, clear use of funds, and defined success milestones
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {opportunities.map((opp, idx) => (
              <OS8Window
                key={idx}
                title={`${opp.icon} ${opp.title}`}
                variant="interactive"
                animateIn={false}
                className="hover:scale-[1.01] transition-transform"
              >
                <div className="flex items-start justify-between mb-4">
                  <p className="text-sm text-[#FFD700] font-medium">{opp.subtitle}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getBadgeClasses(opp.badgeColor)}`}>
                    {opp.badge}
                  </span>
                </div>

                <p className="text-sm text-gray-100 mb-6">
                  {opp.description}
                </p>

                <div className="space-y-2 mb-6">
                  {opp.highlights.map((highlight, hidx) => (
                    <div key={hidx} className="flex gap-2 text-sm">
                      <span className="text-[#FFD700]">•</span>
                      <span className="text-gray-100">{highlight}</span>
                    </div>
                  ))}
                </div>

                <Link href={opp.href}>
                  <button className="w-full px-4 py-3 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFD700]/90 transition-colors font-medium">
                    Review Opportunity →
                  </button>
                </Link>
              </OS8Window>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Opportunity Comparison
          </h2>

          <OS8Window
            title="Side-by-Side Comparison"
            variant="body"
            animateIn={false}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#FFD700]/20">
                    <th className="text-left p-3 font-semibold text-white">Opportunity</th>
                    <th className="text-left p-3 font-semibold text-white">Type</th>
                    <th className="text-left p-3 font-semibold text-white">Amount</th>
                    <th className="text-left p-3 font-semibold text-white">Risk Profile</th>
                    <th className="text-left p-3 font-semibold text-white">Timeline</th>
                    <th className="text-left p-3 font-semibold text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#FFD700]/10">
                    <td className="p-3 font-medium text-white">Studio</td>
                    <td className="p-3 text-gray-300">SAFE</td>
                    <td className="p-3 text-[#FFD700] font-semibold">$500K</td>
                    <td className="p-3 text-green-400">Lowest</td>
                    <td className="p-3 text-gray-300">18-24 months</td>
                    <td className="p-3 text-gray-300">Systematic creation</td>
                  </tr>
                  <tr className="border-b border-[#FFD700]/10">
                    <td className="p-3 font-medium text-white">Zero</td>
                    <td className="p-3 text-gray-300">Seed</td>
                    <td className="p-3 text-[#FFD700] font-semibold">$600K</td>
                    <td className="p-3 text-blue-400">Medium</td>
                    <td className="p-3 text-gray-300">18 months</td>
                    <td className="p-3 text-gray-300">Live product</td>
                  </tr>
                  <tr className="border-b border-[#FFD700]/10">
                    <td className="p-3 font-medium text-white">Atlas</td>
                    <td className="p-3 text-gray-300">Partnership</td>
                    <td className="p-3 text-[#FFD700] font-semibold">$165K</td>
                    <td className="p-3 text-yellow-400">Higher</td>
                    <td className="p-3 text-gray-300">12 weeks</td>
                    <td className="p-3 text-gray-300">Pre-build</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Amplify</td>
                    <td className="p-3 text-gray-300">Partnership</td>
                    <td className="p-3 text-[#FFD700] font-semibold">$60-250K</td>
                    <td className="p-3 text-yellow-400">Higher</td>
                    <td className="p-3 text-gray-300">16 weeks</td>
                    <td className="p-3 text-gray-300">Pre-build</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </OS8Window>

          <div className="mt-8 p-6 rounded-lg border border-[#FFD700]/20 bg-black/40 text-center">
            <p className="text-sm text-gray-100">
              <span className="font-bold text-[#FFD700]">All opportunities include:</span>
              {' '}Complete data room access with financial models, technical documentation, term sheets, and founder background verification.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Which Investment Suits You?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <OS8Window
              title="💎 Studio Investment"
              variant="body"
              animateIn={false}
            >
              <p className="text-sm text-gray-100 mb-4">
                Best for investors seeking diversified portfolio exposure with
                downside protection from Kits revenue.
              </p>
              <div className="space-y-2 mb-6">
                <div className="text-sm text-gray-100">
                  <span className="font-semibold text-[#FFD700]">Profile:</span> Family offices,
                  strategic corporates, fund-of-funds
                </div>
                <div className="text-sm text-gray-100">
                  <span className="font-semibold text-[#FFD700]">Returns:</span> 3-5x blended
                  portfolio multiple target
                </div>
                <div className="text-sm text-gray-100">
                  <span className="font-semibold text-[#FFD700]">Risk:</span> Diversified across
                  3+ ventures + revenue engine
                </div>
              </div>
              <Link href="/invest/studio" className="text-[#FFD700] hover:underline text-sm font-medium">
                Learn More →
              </Link>
            </OS8Window>

            <OS8Window
              title="📧 Direct Venture Investment"
              variant="body"
              animateIn={false}
            >
              <p className="text-sm text-gray-100 mb-4">
                Best for investors with specific sector thesis and desire for
                concentrated ownership stakes.
              </p>
              <div className="space-y-2 mb-6">
                <div className="text-sm text-gray-100">
                  <span className="font-semibold text-[#FFD700]">Profile:</span> Angels,
                  VCs, strategic investors in specific sectors
                </div>
                <div className="text-sm text-gray-100">
                  <span className="font-semibold text-[#FFD700]">Returns:</span> 10x+ venture
                  outcome target
                </div>
                <div className="text-sm text-gray-100">
                  <span className="font-semibold text-[#FFD700]">Risk:</span> Single product/market
                  bet, higher variance
                </div>
              </div>
              <Link href="/invest/zero" className="text-[#FFD700] hover:underline text-sm font-medium">
                View Zero Opportunity →
              </Link>
            </OS8Window>
          </div>

          <div className="mt-8 p-6 rounded-lg border border-[#FFD700]/20 bg-black/40 text-center">
            <p className="text-sm text-gray-100">
              <span className="font-bold text-[#FFD700]">Both investment types available.</span>
              {' '}Studio investors benefit from portfolio diversification. Direct investors
              get higher ownership concentration in proven products.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.12}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title="Ready to Review an Opportunity?"
            variant="cta"
            animateIn={false}
            className="max-w-3xl"
          >
            <div className="space-y-6">
              <p className="text-base text-[#FFD700] leading-relaxed text-center">
                Each opportunity page includes public information and password-protected data room access for qualified investors.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <ButtonPrimary href="/invest/studio" size="lg">
                  Review Studio Opportunity
                </ButtonPrimary>
                <ButtonSecondary href="/invest/zero" size="lg">
                  Review Zero Seed Round
                </ButtonSecondary>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="p-6 rounded-lg border border-gray-800 bg-black/40">
            <p className="text-xs text-gray-400 text-center">
              <span className="font-semibold text-gray-300">Legal Disclaimer:</span>
              {' '}This overview is for informational purposes only and does not constitute
              an offer to sell securities. Investments are speculative, illiquid, and involve
              substantial risk of loss. Past performance does not guarantee future results.
              Prospective investors should review complete offering documents and consult
              legal counsel.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
