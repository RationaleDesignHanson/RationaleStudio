/**
 * Product Marketing Content - Index
 *
 * Centralized exports for all product marketing content
 */

export * from './types';
export { zeroMarketingContent } from './zero-marketing';
export { heirloomMarketingContent } from './heirloom-marketing';
export { creaitMarketingContent } from './creait-marketing';
export { athletesFirstMarketingContent } from './athletes-first-marketing';
export { fuboMarketingContent } from './fubo-marketing';
export { sanitaryMarketingContent } from './sanitary-marketing';

// Helper function to get content by slug
import { ProductMarketingContent } from './types';
import { zeroMarketingContent } from './zero-marketing';
import { heirloomMarketingContent } from './heirloom-marketing';
import { creaitMarketingContent } from './creait-marketing';
import { athletesFirstMarketingContent } from './athletes-first-marketing';
import { fuboMarketingContent } from './fubo-marketing';
import { sanitaryMarketingContent } from './sanitary-marketing';

const allProducts: ProductMarketingContent[] = [
  zeroMarketingContent,
  heirloomMarketingContent,
  creaitMarketingContent,
  athletesFirstMarketingContent,
  fuboMarketingContent,
  sanitaryMarketingContent,
];

export function getProductMarketingContent(slug: string): ProductMarketingContent | undefined {
  return allProducts.find(p => p.slug === slug);
}

export function getAllProductMarketingContent(): ProductMarketingContent[] {
  return allProducts;
}
