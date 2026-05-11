/**
 * SEO Metadata Utilities
 *
 * Centralized metadata generation for consistent SEO across all pages
 * Includes Open Graph, Twitter Cards, and structured data
 */

import { Metadata } from 'next';

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

// Personal portfolio. The earlier "product studio" framing (Atlas / Amplify
// / equity-for-cash partnerships) was deprecated 2026-04-27 when the site
// shifted to Matt's personal brand.
const SITE_CONFIG = {
  name: 'Matt Hanson',
  title: 'Matt Hanson — designer-engineer (AR, AI, experiential)',
  description: 'Designer-engineer. 25 years across animation, mixed-reality, AR platforms (Spark AR, Orion, FAIR Embodied AI at Meta), and AI. Now solo: Heirloom, Silly Questions, Zero.',
  url: 'https://rationale.work',
  ogImage: '/og.png',
  twitter: '@thematthanson',
};

/**
 * Generate comprehensive metadata for a page
 */
export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path = '',
    image = SITE_CONFIG.ogImage,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors = ['Matt Hanson'],
    tags = [],
  } = options;

  const fullTitle = title.includes('Matt Hanson') ? title : `${title} — Matt Hanson`;
  const url = `${SITE_CONFIG.url}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;

  return {
    title: fullTitle,
    description,
    applicationName: SITE_CONFIG.name,
    authors: authors.map(name => ({ name })),
    keywords: [
      'Matt Hanson',
      'designer-engineer',
      'AR design',
      'Spark AR',
      'Orion AR glasses',
      'FAIR Embodied AI',
      'Meta',
      'experiential design',
      'consumer iOS',
      'Heirloom Recipe Box',
      'Silly Questions',
      'AI coding partner',
      ...tags,
    ],
    openGraph: {
      type,
      locale: 'en_US',
      url,
      siteName: SITE_CONFIG.name,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitter,
      creator: SITE_CONFIG.twitter,
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate JSON-LD structured data for ventures
 */
export function generateVentureStructuredData(venture: {
  name: string;
  description: string;
  url: string;
  logo?: string;
  foundingDate?: string;
  founders?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: venture.name,
    description: venture.description,
    url: venture.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'iOS, Web',
    ...(venture.logo && { logo: venture.logo }),
    ...(venture.foundingDate && { foundingDate: venture.foundingDate }),
    ...(venture.founders && {
      founder: venture.founders.map(name => ({
        '@type': 'Person',
        name,
      })),
    }),
    publisher: {
      '@type': 'Organization',
      name: 'Rationale',
      url: SITE_CONFIG.url,
    },
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rationale',
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: 'Personal practice / studio name behind rationale.work — Matt Hanson, designer-engineer.',
    founders: [
      {
        '@type': 'Person',
        name: 'Matt Hanson',
        url: SITE_CONFIG.url,
      },
    ],
    sameAs: [
      'https://www.linkedin.com/in/thematthanson',
      'https://github.com/RationaleDesignHanson',
      'https://rationaledesign.substack.com',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Inquiries',
      email: 'hanson@rationale.work',
      url: `${SITE_CONFIG.url}/contact`,
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}
