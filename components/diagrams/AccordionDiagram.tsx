'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface Section {
  id: string;
  title: string;
  icon?: string;
  color?: string;
  content: React.ReactNode;
}

interface AccordionDiagramProps {
  sections: Section[];
  title: string;
  defaultOpen?: string;  // ID of section to open by default
}

/**
 * Accordion Pattern
 *
 * For hierarchical information that doesn't need to be viewed all at once
 * Reduces scroll depth by collapsing sections
 *
 * @example
 * <AccordionDiagram
 *   sections={features}
 *   title="Platform Features"
 *   defaultOpen="core-features"
 * />
 */
export function AccordionDiagram({
  sections,
  title,
  defaultOpen
}: AccordionDiagramProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">{title}</h2>

      <Accordion.Root
        type="single"
        collapsible
        defaultValue={defaultOpen}
        className="space-y-3"
      >
        {sections.map((section) => (
          <Accordion.Item
            key={section.id}
            value={section.id}
            className="bg-gray-900/70 border border-gray-700 rounded-lg overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger
                className={cn(
                  'flex justify-between items-center w-full p-6 text-left',
                  'hover:bg-gray-800/50 transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-terminal-gold',
                  'group'
                )}
              >
                <div className="flex items-center gap-3">
                  {section.icon && (
                    <span className="text-3xl" aria-hidden="true">
                      {section.icon}
                    </span>
                  )}
                  <span className="text-xl font-semibold">{section.title}</span>
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-gray-400 transition-transform duration-200',
                    'group-data-[state=open]:rotate-180'
                  )}
                  aria-hidden="true"
                />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content
              className={cn(
                'overflow-hidden',
                'data-[state=open]:animate-accordion-down',
                'data-[state=closed]:animate-accordion-up'
              )}
            >
              <div className="p-6 pt-0">{section.content}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <style jsx global>{`
        @keyframes accordion-down {
          from {
            height: 0;
          }
          to {
            height: var(--radix-accordion-content-height);
          }
        }

        @keyframes accordion-up {
          from {
            height: var(--radix-accordion-content-height);
          }
          to {
            height: 0;
          }
        }

        .animate-accordion-down {
          animation: accordion-down 0.2s ease-out;
        }

        .animate-accordion-up {
          animation: accordion-up 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
