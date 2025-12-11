/**
 * Zero Inbox - Public Marketing Page
 *
 * Minimal styling as per plan - no ASCII grids, no glass cards.
 * Clean, responsive layout showcasing Zero's AI-powered email management.
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { ResponsiveText } from '@/lib/ui/responsive';
import { zeroHero, zeroFeatures, zeroMarketing } from '@/lib/content/zero';
import InteractiveDemoWrapper from './InteractiveDemoWrapper';
import StarfieldBackground from '@/components/zero/FloatingOrbs';
import BetaSignupButton from '@/components/zero/BetaSignupButton';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zero Inbox — AI-Powered Email Management',
  description: zeroMarketing.promotional,
  keywords: zeroMarketing.keywords,
};

export default function ZeroPage() {
  const featuresTheme = getSectionTheme('default');

  return (
    <>
      {/* Hero Section */}
      <Section spacing="large" background="default">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <ResponsiveText variant="h1" className="mb-4 sm:mb-6">
              {zeroHero.title}
            </ResponsiveText>
            <ResponsiveText variant="h2" className="mb-4 text-accent">
              {zeroHero.subtitle}
            </ResponsiveText>
            <p className="text-lg sm:text-xl text-muted mb-8 sm:mb-12 leading-relaxed">
              {zeroHero.tagline}
            </p>
            <p className="text-base sm:text-lg text-foreground mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
              {zeroHero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16">
              <ButtonPrimary href={zeroHero.portalUrl} size="lg">
                Show me how it works
              </ButtonPrimary>
              <BetaSignupButton
                appStoreUrl={zeroHero.appStoreUrl}
                className="px-4 sm:px-6 md:px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-accent bg-white border-2 border-accent rounded-md hover:bg-accent/10 transition-colors text-center inline-block"
              >
                Sign up for beta
              </BetaSignupButton>
            </div>
          </div>
        </Container>
      </Section>

      {/* Demo Preview */}
      <Section spacing="large" background="muted">
        <div className="relative">
          {/* Starfield Background */}
          <StarfieldBackground />

          <Container>
            <div className="max-w-4xl mx-auto" style={{ paddingTop: '40px', paddingBottom: '120px' }}>
              <div className="text-center mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Try it yourself
                </h3>
                <p className="text-base sm:text-lg text-muted">
                  Swipe right to take action, left to dismiss
                </p>
              </div>
              <InteractiveDemoWrapper />
            </div>
          </Container>
        </div>
      </Section>

      {/* Features Grid */}
      <Section spacing="large" background="transparent" colorTheme={featuresTheme}>
        <ASCIIUnifiedGrid animated={true} colorTheme={featuresTheme} opacity={0.25} />
        <Container className="relative z-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <ResponsiveText variant="h2" className="mb-4">
                Features
              </ResponsiveText>
              <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto">
                Powerful AI capabilities designed to help you achieve and maintain inbox zero.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 md:gap-6 lg:gap-8">
              {zeroFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border border-border bg-background hover:border-accent/50 transition-colors"
                >
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>


      {/* Final CTA */}
      <Section spacing="large" background="accent">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <ResponsiveText variant="h2" className="mb-4 sm:mb-6 text-white">
              Ready to achieve inbox zero?
            </ResponsiveText>
            <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-12 leading-relaxed">
              Explore the full capabilities of Zero with interactive tools, real-time analytics, and comprehensive documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={zeroHero.portalUrl}
                className="px-4 sm:px-6 md:px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-accent bg-white rounded-md hover:bg-white/90 transition-colors text-center inline-block"
              >
                Show me how it works
              </Link>
              <BetaSignupButton
                appStoreUrl={zeroHero.appStoreUrl}
                className="px-4 sm:px-6 md:px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white bg-transparent border-2 border-white rounded-md hover:bg-white/10 transition-colors text-center inline-block"
              >
                Sign up for beta
              </BetaSignupButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
