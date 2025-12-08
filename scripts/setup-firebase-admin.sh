#!/bin/bash

# Firebase Admin SDK Setup Script
# This script helps you configure Firebase Admin SDK for server-side authentication

set -e

echo "=================================================="
echo "Firebase Admin SDK Setup"
echo "=================================================="
echo ""

# Check if serviceAccountKey.json exists
if [ -f "serviceAccountKey.json" ]; then
  echo "✅ Found serviceAccountKey.json"
  echo ""
  echo "Extracting credentials..."

  # Extract values from JSON
  PROJECT_ID=$(grep -o '"project_id": "[^"]*' serviceAccountKey.json | grep -o '[^"]*$')
  CLIENT_EMAIL=$(grep -o '"client_email": "[^"]*' serviceAccountKey.json | grep -o '[^"]*$')
  PRIVATE_KEY=$(grep -o '"private_key": "[^"]*' serviceAccountKey.json | sed 's/"private_key": "//' | sed 's/\\n/\\n/g')

  echo "Project ID: $PROJECT_ID"
  echo "Client Email: $CLIENT_EMAIL"
  echo "Private Key: [REDACTED]"
  echo ""

  # Check if .env.local exists
  if [ ! -f ".env.local" ]; then
    echo "Creating .env.local from .env.local.example..."
    cp .env.local.example .env.local
  fi

  # Add or update Firebase Admin SDK variables
  echo ""
  echo "📝 Choose configuration method:"
  echo "1. Use JSON file path (simpler, recommended for development)"
  echo "2. Use individual environment variables (recommended for production)"
  echo ""
  read -p "Enter choice (1 or 2): " choice

  if [ "$choice" = "1" ]; then
    # Method 1: Use file path
    if grep -q "FIREBASE_SERVICE_ACCOUNT_PATH" .env.local; then
      echo ""
      echo "⚠️  FIREBASE_SERVICE_ACCOUNT_PATH already exists in .env.local"
      echo "Current value:"
      grep "FIREBASE_SERVICE_ACCOUNT_PATH" .env.local
      echo ""
      read -p "Update it? (y/n): " update
      if [ "$update" = "y" ]; then
        # Remove old line and add new one
        sed -i '' '/FIREBASE_SERVICE_ACCOUNT_PATH/d' .env.local
        echo "" >> .env.local
        echo "# Firebase Admin SDK" >> .env.local
        echo "FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json" >> .env.local
        echo "✅ Updated FIREBASE_SERVICE_ACCOUNT_PATH in .env.local"
      fi
    else
      echo "" >> .env.local
      echo "# Firebase Admin SDK" >> .env.local
      echo "FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json" >> .env.local
      echo "✅ Added FIREBASE_SERVICE_ACCOUNT_PATH to .env.local"
    fi
  else
    # Method 2: Use individual variables
    if grep -q "FIREBASE_PROJECT_ID" .env.local && grep -q "FIREBASE_CLIENT_EMAIL" .env.local; then
      echo ""
      echo "⚠️  Firebase Admin SDK variables already exist in .env.local"
      read -p "Update them? (y/n): " update
      if [ "$update" = "y" ]; then
        # Remove old lines
        sed -i '' '/^FIREBASE_PROJECT_ID=/d' .env.local
        sed -i '' '/^FIREBASE_CLIENT_EMAIL=/d' .env.local
        sed -i '' '/^FIREBASE_PRIVATE_KEY=/d' .env.local

        # Add new lines
        echo "" >> .env.local
        echo "# Firebase Admin SDK" >> .env.local
        echo "FIREBASE_PROJECT_ID=$PROJECT_ID" >> .env.local
        echo "FIREBASE_CLIENT_EMAIL=$CLIENT_EMAIL" >> .env.local
        echo "FIREBASE_PRIVATE_KEY=\"$PRIVATE_KEY\"" >> .env.local
        echo "✅ Updated Firebase Admin SDK variables in .env.local"
      fi
    else
      echo "" >> .env.local
      echo "# Firebase Admin SDK" >> .env.local
      echo "FIREBASE_PROJECT_ID=$PROJECT_ID" >> .env.local
      echo "FIREBASE_CLIENT_EMAIL=$CLIENT_EMAIL" >> .env.local
      echo "FIREBASE_PRIVATE_KEY=\"$PRIVATE_KEY\"" >> .env.local
      echo "✅ Added Firebase Admin SDK variables to .env.local"
    fi
  fi

  echo ""
  echo "=================================================="
  echo "✅ Firebase Admin SDK configured successfully!"
  echo "=================================================="
  echo ""
  echo "Next steps:"
  echo "1. Restart your development server: npm run dev"
  echo "2. Check terminal for '[Firebase Admin] Successfully initialized'"
  echo "3. Test login at http://localhost:3000/login"
  echo ""

else
  echo "❌ serviceAccountKey.json not found"
  echo ""
  echo "Please follow these steps:"
  echo ""
  echo "1. Go to Firebase Console: https://console.firebase.google.com/"
  echo "2. Select your project: zer0inbox"
  echo "3. Go to Project Settings (gear icon) → Service Accounts"
  echo "4. Click 'Generate New Private Key'"
  echo "5. Download the JSON file"
  echo "6. Save it as 'serviceAccountKey.json' in the project root:"
  echo "   /Users/matthanson/rationale-public/serviceAccountKey.json"
  echo ""
  echo "Then run this script again: ./scripts/setup-firebase-admin.sh"
  echo ""

  # Offer to open Firebase Console
  read -p "Open Firebase Console in browser? (y/n): " open_browser
  if [ "$open_browser" = "y" ]; then
    open "https://console.firebase.google.com/project/zer0inbox/settings/serviceaccounts/adminsdk"
  fi
fi
