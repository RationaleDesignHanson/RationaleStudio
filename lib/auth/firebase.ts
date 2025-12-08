/**
 * Firebase Authentication Configuration
 *
 * Secure authentication for 4-tier access control:
 * - Investor: Portfolio view
 * - Partner: Active collaboration materials
 * - Team: Full access + admin
 * - Owner: Matt-only, publishing tools
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Lazy initialization - only run in browser
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let initError: Error | null = null;

function getFirebaseApp(): FirebaseApp {
  if (typeof window === 'undefined') {
    throw new Error('Firebase client SDK can only be used in the browser');
  }

  // If we've already tried and failed, throw the cached error
  if (initError) {
    throw initError;
  }

  if (!app) {
    try {
      // Validate that we have the required config
      if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'undefined') {
        throw new Error('Firebase API key is missing or invalid. Please check environment variables.');
      }

      app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    } catch (error) {
      initError = error as Error;
      console.error('[Firebase] Initialization failed:', error);
      throw initError;
    }
  }
  return app;
}

function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

function getFirebaseDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

// User role types (4-tier access control)
export type UserRole = 'owner' | 'team' | 'partner' | 'investor';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  name?: string;
  createdAt: number;
  lastLogin: number;
}

/**
 * Sign in with email and password
 * Creates a secure session cookie using Firebase Admin SDK
 */
export async function signIn(email: string, password: string): Promise<UserProfile> {
  try {
    const userCredential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
    const profile = await getUserProfile(userCredential.user.uid);

    if (!profile) {
      throw new Error('User profile not found. Contact administrator.');
    }

    // Get Firebase ID token
    const idToken = await userCredential.user.getIdToken();

    // Create secure session cookie via API
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create session');
    }

    // Update last login timestamp
    await updateLastLogin(profile.uid);

    return profile;
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw new Error(error.message || 'Authentication failed');
  }
}

/**
 * Sign out current user
 * Clears both Firebase auth state and session cookie
 */
export async function signOut(): Promise<void> {
  try {
    // Clear session cookie via API
    await fetch('/api/auth/session', {
      method: 'DELETE',
    });

    // Sign out from Firebase
    await firebaseSignOut(getFirebaseAuth());
  } catch (error) {
    console.error('Sign out error:', error);
    throw new Error('Sign out failed');
  }
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(getFirebaseDb(), 'users', uid));

    if (!userDoc.exists()) {
      return null;
    }

    return userDoc.data() as UserProfile;
  } catch (error) {
    console.error('Get user profile error:', error);
    return null;
  }
}

/**
 * Update last login timestamp
 */
async function updateLastLogin(uid: string): Promise<void> {
  try {
    await setDoc(
      doc(getFirebaseDb(), 'users', uid),
      { lastLogin: Date.now() },
      { merge: true }
    );
  } catch (error) {
    console.error('Update last login error:', error);
  }
}

/**
 * Auth state change listener
 */
export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

/**
 * Check if user has required role or higher
 * Role hierarchy: owner > team > partner > investor
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    owner: 4,
    team: 3,
    partner: 2,
    investor: 1,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
