/**
 * Pitch Security System
 *
 * Handles time-limited tokens, username gates, IP tracking, and access revocation
 * for secure outbound pitch presentations
 */

import { getAdminDb } from '@/lib/auth/firebase-admin';
import crypto from 'crypto';
import { logger } from '@/lib/utils/logger';

export interface PitchAccess {
  pitchId: string;
  companySlug: string;
  token: string;
  username: string | null;
  expiresAt: Date;
  createdAt: Date;
  isRevoked: boolean;
  allowedIPs: string[];
  viewCount: number;
  lastViewedAt: Date | null;
  metadata: {
    recipientName?: string;
    recipientEmail?: string;
    recipientCompany?: string;
    notes?: string;
  };
}

export interface PitchValidationResult {
  valid: boolean;
  error?: string;
  access?: PitchAccess;
  requiresUsername?: boolean;
}

/**
 * Generate a secure random token for pitch access
 */
export function generatePitchToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Validate pitch access with all security checks
 */
export async function validatePitchAccess(
  companySlug: string,
  token: string,
  username: string | null,
  clientIP: string
): Promise<PitchValidationResult> {
  try {
    // Find pitch access record by company slug and token
    const db = getAdminDb();
    const accessSnapshot = await db
      .collection('outbound_pitches')
      .where('companySlug', '==', companySlug)
      .where('token', '==', token)
      .limit(1)
      .get();

    if (accessSnapshot.empty) {
      return {
        valid: false,
        error: 'Invalid access link. Please check your URL or request a new link.',
      };
    }

    const accessDoc = accessSnapshot.docs[0];
    const access = accessDoc.data() as PitchAccess;

    // Check if revoked
    if (access.isRevoked) {
      return {
        valid: false,
        error: 'This pitch access has been revoked. Please contact the sender for a new link.',
      };
    }

    // Check expiration
    const now = new Date();
    const expiresAt = access.expiresAt instanceof Date
      ? access.expiresAt
      : (access.expiresAt as any).toDate();

    if (now > expiresAt) {
      return {
        valid: false,
        error: 'This pitch link has expired. Please request a new link to continue.',
      };
    }

    // Check username gate
    if (access.username && !username) {
      return {
        valid: false,
        requiresUsername: true,
        error: 'This pitch requires a username to access.',
      };
    }

    if (access.username && username !== access.username) {
      return {
        valid: false,
        error: 'Invalid username. Please enter the correct username provided by the sender.',
      };
    }

    // Check IP restrictions (if any)
    if (access.allowedIPs && access.allowedIPs.length > 0) {
      if (!access.allowedIPs.includes(clientIP)) {
        return {
          valid: false,
          error: 'Access denied from this IP address. Please contact the sender.',
        };
      }
    }

    // All checks passed - update last viewed and view count
    await accessDoc.ref.update({
      viewCount: (access.viewCount || 0) + 1,
      lastViewedAt: now,
    });

    // Track analytics
    await trackPitchView(access.pitchId, clientIP, username);

    return {
      valid: true,
      access: {
        ...access,
        expiresAt,
      },
    };
  } catch (error) {
    logger.error('Error validating pitch access:', error);
    return {
      valid: false,
      error: 'An error occurred while validating access. Please try again.',
    };
  }
}

/**
 * Track pitch view for analytics
 */
async function trackPitchView(
  pitchId: string,
  clientIP: string,
  username: string | null
): Promise<void> {
  try {
    const db = getAdminDb();
    await db.collection('pitch_analytics').add({
      pitchId,
      clientIP,
      username,
      viewedAt: new Date(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    });
  } catch (error) {
    logger.error('Error tracking pitch view:', error);
  }
}

/**
 * Create a new pitch access record
 */
export async function createPitchAccess(
  companySlug: string,
  options: {
    username?: string;
    expiryDays?: number;
    recipientName?: string;
    recipientEmail?: string;
    recipientCompany?: string;
    notes?: string;
  }
): Promise<{ token: string; pitchId: string; expiresAt: Date }> {
  const token = generatePitchToken();
  const now = new Date();
  const expiryDays = options.expiryDays || 7;
  const expiresAt = new Date(now.getTime() + expiryDays * 24 * 60 * 60 * 1000);

  const pitchData: Partial<PitchAccess> = {
    companySlug,
    token,
    username: options.username || null,
    expiresAt,
    createdAt: now,
    isRevoked: false,
    allowedIPs: [],
    viewCount: 0,
    lastViewedAt: null,
    metadata: {
      recipientName: options.recipientName,
      recipientEmail: options.recipientEmail,
      recipientCompany: options.recipientCompany,
      notes: options.notes,
    },
  };

  const db = getAdminDb();
  const docRef = await db.collection('outbound_pitches').add(pitchData);

  return {
    token,
    pitchId: docRef.id,
    expiresAt,
  };
}

/**
 * Revoke pitch access
 */
export async function revokePitchAccess(pitchId: string): Promise<void> {
  const db = getAdminDb();
  await db.collection('outbound_pitches').doc(pitchId).update({
    isRevoked: true,
  });
}

/**
 * Extend pitch access expiration
 */
export async function extendPitchAccess(
  pitchId: string,
  additionalDays: number
): Promise<Date> {
  const db = getAdminDb();
  const doc = await db.collection('outbound_pitches').doc(pitchId).get();

  if (!doc.exists) {
    throw new Error('Pitch access not found');
  }

  const data = doc.data() as PitchAccess;
  const currentExpiry = data.expiresAt instanceof Date
    ? data.expiresAt
    : (data.expiresAt as any).toDate();

  const newExpiry = new Date(currentExpiry.getTime() + additionalDays * 24 * 60 * 60 * 1000);

  // Maximum 30 days from now
  const maxExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const finalExpiry = newExpiry > maxExpiry ? maxExpiry : newExpiry;

  await doc.ref.update({
    expiresAt: finalExpiry,
    isRevoked: false, // Un-revoke if extending
  });

  return finalExpiry;
}

/**
 * Get all pitch accesses for a company
 */
export async function getPitchAccesses(companySlug: string): Promise<PitchAccess[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection('outbound_pitches')
    .where('companySlug', '==', companySlug)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc: any) => ({
    pitchId: doc.id,
    ...doc.data(),
    expiresAt: doc.data().expiresAt?.toDate?.() || doc.data().expiresAt,
    createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
    lastViewedAt: doc.data().lastViewedAt?.toDate?.() || doc.data().lastViewedAt,
  })) as PitchAccess[];
}

/**
 * Get pitch analytics
 */
export async function getPitchAnalytics(pitchId: string) {
  const db = getAdminDb();
  const snapshot = await db
    .collection('pitch_analytics')
    .where('pitchId', '==', pitchId)
    .orderBy('viewedAt', 'desc')
    .get();

  return snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
    viewedAt: doc.data().viewedAt?.toDate?.() || doc.data().viewedAt,
  }));
}
