/**
 * Pitch Templates for Different Verticals
 *
 * Reusable pitch structures for various industries and company types
 * Based on Rationale's product studio positioning and dual-engine model
 */

export interface PitchTemplate {
  vertical: string;
  targetCompany: string;
  hook: string;
  problem: string;
  solution: string;
  cta: string;
  emailSubject: string;
}

/**
 * Enterprise SaaS Template
 */
export const enterpriseSaaSTemplate: PitchTemplate = {
  vertical: "Enterprise SaaS",
  targetCompany: "[Company Name]",
  hook: "[Company]'s AI integration needs systematic execution. Most studios bolt AI on as afterthought.",
  problem: "Enterprise SaaS companies bolt AI onto products as features. This creates weak differentiation and inconsistent accuracy.",
  solution: "We build AI-powered products using Kits methodology: Discovery Sprint, Prototype Kit, Production Kit. Built Zero from concept to App Store in 1 month.",
  cta: "30-minute call to explore if our Kits methodology could accelerate [Company]'s AI roadmap?",
  emailSubject: "AI acceleration for [Company]"
};

/**
 * Healthcare/MedTech Template
 */
export const healthcareMedTechTemplate: PitchTemplate = {
  vertical: "Healthcare/MedTech",
  targetCompany: "[Company Name]",
  hook: "[Company] is improving patient outcomes. Healthcare AI requires validation rigor most studios cannot provide.",
  problem: "Healthcare AI fails when accuracy is not validated systematically. HIPAA compliance and clinical validation are table stakes.",
  solution: "We build healthcare AI with systematic validation: accuracy baselines, progressive cohort rollout, go/no-go checkpoints with clinical metrics.",
  cta: "30-minute call to discuss systematic AI validation for [Company]?",
  emailSubject: "Systematic AI validation for [Company]"
};

/**
 * Fintech Template
 */
export const fintechTemplate: PitchTemplate = {
  vertical: "Fintech",
  targetCompany: "[Company Name]",
  hook: "[Company] is building trust in finance. Fintech AI failures are public, expensive, and regulated.",
  problem: "Fintech AI has zero tolerance for errors. Regulatory compliance plus explainability requirements plus accuracy standards make this harder than consumer AI.",
  solution: "We build fintech AI with compliance-first design: explainable architectures, audit trails, progressive validation, regulatory compliance built in.",
  cta: "30-minute call to discuss systematic AI development for regulated fintech?",
  emailSubject: "Compliant AI for [Company]"
};

/**
 * E-commerce/Retail Template
 */
export const ecommerceRetailTemplate: PitchTemplate = {
  vertical: "E-commerce/Retail",
  targetCompany: "[Company Name]",
  hook: "[Company]'s customer data has untapped intelligence. AI could increase conversions if it understands real shopping behavior.",
  problem: "Most e-commerce AI recommends based on category similarity. Recommendations feel generic, conversion lift is marginal.",
  solution: "We build shopping AI that understands intent, not just categories. Same methodology as Zero: systematic classification with high accuracy.",
  cta: "30-minute call to explore intent-based AI for [Company]?",
  emailSubject: "Intent-based AI for [Company]"
};

/**
 * B2B Marketplace Template
 */
export const b2bMarketplaceTemplate: PitchTemplate = {
  vertical: "B2B Marketplace",
  targetCompany: "[Company Name]",
  hook: "[Company] connects buyers and sellers. B2B matching requires understanding nuanced business requirements, not keyword overlap.",
  problem: "B2B marketplace matching fails when AI treats businesses like consumers. Requirements are complex, bad matches waste sales time.",
  solution: "We build B2B matching AI with domain intelligence: intent classification beyond keywords, context understanding, quality scoring.",
  cta: "30-minute call to explore intelligent matching for [Company]?",
  emailSubject: "Intelligent B2B matching for [Company]"
};

/**
 * All templates exported as map
 */
export const pitchTemplates: Record<string, PitchTemplate> = {
  "enterprise-saas": enterpriseSaaSTemplate,
  "healthcare-medtech": healthcareMedTechTemplate,
  "fintech": fintechTemplate,
  "ecommerce-retail": ecommerceRetailTemplate,
  "b2b-marketplace": b2bMarketplaceTemplate
};

/**
 * Select template by vertical
 */
export function selectTemplate(vertical: string): PitchTemplate | null {
  return pitchTemplates[vertical] || null;
}

/**
 * Personalize pitch with replacements
 */
export function personalizePitch(
  template: PitchTemplate,
  replacements: Record<string, string>
): PitchTemplate {
  const replaceText = (text: string): string => {
    let result = text;
    for (const [key, value] of Object.entries(replacements)) {
      result = result.replace(new RegExp(`\\[${key}\\]`, "g"), value);
    }
    return result;
  };

  return {
    ...template,
    targetCompany: replaceText(template.targetCompany),
    hook: replaceText(template.hook),
    problem: replaceText(template.problem),
    solution: replaceText(template.solution),
    cta: replaceText(template.cta),
    emailSubject: replaceText(template.emailSubject)
  };
}
