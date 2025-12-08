#!/usr/bin/env node

/**
 * Set Custom User Role Script
 *
 * This script sets the role custom claim for a Firebase user.
 * Usage: node scripts/set-user-role.js <email> <role>
 *
 * Example:
 *   node scripts/set-user-role.js matt@rationale.work owner
 */

import { getAdminAuth } from '../lib/auth/firebase-admin.ts';

async function setUserRole(email, role) {
  const validRoles = ['owner', 'team', 'partner', 'investor'];

  if (!validRoles.includes(role)) {
    console.error(`❌ Invalid role: ${role}`);
    console.error(`Valid roles: ${validRoles.join(', ')}`);
    process.exit(1);
  }

  try {
    console.log('🔍 Looking up user...');
    const auth = getAdminAuth();
    const user = await auth.getUserByEmail(email);

    console.log(`✅ Found user: ${user.email} (UID: ${user.uid})`);
    console.log(`📝 Setting role to: ${role}`);

    await auth.setCustomUserClaims(user.uid, { role });

    console.log(`✅ Successfully set role to "${role}" for ${email}`);
    console.log('');
    console.log('⚠️  Important: User must sign out and sign in again for changes to take effect.');
    console.log('');

    // Verify the claims were set
    const updatedUser = await auth.getUser(user.uid);
    console.log('Current custom claims:', updatedUser.customClaims);

  } catch (error) {
    console.error('❌ Error setting user role:', error.message);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: node scripts/set-user-role.js <email> <role>');
  console.error('');
  console.error('Valid roles: owner, team, partner, investor');
  console.error('');
  console.error('Example:');
  console.error('  node scripts/set-user-role.js matt@rationale.work owner');
  process.exit(1);
}

const [email, role] = args;

setUserRole(email, role);
