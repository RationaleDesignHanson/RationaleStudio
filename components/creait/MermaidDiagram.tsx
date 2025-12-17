/**
 * MermaidDiagram Component
 *
 * Client-side wrapper for rendering Mermaid.js flow diagrams
 * with custom theme matching the Rationale design system.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
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

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (chart && ref.current) {
      const uniqueId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      try {
        mermaid.render(uniqueId, chart).then(({ svg }) => {
          setSvg(svg);
          setError('');
        }).catch((error) => {
          logger.error('Mermaid rendering error:', error);
          setError('Error rendering diagram. Please check the diagram syntax.');
        });
      } catch (error) {
        logger.error('Mermaid error:', error);
        setError('Error initializing diagram renderer.');
      }
    }
  }, [chart, id]);

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
