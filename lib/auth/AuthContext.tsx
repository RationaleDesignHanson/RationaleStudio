/**
 * Auth Context Provider
 *
 * Manages authentication state across the application.
 * Optimized for Lighthouse performance - Firebase only loads when auth is actually used.
 */

'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import type { UserProfile } from './firebase';
import { logger } from '@/lib/utils/logger';

// Lazy load Firebase to improve initial page load performance
// Firebase SDK is ~150KB+ and shouldn't block initial render
const loadFirebaseAuth = () => import('./firebase');

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<UserProfile>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [firebaseModule, setFirebaseModule] = useState<Awaited<ReturnType<typeof loadFirebaseAuth>> | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let mounted = true;

    // Defer Firebase loading to not block initial paint
    // Use requestIdleCallback if available, otherwise setTimeout
    const loadAuth = async () => {
      try {
        // Load Firebase module lazily
        const firebase = await loadFirebaseAuth();
        if (!mounted) return;
        
        setFirebaseModule(firebase);

        // Subscribe to auth state changes
        unsubscribe = firebase.onAuthChange(async (firebaseUser) => {
          if (!mounted) return;
          setUser(firebaseUser);

          if (firebaseUser) {
            // Load user profile
            const userProfile = await firebase.getUserProfile(firebaseUser.uid);
            if (mounted) setProfile(userProfile);
          } else {
            setProfile(null);
          }

          setLoading(false);
        });
      } catch (err) {
        // Firebase initialization failed - this is OK for public pages
        // Only log in development to avoid Lighthouse Best Practices penalty
        if (process.env.NODE_ENV === 'development') {
          logger.error('[AuthContext] Firebase initialization failed:', err);
        }
        if (mounted) {
          setError('Authentication system unavailable');
          setLoading(false);
        }
        // Don't throw - let the page render without auth
      }
    };

    // Delay Firebase loading to prioritize initial render
    // This improves LCP and FCP scores significantly
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => loadAuth());
    } else {
      setTimeout(loadAuth, 100);
    }

    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleSignIn = useCallback(async (email: string, password: string): Promise<UserProfile> => {
    try {
      setError(null);
      setLoading(true);
      // Ensure Firebase is loaded before sign in
      const firebase = firebaseModule || await loadFirebaseAuth();
      const userProfile = await firebase.signIn(email, password);
      setProfile(userProfile);
      return userProfile;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [firebaseModule]);

  const handleSignOut = useCallback(async () => {
    try {
      setError(null);
      // Ensure Firebase is loaded before sign out
      const firebase = firebaseModule || await loadFirebaseAuth();
      await firebase.signOut();
      setUser(null);
      setProfile(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      throw err;
    }
  }, [firebaseModule]);

  const value = {
    user,
    profile,
    loading,
    error,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
