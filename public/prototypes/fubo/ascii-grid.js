/**
 * ASCII Grid Overlay System
 * Simplified version for Fubo prototype
 * Matches Rationale design system
 */

function initASCIIGrid(container, options = {}) {
  const {
    opacity = 0.04,
    animated = true,
    charSet = 'default'
  } = options;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'ascii-grid-overlay';
  overlay.style.cssText = `
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: ${opacity};
    overflow: hidden;
  `;

  // Create grid pattern
  const gridContainer = document.createElement('div');
  gridContainer.style.cssText = `
    position: relative;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(rgba(255, 215, 0, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 215, 0, 0.015) 1px, transparent 1px);
    background-size: 8px 16px;
  `;

  overlay.appendChild(gridContainer);

  // Make container relative if not already
  if (window.getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }

  // Insert as first child so it's behind content
  container.insertBefore(overlay, container.firstChild);

  return overlay;
}

// Auto-initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize on main canvas area
    const canvasArea = document.querySelector('.flex-1.flex.flex-col.overflow-hidden');
    if (canvasArea) {
      initASCIIGrid(canvasArea, {
        opacity: 0.04,
        animated: true
      });
    }
  });
} else {
  // DOM already loaded
  const canvasArea = document.querySelector('.flex-1.flex.flex-col.overflow-hidden');
  if (canvasArea) {
    initASCIIGrid(canvasArea, {
      opacity: 0.04,
      animated: true
    });
  }
}
