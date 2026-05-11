import type { MetadataRoute } from 'next';

/**
 * robots.txt — explicit allowlist for AI crawlers in addition to standard
 * search engines. The `*` rule already covers them but listing each by
 * name makes intent unambiguous and protects against future SDK / spec
 * changes that might silently start respecting more granular directives.
 *
 * If preserving licensing leverage ever matters, the GPTBot and
 * Google-Extended user agents are the two to flip to disallow first —
 * they feed training corpora rather than search-time retrieval.
 */
const DISALLOW = ['/clients/', '/owner/', '/admin/', '/api/', '/login', '/logout', '/_archive/'];

const AI_CRAWLERS = [
  'GPTBot',           // OpenAI training crawler
  'OAI-SearchBot',    // ChatGPT search-time retrieval
  'PerplexityBot',    // Perplexity search
  'ClaudeBot',        // Anthropic training
  'Claude-User',      // Claude.ai live retrieval
  'Claude-SearchBot', // Anthropic search
  'Google-Extended',  // Gemini training
  'CCBot',            // Common Crawl — feeds many models
  'Applebot-Extended',// Apple Intelligence
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: 'https://rationale.work/sitemap.xml',
    host: 'https://rationale.work',
  };
}
