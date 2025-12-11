# GitHub Actions Workflows

## Visual Regression Testing (`visual-regression.yml`)

Automated visual regression testing using Playwright + Percy for catching visual breaks before production.

### Workflow Triggers

**Automatic:**
- Pull requests to `main` branch
- Changes to: `app/**`, `components/**`, `lib/**`, `tests/visual/**`

**Manual:**
- Workflow dispatch (Actions tab → Visual Regression Tests → Run workflow)

### What It Does

1. **Setup**: Installs Node.js 18, npm dependencies, Playwright browsers
2. **Build**: Creates production Next.js build
3. **Test**: Runs 26 visual regression tests across 11 pages
4. **Percy**: Captures visual diffs (if PERCY_TOKEN configured)
5. **Report**: Uploads Playwright HTML report + test results artifacts
6. **Comment**: Posts test summary to PR

### Test Coverage

- **26 tests total** across 11 pages
- **5 breakpoints**: 375px, 640px, 768px, 1024px, 1280px
- **3 browsers**: Chromium, Firefox, WebKit (Safari)
- **Mobile optimizations**: iPhone 12, Pixel 5 viewports

**Pages Tested:**
- Homepage (5 section snapshots)
- Work page (1 full page)
- About page (4 section snapshots)
- Contact page (1 full page)
- How We Work page (1 full page)
- Badge wrapping (6 mobile width tests)
- Mobile optimization (7 pages at mobile dimensions)
- Responsive breakpoints (5 width tests)

### Percy Configuration

Percy provides visual diff engine for catching pixel-perfect regressions.

**Setup Steps:**

1. **Create Percy Project** (if not exists):
   - Go to https://percy.io/
   - Create account (free tier: 5,000 snapshots/month)
   - Create new project: "rationale-public"
   - Copy project token

2. **Add GitHub Secret**:
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `PERCY_TOKEN`
   - Value: (paste token from Percy dashboard)
   - Click "Add secret"

3. **Verify Integration**:
   - Open a test PR
   - Check Actions tab for workflow run
   - Percy will comment with visual diff URL

**Without Percy:**
- Workflow still runs Playwright tests successfully
- Screenshots captured but no automatic diffing
- Manual review of artifacts required

### Local Testing

```bash
# Run tests without Percy (fast)
npm run test:visual

# Run tests with Percy (requires PERCY_TOKEN)
export PERCY_TOKEN=your_percy_token
npm run test:visual:percy

# View test report
npm run test:visual:report

# Interactive UI mode
npm run test:visual:ui
```

### Troubleshooting

**Workflow fails on "Install Playwright Browsers":**
- Check Node.js version (requires 18+)
- Verify `package.json` has `@playwright/test` dependency

**Percy not posting comments:**
- Verify `PERCY_TOKEN` secret is set correctly
- Check Percy dashboard for project status
- Ensure GitHub Actions has write permissions for PRs

**Tests timing out:**
- Default timeout: 15 minutes
- Increase `timeout-minutes` in workflow if needed
- Check for slow-loading pages or animations

**False positives:**
- Update Percy ignore rules in `.percy.yml`
- Hide dynamic elements with `data-dynamic="true"` attribute
- Disable animations in Percy CSS config

### Cost Estimate

**Percy Free Tier:**
- 5,000 snapshots/month (sufficient for ~40 PRs/month)
- Current usage: ~125 snapshots per run

**Typical Monthly Usage:**
- 20 PRs/month × 125 snapshots = 2,500 snapshots
- **Fits within free tier** ✅

### References

- **Strategy Doc**: `/docs/testing/VISUAL_REGRESSION_STRATEGY.md`
- **Test Files**: `/tests/visual/*.spec.ts`
- **Playwright Config**: `/playwright.config.ts`
- **Percy Config**: `/.percy.yml`
- **Test README**: `/tests/visual/README.md`

---

**Last Updated:** December 10, 2025
**Status:** ✅ Active
