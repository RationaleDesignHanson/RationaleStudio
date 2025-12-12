/**
 * Netlify Build Plugin: Firebase Credentials Injector
 *
 * This plugin runs during the build and writes Firebase credentials
 * to a file that Next.js includes in the serverless function bundle.
 */

const fs = require('fs');
const path = require('path');

module.exports = {
  onPreBuild: ({ utils, constants }) => {
    console.log('[Firebase Plugin] Injecting credentials...');

    const base64Creds = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

    if (!base64Creds) {
      utils.build.failBuild('FIREBASE_SERVICE_ACCOUNT_BASE64 not found in environment');
      return;
    }

    // Decode and parse to validate
    try {
      const jsonString = Buffer.from(base64Creds, 'base64').toString('utf-8');
      const creds = JSON.parse(jsonString);

      console.log('[Firebase Plugin] Credentials validated');
      console.log('[Firebase Plugin] Project ID:', creds.project_id);

      // Write to a location Next.js will bundle with API routes
      const outputDir = path.join(constants.BUILD_DIR || process.cwd(), 'app', 'api');
      const outputPath = path.join(outputDir, '.firebase-credentials.json');

      // Ensure directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write credentials file
      fs.writeFileSync(outputPath, JSON.stringify(creds, null, 2));

      console.log('[Firebase Plugin] ✓ Credentials written to app/api/.firebase-credentials.json');
    } catch (error) {
      console.error('[Firebase Plugin] Failed to process credentials:', error);
      utils.build.failBuild(`Firebase credentials invalid: ${error.message}`);
    }
  },
};
