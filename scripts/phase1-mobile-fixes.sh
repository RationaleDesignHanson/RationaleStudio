#!/bin/bash

# Phase 1 Mobile Optimization Fixes
# Systematic find/replace for typography and spacing issues

echo "🚀 Starting Phase 1 Mobile Optimization Fixes"
echo ""

# Task 1.5: Hero headings text-6xl → text-4xl md:text-5xl lg:text-6xl
echo "📝 Task 1.5: Fixing hero headings (text-6xl)..."
find app -name "*.tsx" -type f -exec sed -i '' 's/text-6xl/text-4xl md:text-5xl lg:text-6xl/g' {} \;
echo "✅ Hero headings fixed"

# Task 1.6: Section headings text-4xl → text-2xl md:text-3xl lg:text-4xl
echo "📝 Task 1.6: Fixing section headings (text-4xl)..."
find app -name "*.tsx" -type f -exec sed -i '' 's/text-4xl md:text-5xl lg:text-6xl/text-4xl md:text-5xl lg:text-6xl/g' {} \; # Skip ones already converted
find app -name "*.tsx" -type f -exec sed -i '' 's/\([^-]\)text-4xl\([^-]\)/\1text-2xl md:text-3xl lg:text-4xl\2/g' {} \;
echo "✅ Section headings fixed"

# Task 1.8: Section padding py-20 → py-12 md:py-16 lg:py-20
echo "📝 Task 1.8: Fixing section padding (py-20)..."
find app -name "*.tsx" -type f -exec sed -i '' 's/py-20/py-12 md:py-16 lg:py-20/g' {} \;
echo "✅ Section padding fixed"

# Task 1.9: Container padding px-8 → px-4 sm:px-6 md:px-8
echo "📝 Task 1.9: Fixing container padding (px-8)..."
find app -name "*.tsx" -type f -exec sed -i '' 's/\([^-]\)px-8\([^-]\)/\1px-4 sm:px-6 md:px-8\2/g' {} \;
echo "✅ Container padding fixed"

# Task 1.10: Grid gaps gap-8 → gap-4 md:gap-6 lg:gap-8
echo "📝 Task 1.10: Fixing grid gaps (gap-8)..."
find app -name "*.tsx" -type f -exec sed -i '' 's/\([^-]\)gap-8\([^-]\)/\1gap-4 md:gap-6 lg:gap-8\2/g' {} \;
echo "✅ Grid gaps fixed"

echo ""
echo "✅ Phase 1 typography and spacing fixes complete!"
echo ""
echo "📊 Summary:"
echo "  - Hero headings: text-6xl → responsive"
echo "  - Section headings: text-4xl → responsive"
echo "  - Section padding: py-20 → responsive"
echo "  - Container padding: px-8 → responsive"
echo "  - Grid gaps: gap-8 → responsive"
echo ""
echo "Next steps:"
echo "  1. Run: npm run build (verify no TypeScript errors)"
echo "  2. Test on mobile viewport"
echo "  3. Commit changes"
