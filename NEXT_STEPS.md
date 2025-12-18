# Heirloom - Next Steps

## Social Sharing & Recipe Evolution

### Core Features
- [ ] **Recipe Sharing**
  - Share individual recipes with friends/family
  - Share collections/folders of recipes
  - Generate shareable links (public or private)

- [ ] **Recipe Personalization**
  - Allow recipients to personalize shared recipes
  - Track recipe lineage (Original → Personalized versions)
  - Show "forked from" attribution

- [ ] **Comment Mining**
  - Scrape and parse comments from recipe websites
  - Extract useful tips/modifications from comments
  - Surface best suggestions (e.g., "doubled the garlic," "cooked 10 min longer")
  - Allow users to incorporate comment suggestions into their version

- [ ] **Attribution System**
  - Preserve source attribution (cookbook name, author, website)
  - Display "Originally from [Cookbook/Website]" on recipe cards
  - Handle copyright/licensing considerations
  - Credit original creator when sharing modified versions

## Recipe Scraping Accuracy Improvements

### Current State
- Basic schema.org JSON-LD parsing
- Microdata fallback
- CSS selector fallbacks
- Firestore logging of failures

### Path to 100% Accuracy

#### Phase 1: Data-Driven Analysis (Week 1-2)
- [ ] Query Firestore `failed_recipe_scrapes` collection
- [ ] Identify top 20 failing domains
- [ ] Group failures by error type (cors, parse, network)
- [ ] Calculate current success rate baseline

#### Phase 2: Domain-Specific Parsers (Week 3-4)
- [ ] Build custom parsers for top 5 failing domains
  - allrecipes.com
  - foodnetwork.com
  - (identify others from data)
- [ ] Test parsers against failed URLs
- [ ] Measure accuracy improvement

#### Phase 3: Infrastructure (Week 5-6)
- [ ] Replace allorigins.win proxy with Netlify function
- [ ] Add success tracking to Firestore (`successful_recipe_scrapes`)
- [ ] Track which parser method worked (json-ld, microdata, custom, etc.)
- [ ] Build accuracy dashboard

#### Phase 4: Scale Parsers (Month 2)
- [ ] Add 10 more domain-specific parsers
- [ ] Improve schema.org support (handle @graph arrays, HowTo types)
- [ ] Add regional variations (UK vs US recipe formats)

#### Phase 5: AI Fallback (Month 2-3)
- [ ] Implement Claude API fallback for unparseable sites
- [ ] Use Haiku model (cheap, fast) for extraction
- [ ] Return structured JSON: `{name, servings, ingredientLines}`
- [ ] Track AI parsing cost in Firestore

#### Phase 6: User Feedback Loop (Month 3+)
- [ ] Add "Report Issue" button on scraped recipes
- [ ] Track user-reported issues by URL/domain
- [ ] Surface patterns in reported issues
- [ ] Prioritize parser fixes based on user reports

### Target Accuracy Milestones
- 80% accuracy: Domain parsers for top 20 sites
- 90% accuracy: Better schema.org + 50 domain parsers
- 95% accuracy: AI fallback for edge cases
- 99%+ accuracy: Continuous refinement based on user reports

## Demo Improvements

### Shopping Lab
- [x] Random recipe generation with realistic ingredients
- [x] Fix improper fractions (no more "4/2 cups")
- [x] Use structured ingredient data for units
- [x] Prevent fractions on count-based ingredients like eggs
- [ ] Investigate "from X recipes" not appearing for duplicate recipes

### Dinner Party
- [x] Increase random recipe visibility to 50%
- [x] Make recipes truly random using RandomRecipeGenerator
- [x] Add expandable recipe cards with ingredients
- [x] Generate humorous cooking instructions
- [x] Fix unrealistic quantities (gallons of ginger)
- [x] Add final "Dinner is served!" timeline step
- [x] Add drop shadow to active demo tab

### General
- [x] Add drop shadow under active tab (Shopping Lab / Dinner Party)
- [ ] Mobile responsiveness testing
- [ ] Performance optimization (lazy loading, code splitting)

## Technical Debt
- [ ] Review and clean up background bash processes
- [ ] Audit TypeScript strict mode compliance
- [ ] Optimize bundle size (currently using lazy loading for Shopping Lab)
- [ ] Add error boundaries for demo components

## Documentation
- [ ] API documentation for RecipeScraper
- [ ] Ingredient Database schema documentation
- [ ] Unit conversion system documentation
- [ ] Consolidation algorithm documentation

---

**Last Updated**: 2025-01-17
