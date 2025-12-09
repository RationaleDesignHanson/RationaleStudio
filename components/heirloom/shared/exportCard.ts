// Export Card as Image
// Uses html2canvas to capture the recipe card and download as PNG

import html2canvas from 'html2canvas';

export interface ExportOptions {
  fileName?: string;
  quality?: number; // 0.0 to 1.0
  scale?: number; // 1 = original size, 2 = 2x (retina), 3 = 3x
  format?: 'png' | 'jpeg';
}

/**
 * Export a DOM element as an image
 */
export async function exportAsImage(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<{ success: boolean; error?: string }> {
  const {
    fileName = 'heirloom-recipe-card',
    quality = 1.0,
    scale = 2, // 2x for retina displays
    format = 'png',
  } = options;

  try {
    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true, // Allow cross-origin images
      allowTaint: true,
      backgroundColor: null, // Transparent background
      logging: false,
      imageTimeout: 15000,
      removeContainer: true,
    });

    // Convert canvas to blob
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(
        (b) => resolve(b),
        format === 'jpeg' ? 'image/jpeg' : 'image/png',
        quality
      );
    });

    if (!blob) {
      throw new Error('Failed to create image blob');
    }

    // Download the image
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error('Error exporting card:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Share card image (if Web Share API is supported)
 */
export async function shareCardImage(
  element: HTMLElement,
  options: {
    title?: string;
    text?: string;
    fileName?: string;
  } = {}
): Promise<{ success: boolean; error?: string }> {
  const { title = 'My Heirloom Recipe Card', text = 'Check out my recipe card!', fileName = 'recipe-card' } = options;

  // Check if Web Share API is supported
  if (!navigator.share) {
    return {
      success: false,
      error: 'Web Share API not supported in this browser',
    };
  }

  try {
    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    });

    // Convert to blob
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/png', 1.0);
    });

    if (!blob) {
      throw new Error('Failed to create image blob');
    }

    // Create file from blob
    const file = new File([blob], `${fileName}.png`, { type: 'image/png' });

    // Share using Web Share API
    await navigator.share({
      title,
      text,
      files: [file],
    });

    return { success: true };
  } catch (error) {
    console.error('Error sharing card:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Copy card image to clipboard
 */
export async function copyCardToClipboard(
  element: HTMLElement
): Promise<{ success: boolean; error?: string }> {
  // Check if Clipboard API is supported
  if (!navigator.clipboard || !navigator.clipboard.write) {
    return {
      success: false,
      error: 'Clipboard API not supported in this browser',
    };
  }

  try {
    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    });

    // Convert to blob
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/png', 1.0);
    });

    if (!blob) {
      throw new Error('Failed to create image blob');
    }

    // Copy to clipboard
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error copying card:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
