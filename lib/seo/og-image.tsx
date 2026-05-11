/**
 * Shared OG image renderer. Each opengraph-image.tsx file at a route is
 * a one-line wrapper around `renderOgImage()` with route-specific copy +
 * accent. Keeps the brand consistent across the dozen-or-so per-route OG
 * cards while letting accent color carry the project identity.
 *
 * Next.js renders these at build time (or on-demand) via the ImageResponse
 * API. No external font fetches — uses system stack so the build is fast
 * and reliable on Netlify's cold-start image pipeline.
 */

import { ImageResponse } from 'next/og';

export const SIZE = { width: 1200, height: 630 };
export const CONTENT_TYPE = 'image/png';

interface OgOptions {
  /** Eyebrow line above the title — usually the era ("NOW", "LEADER", "DIRECTOR") or category. */
  eyebrow?: string;
  /** Main headline — project name or "Matt Hanson" for the root card. */
  title: string;
  /** Optional sub-headline; reads as the descriptor sentence. */
  tagline?: string;
  /** Accent color (CSS color string) for the left stripe + URL underline. Defaults to the rust accent. */
  accent?: string;
  /** Bottom-left label. Defaults to "rationale.work". */
  domain?: string;
}

export function renderOgImage({
  eyebrow,
  title,
  tagline,
  accent = '#A85A40',
  domain = 'rationale.work',
}: OgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#F6F5F2',
          color: '#1A1A1C',
          fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          padding: '64px',
          position: 'relative',
        }}
      >
        {/* Accent stripe on the left */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '8px',
            background: accent,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            paddingLeft: '32px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {eyebrow ? (
              <div
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 22,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: accent,
                  marginBottom: 16,
                }}
              >
                {eyebrow}
              </div>
            ) : null}

            <div
              style={{
                fontSize: title.length > 30 ? 80 : 108,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                fontWeight: 500,
                marginBottom: tagline ? 24 : 0,
                maxWidth: '92%',
              }}
            >
              {title}
            </div>

            {tagline ? (
              <div
                style={{
                  fontSize: 30,
                  lineHeight: 1.3,
                  color: '#45464A',
                  fontStyle: 'italic',
                  maxWidth: '88%',
                  marginTop: 8,
                }}
              >
                {tagline}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 22,
              color: '#8A8B8E',
              letterSpacing: '0.05em',
            }}
          >
            <span style={{ color: '#1A1A1C' }}>Matt Hanson</span>
            <span style={{ color: accent }}>{domain}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
    },
  );
}
