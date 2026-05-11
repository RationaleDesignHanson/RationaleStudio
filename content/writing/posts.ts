/**
 * Canonical-on-rationale.work essays. Each entry becomes /writing/<slug>.
 *
 * The plan: publish here first; cross-post to Substack with a manual
 * `<link rel="canonical" href="https://rationale.work/writing/<slug>">`
 * block. SEO authority accrues to the personal domain rather than
 * substack.com. See docs/seo/substack-canonical-workflow.md.
 *
 * To add a new essay:
 *   1. Add an entry to POSTS with frontmatter + body (ReactNode).
 *   2. Use plain JSX or import a co-located .mdx/.tsx component for the body.
 *   3. The route auto-resolves, sitemap auto-includes, OG image auto-renders.
 *   4. Run `npm run dev` and visit /writing/<slug> to verify.
 */

import type { ReactNode } from 'react';

export interface WritingPost {
  slug: string;
  title: string;
  /** Short SEO + card description. ~150-180 chars. */
  description: string;
  /** ISO date string — drives sitemap lastModified + Article schema. */
  publishedAt: string;
  /** Optional last-edited date. */
  updatedAt?: string;
  /** If the essay was cross-posted to Substack, link the canonical pointer back. */
  substackUrl?: string;
  /** Optional tag list for related-posts and topic clusters. */
  tags?: string[];
  /** Render-ready body. */
  body: ReactNode;
}

// No canonical posts yet. The first will be the migration of "When to Hire AI"
// from Substack — drafted in docs/seo/substack-canonical-workflow.md. Once
// migrated, add the entry here and the route, sitemap, and OG image all
// resolve automatically.
export const POSTS: WritingPost[] = [];

export function getPost(slug: string): WritingPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function listPosts(): WritingPost[] {
  return [...POSTS].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
  );
}
