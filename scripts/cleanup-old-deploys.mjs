#!/usr/bin/env node

/**
 * Cleanup old Netlify deploys
 * Deletes deploys older than 7 days while keeping the current production deploy
 */

import { execSync } from 'child_process';

const SITE_ID = 'f069779d-cf36-4df2-a4f8-b5fc1f183aa7';
const DAYS_TO_KEEP = 7;
const DRY_RUN = process.argv.includes('--dry-run');

console.log(`🔍 Fetching deploys for site: ${SITE_ID}`);
console.log(`📅 Will delete deploys older than ${DAYS_TO_KEEP} days`);
if (DRY_RUN) {
  console.log('🧪 DRY RUN MODE - No deploys will be deleted\n');
}

try {
  // Get all deploys for the site
  const deploysJson = execSync(
    `netlify api listSiteDeploys --data '{"site_id": "${SITE_ID}"}'`,
    { encoding: 'utf-8' }
  );

  const deploys = JSON.parse(deploysJson);

  if (!Array.isArray(deploys) || deploys.length === 0) {
    console.log('No deploys found.');
    process.exit(0);
  }

  console.log(`📦 Total deploys: ${deploys.length}\n`);

  // Calculate cutoff date (7 days ago)
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - DAYS_TO_KEEP);

  // Filter deploys older than cutoff date
  const oldDeploys = deploys.filter(deploy => {
    const deployDate = new Date(deploy.created_at);
    const isOld = deployDate < cutoffDate;
    const isNotCurrent = deploy.state !== 'ready' || !deploy.published_at;

    // Don't delete current production deploy
    if (deploy.state === 'ready' && deploy.context === 'production') {
      return false;
    }

    return isOld;
  });

  console.log(`🗑️  Deploys to delete: ${oldDeploys.length}`);
  console.log(`✅ Deploys to keep: ${deploys.length - oldDeploys.length}\n`);

  if (oldDeploys.length === 0) {
    console.log('✨ No old deploys to clean up!');
    process.exit(0);
  }

  // Show what will be deleted
  console.log('Deploys that will be deleted:');
  oldDeploys.forEach(deploy => {
    const date = new Date(deploy.created_at).toLocaleString();
    const branch = deploy.branch || 'unknown';
    const context = deploy.context || 'unknown';
    console.log(`  - ${deploy.id.substring(0, 8)}... | ${date} | ${branch} | ${context}`);
  });
  console.log('');

  if (DRY_RUN) {
    console.log('✅ Dry run complete. No deploys were deleted.');
    console.log('To actually delete, run: node scripts/cleanup-old-deploys.mjs');
    process.exit(0);
  }

  // Confirm before deleting
  console.log('⚠️  WARNING: This will permanently delete these deploys.');
  console.log('Press Ctrl+C to cancel, or continue in 5 seconds...\n');

  await new Promise(resolve => setTimeout(resolve, 5000));

  // Delete old deploys
  let deleted = 0;
  let failed = 0;

  for (const deploy of oldDeploys) {
    try {
      console.log(`Deleting ${deploy.id}...`);
      execSync(
        `netlify api deleteDeploy --data '{"deploy_id": "${deploy.id}"}'`,
        { encoding: 'utf-8', stdio: 'pipe' }
      );
      deleted++;
      console.log(`  ✅ Deleted`);
    } catch (error) {
      failed++;
      console.log(`  ❌ Failed: ${error.message}`);
    }
  }

  console.log(`\n✨ Cleanup complete!`);
  console.log(`   Deleted: ${deleted}`);
  console.log(`   Failed: ${failed}`);

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
