/**
 * Gannett Partnership Pitch
 *
 * Example pitch content for Gannett demonstrating AI integration opportunities
 */

'use client';

import Link from 'next/link';
import {
import { ButtonPrimary } from '@/components/ui/ButtonHierarchy';
  Newspaper,
  Brain,
  TrendingUp,
  Users,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  Mail,
  Calendar,
} from 'lucide-react';

export function GannettPitch() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-gold/10 border border-terminal-gold/30 rounded-full text-sm text-terminal-gold mb-6">
          <Newspaper className="w-4 h-4" />
          Media & Publishing AI Partnership
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          AI-Powered Newsroom & <br />Content Intelligence for Gannett
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Transform how USA Today and local publications leverage AI for content creation, audience insights, and operational efficiency
        </p>
      </div>

      {/* The Opportunity */}
      <div className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-terminal-gold/10 rounded-lg">
            <Target className="w-6 h-6 text-terminal-gold" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">The Opportunity</h2>
            <p className="text-gray-400 leading-relaxed">
              Gannett operates 200+ daily publications reaching 140M+ unique visitors monthly. The challenge: maintaining quality journalism at scale while competing with digital-native publishers who leverage AI for speed and personalization.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-gray-800/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Content Velocity</h3>
            <p className="text-sm text-gray-400">
              AI-assisted writing and editing to increase output without sacrificing quality
            </p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Audience Intelligence</h3>
            <p className="text-sm text-gray-400">
              Real-time insights into what content resonates across 200+ local markets
            </p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Operational Efficiency</h3>
            <p className="text-sm text-gray-400">
              Automate repetitive tasks so journalists focus on investigative work
            </p>
          </div>
        </div>
      </div>

      {/* Our Approach */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          AI Integration Built for Newsrooms
        </h2>

        <div className="space-y-6">
          <div className="p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-terminal-gold/10 rounded-lg">
                <Brain className="w-6 h-6 text-terminal-gold" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">1. AI Newsroom Assistant</h3>
                <p className="text-gray-400 mb-4">
                  Context-aware AI that understands AP Style, local market nuances, and Gannett's editorial standards
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Draft local coverage from wire stories, council meetings, and press releases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Suggest headlines, pull quotes, and SEO optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Fact-check and verify sources against Gannett's database</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-terminal-gold/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-terminal-gold" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">2. Content Intelligence Platform</h3>
                <p className="text-gray-400 mb-4">
                  Unified dashboard showing what's working across your entire network
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Predict which stories will drive subscriptions vs. ad revenue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Identify content gaps and opportunities by market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>A/B test headlines and formats automatically</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-terminal-gold/10 rounded-lg">
                <Users className="w-6 h-6 text-terminal-gold" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">3. Subscriber Intelligence Engine</h3>
                <p className="text-gray-400 mb-4">
                  Understand and predict subscriber behavior across 200+ publications
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Personalized content recommendations per subscriber</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Churn prediction and retention interventions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Local news affinity scoring for targeted offers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Rationale */}
      <div className="p-8 bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-terminal-gold/30 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Why Partner with Rationale Studio?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <Zap className="w-6 h-6 text-terminal-gold flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-white mb-1">Rapid Prototyping</h3>
              <p className="text-sm text-gray-400">
                We build AI prototypes in weeks, not months. Test with real newsrooms before full rollout.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Brain className="w-6 h-6 text-terminal-gold flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-white mb-1">Domain Expertise</h3>
              <p className="text-sm text-gray-400">
                We understand editorial workflows, not just technology. Built for journalists, not engineers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Target className="w-6 h-6 text-terminal-gold flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-white mb-1">Cost-Effective</h3>
              <p className="text-sm text-gray-400">
                Fixed-price sprints with clear deliverables. No long-term consulting contracts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-terminal-gold flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-white mb-1">Proven Track Record</h3>
              <p className="text-sm text-gray-400">
                Built Zero (email AI), Atlas (CRE intelligence), and Amplify (NIL platform) in last 12 months.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Model */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Proposed Engagement
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="text-terminal-gold font-bold text-sm mb-2">PHASE 1</div>
            <h3 className="text-xl font-bold text-white mb-3">Discovery Sprint</h3>
            <p className="text-sm text-gray-400 mb-4">2 weeks • $15K</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Interview 10+ journalists across markets</li>
              <li>• Analyze current AI usage & pain points</li>
              <li>• Prototype 1 high-impact AI feature</li>
              <li>• Deliver roadmap for full integration</li>
            </ul>
          </div>

          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="text-terminal-gold font-bold text-sm mb-2">PHASE 2</div>
            <h3 className="text-xl font-bold text-white mb-3">Pilot Build</h3>
            <p className="text-sm text-gray-400 mb-4">8 weeks • $60K</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Build AI Newsroom Assistant MVP</li>
              <li>• Deploy to 3 pilot newsrooms</li>
              <li>• Train editorial staff</li>
              <li>• Measure impact on efficiency & quality</li>
            </ul>
          </div>

          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="text-terminal-gold font-bold text-sm mb-2">PHASE 3</div>
            <h3 className="text-xl font-bold text-white mb-3">Scale & Expand</h3>
            <p className="text-sm text-gray-400 mb-4">6 months • Custom pricing</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Roll out across all 200+ publications</li>
              <li>• Build Content Intelligence Platform</li>
              <li>• Integrate with existing CMS & tools</li>
              <li>• Ongoing support & feature development</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Expected Impact */}
      <div className="p-8 bg-gray-900/30 border border-gray-800 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Expected Impact (6 Months)
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-terminal-gold mb-2">+40%</div>
            <p className="text-sm text-gray-400">Content output per journalist</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-terminal-gold mb-2">-30%</div>
            <p className="text-sm text-gray-400">Time on routine tasks</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-terminal-gold mb-2">+25%</div>
            <p className="text-sm text-gray-400">Subscriber engagement</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-terminal-gold mb-2">$2M+</div>
            <p className="text-sm text-gray-400">Annual cost savings</p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Meet the Team</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-terminal-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-terminal-gold">MH</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Matt Hanson</h3>
              <p className="text-sm text-terminal-gold mb-2">Founder & Product Lead</p>
              <p className="text-sm text-gray-400">
                Former product manager at tech startups. Built 3 AI products in last 12 months. Stanford CS background.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-400">
              <strong className="text-white">Extended Team:</strong> Access to network of AI engineers, UX designers, and editorial consultants with newsroom experience at NYT, WSJ, and Bloomberg.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-12 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-transparent border border-terminal-gold/30 rounded-lg">
        <h2 className="text-3xl font-bold text-white mb-4">
          Let's Transform Journalism Together
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Schedule a 30-minute call to discuss how AI can empower your newsrooms without replacing journalists
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-terminal-gold/90 transition-colors text-lg"
          >
            <Calendar className="w-5 h-5" />
            Schedule Discovery Call
          </Link>
          <Link
            href="mailto:hanson@rationale.work"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors text-lg"
          >
            <Mail className="w-5 h-5" />
            Email Matt
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          hanson@rationale.work • Based in USA
        </p>
      </div>
    </div>
  );
}
