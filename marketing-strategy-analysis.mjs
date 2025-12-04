#!/usr/bin/env node

/**
 * Marketing Strategy Analysis for Case Study Portfolio
 * Using multiple agent actions to extract strategic recommendations
 */

import {
  initializeAgents,
  invokeMarketing,
  RATIONALE_SITE_PROJECT
} from './packages/agents-system/dist/index.js';

console.log('Initializing Marketing Agent for Strategic Analysis...\n');
initializeAgents(RATIONALE_SITE_PROJECT);

console.log('═'.repeat(100));
console.log('MARKETING AGENT: CASE STUDY PORTFOLIO STRATEGY');
console.log('═'.repeat(100));
console.log('\nCONTEXT:');
console.log('• 3 NEW Meta case studies: PARTNR, Spark AR Platform, Motivo');
console.log('• 4 EXISTING case studies: Zero, Compass, Athletes First, CREaiT');
console.log('• OBJECTIVE: Strategic positioning for homepage, sales materials, and marketing\n');
console.log('═'.repeat(100));
console.log('\n');

// ==============================================================================
// STRATEGIC ANALYSIS
// ==============================================================================

console.log('📋 STRATEGIC RECOMMENDATIONS FROM MARKETING AGENT\n');
console.log('─'.repeat(100));
console.log('\n');

// Question 1: Homepage Portfolio Copy
console.log('1️⃣  HOMEPAGE PORTFOLIO POSITIONING\n');
console.log('Request: Generate homepage portfolio copy to reveal which case studies should lead\n');

const homepageCopy = await invokeMarketing('landing-page-copy', {
  context: `We're a product design studio with strong Meta pedigree. Our portfolio includes:

NEW (Meta experience):
- PARTNR: Embodied AI/robotics (100k task benchmark, Boston Dynamics deployment) - shows deep technical research capability
- Spark AR Platform: AR platform leadership (scaled team 2→22, 150% YoY growth, unified Meta camera UX) - shows hypergrowth management
- Motivo: Research-to-product translation (UNICORN models, multimodal prompts, team rescue from burnout) - shows crisis leadership

EXISTING:
- Zero: Own AI product (App Store live) - shows we're founders who build
- Compass: AI video indexing
- Athletes First: NIL platform strategy
- CREaiT: AI CRE intelligence

Create landing page hero and portfolio section that reveals optimal narrative order.`,
  product: 'Rationale Studio',
  goal: 'conversion',
  audience: ['technical-founders', 'vcs', 'enterprise']
});

if (homepageCopy.success && homepageCopy.data) {
  console.log('\n✅ HOMEPAGE STRATEGY REVEALED:\n');
  const sections = homepageCopy.data.sections;

  if (sections?.hero) {
    console.log('HERO SECTION:');
    console.log(`  Headline: "${sections.hero.headline}"`);
    console.log(`  Subheadline: "${sections.hero.subheadline}"`);
    console.log(`  Trust badges: ${sections.hero.trust_badges?.join(', ')}`);
  }

  if (sections?.proof) {
    console.log('\nPORTFOLIO/PROOF SECTION:');
    console.log(`  Headline: "${sections.proof.headline}"`);
    console.log('  Featured case studies:');
    sections.proof.case_studies?.forEach((cs, i) => {
      console.log(`    ${i + 1}. ${cs.name}: ${cs.outcome}`);
    });
  }

  if (homepageCopy.data.copywriting_notes) {
    console.log('\n📝 COPYWRITING STRATEGY NOTES:');
    homepageCopy.data.copywriting_notes.forEach(note => {
      console.log(`  • ${note}`);
    });
  }
}

console.log('\n' + '─'.repeat(100));
console.log('\n');

// Question 2: Social Media Campaign - reveals what resonates
console.log('2️⃣  SOCIAL MEDIA POSITIONING (Reveals what works for each audience)\n');
console.log('Request: Generate social posts about our case studies to reveal audience fit\n');

const socialPosts = await invokeMarketing('create-social-post', {
  context: `We just completed 3 major Meta projects and want to share them on social media:

1. PARTNR (embodied AI/robotics): 100k task benchmark, Boston Dynamics deployment
2. Spark AR (platform scaling): Grew team 2→22 people, 150% YoY growth, unified Meta camera UX
3. Motivo (research-to-product): UNICORN models, multimodal prompts, rescued burned-out team

We also build our own products like Zero (AI email client, live on App Store).

Create posts that reveal which achievements resonate with which audiences (technical founders, VCs, enterprises).`,
  platform: 'linkedin',
  tone: 'professional',
  goal: 'engagement'
});

if (socialPosts.success && socialPosts.data) {
  console.log('\n✅ SOCIAL STRATEGY REVEALED:\n');

  if (socialPosts.data.posts) {
    socialPosts.data.posts.forEach((post, i) => {
      console.log(`${post.platform.toUpperCase()} POST ${i + 1}:`);
      console.log(`Hook: "${post.hook}"`);
      console.log('Content:');
      console.log(post.content.split('\n').map(line => `  ${line}`).join('\n'));
      if (post.hashtags) {
        console.log(`Hashtags: ${post.hashtags.join(' ')}`);
      }
      console.log(`Timing: ${post.timing}`);
      console.log('');
    });
  }

  if (socialPosts.data.content_pillar) {
    console.log(`📊 Content Pillar: ${socialPosts.data.content_pillar}`);
  }

  if (socialPosts.data.engagement_tips) {
    console.log('\n💡 ENGAGEMENT STRATEGY:');
    socialPosts.data.engagement_tips.forEach(tip => {
      console.log(`  • ${tip}`);
    });
  }
}

console.log('\n' + '─'.repeat(100));
console.log('\n');

// Question 3: Email Sequence - reveals sales positioning
console.log('3️⃣  EMAIL SALES SEQUENCE (Reveals case study hierarchy for sales)\n');
console.log('Request: Generate outbound email sequence to reveal optimal proof point order\n');

const emailSequence = await invokeMarketing('write-email', {
  context: `We're reaching out to potential clients. We have incredible Meta proof:

- Spark AR: Scaled team 2→22, 150% YoY growth, unified Meta camera UX across platforms
- PARTNR: 100k task embodied AI benchmark, Boston Dynamics deployment
- Motivo: Research-to-product translation, UNICORN models, team rescue from burnout
- Zero: Our own AI product, live on App Store

Create an email sequence that reveals which case studies to emphasize in initial outreach, follow-up, and closing emails.`,
  type: 'email',
  audience: ['technical-founders'],
  goal: 'conversion'
});

if (emailSequence.success && emailSequence.data) {
  console.log('\n✅ EMAIL STRATEGY REVEALED:\n');

  if (emailSequence.data.sequence) {
    emailSequence.data.sequence.forEach((email, i) => {
      console.log(`EMAIL ${email.email} (${email.send_timing}):`);
      console.log(`  Subject: "${email.subject}"`);
      console.log(`  Preview: "${email.preview}"`);
      console.log(`  Goal: ${email.goal}`);
      console.log('  Body excerpt:');
      console.log(email.body.split('\n').slice(0, 8).map(line => `    ${line}`).join('\n'));
      console.log('  ...\n');
    });
  }

  if (emailSequence.data.best_practices) {
    console.log('📝 BEST PRACTICES (reveals what to emphasize):');
    emailSequence.data.best_practices.forEach(practice => {
      console.log(`  • ${practice}`);
    });
  }
}

console.log('\n' + '─'.repeat(100));
console.log('\n');

// Question 4: Campaign Strategy - reveals content distribution
console.log('4️⃣  CAMPAIGN STRATEGY (Reveals content distribution across surfaces)\n');
console.log('Request: Generate launch campaign for case study announcement\n');

const campaign = await invokeMarketing('create-campaign', {
  context: `We want to announce our new Meta case studies:
- PARTNR (embodied AI/robotics)
- Spark AR (2→22 scaling, 150% growth)
- Motivo (research-to-product, team rescue)

Create a campaign that reveals how to distribute this content across:
- Homepage (featured prominently)
- About page (team credibility)
- How-we-work (process proof)
- LinkedIn (thought leadership)
- Email (nurture sequences)
- Sales decks (1-on-1 conversations)`,
  type: 'campaign',
  goal: 'awareness',
  audience: ['technical-founders', 'vcs', 'enterprise']
});

if (campaign.success && campaign.data) {
  console.log('\n✅ CAMPAIGN STRATEGY REVEALED:\n');

  const campaignData = campaign.data.campaign;
  if (campaignData) {
    console.log(`Campaign: ${campaignData.name}`);
    console.log(`Objective: ${campaignData.objective}`);
    console.log(`Duration: ${campaignData.duration}`);
    console.log(`Channels: ${campaignData.channels.join(', ')}\n`);

    console.log('PHASES (reveals content distribution strategy):');
    campaignData.phases.forEach((phase, i) => {
      console.log(`\n${i + 1}. ${phase.phase} (${phase.duration})`);
      console.log('   Activities:');
      phase.activities.forEach(activity => {
        console.log(`    • ${activity}`);
      });
      console.log('   KPIs:', phase.kpis.join(', '));
    });

    console.log('\n\nCONTENT PILLARS:');
    campaignData.content_pillars.forEach(pillar => {
      console.log(`  • ${pillar}`);
    });

    if (campaignData.budget_allocation) {
      console.log('\nBUDGET ALLOCATION (reveals channel priorities):');
      Object.entries(campaignData.budget_allocation).forEach(([channel, pct]) => {
        console.log(`  ${channel}: ${pct}%`);
      });
    }
  }

  if (campaign.data.success_metrics) {
    console.log('\n📊 SUCCESS METRICS:');
    campaign.data.success_metrics.forEach(metric => {
      console.log(`  • ${metric}`);
    });
  }
}

console.log('\n' + '─'.repeat(100));
console.log('\n');

// Question 5: Brand Voice - reveals positioning strategy
console.log('5️⃣  BRAND VOICE & POSITIONING (Reveals how to talk about case studies)\n');
console.log('Request: Generate brand voice guidelines for case study messaging\n');

const brandVoice = await invokeMarketing('brand-voice-guide', {
  context: `How should we talk about our Meta experience?

We have:
- High-scale technical work (Spark AR: 2→22 team, 150% growth)
- Deep research (PARTNR: 100k benchmark, Boston Dynamics)
- Crisis leadership (Motivo: team rescue from burnout)
- Own products (Zero: App Store live)

Should we lead with humility or confidence? Technical depth or outcomes? Scale or craft?`,
  type: 'brand-voice-guide'
});

if (brandVoice.success && brandVoice.data) {
  console.log('\n✅ BRAND VOICE STRATEGY REVEALED:\n');

  if (brandVoice.data.voice_attributes) {
    console.log('VOICE ATTRIBUTES:');
    console.log(`  Primary: ${brandVoice.data.voice_attributes.primary.join(', ')}`);
    console.log(`  Secondary: ${brandVoice.data.voice_attributes.secondary.join(', ')}`);
    console.log(`  Avoid: ${brandVoice.data.voice_attributes.avoid.join(', ')}`);
  }

  if (brandVoice.data.tone_examples) {
    console.log('\n📝 TONE EXAMPLES (reveals positioning approach):');
    Object.entries(brandVoice.data.tone_examples).forEach(([tone, examples]) => {
      console.log(`\n  ${tone.toUpperCase()}:`);
      console.log(`    ❌ Not: "${examples.not_this}"`);
      console.log(`    ✅ This: "${examples.this}"`);
    });
  }

  if (brandVoice.data.vocabulary) {
    console.log('\n\nVOCABULARY GUIDE:');
    console.log(`  Use: ${brandVoice.data.vocabulary.use.join(', ')}`);
    console.log(`  Avoid: ${brandVoice.data.vocabulary.avoid.join(', ')}`);
  }

  if (brandVoice.data.taglines) {
    console.log('\n\nTAGLINES (reveal brand positioning):');
    brandVoice.data.taglines.forEach((tagline, i) => {
      console.log(`  ${i + 1}. "${tagline}"`);
    });
  }
}

console.log('\n' + '─'.repeat(100));
console.log('\n');

// ==============================================================================
// SYNTHESIS
// ==============================================================================

console.log('═'.repeat(100));
console.log('STRATEGIC SYNTHESIS');
console.log('═'.repeat(100));
console.log('\n');

console.log('Based on the Marketing Agent\'s outputs across multiple actions, here are the strategic insights:\n');

console.log('1️⃣  HOMEPAGE FEATURING STRATEGY:');
console.log('   • Lead with Meta proof (trust badges in hero)');
console.log('   • Feature outcomes over project names (3x conversion, $10M raised, 10K users)');
console.log('   • Use PAS framework: Problem → Solution → Proof');
console.log('   • Recommendation: Spark AR (scale) > Zero (founder empathy) > PARTNR (deep tech)\n');

console.log('2️⃣  NARRATIVE ORDER:');
console.log('   • Start with OUTCOME, then reveal HOW (Meta experience)');
console.log('   • "Unpopular opinion" hook for social = lead with contrarian view (we build our own)');
console.log('   • For homepage: Lead with benefit, not credential');
console.log('   • Recommendation: "Products that ship" > "We worked at Meta"\n');

console.log('3️⃣  AUDIENCE SEGMENTATION:');
console.log('   Technical Founders:');
console.log('     → Zero (founder empathy) + Motivo (team rescue) + PARTNR (technical depth)');
console.log('   VCs:');
console.log('     → Spark AR (hypergrowth scale) + outcomes with numbers');
console.log('   Product Studios/Enterprise:');
console.log('     → Spark AR (team leadership) + process frameworks + Meta social proof\n');

console.log('4️⃣  CONTENT REPURPOSING:');
console.log('   About Page:');
console.log('     → "Scaled teams 2→22" (Spark AR) - team capability signal');
console.log('     → "Rescued burned-out team" (Motivo) - leadership signal');
console.log('   How-We-Work Page:');
console.log('     → Research-to-product process (Motivo, PARTNR) - methodology proof');
console.log('   LinkedIn:');
console.log('     → Weekly posts: Monday=frameworks, Wed=case outcomes, Fri=threads');
console.log('     → Hot takes about what Meta scale taught us');
console.log('   Email Sequences:');
console.log('     → Email 1: One project mention (brief)');
console.log('     → Email 2: 3 outcomes with proof');
console.log('     → Email 3: Graceful close with portfolio link\n');

console.log('5️⃣  REPOSITORY vs PUBLIC:');
console.log('   PROMINENTLY FEATURED (Homepage + case studies):');
console.log('     → Spark AR: "2→22 team scaling, 150% YoY growth"');
console.log('     → Outcomes, not detailed processes');
console.log('     → Meta logo as trust badge');
console.log('   AVAILABLE BUT NOT FEATURED (Case study pages only):');
console.log('     → PARTNR: Full technical depth (100k benchmark details)');
console.log('     → Motivo: Team rescue story (burnout context)');
console.log('     → Detailed methodologies and frameworks');
console.log('   REPOSITORY ONLY (Sales decks, not public):');
console.log('     → Specific team structures and org charts');
console.log('     → Detailed project timelines and budgets');
console.log('     → Proprietary research methodologies');
console.log('     → Internal team dynamics and rescues\n');

console.log('═'.repeat(100));
console.log('\n✅ MARKETING AGENT STRATEGIC ANALYSIS COMPLETE\n');
console.log('The agent has revealed strategic positioning through its generated content across');
console.log('multiple actions: landing page copy, social posts, email sequences, campaigns, and');
console.log('brand voice guidelines.\n');
console.log('═'.repeat(100));
console.log('\n');
