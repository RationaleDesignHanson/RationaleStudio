#!/usr/bin/env node
/**
 * Create Secure Pitch Link for Creait Strategic Roadmap
 *
 * Generates a time-limited, tracked access link for the Creait CEO
 * to view the strategic roadmap presentation
 */

import { createPitchAccess } from '../lib/pitch/security.js';

async function createCreaitRoadmapAccess() {
  try {
    console.log('Creating secure pitch link for Creait Strategic Roadmap...\n');

    const { token, pitchId, expiresAt } = await createPitchAccess('creait-roadmap', {
      username: null, // No username gate - CEO can access directly
      expiryDays: 14, // 14 days access
      recipientName: 'Creait CEO',
      recipientCompany: 'CREaiT',
      notes: 'Strategic Roadmap presentation - vendor-neutral guidance with 8-slide story, DIY implementation plan, and decision framework',
    });

    const baseUrl = 'https://rationale.work';
    const pitchUrl = `${baseUrl}/pitch/creait-roadmap?token=${token}`;

    console.log('✓ Pitch link created successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('Shareable URL:');
    console.log(`${pitchUrl}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`Pitch ID: ${pitchId}`);
    console.log(`Expires: ${expiresAt.toLocaleDateString()} at ${expiresAt.toLocaleTimeString()}`);
    console.log(`Access Duration: 14 days`);
    console.log(`Username Gate: None (direct access)`);
    console.log(`IP Restrictions: None`);
    console.log('\nYou can track views and manage this link from:');
    console.log('https://rationale.work/owner/outbound\n');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('To share with Creait CEO:');
    console.log('1. Copy the URL above');
    console.log('2. Email with context: "Strategic guidance for CREaiT - vendor-neutral analysis"');
    console.log('3. Note: Link expires in 14 days, you can extend/revoke from dashboard\n');

    return pitchUrl;
  } catch (error) {
    console.error('Error creating pitch link:', error);
    throw error;
  }
}

createCreaitRoadmapAccess()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed to create pitch link:', error);
    process.exit(1);
  });
