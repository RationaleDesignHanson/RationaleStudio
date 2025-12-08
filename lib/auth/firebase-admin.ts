/**
 * Firebase Admin SDK - Server-side authentication
 *
 * SETUP REQUIRED:
 * 1. Go to Firebase Console > Project Settings > Service Accounts
 * 2. Click "Generate New Private Key"
 * 3. Download the JSON file
 * 4. Add these environment variables to .env.local:
 *    - FIREBASE_PROJECT_ID
 *    - FIREBASE_CLIENT_EMAIL
 *    - FIREBASE_PRIVATE_KEY
 *
 * OR use the service account JSON path:
 *    - FIREBASE_SERVICE_ACCOUNT_PATH=/path/to/serviceAccountKey.json
 */

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let adminApp: App | undefined;
let adminAuth: Auth | undefined;
let _adminDb: Firestore | undefined;

/**
 * Initialize Firebase Admin SDK
 * Only initializes once (singleton pattern)
 */
function initializeFirebaseAdmin(): { app: App; auth: Auth; db: Firestore } {
  // Return existing instance if already initialized
  if (adminApp && adminAuth && _adminDb) {
    return { app: adminApp, auth: adminAuth, db: _adminDb };
  }

  // Check if already initialized by another module
  const existingApps = getApps();
  if (existingApps.length > 0) {
    adminApp = existingApps[0];
    adminAuth = getAuth(adminApp);
    _adminDb = getFirestore(adminApp);
    return { app: adminApp, auth: adminAuth, db: _adminDb };
  }

  try {
    // Option 1: Use service account JSON file path
    if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
      adminApp = initializeApp({
        credential: cert(process.env.FIREBASE_SERVICE_ACCOUNT_PATH),
      });
    }
    // Option 2: Use individual environment variables
    else if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
    ) {
      adminApp = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    }
    // No credentials provided
    else {
      throw new Error(
        'Firebase Admin SDK credentials not found. Please set FIREBASE_SERVICE_ACCOUNT_PATH or individual environment variables (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY)'
      );
    }

    adminAuth = getAuth(adminApp);
    _adminDb = getFirestore(adminApp);
    console.log('[Firebase Admin] Successfully initialized');

    return { app: adminApp, auth: adminAuth, db: _adminDb };
  } catch (error) {
    console.error('[Firebase Admin] Initialization error:', error);
    throw error;
  }
}

/**
 * Verify Firebase ID token (server-side only)
 *
 * @param idToken - The Firebase ID token from the client
 * @returns Decoded token with user info and claims
 * @throws Error if token is invalid or expired
 */
export async function verifyIdToken(idToken: string) {
  try {
    const { auth } = initializeFirebaseAdmin();
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('[Firebase Admin] Token verification failed:', error);
    throw new Error('Invalid or expired token');
  }
}

/**
 * Get user by UID (server-side only)
 *
 * @param uid - The user's UID
 * @returns User record from Firebase Auth
 */
export async function getUserByUid(uid: string) {
  try {
    const { auth } = initializeFirebaseAdmin();
    const userRecord = await auth.getUser(uid);
    return userRecord;
  } catch (error) {
    console.error('[Firebase Admin] Get user failed:', error);
    throw new Error('User not found');
  }
}

/**
 * Set custom user claims (for role-based access control)
 *
 * @param uid - The user's UID
 * @param claims - Custom claims object (e.g., { role: 'owner' })
 */
export async function setCustomUserClaims(uid: string, claims: Record<string, any>) {
  try {
    const { auth } = initializeFirebaseAdmin();
    await auth.setCustomUserClaims(uid, claims);
    console.log(`[Firebase Admin] Custom claims set for user ${uid}:`, claims);
  } catch (error) {
    console.error('[Firebase Admin] Set custom claims failed:', error);
    throw error;
  }
}

/**
 * Create a custom token (for testing or special auth flows)
 *
 * @param uid - The user's UID
 * @param additionalClaims - Optional additional claims
 * @returns Custom token string
 */
export async function createCustomToken(
  uid: string,
  additionalClaims?: Record<string, any>
) {
  try {
    const { auth } = initializeFirebaseAdmin();
    const customToken = await auth.createCustomToken(uid, additionalClaims);
    return customToken;
  } catch (error) {
    console.error('[Firebase Admin] Create custom token failed:', error);
    throw error;
  }
}

// Export admin instances for advanced use cases
export function getAdminAuth(): Auth {
  const { auth } = initializeFirebaseAdmin();
  return auth;
}

export function getAdminApp(): App {
  const { app } = initializeFirebaseAdmin();
  return app;
}

/**
 * Get user profile from Firestore (server-side using Admin SDK)
 * Bypasses security rules
 *
 * @param uid - The user's UID
 * @returns User profile or null
 */
export async function getAdminUserProfile(uid: string) {
  try {
    const { getFirestore } = await import('firebase-admin/firestore');
    const { app } = initializeFirebaseAdmin();
    const db = getFirestore(app);

    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return null;
    }

    return userDoc.data() as {
      uid: string;
      email: string;
      role: 'owner' | 'team' | 'partner' | 'investor';
      name?: string;
      createdAt: number;
      lastLogin: number;
    };
  } catch (error) {
    console.error('[Firebase Admin] Get user profile error:', error);
    return null;
  }
}


/**
 * Get Firestore instance (server-side only)
 * Use this for direct database access in API routes and server components
 */
export function getAdminDb(): Firestore {
  const { db } = initializeFirebaseAdmin();
  return db;
}

// Export singleton adminDb for convenience
export const adminDb = getAdminDb();
