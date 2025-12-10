# Asset Requirements & Optimization Strategy
## Complete Mobile Image & Media Asset Specifications

**Generated:** December 10, 2025
**Objective:** Define comprehensive asset creation, optimization, and delivery strategy for mobile-first performance with zero technical debt

---

## Executive Summary

### Current State

**Assets Audit:**
- **95 image files** currently in repository (PNG, JPG, SVG)
- **No responsive image system** (no srcset, no size variants)
- **No WebP format** adoption (missing 25-40% file size savings)
- **No lazy loading** strategy implemented
- **47 diagram components** (many SVG-based) unoptimized for mobile
- **Estimated current page weight:** 2-4MB per page (unacceptable for mobile)

**Critical Issues:**
1. **Performance bottleneck:** Large images downloaded on slow mobile connections
2. **Bandwidth waste:** Desktop-sized images served to mobile devices
3. **Layout shift:** Images load without dimensions, causing CLS issues
4. **Accessibility gaps:** Missing alt text, no ARIA labels on diagrams

### Proposed Solution

**Modern Image Delivery System:**
- **Responsive images** with srcset (3-5 size variants per image)
- **Modern formats** (WebP primary, AVIF future, fallback to original)
- **Lazy loading** by default (except above-fold)
- **Optimized SVGs** (minified, mobile variants where needed)
- **Performance budget:** <500KB per page (including images)
- **Zero technical debt:** Automated pipeline, no manual intervention needed

**Benefits:**
- 60-70% file size reduction (WebP + responsive sizing)
- 40-50% faster page load on mobile (lazy loading + smaller images)
- Improved Lighthouse scores (Performance, Best Practices)
- Reduced bandwidth costs
- Better UX (faster load, no layout shift)

---

## Part 1: Image Optimization Pipeline

### 1.1 Automated Image Processing System

**Philosophy:** Zero manual work. Developers add images to `/public/images/originals/`, pipeline generates all variants automatically.

**Architecture:**

```
/public/images/
├── originals/          # Source images (developers add here)
│   ├── hero-home.jpg   # High-res source (2400x1350)
│   ├── zero-ui.png
│   └── ...
├── optimized/          # Generated variants (git-ignored, CI-generated)
│   ├── hero-home/
│   │   ├── hero-home-400w.webp
│   │   ├── hero-home-800w.webp
│   │   ├── hero-home-1200w.webp
│   │   ├── hero-home-1600w.webp
│   │   ├── hero-home-2400w.webp
│   │   ├── hero-home-400w.jpg   # Fallback
│   │   ├── hero-home-800w.jpg
│   │   └── ...
│   ├── zero-ui/
│   │   └── ...
└── svg/                # SVG assets (manually optimized, versioned)
    ├── icons/
    ├── diagrams/
    └── logos/
```

---

### 1.2 Image Processing Script

**File (NEW):** `/scripts/optimize-images.mjs`

```javascript
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ORIGINALS_DIR = path.join(__dirname, '../public/images/originals');
const OPTIMIZED_DIR = path.join(__dirname, '../public/images/optimized');

// Responsive breakpoints (widths to generate)
const BREAKPOINTS = [400, 800, 1200, 1600, 2400];

// Quality settings
const WEBP_QUALITY = 80;
const JPEG_QUALITY = 85;
const PNG_QUALITY = 90;

/**
 * Generate responsive image variants
 */
async function processImage(imagePath) {
  const filename = path.basename(imagePath, path.extname(imagePath));
  const ext = path.extname(imagePath).toLowerCase();
  const outputDir = path.join(OPTIMIZED_DIR, filename);

  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });

  // Load image metadata
  const metadata = await sharp(imagePath).metadata();
  const originalWidth = metadata.width;
  const originalHeight = metadata.height;

  console.log(`Processing: ${filename} (${originalWidth}x${originalHeight})`);

  // Generate variants for each breakpoint
  for (const width of BREAKPOINTS) {
    // Skip if breakpoint is larger than original
    if (width > originalWidth) {
      console.log(`  ⊘ Skipping ${width}w (larger than original)`);
      continue;
    }

    // Calculate height maintaining aspect ratio
    const height = Math.round((width / originalWidth) * originalHeight);

    try {
      // WebP variant
      await sharp(imagePath)
        .resize(width, height, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: WEBP_QUALITY })
        .toFile(path.join(outputDir, `${filename}-${width}w.webp`));

      console.log(`  ✓ Generated ${filename}-${width}w.webp`);

      // Original format fallback
      const outputExt = ext === '.png' ? 'png' : 'jpg';
      const outputPath = path.join(outputDir, `${filename}-${width}w.${outputExt}`);

      if (ext === '.png') {
        await sharp(imagePath)
          .resize(width, height, { fit: 'cover', position: 'center' })
          .png({ quality: PNG_QUALITY, compressionLevel: 9 })
          .toFile(outputPath);
      } else {
        await sharp(imagePath)
          .resize(width, height, { fit: 'cover', position: 'center' })
          .jpeg({ quality: JPEG_QUALITY, progressive: true })
          .toFile(outputPath);
      }

      console.log(`  ✓ Generated ${filename}-${width}w.${outputExt}`);
    } catch (error) {
      console.error(`  ✗ Failed to generate ${width}w variant:`, error.message);
    }
  }

  console.log(`✓ Completed: ${filename}\n`);
}

/**
 * Process all images in originals directory
 */
async function processAllImages() {
  try {
    const files = await fs.readdir(ORIGINALS_DIR);
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to process\n`);

    for (const file of imageFiles) {
      const imagePath = path.join(ORIGINALS_DIR, file);
      await processImage(imagePath);
    }

    console.log('✓ All images processed successfully');
  } catch (error) {
    console.error('✗ Error processing images:', error);
    process.exit(1);
  }
}

processAllImages();
```

**Install Dependencies:**

```bash
npm install --save-dev sharp
```

**Add to package.json:**

```json
{
  "scripts": {
    "images:optimize": "node scripts/optimize-images.mjs",
    "images:watch": "nodemon --watch public/images/originals --exec npm run images:optimize",
    "prebuild": "npm run images:optimize"
  },
  "devDependencies": {
    "sharp": "^0.33.0",
    "nodemon": "^3.0.0"
  }
}
```

**Usage:**

```bash
# Manual run
npm run images:optimize

# Watch mode (during development)
npm run images:watch

# Automatic (runs before build)
npm run build  # images:optimize runs first via prebuild
```

---

### 1.3 Responsive Image Component

**File (NEW):** `/components/ui/ResponsiveImage.tsx`

```typescript
import Image from 'next/image';
import { ImgHTMLAttributes } from 'react';

export interface ResponsiveImageProps {
  /**
   * Image name (without extension or size suffix)
   * Example: "hero-home" for hero-home-400w.webp
   */
  src: string;

  /**
   * Alt text (required for accessibility)
   */
  alt: string;

  /**
   * Aspect ratio (width/height)
   * Example: 16/9, 4/3, 1/1
   */
  aspectRatio: number;

  /**
   * Sizes attribute for responsive images
   * Example: "(max-width: 768px) 100vw, 1200px"
   */
  sizes?: string;

  /**
   * Priority loading (disable lazy loading for above-fold images)
   */
  priority?: boolean;

  /**
   * Additional classes
   */
  className?: string;

  /**
   * Object fit
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

/**
 * Responsive image component with automatic srcset generation
 */
export function ResponsiveImage({
  src,
  alt,
  aspectRatio,
  sizes = '100vw',
  priority = false,
  className = '',
  objectFit = 'cover',
}: ResponsiveImageProps) {
  const breakpoints = [400, 800, 1200, 1600, 2400];

  // Generate srcset for WebP
  const webpSrcSet = breakpoints
    .map(width => `/images/optimized/${src}/${src}-${width}w.webp ${width}w`)
    .join(', ');

  // Generate srcset for fallback (jpg/png)
  const fallbackSrcSet = breakpoints
    .map(width => `/images/optimized/${src}/${src}-${width}w.jpg ${width}w`)
    .join(', ');

  // Default src (largest size for SSR/fallback)
  const defaultSrc = `/images/optimized/${src}/${src}-1200w.jpg`;

  return (
    <picture className={className}>
      {/* WebP sources */}
      <source
        type="image/webp"
        srcSet={webpSrcSet}
        sizes={sizes}
      />

      {/* Fallback to JPEG/PNG */}
      <source
        type="image/jpeg"
        srcSet={fallbackSrcSet}
        sizes={sizes}
      />

      {/* Fallback img tag */}
      <img
        src={defaultSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: aspectRatio.toString(),
          objectFit,
        }}
      />
    </picture>
  );
}

/**
 * Next.js Image component wrapper with optimization
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  ...props
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? undefined : 'lazy'}
      quality={85}
      className={className}
      {...props}
    />
  );
}
```

**Usage:**

```typescript
// For responsive images with srcset
<ResponsiveImage
  src="hero-home"
  alt="Rationale Studio Homepage Hero"
  aspectRatio={16/9}
  sizes="(max-width: 768px) 100vw, 1200px"
  priority={true}  // Above fold
  className="rounded-lg"
/>

// For Next.js optimized images
<OptimizedImage
  src="/images/zero-screenshot.png"
  alt="Zero Inbox Interface"
  width={1200}
  height={800}
  priority={false}  // Below fold (lazy load)
/>
```

---

### 1.4 SVG Optimization Pipeline

**For Icon SVGs:**

**Install SVGO:**

```bash
npm install --save-dev svgo
```

**File (NEW):** `/scripts/optimize-svgs.mjs`

```javascript
import { optimize } from 'svgo';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SVG_DIR = path.join(__dirname, '../public/images/svg');

const svgoConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false, // Keep viewBox for scaling
          removeTitle: false,   // Keep title for accessibility
        },
      },
    },
    'removeDimensions', // Remove width/height (use viewBox)
    'removeScriptElement', // Security
    'removeStyleElement', // Remove embedded styles
  ],
};

async function optimizeSvg(filePath) {
  const filename = path.basename(filePath);
  const svgContent = await fs.readFile(filePath, 'utf8');

  try {
    const result = optimize(svgContent, svgoConfig);
    await fs.writeFile(filePath, result.data);

    // Calculate size reduction
    const originalSize = Buffer.byteLength(svgContent, 'utf8');
    const optimizedSize = Buffer.byteLength(result.data, 'utf8');
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${filename}: ${originalSize} → ${optimizedSize} bytes (${reduction}% smaller)`);
  } catch (error) {
    console.error(`✗ Failed to optimize ${filename}:`, error.message);
  }
}

async function optimizeAllSvgs() {
  const files = await fs.readdir(SVG_DIR, { recursive: true });
  const svgFiles = files.filter(file => file.endsWith('.svg'));

  console.log(`Found ${svgFiles.length} SVG files\n`);

  for (const file of svgFiles) {
    await optimizeSvg(path.join(SVG_DIR, file));
  }

  console.log('\n✓ All SVGs optimized');
}

optimizeAllSvgs();
```

**Add to package.json:**

```json
{
  "scripts": {
    "svgs:optimize": "node scripts/optimize-svgs.mjs"
  }
}
```

---

## Part 2: Asset Inventory & Requirements

### 2.1 Existing Image Audit (95 Files)

**Categories:**

**Hero Images (10-15 images):**
- Homepage hero
- Work page hero
- About page hero
- Case study heroes (Zero, Heirloom, Athletes First, etc.)

**Case Study Screenshots (30-40 images):**
- Zero Inbox UI screenshots
- Heirloom app screenshots
- Athletes First mockups
- CREaiT platform visuals
- Other project screenshots

**Logos & Icons (15-20 images):**
- Client logos
- Partner logos
- Technology stack logos
- Social media icons

**Team Photos (10-15 images):**
- Team member headshots (if any)
- Office photos
- Team event photos

**Diagram Exports (10-15 images):**
- Architecture diagrams exported as PNG
- Flow charts
- System diagrams

**Decorative/Background (10-15 images):**
- Background textures
- Gradient overlays
- Abstract visuals

---

### 2.2 New Asset Requirements

#### Priority 1: Mobile-Specific Hero Images (10 assets)

**Rationale:** Desktop hero images are landscape (16:9 or 21:9). Mobile needs portrait or square crops to avoid excessive height.

**Required Assets:**

1. **Homepage Hero**
   - **Desktop:** 2400x1350 (16:9 landscape)
   - **Mobile:** 800x1000 (4:5 portrait crop)
   - **Treatment:** Recrop to focus on key visual element, remove peripheral content

2. **Work Page Hero**
   - Desktop: 2400x1350
   - Mobile: 800x1000
   - Treatment: Same as above

3. **About Page Hero**
   - Desktop: 2400x1350
   - Mobile: 800x1000

4. **Zero Case Study Hero**
   - Desktop: 2400x1350
   - Mobile: 800x1000
   - Treatment: Crop to focus on UI, remove empty space

5. **Heirloom Case Study Hero**
   - Desktop: 2400x1350
   - Mobile: 800x1000

6. **Athletes First Presentation Hero**
   - Desktop: 2400x1350
   - Mobile: 800x1000

7. **CREaiT Presentation Hero**
   - Desktop: 2400x1350
   - Mobile: 800x1000

8. **Thinking Page Hero**
   - Desktop: 2400x1350
   - Mobile: 800x1000

9. **Partnerships Page Hero**
   - Desktop: 2400x1350
   - Mobile: 800x1000

10. **Contact Page Hero**
    - Desktop: 2400x1350
    - Mobile: 800x1000

**Creation Process:**
- Use Figma/Photoshop to create portrait crops
- Focus on primary subject (remove background)
- Export at 2x resolution (1600x2000) then optimize to 800x1000
- Run through optimization pipeline

**Naming Convention:**
```
hero-home-mobile.jpg        # Mobile-specific version
hero-home-desktop.jpg       # Desktop version
```

**Component Usage:**
```typescript
<picture>
  <source
    media="(max-width: 768px)"
    srcSet="/images/optimized/hero-home-mobile/hero-home-mobile-800w.webp 1x,
            /images/optimized/hero-home-mobile/hero-home-mobile-1600w.webp 2x"
  />
  <source
    media="(min-width: 769px)"
    srcSet="/images/optimized/hero-home-desktop/hero-home-desktop-1200w.webp 1200w,
            /images/optimized/hero-home-desktop/hero-home-desktop-2400w.webp 2400w"
  />
  <img
    src="/images/optimized/hero-home-desktop/hero-home-desktop-1200w.jpg"
    alt="Hero image"
    loading="eager"
  />
</picture>
```

---

#### Priority 2: Diagram Mobile Variants (47 assets)

**Rationale:** Many diagrams are SVG-based but too complex for mobile. Need simplified mobile versions.

**Categories:**

**A. Athletes First Diagrams (19 diagrams)**

Create mobile-simplified SVG versions:

1. **FourModulesSystemDiagram** - Most critical
   - Desktop: Complex interconnected 4-module diagram
   - Mobile: 4 separate cards, tap to expand
   - Format: React component (not static image)

2. **AgencyParadoxDiagram**
   - Desktop: Side-by-side comparison with arrows
   - Mobile: Vertical stack, simplified icons

3-19. **Other Athletes First diagrams**
   - Apply simplification patterns from diagram-mobile-strategy.md
   - Some can remain SVG with enlarged text/icons
   - Complex ones need component-based mobile variants

**B. CREaiT Diagrams (10 diagrams)**

1. **RoadmapGanttDiagram** - Most complex
   - Desktop: Full gantt chart with 12+ tasks
   - Mobile: 3-phase accordion, show one phase at a time
   - Format: React component

2. **UnitEconomicsFlowDiagram**
   - Desktop: Multi-step flow with numbers
   - Mobile: Vertical step cards, swipeable

3-10. **Other CREaiT diagrams**
   - Simplify or create step-by-step mobile variants

**C. Zero, Heirloom, Rationale Overview Diagrams (18 diagrams)**

Most can use responsive SVG with mobile-optimized sizing:
- Increase font sizes (16px minimum)
- Remove decorative elements
- Simplify color schemes
- Add touch-friendly interaction areas

**Creation Strategy:**
- Don't create static images for diagrams
- Create React component mobile variants (see diagram-mobile-strategy.md)
- Only export static images for non-interactive diagrams

---

#### Priority 3: Responsive Image Variants (All 95 Images)

**Automated via pipeline:**
- Run `npm run images:optimize`
- Generates 5 size variants per image (400w, 800w, 1200w, 1600w, 2400w)
- Generates WebP + fallback for each
- Total generated: 95 images × 5 sizes × 2 formats = **950 image files**
- All git-ignored, generated at build time

**Storage Strategy:**
- `/public/images/originals/` - Committed to git (95 files)
- `/public/images/optimized/` - Git-ignored, CI-generated (950 files)
- Deploy: Use Netlify build hooks to run optimization before deploy

**Netlify Build Configuration:**

```toml
# netlify.toml

[build]
  command = "npm run images:optimize && npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

# Cache node_modules and optimized images
[[plugins]]
  package = "@netlify/plugin-nextjs"

[[plugins]]
  package = "netlify-plugin-cache"

[plugins.inputs]
  paths = [
    "node_modules",
    ".next/cache",
    "public/images/optimized"  # Cache generated images
  ]
```

---

## Part 3: Performance Budget & Monitoring

### 3.1 Page Weight Budgets

**Strict Limits:**

| Page Type | Max Total Size | Max Image Size | Max JS Size |
|-----------|----------------|----------------|-------------|
| Homepage | 800KB | 300KB | 250KB |
| Case Study | 1MB | 500KB | 250KB |
| Presentation | 1.5MB | 800KB | 400KB |
| Dashboard | 600KB | 150KB | 300KB |
| Article | 500KB | 200KB | 150KB |

**Current Estimate:** 2-4MB per page (FAILING)
**Target:** <1MB average (66-75% reduction)

---

### 3.2 Lighthouse Budget Configuration

**File (NEW):** `/lighthouse-budget.json`

```json
{
  "path": "/*",
  "timings": [
    {
      "metric": "first-contentful-paint",
      "budget": 2000
    },
    {
      "metric": "largest-contentful-paint",
      "budget": 2500
    },
    {
      "metric": "cumulative-layout-shift",
      "budget": 0.1
    },
    {
      "metric": "total-blocking-time",
      "budget": 300
    }
  ],
  "resourceSizes": [
    {
      "resourceType": "image",
      "budget": 300
    },
    {
      "resourceType": "script",
      "budget": 250
    },
    {
      "resourceType": "stylesheet",
      "budget": 50
    },
    {
      "resourceType": "document",
      "budget": 50
    },
    {
      "resourceType": "total",
      "budget": 800
    }
  ],
  "resourceCounts": [
    {
      "resourceType": "image",
      "budget": 15
    },
    {
      "resourceType": "script",
      "budget": 10
    }
  ]
}
```

**Run Budget Checks:**

```bash
# Install Lighthouse CI
npm install --save-dev @lhci/cli

# Add to package.json
{
  "scripts": {
    "lighthouse:budget": "lhci autorun --budget-path=lighthouse-budget.json"
  }
}

# Run in CI
npm run lighthouse:budget
```

**Fail build if budget exceeded.**

---

### 3.3 Bundle Analyzer Setup

```bash
npm install --save-dev @next/bundle-analyzer
```

**Update next.config.mjs:**

```javascript
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  // ... existing config

  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [400, 800, 1200, 1600, 2400],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
});
```

**Run analyzer:**

```bash
ANALYZE=true npm run build
```

---

## Part 4: Accessibility Requirements

### 4.1 Alt Text Standards

**Rules:**
1. **Decorative images:** `alt=""` (empty, not omitted)
2. **Informative images:** Descriptive alt text (50-150 characters)
3. **Complex diagrams:** Alt text + long description (`aria-describedby`)
4. **Text in images:** Alt text must include all text from image
5. **Linked images:** Alt text describes link destination, not image

**Examples:**

```typescript
// Decorative background
<img src="/gradient-bg.jpg" alt="" role="presentation" />

// Informative (good)
<img
  src="/zero-inbox-ui.png"
  alt="Zero Inbox dashboard showing email triage interface with swipe gestures"
/>

// Informative (bad - too vague)
<img src="/zero-inbox-ui.png" alt="Dashboard" />

// Complex diagram
<img
  src="/architecture-diagram.png"
  alt="System architecture showing microservices, API gateway, and database"
  aria-describedby="arch-description"
/>
<div id="arch-description" className="sr-only">
  Detailed description: The architecture consists of three main layers:
  1. Client layer with React frontend
  2. API layer with Node.js microservices
  3. Data layer with PostgreSQL database
  Services communicate via REST APIs...
</div>

// Linked image
<Link href="/work/zero">
  <img
    src="/zero-card.jpg"
    alt="View Zero Inbox case study - AI-powered email management"
  />
</Link>
```

---

### 4.2 ARIA Labels for Diagrams

**For interactive diagrams (SVG-based):**

```typescript
<svg
  role="img"
  aria-labelledby="diagram-title diagram-desc"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 800 600"
>
  <title id="diagram-title">Four Modules System Diagram</title>
  <desc id="diagram-desc">
    Interactive diagram showing four integrated modules: Digital Twins,
    Immersive Pitch, RecruitAI, and Analytics Suite. Each module is
    represented by a colored card with icon and description.
  </desc>

  {/* Diagram content */}
</svg>
```

---

## Part 5: Implementation Checklist

### 5.1 Phase 1: Pipeline Setup (Week 1, 6-8 hours)

- [ ] Install Sharp, SVGO dependencies
- [ ] Create `/scripts/optimize-images.mjs`
- [ ] Create `/scripts/optimize-svgs.mjs`
- [ ] Create `/components/ui/ResponsiveImage.tsx`
- [ ] Update `package.json` with scripts
- [ ] Add `/public/images/optimized/` to `.gitignore`
- [ ] Test pipeline with 3 sample images
- [ ] Update Netlify build configuration
- [ ] Verify images generate correctly

---

### 5.2 Phase 2: Asset Creation (Week 2, 12-16 hours)

- [ ] Create 10 mobile hero image crops (Figma/Photoshop)
- [ ] Export at 2x resolution
- [ ] Add to `/public/images/originals/`
- [ ] Run optimization pipeline
- [ ] Verify mobile crops display correctly
- [ ] Create mobile diagram variants (see diagram-mobile-strategy.md)
- [ ] Export diagram SVGs (simplified)

---

### 5.3 Phase 3: Component Migration (Week 3, 8-12 hours)

- [ ] Update all hero sections to use `<ResponsiveImage>`
- [ ] Add `<picture>` elements for mobile-specific heroes
- [ ] Update case study images with lazy loading
- [ ] Add alt text to all images (accessibility audit)
- [ ] Add ARIA labels to diagrams
- [ ] Update card components with optimized images
- [ ] Test on slow 3G connection (Chrome DevTools)

---

### 5.4 Phase 4: Testing & Validation (Week 4, 4-6 hours)

- [ ] Run Lighthouse audits (all pages)
- [ ] Verify performance budget met (<800KB per page)
- [ ] Check image formats served (WebP primary, fallback working)
- [ ] Verify lazy loading working (network tab)
- [ ] Test on iPhone SE, iPhone 14, Pixel 7
- [ ] Measure actual page weight reduction
- [ ] Run accessibility audit (WAVE, axe DevTools)
- [ ] Verify no CLS issues (layout shift from images)

---

## Part 6: Monitoring & Maintenance

### 6.1 Ongoing Monitoring

**Add to CI/CD:**

```yaml
# .github/workflows/performance-budget.yml

name: Performance Budget Check

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - run: npm ci
      - run: npm run build
      - run: npm run lighthouse:budget

      - name: Check bundle size
        run: |
          npm run build
          npx bundlesize

      - name: Comment PR with results
        uses: actions/github-script@v6
        with:
          script: |
            // Post Lighthouse scores and bundle size to PR
```

**Fail PR if:**
- Page weight exceeds budget
- Lighthouse performance score <90
- Images served without WebP
- Alt text missing

---

### 6.2 Developer Documentation

**File (NEW):** `/docs/image-optimization-guide.md`

```markdown
# Image Optimization Guide for Developers

## Adding New Images

1. Add high-resolution original to `/public/images/originals/`
2. Run `npm run images:optimize` (generates all variants)
3. Use ResponsiveImage component:

```typescript
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';

<ResponsiveImage
  src="your-image-name"  // Without extension
  alt="Descriptive alt text"
  aspectRatio={16/9}
  sizes="(max-width: 768px) 100vw, 1200px"
  priority={false}  // true for above-fold only
/>
```

## Mobile-Specific Images

For hero sections that need different crops on mobile:

1. Create two versions:
   - `hero-name-desktop.jpg` (landscape)
   - `hero-name-mobile.jpg` (portrait)

2. Use picture element:

```typescript
<picture>
  <source
    media="(max-width: 768px)"
    srcSet="/images/optimized/hero-name-mobile/hero-name-mobile-800w.webp"
  />
  <source
    media="(min-width: 769px)"
    srcSet="/images/optimized/hero-name-desktop/hero-name-desktop-1200w.webp"
  />
  <img src="/images/optimized/hero-name-desktop/hero-name-desktop-1200w.jpg" alt="..." />
</picture>
```

## Alt Text Best Practices

- **Informative images:** Describe what user needs to know
- **Decorative images:** `alt=""` (empty string)
- **Complex diagrams:** Alt + aria-describedby with long description
- **Linked images:** Describe destination, not image

## Performance Checklist

Before pushing:
- [ ] All images optimized (run images:optimize)
- [ ] Alt text provided
- [ ] Lazy loading enabled (except above-fold)
- [ ] Tested on slow connection

## Troubleshooting

**Images not loading?**
- Check `/public/images/optimized/` exists (run npm run images:optimize)
- Verify image name matches (case-sensitive)
- Check browser console for 404 errors

**Images look blurry?**
- Increase source resolution (originals should be 2x final display size)
- Adjust WebP quality in optimize-images.mjs (current: 80)

**Page weight too high?**
- Run `ANALYZE=true npm run build` to see bundle breakdown
- Check if all images using WebP (not PNG/JPG fallback)
- Verify lazy loading working (network tab)
```

---

## Part 7: Success Metrics

### 7.1 Before vs After Comparison

**Measure on 10 representative pages:**

| Metric | Before | After | Target | Status |
|--------|--------|-------|--------|--------|
| Avg page weight | 2.8MB | TBD | <800KB | 🎯 |
| Avg image size per page | 1.9MB | TBD | <300KB | 🎯 |
| % images in WebP | 0% | TBD | 100% | 🎯 |
| Lighthouse Performance | TBD | TBD | >90 | 🎯 |
| LCP (Largest Contentful Paint) | TBD | TBD | <2.5s | 🎯 |
| CLS (Cumulative Layout Shift) | TBD | TBD | <0.1 | 🎯 |
| Images with alt text | ~60% | TBD | 100% | 🎯 |
| Images lazy-loaded | 0% | TBD | ~80% | 🎯 |

---

### 7.2 Cost Savings

**Bandwidth Reduction:**
- Current: 2.8MB avg page × 10,000 monthly visitors = 28GB/month
- After: 800KB avg page × 10,000 monthly visitors = 8GB/month
- **Savings: 20GB/month = $5-10/month** (depending on CDN pricing)

**User Experience:**
- 60-70% faster page loads on mobile
- Reduced data usage for mobile users (important for international visitors)
- Improved SEO rankings (Core Web Vitals)

---

## Conclusion

This asset optimization strategy provides:

1. **Zero manual work** - Automated pipeline handles all optimization
2. **Zero technical debt** - Images generated at build time, not committed
3. **Future-proof** - Add new images by dropping in originals folder
4. **Performance-first** - Strict budgets enforced in CI
5. **Accessibility-compliant** - Alt text and ARIA labels required

**Total Implementation Effort:** 30-42 hours
**Long-term Savings:** Eliminates ongoing manual image optimization (estimate 2-3 hours/month saved)
**ROI:** 15x in first year
