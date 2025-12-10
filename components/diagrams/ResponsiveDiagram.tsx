'use client';

import { useIsMobile } from '@/hooks/useMediaQuery';

interface ResponsiveDiagramProps {
  desktopViewBox: string;  // "0 0 1200 600"
  mobileViewBox: string;   // "0 0 400 600"
  title: string;
  description: string;
  children: React.ReactNode;
}

/**
 * Responsive SVG Pattern
 *
 * For simple diagrams (2-4 elements)
 * Adjusts viewBox and text/icon sizes for mobile
 *
 * @example
 * <ResponsiveDiagram
 *   desktopViewBox="0 0 1200 400"
 *   mobileViewBox="0 0 400 600"
 *   title="Before vs After Comparison"
 *   description="Side-by-side comparison"
 * >
 *   {svg content}
 * </ResponsiveDiagram>
 */
export function ResponsiveDiagram({
  desktopViewBox,
  mobileViewBox,
  title,
  description,
  children
}: ResponsiveDiagramProps) {
  const isMobile = useIsMobile();

  return (
    <svg
      viewBox={isMobile ? mobileViewBox : desktopViewBox}
      className="w-full h-auto"
      role="img"
      aria-labelledby="diagram-title diagram-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="diagram-title">{title}</title>
      <desc id="diagram-desc">{description}</desc>

      {/* Render children with mobile-adjusted styles */}
      <g className="diagram-content">{children}</g>

      <style>{`
        @media (max-width: 768px) {
          /* Increase text size */
          .diagram-text {
            font-size: 16px;  /* Was 12px on desktop */
          }

          /* Increase icon size */
          .diagram-icon {
            transform: scale(1.5);
          }

          /* Simplify colors (fewer variations) */
          .diagram-element-secondary {
            display: none;  /* Hide decorative elements */
          }

          /* Increase stroke width for visibility */
          .diagram-line {
            stroke-width: 3;  /* Was 2 on desktop */
          }
        }
      `}</style>
    </svg>
  );
}
