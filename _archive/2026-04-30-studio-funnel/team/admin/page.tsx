/**
 * Team Admin Page
 *
 * User management, system settings, and analytics dashboard
 */

import Link from 'next/link';
import { UserPlus, Settings, TrendingUp, Check, X, AlertCircle } from 'lucide-react';
import { teamContent } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Tools | Team Portal | Rationale',
  description: 'User management and system administration for Rationale',
};

export default function TeamAdminPage() {
  const { admin } = teamContent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl md:text-5xl font-bold text-white">
              {admin.hero.title}
            </h1>
          </div>
          <p className="text-xl text-purple-400 mb-4">{admin.hero.subtitle}</p>
          <p className="text-base text-gray-300 max-w-3xl">{admin.hero.description}</p>
        </div>
      </section>

      {/* User Management */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {admin.userManagement.title}
              </h2>
              <p className="text-sm text-gray-400">{admin.userManagement.description}</p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors font-medium"
              disabled
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
          </div>

          {/* Current Users Table */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/70 border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {admin.userManagement.currentUsers.map((user, idx) => (
                    <tr key={idx} className="hover:bg-gray-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30 capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
                          } capitalize`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{user.lastLogin}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{user.joinedDate}</td>
                      <td className="px-6 py-4">
                        <button
                          className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                          disabled
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Role Management */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Role Permissions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {admin.userManagement.roles.map((role, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-white">{role.name}</h4>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {role.count} {role.count === 1 ? 'user' : 'users'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{role.permissions}</p>
                  <button
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                    disabled
                  >
                    Edit Permissions →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* System Settings */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">{admin.systemSettings.title}</h2>

          <div className="space-y-8">
            {admin.systemSettings.categories.map((category, idx) => (
              <div key={idx} className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-4">{category.name}</h3>
                <div className="space-y-3">
                  {category.settings.map((setting, sidx) => (
                    <div
                      key={sidx}
                      className="flex items-center justify-between p-4 bg-gray-900/70 border border-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="text-sm font-semibold text-white">{setting.name}</p>
                          {setting.status && (
                            <>
                              {setting.status === 'Enabled' || setting.status === 'Connected' ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : setting.status === 'Requires Setup' || setting.status === 'Not Connected' ? (
                                <X className="w-4 h-4 text-red-400" />
                              ) : null}
                            </>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          {setting.status || setting.value}
                        </p>
                      </div>
                      <button
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          setting.status === 'Requires Setup' || setting.status === 'Not Connected'
                            ? 'bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30'
                            : 'bg-gray-900/70 border border-gray-800 text-gray-300 hover:border-purple-400/50'
                        }`}
                        disabled
                      >
                        {setting.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Analytics */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">{admin.analytics.title}</h2>
              <p className="text-sm text-gray-400">{admin.analytics.description}</p>
            </div>
          </div>

          <div className="space-y-8">
            {admin.analytics.metrics.map((metric, idx) => (
              <div key={idx} className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-4">{metric.category}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {metric.data.map((item, didx) => (
                    <div key={didx} className="p-4 bg-gray-900/70 border border-gray-800 rounded-lg">
                      <p className="text-xs font-semibold text-purple-400 mb-2">{item.label}</p>
                      <p className="text-2xl font-bold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Firebase Admin SDK Alert */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                Action Required: Firebase Admin SDK
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                The Firebase Admin SDK needs to be configured before you can manage users and deploy protected routes to production. This is critical for authentication security.
              </p>
              <Link
                href="/docs/firebase-admin-setup"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-medium rounded-lg transition-colors border border-yellow-500/40"
              >
                View Setup Guide
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
