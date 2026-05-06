/**
 * Zero Product Variant Page
 *
 * Dynamic variant page for A/B testing different value propositions.
 * Each variant can have different headline, subheadline, hero visual, and CTA copy.
 */

import { notFound } from 'next/navigation';
import ZeroProductPage from '../../page';

// Variant configuration
const variants = {
  'productivity': {
    headline: 'AI Email Intelligence',
    subheadline: 'Extract actions from your inbox automatically. Swipe to complete.',
  },
  'time-saver': {
    headline: 'Reclaim Hours Each Week',
    subheadline: 'Stop reading emails. Start actioning them.',
  },
  'default': {
    headline: 'AI Email Intelligence',
    subheadline: 'Extract actions from your inbox automatically. Swipe to complete.',
  },
};

export default async function ZeroVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const resolvedParams = await params;
  const variant = resolvedParams.variant || 'default';
  
  // For now, redirect to main product page
  // Variant-specific content can be added later
  return <ZeroProductPage />;
}

export async function generateStaticParams() {
  return Object.keys(variants).map((variant) => ({
    variant,
  }));
}

