/**
 * Dashboard Access Request Page
 *
 * Gate for stealth venture full documentation access.
 * Investors and strategic partners can request credentials.
 */

'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Section } from '@/components/layout';
import { Hero } from '@/components/sections/Hero';
import { ASCIIWaveDivider, ASCIIUnifiedGrid, GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary } from '@/components/ui';

function DashboardAccessForm() {
  const searchParams = useSearchParams();
  const defaultProject = searchParams.get('project') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: defaultProject,
    interestType: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const heroTheme = getSectionTheme('hero');
  const formTheme = getSectionTheme('content');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: `Dashboard Access Request: ${formData.project}`,
          type: 'dashboard-access'
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          project: defaultProject,
          interestType: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {/* Hero */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme} noPaddingBottom={true}>
        <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} />
        <Container className="relative z-20">
          <Hero
            title="Request Access to Full Documentation"
            subtitle="Qualified investors and strategic partners"
            description="Our stealth ventures have complete roadmaps, technical specifications, and financial projections. We share these with qualified partners after a brief conversation."
            centered={false}
          />
        </Container>
      </Section>

      <ASCIIWaveDivider colorTheme={heroTheme} opacity={0.3} />

      {/* Form */}
      <Section spacing="large" background="default" colorTheme={formTheme}>
        <Container>
          <div className="max-w-2xl mx-auto">
            <GlassCard theme={formTheme} className="p-6 sm:p-8 lg:p-12">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Request Received</h3>
                  <p className="text-base text-muted mb-6">
                    We'll review your request and send access credentials within 24 hours. Check your email for next steps.
                  </p>
                  <ButtonPrimary href="/ventures" size="md">
                    ← Back to Ventures
                  </ButtonPrimary>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your company or fund"
                    />
                  </div>

                  {/* Project */}
                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-foreground mb-2">
                      Which venture? *
                    </label>
                    <select
                      id="project"
                      name="project"
                      required
                      value={formData.project}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select a venture</option>
                      <option value="atlas">Project Atlas · CRE Intelligence</option>
                      <option value="amplify">Project Amplify · NIL Platform</option>
                      <option value="both">Both ventures</option>
                    </select>
                  </div>

                  {/* Interest Type */}
                  <div>
                    <label htmlFor="interestType" className="block text-sm font-medium text-foreground mb-2">
                      Interest type *
                    </label>
                    <select
                      id="interestType"
                      name="interestType"
                      required
                      value={formData.interestType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select your interest</option>
                      <option value="investor">Investor / Venture Partner</option>
                      <option value="strategic">Strategic Partnership</option>
                      <option value="client">Potential Client / Customer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder="Tell us about your interest or any specific questions..."
                    />
                  </div>

                  {/* Submit */}
                  <div>
                    <ButtonPrimary
                      type="submit"
                      size="lg"
                      disabled={status === 'submitting'}
                      className="w-full"
                    >
                      {status === 'submitting' ? 'Sending...' : 'Request Access'}
                    </ButtonPrimary>
                  </div>

                  {status === 'error' && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-center">
                      <p className="text-sm text-red-600">
                        Something went wrong. Please try again or email us directly at{' '}
                        <a href="mailto:hello@rationale.studio" className="underline">
                          hello@rationale.studio
                        </a>
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-muted text-center">
                    We typically respond within 24 hours with access credentials or next steps.
                  </p>
                </form>
              )}
            </GlassCard>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default function DashboardAccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardAccessForm />
    </Suspense>
  );
}
