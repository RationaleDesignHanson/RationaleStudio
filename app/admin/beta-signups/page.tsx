'use client'

import { useEffect, useState } from 'react'
import { getBetaSignups, serializeBetaSignup, BetaSignup as FirestoreBetaSignup } from '@/lib/firestore/beta-signups'
import { logger } from '@/lib/utils/logger';

interface BetaSignup {
  id: string
  email: string
  app_name: 'zero' | 'heirloom'
  signed_up_at: string
  signup_source: string | null
  email_sent: boolean
  email_sent_at: string | null
}

export default function BetaSignupsAdmin() {
  const [signups, setSignups] = useState<BetaSignup[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'zero' | 'heirloom'>('all')
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  useEffect(() => {
    fetchSignups()
  }, [filter])

  const fetchSignups = async () => {
    setLoading(true)

    try {
      const filterArg = filter !== 'all' ? { app_name: filter } : undefined
      const data = await getBetaSignups(filterArg)

      // Serialize Firestore Timestamps to ISO strings
      const serialized = data.map(serializeBetaSignup)
      setSignups(serialized)
    } catch (error) {
      logger.error('Error fetching signups:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2000)
  }

  const copyAllEmails = () => {
    const emails = signups.map(s => s.email).join(', ')
    navigator.clipboard.writeText(emails)
    setCopiedEmail('all')
    setTimeout(() => setCopiedEmail(null), 2000)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const stats = {
    total: signups.length,
    zero: signups.filter(s => s.app_name === 'zero').length,
    heirloom: signups.filter(s => s.app_name === 'heirloom').length,
    invited: signups.filter(s => s.email_sent).length,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Beta Signups</h1>
          <p className="text-gray-600">Phase 1 Internal Testing - Manual Invites</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Signups</div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg border-2 border-terminal-gold p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Zero</div>
            <div className="text-3xl font-bold text-gray-900">{stats.zero}</div>
          </div>
          <div className="bg-white rounded-lg border-2 border-[#E85D4D] p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Heirloom</div>
            <div className="text-3xl font-bold text-gray-900">{stats.heirloom}</div>
          </div>
          <div className="bg-white rounded-lg border-2 border-green-500 p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Invited</div>
            <div className="text-3xl font-bold text-gray-900">{stats.invited}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilter('zero')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'zero'
                    ? 'bg-terminal-gold text-black'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Zero ({stats.zero})
              </button>
              <button
                onClick={() => setFilter('heirloom')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'heirloom'
                    ? 'bg-[#E85D4D] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Heirloom ({stats.heirloom})
              </button>
            </div>

            <button
              onClick={copyAllEmails}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all"
            >
              {copiedEmail === 'all' ? 'Copied!' : 'Copy All Emails'}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading signups...</div>
          ) : signups.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No signups yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      App
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Signed Up
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {signups.map((signup) => (
                    <tr key={signup.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{signup.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            signup.app_name === 'zero'
                              ? 'bg-terminal-gold/20 text-[#B8860B]'
                              : 'bg-[#E85D4D]/20 text-[#B8341A]'
                          }`}
                        >
                          {signup.app_name === 'zero' ? 'Zero' : 'Heirloom'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {signup.signup_source || 'unknown'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(signup.signed_up_at)}
                      </td>
                      <td className="px-6 py-4">
                        {signup.email_sent ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Invited
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => copyEmail(signup.email)}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {copiedEmail === signup.email ? 'Copied!' : 'Copy'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">How to Invite Testers</h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li>1. Click "Copy" to copy an email address</li>
            <li>2. Go to App Store Connect → TestFlight → Internal Testing</li>
            <li>3. Add the tester to your internal group</li>
            <li>4. Apple sends them the TestFlight invite automatically</li>
            <li>5. Send them your testing instructions via email</li>
          </ol>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-xs text-blue-700">
              <strong>Testing Instructions:</strong><br />
              Zero: /Users/matthanson/Zer0_Inbox/TESTFLIGHT_TESTING_NOTE.md<br />
              Heirloom: /Users/matthanson/Heirloom/HeriloomBetaTests/TESTFLIGHT_INSTRUCTIONS.txt
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
