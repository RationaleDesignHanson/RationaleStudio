#!/bin/bash

###############################################################################
# Post-Deployment Smoke Test Suite
# Validates production deployment is working correctly
###############################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PRODUCTION_URL="${1:-https://rationale.work}"
TIMEOUT=30
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

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

test_page() {
  local url="$1"
  local expected_status="${2:-200}"
  local page_name="$3"

  print_step "Testing $page_name..."

  # Make request and get status code
  status_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$TIMEOUT" "$url")

  if [ "$status_code" -eq "$expected_status" ]; then
    print_success "$page_name: HTTP $status_code"
  else
    print_error "$page_name: HTTP $status_code (expected $expected_status)"
    return 1
  fi
}

test_page_content() {
  local url="$1"
  local search_text="$2"
  local page_name="$3"

  print_step "Testing $page_name content..."

  # Fetch page content
  content=$(curl -s --max-time "$TIMEOUT" "$url")

  if echo "$content" | grep -q "$search_text"; then
    print_success "$page_name: Content found ('$search_text')"
  else
    print_error "$page_name: Expected content not found ('$search_text')"
    return 1
  fi
}

test_api_route() {
  local url="$1"
  local method="${2:-GET}"
  local route_name="$3"

  print_step "Testing API route: $route_name..."

  status_code=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" --max-time "$TIMEOUT" "$url")

  # API routes might return 400/401 if no data sent, which is OK (means they're responding)
  if [ "$status_code" -eq 200 ] || [ "$status_code" -eq 400 ] || [ "$status_code" -eq 401 ]; then
    print_success "API $route_name: HTTP $status_code (responding)"
  else
    print_error "API $route_name: HTTP $status_code"
    return 1
  fi
}

test_redirects() {
  local from_url="$1"
  local to_path="$2"
  local redirect_name="$3"

  print_step "Testing redirect: $redirect_name..."

  # Follow redirects and get final URL
  final_url=$(curl -Ls -o /dev/null -w "%{url_effective}" --max-time "$TIMEOUT" "$from_url")

  if echo "$final_url" | grep -q "$to_path"; then
    print_success "Redirect $redirect_name: $from_url → $to_path"
  else
    print_error "Redirect $redirect_name: Expected $to_path, got $final_url"
    return 1
  fi
}

test_ssl() {
  print_step "Testing SSL certificate..."

  # Extract domain from URL
  domain=$(echo "$PRODUCTION_URL" | sed -e 's|^https\?://||' -e 's|/.*||')

  # Check SSL certificate expiry
  expiry=$(echo | openssl s_client -servername "$domain" -connect "$domain":443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null | grep "notAfter" | cut -d= -f2)

  if [ -n "$expiry" ]; then
    print_success "SSL Certificate: Valid until $expiry"
  else
    print_error "SSL Certificate: Could not verify"
    return 1
  fi
}

test_performance() {
  local url="$1"

  print_step "Testing page load time..."

  # Measure time to first byte
  time_total=$(curl -s -o /dev/null -w "%{time_total}" --max-time "$TIMEOUT" "$url")

  # Convert to milliseconds
  time_ms=$(echo "$time_total * 1000" | bc | cut -d'.' -f1)

  if [ "$time_ms" -lt 3000 ]; then
    print_success "Page load time: ${time_ms}ms (< 3s)"
  elif [ "$time_ms" -lt 5000 ]; then
    print_warning "Page load time: ${time_ms}ms (3-5s, acceptable)"
  else
    print_error "Page load time: ${time_ms}ms (> 5s, slow!)"
    return 1
  fi
}

###############################################################################
# Main Execution
###############################################################################

main() {
  print_header "POST-DEPLOYMENT SMOKE TEST SUITE"

  echo "Production URL: $PRODUCTION_URL"
  echo "Timeout: ${TIMEOUT}s per request"
  echo ""

  # Phase 1: Critical Public Pages
  print_header "PHASE 1: Critical Public Pages"

  test_page "$PRODUCTION_URL" 200 "Homepage" || true
  test_page_content "$PRODUCTION_URL" "Rationale" "Homepage" || true
  test_page "$PRODUCTION_URL/work" 200 "Work Page" || true
  test_page "$PRODUCTION_URL/contact" 200 "Contact Page" || true
  test_page "$PRODUCTION_URL/partnerships" 200 "Partnerships Page" || true

  # Phase 2: Product Pages
  print_header "PHASE 2: Product Pages"

  test_page "$PRODUCTION_URL/zero" 200 "Zero Page" || true
  test_page "$PRODUCTION_URL/work/heirloom" 200 "Heirloom Page" || true
  test_page_content "$PRODUCTION_URL/zero" "Zero Inbox" "Zero Page" || true

  # Phase 3: Authentication Pages
  print_header "PHASE 3: Authentication Pages"

  test_page "$PRODUCTION_URL/login" 200 "Login Page" || true
  test_page_content "$PRODUCTION_URL/login" "Sign in" "Login Page" || true

  # Phase 4: Protected Routes (Should redirect to login or show auth page)
  print_header "PHASE 4: Protected Routes"

  test_page "$PRODUCTION_URL/owner" 200 "Owner Portal" || true
  test_page "$PRODUCTION_URL/team" 200 "Team Portal" || true
  test_page "$PRODUCTION_URL/investors" 200 "Investor Portal" || true
  test_page "$PRODUCTION_URL/partners" 200 "Partner Portal" || true

  # Phase 5: Admin Dashboards
  print_header "PHASE 5: Admin Dashboards"

  test_page "$PRODUCTION_URL/admin/beta-signups" 200 "Beta Signups Dashboard" || true

  # Phase 6: API Routes
  print_header "PHASE 6: API Routes"

  test_api_route "$PRODUCTION_URL/api/auth/session" "POST" "Session API" || true
  test_api_route "$PRODUCTION_URL/api/beta/signup" "POST" "Beta Signup API" || true

  # Phase 7: Security & Performance
  print_header "PHASE 7: Security & Performance"

  test_ssl || true
  test_performance "$PRODUCTION_URL" || true

  # Phase 8: Static Assets
  print_header "PHASE 8: Static Assets"

  test_page "$PRODUCTION_URL/images/zero-icon.png" 200 "Static Image" || true
  test_page "$PRODUCTION_URL/favicon.ico" 200 "Favicon" || true

  # Phase 9: 404 Handling
  print_header "PHASE 9: Error Handling"

  test_page "$PRODUCTION_URL/nonexistent-page-12345" 404 "404 Page" || true

  # Summary
  print_header "SMOKE TEST SUMMARY"

  echo ""
  echo "Production URL: $PRODUCTION_URL"
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
    echo -e "${GREEN}✓ ALL SMOKE TESTS PASSED${NC}"
    echo -e "${GREEN}✓ DEPLOYMENT SUCCESSFUL${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Monitor Sentry for errors: https://sentry.io/"
    echo "  2. Check Netlify analytics: https://app.netlify.com/"
    echo "  3. Test critical user flows manually"
    echo "  4. Monitor for first hour"
    echo ""
    exit 0
  elif [ "$FAILED_CHECKS" -le 2 ]; then
    echo -e "${YELLOW}========================================${NC}"
    echo -e "${YELLOW}⚠ MINOR ISSUES DETECTED${NC}"
    echo -e "${YELLOW}⚠ MONITOR CLOSELY${NC}"
    echo -e "${YELLOW}========================================${NC}"
    echo ""
    echo "Some tests failed but site may be functional."
    echo "Review failures above and monitor closely."
    echo ""
    exit 1
  else
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}✗ CRITICAL FAILURES DETECTED${NC}"
    echo -e "${RED}✗ CONSIDER ROLLBACK${NC}"
    echo -e "${RED}========================================${NC}"
    echo ""
    echo "Multiple critical tests failed."
    echo "Consider rolling back deployment immediately."
    echo ""
    echo "Rollback via Netlify:"
    echo "  https://app.netlify.com/sites/rationaledesign/deploys"
    echo ""
    exit 1
  fi
}

# Run main function
main "$@"
