#!/usr/bin/env node
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const email = 'investor@rationale.work';
const password = 'InvestorPass2025!';

try {
  // Initialize Firebase Admin
  let app;
  if (getApps().length === 0) {
    const serviceAccountPath = join(__dirname, '..', 'serviceAccountKey.json');
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
    app = initializeApp({
      credential: cert(serviceAccount)
    });
  } else {
    app = getApps()[0];
  }

  const auth = getAuth(app);
  const db = getFirestore(app);

  // Delete existing user
  try {
    const existingUser = await auth.getUserByEmail(email);
    console.log('Found existing user:', existingUser.uid);
    await auth.deleteUser(existingUser.uid);
    console.log('✅ Deleted existing user');
    await db.collection('users').doc(existingUser.uid).delete();
    console.log('✅ Deleted Firestore profile');
  } catch (e) {
    console.log('No existing user found');
  }

  // Create new user
  const user = await auth.createUser({
    email,
    password,
    emailVerified: true
  });
  console.log('✅ Created new user:', user.uid);

  // Set custom claims
  await auth.setCustomUserClaims(user.uid, { role: 'investor' });
  console.log('✅ Set custom claims: role=investor');

  // Create Firestore profile
  await db.collection('users').doc(user.uid).set({
    email,
    role: 'investor',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  console.log('✅ Created Firestore profile');

  console.log('\n👤 Login Credentials:');
  console.log('   Email:', email);
  console.log('   Password:', password);
  console.log('   Role: investor');
  console.log('   URL: http://localhost:3000/clients/login');

  process.exit(0);
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
