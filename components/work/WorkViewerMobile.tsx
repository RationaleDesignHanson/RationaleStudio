/**
 * WorkViewerMobile — straight vertical scroll variant of WorkViewer.
 *
 * Mobile abandons the parallax-merge choreography entirely. Each era
 * is a plain stacked section with its own themed background, header,
 * and rows. No sticky stage, no translateY transforms, no era ticker.
 * Wayfinding comes from each era announcing itself in flow as the
 * user scrolls past.
 *
 * Renders below `md`. Above `md` the desktop WorkViewer takes over.
 */

'use client';

import type { EraBlockData } from './WorkViewer';

interface WorkViewerMobileProps {
  blocks: EraBlockData[];
}

export function WorkViewerMobile({ blocks }: WorkViewerMobileProps) {
  return (
    <div className="md:hidden">
      {blocks.map((block, idx) => (
        <section
          key={block.theme}
          className={`era-${block.theme} px-4 ${idx === 0 ? 'pt-5 pb-10' : 'py-10'}`}
          data-era-theme={block.theme}
          style={{ backgroundColor: 'var(--era-bg)' }}
        >
          <div className="max-w-6xl mx-auto">
            {block.renderHeader(block.theme, block.era, block.years, block.tagline)}
            <div className="mt-4">{block.rows}</div>
          </div>
        </section>
      ))}
    </div>
  );
}
