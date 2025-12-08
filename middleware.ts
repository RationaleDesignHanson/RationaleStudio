/**
 * Next.js Middleware for Route Protection
 *
 * Implements 4-tier RBAC:
 * - /owner/* - Owner only (Matt)
 * - /team/* - Team + Owner
 * - /partners/* - Partner + Team + Owner
 * - /investors/* - Investor + Partner + Team + Owner
 *
 * Note: Middleware runs in Edge Runtime which doesn't support Firebase Admin SDK.
 * We only check for session cookie existence here. Full verification happens in pages.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and required roles
const protectedRoutes: Record<string, string[]> = {
  '/owner': ['owner'],
  '/team': ['team', 'owner'],
  '/partners': ['partner', 'team', 'owner'],
  '/investors': ['investor', 'partner', 'team', 'owner'],
  // Legacy /clients route - redirect to appropriate dashboard
  '/clients': ['investor', 'partner', 'team', 'owner'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
    // No session, redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Session exists - allow access
  // Role verification happens in page components via server-side verification
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
  ],
};
