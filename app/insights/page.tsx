/**
 * Insights Landing Page
 *
 * Main landing page for Rationale insights, articles, and case studies
 * Used by 1 link across the site
 */

'use client';

import Link from 'next/link';
import { Container } from '@/components/layout';
import { BookOpen, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react';
import { ButtonPrimary } from '@/components/ui/ButtonHierarchy';

export default function InsightsPage() {
  const insights = [
    {
      slug: 'amplify-nil-platform',
      title: 'Amplify: AI-Powered NIL Platform for College Athletics',
      category: 'Product Strategy',
      date: 'December 2024',
      readTime: '8 min read',
      description: 'How we\'re building an AI platform to revolutionize Name, Image, and Likeness opportunities for college athletes.',
      icon: TrendingUp,
    },
    {
      slug: 'zero-email-ai',
      title: 'Zero: Rethinking Email with AI',
      category: 'AI Product',
      date: 'November 2024',
      readTime: '6 min read',
      description: 'Building an AI-first email experience that learns your preferences and automates inbox management.',
      icon: Lightbulb,
    },
    {
      slug: 'product-studio-model',
      title: 'The Product Studio Model: Building Multiple Ventures',
      category: 'Studio Strategy',
      date: 'October 2024',
      readTime: '10 min read',
      description: 'Why we chose the product studio model and how we build 2-3 ventures per year with AI acceleration.',
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <Container>
        <div className="py-16">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-gold/10 border border-terminal-gold/30 rounded-full text-sm text-terminal-gold mb-6">
              <BookOpen className="w-4 h-4" />
              Insights & Case Studies
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Product Studio Insights
            </h1>
            <p className="text-xl text-gray-400">
              Behind-the-scenes look at how we build AI-powered products and ventures
            </p>
          </div>

          {/* Insights Grid */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((insight) => {
              const Icon = insight.icon;
              return (
                <Link
                  key={insight.slug}
                  href={`/clients/insights/${insight.slug}`}
                  className="group"
                >
                  <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-terminal-gold/50 transition-all h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-terminal-gold/10 rounded-lg">
                        <Icon className="w-6 h-6 text-terminal-gold" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-terminal-gold transition-colors" />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs text-terminal-gold font-medium mb-2 uppercase tracking-wide">
                        {insight.category}
                      </p>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-terminal-gold transition-colors">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {insight.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800">
                      <span>{insight.date}</span>
                      <span>{insight.readTime}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-16 text-center p-8 bg-gray-900/30 border border-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-3">
              Want to Build with Us?
            </h3>
            <p className="text-gray-400 mb-6">
              We're looking for partners and investors to join us in building the next generation of AI-powered products
            </p>
            <div className="flex gap-4 justify-center">
              <ButtonPrimary href="/contact" size="lg">
                Get in Touch
              </ButtonPrimary>
              <ButtonPrimary href="/work" size="lg" className="bg-gray-800 hover:bg-gray-700">
                View Our Work
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
