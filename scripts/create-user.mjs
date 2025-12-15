#!/usr/bin/env node

/**
 * Create User Script
 *
 * This script creates a Firebase user with a custom role.
 * Usage: node scripts/create-user.mjs <email> <password> <role>
 *
 * Example:
 *   node scripts/create-user.mjs investor@rationale.work password123 investor
 *   node scripts/create-user.mjs mypeoples@rationale.work password123 partner
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createUser(email, password, role) {
  const validRoles = ['owner', 'team', 'partner', 'investor', 'client'];

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
    const db = getFirestore(app);

    // Check if user already exists
    let user;
    try {
      console.log(`🔍 Checking if user exists: ${email}`);
      user = await auth.getUserByEmail(email);
      console.log(`✅ User already exists: ${user.email} (${user.uid})`);
      console.log(`📝 Updating custom claims and profile...`);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Create new user
        console.log(`➕ Creating new user: ${email}`);
        user = await auth.createUser({
          email,
          password,
          emailVerified: true, // Pre-verify emails
        });
        console.log(`✅ User created: ${user.email} (${user.uid})`);
      } else {
        throw error;
      }
    }

    // Set custom claims
    console.log(`📝 Setting custom claims: role=${role}`);
    await auth.setCustomUserClaims(user.uid, {
      role: role,
    });
    console.log(`✅ Custom claims set successfully`);

    // Create/update user profile in Firestore
    console.log(`📝 Creating user profile in Firestore...`);
    await db.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      role: role,
      createdAt: user.metadata.creationTime ? new Date(user.metadata.creationTime).getTime() : Date.now(),
      lastLogin: Date.now(),
    }, { merge: true });
    console.log(`✅ User profile created/updated in Firestore`);

    // Verify the claims were set
    const updatedUser = await auth.getUser(user.uid);
    console.log('\n✅ User setup complete!');
    console.log('');
    console.log('👤 User Details:');
    console.log(`   Email: ${updatedUser.email}`);
    console.log(`   UID: ${updatedUser.uid}`);
    console.log(`   Custom Claims:`, updatedUser.customClaims);
    console.log('');
    console.log(`🔗 Login URL: http://localhost:3000/clients/login`);
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
    if (error.code) {
      console.error(`   Error code: ${error.code}`);
    }
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error('Usage: node scripts/create-user.mjs <email> <password> <role>');
  console.error('');
  console.error('Valid roles: owner, team, partner, investor, client');
  console.error('');
  console.error('Examples:');
  console.error('  node scripts/create-user.mjs investor@rationale.work mypassword investor');
  console.error('  node scripts/create-user.mjs mypeoples@rationale.work mypassword partner');
  process.exit(1);
}

const [email, password, role] = args;

createUser(email, password, role);
