#!/usr/bin/env node

/**
 * Create Client User Script
 *
 * This script creates a client Firebase user with custom claims for client portal access.
 * Usage: node scripts/create-client-user.mjs <email> <password> <clientId>
 *
 * Example:
 *   node scripts/create-client-user.mjs athletesfirst@rationale.work halloffame athletes-first
 *   node scripts/create-client-user.mjs creait@rationale.work realestate creait
 *   node scripts/create-client-user.mjs zero@rationale.work zero123 zero
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createClientUser(email, password, clientId) {
  const validClients = ['athletes-first', 'creait', 'zero'];

  if (!validClients.includes(clientId)) {
    console.error(`❌ Invalid clientId: ${clientId}`);
    console.error(`Valid clients: ${validClients.join(', ')}`);
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
      console.log(`📝 Updating custom claims...`);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Create new user
        console.log(`➕ Creating new user: ${email}`);
        user = await auth.createUser({
          email,
          password,
          emailVerified: true, // Pre-verify client emails
        });
        console.log(`✅ User created: ${user.email} (${user.uid})`);
      } else {
        throw error;
      }
    }

    // Set custom claims
    console.log(`📝 Setting custom claims: role=client, clientId=${clientId}`);
    await auth.setCustomUserClaims(user.uid, {
      role: 'client',
      clientId: clientId,
    });
    console.log(`✅ Custom claims set successfully`);

    // Create/update user profile in Firestore
    console.log(`📝 Creating user profile in Firestore...`);
    await db.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      role: 'client',
      clientId: clientId,
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
    console.error('❌ Error creating client user:', error.message);
    if (error.code) {
      console.error(`   Error code: ${error.code}`);
    }
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error('Usage: node scripts/create-client-user.mjs <email> <password> <clientId>');
  console.error('');
  console.error('Valid clientIds: athletes-first, creait, zero');
  console.error('');
  console.error('Examples:');
  console.error('  node scripts/create-client-user.mjs athletesfirst@rationale.work halloffame athletes-first');
  console.error('  node scripts/create-client-user.mjs creait@rationale.work realestate creait');
  console.error('  node scripts/create-client-user.mjs zero@rationale.work zero123 zero');
  process.exit(1);
}

const [email, password, clientId] = args;

createClientUser(email, password, clientId);
