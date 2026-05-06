/**
 * Next.js Middleware — login gate for the two real portals.
 *
 * - /owner/*    Firebase RBAC, owner only
 * - /clients/*  Firebase RBAC, client/team/owner
 *
 * Public confidential case studies use the in-page <UnlockGate> primitive
 * (cookie-based password unlock), not middleware. This file only handles
 * routes that require an actual login session.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes: Record<string, string[]> = {
  '/owner': ['owner'],
  '/admin': ['owner'],
  '/clients': ['client', 'team', 'owner'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login pages to bypass auth checks (prevent redirect loops)
  if (pathname === '/login' || pathname === '/clients/login') {
    return NextResponse.next();
  }

  const protectedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (!protectedRoute) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get('session')?.value;

  if (!sessionCookie) {
    const loginPath = pathname.startsWith('/clients') ? '/clients/login' : '/login';
    const loginUrl = new URL(loginPath, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Pages/API routes verify the actual session + role using Firebase Admin SDK.
  return NextResponse.next();
}

export const config = {
  matcher: ['/owner/:path*', '/admin/:path*', '/clients/:path*'],
};
