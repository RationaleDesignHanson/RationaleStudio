/**
 * Compass Public Marketing Page
 * AI video indexing with cultural intelligence
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Hero } from '@/components/sections/Hero';
import { GlassCard } from '@/components/visual';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Compass — AI Video Indexing | Rationale',
  description: 'AI-native content understanding with cultural and emotional intelligence. Mood-based discovery that actually works.',
};

export default function CompassPage() {
  const heroTheme = getSectionTheme('hero');
  const contentTheme = getSectionTheme('content');
  const featuresTheme = getSectionTheme('services');
  const ctaTheme = getSectionTheme('cta');

  return (
    <>
      {/* Hero */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme}>
        <Container className="relative z-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={heroTheme} className="p-6 sm:p-8 lg:p-12">
              <div className="mb-6">
                <Link href="/work" className="text-accent hover:underline text-sm sm:text-base">
                  ← Back to Portfolio
                </Link>
              </div>

              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">
                  In Development · 6-Week Prototype Sprint
                </span>
              </div>

              <Hero
                title="Project Compass: AI Video Indexing"
                subtitle="Content understanding with cultural and emotional intelligence"
                description="An AI agent that watches video with you, indexing content in real-time with cultural context, emotional resonance, and mood-based discovery. Traditional metadata misses what makes content meaningful—Compass understands it."
                centered={false}
              />

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <ButtonPrimary href="/contact" size="md">
                  Explore Partnership
                </ButtonPrimary>
                <ButtonSecondary href="#features" size="md">
                  See Features
                </ButtonSecondary>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* The Problem */}
      <Section spacing="large" background="default" colorTheme={contentTheme}>
        <Container>
          <div className="max-w-3xl mx-auto">
            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">The Problem</h2>
              <p className="text-base text-muted mb-4">
                Content discovery today relies on shallow metadata that completely misses emotional resonance and cultural significance.
              </p>
              <ul className="space-y-3 text-sm text-muted">
                <li>• Traditional taxonomies don't capture why content resonates emotionally</li>
                <li>• Cultural significance and context are invisible to current algorithms</li>
                <li>• Mood-based discovery doesn't exist in any meaningful way</li>
                <li>• Manual curation is expensive and doesn't scale</li>
                <li>• Creators can't find their audience beyond basic demographic targeting</li>
              </ul>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* What We're Building */}
      <div id="features">
      <Section spacing="large" background="transparent" colorTheme={featuresTheme}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">What We're Building</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard theme={featuresTheme} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">AI-Native Indexing</h3>
                <p className="text-sm text-muted">
                  Agents watch content in real-time, extracting cultural context, emotional beats, thematic elements,
                  and mood signatures that traditional metadata misses entirely.
                </p>
              </GlassCard>

              <GlassCard theme={featuresTheme} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Genre Channel System</h3>
                <p className="text-sm text-muted">
                  Discover content through thematic channels like "late-night introspection," "urban resilience,"
                  or "nostalgic summer"—not just "drama" or "comedy."
                </p>
              </GlassCard>

              <GlassCard theme={featuresTheme} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Cultural Intelligence</h3>
                <p className="text-sm text-muted">
                  Understands cultural references, historical context, and subcultural significance to surface
                  content that resonates with specific communities.
                </p>
              </GlassCard>

              <GlassCard theme={featuresTheme} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Progressive Population</h3>
                <p className="text-sm text-muted">
                  Multi-agent system populates the UI progressively as insights emerge, creating a responsive,
                  real-time experience.
                </p>
              </GlassCard>
            </div>
          </div>
        </Container>
      </Section>
      </div>

      {/* Tech Stack */}
      <Section spacing="large" background="default" colorTheme={contentTheme}>
        <Container>
          <div className="max-w-3xl mx-auto">
            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Technology</h2>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">Multi-agent AI</span>
                <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">Real-time video processing</span>
                <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">Browser extension</span>
                <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">Cultural tagging taxonomy</span>
                <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">Progressive UI rendering</span>
              </div>
              <p className="text-sm text-muted">
                6-week prototype sprint demonstrating real-time indexing without latency, scalable multi-agent deployment,
                browser-native implementation, and cultural context awareness. Proof of range alongside Zero's execution focus.
              </p>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* What This Proves */}
      <Section spacing="large" background="transparent" colorTheme={featuresTheme}>
        <Container>
          <div className="max-w-3xl mx-auto">
            <GlassCard theme={featuresTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">What Compass Proves</h2>
              <div className="space-y-4 text-base text-muted">
                <p>
                  <span className="font-bold text-accent">Range:</span> Zero demonstrates AI + mobile execution.
                  Compass demonstrates AI + video + cultural intelligence. We build across problem domains.
                </p>
                <p>
                  <span className="font-bold text-accent">Systematic approach:</span> Same structured methodology
                  applied to different markets. Real-time processing, multi-agent architecture, progressive enhancement.
                </p>
                <p>
                  <span className="font-bold text-accent">Innovation focus:</span> Not chasing trends. Compass tackles
                  unsolved problems (mood-based discovery, cultural context) where existing solutions fall short.
                </p>
                <p className="text-foreground font-semibold">
                  This is proof of versatility: we don't just build one type of product. We systematically tackle
                  complex problems across different domains with the same rigor.
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="large" background="accent" colorTheme={ctaTheme}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Interested in Project Compass?
            </h2>
            <p className="text-base text-muted mb-8">
              We're exploring partnership opportunities for early deployment and further development.
            </p>
            <ButtonPrimary href="/contact" size="lg">
              Get in Touch
            </ButtonPrimary>
          </div>
        </Container>
      </Section>
    </>
  );
}
