#!/usr/bin/env node
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));
const app = initializeApp({ credential: cert(serviceAccount) });

const email = process.argv[2] || 'hanson@rationale.work';
const auth = getAuth(app);
const db = getFirestore(app);

try {
  const user = await auth.getUserByEmail(email);
  console.log('\nUID:', user.uid);
  console.log('Email:', user.email);
  
  const userDoc = await db.collection('users').doc(user.uid).get();
  if (userDoc.exists) {
    const data = userDoc.data();
    console.log('\nFirestore Role:', data.role);
    console.log('Full Profile:', JSON.stringify(data, null, 2));
  } else {
    console.log('\n⚠️  NO FIRESTORE PROFILE');
    console.log('\nCreate with:');
    console.log(`node scripts/create-user-profile.mjs ${user.uid} ${email} owner "Matt Hanson"`);
  }
} catch (e) {
  console.error('Error:', e.message);
}
