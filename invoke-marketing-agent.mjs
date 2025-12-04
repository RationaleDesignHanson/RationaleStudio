#!/usr/bin/env node

/**
 * Direct invocation of Marketing Agent for case study strategy
 *
 * Context: 3 new Meta case studies created
 * - PARTNR (embodied AI/robotics)
 * - Spark AR Platform (AR platform scaling)
 * - Motivo (research-to-product translation)
 */

import {
  initializeAgents,
  invokeMarketing,
  RATIONALE_SITE_PROJECT
} from './packages/agents-system/dist/index.js';

// Initialize the agent system
console.log('Initializing agent system...\n');
initializeAgents(RATIONALE_SITE_PROJECT);

// Strategic context
const context = {
  newCaseStudies: [
    {
      name: 'PARTNR',
      domain: 'Embodied AI/Robotics Research',
      highlights: [
        '100k task benchmark development',
        'Boston Dynamics deployment',
        'Advanced robotics research'
      ],
      signals: ['Meta scale', 'Research depth', 'Real-world deployment']
    },
    {
      name: 'Spark AR Platform',
      domain: 'AR Platform Leadership',
      highlights: [
        'Team scaling: 2→22 people',
        '150% YoY growth',
        'Unified Meta camera UX across platforms'
      ],
      signals: ['Team leadership', 'Hypergrowth', 'Platform thinking', 'Meta scale']
    },
    {
      name: 'Motivo',
      domain: 'Research-to-Product Translation',
      highlights: [
        'UNICORN models development',
        'Multimodal prompts',
        'Team rescue from burnout'
      ],
      signals: ['Research expertise', 'Product translation', 'Team leadership', 'Crisis management']
    }
  ],
  existingCaseStudies: [
    {
      name: 'Zero',
      domain: 'Own AI Product',
      status: 'App Store live',
      signals: ['Founder empathy', 'Own product', 'AI expertise', 'Shipped product']
    },
    {
      name: 'Compass',
      domain: 'AI Video Indexing',
      signals: ['AI/ML', 'Video tech']
    },
    {
      name: 'Athletes First',
      domain: 'NIL Platform Strategy',
      signals: ['Platform strategy', 'Sports tech']
    },
    {
      name: 'CREaiT',
      domain: 'AI CRE Intelligence',
      signals: ['AI/ML', 'Enterprise', 'Real estate tech']
    }
  ],
  audienceSegments: [
    'Technical founders (need credibility + empathy)',
    'VCs (need scale proof + returns potential)',
    'Product studios (need process + team depth)',
    'Enterprise buyers (need Meta-scale proof)'
  ]
};

console.log('📊 CASE STUDY STRATEGY ANALYSIS\n');
console.log('═'.repeat(80));
console.log('\nCONTEXT:');
console.log('- 3 new Meta case studies: PARTNR, Spark AR Platform, Motivo');
console.log('- 4 existing case studies: Zero, Compass, Athletes First, CREaiT');
console.log('- Multiple audience segments to address\n');
console.log('═'.repeat(80));
console.log('\n');

// Question 1: Homepage vs Reserve
console.log('QUESTION 1: Homepage Feature vs Reserve Strategy\n');
console.log('Which of the 3 new case studies should be featured prominently on homepage?');
console.log('Which should be held in reserve?\n');

const q1Result = await invokeMarketing('audit', {
  context: `We have 3 new Meta case studies:

1. PARTNR - Embodied AI/robotics (100k task benchmark, Boston Dynamics deployment)
2. Spark AR Platform - AR platform leadership (2→22 team scaling, 150% YoY growth, unified Meta camera UX)
3. Motivo - Research-to-product (UNICORN models, multimodal prompts, team rescue from burnout)

Existing portfolio: Zero (own product), Compass (AI video), Athletes First (NIL platform), CREaiT (AI CRE)

QUESTION: Which should be featured prominently on homepage portfolio section vs held in reserve for deeper discovery?`,
  type: 'audit',
  audience: ['technical-founders', 'vcs', 'product-studios'],
  goal: 'positioning'
});

console.log('ANALYSIS:');
if (q1Result.success && q1Result.data) {
  console.log('\nRecommendations:', JSON.stringify(q1Result.data.audit?.recommendations || q1Result.data.recommendations || q1Result.reasoning, null, 2));
  if (q1Result.suggestions) {
    console.log('\nSuggestions:', q1Result.suggestions.join('\n- '));
  }
}
console.log('\n' + '─'.repeat(80) + '\n');

// Question 2: Narrative Order
console.log('QUESTION 2: Strategic Narrative Order\n');
console.log('Should we lead with own products (Zero) or Meta scale proof?\n');

const q2Result = await invokeMarketing('audit', {
  context: `Portfolio positioning choice:

Option A: Lead with ZERO (own AI product, App Store live) - shows we're founders who build
Option B: Lead with Meta proof (Spark AR: 2→22 scaling, 150% growth) - shows scale capability
Option C: Lead with research depth (PARTNR: robotics benchmark, Boston Dynamics) - shows technical depth

What's the optimal narrative order for homepage portfolio section?`,
  type: 'audit',
  goal: 'awareness'
});

console.log('ANALYSIS:');
if (q2Result.success && q2Result.data) {
  console.log('\nRecommendations:', JSON.stringify(q2Result.data.audit?.recommendations || q2Result.data.recommendations || q2Result.reasoning, null, 2));
  if (q2Result.suggestions) {
    console.log('\nSuggestions:', q2Result.suggestions.join('\n- '));
  }
}
console.log('\n' + '─'.repeat(80) + '\n');

// Question 3: Audience Segmentation
console.log('QUESTION 3: Audience Segment Matching\n');
console.log('Which case studies work best for which audiences?\n');

const q3Result = await invokeMarketing('audit', {
  context: `Audience segments and case study matching:

AUDIENCES:
1. Technical founders - need credibility + founder empathy
2. VCs - need scale proof + returns potential
3. Product studios - need process depth + team capability
4. Enterprise buyers - need Meta-scale social proof

CASE STUDIES:
- PARTNR (embodied AI/robotics, 100k benchmark, Boston Dynamics)
- Spark AR (2→22 scaling, 150% YoY growth, unified Meta camera)
- Motivo (research-to-product, UNICORN models, team rescue)
- Zero (own AI product, App Store live)
- Compass (AI video indexing)
- Athletes First (NIL platform)
- CREaiT (AI CRE intelligence)

Which case studies should be emphasized for each audience segment?`,
  type: 'audit',
  audience: ['technical-founders', 'vcs', 'product-studios', 'enterprise']
});

console.log('ANALYSIS:');
if (q3Result.success && q3Result.data) {
  console.log('\nRecommendations:', JSON.stringify(q3Result.data.audit?.recommendations || q3Result.data.recommendations || q3Result.reasoning, null, 2));
  if (q3Result.suggestions) {
    console.log('\nSuggestions:', q3Result.suggestions.join('\n- '));
  }
}
console.log('\n' + '─'.repeat(80) + '\n');

// Question 4: Content Repurposing
console.log('QUESTION 4: Content Extraction & Repurposing\n');
console.log('What should be extracted for other marketing surfaces?\n');

const q4Result = await invokeMarketing('content-calendar', {
  context: `We have rich case study content from Meta projects:

PARTNR: Embodied AI, robotics benchmarking, Boston Dynamics partnership
Spark AR: 2→22 team scaling, 150% growth, platform unification
Motivo: Research-to-product translation, UNICORN models, team rescue

What content should we extract and repurpose for:
- About page (team capability signals)
- How-we-work page (process proof points)
- LinkedIn (thought leadership)
- Email sequences (credibility building)`,
  type: 'calendar',
  platform: 'linkedin',
  goal: 'awareness'
});

console.log('ANALYSIS:');
if (q4Result.success && q4Result.data) {
  console.log('\nCalendar:', JSON.stringify(q4Result.data.calendar || q4Result.data, null, 2));
  if (q4Result.suggestions) {
    console.log('\nSuggestions:', q4Result.suggestions.join('\n- '));
  }
}
console.log('\n' + '─'.repeat(80) + '\n');

// Question 5: Repository vs Public
console.log('QUESTION 5: Repository Content vs Public Site\n');
console.log('What should stay in slides/decks but not featured publicly?\n');

const q5Result = await invokeMarketing('audit', {
  context: `Content classification for case studies:

Which aspects should be:
A) PROMINENTLY FEATURED on public site (homepage, case study pages)
B) AVAILABLE but not featured (case study pages only, not homepage)
C) REPOSITORY ONLY (slides/decks for sales, not public site)

Case studies: PARTNR, Spark AR (2→22 scaling, 150% growth), Motivo (team rescue)

Considerations:
- Some details might be too specific/proprietary for public site
- Some achievements better for 1-on-1 sales conversations
- Balance transparency with mystique`,
  type: 'audit',
  goal: 'conversion'
});

console.log('ANALYSIS:');
if (q5Result.success && q5Result.data) {
  console.log('\nRecommendations:', JSON.stringify(q5Result.data.audit?.recommendations || q5Result.data.recommendations || q5Result.reasoning, null, 2));
  if (q5Result.suggestions) {
    console.log('\nSuggestions:', q5Result.suggestions.join('\n- '));
  }
}
console.log('\n' + '─'.repeat(80) + '\n');

// Summary
console.log('═'.repeat(80));
console.log('\n✅ MARKETING AGENT ANALYSIS COMPLETE\n');
console.log('═'.repeat(80));
console.log('\nAll strategic recommendations have been generated above.');
console.log('Review each section for specific guidance on case study positioning.\n');
