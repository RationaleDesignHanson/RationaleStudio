/**
 * Page-specific SEO Metadata
 *
 * Centralized metadata definitions for all public pages
 * Import and use in layout.tsx or page.tsx as needed
 */

import { Metadata } from 'next';

export const workPageMetadata: Metadata = {
  title: 'Our Work',
  description: 'Products we build and own (Zero, Atlas, Amplify) plus select partnership engagements. Product studio showcasing own ventures first, then client work.',
  openGraph: {
    title: 'Our Work — Rationale',
    description: 'Products we build and own, plus select partnership engagements where we applied our methodology to solve complex problems.',
    url: 'https://rationale.work/work',
  },
  alternates: {
    canonical: 'https://rationale.work/work',
  },
};

export const partnershipsPageMetadata: Metadata = {
  title: 'Partner with a Product Studio',
  description: 'Strategic partnerships for AI product development. We build our own ventures using the same process we use for partners. Discovery sprints, prototyping, and full product development.',
  keywords: [
    'product partnership',
    'AI development',
    'product studio partnership',
    'MVP development',
    'prototype development',
    'strategic partnership',
  ],
  openGraph: {
    title: 'Partner with a Product Studio — Rationale',
    description: 'Strategic partnerships for custom AI product development. Same systematic approach we use for our own ventures.',
    url: 'https://rationale.work/partnerships',
  },
  alternates: {
    canonical: 'https://rationale.work/partnerships',
  },
};

export const aboutPageMetadata: Metadata = {
  title: 'About',
  description: 'Product studio with dual-engine model: build own ventures (Zero, Atlas, Amplify) + strategic partnerships. Ex-Meta Reality Labs with 7 years AR/AI experience, 15+ patents.',
  keywords: [
    'product studio',
    'venture studio',
    'Meta Reality Labs',
    'AR AI experience',
    'dual engine model',
    'startup studio',
  ],
  openGraph: {
    title: 'About — Rationale',
    description: 'Product studio building AI-powered ventures. Two engines: own products + client partnerships. Meta background with proven execution.',
    url: 'https://rationale.work/about',
  },
  alternates: {
    canonical: 'https://rationale.work/about',
  },
};

export const capabilitiesPageMetadata: Metadata = {
  title: 'Technical Capabilities',
  description: 'Full-stack expertise: AI/ML (LLMs, fine-tuning, RAG), web/mobile development, data intelligence, API architecture, DevOps, AR/VR, and security. 7+ years AR/AI, 15+ patents, Meta background.',
  keywords: [
    'AI development',
    'LLM integration',
    'full-stack development',
    'React development',
    'Next.js development',
    'mobile development',
    'AR VR development',
    'product capabilities',
  ],
  openGraph: {
    title: 'Technical Capabilities — Rationale',
    description: 'Full-stack expertise across AI, web, mobile, data, and infrastructure. Built through years of shipping products at Meta and as an independent studio.',
    url: 'https://rationale.work/capabilities',
  },
  alternates: {
    canonical: 'https://rationale.work/capabilities',
  },
};

export const contactPageMetadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch to discuss investment opportunities in our ventures, strategic partnerships, or collaboration on your product. Schedule an intro call with Rationale.',
  openGraph: {
    title: 'Contact — Rationale',
    description: 'Discuss investment, partnerships, or product collaboration opportunities.',
    url: 'https://rationale.work/contact',
  },
  alternates: {
    canonical: 'https://rationale.work/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const howWeWorkPageMetadata: Metadata = {
  title: 'How We Work',
  description: 'Kits methodology: systematic product development from discovery to launch. Fixed-scope engagements with bi-weekly checkpoints. Same process for our ventures and partners.',
  keywords: [
    'product methodology',
    'product development process',
    'agile development',
    'MVP methodology',
    'product studio process',
  ],
  openGraph: {
    title: 'How We Work — Rationale',
    description: 'Systematic product development methodology used for our own ventures and partner engagements.',
    url: 'https://rationale.work/how-we-work',
  },
  alternates: {
    canonical: 'https://rationale.work/how-we-work',
  },
};

export const thinkingPageMetadata: Metadata = {
  title: 'Thinking',
  description: 'Essays on product development, systematic execution, and building conviction-backed ventures. Insights from building Zero, Atlas, and Amplify.',
  openGraph: {
    title: 'Thinking — Rationale',
    description: 'Essays on product development and systematic execution.',
    url: 'https://rationale.work/thinking',
  },
  alternates: {
    canonical: 'https://rationale.work/thinking',
  },
};
