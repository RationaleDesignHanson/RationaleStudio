import { NextRequest, NextResponse } from 'next/server';
import { archivePage, deletePage, logDeletion, scanPages } from '@/lib/admin/page-manager';
import { logger } from '@/lib/utils/logger';

/**
 * GET /api/admin/pages - List all pages
 */
export async function GET() {
  try {
    const pages = await scanPages();
    return NextResponse.json({ pages });
  } catch (error) {
    logger.error('Error scanning pages:', error);
    return NextResponse.json(
      { error: 'Failed to scan pages' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/pages - Archive or delete a page
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { filePath, action = 'archive' } = body;

    if (!filePath) {
      return NextResponse.json(
        { error: 'filePath is required' },
        { status: 400 }
      );
    }

    // Validate action
    if (action !== 'archive' && action !== 'delete') {
      return NextResponse.json(
        { error: 'action must be "archive" or "delete"' },
        { status: 400 }
      );
    }

    // Prevent deletion of critical pages
    const protectedPages = [
      'app/owner/site-admin/page.tsx',
      'app/(public)/page.tsx',
      'app/layout.tsx',
    ];

    if (protectedPages.some(p => filePath.includes(p))) {
      return NextResponse.json(
        { error: 'Cannot delete protected page' },
        { status: 403 }
      );
    }

    // Perform action
    if (action === 'archive') {
      await archivePage(filePath);
    } else {
      await deletePage(filePath);
    }

    // Log the action
    await logDeletion(filePath, action);

    return NextResponse.json({
      success: true,
      message: `Page ${action}d successfully`,
      filePath,
      action,
    });
  } catch (error) {
    logger.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/pages/bulk-delete - Delete multiple pages
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filePaths, action = 'archive' } = body;

    if (!Array.isArray(filePaths) || filePaths.length === 0) {
      return NextResponse.json(
        { error: 'filePaths array is required' },
        { status: 400 }
      );
    }

    const results = [];
    const errors = [];

    for (const filePath of filePaths) {
      try {
        if (action === 'archive') {
          await archivePage(filePath);
        } else {
          await deletePage(filePath);
        }
        await logDeletion(filePath, action);
        results.push({ filePath, success: true });
      } catch (error) {
        errors.push({ filePath, error: String(error) });
      }
    }

    return NextResponse.json({
      success: errors.length === 0,
      results,
      errors,
      message: `${results.length} pages ${action}d, ${errors.length} errors`,
    });
  } catch (error) {
    logger.error('Error bulk deleting pages:', error);
    return NextResponse.json(
      { error: 'Failed to bulk delete pages' },
      { status: 500 }
    );
  }
}
