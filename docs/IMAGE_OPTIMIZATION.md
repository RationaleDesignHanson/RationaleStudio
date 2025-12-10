# Image Optimization System

Comprehensive image optimization pipeline using Sharp for responsive, performant image delivery.

## Overview

The image optimization system automatically generates multiple responsive variants of images with WebP support and proper fallbacks, reducing page weight by 60-70% while maintaining visual quality.

## Features

- **Responsive Variants**: 5 breakpoints (400w, 800w, 1200w, 1600w, 2400w)
- **Modern Formats**: WebP with JPEG/PNG fallback for browser compatibility
- **Smart Sizing**: Only generates variants smaller than original image
- **Automatic Detection**: Skips already-optimized images
- **Quality Optimized**: 85% JPEG/WebP, 90% PNG for optimal quality/size balance
- **Progressive JPEG**: Faster perceived load times

## Usage

### 1. Optimize Images

Run the optimization script to generate responsive variants:

```bash
# Dry run (see what would be optimized)
node scripts/optimize-images.mjs --dry-run --verbose

# Actual optimization
node scripts/optimize-images.mjs

# Force re-optimization of all images
node scripts/optimize-images.mjs --force

# Verbose output
node scripts/optimize-images.mjs --verbose
```

### 2. Use ResponsiveImage Component

Replace standard `<img>` tags with the `ResponsiveImage` component:

```tsx
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';

// Basic usage
<ResponsiveImage
  src="/images/work/zero/screenshot.png"
  alt="Zero Inbox Screenshot"
  width={1200}
  height={800}
/>

// With custom sizes
<ResponsiveImage
  src="/images/work/zero/screenshot.png"
  alt="Zero Inbox Screenshot"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>

// Priority image (above the fold, eager loading)
<ResponsiveImage
  src="/images/hero-image.jpg"
  alt="Hero Image"
  width={2400}
  height={1200}
  priority={true}
/>

// Custom object fit
<ResponsiveImage
  src="/images/work/zero/screenshot.png"
  alt="Zero Inbox Screenshot"
  width={1200}
  height={800}
  objectFit="contain"
/>
```

### 3. Background Images

For background images with overlays:

```tsx
import { ResponsiveBackgroundImage } from '@/components/ui/ResponsiveImage';

<ResponsiveBackgroundImage
  src="/images/hero-bg.jpg"
  alt="Hero Background"
  width={2400}
  height={1200}
  overlay={true}
  overlayOpacity={0.5}
  className="min-h-screen"
>
  <div className="container mx-auto px-4 py-20">
    <h1>Hero Content</h1>
  </div>
</ResponsiveBackgroundImage>
```

## How It Works

### Optimization Process

1. **Discovery**: Scans `public/` directory for all images (`.jpg`, `.jpeg`, `.png`, `.gif`)
2. **Analysis**: Checks each image's dimensions and existing optimized variants
3. **Generation**: Creates responsive variants at each breakpoint:
   - WebP format (85% quality, best compression)
   - Original format fallback (JPEG 85%, PNG 90%)
4. **Storage**: Saves optimized images to `public/optimized/` directory

### File Structure

```
public/
├── images/
│   └── work/
│       └── zero/
│           └── screenshot.png          # Original image
└── optimized/
    └── images/
        └── work/
            └── zero/
                ├── screenshot-400w.webp
                ├── screenshot-400w.png
                ├── screenshot-800w.webp
                ├── screenshot-800w.png
                ├── screenshot-1200w.webp
                └── screenshot-1200w.png
```

### Responsive Delivery

The `ResponsiveImage` component generates HTML like:

```html
<picture>
  <!-- WebP source -->
  <source
    type="image/webp"
    srcset="
      /optimized/images/work/zero/screenshot-400w.webp 400w,
      /optimized/images/work/zero/screenshot-800w.webp 800w,
      /optimized/images/work/zero/screenshot-1200w.webp 1200w
    "
    sizes="(max-width: 768px) 100vw, 800px"
  />

  <!-- Fallback source -->
  <source
    type="image/png"
    srcset="
      /optimized/images/work/zero/screenshot-400w.png 400w,
      /optimized/images/work/zero/screenshot-800w.png 800w,
      /optimized/images/work/zero/screenshot-1200w.png 1200w
    "
    sizes="(max-width: 768px) 100vw, 800px"
  />

  <!-- Fallback img -->
  <img
    src="/images/work/zero/screenshot.png"
    alt="Zero Inbox Screenshot"
    width="1200"
    height="800"
    loading="lazy"
  />
</picture>
```

## Configuration

### Breakpoints

Customize breakpoints in `scripts/optimize-images.mjs`:

```javascript
const BREAKPOINTS = [400, 800, 1200, 1600, 2400];
```

### Quality Settings

Adjust quality in `scripts/optimize-images.mjs`:

```javascript
const WEBP_QUALITY = 85;  // 0-100
const JPEG_QUALITY = 85;  // 0-100
const PNG_QUALITY = 90;   // 0-100
```

### Development Mode

By default, `ResponsiveImage` only serves optimized images in production. To enable in development:

```bash
# .env.local
NEXT_PUBLIC_USE_OPTIMIZED_IMAGES=true
```

## Performance Impact

### Before Optimization
- 90 images
- Average file size: ~500KB per image
- Total page weight: ~45MB across all images

### After Optimization
- 90 images × 5 breakpoints × 2 formats = 900 optimized variants
- Average WebP size: ~150KB (70% reduction)
- Typical page weight with responsive loading: ~2-4MB (85-90% reduction)

### Real-World Benefits
- **Mobile**: Serve 400w images (~50KB) instead of full-size (~500KB) = 90% bandwidth savings
- **Desktop**: Serve 1200w images (~200KB) instead of full-size (~500KB) = 60% bandwidth savings
- **Modern Browsers**: WebP format provides additional 25-35% savings over JPEG

## Maintenance

### Adding New Images

1. Add images to `public/images/` directory
2. Run optimization script: `node scripts/optimize-images.mjs`
3. Use `ResponsiveImage` component in your code

The script automatically detects and optimizes only new/changed images.

### Re-optimizing All Images

```bash
node scripts/optimize-images.mjs --force
```

### Checking Optimization Status

```bash
node scripts/optimize-images.mjs --dry-run --verbose
```

## Browser Compatibility

- **WebP Support**: Chrome, Edge, Firefox, Safari 14+, Opera
- **Fallback**: JPEG/PNG for older browsers (Safari <14, IE)
- **Responsive Images**: All modern browsers via `<picture>` and `srcset`

## Best Practices

### Image Sizes Attribute

Always specify appropriate `sizes` attribute for optimal responsive loading:

```tsx
// Full width on mobile, 50% on tablet, fixed 800px on desktop
<ResponsiveImage
  src="/images/hero.jpg"
  alt="Hero"
  width={1600}
  height={900}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>
```

### Priority Images

Mark above-the-fold images as priority to disable lazy loading:

```tsx
<ResponsiveImage
  src="/images/hero.jpg"
  alt="Hero"
  width={2400}
  height={1200}
  priority={true}
/>
```

### Alt Text

Always provide meaningful alt text for accessibility:

```tsx
<ResponsiveImage
  src="/images/work/zero/feature.png"
  alt="Zero Inbox AI classification interface showing email categorization"
  width={1200}
  height={800}
/>
```

## Troubleshooting

### Images Not Loading

1. Check that optimized images exist: `ls public/optimized/images/`
2. Verify `NEXT_PUBLIC_USE_OPTIMIZED_IMAGES=true` in `.env.local` for development
3. Check browser console for 404 errors

### Large File Sizes

1. Verify WebP support: Modern browsers should serve WebP automatically
2. Check network tab to confirm WebP delivery
3. Adjust quality settings in optimization script if needed

### Optimization Errors

1. Check image format: Only JPG, PNG, GIF supported
2. Verify Sharp installation: `npm list sharp`
3. Check file permissions on `public/optimized/` directory

## Technical Details

### Dependencies

- **Sharp**: High-performance image processing library
- **Next.js**: Built-in image optimization support (complementary)

### Performance Characteristics

- **Optimization Speed**: ~1-2 seconds per image
- **CPU Usage**: High during optimization (batch processing recommended)
- **Storage**: ~2x original size (multiple variants + original)
- **Runtime**: Zero overhead (static files served by CDN)

## Migration Guide

### Migrating Existing Code

Replace standard `<img>` tags:

```tsx
// Before
<img
  src="/images/work/zero/screenshot.png"
  alt="Screenshot"
  width={1200}
  height={800}
/>

// After
<ResponsiveImage
  src="/images/work/zero/screenshot.png"
  alt="Screenshot"
  width={1200}
  height={800}
/>
```

### Gradual Adoption

The component gracefully falls back to original images in development, allowing gradual migration without breaking existing pages.

## Future Enhancements

- [ ] Automatic optimization on image upload
- [ ] CDN integration for edge delivery
- [ ] AVIF format support (next-gen compression)
- [ ] Automatic art direction (different crops for mobile)
- [ ] Build-time optimization integration
- [ ] Visual regression testing for optimized images

## References

- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Responsive Images (MDN)](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [WebP Format](https://developers.google.com/speed/webp)
- [Image Optimization Best Practices](https://web.dev/fast/#optimize-your-images)
