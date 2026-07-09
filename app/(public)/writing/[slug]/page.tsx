/**
 * /writing/[slug] — canonical home for essays that are also cross-posted
 * to Substack. Each essay carries Article + Breadcrumb JSON-LD and an
 * absolute canonical so Substack reposts pass authority back here.
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { MultipleStructuredData } from '@/components/seo/StructuredData';
import {
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo/jsonld';
import { getPost, listPosts } from '@/content/writing/posts';

export function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const canonical = `https://rationale.work/writing/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: canonical,
      publishedTime: post.publishedAt,
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      tags: post.tags,
      authors: ['Matt Hanson'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function WritingPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const schemas = [
    generateArticleJsonLd({
      title: post.title,
      description: post.description,
      path: `/writing/${post.slug}`,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      type: 'BlogPosting',
    }),
    generateBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Writing', url: '/writing' },
      { name: post.title, url: `/writing/${post.slug}` },
    ]),
  ];

  const published = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ProjectScope project="heirloom">
      <MultipleStructuredData dataBlocks={schemas} />
      <main
        className="era-now min-h-screen"
        style={{ backgroundColor: 'var(--era-bg)', color: 'var(--era-ink-body)' }}
      >
        <section className="px-4 sm:px-6 md:px-8 pt-10 md:pt-14 pb-8 md:pb-12 border-b border-[var(--era-hairline)]">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-sm text-[var(--era-ink-muted)] hover:text-[var(--accent)] mb-6 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to writing
            </Link>
            <p className="text-caption font-mono tracking-[0.3em] uppercase text-[var(--era-ink-muted)] mb-3">
              Essay &middot; {published}
            </p>
            <h1 className="font-display text-display-sm md:text-display text-[var(--era-ink)] leading-[1.05] mb-4">
              {post.title}
            </h1>
            <p className="font-display italic text-lg md:text-xl text-[var(--era-ink-body)] leading-snug max-w-2xl">
              {post.description}
            </p>
          </div>
        </section>

        <article className="px-4 sm:px-6 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto prose prose-lg">{post.body}</div>
        </article>

        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/writing"
                className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to writing
              </Link>
              {post.substackUrl && (
                <a
                  href={post.substackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono text-[var(--era-ink-muted)] hover:text-[var(--accent)] transition-colors"
                  data-cta-location="essay-footer"
                  data-cta-type="substack"
                >
                  Read on Substack <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <a
              href="mailto:hanson@rationale.work"
              className="inline-flex items-center gap-2 text-sm font-mono text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors"
              data-cta-location="essay-footer"
              data-cta-type="email"
            >
              hanson@rationale.work <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}
