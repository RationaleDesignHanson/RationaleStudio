import fs from 'fs';
import path from 'path';

export interface PageEntry {
  route: string;
  category: 'public' | 'client-portal' | 'investor' | 'team' | 'partner' | 'visual-test' | 'admin' | 'api';
  title: string;
  filePath: string;
  lastModified?: Date;
  fileSize?: string;
  isProtected: boolean;
  isDuplicate?: boolean;
}

/**
 * Scans the app directory and builds an inventory of all pages
 */
export async function scanPages(): Promise<PageEntry[]> {
  const appDir = path.join(process.cwd(), 'app');
  const pages: PageEntry[] = [];

  function scanDirectory(dir: string, route: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = fullPath.replace(process.cwd() + '/', '');

      if (entry.isDirectory()) {
        // Handle route groups (public), (visual-test), etc.
        let nextRoute = route;
        if (entry.name.startsWith('(') && entry.name.endsWith(')')) {
          // Route group - don't add to URL
          nextRoute = route;
        } else if (entry.name.startsWith('[') && entry.name.endsWith(']')) {
          // Dynamic route
          nextRoute = `${route}/${entry.name}`;
        } else {
          nextRoute = `${route}/${entry.name}`;
        }

        scanDirectory(fullPath, nextRoute);
      } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
        // Found a page file
        const stats = fs.statSync(fullPath);
        const category = categorizeRoute(relativePath);

        pages.push({
          route: route || '/',
          category,
          title: extractTitle(fullPath) || route || 'Home',
          filePath: relativePath,
          lastModified: stats.mtime,
          fileSize: formatBytes(stats.size),
          isProtected: isProtectedRoute(relativePath),
          isDuplicate: checkIfDuplicate(route, pages),
        });
      }
    }
  }

  scanDirectory(appDir);

  // Second pass: mark ALL pages with duplicate routes
  const routeCounts = new Map<string, number>();
  pages.forEach(page => {
    routeCounts.set(page.route, (routeCounts.get(page.route) || 0) + 1);
  });

  pages.forEach(page => {
    if (routeCounts.get(page.route)! > 1) {
      page.isDuplicate = true;
    }
  });

  return pages.sort((a, b) => a.route.localeCompare(b.route));
}

/**
 * Categorize routes based on their path
 */
function categorizeRoute(filePath: string): PageEntry['category'] {
  if (filePath.includes('(public)/')) return 'public';
  if (filePath.includes('(visual-test)/')) return 'visual-test';
  if (filePath.includes('/clients/')) return 'client-portal';
  if (filePath.includes('/invest')) return 'investor';
  if (filePath.includes('/investors')) return 'investor';
  if (filePath.includes('/team/')) return 'team';
  if (filePath.includes('/owner/')) return 'team';
  if (filePath.includes('/partners/')) return 'partner';
  if (filePath.includes('/partnerships/')) return 'partner';
  if (filePath.includes('/admin/')) return 'admin';
  if (filePath.includes('/api/')) return 'api';
  return 'public';
}

/**
 * Check if a route requires authentication
 */
function isProtectedRoute(filePath: string): boolean {
  const protectedPaths = ['/clients/', '/team/', '/owner/', '/admin/', '/invest', '/investors'];
  return protectedPaths.some(p => filePath.includes(p));
}

/**
 * Check if this route is a duplicate of an existing one
 */
function checkIfDuplicate(route: string, existingPages: PageEntry[]): boolean {
  return existingPages.some(p => p.route === route);
}

/**
 * Extract page title from file content
 */
function extractTitle(filePath: string): string | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Try to find metadata title
    const metadataMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
    if (metadataMatch) return metadataMatch[1];

    // Try to find <h1> or heading
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match) return h1Match[1];

    // Try to find Helmet/Head title
    const headMatch = content.match(/<title>([^<]+)<\/title>/);
    if (headMatch) return headMatch[1];

    return null;
  } catch {
    return null;
  }
}

/**
 * Format bytes to human-readable size
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Move page file to archive (soft delete)
 */
export async function archivePage(filePath: string): Promise<void> {
  const archiveDir = path.join(process.cwd(), '_archive');
  const targetPath = path.join(archiveDir, filePath);
  const sourcePath = path.join(process.cwd(), filePath);

  // Ensure archive directory exists
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  // Move file to archive
  fs.renameSync(sourcePath, targetPath);
}

/**
 * Permanently delete page file
 */
export async function deletePage(filePath: string): Promise<void> {
  const fullPath = path.join(process.cwd(), filePath);
  fs.unlinkSync(fullPath);
}

/**
 * Log deletion action
 */
export async function logDeletion(filePath: string, action: 'archive' | 'delete'): Promise<void> {
  const logFile = path.join(process.cwd(), 'logs', 'deletions.log');
  const logDir = path.dirname(logFile);

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logEntry = `${new Date().toISOString()} | ${action.toUpperCase()} | ${filePath}\n`;
  fs.appendFileSync(logFile, logEntry);
}
