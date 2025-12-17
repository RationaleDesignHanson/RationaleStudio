import { NextRequest, NextResponse } from 'next/server'
import { createBetaSignup, checkExistingSignup } from '@/lib/firestore/beta-signups'
import { resend } from '@/lib/resend/client'
import { ZeroBetaEmail } from '@/lib/resend/templates/zero-beta'
import { HeirloomBetaEmail } from '@/lib/resend/templates/heirloom-beta'
import { logger } from '@/lib/utils/logger';

// TestFlight URLs (update these with your actual TestFlight links)
const TESTFLIGHT_URLS = {
  zero: 'https://testflight.apple.com/join/YOUR_ZERO_CODE',
  heirloom: 'https://testflight.apple.com/join/gs6EU81Z',
}

interface BetaSignupRequest {
  email: string
  appName: 'zero' | 'heirloom'
  source?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: BetaSignupRequest = await request.json()
    const { email, appName, source } = body

    // Validate input
    if (!email || !appName) {
      return NextResponse.json(
        { error: 'Email and app name are required' },
        { status: 400 }
      )
    }

    if (!['zero', 'heirloom'].includes(appName)) {
      return NextResponse.json(
        { error: 'Invalid app name. Must be "zero" or "heirloom"' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already signed up for this app (Firestore)
    const existing = await checkExistingSignup(email, appName)

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already registered for the beta' },
        { status: 409 }
      )
    }

    // Insert signup into Firestore
    try {
      const signup = await createBetaSignup({
        email,
        app_name: appName,
        signup_source: source || 'unknown',
      })

      if (!signup || !signup.id) {
        throw new Error('Failed to create signup')
      }

      // PHASE 1: Internal Testing - Manual invites only
      // Automated emails disabled until External Testing is approved
      // TODO: Re-enable when TestFlight public links are available

      // Send welcome email with TestFlight link (DISABLED FOR PHASE 1)
      /*
      try {
        const testflightUrl = TESTFLIGHT_URLS[appName]
        const emailTemplate = appName === 'zero'
          ? ZeroBetaEmail({ testflightUrl })
          : HeirloomBetaEmail({ testflightUrl })

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Rationale <onboarding@resend.dev>',
          to: email,
          subject: `Welcome to ${appName === 'zero' ? 'Zero' : 'Heirloom'} Beta`,
          react: emailTemplate,
        })

        if (emailError) {
          logger.error('Email send error:', emailError)
          return NextResponse.json({
            success: true,
            message: 'Signup saved, but email failed to send. Please contact support.',
            signupId: signup.id,
          })
        }

        return NextResponse.json({
          success: true,
          message: 'Successfully signed up! Check your email for TestFlight instructions.',
          signupId: signup.id,
        })
      } catch (emailError) {
        logger.error('Email send exception:', emailError)
        return NextResponse.json({
          success: true,
          message: 'Signup saved, but email failed to send. Please contact support.',
          signupId: signup.id,
        })
      }
      */

      // Phase 1: Just save signup and return success

      // Send admin notification email
      try {
        await resend.emails.send({
          from: 'Rationale Beta Signups <onboarding@resend.dev>',
          to: 'matt@rationale.work', // Your email
          subject: `New ${appName === 'zero' ? 'Zero' : 'Heirloom'} Beta Signup`,
          html: `
            <h2>New Beta Signup</h2>
            <p><strong>App:</strong> ${appName === 'zero' ? 'Zero' : 'Heirloom'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source:</strong> ${source || 'unknown'}</p>
            <p><strong>Signed up:</strong> ${new Date().toLocaleString()}</p>
            <hr />
            <p><small>View all signups: <a href="https://rationale.work/admin/beta-signups">Admin Dashboard</a></small></p>
            <p><small>To invite: Copy email → App Store Connect → TestFlight → Internal Testing → Add Tester</small></p>
          `,
        })
      } catch (emailError) {
        // Don't fail the signup if notification fails
        logger.error('Admin notification failed:', emailError)
      }

      return NextResponse.json({
        success: true,
        message: 'Thanks for your interest! We\'ll send you a TestFlight invite soon.',
        signupId: signup.id,
      })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save signup';
      logger.error('Database insert error:', errorMessage)
      return NextResponse.json(
        { error: 'Failed to save signup' },
        { status: 500 }
      )
    }
  } catch (error) {
    logger.error('Beta signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
