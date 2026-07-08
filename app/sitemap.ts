import type { MetadataRoute } from 'next';
import { listPosts } from '@/content/writing/posts';
import {
  CASE_STUDIES,
  type CaseStudySlug,
} from '@/lib/seo/case-studies';

const BASE = 'https://rationale.work';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Public pages
  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    // '/work' permanently redirects to '/' (see next.config.mjs) — not listed.
    { url: '/writing', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },


    // Case studies
    { url: '/work/heirloom', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/work/heirloom/evolution', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/work/silly-questions', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/work/zero', priority: 0.7, changeFrequency: 'monthly' as const },
    // rumi + fubo intentionally omitted: confidential, noindex (see their layout.tsx)
    { url: '/work/framestore', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/work/spark-ar', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/work/orion', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/work/fair-embodied-ai', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/work/viacom', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/work/studio-era', priority: 0.8, changeFrequency: 'monthly' as const },

    // Heirloom support pages (legal)
    { url: '/heirloom/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/heirloom/support', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // Canonical writing essays — sourced from content/writing/posts.ts so
  // adding an entry there auto-publishes into the sitemap.
  const writingPosts = listPosts().map((p) => ({
    url: `${BASE}/writing/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    ...routes.map((route) => ({
      url: `${BASE}${route.url}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...writingPosts,
  ];
}
