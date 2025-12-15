/**
 * Sanitary Waste System - Quick Overview
 * Minimal public-facing placeholder
 * IP Development Partnership Project
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanitary Waste System — IP Development | Rationale',
  description: 'Physical product in prototyping',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SanitaryWasteQuickOverviewPage() {
  const heroTheme = getSectionTheme('hero');

  return (
    <>
      {/* Hero - Minimal Content */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme}>
        <Container className="relative z-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={heroTheme} className="p-6 sm:p-8 lg:p-12">
              <div className="mb-6">
                <Link href="/clients/work" className="text-accent hover:underline text-sm sm:text-base">
                  ← Back to Work
                </Link>
              </div>

              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">
                  IP Development · Pre-Seed · Partnership
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Sanitary Waste System
              </h1>

              <p className="text-xl sm:text-2xl text-muted mb-8">
                Physical product in prototyping
              </p>

              <div className="mt-8 pt-8 border-t border-muted/20">
                <p className="text-sm text-muted">
                  This project contains confidential IP development details.
                  Access is restricted to authorized partners and investors.
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>
    </>
  );
}
