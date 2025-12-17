/**
 * Firestore Beta Signups
 *
 * Replaces Supabase beta_signups table with Firestore collection
 * Collection: beta_signups
 */

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  CollectionReference,
  QueryConstraint,
} from 'firebase/firestore';
import { getFirebaseDB } from '@/lib/auth/firebase';

export interface BetaSignup {
  id: string;
  email: string;
  app_name: 'zero' | 'heirloom';
  signed_up_at: Timestamp | string;
  signup_source: string | null;
  email_sent: boolean;
  email_sent_at: Timestamp | string | null;
}

export interface BetaSignupInput {
  email: string;
  app_name: 'zero' | 'heirloom';
  signup_source?: string;
}

/**
 * Get beta signups collection reference
 */
function getBetaSignupsCollection() {
  const db = getFirebaseDB();
  return collection(db, 'beta_signups');
}

/**
 * Create a new beta signup
 */
export async function createBetaSignup(input: BetaSignupInput): Promise<{ id: string }> {
  const betaSignups = getBetaSignupsCollection();

  const signupData = {
    email: input.email,
    app_name: input.app_name,
    signup_source: input.signup_source || null,
    signed_up_at: Timestamp.now(),
    email_sent: false,
    email_sent_at: null,
  };

  const docRef = await addDoc(betaSignups, signupData);
  return { id: docRef.id };
}

/**
 * Check if email already signed up for an app
 */
export async function checkExistingSignup(
  email: string,
  appName: 'zero' | 'heirloom'
): Promise<boolean> {
  const betaSignups = getBetaSignupsCollection();
  const q = query(
    betaSignups,
    where('email', '==', email),
    where('app_name', '==', appName)
  );

  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

/**
 * Get all beta signups with optional filtering
 */
export async function getBetaSignups(filter?: {
  app_name?: 'zero' | 'heirloom';
}): Promise<BetaSignup[]> {
  const betaSignups = getBetaSignupsCollection();

  const constraints: QueryConstraint[] = [orderBy('signed_up_at', 'desc')];

  if (filter?.app_name) {
    constraints.unshift(where('app_name', '==', filter.app_name));
  }

  const q = query(betaSignups, ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as BetaSignup[];
}

/**
 * Convert Firestore Timestamp to ISO string for frontend
 */
export function serializeBetaSignup(signup: BetaSignup): Omit<BetaSignup, 'signed_up_at' | 'email_sent_at'> & {
  signed_up_at: string;
  email_sent_at: string | null;
} {
  return {
    ...signup,
    signed_up_at:
      signup.signed_up_at instanceof Timestamp
        ? signup.signed_up_at.toDate().toISOString()
        : signup.signed_up_at,
    email_sent_at:
      signup.email_sent_at instanceof Timestamp
        ? signup.email_sent_at.toDate().toISOString()
        : signup.email_sent_at,
  };
}
