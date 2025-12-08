/**
 * API Route: Create Pitch Access
 *
 * POST /api/pitch/create
 * Body: { companySlug, username?, expiryDays?, recipientName?, recipientEmail?, recipientCompany?, notes? }
 *
 * Creates a secure pitch access link with time-limited token
 */

import { NextRequest, NextResponse } from 'next/server';
import { createPitchAccess } from '@/lib/pitch/security';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      companySlug,
      username,
      expiryDays,
      recipientName,
      recipientEmail,
      recipientCompany,
      notes,
    } = body;

    if (!companySlug) {
      return NextResponse.json(
        { error: 'Company slug is required' },
        { status: 400 }
      );
    }

    const { token, pitchId, expiresAt } = await createPitchAccess(companySlug, {
      username: username || undefined,
      expiryDays: expiryDays || 7,
      recipientName,
      recipientEmail,
      recipientCompany,
      notes,
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rationale.work';
    const usernameParam = username ? `&username=${encodeURIComponent(username)}` : '';
    const pitchUrl = `${baseUrl}/pitch/${companySlug}?token=${token}${usernameParam}`;

    return NextResponse.json({
      success: true,
      pitchId,
      token,
      pitchUrl,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Error creating pitch access:', error);
    return NextResponse.json(
      { error: 'Failed to create pitch access' },
      { status: 500 }
    );
  }
}
