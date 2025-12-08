#!/usr/bin/env node

/**
 * Set Custom User Role Script
 *
 * This script sets the role custom claim for a Firebase user.
 * Usage: node scripts/set-user-role.mjs <email> <role>
 *
 * Example:
 *   node scripts/set-user-role.mjs hanson@rationale.work owner
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setUserRole(email, role) {
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

    const auth = getAuth(app);

    console.log(`🔍 Looking up user: ${email}`);
    const user = await auth.getUserByEmail(email);

    console.log(`✅ Found user: ${user.email}`);
    console.log(`   UID: ${user.uid}`);
    console.log(`📝 Setting role to: ${role}`);

    await auth.setCustomUserClaims(user.uid, { role });

    console.log(`✅ Successfully set role to "${role}" for ${email}`);
    console.log('');
    console.log('⚠️  Important: User must sign out and sign in again for changes to take effect.');
    console.log('');

    // Verify the claims were set
    const updatedUser = await auth.getUser(user.uid);
    console.log('✅ Current custom claims:', updatedUser.customClaims);
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting user role:', error.message);
    if (error.code) {
      console.error(`   Error code: ${error.code}`);
    }
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: node scripts/set-user-role.mjs <email> <role>');
  console.error('');
  console.error('Valid roles: owner, team, partner, investor');
  console.error('');
  console.error('Example:');
  console.error('  node scripts/set-user-role.mjs hanson@rationale.work owner');
  process.exit(1);
}

const [email, role] = args;

setUserRole(email, role);
