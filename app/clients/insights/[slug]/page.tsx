/**
 * Insight Article Page
 *
 * Individual article pages with full content.
 * Clean, readable layout optimized for long-form content.
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Hero } from '@/components/sections/Hero';
import { ResponsiveText, ResponsiveBox, ResponsiveButton } from '@/lib/ui/responsive';
import { insights, getInsightBySlug, getRelatedInsights } from '@/lib/content/insights';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import type { Metadata } from 'next';

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insights.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found — Rationale',
    };
  }

  return {
    title: `${article.title} — Rationale Insights`,
    description: article.excerpt,
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedInsights(slug, 3);

  return (
    <>
      {/* Hero / Header */}
      <Section spacing="large" background="default">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                {article.category}
              </span>
            </div>

            {/* Title & Subtitle */}
            <ResponsiveText variant="h1" className="mb-4">
              {article.title}
            </ResponsiveText>
            <p className="text-xl sm:text-2xl text-accent font-medium mb-6">
              {article.subtitle}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted pb-6 border-b border-border">
              <div>
                <p className="font-medium text-foreground">{article.author.name}</p>
                <p className="text-xs">{article.author.role}</p>
              </div>
              <span>•</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Article Content */}
      <Section spacing="large" background="default">
        <Container>
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none">
              {article.content.sections.map((section, index) => (
                <div key={index} className="mb-8 sm:mb-12">
                  {section.heading && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-base sm:text-lg text-muted leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </article>
          </div>
        </Container>
      </Section>

      {/* Tags */}
      {article.tags.length > 0 && (
        <Section spacing="default" background="muted">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-accent mb-3">
                Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Section spacing="large" background="default">
          <Container>
            <div className="max-w-4xl mx-auto">
              <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
                Related Articles
              </ResponsiveText>

              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/insights/${related.slug}`}
                    className="group"
                  >
                    <div className="p-6 rounded-lg border border-border bg-muted hover:border-accent hover:bg-background transition-all h-full">
                      {/* Category */}
                      <div className="mb-3">
                        <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                          {related.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                        {related.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-sm text-accent font-medium mb-3">
                        {related.subtitle}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <span>{related.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section spacing="large" background="accent">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <ResponsiveText variant="h2" className="mb-4 sm:mb-6">
              Like what you're reading?
            </ResponsiveText>
            <p className="text-base sm:text-lg text-muted mb-6 sm:mb-8">
              This is how we think about product, AI, and building conviction. If it resonates, let's work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonPrimary href="/contact" size="lg">
                Get in touch
              </ButtonPrimary>
              <ButtonSecondary href="/insights" size="lg">
                Read more articles
              </ButtonSecondary>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
