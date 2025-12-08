# Asset Optimization Plan

**Goal:** Reduce `/public` from 149MB → <50MB (67% reduction)

**Current Status:** 123MB (after removing 26MB of duplicates)
**Target:** <50MB
**Remaining to optimize:** 73MB

---

## Completed Optimizations

### 1. Remove Duplicate Files ✅
- **Saved:** 26MB
- **Action:** Removed `/public/athletes-first/diagrams/` (duplicate of `/public/images/work/athletes-first/diagrams/`)
- **Status:** Complete
- **New Size:** 123MB

---

## Remaining Optimizations

### 2. Convert Large GIFs to MP4 (Priority 1)
**Potential Savings:** ~40-45MB (70-90% compression)

**Target Files:**
```
15MB → 1.5MB   public/images/work/spark-ar/creative-effects.gif
11MB → 1.1MB   public/images/work/spark-ar/ar-body-tracking.gif
4.9MB → 0.5MB  public/images/work/spark-ar/image-tracking.gif
4.7MB → 0.5MB  public/images/work/orion/ar-commerce-glasses.gif
4.6MB → 0.5MB  public/images/work/spark-ar/ar-try-on.gif
3.7MB → 0.4MB  public/images/work/spark-ar/ar-furniture-placement.gif
3.0MB → 0.3MB  public/images/work/orion/ar-commerce-makeup.gif
1.9MB → 0.2MB  public/images/work/orion/ar-commerce-3d-bags.gif
```

**Total GIFs:** 52MB → ~5MB (estimated)
**Expected Savings:** ~47MB

**Implementation:**
```bash
# Using ffmpeg to convert GIF to MP4
ffmpeg -i input.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" output.mp4

# Or use online tools:
# - https://cloudconvert.com/gif-to-mp4
# - https://ezgif.com/gif-to-mp4
```

**Code Updates Needed:**
- Update `<img src="*.gif">` → `<video autoplay loop muted playsinline>`
- Search codebase for GIF references
- Update all components using these assets

### 3. Compress PNG Diagrams (Priority 2)
**Potential Savings:** ~10-15MB (40-60% compression)

**Target Files (Athletes First diagrams):**
```
2.0MB  bottleneck.png
1.9MB  staticpitches.png
1.9MB  immersive-pitch-flow.png
1.8MB  recruiting-funnel.png
1.8MB  infinite-deployment.png
1.8MB  Digital Twin Flow.png
1.8MB  AmplifyAI Flow.png
1.7MB  recruit-ai-flow.png
1.7MB  phased-approach.png
1.7MB  2x2-competitive-matrix.png
```

**Plus portfolio PNGs:**
```
2.6MB  ar-commerce-impact.png
2.3MB  ar-commerce-solution.png
```

**Total PNGs:** ~25MB → ~10-12MB (estimated)
**Expected Savings:** ~13-15MB

**Implementation:**
```bash
# Using pngquant (lossless-ish compression)
pngquant --quality=65-80 --ext .png --force *.png

# Or ImageOptim (Mac GUI)
# Or TinyPNG.com (online)
```

### 4. Optimize/Move Videos (Priority 3)
**Potential Savings:** ~5-10MB (or move to CDN)

**Current Videos:** 22MB (9 Replicate prediction videos)

**Options:**
A. **Compress further** (if quality allows)
B. **Move to CDN** (Cloudflare R2, Vercel Blob, or Mux)
C. **Lazy load** (don't load until needed)

**Recommendation:** Move to CDN for Zero product demos (investor-only content)

---

## Expected Final Size

| Step | Action | Size |
|------|--------|------|
| Start | Initial size | 149MB |
| 1 | Remove duplicates ✅ | 123MB (-26MB) |
| 2 | Convert GIFs to MP4 | 76MB (-47MB) |
| 3 | Compress PNGs | 61MB (-15MB) |
| 4 | Optimize/move videos | 51MB (-10MB) |
| **Final** | **Target achieved** | **~51MB** ✅ |

**Stretch Goal:** <50MB with additional lazy loading

---

## Implementation Priority

### Phase A: Quick Wins (1-2 hours)
- [x] Remove duplicate folders (-26MB)
- [ ] Convert top 5 GIFs to MP4 (-35MB)
- [ ] Update component code to use MP4

### Phase B: Image Optimization (1 hour)
- [ ] Compress Athletes First diagrams (-10MB)
- [ ] Compress portfolio PNGs (-5MB)

### Phase C: CDN Setup (2-3 hours)
- [ ] Set up Vercel Blob or Cloudflare R2
- [ ] Move videos to CDN
- [ ] Update video URLs in code
- [ ] Test loading

### Phase D: Lazy Loading (1-2 hours)
- [ ] Add `loading="lazy"` to all images
- [ ] Implement intersection observer for videos
- [ ] Test performance

---

## Tools Needed

### GIF → MP4 Conversion
- **ffmpeg** (command line) - `brew install ffmpeg`
- **CloudConvert** (online) - https://cloudconvert.com/gif-to-mp4
- **ezgif** (online) - https://ezgif.com/gif-to-mp4

### PNG Compression
- **pngquant** (command line) - `brew install pngquant`
- **ImageOptim** (Mac GUI) - https://imageoptim.com/
- **TinyPNG** (online) - https://tinypng.com/

### Video Hosting (CDN)
- **Vercel Blob** - Built into Vercel, easy integration
- **Cloudflare R2** - S3-compatible, cheap
- **Mux** - Video-specific, best for streaming

---

## Code Impact Assessment

### Files Likely to Reference GIFs:
```bash
# Search for GIF references
grep -r "\.gif" app/ components/ --include="*.tsx" --include="*.ts"
```

### Typical Pattern:
```tsx
// Before
<Image src="/images/work/spark-ar/creative-effects.gif" alt="..." />

// After
<video autoplay loop muted playsinline>
  <source src="/images/work/spark-ar/creative-effects.mp4" type="video/mp4" />
</video>
```

### Components to Update:
- Work/portfolio showcase components
- Spark AR case study pages
- Orion/AR commerce pages
- Athletes First presentation

---

## Testing Checklist

After each optimization:
- [ ] Check file loads correctly
- [ ] Verify autoplay works (for converted videos)
- [ ] Test on mobile (bandwidth considerations)
- [ ] Check Lighthouse score improvement
- [ ] Verify no broken images/videos

---

## Performance Metrics

### Before Optimization:
- **Bundle size:** 149MB
- **Lighthouse Performance:** TBD
- **First Contentful Paint:** TBD
- **Largest Contentful Paint:** TBD

### After Optimization (Target):
- **Bundle size:** <50MB (-66%)
- **Lighthouse Performance:** >90
- **First Contentful Paint:** <1.5s
- **Largest Contentful Paint:** <2.5s

---

## Next Steps

1. **Convert GIFs** - Start with top 5 largest (35MB savings)
2. **Update code** - Replace `<img>` with `<video>` tags
3. **Test locally** - Verify all conversions work
4. **Compress PNGs** - Batch process with pngquant or ImageOptim
5. **Final test** - Run full site, check for broken assets

**Estimated Time:** 4-6 hours total
**Expected Savings:** 73MB (123MB → <50MB)

---

## Resources

- [FFmpeg GIF to MP4 Guide](https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- [ImageOptim for Mac](https://imageoptim.com/)
