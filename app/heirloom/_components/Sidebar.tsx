/**
 * Sidebar Component
 *
 * Navigation sidebar for Heirloom dashboard with active state highlighting.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ListChecks,
  Megaphone,
  DollarSign,
  Users,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/heirloom', icon: LayoutDashboard },
  { name: 'Launch Tracker', href: '/heirloom/roadmap', icon: ListChecks },
  { name: 'GTM Planner', href: '/heirloom/gtm', icon: Megaphone },
  { name: 'Financials', href: '/heirloom/financials', icon: DollarSign },
  { name: 'Fundraising', href: '/heirloom/fundraising', icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-gray-900 h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">H</span>
        </div>
        <div>
          <h1 className="text-white font-bold text-lg">Heirloom</h1>
          <p className="text-gray-400 text-xs">Business Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-800">
        <Link
          href="/logout"
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
}
