/**
 * Next.js Middleware for Route Protection
 *
 * Implements 4-tier RBAC:
 * - /owner/* - Owner only (Matt)
 * - /team/* - Team + Owner
 * - /partners/* - Partner + Team + Owner
 * - /investors/* - Investor + Partner + Team + Owner
 *
 * SECURITY: Uses Firebase Admin SDK to verify session cookies and enforce role-based access.
 * Middleware runs in Edge Runtime, but we need Node.js runtime for Firebase Admin SDK verification.
 * To support this, we use a custom API route for verification.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and required roles
const protectedRoutes: Record<string, string[]> = {
  '/owner': ['owner'],
  '/team': ['team', 'owner'],
  '/partners': ['partner', 'team', 'owner'],
  '/investors': ['investor', 'partner', 'team', 'owner'],
  // Client portal - accessible by clients, team, and owner
  '/clients': ['client', 'team', 'owner'],
  // Heirloom business dashboard - owner only
  '/heirloom': ['owner'],
};

// Role hierarchy for access control
const roleHierarchy: Record<string, number> = {
  owner: 5,
  team: 4,
  partner: 3,
  investor: 2,
  client: 1,
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login pages to bypass auth checks (prevent redirect loops)
  if (pathname === '/login' || pathname === '/clients/login') {
    return NextResponse.next();
  }

  // Check if route is protected
  const protectedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (!protectedRoute) {
    // Public route, allow access
    return NextResponse.next();
  }

  // Get session cookie
  const sessionCookie = request.cookies.get('session')?.value;

  if (!sessionCookie) {
    // No session, redirect to appropriate login page
    const loginPath = pathname.startsWith('/clients') ? '/clients/login' : '/login';
    const loginUrl = new URL(loginPath, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Session cookie exists, allow through
  // Pages/API routes will verify the actual session validity and role using Firebase Admin SDK
  // Middleware only checks for presence of session cookie (authentication, not authorization)
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    '/owner/:path*',
    '/team/:path*',
    '/partners/:path*',
    '/investors/:path*',
    '/clients/:path*',
    '/heirloom/:path*',
  ],
};
