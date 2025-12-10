/**
 * Client Auth Guard
 *
 * Protects client pages by checking for valid Firebase authentication
 * Owners and team members can access all client pages
 * Client users can only access their specific client page
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';

interface ClientAuthGuardProps {
  children: React.ReactNode;
  requiredClient: string;
}

export function ClientAuthGuard({ children, requiredClient }: ClientAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (loading) {
      return; // Wait for auth to load
    }

    // Not logged in - redirect to login with return URL
    if (!user || !profile) {
      const loginUrl = `/clients/login?redirect=${encodeURIComponent(pathname)}`;
      router.push(loginUrl);
      return;
    }

    // Check authorization
    // Owner and team can access all clients
    if (profile.role === 'owner' || profile.role === 'team') {
      setIsAuthorized(true);
      return;
    }

    // Client users can only access their specific client
    if (profile.role === 'client' && profile.clientId) {
      const clientMatch = profile.clientId.toUpperCase() === requiredClient.toUpperCase();
      if (clientMatch) {
        setIsAuthorized(true);
      } else {
        // Wrong client - redirect to their dashboard
        router.push('/clients');
      }
      return;
    }

    // Other roles don't have client access
    router.push('/login');
  }, [user, profile, loading, requiredClient, router, pathname]);

  // Show loading state while checking auth
  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-terminal-gold text-lg">Loading...</div>
      </div>
    );
  }

  // Render protected content
  return <>{children}</>;
}
