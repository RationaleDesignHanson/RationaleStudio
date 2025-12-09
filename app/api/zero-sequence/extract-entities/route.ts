/**
 * Mock API: Entity Extraction
 * Returns mock extracted entities from email
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, from, body: emailBody, intent } = body;

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Generate mock entities based on intent
    const entities = [];

    if (intent && (intent.includes('invoice') || intent.includes('payment'))) {
      entities.push(
        { text: '$599.99', type: 'amount', confidence: 0.98 },
        { text: 'December 20, 2025', type: 'date', confidence: 0.95 },
        { text: 'Acme Corp', type: 'organization', confidence: 0.92 }
      );
    } else if (intent && (intent.includes('package') || intent.includes('track'))) {
      entities.push(
        { text: '1Z999AA10123456784', type: 'other', confidence: 0.99 },
        { text: 'December 16, 2025', type: 'date', confidence: 0.94 },
        { text: 'UPS', type: 'organization', confidence: 0.96 },
        { text: '123 Main St', type: 'location', confidence: 0.91 }
      );
    } else if (intent && (intent.includes('flight') || intent.includes('check_in'))) {
      entities.push(
        { text: 'UA 1234', type: 'other', confidence: 0.97 },
        { text: 'SFO', type: 'location', confidence: 0.95 },
        { text: 'LAX', type: 'location', confidence: 0.95 },
        { text: 'December 19, 2025', type: 'date', confidence: 0.93 },
        { text: 'ABC123', type: 'other', confidence: 0.89 }
      );
    } else if (intent && (intent.includes('form') || intent.includes('permission'))) {
      entities.push(
        { text: 'December 15, 2025', type: 'date', confidence: 0.94 },
        { text: 'Mrs. Johnson', type: 'person', confidence: 0.91 },
        { text: 'Lincoln Elementary', type: 'organization', confidence: 0.88 }
      );
    } else if (intent && intent.includes('appointment')) {
      entities.push(
        { text: 'December 18, 2025', type: 'date', confidence: 0.96 },
        { text: '2:30 PM', type: 'other', confidence: 0.93 },
        { text: 'Dr. Smith', type: 'person', confidence: 0.90 },
        { text: 'Valley Medical Center', type: 'organization', confidence: 0.87 }
      );
    }

    const result = {
      entities,
      totalCount: entities.length,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Entity extraction error:', error);
    return NextResponse.json(
      { error: 'Entity extraction failed' },
      { status: 500 }
    );
  }
}
