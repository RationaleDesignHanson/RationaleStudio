#!/bin/bash

# Compress large PNG files using Mac's built-in sips command
# More aggressive compression available with pngquant (brew install pngquant)

set -e

echo "🖼️  Compressing PNG files..."
echo ""

# Find PNGs larger than 1MB
find public/images -name "*.png" -size +1M | while read png; do
  original_size=$(du -h "$png" | cut -f1)

  echo "Compressing: $png"
  echo "  Original: $original_size"

  # Create backup
  cp "$png" "$png.backup"

  # Compress using sips (Mac built-in)
  # setProperty format sets quality, formatOptions sets compression
  sips -s format png -s formatOptions high "$png" --out "$png.tmp" > /dev/null 2>&1

  # If compression worked, replace original
  if [ -f "$png.tmp" ]; then
    mv "$png.tmp" "$png"
    new_size=$(du -h "$png" | cut -f1)
    echo "  Compressed: $new_size"

    # Remove backup
    rm "$png.backup"
  else
    echo "  ⚠️  Compression failed, keeping original"
    rm -f "$png.backup"
  fi

  echo ""
done

echo "✅ PNG compression complete!"
echo ""
echo "For better compression, install pngquant:"
echo "  brew install pngquant"
echo "  pngquant --quality=65-80 --ext .png --force public/images/**/*.png"
