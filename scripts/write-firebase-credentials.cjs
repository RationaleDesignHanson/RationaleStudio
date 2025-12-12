#!/usr/bin/env node

/**
 * Build-time script to write Firebase Admin SDK credentials to a file
 * This ensures the credentials are available to serverless functions
 */

const fs = require('fs');
const path = require('path');

const firebaseCredentials = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  // Decode base64 private key
  private_key: process.env.FIREBASE_PRIVATE_KEY
    ? Buffer.from(process.env.FIREBASE_PRIVATE_KEY, 'base64').toString('utf-8')
    : undefined,
};

// Validate all credentials are present
if (!firebaseCredentials.project_id || !firebaseCredentials.client_email || !firebaseCredentials.private_key) {
  console.error('[Build] Firebase Admin SDK credentials not found in environment');
  console.error({
    hasProjectId: !!firebaseCredentials.project_id,
    hasClientEmail: !!firebaseCredentials.client_email,
    hasPrivateKey: !!firebaseCredentials.private_key,
  });
  process.exit(1);
}

// Write to .firebase-credentials.json in project root
const outputPath = path.join(__dirname, '..', '.firebase-credentials.json');
fs.writeFileSync(outputPath, JSON.stringify(firebaseCredentials, null, 2));

console.log('[Build] Firebase Admin SDK credentials written to .firebase-credentials.json');
console.log('[Build] Project ID:', firebaseCredentials.project_id);
