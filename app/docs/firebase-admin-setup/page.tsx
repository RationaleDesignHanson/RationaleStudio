/**
 * Firebase Admin Setup Documentation
 *
 * Documentation page for Firebase Admin SDK setup and configuration
 * Replaces markdown file link from team admin page
 */

'use client';

import Link from 'next/link';
import { Container } from '@/components/layout';
import { FileText, AlertCircle, CheckCircle, Terminal, Key, Shield } from 'lucide-react';

export default function FirebaseAdminSetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <Container>
        <div className="py-12 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/team/admin"
              className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors mb-4 inline-block"
            >
              ← Back to Admin
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-[#FFD700]" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Firebase Admin SDK Setup
              </h1>
            </div>
            <p className="text-lg text-gray-400">
              Complete guide to setting up Firebase Admin SDK for Rationale Studio
            </p>
          </div>

          {/* Prerequisites */}
          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg mb-8">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Prerequisites</h2>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Firebase project created (rationale-studio or zero-studio)</li>
                  <li>• Firebase CLI installed: <code className="px-2 py-1 bg-black/50 rounded text-[#FFD700]">npm install -g firebase-tools</code></li>
                  <li>• Node.js 18+ installed</li>
                  <li>• Owner role access to Firebase Console</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 1: Generate Service Account */}
          <div className="p-6 bg-gray-900/30 border border-gray-800 rounded-lg mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-[#FFD700]/10 rounded-lg">
                <Key className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-3">Step 1: Generate Service Account Key</h3>

                <ol className="space-y-4 text-sm text-gray-400">
                  <li>
                    <span className="text-white font-medium">1. Open Firebase Console:</span>
                    <br />
                    Navigate to <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] hover:underline">console.firebase.google.com</a>
                  </li>
                  <li>
                    <span className="text-white font-medium">2. Select Your Project:</span>
                    <br />
                    Choose the Rationale Studio project
                  </li>
                  <li>
                    <span className="text-white font-medium">3. Go to Project Settings:</span>
                    <br />
                    Click the gear icon → Project settings
                  </li>
                  <li>
                    <span className="text-white font-medium">4. Navigate to Service Accounts:</span>
                    <br />
                    Click "Service accounts" tab
                  </li>
                  <li>
                    <span className="text-white font-medium">5. Generate New Private Key:</span>
                    <br />
                    Click "Generate new private key" → Confirm
                  </li>
                  <li>
                    <span className="text-white font-medium">6. Save the JSON File:</span>
                    <br />
                    A JSON file will download - save it securely as <code className="px-2 py-1 bg-black/50 rounded text-[#FFD700]">firebase-admin-key.json</code>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Step 2: Add to Environment Variables */}
          <div className="p-6 bg-gray-900/30 border border-gray-800 rounded-lg mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-[#FFD700]/10 rounded-lg">
                <Terminal className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-3">Step 2: Configure Environment Variables</h3>

                <div className="space-y-4 text-sm">
                  <p className="text-gray-400">
                    Convert the downloaded JSON to a base64 string for secure storage in environment variables:
                  </p>

                  <div className="p-4 bg-black/50 rounded border border-gray-700 overflow-x-auto">
                    <code className="text-[#FFD700] text-xs">
                      # Convert JSON to base64 (macOS/Linux)<br />
                      cat firebase-admin-key.json | base64 &gt; firebase-admin-key.base64<br />
                      <br />
                      # Or use this one-liner:<br />
                      cat firebase-admin-key.json | base64 | tr -d '\n' &gt; firebase-admin-key.base64
                    </code>
                  </div>

                  <p className="text-gray-400">
                    Add the base64 string to your <code className="px-2 py-1 bg-black/50 rounded text-[#FFD700]">.env.local</code> file:
                  </p>

                  <div className="p-4 bg-black/50 rounded border border-gray-700 overflow-x-auto">
                    <code className="text-[#FFD700] text-xs">
                      FIREBASE_ADMIN_KEY_BASE64=your_base64_encoded_json_here
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Initialize in Code */}
          <div className="p-6 bg-gray-900/30 border border-gray-800 rounded-lg mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-[#FFD700]/10 rounded-lg">
                <Shield className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-3">Step 3: Initialize Firebase Admin SDK</h3>

                <div className="space-y-4 text-sm">
                  <p className="text-gray-400">
                    The Firebase Admin SDK is already initialized in <code className="px-2 py-1 bg-black/50 rounded text-[#FFD700]">/lib/firebase/admin.ts</code>
                  </p>

                  <div className="p-4 bg-black/50 rounded border border-gray-700 overflow-x-auto">
                    <code className="text-[#FFD700] text-xs">
                      {`import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    Buffer.from(
      process.env.FIREBASE_ADMIN_KEY_BASE64 || '',
      'base64'
    ).toString('utf-8')
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Deploy to Production */}
          <div className="p-6 bg-gray-900/30 border border-gray-800 rounded-lg mb-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-[#FFD700]/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-3">Step 4: Deploy to Production (Netlify)</h3>

                <ol className="space-y-3 text-sm text-gray-400">
                  <li>
                    <span className="text-white font-medium">1. Open Netlify Dashboard:</span>
                    <br />
                    Go to your site → Site settings → Environment variables
                  </li>
                  <li>
                    <span className="text-white font-medium">2. Add Environment Variable:</span>
                    <br />
                    Key: <code className="px-2 py-1 bg-black/50 rounded text-[#FFD700]">FIREBASE_ADMIN_KEY_BASE64</code>
                    <br />
                    Value: Paste your base64 string (without quotes or line breaks)
                  </li>
                  <li>
                    <span className="text-white font-medium">3. Redeploy Site:</span>
                    <br />
                    Trigger a new deployment for changes to take effect
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Security Best Practices */}
          <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-yellow-200 mb-3">Security Best Practices</h3>
                <ul className="space-y-2 text-sm text-yellow-100/80">
                  <li>• Never commit the service account JSON file to git</li>
                  <li>• Add <code className="px-2 py-1 bg-black/30 rounded">firebase-admin-key*.json</code> to <code className="px-2 py-1 bg-black/30 rounded">.gitignore</code></li>
                  <li>• Rotate service account keys every 90 days</li>
                  <li>• Use different service accounts for development and production</li>
                  <li>• Enable audit logging in Firebase Console</li>
                  <li>• Restrict API key usage to specific domains in production</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-4">Troubleshooting</h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-white font-medium mb-1">Error: "Invalid service account"</p>
                <p className="text-gray-400">
                  Ensure the base64 string is properly decoded and contains valid JSON. Try re-encoding without line breaks.
                </p>
              </div>

              <div>
                <p className="text-white font-medium mb-1">Error: "Permission denied"</p>
                <p className="text-gray-400">
                  Check Firestore security rules. Admin SDK bypasses rules, but ensure your Firestore instance is accessible.
                </p>
              </div>

              <div>
                <p className="text-white font-medium mb-1">Error: "Failed to initialize app"</p>
                <p className="text-gray-400">
                  Verify that <code className="px-2 py-1 bg-black/50 rounded text-[#FFD700]">FIREBASE_ADMIN_KEY_BASE64</code> environment variable is set correctly.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <Link
              href="/team/admin"
              className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors"
            >
              ← Back to Admin Dashboard
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
