/**
 * Debug endpoint to check environment variables at build time
 * This will help diagnose why Firebase env vars aren't being exposed
 */

export async function GET() {
  const envVars = {
    hasFirebaseApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    hasFirebaseAuthDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    hasFirebaseProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    hasFirebaseStorageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    hasFirebaseMessagingSenderId: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    hasFirebaseAppId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // Show first 10 chars of API key for verification
    apiKeyPrefix: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 10) || 'undefined',
    nodeEnv: process.env.NODE_ENV,
    allNextPublicKeys: Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_')),
  };

  return Response.json(envVars);
}
