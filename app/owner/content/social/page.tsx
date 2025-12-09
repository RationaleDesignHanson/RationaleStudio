/**
 * Social Content Library
 *
 * LinkedIn posts, Twitter threads, carousel templates
 */

'use client';

import Link from 'next/link';
import { Share2, Image, MessageSquare } from 'lucide-react';

export default function SocialContentPage() {
  const templates = [
    {
      type: 'LinkedIn Post',
      category: 'Product Announcement',
      count: 5,
      icon: MessageSquare,
    },
    {
      type: 'LinkedIn Carousel',
      category: 'Case Study Highlights',
      count: 8,
      icon: Image,
    },
    {
      type: 'Twitter Thread',
      category: 'Product Tips',
      count: 12,
      icon: Share2,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/owner/content"
          className="text-sm text-gray-400 hover:text-terminal-gold transition-colors mb-4 inline-block"
        >
          ← Back to Content Library
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Social Content</h1>
        <p className="text-gray-400">
          Templates and drafts for LinkedIn, Twitter, and other social platforms
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {templates.map((template, idx) => {
          const Icon = template.icon;
          return (
            <div
              key={idx}
              className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-terminal-gold/30 transition-colors"
            >
              <Icon className="w-8 h-8 text-terminal-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{template.type}</h3>
              <p className="text-sm text-gray-400 mb-4">{template.category}</p>
              <div className="text-2xl font-bold text-terminal-gold mb-4">{template.count}</div>
              <button
                disabled
                className="w-full px-4 py-2 bg-gray-800 text-gray-600 text-sm font-medium rounded-lg cursor-not-allowed"
              >
                Browse Templates
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
        <h3 className="text-lg font-bold text-white mb-3">Social Content Workflow</h3>
        <p className="text-sm text-gray-400 mb-4">
          Future functionality for managing social content:
        </p>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Auto-generate social variants from blog posts</li>
          <li>• LinkedIn carousel builder (Figma integration)</li>
          <li>• Twitter thread composer with character counting</li>
          <li>• Schedule posts across platforms</li>
          <li>• Track engagement analytics</li>
        </ul>
      </div>
    </div>
  );
}
