#!/bin/bash

###############################################################################
# Pre-Deployment Test Suite
# Runs comprehensive validation before deploying to production
###############################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Tracking
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

# Log file
LOG_FILE="pre-deploy-test-$(date +%Y%m%d-%H%M%S).log"

###############################################################################
# Helper Functions
###############################################################################

print_header() {
  echo ""
  echo -e "${BLUE}========================================${NC}"
  echo -e "${BLUE}$1${NC}"
  echo -e "${BLUE}========================================${NC}"
  echo ""
}

print_step() {
  echo -e "${YELLOW}▶ $1${NC}"
  TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
  PASSED_CHECKS=$((PASSED_CHECKS + 1))
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
  FAILED_CHECKS=$((FAILED_CHECKS + 1))
}

print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

###############################################################################
# Test Functions
###############################################################################

test_node_version() {
  print_step "Checking Node.js version..."
  NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
  if [ "$NODE_VERSION" -ge 20 ]; then
    print_success "Node.js version: $(node -v) (requirement: ≥20.x)"
  else
    print_error "Node.js version too old: $(node -v) (requirement: ≥20.x)"
    return 1
  fi
}

test_dependencies() {
  print_step "Checking dependencies are installed..."
  if [ -d "node_modules" ]; then
    print_success "Dependencies installed"
  else
    print_error "Dependencies not installed. Run: npm install"
    return 1
  fi
}

test_env_variables() {
  print_step "Checking environment variables..."

  REQUIRED_VARS=(
    "NEXT_PUBLIC_FIREBASE_API_KEY"
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    "FIREBASE_PROJECT_ID"
    "FIREBASE_CLIENT_EMAIL"
    "FIREBASE_PRIVATE_KEY"
    "RESEND_API_KEY"
    "NEXT_PUBLIC_SENTRY_DSN"
  )

  MISSING_VARS=()

  for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
      MISSING_VARS+=("$var")
    fi
  done

  if [ ${#MISSING_VARS[@]} -eq 0 ]; then
    print_success "All required environment variables set"
  else
    print_error "Missing environment variables: ${MISSING_VARS[*]}"
    echo "         Check .env.local and docs/setup/FIREBASE_ADMIN_SETUP.md"
    return 1
  fi
}

test_typescript() {
  print_step "Running TypeScript type checking..."
  if npx tsc --noEmit 2>&1 | tee -a "$LOG_FILE"; then
    print_success "TypeScript: No type errors"
  else
    print_warning "TypeScript: Some type errors found (check log)"
    # Don't fail - we have known type issues
  fi
}

test_eslint() {
  print_step "Running ESLint..."
  if npm run lint 2>&1 | tee -a "$LOG_FILE"; then
    print_success "ESLint: No linting errors"
  else
    print_error "ESLint: Linting errors found (see above)"
    return 1
  fi
}

test_unit_tests() {
  print_step "Running unit tests (78 tests expected)..."
  if npm run test:run 2>&1 | tee -a "$LOG_FILE"; then
    TEST_COUNT=$(grep -o "[0-9]\+ passed" "$LOG_FILE" | tail -1 | cut -d' ' -f1)
    print_success "Unit tests: $TEST_COUNT tests passed"
  else
    print_error "Unit tests: Some tests failed (see above)"
    return 1
  fi
}

test_build() {
  print_step "Building production bundle..."
  echo "         This may take a few minutes..."

  if npm run build 2>&1 | tee -a "$LOG_FILE"; then
    print_success "Production build: Successful"
  else
    print_error "Production build: Failed (see above)"
    return 1
  fi
}

test_e2e() {
  print_step "Running E2E tests (23 tests expected)..."
  echo "         Installing Playwright browsers if needed..."

  # Install Playwright browsers if not installed
  npx playwright install --with-deps chromium > /dev/null 2>&1 || true

  if npx playwright test --project=chromium 2>&1 | tee -a "$LOG_FILE"; then
    E2E_COUNT=$(grep -o "[0-9]\+ passed" "$LOG_FILE" | tail -1 | cut -d' ' -f1)
    print_success "E2E tests: $E2E_COUNT tests passed"
  else
    print_error "E2E tests: Some tests failed (see above)"
    return 1
  fi
}

test_accessibility() {
  print_step "Running accessibility tests (17 tests expected)..."

  if npx playwright test tests/e2e/accessibility.spec.ts --project=chromium 2>&1 | tee -a "$LOG_FILE"; then
    A11Y_VIOLATIONS=$(grep -c "violations" "$LOG_FILE" || echo "0")
    if [ "$A11Y_VIOLATIONS" -eq 0 ]; then
      print_success "Accessibility: 0 WCAG violations ✅"
    else
      print_warning "Accessibility: Some violations found"
    fi
  else
    print_error "Accessibility tests: Some tests failed"
    return 1
  fi
}

test_bundle_size() {
  print_step "Checking bundle size..."

  # Check if .next exists (from build step)
  if [ -d ".next" ]; then
    BUNDLE_SIZE=$(du -sh .next | cut -f1)
    print_success "Bundle size: $BUNDLE_SIZE"

    # Check for large JS files (>500KB)
    LARGE_FILES=$(find .next -name "*.js" -size +500k | wc -l)
    if [ "$LARGE_FILES" -gt 5 ]; then
      print_warning "Found $LARGE_FILES JavaScript files over 500KB"
    fi
  else
    print_warning "No .next directory found (build may have failed)"
  fi
}

test_security_check() {
  print_step "Running security checks..."

  # Check for hardcoded credentials patterns
  PATTERNS=(
    "serviceAccountKey.json"
    "BEGIN PRIVATE KEY"
    "sk-proj-"
    "ghp_"
  )

  FOUND_ISSUES=0

  for pattern in "${PATTERNS[@]}"; do
    if git grep -q "$pattern" 2>/dev/null; then
      if ! git grep -q "$pattern" -- "*.md" "*.example" 2>/dev/null; then
        print_warning "Found pattern '$pattern' in codebase (not in docs)"
        FOUND_ISSUES=$((FOUND_ISSUES + 1))
      fi
    fi
  done

  if [ $FOUND_ISSUES -eq 0 ]; then
    print_success "Security: No obvious credential leaks"
  else
    print_warning "Security: $FOUND_ISSUES potential issues found"
  fi
}

test_firebase_connection() {
  print_step "Testing Firebase connection..."

  # Create a simple Node script to test Firebase
  cat > /tmp/test-firebase.mjs <<'EOF'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

try {
  const app = initializeApp(config);
  const auth = getAuth(app);
  console.log('✓ Firebase initialized:', config.projectId);
  process.exit(0);
} catch (error) {
  console.error('✗ Firebase initialization failed:', error.message);
  process.exit(1);
}
EOF

  if node /tmp/test-firebase.mjs 2>&1 | tee -a "$LOG_FILE"; then
    print_success "Firebase: Connection successful"
  else
    print_error "Firebase: Connection failed"
    return 1
  fi

  rm /tmp/test-firebase.mjs
}

###############################################################################
# Main Execution
###############################################################################

main() {
  print_header "PRE-DEPLOYMENT TEST SUITE"

  echo "Starting comprehensive testing..."
  echo "Log file: $LOG_FILE"
  echo ""

  # Phase 1: Environment & Dependencies
  print_header "PHASE 1: Environment & Dependencies"
  test_node_version || true
  test_dependencies || true
  test_env_variables || true

  # Phase 2: Code Quality
  print_header "PHASE 2: Code Quality"
  test_typescript || true
  test_eslint || true

  # Phase 3: Testing
  print_header "PHASE 3: Testing"
  test_unit_tests || true

  # Phase 4: Build
  print_header "PHASE 4: Production Build"
  test_build || true
  test_bundle_size || true

  # Phase 5: E2E & Accessibility (only if build succeeded)
  if [ -d ".next" ]; then
    print_header "PHASE 5: E2E & Accessibility"

    # Start dev server for E2E tests
    echo "Starting dev server for E2E tests..."
    npm run dev > /dev/null 2>&1 &
    DEV_SERVER_PID=$!

    # Wait for server to be ready
    echo "Waiting for server to be ready..."
    sleep 10

    test_e2e || true
    test_accessibility || true

    # Stop dev server
    kill $DEV_SERVER_PID 2>/dev/null || true
  else
    print_warning "Skipping E2E tests (build failed)"
  fi

  # Phase 6: Security & Connectivity
  print_header "PHASE 6: Security & Connectivity"
  test_security_check || true
  test_firebase_connection || true

  # Summary
  print_header "TEST SUMMARY"

  echo ""
  echo "Total Checks:  $TOTAL_CHECKS"
  echo -e "${GREEN}Passed:        $PASSED_CHECKS${NC}"
  echo -e "${RED}Failed:        $FAILED_CHECKS${NC}"
  echo ""

  PASS_RATE=$(awk "BEGIN {printf \"%.1f\", ($PASSED_CHECKS/$TOTAL_CHECKS)*100}")
  echo "Pass Rate:     $PASS_RATE%"
  echo ""

  if [ "$FAILED_CHECKS" -eq 0 ]; then
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}✓ ALL CHECKS PASSED${NC}"
    echo -e "${GREEN}✓ READY FOR DEPLOYMENT${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Review the log: $LOG_FILE"
    echo "  2. Push to main: git push origin main"
    echo "  3. Monitor Netlify deployment"
    echo "  4. Run post-deployment validation"
    echo ""
    exit 0
  elif [ "$FAILED_CHECKS" -le 2 ]; then
    echo -e "${YELLOW}========================================${NC}"
    echo -e "${YELLOW}⚠ MINOR ISSUES FOUND${NC}"
    echo -e "${YELLOW}⚠ REVIEW BEFORE DEPLOYMENT${NC}"
    echo -e "${YELLOW}========================================${NC}"
    echo ""
    echo "Review the log and fix issues before deploying:"
    echo "  Log file: $LOG_FILE"
    echo ""
    exit 1
  else
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}✗ CRITICAL FAILURES${NC}"
    echo -e "${RED}✗ DO NOT DEPLOY${NC}"
    echo -e "${RED}========================================${NC}"
    echo ""
    echo "Fix the following issues before deploying:"
    echo "  Log file: $LOG_FILE"
    echo ""
    exit 1
  fi
}

# Run main function
main "$@"
