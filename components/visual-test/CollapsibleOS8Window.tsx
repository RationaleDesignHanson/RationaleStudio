'use client';

import { useState } from 'react';
import { OS8Window } from './OS8Window';
import { cn } from '@/lib/utils/cn';

interface CollapsibleOS8WindowProps {
  title: string;
  variant?: 'default' | 'yellow' | 'minimal';
  defaultExpanded?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function CollapsibleOS8Window({
  title,
  variant = 'minimal',
  defaultExpanded = false,
  children,
  className,
}: CollapsibleOS8WindowProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={className}>
      <div
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <OS8Window
          title={title}
          variant={variant}
          animateIn={false}
          className="transition-all duration-300"
        >
          {/* Content with smooth expand/collapse */}
          <div
            className={cn(
              'transition-all duration-300 overflow-hidden',
              isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            {isExpanded && children}
          </div>

          {/* Preview when collapsed */}
          {!isExpanded && (
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="italic">Click to expand</span>
              <span className="text-lg font-bold">+</span>
            </div>
          )}
        </OS8Window>
      </div>
    </div>
  );
}
