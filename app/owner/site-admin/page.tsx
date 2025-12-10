'use client';

import { useState, useEffect } from 'react';
import { Search, Trash2, Archive, ExternalLink, Filter, Download } from 'lucide-react';

interface PageEntry {
  route: string;
  category: 'public' | 'client-portal' | 'investor' | 'team' | 'partner' | 'visual-test' | 'admin' | 'api';
  title: string;
  filePath: string;
  lastModified?: string;
  fileSize?: string;
  isProtected: boolean;
  isDuplicate?: boolean;
}

const CATEGORY_COLORS = {
  public: 'bg-blue-100 text-blue-700 border-blue-200',
  'client-portal': 'bg-purple-100 text-purple-700 border-purple-200',
  investor: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  team: 'bg-green-100 text-green-700 border-green-200',
  partner: 'bg-pink-100 text-pink-700 border-pink-200',
  'visual-test': 'bg-orange-100 text-orange-700 border-orange-200',
  admin: 'bg-gray-100 text-gray-700 border-gray-200',
  api: 'bg-indigo-100 text-indigo-700 border-indigo-200',
};

export default function SiteAdminPage() {
  const [pages, setPages] = useState<PageEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [sortBy, setSortBy] = useState<'route' | 'lastModified' | 'category'>('route');

  // Fetch pages on mount
  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/pages');
      const data = await response.json();
      setPages(data.pages || []);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    } finally {
      setLoading(false);
    }
  }

  // Determine if a page is a deletion candidate
  function isDeletionCandidate(page: PageEntry): boolean {
    return (
      page.filePath.includes('/archive/') ||
      page.filePath.includes('-old') ||
      page.filePath.includes('-backup') ||
      page.category === 'visual-test' ||
      page.isDuplicate === true
    );
  }

  // Filter and search pages
  const filteredPages = pages
    .filter(page => {
      if (categoryFilter !== 'all' && page.category !== categoryFilter) return false;

      // Status filter
      if (statusFilter === 'duplicates' && !page.isDuplicate) return false;
      if (statusFilter === 'protected' && !page.isProtected) return false;
      if (statusFilter === 'deletion-candidates' && !isDeletionCandidate(page)) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          page.route.toLowerCase().includes(query) ||
          page.title.toLowerCase().includes(query) ||
          page.filePath.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'route') return a.route.localeCompare(b.route);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      if (sortBy === 'lastModified') {
        const dateA = a.lastModified ? new Date(a.lastModified) : new Date(0);
        const dateB = b.lastModified ? new Date(b.lastModified) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

  // Calculate stats
  const stats = {
    total: pages.length,
    byCategory: pages.reduce((acc, page) => {
      acc[page.category] = (acc[page.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    duplicates: pages.filter(p => p.isDuplicate).length,
    protected: pages.filter(p => p.isProtected).length,
    deletionCandidates: pages.filter(p => isDeletionCandidate(p)).length,
  };

  // Toggle page selection
  function togglePage(filePath: string) {
    const newSelection = new Set(selectedPages);
    if (newSelection.has(filePath)) {
      newSelection.delete(filePath);
    } else {
      newSelection.add(filePath);
    }
    setSelectedPages(newSelection);
  }

  // Select all filtered pages
  function selectAll() {
    const newSelection = new Set(filteredPages.map(p => p.filePath));
    setSelectedPages(newSelection);
  }

  // Clear selection
  function clearSelection() {
    setSelectedPages(new Set());
  }

  // Delete selected pages
  async function deleteSelected(action: 'archive' | 'delete') {
    if (confirmText !== 'DELETE') {
      alert('Please type DELETE to confirm');
      return;
    }

    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filePaths: Array.from(selectedPages),
          action,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`${result.results.length} pages ${action}d successfully`);
        setDeleteModalOpen(false);
        setConfirmText('');
        setSelectedPages(new Set());
        fetchPages();
      } else {
        alert(`Errors occurred: ${result.errors.length} pages failed`);
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete pages');
    }
  }

  // Export selected pages
  function exportSelection() {
    const selected = pages.filter(p => selectedPages.has(p.filePath));
    const csv = [
      'Route,Category,Title,FilePath,LastModified,FileSize,IsProtected,IsDuplicate',
      ...selected.map(p =>
        `${p.route},${p.category},${p.title},"${p.filePath}",${p.lastModified || ''},${p.fileSize || ''},${p.isProtected},${p.isDuplicate || false}`
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `page-selection-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Scanning pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Site Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage all pages across the website</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Total Pages</div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Client Portals</div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.byCategory['client-portal'] || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Protected</div>
            <div className="text-2xl sm:text-3xl font-bold text-green-600">{stats.protected}</div>
          </div>
          <div
            className="bg-white rounded-lg shadow p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setStatusFilter('duplicates')}
          >
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Duplicates</div>
            <div className="text-2xl sm:text-3xl font-bold text-red-600">{stats.duplicates}</div>
          </div>
          <div
            className="bg-white rounded-lg shadow p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow col-span-2 sm:col-span-1"
            onClick={() => setStatusFilter('deletion-candidates')}
          >
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Deletion Candidates</div>
            <div className="text-2xl sm:text-3xl font-bold text-orange-600">{stats.deletionCandidates}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by route, title, or file path..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="public">Public</option>
                  <option value="client-portal">Client Portal</option>
                  <option value="investor">Investor</option>
                  <option value="team">Team</option>
                  <option value="partner">Partner</option>
                  <option value="visual-test">Visual Test</option>
                  <option value="admin">Admin</option>
                  <option value="api">API</option>
                </select>
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="duplicates">Duplicates Only</option>
                <option value="protected">Protected Only</option>
                <option value="deletion-candidates">Deletion Candidates</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white sm:col-span-2 lg:col-span-2"
              >
                <option value="route">Sort by Route</option>
                <option value="category">Sort by Category</option>
                <option value="lastModified">Sort by Date</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-600">
              Showing {filteredPages.length} of {stats.total} pages
            </span>
            {(categoryFilter !== 'all' || statusFilter !== 'all') && (
              <>
                <span className="text-sm text-gray-400">•</span>
                <div className="flex gap-2">
                  {categoryFilter !== 'all' && (
                    <button
                      onClick={() => setCategoryFilter('all')}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1 hover:bg-blue-200 transition-colors"
                    >
                      Category: {categoryFilter}
                      <span className="text-blue-900">×</span>
                    </button>
                  )}
                  {statusFilter !== 'all' && (
                    <button
                      onClick={() => setStatusFilter('all')}
                      className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors ${
                        statusFilter === 'duplicates' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                        statusFilter === 'protected' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                        'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      }`}
                    >
                      {statusFilter === 'duplicates' && 'Duplicates'}
                      {statusFilter === 'protected' && 'Protected'}
                      {statusFilter === 'deletion-candidates' && 'Deletion Candidates'}
                      <span>×</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedPages.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-medium text-blue-900 text-sm sm:text-base">
                  {selectedPages.size} pages selected
                </span>
                <button
                  onClick={clearSelection}
                  className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
                >
                  Clear
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={exportSelection}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Export CSV</span>
                  <span className="sm:hidden">Export</span>
                </button>
                <button
                  onClick={() => setDeleteModalOpen(true)}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Delete Selected</span>
                  <span className="sm:hidden">Delete</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pages Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left sticky left-0 bg-gray-50 z-10">
                      <input
                        type="checkbox"
                        checked={selectedPages.size === filteredPages.length && filteredPages.length > 0}
                        onChange={(e) => e.target.checked ? selectAll() : clearSelection()}
                        className="rounded border-gray-300 w-3 h-3 sm:w-4 sm:h-4"
                      />
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Route</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Category</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap hidden lg:table-cell">Title</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap hidden md:table-cell">Last Modified</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap hidden xl:table-cell">Size</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredPages.map((page) => {
                    const isCandidate = isDeletionCandidate(page);
                    return (
                      <tr key={page.filePath} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4 sticky left-0 bg-white hover:bg-gray-50 z-10">
                          <input
                            type="checkbox"
                            checked={selectedPages.has(page.filePath)}
                            onChange={() => togglePage(page.filePath)}
                            className="rounded border-gray-300 w-3 h-3 sm:w-4 sm:h-4"
                          />
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <code className="text-xs sm:text-sm text-gray-900 break-all">{page.route}</code>
                            <div className="flex flex-wrap gap-1">
                              {page.isDuplicate && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full whitespace-nowrap">
                                  Duplicate
                                </span>
                              )}
                              {page.isProtected && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full whitespace-nowrap">
                                  Protected
                                </span>
                              )}
                              {isCandidate && !page.isDuplicate && (
                                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full whitespace-nowrap">
                                  Delete?
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${CATEGORY_COLORS[page.category]}`}>
                            {page.category}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-900 max-w-xs truncate hidden lg:table-cell">
                          {page.title}
                        </td>
                        <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap hidden md:table-cell">
                          {page.lastModified ? new Date(page.lastModified).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap hidden xl:table-cell">
                          {page.fileSize || '-'}
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <a
                            href={page.route}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs sm:text-sm whitespace-nowrap"
                          >
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">View</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h2>

            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                You are about to delete <strong>{selectedPages.size} pages</strong>.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Type <strong>DELETE</strong> to confirm this action.
              </p>

              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type DELETE"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => deleteSelected('archive')}
                disabled={confirmText !== 'DELETE'}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Archive className="w-4 h-4" />
                Archive
              </button>
              <button
                onClick={() => deleteSelected('delete')}
                disabled={confirmText !== 'DELETE'}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setConfirmText('');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
