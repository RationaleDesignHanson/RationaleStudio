#!/bin/bash

# Production Deploy Script for Netlify
# Builds Next.js and deploys to production

set -e  # Exit on error

echo "🚀 Starting production deploy..."
echo ""

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Check if we're logged in
if ! netlify status &> /dev/null; then
    echo "❌ Not logged in to Netlify. Running login..."
    netlify login
fi

echo "📦 Building Next.js app..."
npm run build

echo ""
echo "☁️  Deploying to Netlify production..."
netlify deploy --prod --dir=.next

echo ""
echo "✅ Deploy complete!"
echo ""
echo "🔗 Check your site at: https://rationale.work"
