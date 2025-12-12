#!/usr/bin/env node
/**
 * Create Firestore user profiles for Firebase Auth users
 * This syncs Firebase Authentication users to Firestore user collection
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(
  readFileSync('/Users/matthanson/rationale-public/serviceAccountKey.json', 'utf8')
);

const app = initializeApp({
  credential: cert(serviceAccount),
});

const auth = getAuth(app);
const db = getFirestore(app);

// User profile definitions
const USER_PROFILES = {
  'hanson@rationale.work': {
    role: 'owner',
    name: 'Matt Hanson',
  },
  'athletesfirst@rationale.design': {
    role: 'client',
    clientId: 'athletes-first',
    name: 'Athletes First',
  },
  'creait@rationale.design': {
    role: 'client',
    clientId: 'creait',
    name: 'Creait',
  },
};

async function createUserProfiles() {
  console.log('🔄 Fetching all Firebase Auth users...\n');

  try {
    // List all users
    const listUsersResult = await auth.listUsers();

    for (const user of listUsersResult.users) {
      const email = user.email;
      const uid = user.uid;

      if (!email) {
        console.log(`⚠️  Skipping user ${uid} (no email)`);
        continue;
      }

      console.log(`📧 Processing: ${email}`);

      // Check if user profile exists in Firestore
      const userDocRef = db.collection('users').doc(uid);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        console.log(`   ✅ Profile already exists`);
        const data = userDoc.data();
        console.log(`      Role: ${data.role}${data.clientId ? `, Client: ${data.clientId}` : ''}`);
      } else {
        // Create profile based on email
        const profileConfig = USER_PROFILES[email];

        if (!profileConfig) {
          console.log(`   ⚠️  No profile config found for ${email}, skipping`);
          continue;
        }

        const profileData = {
          uid,
          email,
          role: profileConfig.role,
          ...(profileConfig.clientId && { clientId: profileConfig.clientId }),
          ...(profileConfig.name && { name: profileConfig.name }),
          createdAt: Date.now(),
          lastLogin: Date.now(),
        };

        await userDocRef.set(profileData);
        console.log(`   ✨ Created profile:`);
        console.log(`      Role: ${profileData.role}${profileData.clientId ? `, Client: ${profileData.clientId}` : ''}`);
        console.log(`      Name: ${profileData.name}`);
      }

      console.log('');
    }

    console.log('✅ All user profiles processed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createUserProfiles();
