/**
 * Open Graph Image Generator
 *
 * Generates dynamic OG image matching homepage hero section:
 * - ASCII grid background (terminal gold)
 * - Dark gradient
 * - "Rationale: Your Product Design Company"
 * - "We ship products. Yours and ours."
 */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom, #111827, #000000, #111827)',
            padding: '80px',
            position: 'relative',
          }}
        >
          {/* ASCII Grid Pattern Background */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.08,
              fontFamily: 'monospace',
              fontSize: '12px',
              color: '#FFD700',
              lineHeight: '14px',
              overflow: 'hidden',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {Array.from({ length: 120 }).map((_, i) => (
              <div key={i} style={{ display: 'flex' }}>
                {Array.from({ length: 80 }).map((_, j) => {
                  const chars = ['/', '\\', '|', '-', '+', '*', '#', '~'];
                  const char = chars[Math.floor((i + j) % chars.length)];
                  return (
                    <span key={j} style={{ width: '15px' }}>
                      {char}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Main Headline */}
            <div
              style={{
                fontSize: '72px',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>
                Rationale:{' '}
                <span style={{ fontWeight: 300 }}>Your Product</span>
              </span>
              <span style={{ fontWeight: 300 }}>Design Company</span>
            </div>

            {/* Subheadline */}
            <div
              style={{
                fontSize: '36px',
                fontWeight: 500,
                color: '#ffffff',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}
            >
              We ship products.{' '}
              <span style={{ color: '#D1D5DB' }}>Yours and ours.</span>
            </div>

            {/* Link indicator */}
            <div
              style={{
                fontSize: '20px',
                color: '#FFD700',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              rationale.work
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('OG Image generation failed:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
