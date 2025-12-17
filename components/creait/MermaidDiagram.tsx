/**
 * MermaidDiagram Component
 *
 * Client-side wrapper for rendering Mermaid.js flow diagrams
 * with custom theme matching the Rationale design system.
 *
 * Uses dynamic imports to load Mermaid.js (~200KB) only when needed.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { logger } from '@/lib/utils/logger';

interface MermaidDiagramProps {
  chart: string;
  id?: string;
  className?: string;
}

export function MermaidDiagram({ chart, id, className = '' }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mermaidLoaded, setMermaidLoaded] = useState(false);
  const mermaidRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically load Mermaid.js only when component mounts (~200KB savings)
    import('mermaid').then((module) => {
      const mermaid = module.default;
      mermaidRef.current = mermaid;

      // Initialize Mermaid once with custom theme
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: '#4F46E5', // Accent color
          primaryTextColor: '#1F2937',
          primaryBorderColor: '#6366F1',
          lineColor: '#9CA3AF',
          secondaryColor: '#E0E7FF',
          tertiaryColor: '#F3F4F6',
          fontSize: '14px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        securityLevel: 'loose',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis',
        },
      });

      setMermaidLoaded(true);
    }).catch((error) => {
      logger.error('Error loading Mermaid.js:', error);
      setError('Error loading diagram renderer.');
    });
  }, []);

  useEffect(() => {
    if (chart && ref.current && mermaidLoaded && mermaidRef.current) {
      const uniqueId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      try {
        mermaidRef.current.render(uniqueId, chart).then(({ svg }: { svg: string }) => {
          setSvg(svg);
          setError('');
        }).catch((error: Error) => {
          logger.error('Mermaid rendering error:', error);
          setError('Error rendering diagram. Please check the diagram syntax.');
        });
      } catch (error) {
        logger.error('Mermaid error:', error);
        setError('Error initializing diagram renderer.');
      }
    }
  }, [chart, id, mermaidLoaded]);

  if (error) {
    return (
      <div className="p-4 rounded-lg border border-red-500/50 bg-red-50 dark:bg-red-900/20">
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`mermaid-diagram ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
