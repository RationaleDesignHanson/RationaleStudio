import type { MetadataRoute } from 'next';

const BASE = 'https://rationale.work';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Public pages
  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/work', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/writing', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },


    // Case studies
    { url: '/work/heirloom', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/work/heirloom/evolution', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/work/silly-questions', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/work/zero', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/work/rumi', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/work/fubo', priority: 0.7, changeFrequency: 'monthly' as const },
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

  return routes.map((route) => ({
    url: `${BASE}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
