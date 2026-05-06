/**
 * Clara's Sweet 16 Quiz Page
 * 
 * Interactive quiz to help choose a birthday trip destination
 * Protected: Only accessible to friends (investors), team, and admin
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import Sweet16Quiz from '@/components/clara/Sweet16Quiz';

// Allowed roles: owner, team, partner, investor (friends & family)
const ALLOWED_ROLES = ['owner', 'team', 'partner', 'investor'];

export default function ClaraPage() {
  const router = useRouter();
  const { profile, loading } = useAuth();

  // Check authentication and role
  useEffect(() => {
    if (!loading) {
      if (!profile) {
        // Not authenticated, redirect to login
        router.push('/login?redirect=/clara');
      } else if (!ALLOWED_ROLES.includes(profile.role)) {
        // Not authorized, redirect to home
        router.push('/');
      }
    }
  }, [profile, loading, router]);

  // Show loading state
  if (loading) {
    return (
      <div style={{ 
        minHeight: '100dvh', 
        background: 'linear-gradient(180deg, #FFF0F5 0%, #FFB6C1 25%, #FF69B4 60%, #DB2777 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.9)', 
          padding: '24px 32px', 
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎂</div>
          <div style={{ color: '#831843', fontSize: '14px' }}>Loading...</div>
        </div>
      </div>
    );
  }

  // Don't render until authenticated and authorized
  if (!profile || !ALLOWED_ROLES.includes(profile.role)) {
    return null;
  }

  return <Sweet16Quiz />;
}

