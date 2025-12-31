/**
 * Heirloom Dashboard Layout
 *
 * Protected layout for Heirloom business dashboard with sidebar navigation.
 * Only accessible to users with 'owner' role (Matt).
 */

import { Sidebar } from './_components';

export const metadata = {
  title: 'Heirloom Dashboard | Rationale',
  description: 'Business dashboard for Heirloom iOS app - Launch tracking, metrics, and fundraising.',
};

export default function HeirloomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
