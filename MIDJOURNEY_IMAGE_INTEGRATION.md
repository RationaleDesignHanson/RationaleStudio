# Midjourney Image Integration Guide

## Directory Structure

Place your Midjourney-generated images in:
```
/public/images/sanitary-waste-system/
```

## Recommended Image Files

Based on MIDJOURNEY_PROMPTS.md, save your generated images with these filenames:

1. **image1.png** - Midjourney Prompt #1
   - Absorbent-lined bag cross-section showing three layers
   - Use on: Slide 4 (Material Innovation)

2. **image2.png** - Midjourney Prompt #2
   - Rectangular pocket pack with interfolded bags
   - Optional: Could add to slide 6

3. **image3.png** - Midjourney Prompt #3
   - Premium leash-mounted dispenser
   - Optional: Could add to slide 6 or 7

4. **image4.png** - Midjourney Prompt #4
   - Complete three-SKU system hero shot
   - Use on: Slide 6 (Three-SKU System)

5. **image5.png** - Midjourney Prompt #5
   - In-use lifestyle shot with dog owner
   - Use on: Slide 7 (Dispenser UX)

6. **image6.png** - Midjourney Prompt #6
   - Extreme macro of absorbent material
   - Optional: Could add to slide 4

7. **image7.png** - Midjourney Prompt #7
   - Dispenser mechanism close-up
   - Optional: Could add to slide 7

8. **image8.png** - Midjourney Prompt #8
   - Brand packaging suite
   - Optional: Marketing materials

9. **image9.png** - Midjourney Prompt #9
   - Retail display mockup
   - Optional: Go-to-market slides

10. **image10.png** - Midjourney Prompt #10
    - Manufacturing process visualization
    - Optional: Manufacturing slide

11. **image11.png** - Midjourney Prompt #11
    - Competitive comparison
    - Optional: Competitive positioning

12. **image12.png** - Midjourney Prompt #12
    - Future product roadmap
    - Optional: Vision/roadmap slides

## How to Integrate

### Step 1: Save Images
Save your Midjourney exports to `/public/images/sanitary-waste-system/` with the filenames above.

### Step 2: Update Content File
The content file (`/lib/content/sanitary-waste-system.ts`) is already set up to accept images. Update the slides with:

```typescript
visual: {
  type: 'image',
  data: {
    src: '/images/sanitary-waste-system/image1.png',
    alt: 'Cross-section of absorbent-lined bag showing material layers',
    caption: 'Hybrid material architecture: Outer film + absorbent liner + bonding', // optional
    description: 'Product cross-section showing material layers' // fallback if src fails
  }
}
```

## Current Slide Mapping

### Slide 4: Material Innovation Meets User Experience
- **Current**: Configured with `image1.png`
- **Replace with**: `image1.png` (Prompt #1) ✓ Already configured
- **Location in content**: Line ~167

```typescript
visual: {
  type: 'image',
  data: {
    src: '/images/sanitary-waste-system/image1.png',
    alt: 'Cross-section showing airlaid liner, compostable film, and zone bonding',
    caption: 'Three-layer construction: 600-1000 micron absorbent liner eliminates heat transfer',
    description: 'Product cross-section showing material layers'
  }
}
```

### Slide 6: The Three-SKU System (Optional)
- **Add**: `image4.png` (Prompt #4)
- **Location in content**: Line ~244
- **Current**: Has ProductSystemDiagram - optionally add image below

Add below the diagram:
```typescript
visual: {
  type: 'image',
  data: {
    src: '/images/sanitary-waste-system/image4.png',
    alt: 'Complete three-SKU system: dispenser, refill packs, and absorbent-lined bags',
    caption: 'Premium ecosystem designed for lock-in and recurring revenue',
    description: 'Complete product system'
  }
}
```

### Slide 7: Dispenser UX (Optional)
- **Add**: `image5.png` (Prompt #5)
- **Location in content**: Line ~271
- **Current**: Has DispenserFlowDemo - optionally add image below

Add below the demo:
```typescript
visual: {
  type: 'image',
  data: {
    src: '/images/sanitary-waste-system/image5.png',
    alt: 'Dog owner using one-handed dispenser during urban walk',
    caption: 'One-handed flow: thumb-pull → next bag auto-presents → invert and tie',
    description: 'Dispenser in use'
  }
}
```

## Image Specifications

### Aspect Ratios
- **Hero shots**: 16:9 (1920x1080 or similar)
- **Detail shots**: 4:5 or 3:4 (Instagram/portrait)
- **Product shots**: 16:9 or 1:1

### File Size
- Optimize to < 500KB per image (PNGs can be larger, consider compression)
- PNGs work great for Midjourney outputs with crisp details
- Midjourney exports are typically 1024x1024 or larger - resize if needed
- For large PNGs, consider using tools like TinyPNG or ImageOptim to compress

### Color Treatment
- Images render with dark background (`bg-gray-900/50`)
- Images have subtle border (`border border-gray-800`)
- Consider this when choosing Midjourney's color palette

## Quick Implementation Checklist

- [ ] Generate images with Midjourney using prompts from MIDJOURNEY_PROMPTS.md
- [ ] Create directory: `/public/images/sanitary-waste-system/`
- [ ] Save images with recommended filenames
- [ ] Update content file paths for slides 4, 6, 7
- [ ] Test locally at http://localhost:3000/clients/work/sanitary-waste-system/quick-overview
- [ ] Commit and push changes

## Example: Full Slide with Image

```typescript
{
  id: 'slide-04',
  sectionId: 'solution',
  slideNumber: 4,
  type: 'solution',
  headline: 'Material Innovation Meets User Experience',
  subheadline: 'Hybrid Material Architecture That Transforms the Experience',
  content: [
    'Before: "I can feel it. I hate this."',
    'After: "It feels insulated, drier, less gross."',
    'Same pickup behavior (invert + tie), vastly better experience.'
  ],
  bullets: [
    'Inner liner: Airlaid non-woven (absorbent, wet-strong) → Reduced heat transmission',
    'Outer shell: Compostable film or recycled LDPE → Rapid moisture uptake',
    'Zone bonding for flexibility → Calmer carry-time experience',
    'Interfolded flat-pack format → Familiar invert-and-tie motion retained'
  ],
  visual: {
    type: 'image',
    data: {
      src: '/images/sanitary-waste-system/image1.png',
      alt: 'Cross-section showing three-layer construction with absorbent liner',
      caption: 'Hybrid material architecture: 600-1000 micron airlaid liner provides thermal insulation',
      description: 'Product cross-section showing material layers'
    }
  },
  deepDive: {
    // ... existing deepDive content
  }
}
```

## Next Steps

Once images are placed:
1. The deck component will automatically render them
2. Images get dark-themed borders and background
3. Fallback to description text if image fails to load
4. Optional captions display below images

Need help? Check the existing implementation in:
- `/components/sanitary-waste-system/SanitaryWasteDeck.tsx` (lines 279-302)
- `/lib/content/sanitary-waste-system.ts` (slide definitions)
