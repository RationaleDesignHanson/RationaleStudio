#!/bin/bash

# Convert large GIFs to MP4 for better compression
# Saves ~70-90% file size while maintaining quality

set -e

GIFS=(
  "public/images/work/spark-ar/creative-effects.gif"
  "public/images/work/spark-ar/ar-body-tracking.gif"
  "public/images/work/spark-ar/image-tracking.gif"
  "public/images/work/orion/ar-commerce-glasses.gif"
  "public/images/work/spark-ar/ar-try-on.gif"
  "public/images/work/spark-ar/ar-furniture-placement.gif"
  "public/images/work/orion/ar-commerce-makeup.gif"
  "public/images/work/orion/ar-commerce-3d-bags.gif"
)

echo "🎬 Converting GIFs to MP4..."
echo "Expected savings: ~47MB (52MB → ~5MB)"
echo ""

for gif in "${GIFS[@]}"; do
  if [ -f "$gif" ]; then
    mp4="${gif%.gif}.mp4"
    echo "Converting: $gif"
    echo "→ $mp4"

    # Convert with optimization
    ffmpeg -i "$gif" \
      -movflags faststart \
      -pix_fmt yuv420p \
      -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
      "$mp4" \
      -y \
      -loglevel error

    # Show size comparison
    gif_size=$(du -h "$gif" | cut -f1)
    mp4_size=$(du -h "$mp4" | cut -f1)
    echo "  Size: $gif_size → $mp4_size"
    echo ""
  else
    echo "⚠️  File not found: $gif"
  fi
done

echo "✅ Conversion complete!"
echo ""
echo "Next steps:"
echo "1. Update code to use MP4 instead of GIF"
echo "2. Test that all videos autoplay correctly"
echo "3. Delete original GIF files when confirmed working"
echo ""
echo "Search for GIF references:"
echo "  grep -r '\\.gif' app/ components/ --include='*.tsx'"
