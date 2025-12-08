/**
 * Ventures Portfolio Landing Page
 *
 * Overview of all Rationale ventures: Zero, Atlas, Amplify
 * Used by 24 links across the site
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { ASCIIUnifiedGrid, GlassCard } from '@/components/visual';
import { ventures } from '@/lib/content';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ventures — Rationale Studio',
  description: 'Our portfolio of products: Zero email AI, Atlas CRE intelligence, Amplify NIL + recruiting platform.',
};

export default function VenturesPage() {
  const theme = getSectionTheme('hero');

  return (
    <>
      {/* Hero */}
      <Section spacing="large" background="transparent" colorTheme={theme}>
        <ASCIIUnifiedGrid animated={true} colorTheme={theme} opacity={0.25} />
        <Container className="relative z-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: theme.foreground }}>
              Our Ventures
            </h1>
            <p className="text-xl mb-4" style={{ color: theme.accent }}>
              Product studio building AI-powered platforms for real-world problems
            </p>
            <p className="text-base" style={{ color: theme.muted }}>
              Three ventures in active development: Zero (launching Q1 2025), Atlas (pipeline), Amplify (pipeline)
            </p>
          </div>

          {/* Venture Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ventures.map((venture) => (
              <Link key={venture.slug} href={`/ventures/${venture.slug}`}>
                <GlassCard
                  theme={theme}
                  className="p-8 h-full hover:scale-[1.02] transition-transform cursor-pointer"
                  borderRadius="1rem"
                >
                  <h2 className="text-2xl font-bold mb-2" style={{ color: theme.foreground }}>
                    {venture.title}
                  </h2>
                  <p className="text-sm mb-4" style={{ color: theme.accent }}>{venture.tagline}</p>
                  <p className="text-sm mb-6" style={{ color: theme.muted }}>{venture.heroDescription}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span style={{ color: theme.muted }}>Status:</span>
                      <span style={{ color: theme.accent }}>{venture.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span style={{ color: theme.muted }}>Timeline:</span>
                      <span style={{ color: theme.accent }}>{venture.meta.timeline}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t" style={{ borderColor: theme.border }}>
                    <span className="text-sm font-medium" style={{ color: theme.accent }}>
                      View Details →
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>

          {/* Investment CTA */}
          <div className="max-w-3xl mx-auto mt-16">
            <GlassCard theme={theme} className="p-8 text-center" borderRadius="1rem">
              <h3 className="text-2xl font-bold mb-4" style={{ color: theme.foreground }}>
                Investment Opportunities
              </h3>
              <p className="text-base mb-6" style={{ color: theme.muted }}>
                Zero seed round is open now. Studio investment available for strategic partners.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/investors"
                  className="px-6 py-3 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.background
                  }}
                >
                  View Investment Opportunities
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-lg font-medium transition-colors"
                  style={{
                    border: `2px solid ${theme.accent}`,
                    color: theme.accent
                  }}
                >
                  Schedule a Call
                </Link>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>
    </>
  );
}
