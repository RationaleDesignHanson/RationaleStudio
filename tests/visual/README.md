# Visual Regression Tests

Visual regression testing setup using Playwright + Percy.

## Quick Start

```bash
# Run visual tests locally (Playwright only)
npm run test:visual

# Run with Percy visual diff engine (requires PERCY_TOKEN)
export PERCY_TOKEN=your_percy_token
npm run test:visual:percy

# Run tests in interactive UI mode
npm run test:visual:ui

# View test report
npm run test:visual:report
```

## Test Coverage

### Pages Tested
- Homepage (5 sections)
- Work page (4 sections)
- Badge wrapping (5 mobile widths)

### What We Test
- **Layout consistency** across breakpoints
- **Badge positioning** on mobile devices (320-414px)
- **Card rendering** (Zero, Heirloom, Pipeline)
- **Section rendering** (Hero, Current Focus, Three Paths, Velocity Proof, Fit Filter)

## Configuration

- **Playwright Config**: `playwright.config.ts`
- **Percy Config**: `.percy.yml`
- **Strategy Doc**: `docs/testing/VISUAL_REGRESSION_STRATEGY.md`

## Test Files

- `homepage.spec.ts` - Homepage sections
- `work-page.spec.ts` - Work page sections
- `badge-wrapping.spec.ts` - Mobile badge positioning

## CI/CD Integration

Tests run automatically on PRs via GitHub Actions. Percy will comment with visual diffs.

## Local Development

1. Start dev server: `npm run dev`
2. Run tests: `npm run test:visual`
3. View report: `npm run test:visual:report`

For more details, see: `docs/testing/VISUAL_REGRESSION_STRATEGY.md`
