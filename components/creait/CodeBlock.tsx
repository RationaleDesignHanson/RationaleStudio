/**
 * CodeBlock Component
 *
 * Displays formatted code examples with syntax highlighting.
 * Used for API endpoints, database schemas, and implementation examples.
 */

'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showCopy?: boolean;
}

export function CodeBlock({ code, language = 'typescript', title, showCopy = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
      {/* Header */}
      {(title || showCopy) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <div className="text-xs font-medium text-muted uppercase tracking-wide">
            {title || language}
          </div>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="text-xs font-medium text-accent hover:text-accent/80 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}

      {/* Code */}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );
}

interface InlineCodeProps {
  children: string;
}

/**
 * Inline code snippet
 */
export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-muted/50 text-accent text-sm font-mono">
      {children}
    </code>
  );
}
