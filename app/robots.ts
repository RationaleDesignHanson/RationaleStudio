import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/clients/',
          '/owner/',
          '/admin/',
          '/api/',
          '/login',
          '/logout',
          '/_archive/',
        ],
      },
    ],
    sitemap: 'https://rationale.work/sitemap.xml',
  };
}
