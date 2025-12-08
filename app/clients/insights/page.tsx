/**
 * Insights Index Page
 *
 * Blog listing page with articles on product strategy, AI, and design.
 * Showcases thought leadership and mental models.
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Hero } from '@/components/sections/Hero';
import { ResponsiveText, ResponsiveButton } from '@/lib/ui/responsive';
import { insights, getAllCategories } from '@/lib/content/insights';
import { ASCIIWaveDivider, ASCIIUnifiedGrid, GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights — Rationale',
  description: 'Thought leadership on product strategy, AI-native design, and building conviction in the age of acceleration.',
};

export default function InsightsPage() {
  const categories = getAllCategories();

  // Sort by most recent
  const sortedInsights = [...insights].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Get color themes for each section
  const heroTheme = getSectionTheme('hero');
  const featuredTheme = getSectionTheme('featuredWork');
  const articlesTheme = getSectionTheme('content');
  const ctaTheme = getSectionTheme('cta');

  return (
    <>
      {/* Hero */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme} noPaddingBottom={true}>
        <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} />
        <Container className="relative z-20">
          <Hero
            title="Insights"
            subtitle="Mental models for the AI era"
            description="Articles on product strategy, AI-native design, and how to build conviction when execution is cheap but direction is scarce."
            centered={false}
          />
        </Container>
      </Section>

      {/* Wave divider */}
      <ASCIIWaveDivider colorTheme={heroTheme} opacity={0.3} />

      {/* Featured Article */}
      {sortedInsights.length > 0 && (
        <>
          <Section spacing="large" background="transparent" colorTheme={featuredTheme} noPaddingTop={true}>
            <ASCIIUnifiedGrid animated={true} colorTheme={featuredTheme} opacity={0.15} />
            <Container className="relative z-20 pt-16 sm:pt-20">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                    Featured Article
                  </span>
                </div>

                <Link
                  href={`/insights/${sortedInsights[0].slug}`}
                  className="group block"
                >
                  <div
                    className="p-6 sm:p-8 rounded-lg border border-accent/20 backdrop-blur-sm hover:border-accent transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${featuredTheme.colors[0]}30 0%, ${featuredTheme.colors[1]}20 50%, ${featuredTheme.colors[2]}10 100%)`
                    }}
                  >
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                        {sortedInsights[0].category}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <ResponsiveText variant="h2" className="mb-3 group-hover:text-accent transition-colors">
                      {sortedInsights[0].title}
                    </ResponsiveText>
                    <p className="text-lg sm:text-xl text-accent font-medium mb-4">
                      {sortedInsights[0].subtitle}
                    </p>

                    {/* Excerpt */}
                    <p className="text-base text-muted leading-relaxed mb-6">
                      {sortedInsights[0].excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                      <span>{sortedInsights[0].author.name}</span>
                      <span>•</span>
                      <span>{new Date(sortedInsights[0].publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span>•</span>
                      <span>{sortedInsights[0].readTime}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </Container>
          </Section>
          <ASCIIWaveDivider colorTheme={featuredTheme} opacity={0.3} />
        </>
      )}

      {/* All Articles */}
      <Section spacing="large" background="muted" colorTheme={articlesTheme}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              All Articles
            </ResponsiveText>

            <div className="space-y-6">
              {sortedInsights.slice(1).map((article, index) => {
                const colors = articlesTheme.colors;
                const colorIndex = index % colors.length;
                return (
                  <Link
                    key={article.slug}
                    href={`/insights/${article.slug}`}
                    className="group block"
                  >
                    <div
                      className="p-6 rounded-lg border border-border backdrop-blur-sm hover:border-accent transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${colors[colorIndex]}10 0%, ${colors[(colorIndex + 1) % colors.length]}05 100%)`
                      }}
                    >
                      {/* Category & Meta */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                          {article.category}
                        </span>
                        <span className="text-sm text-muted">
                          {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="text-sm text-muted">•</span>
                        <span className="text-sm text-muted">{article.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                        {article.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-base text-accent font-medium mb-3">
                        {article.subtitle}
                      </p>

                      {/* Excerpt */}
                      <p className="text-sm sm:text-base text-muted leading-relaxed">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      {article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded bg-background/50 text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Wave divider */}
      <ASCIIWaveDivider colorTheme={articlesTheme} opacity={0.3} />

      {/* Filter by Category */}
      <Section spacing="large" background="default" colorTheme={articlesTheme}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={articlesTheme} className="p-6 sm:p-8 text-center">
              <ResponsiveText variant="h3" className="mb-6">
                Browse by Category
              </ResponsiveText>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground font-medium hover:border-accent hover:text-accent transition-all cursor-pointer"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted">
                Category filtering coming soon. For now, scroll to find articles by topic.
              </p>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Wave divider */}
      <ASCIIWaveDivider colorTheme={articlesTheme} opacity={0.3} />

      {/* CTA */}
      <Section spacing="large" background="accent" colorTheme={ctaTheme}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <ResponsiveText variant="h2" className="mb-4 sm:mb-6">
              Want to work together?
            </ResponsiveText>
            <p className="text-base sm:text-lg text-muted mb-6 sm:mb-8">
              These articles represent how we think. If they resonate, let's talk about how we can help you build conviction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonPrimary href="/contact" size="lg">
                Get in touch
              </ButtonPrimary>
              <ButtonSecondary href="/partnerships" size="lg">
                View our services
              </ButtonSecondary>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
