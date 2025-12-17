/**
 * Mock API: Email Intent Classification
 * Returns mock classification results for demo
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, from, body: emailBody } = body;

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Determine intent based on subject keywords
    let intent = 'general_inquiry';
    let confidence = 0.75;
    let deadline: string | undefined;
    let paymentAmount: number | undefined;
    const suggestedActions: string[] = [];

    if (subject.toLowerCase().includes('form') || subject.toLowerCase().includes('permission')) {
      intent = 'permission_form_signing';
      confidence = 0.92;
      deadline = 'December 15, 2025';
      suggestedActions.push('Review and sign permission form', 'Download PDF copy', 'Submit via online portal');
    } else if (subject.toLowerCase().includes('invoice') || subject.toLowerCase().includes('payment')) {
      intent = 'pay_invoice';
      confidence = 0.89;
      paymentAmount = 599.99;
      deadline = 'December 20, 2025';
      suggestedActions.push('Pay invoice online', 'Download invoice PDF', 'Contact billing for questions');
    } else if (subject.toLowerCase().includes('shipped') || subject.toLowerCase().includes('package')) {
      intent = 'track_package';
      confidence = 0.94;
      suggestedActions.push('Track package shipment', 'View delivery details', 'Update delivery preferences');
    } else if (subject.toLowerCase().includes('flight') || subject.toLowerCase().includes('check in')) {
      intent = 'check_in_flight';
      confidence = 0.91;
      suggestedActions.push('Check in online', 'View boarding pass', 'Manage booking');
    } else if (subject.toLowerCase().includes('appointment') || subject.toLowerCase().includes('reminder')) {
      intent = 'appointment_reminder';
      confidence = 0.87;
      deadline = 'December 18, 2025 at 2:30 PM';
      suggestedActions.push('Confirm appointment', 'Reschedule if needed', 'Add to calendar');
    }

    const result = {
      detectedIntent: intent,
      confidence,
      source: 'ml_model_v3',
      processingTime: '842ms',
      ...(deadline && { deadline }),
      ...(paymentAmount && { paymentAmount }),
      suggestedActions,
    };

    return NextResponse.json(result);
  } catch (error) {
    logger.error('Classification error:', error);
    return NextResponse.json(
      { error: 'Classification failed' },
      { status: 500 }
    );
  }
}
