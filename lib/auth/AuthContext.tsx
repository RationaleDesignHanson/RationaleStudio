/**
 * Auth Context Provider
 *
 * Manages authentication state across the application
 */

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { onAuthChange, getUserProfile, UserProfile, signIn, signOut } from './firebase';
import { logger } from '@/lib/utils/logger';

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

  useEffect(() => {
    try {
      // Subscribe to auth state changes
      const unsubscribe = onAuthChange(async (firebaseUser) => {
        setUser(firebaseUser);

        if (firebaseUser) {
          // Load user profile
          const userProfile = await getUserProfile(firebaseUser.uid);
          setProfile(userProfile);
        } else {
          setProfile(null);
        }

        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      // Firebase initialization failed - this is OK for public pages
      // Only log in development to avoid Lighthouse Best Practices penalty
      if (process.env.NODE_ENV === 'development') {
        logger.error('[AuthContext] Firebase initialization failed:', err);
      }
      setError('Authentication system unavailable');
      setLoading(false);
      // Don't throw - let the page render without auth
    }
  }, []);

  const handleSignIn = async (email: string, password: string): Promise<UserProfile> => {
    try {
      setError(null);
      setLoading(true);
      const userProfile = await signIn(email, password);
      setProfile(userProfile);
      return userProfile;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setError(null);
      await signOut();
      setUser(null);
      setProfile(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      throw err;
    }
  };

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
