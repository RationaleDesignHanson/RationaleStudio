/**
 * Product Marketing Content Types
 *
 * Type definitions for consumer-friendly marketing pages
 * centered on jobs-to-be-done (JTBD)
 */

export interface ProductMarketingHero {
  preHeadline: string;
  headline: string;
  subheadline: string;
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
  visual?: {
    type: 'image' | 'video' | 'demo';
    src: string;
    alt: string;
  };
}

export interface ProblemScenario {
  scenario: string;
}

export interface ProductMarketingProblem {
  headline: string;
  scenarios: ProblemScenario[];
  transition: string;
}

export interface SolutionUseCase {
  trigger: string;
  action: string;
  outcome: string;
}

export interface ProductMarketingSolution {
  headline: string;
  useCases: SolutionUseCase[];
  visual?: {
    type: 'demo' | 'screenshots' | 'video';
    description: string;
  };
}

export interface ProofOutcome {
  metric: string;
  context: string;
}

export interface ProductMarketingProof {
  headline: string;
  outcomes: ProofOutcome[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface ProductMarketingCTA {
  headline: string;
  subheadline: string;
  buttonText: string;
  formFields?: string[];
  trustSignal: string;
}

export interface ProductMarketingWhoItsFor {
  headline: string;
  personas: string[];
  antiPersonas?: string[];
}

export interface ProductMarketingHowItWorks {
  headline: string;
  steps: {
    title: string;
    description: string;
  }[];
  techSidebar?: string;
  deepDiveLink?: {
    text: string;
    href: string;
  };
}

export interface ProductMarketingSecondaryCTA {
  headline: string;
  paths: {
    label: string;
    description: string;
    href: string;
  }[];
}

export interface ProductMarketingFullFeatureSet {
  headline: string;
  description: string;
  demoedFeatures: {
    headline: string;
    link: {
      text: string;
      href: string;
    };
    features: {
      name: string;
      description: string;
    }[];
  };
  additionalFeatures: {
    headline: string;
    features: {
      name: string;
      description: string;
    }[];
  };
}

export interface ProductMarketingContent {
  slug: string;
  productName: string;
  category: 'consumer' | 'b2b' | 'physical' | 'partnership';
  jtbd: {
    functional: string;
    emotional: string;
    social: string;
  };
  hero: ProductMarketingHero;
  problem: ProductMarketingProblem;
  solution: ProductMarketingSolution;
  proof: ProductMarketingProof;
  cta: ProductMarketingCTA;
  whoItsFor: ProductMarketingWhoItsFor;
  howItWorks: ProductMarketingHowItWorks;
  fullFeatureSet?: ProductMarketingFullFeatureSet;
  secondaryCTAs: ProductMarketingSecondaryCTA;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
