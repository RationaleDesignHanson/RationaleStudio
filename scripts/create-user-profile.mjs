#!/usr/bin/env node

/**
 * Create User Profile Script
 *
 * This script creates a Firestore user profile document.
 * Usage: node scripts/create-user-profile.mjs <uid> <email> <role> [name]
 *
 * Example:
 *   node scripts/create-user-profile.mjs aOIBYRp5dETUrEJuDfKJzDoaWNr1 hanson@rationale.work owner "Matt Hanson"
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createUserProfile(uid, email, role, name) {
  const validRoles = ['owner', 'team', 'partner', 'investor'];

  if (!validRoles.includes(role)) {
    console.error(`❌ Invalid role: ${role}`);
    console.error(`Valid roles: ${validRoles.join(', ')}`);
    process.exit(1);
  }

  try {
    // Initialize Firebase Admin if not already initialized
    let app;
    if (getApps().length === 0) {
      console.log('🔧 Initializing Firebase Admin SDK...');

      // Read service account key
      const serviceAccountPath = join(__dirname, '..', 'serviceAccountKey.json');
      const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

      app = initializeApp({
        credential: cert(serviceAccount)
      });

      console.log('✅ Firebase Admin SDK initialized');
    } else {
      app = getApps()[0];
    }

    const db = getFirestore(app);

    console.log(`📝 Creating user profile...`);
    console.log(`   UID: ${uid}`);
    console.log(`   Email: ${email}`);
    console.log(`   Role: ${role}`);
    if (name) {
      console.log(`   Name: ${name}`);
    }

    const profileData = {
      uid,
      email,
      role,
      createdAt: Date.now(),
      lastLogin: Date.now(),
    };

    if (name) {
      profileData.name = name;
    }

    await db.collection('users').doc(uid).set(profileData);

    console.log(`✅ Successfully created user profile for ${email}`);
    console.log('');
    console.log('Profile data:');
    console.log(JSON.stringify(profileData, null, 2));
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating user profile:', error.message);
    if (error.code) {
      console.error(`   Error code: ${error.code}`);
    }
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 3 || args.length > 4) {
  console.error('Usage: node scripts/create-user-profile.mjs <uid> <email> <role> [name]');
  console.error('');
  console.error('Valid roles: owner, team, partner, investor');
  console.error('');
  console.error('Example:');
  console.error('  node scripts/create-user-profile.mjs aOIBYRp5dETUrEJuDfKJzDoaWNr1 hanson@rationale.work owner "Matt Hanson"');
  process.exit(1);
}

const [uid, email, role, name] = args;

createUserProfile(uid, email, role, name);
