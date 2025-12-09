/**
 * Outbound Tracking Dashboard
 *
 * Track pitch sends, opens, responses, and conversions
 * Visualize outbound pipeline and performance metrics
 */

'use client';

import { useState } from 'react';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import {
  Mail, TrendingUp, Users, Target, Calendar, BarChart3,
  ExternalLink, Plus, Search, Filter, Download
} from 'lucide-react';
import Link from 'next/link';

interface OutboundLead {
  id: string;
  company: string;
  vertical: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  status: 'draft' | 'sent' | 'opened' | 'replied' | 'meeting' | 'qualified' | 'closed-won' | 'closed-lost';
  sentDate?: Date;
  openedDate?: Date;
  repliedDate?: Date;
  meetingDate?: Date;
  pitchTemplate: string;
  notes: string;
  score: number; // 0-100 qualification score
}

// Mock data for demonstration
const mockLeads: OutboundLead[] = [
  {
    id: '1',
    company: 'Acme SaaS Inc',
    vertical: 'Enterprise SaaS',
    contactName: 'Sarah Chen',
    contactTitle: 'VP of Product',
    contactEmail: 'sarah@acmesaas.com',
    status: 'meeting',
    sentDate: new Date('2025-01-05'),
    openedDate: new Date('2025-01-05'),
    repliedDate: new Date('2025-01-06'),
    meetingDate: new Date('2025-01-15'),
    pitchTemplate: 'enterprise-saas',
    notes: 'Looking to integrate AI into analytics platform. Strong product-market fit, 200 employees.',
    score: 85
  },
  {
    id: '2',
    company: 'HealthTech Pro',
    vertical: 'Healthcare/MedTech',
    contactName: 'Dr. Michael Torres',
    contactTitle: 'CTO',
    contactEmail: 'm.torres@healthtechpro.com',
    status: 'opened',
    sentDate: new Date('2025-01-07'),
    openedDate: new Date('2025-01-07'),
    pitchTemplate: 'healthcare-medtech',
    notes: 'Patient engagement platform, need AI for clinical insights. HIPAA compliance critical.',
    score: 75
  },
  {
    id: '3',
    company: 'FinanceFlow',
    vertical: 'Fintech',
    contactName: 'Jessica Martinez',
    contactTitle: 'Head of Engineering',
    contactEmail: 'jessica.m@financeflow.io',
    status: 'sent',
    sentDate: new Date('2025-01-08'),
    pitchTemplate: 'fintech',
    notes: 'Lending platform, need AI for credit decisioning. Regulatory compliance required.',
    score: 70
  }
];

export default function OutboundTrackerPage() {
  const [leads, setLeads] = useState<OutboundLead[]>(mockLeads);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculate metrics
  const totalLeads = leads.length;
  const sentLeads = leads.filter(l => l.status !== 'draft').length;
  const openRate = sentLeads > 0 ?
    (leads.filter(l => l.openedDate).length / sentLeads * 100).toFixed(1) : '0';
  const replyRate = sentLeads > 0 ?
    (leads.filter(l => l.repliedDate).length / sentLeads * 100).toFixed(1) : '0';
  const meetingRate = sentLeads > 0 ?
    (leads.filter(l => l.status === 'meeting' || l.status === 'qualified').length / sentLeads * 100).toFixed(1) : '0';

  const statusColors: Record<string, string> = {
    draft: 'gray',
    sent: 'blue',
    opened: 'yellow',
    replied: 'purple',
    meeting: 'green',
    qualified: 'emerald',
    'closed-won': 'green',
    'closed-lost': 'red'
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.04}
          animated={true}
          colorTheme={watercolorThemes.terminalSubtle}
          charSet="default"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                Outbound Tracker
              </h1>
              <p className="text-gray-400">
                Track pitch sends, opens, responses, and conversions
              </p>
            </div>
            <button className="px-4 py-2 bg-[#FFD700] hover:bg-[#FFE34D] text-black font-medium rounded transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Lead
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-[#FFD700]" />
              <span className="text-xs text-gray-400">Total Leads</span>
            </div>
            <div className="text-3xl font-bold text-white">{totalLeads}</div>
          </div>

          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <span className="text-xs text-gray-400">Open Rate</span>
            </div>
            <div className="text-3xl font-bold text-white">{openRate}%</div>
          </div>

          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-xs text-gray-400">Reply Rate</span>
            </div>
            <div className="text-3xl font-bold text-white">{replyRate}%</div>
          </div>

          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-xs text-gray-400">Meeting Rate</span>
            </div>
            <div className="text-3xl font-bold text-white">{meetingRate}%</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies, contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD700]"
              />
            </div>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded text-white focus:outline-none focus:border-[#FFD700]"
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="opened">Opened</option>
            <option value="replied">Replied</option>
            <option value="meeting">Meeting Scheduled</option>
            <option value="qualified">Qualified</option>
          </select>

          <button className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded text-white hover:border-[#FFD700] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Leads Table */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Vertical
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{lead.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{lead.contactName}</div>
                      <div className="text-xs text-gray-400">{lead.contactTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">
                        {lead.vertical}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded bg-${statusColors[lead.status]}-500/20 border border-${statusColors[lead.status]}-500/40 text-${statusColors[lead.status]}-400`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FFD700]"
                            style={{ width: `${lead.score}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{lead.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {lead.repliedDate ? lead.repliedDate.toLocaleDateString() :
                       lead.openedDate ? lead.openedDate.toLocaleDateString() :
                       lead.sentDate?.toLocaleDateString() || 'Not sent'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-[#FFD700] hover:text-[#FFE34D] font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Status Breakdown */}
          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#FFD700]" />
              Pipeline Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries({
                'Sent': sentLeads,
                'Opened': leads.filter(l => l.openedDate).length,
                'Replied': leads.filter(l => l.repliedDate).length,
                'Meeting': leads.filter(l => l.status === 'meeting').length,
                'Qualified': leads.filter(l => l.status === 'qualified').length
              }).map(([label, count]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{label}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FFD700]"
                        style={{ width: `${sentLeads > 0 ? (count / sentLeads * 100) : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-white w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Performance */}
          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#FFD700]" />
              Performance by Vertical
            </h3>
            <div className="space-y-3">
              {['Enterprise SaaS', 'Healthcare/MedTech', 'Fintech'].map((vertical) => {
                const verticalLeads = leads.filter(l => l.vertical === vertical);
                const avgScore = verticalLeads.length > 0
                  ? Math.round(verticalLeads.reduce((sum, l) => sum + l.score, 0) / verticalLeads.length)
                  : 0;

                return (
                  <div key={vertical} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{vertical}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{verticalLeads.length} leads</span>
                      <span className="text-sm font-semibold text-white">{avgScore} avg</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
