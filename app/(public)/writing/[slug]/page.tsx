/**
 * /writing/[slug] — canonical home for essays that are also cross-posted
 * to Substack. Each essay carries Article + Breadcrumb JSON-LD and an
 * absolute canonical so Substack reposts pass authority back here.
 */

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google';
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

// This essay ships with its own art direction rather than the site chrome.
// Loaded here so the fonts only download on /writing/[slug].
const ESSAY_CSS = `
[data-essay-theme]{
  --e-ground:#0B0B0B; --e-ink:#ECE6DB; --e-muted:#8F8A80;
  --e-accent:#D07A38; --e-rule:#2A2622;
  background:var(--e-ground); color:var(--e-ink);
  font-family:var(--essay-serif),Georgia,serif; font-size:19px; line-height:1.7;
  -webkit-font-smoothing:antialiased;
}
[data-essay-theme] .e-wrap{max-width:38em;margin:0 auto;padding:0 1.5em}
[data-essay-theme] .e-eyebrow{
  font-family:var(--essay-mono),monospace;font-weight:500;font-size:13px;
  letter-spacing:.2em;text-transform:uppercase;color:var(--e-muted);margin:0}
[data-essay-theme] .e-tick{width:46px;height:3px;background:var(--e-accent);margin:16px 0 30px}
[data-essay-theme] h1{
  font-family:var(--essay-mono),monospace;font-weight:500;
  font-size:clamp(2.1rem,6vw,3.3rem);line-height:1.05;letter-spacing:-.02em;
  text-wrap:balance;margin:0 0 24px;color:#fff}
[data-essay-theme] .e-standfirst{
  font-style:italic;font-size:clamp(1.12rem,2.3vw,1.35rem);line-height:1.5;
  color:var(--e-ink);opacity:.82;margin:0 0 34px;padding-bottom:34px;
  border-bottom:1px solid var(--e-rule);text-wrap:pretty;
  /* a deck wants a shorter measure than the body it sits above: ~50 characters,
     not the 64 it inherits from the column at this size */
  max-width:26em}
[data-essay-theme] .e-back{
  font-family:var(--essay-mono),monospace;font-size:13px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--e-muted);text-decoration:none;
  display:inline-block;margin-bottom:34px}
[data-essay-theme] .e-back:hover{color:var(--e-accent)}
[data-essay-theme] p{margin:0 0 1.7em;text-wrap:pretty}
[data-essay-theme] em{font-style:italic}
[data-essay-theme] a{color:var(--e-accent)}
[data-essay-theme] figure{margin:2.8em 0}
[data-essay-theme] figure img{width:100%;height:auto;display:block;border:1px solid var(--e-rule)}
[data-essay-theme] figure.portrait{max-width:26em;margin-left:auto;margin-right:auto}
[data-essay-theme] figcaption{
  font-family:var(--essay-mono),monospace;font-size:12.5px;line-height:1.55;
  color:var(--e-muted);margin-top:14px;text-align:center;text-wrap:pretty}
[data-essay-theme] hr{border:0;border-top:1px solid var(--e-rule);margin:3.4em 0 2.4em}
[data-essay-theme] .e-label{
  font-family:var(--essay-mono),monospace;font-weight:500;font-size:13px;
  letter-spacing:.2em;text-transform:uppercase;color:var(--e-muted);margin:0 0 2.2em}
[data-essay-theme] .e-colophon{
  font-family:var(--essay-mono),monospace;font-size:12.5px;letter-spacing:.06em;
  text-transform:uppercase;color:var(--e-muted);margin-top:4em;
  padding-top:1.8em;border-top:1px solid var(--e-rule)}
`;

const plexSerif = IBM_Plex_Serif({
  subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'],
  variable: '--essay-serif', display: 'swap',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'], weight: ['400', '500'],
  variable: '--essay-mono', display: 'swap',
});

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
    // publishedAt is a bare ISO date => UTC midnight. Without this the local
    // timezone renders it a day early west of Greenwich.
    timeZone: 'UTC',
  });

  if (post.theme) {
    return (
      <>
        <MultipleStructuredData dataBlocks={schemas} />
        <style dangerouslySetInnerHTML={{ __html: ESSAY_CSS }} />
        <main
          data-essay-theme={post.theme}
          className={`${plexSerif.variable} ${plexMono.variable}`}
          style={{ minHeight: '100vh', padding: 'clamp(2.5em,6vw,4.5em) 0 8em' }}
        >
          <article className="e-wrap">
            <Link href="/writing" className="e-back">&larr; Back to writing</Link>
            <p className="e-eyebrow">Written 2021 &middot; Reframed 2026</p>
            <div className="e-tick" />
            <h1>{post.title}</h1>
            <p className="e-standfirst">{post.description}</p>
            <div>{post.body}</div>
            <p className="e-colophon">
              Matt Hanson &middot; Rationale &middot; written 2021, reframed{' '}
              {new Date(post.publishedAt).getUTCFullYear()}
            </p>
          </article>
        </main>
      </>
    );
  }

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
