/**
 * Services Accordion Component
 *
 * Expandable accordion for service kits with pricing and details
 * Shows compact overview when collapsed, full details when expanded
 */

'use client';

import { useState } from 'react';
import type { WatercolorTheme } from '@/lib/theme/watercolor-palette';
import type { ServiceKit } from '@/lib/content/kits';

interface ServicesAccordionProps {
  services: ServiceKit[];
  theme: WatercolorTheme;
}

export function ServicesAccordion({ services, theme }: ServicesAccordionProps) {
  return (
    <div className="space-y-3">
      {services.map((service, index) => (
        <ServiceAccordionItem
          key={service.slug}
          service={service}
          index={index}
          theme={theme}
          defaultOpen={false}
        />
      ))}
    </div>
  );
}

interface ServiceAccordionItemProps {
  service: ServiceKit;
  index: number;
  theme: WatercolorTheme;
  defaultOpen: boolean;
}

function ServiceAccordionItem({ service, index, theme, defaultOpen }: ServiceAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="relative bg-background/50 backdrop-blur-sm rounded-lg overflow-hidden transition-all"
    >
      {/* ASCII Corner Brackets */}
      <div
        className="absolute top-2 left-2 transition-opacity font-mono text-sm pointer-events-none"
        style={{
          color: theme.primary,
          opacity: isOpen ? 1 : 0.3
        }}
      >
        ┌─
      </div>
      <div
        className="absolute top-2 right-2 transition-opacity font-mono text-sm pointer-events-none"
        style={{
          color: theme.primary,
          opacity: isOpen ? 1 : 0.3
        }}
      >
        ─┐
      </div>
      <div
        className="absolute bottom-2 left-2 transition-opacity font-mono text-sm pointer-events-none"
        style={{
          color: theme.primary,
          opacity: isOpen ? 1 : 0.3
        }}
      >
        └─
      </div>
      <div
        className="absolute bottom-2 right-2 transition-opacity font-mono text-sm pointer-events-none"
        style={{
          color: theme.primary,
          opacity: isOpen ? 1 : 0.3
        }}
      >
        ─┘
      </div>

      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between group min-h-[48px]"
      >
        <div className="flex items-center gap-4 flex-1">
          <span
            className="text-2xl font-mono font-black opacity-40 transition-opacity group-hover:opacity-60"
            style={{ color: theme.primary }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-accent transition-colors">
              {service.name}
            </h3>
            <p className="text-sm text-muted leading-relaxed mt-1">
              {service.tagline}
            </p>
            {/* Duration & Engagement Type - Visible when collapsed */}
            <div className="flex items-center gap-3 mt-2 text-sm">
              <span className="text-muted">{service.duration}</span>
              <span className="text-muted">·</span>
              <span className="text-muted">{service.pricing}</span>
            </div>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-muted transition-transform duration-300 flex-shrink-0 ml-4 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Accordion Content */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? '2000px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 space-y-4 sm:space-y-6 mx-2">
          {/* Description */}
          <div>
            <p className="text-muted leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* What You Get */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide opacity-60">
              What You Get
            </h4>
            <ul className="space-y-2">
              {service.whatYouGet.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <span className="text-accent mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide opacity-60">
              Deliverables
            </h4>
            <ul className="space-y-2">
              {service.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <span className="text-accent mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process (if available) */}
          {service.process && service.process.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide opacity-60">
                Process
              </h4>
              <ul className="space-y-2">
                {service.process.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-accent mt-1 font-mono">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Perfect For */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide opacity-60">
              Perfect For
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.perfectFor.map((item, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Case Study (if available) */}
          {service.caseStudy && (
            <div className="pt-4 border-t border-border/50">
              <h4 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide opacity-60">
                Case Study
              </h4>
              <div className="bg-background/50 rounded p-4">
                <h5 className="font-bold text-foreground mb-1">{service.caseStudy.title}</h5>
                <p className="text-sm text-muted mb-2">{service.caseStudy.description}</p>
                <p className="text-sm text-accent">{service.caseStudy.outcome}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
