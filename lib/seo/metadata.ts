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

const SITE_CONFIG = {
  name: 'Rationale',
  title: 'Rationale — Product Studio Building AI-Powered Ventures',
  description: 'Product studio building AI-powered ventures: Zero (email AI), Atlas (CRE intelligence), Amplify (NIL platform). We build our own products and partner with companies for equity + cash.',
  url: 'https://rationale.work',
  ogImage: '/og-image.png',
  twitter: '@RationaleStudio',
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

  const fullTitle = title.includes('Rationale') ? title : `${title} — Rationale`;
  const url = `${SITE_CONFIG.url}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;

  return {
    title: fullTitle,
    description,
    applicationName: SITE_CONFIG.name,
    authors: authors.map(name => ({ name })),
    keywords: [
      'product studio',
      'AI ventures',
      'email AI',
      'Zero',
      'product development',
      'startup studio',
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
    alternateName: 'Rationale Studio',
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.description,
    foundingDate: '2024',
    founders: [
      {
        '@type': 'Person',
        name: 'Matt Hanson',
      },
    ],
    sameAs: [
      'https://linkedin.com/company/rationale-studio',
      'https://twitter.com/RationaleStudio',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Business Inquiries',
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
