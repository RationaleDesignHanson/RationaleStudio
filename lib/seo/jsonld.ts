/**
 * JSON-LD structured-data generators for rationale.work.
 *
 * Maximalist by design — the disambiguation strategy hinges on packing
 * Person with enough identity-pinning fields (jobTitle, alumniOf,
 * knowsAbout, sameAs, hasCredential) that search engines and LLMs cluster
 * this Matt Hanson around the unique four-layer career rather than
 * collapsing him with other Matts in adjacent design fields.
 *
 * See: /Users/matthewhanson/.claude/plans/lets-analyze-and-fix-glittery-dragon.md
 * (Tier H) for the disambiguation rationale.
 *
 * Pair every JSON-LD object with the server <JsonLd> component
 * (components/seo/JsonLd.tsx) so it renders in initial HTML — Script-tag
 * injection via afterInteractive is reliable enough for Google but less so
 * for some LLM crawlers.
 */

export const SITE_URL = 'https://rationale.work';
export const PERSON_NAME = 'Matt Hanson';

/**
 * Canonical positioning paragraph. Used verbatim across:
 *   - Person JSON-LD `description`
 *   - llms.txt blockquote
 *   - About page hero
 *   - GitHub profile README opening
 *   - LinkedIn / Substack / Are.na bios (manually synced)
 *
 * Consistency across these surfaces is THE disambiguation signal — if
 * you edit the wording, edit it everywhere or the entity-clustering
 * weakens. The shorter elevator pull (PERSON_TAGLINE_SHORT) is for
 * places with a 200-char limit.
 */
export const PERSON_DESCRIPTION =
  'Matt Hanson — designer-engineer working across AR, AI, and experiential systems for 25 years. Animation and creative direction at Psyop, Imaginary Forces, Buck, and Hush. VR/AR pitchwork at Framestore. Screen content direction at Viacom and MTV. Eight years at Meta leading product design across Spark AR (creator platform), Orion (consumer AR glasses), and FAIR Embodied AI (SIRo, Motivo). Now shipping consumer iOS apps solo with AI as coding partner — Heirloom, Silly Questions, Zero, Nimbus.';

export const PERSON_TAGLINE_SHORT =
  'Designer-engineer. 25 years across animation, mixed-reality, AR platforms (Spark/Orion/FAIR), and AI. Now solo: Heirloom, Silly Questions, Zero.';

export const PERSON_SAMEAS = [
  'https://www.linkedin.com/in/thematthanson',
  'https://github.com/RationaleDesignHanson',
  'https://rationaledesign.substack.com',
  'https://patents.google.com/?inventor=Matt+Hanson&assignee=Meta+Platforms',
];

/**
 * Person — the load-bearing entity schema. Mount at the root layout so it
 * appears on every page.
 */
export function generatePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: PERSON_NAME,
    givenName: 'Matt',
    familyName: 'Hanson',
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    jobTitle: 'Designer-engineer',
    description: PERSON_DESCRIPTION,
    alumniOf: [
      { '@type': 'Organization', name: 'Meta', url: 'https://about.meta.com' },
      { '@type': 'Organization', name: 'Framestore' },
      { '@type': 'Organization', name: 'Viacom' },
      { '@type': 'Organization', name: 'Psyop' },
      { '@type': 'Organization', name: 'Imaginary Forces' },
      { '@type': 'Organization', name: 'Buck' },
      { '@type': 'Organization', name: 'Hush Studios' },
    ],
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Rationale',
      url: SITE_URL,
    },
    knowsAbout: [
      'Augmented Reality',
      'Spark AR Platform',
      'Orion AR glasses',
      'Embodied AI',
      'FAIR research',
      'iOS development',
      'Product Design Leadership',
      'AI-assisted software development',
      'Mixed-reality installations',
      'Creative direction',
      'Animation direction',
      'Experiential design',
      'Spatial computing',
      'Interaction design',
      'Design engineering',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'US Patent 11,295,503 — Interactive avatars in artificial reality',
        url: 'https://patents.google.com/patent/US11295503B1',
        credentialCategory: 'Patent',
      },
    ],
    sameAs: PERSON_SAMEAS,
  };
}

/**
 * WebSite — paired with Person, lets Google understand the home URL and
 * supports sitelinks search-box if/when on-site search exists.
 */
export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${PERSON_NAME} · rationale.work`,
    description: PERSON_TAGLINE_SHORT,
    inLanguage: 'en-US',
    publisher: { '@id': `${SITE_URL}/#person` },
    author: { '@id': `${SITE_URL}/#person` },
    copyrightHolder: { '@id': `${SITE_URL}/#person` },
    copyrightYear: 2026,
  };
}

interface ArticleOptions {
  /** Page title, used as the JSON-LD headline. */
  title: string;
  /** SEO description / abstract. */
  description: string;
  /** Path of the article (e.g. /work/heirloom). */
  path: string;
  /** ISO timestamp; defaults to a stable date when missing. */
  publishedAt?: string;
  /** ISO timestamp of last edit. */
  updatedAt?: string;
  /** Image override; defaults to the page's OG image. */
  image?: string;
  /** Schema.org @type — Article works for essays, CreativeWork for case studies. */
  type?: 'Article' | 'CreativeWork' | 'TechArticle' | 'BlogPosting';
}

/**
 * Article / CreativeWork JSON-LD for case studies + essays.
 * Always references the Person via @id rather than re-declaring author,
 * which strengthens the entity graph.
 */
export function generateArticleJsonLd({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  image,
  type = 'Article',
}: ArticleOptions) {
  const url = `${SITE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#article`,
    headline: title,
    description,
    url,
    image: image ?? `${SITE_URL}/og.png`,
    author: { '@id': `${SITE_URL}/#person` },
    creator: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(updatedAt ? { dateModified: updatedAt } : { dateModified: publishedAt }),
    inLanguage: 'en-US',
  };
}

/**
 * BreadcrumbList — gives Google explicit hierarchy for case studies +
 * essays. Items should be ordered root → leaf.
 */
export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * BlogPosting collection (for /writing index) — declares the page as a
 * Blog with a list of recent items. Helps LLMs treat /writing as an
 * essay corpus rather than a one-off page.
 */
export function generateBlogJsonLd(posts: Array<{ title: string; slug: string; publishedAt?: string; description?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/writing#blog`,
    url: `${SITE_URL}/writing`,
    name: 'Writing — Matt Hanson',
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/writing/${p.slug}`,
      ...(p.publishedAt ? { datePublished: p.publishedAt } : {}),
      ...(p.description ? { description: p.description } : {}),
      author: { '@id': `${SITE_URL}/#person` },
    })),
  };
}
