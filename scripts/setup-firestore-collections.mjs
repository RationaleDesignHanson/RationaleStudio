#!/usr/bin/env node

/**
 * Firestore Collections Setup Script
 *
 * Creates the following collections for the outbound pitch system:
 * - outbound_pitches: Track pitch pages and their security settings
 * - pitch_analytics: Track views and engagement on pitch pages
 * - integration_links: Centralized external link management
 *
 * Usage:
 *   node scripts/setup-firestore-collections.mjs
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Initialize Firebase Admin SDK
function initFirebase() {
  if (getApps().length > 0) {
    return getFirestore();
  }

  const serviceAccountPath = join(projectRoot, 'serviceAccountKey.json');

  try {
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

    initializeApp({
      credential: cert(serviceAccount)
    });

    console.log('✅ Firebase Admin SDK initialized');
    return getFirestore();
  } catch (error) {
    console.error('❌ Error initializing Firebase:', error.message);
    console.log('\n📝 Make sure serviceAccountKey.json exists in project root');
    process.exit(1);
  }
}

// Create sample pitch for demonstration
async function createSamplePitch(db) {
  console.log('\n📄 Creating sample pitch...');

  const pitchData = {
    companySlug: 'gannett-demo',
    companyName: 'Gannett Media (Demo)',
    industry: 'Media & Publishing',
    problem: '300+ local newsrooms struggling with poor digital search and content discovery',
    solution: 'Compass AI-powered content intelligence and search',
    productOffered: 'compass',
    status: 'draft',

    // Security settings
    shareToken: 'demo-token-12345',
    shareUrl: 'http://localhost:3000/pitch/gannett-demo?t=demo-token-12345',
    requireUsername: true,
    allowedUsername: 'gannett-exec',
    expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
    maxExpiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000), // Hard limit: 30 days

    // Analytics
    viewCount: 0,
    lastViewed: null,
    ipAddresses: [],
    revokedIps: [],

    // Owner info
    ownerUid: 'aOIBYRp5dETUrEJuDfKJzDoaWNr1',
    ownerNotes: 'Demo pitch for testing outbound system',

    // Metadata
    createdAt: Date.now(),
    lastUpdated: Date.now(),
    sentAt: null,
    respondedAt: null,
    revoked: false,
    archived: false
  };

  try {
    const docRef = await db.collection('outbound_pitches').add(pitchData);
    console.log(`✅ Sample pitch created: ${docRef.id}`);
    console.log(`   Share URL: ${pitchData.shareUrl}`);
    console.log(`   Username: ${pitchData.allowedUsername}`);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating sample pitch:', error.message);
  }
}

// Create sample integration links
async function createSampleIntegrationLinks(db) {
  console.log('\n🔗 Creating sample integration links...');

  const links = [
    {
      category: 'github',
      label: 'Rationale Public Repository',
      url: 'https://github.com/rationaledesigns/rationale-public',
      portalAccess: ['owner', 'team'],
      active: true,
      createdAt: Date.now(),
      lastChecked: Date.now(),
      status: 'active'
    },
    {
      category: 'figma',
      label: 'Design System',
      url: 'https://figma.com/design/YOUR_FILE_KEY',
      portalAccess: ['owner', 'team'],
      active: true,
      createdAt: Date.now(),
      lastChecked: Date.now(),
      status: 'active'
    },
    {
      category: 'notion',
      label: 'Company Documentation',
      url: 'https://notion.so/rationaledesigns',
      portalAccess: ['owner', 'team'],
      active: true,
      createdAt: Date.now(),
      lastChecked: Date.now(),
      status: 'active'
    },
    {
      category: 'linear',
      label: 'Project Board',
      url: 'https://linear.app/rationale',
      portalAccess: ['owner', 'team'],
      active: true,
      createdAt: Date.now(),
      lastChecked: Date.now(),
      status: 'active'
    }
  ];

  try {
    let count = 0;
    for (const link of links) {
      await db.collection('integration_links').add(link);
      count++;
    }
    console.log(`✅ Created ${count} integration links`);
  } catch (error) {
    console.error('❌ Error creating integration links:', error.message);
  }
}

// Print security rules to add to Firebase Console
function printSecurityRules() {
  console.log('\n📋 Firestore Security Rules to Add:');
  console.log('═'.repeat(70));
  console.log(`
// Add these rules to your Firestore Security Rules in Firebase Console:
// Firebase Console > Firestore Database > Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // User profiles (existing rule)
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Outbound pitches - Owner only
    match /outbound_pitches/{pitchId} {
      allow read, write: if request.auth != null &&
                            request.auth.token.role == 'owner';
    }

    // Pitch analytics - Owner read, system write (unauthenticated tracking)
    match /pitch_analytics/{analyticsId} {
      allow read: if request.auth != null &&
                     request.auth.token.role == 'owner';
      allow create: if true;  // Allow unauthenticated tracking
      allow update, delete: if request.auth != null &&
                              request.auth.token.role == 'owner';
    }

    // Integration links - Owner write, authenticated users read
    match /integration_links/{linkId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
                      request.auth.token.role == 'owner';
    }

    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
`);
  console.log('═'.repeat(70));
}

// Main execution
async function main() {
  console.log('🚀 Firestore Collections Setup');
  console.log('═'.repeat(70));

  const db = initFirebase();

  // Create sample data
  await createSamplePitch(db);
  await createSampleIntegrationLinks(db);

  // Print security rules
  printSecurityRules();

  console.log('\n✅ Firestore collections setup complete!');
  console.log('\n📌 Next Steps:');
  console.log('1. Copy the security rules above');
  console.log('2. Go to Firebase Console > Firestore Database > Rules');
  console.log('3. Paste the rules and publish');
  console.log('4. Test the pitch system at: http://localhost:3000/owner/outbound');

  process.exit(0);
}

main().catch(error => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
});
