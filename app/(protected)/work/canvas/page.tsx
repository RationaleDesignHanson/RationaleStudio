/**
 * Project Canvas Case Study
 * AI-powered thumbnail generation system for FUBO
 * Password Protected
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Hero } from '@/components/sections/Hero';
import { GlassCard } from '@/components/visual';
import { PasswordProtected } from '@/components/auth/PasswordProtected';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Canvas — FUBO Case Study | Rationale',
  description: 'AI-powered thumbnail generation system. Automated visual asset creation at scale for sports streaming platform.',
  robots: {
    index: false,
    follow: false,
  },
};

function CanvasContent() {
  const heroTheme = getSectionTheme('hero');
  const contentTheme = getSectionTheme('content');
  const featuresTheme = getSectionTheme('services');

  return (
    <>
      {/* Hero */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme}>
        <Container className="relative z-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={heroTheme} className="p-6 sm:p-8 lg:p-12">
              <div className="mb-6">
                <Link href="/about" className="text-accent hover:underline text-sm sm:text-base">
                  ← Back to About
                </Link>
              </div>

              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">
                  Confidential · FUBO · Head of Design
                </span>
              </div>

              <Hero
                title="Project Canvas"
                subtitle="AI-Powered Visual Asset Generation at Scale"
                description="Automated thumbnail generation system for sports streaming platform. From manual inconsistency to systematic quality across 200+ teams and 24 artistic styles."
                centered={false}
              />

              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-accent">200+</p>
                  <p className="text-sm text-muted">Teams Supported</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">24</p>
                  <p className="text-sm text-muted">AI Styles</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">90%+</p>
                  <p className="text-sm text-muted">QA Pass Rate</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Problem Statement */}
      <Section spacing="large" background="default" colorTheme={contentTheme}>
        <Container>
          <div className="max-w-3xl mx-auto">
            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">The Problem</h2>
              <p className="text-base text-muted mb-4">
                FUBO's content team was creating sports thumbnails manually—inconsistent quality,
                time-intensive process, no scalability across leagues and teams.
              </p>
              <ul className="space-y-3 text-sm text-muted">
                <li>• Manual creation bottleneck for 200+ teams across 8 leagues</li>
                <li>• Inconsistent visual quality and brand representation</li>
                <li>• No automated quality validation or approval workflow</li>
                <li>• Team color accuracy varied dramatically</li>
                <li>• No systematic approach to style differentiation (highlights vs. team channels)</li>
                <li>• Export and asset management completely manual</li>
              </ul>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Solution Overview */}
      <Section spacing="large" background="transparent" colorTheme={featuresTheme}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">The Solution</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard theme={featuresTheme} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">AI Generation Engine</h3>
                <p className="text-sm text-muted mb-3">
                  Google Gemini 2.5 Flash integration with 24 artistic styles organized into 5 themed packs:
                  Clean Channels, Bold Highlights, Portrait Cards, Premium Events, and Campaign Textured.
                </p>
                <p className="text-xs text-muted">
                  Sport-aware generation with automatic team color detection and style-appropriate reference images.
                </p>
              </GlassCard>

              <GlassCard theme={featuresTheme} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Automated QA System</h3>
                <p className="text-sm text-muted mb-3">
                  Dual-layer quality validation: Technical QA (color saturation, sharpness, artifacts) and
                  Visual Integrity QA (sport context, object detection, pose validation).
                </p>
                <p className="text-xs text-muted">
                  Scores 0-100 with automated pass/review/fail thresholds. 90%+ pass rate achieved.
                </p>
              </GlassCard>

              <GlassCard theme={featuresTheme} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Layout Preview System</h3>
                <p className="text-sm text-muted mb-3">
                  Canvas-based overlay validation for text and logo placement. Real-time contrast checking,
                  safe-zone validation, and collision detection before export.
                </p>
                <p className="text-xs text-muted">
                  2-level text hierarchy with configurable scrims and positioning templates.
                </p>
              </GlassCard>

              <GlassCard theme={featuresTheme} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Smart Export Pipeline</h3>
                <p className="text-sm text-muted mb-3">
                  Configurable naming schemas, batch export with metadata sidecar files, organized by
                  league/team/style. Multiple aspect ratios (16:9, 1:1, 9:16) generated simultaneously.
                </p>
                <p className="text-xs text-muted">
                  Timestamped filenames prevent overwrites. Full audit trail for governance.
                </p>
              </GlassCard>
            </div>
          </div>
        </Container>
      </Section>

      {/* Technical Implementation */}
      <Section spacing="large" background="default" colorTheme={contentTheme}>
        <Container>
          <div className="max-w-3xl mx-auto">
            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Technical Architecture</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">Python/Flask Backend</span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">Google Gemini 2.5 Flash</span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">Vanilla JS Frontend</span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">PIL/Pillow</span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">OpenCV.js</span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">Canvas API</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Key Features</h3>
                  <ul className="space-y-2 text-sm text-muted">
                    <li>• <span className="font-semibold text-foreground">Style Blending:</span> Combine up to 3 styles with weighted mixing</li>
                    <li>• <span className="font-semibold text-foreground">Bulk Processing:</span> Generate all 24 styles simultaneously with live progress</li>
                    <li>• <span className="font-semibold text-foreground">Ad-hoc Regeneration:</span> Fill gaps without re-running entire batches</li>
                    <li>• <span className="font-semibold text-foreground">Team Color Database:</span> 200+ teams with accurate brand colors</li>
                    <li>• <span className="font-semibold text-foreground">Sport Detection:</span> AI analyzes content and selects appropriate references</li>
                    <li>• <span className="font-semibold text-foreground">QA Dashboard:</span> Filter, sort, review, and bulk-action interface</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Coverage</h3>
                  <p className="text-sm text-muted mb-3">
                    8 leagues fully indexed: NFL, NBA, MLB, NHL, EPL, Bundesliga, La Liga, F1
                  </p>
                  <p className="text-sm text-muted">
                    200+ teams with complete metadata, logos, and color palettes
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Style Showcase */}
      <Section spacing="large" background="transparent" colorTheme={featuresTheme}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">24 AI-Powered Styles</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { pack: 'Clean Channels', styles: ['Gradient', 'Magazine', 'Spotlight', 'Hi-Contrast', 'Fubo'] },
                { pack: 'Bold Highlights', styles: ['Comic Book', 'Video Game', 'Ink Splatter', 'Glitch', 'Neon Noir'] },
                { pack: 'Portrait Cards', styles: ['Painterly', 'Players-Only', 'Risograph', 'Blueprint'] },
                { pack: 'Premium Events', styles: ['Double-Exposure', 'Holographic', 'Crystalline', 'Light Trails'] },
                { pack: 'Campaign Textured', styles: ['Papercraft', 'Claymation', 'Voxel', 'Retrofuturism'] },
              ].map((pack) => (
                <GlassCard key={pack.pack} theme={featuresTheme} className="p-4">
                  <h4 className="text-sm font-bold text-foreground mb-2">{pack.pack}</h4>
                  <ul className="text-xs text-muted space-y-1">
                    {pack.styles.map((style) => (
                      <li key={style}>• {style}</li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Impact */}
      <Section spacing="large" background="default" colorTheme={contentTheme}>
        <Container>
          <div className="max-w-3xl mx-auto">
            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Impact & Results</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-base font-semibold text-foreground mb-1">Systematic Quality at Scale</p>
                  <p className="text-sm text-muted">
                    From manual, inconsistent creation to automated generation with 90%+ QA pass rate.
                    200+ teams supported with consistent brand representation.
                  </p>
                </div>

                <div>
                  <p className="text-base font-semibold text-foreground mb-1">Creative Flexibility</p>
                  <p className="text-sm text-muted">
                    24 distinct artistic styles organized into themed packs. Content team can match
                    visual tone to content type (highlights vs. team channels vs. premium events).
                  </p>
                </div>

                <div>
                  <p className="text-base font-semibold text-foreground mb-1">Production-Ready System</p>
                  <p className="text-sm text-muted">
                    Complete end-to-end workflow from generation through QA validation to organized export.
                    Governance layer with audit trails and versioned configurations for reproducibility.
                  </p>
                </div>

                <div>
                  <p className="text-base font-semibold text-foreground mb-1">Scalable Architecture</p>
                  <p className="text-sm text-muted">
                    Built for expansion: easily add new leagues, teams, and styles. Multi-aspect-ratio support
                    (16:9, 1:1, 9:16) for cross-platform publishing.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg border border-accent/20 bg-accent/5">
                <p className="text-sm text-muted">
                  <span className="font-bold text-accent">Design Leadership:</span> This system demonstrates
                  systematic problem-solving at the intersection of AI, design systems, and production workflows.
                  Not just mockups—shipping code that solves real business problems.
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Project Context */}
      <Section spacing="large" background="transparent" colorTheme={featuresTheme}>
        <Container>
          <div className="max-w-3xl mx-auto">
            <GlassCard theme={featuresTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Project Context</h2>
              <div className="space-y-3 text-sm text-muted">
                <p>
                  <span className="font-semibold text-foreground">Role:</span> Head of Design, FUBO
                </p>
                <p>
                  <span className="font-semibold text-foreground">Timeline:</span> 14-week phased development (v1.0 → v6.0 roadmap)
                </p>
                <p>
                  <span className="font-semibold text-foreground">Scope:</span> Complete system design, AI prompt engineering,
                  QA architecture, and production workflow implementation
                </p>
                <p>
                  <span className="font-semibold text-foreground">Deliverable:</span> Self-contained web application with
                  Flask backend, JavaScript frontend, comprehensive documentation, and testing suite
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default function CanvasPage() {
  return (
    <PasswordProtected password="canvas2025" hint="project name + year">
      <CanvasContent />
    </PasswordProtected>
  );
}
