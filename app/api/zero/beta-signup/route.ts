/**
 * Zero Beta Signup API Endpoint
 *
 * Handles beta signup form submissions from BetaSignupButton
 * Sends email notification to team about new signups
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Log signup (in production, this would go to database)
    console.log('[Zero Beta Signup]', {
      email,
      name: name || 'Anonymous',
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
    });

    // TODO: In production, add to email list via Mailchimp/SendGrid
    // TODO: Store in database for tracking
    // TODO: Send welcome email with setup instructions

    // For now, send notification to team email
    // (This would integrate with your email service in production)
    const notificationPayload = {
      to: 'hello@rationale.work',
      subject: 'New Zero Beta Signup',
      text: `New beta signup:\n\nEmail: ${email}\nName: ${name || 'Not provided'}\nTimestamp: ${new Date().toISOString()}`,
    };

    // Log notification (in production, actually send email)
    console.log('[Email Notification]', notificationPayload);

    return NextResponse.json({
      success: true,
      message: 'Beta signup successful',
    });
  } catch (error) {
    console.error('[Zero Beta Signup Error]', error);
    return NextResponse.json(
      { error: 'Failed to process signup' },
      { status: 500 }
    );
  }
}
