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

### Pages Tested (26 tests total)
- Homepage (5 sections)
- Work page (1 full page)
- About page (4 sections)
- Contact page (1 full page)
- How We Work page (1 full page)
- Badge wrapping (6 tests: 5 mobile widths + pipeline card)
- Mobile optimization (7 pages at iPhone 12 dimensions)
- Responsive breakpoints (5 widths: 375-1280px)

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

- `homepage.spec.ts` - Homepage sections (5 tests)
- `work-page.spec.ts` - Work page full snapshot (1 test)
- `about.spec.ts` - About page sections (4 tests)
- `contact.spec.ts` - Contact page full snapshot (1 test)
- `how-we-work.spec.ts` - How We Work page full snapshot (1 test)
- `badge-wrapping.spec.ts` - Mobile badge positioning (6 tests)
- `mobile-optimization.spec.ts` - Mobile layouts + responsive breakpoints (12 tests)

## CI/CD Integration

Tests run automatically on PRs via GitHub Actions. Percy will comment with visual diffs.

## Local Development

1. Start dev server: `npm run dev`
2. Run tests: `npm run test:visual`
3. View report: `npm run test:visual:report`

For more details, see: `docs/testing/VISUAL_REGRESSION_STRATEGY.md`
