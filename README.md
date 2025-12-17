# Rationale Studio - Public Website

**Production-grade Next.js 16 website** for Rationale, a product studio building Zero Inbox, Heirloom, and other ventures.

[![CI/CD Quality Gates](https://github.com/RationaleDesignHanson/RationaleStudio/actions/workflows/quality-gates.yml/badge.svg)](https://github.com/RationaleDesignHanson/RationaleStudio/actions/workflows/quality-gates.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-95%25-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-118%20passing-brightgreen)](#testing)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-green)](#accessibility)

**Live:** [rationale.work](https://rationale.work)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)

---

## Overview

### What is Rationale?

Rationale is a **product studio** that builds AI-powered applications. This website serves multiple audiences:

- **Public Site** - Portfolio, capabilities, case studies
- **Product Pages** - Zero Inbox, Heirloom, Project Atlas
- **Investor Portal** - Data rooms, pitch decks, financials
- **Partner Portal** - Collaboration docs, engagement models
- **Team Portal** - Internal tools, admin dashboards
- **Owner Portal** - Analytics, content management

### Key Features

- **Role-Based Access Control (RBAC)** - Firebase Authentication with custom claims (owner, team, partner, investor, client)
- **Beta Signup System** - Firestore-backed waitlist with admin dashboard
- **Interactive Demos** - React-based prototypes for Zero, Heirloom, Athletes First
- **Design System** - 50+ components with design tokens and responsive patterns
- **Comprehensive Testing** - 78 unit tests, 23 E2E tests, 17 accessibility tests
- **CI/CD Quality Gates** - Automated linting, type-checking, testing on every commit
- **Error Monitoring** - Sentry integration for production error tracking

---

## Tech Stack

### Core

- **Framework:** [Next.js 16.0.10](https://nextjs.org/) (App Router, React 19, Server Components)
- **Language:** [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4.1](https://tailwindcss.com/)
- **Deployment:** [Netlify](https://www.netlify.com/) with serverless functions

### Database & Auth

- **Authentication:** [Firebase Auth](https://firebase.google.com/docs/auth)
- **Database:** [Cloud Firestore](https://firebase.google.com/docs/firestore)
- **Admin SDK:** Firebase Admin (server-side session verification)

### Testing

- **Unit Tests:** [Vitest](https://vitest.dev/) (78 tests, 26 utils + 52 zero-sequence)
- **E2E Tests:** [Playwright](https://playwright.dev/) (23 tests across 7 critical paths)
- **Accessibility:** [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) (17 tests, 0 WCAG violations)

### Key Libraries

- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Email:** [Resend](https://resend.com/) + [React Email](https://react.email/)
- **Error Monitoring:** [Sentry](https://sentry.io/)

---

## Quick Start

### Prerequisites

- **Node.js:** 20.x or higher
- **npm:** 10.x or higher
- **Firebase Account:** For authentication and database

### 1. Clone Repository

```bash
git clone https://github.com/RationaleDesignHanson/RationaleStudio.git
cd RationaleStudio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:

```bash
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Resend (Email)
RESEND_API_KEY=re_your_key_here

# Sentry (Error Monitoring)
NEXT_PUBLIC_SENTRY_DSN=https://your_dsn@sentry.io/project_id
SENTRY_AUTH_TOKEN=your_auth_token

# Replicate (AI - Optional)
REPLICATE_API_KEY=r8_your_key_here
```

**Firebase Setup:** See [docs/setup/FIREBASE_ADMIN_SETUP.md](docs/setup/FIREBASE_ADMIN_SETUP.md) for detailed instructions.

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Verify Setup

You should see:

```
[Firebase Admin] Successfully initialized
[Logger] Development mode enabled
```

Test authentication: [http://localhost:3000/login](http://localhost:3000/login)

---

## Project Structure

```
rationale-public/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public pages (/, /contact, /work)
│   ├── admin/               # Admin dashboards (beta signups)
│   ├── api/                 # API routes (auth, beta, pitch)
│   ├── owner/               # Owner portal (protected)
│   ├── investors/           # Investor portal (protected)
│   ├── partners/            # Partner portal (protected)
│   ├── team/                # Team portal (protected)
│   └── clients/             # Client portal (protected)
├── components/              # React components
│   ├── ui/                  # Base UI components (Button, Card, Badge)
│   ├── layout/              # Layout components (Header, Footer, ErrorBoundary)
│   ├── zero/                # Zero Inbox demos
│   ├── heirloom/            # Heirloom demos
│   ├── athletes-first/      # Athletes First demos
│   └── presentation/        # Pitch deck viewer
├── lib/                     # Utilities and business logic
│   ├── auth/                # Firebase auth (client + admin)
│   ├── firestore/           # Firestore helpers (beta signups, user profiles)
│   ├── utils/               # Utilities (logger, helpers, types)
│   └── resend/              # Email templates
├── hooks/                   # React hooks (useAuth, useFirestore)
├── tests/                   # Test suites
│   ├── unit/                # Unit tests (lib/, utils/)
│   ├── e2e/                 # E2E tests (auth flows, RBAC)
│   └── accessibility.spec.ts # Accessibility tests
├── docs/                    # Documentation
│   ├── setup/               # Setup guides
│   ├── phases/              # Transformation plan progress
│   └── design-system/       # Design system docs
├── public/                  # Static assets
│   ├── images/              # Optimized images (WebP/AVIF)
│   └── fonts/               # Custom fonts
├── scripts/                 # Automation scripts
│   ├── migrate-to-logger.mjs # Console → logger migration
│   └── optimize-images.mjs   # Image optimization
└── .github/workflows/       # CI/CD pipelines
    └── quality-gates.yml    # Automated quality checks
```

---

## Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Building
npm run build            # Production build
npm run start            # Start production server

# Code Quality
npm run lint             # ESLint code linting
npm run format           # Prettier code formatting

# Testing
npm test                 # Run unit tests (watch mode)
npm run test:run         # Run unit tests (single run)
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Generate coverage report

# E2E Testing
npx playwright test                 # Run all E2E tests
npx playwright test tests/e2e/      # Run E2E tests only
npx playwright test --ui            # Open Playwright UI
npx playwright test --debug         # Debug mode

# Bundle Analysis
npm run analyze          # Analyze bundle size
npm run analyze:browser  # Browser bundle only
npm run analyze:server   # Server bundle only
```

### Code Style

- **ESLint:** `npm run lint` (enforced in pre-commit hooks)
- **Prettier:** `npm run format` (auto-format on save recommended)
- **TypeScript:** Strict mode enabled, 95% type coverage target
- **Import Order:** Automated with ESLint
- **Design Tokens:** Use Tailwind classes, avoid hardcoded colors

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test
npm run lint
npm test
npm run build

# Commit (triggers pre-commit hooks)
git add .
git commit -m "feat: your descriptive commit message"

# Push and create PR
git push origin feature/your-feature-name
```

**Commit Convention:** Use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `test:` Tests
- `refactor:` Code refactoring
- `chore:` Build/tooling changes

---

## Testing

### Unit Tests (78 passing)

Located in `tests/unit/`:

```bash
npm test                 # Watch mode
npm run test:run         # Single run
npm run test:coverage    # With coverage report
```

**Coverage:**
- `lib/utils/` - 26 tests (logger, helpers, types)
- `lib/zero-sequence/` - 52 tests (API integration, classification, entity extraction)

**Target:** 80% coverage for all `lib/` utilities

### E2E Tests (23 passing)

Located in `tests/e2e/`:

```bash
npx playwright test                    # All tests
npx playwright test tests/e2e/         # E2E only
npx playwright test --project=chromium # Single browser
```

**Test Suites:**
1. Authentication flows (login, logout, session verification)
2. Role-based access control (owner, team, partner, investor, client)
3. Beta signup form (validation, success, errors)
4. Public page navigation
5. Protected route middleware
6. Investor data room access
7. Admin dashboard functionality

### Accessibility Tests (17 passing, 0 WCAG violations)

Located in `tests/e2e/accessibility.spec.ts`:

```bash
npx playwright test tests/e2e/accessibility.spec.ts
```

**Coverage:**
- All public pages (homepage, work, contact, partnerships)
- Product pages (Zero, Heirloom)
- Investor portal pages
- WCAG 2.1 AA compliance verified

---

## Deployment

### Netlify (Production)

**Live URL:** [rationale.work](https://rationale.work)

**Build Settings:**
- **Build Command:** `npm run build`
- **Publish Directory:** `.next`
- **Node Version:** 20.x

**Environment Variables:**
Set all variables from `.env.local` in Netlify dashboard:
- Firebase credentials (client + admin)
- Resend API key
- Sentry DSN
- Replicate API key (optional)

**Deploy:**
```bash
# Automatic deployment on push to main
git push origin main

# Manual deploy via Netlify CLI
netlify deploy --prod
```

### CI/CD Quality Gates

Every push/PR triggers:
- ESLint (code quality)
- TypeScript type checking
- Unit tests (78 tests)
- E2E tests (23 tests)
- Accessibility tests (17 tests)
- Build validation

See [.github/workflows/quality-gates.yml](.github/workflows/quality-gates.yml)

---

## Documentation

### Setup Guides

- [Firebase Admin Setup](docs/setup/FIREBASE_ADMIN_SETUP.md) - Configure Firebase Admin SDK
- [Setup Instructions](docs/setup/SETUP_INSTRUCTIONS.md) - Detailed setup walkthrough
- [Deployment Guide](docs/setup/DEPLOYMENT.md) - Netlify deployment instructions

### Architecture

- [Architecture Overview](docs/ARCHITECTURE.md) - System design, auth flow, database schema
- [Design System](docs/design-system/DESIGN_SYSTEM_README.md) - Components, tokens, patterns
- [Transformation Plan](docs/TRANSFORMATION_PLAN.md) - v1.0 → v2.0 upgrade plan

### Testing

- [Testing Guide](docs/TESTING.md) - Writing tests, mocking strategies, coverage requirements

### Guides

- [Admin Dashboard Guide](docs/ADMIN_DASHBOARD_GUIDE.md) - Beta signup management
- [Beta System](docs/BETA_SYSTEM_COMPLETE.md) - Beta signup flow documentation

---

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code style guidelines
- Git workflow
- Pull request requirements
- Testing requirements
- Design token usage

### Key Principles

- **Zero Breaking Changes** - All changes must be backward compatible
- **Test Coverage** - All new code must have tests
- **Type Safety** - No `any` types without justification
- **Accessibility** - WCAG 2.1 AA compliance required
- **Design System** - Use design tokens, avoid hardcoded colors

---

## Status & Metrics

### Quality Metrics (v2.0)

| Metric | Target | Status |
|--------|--------|--------|
| **Test Coverage** | 80% | 118 tests passing |
| **Type Safety** | 95% | 95% (27 any types) |
| **WCAG Compliance** | AA | ✅ 0 violations |
| **Bundle Size** | <500KB | ✅ Optimized |
| **Performance** | 90+ | ✅ Lighthouse score |
| **Security** | 10/10 | ✅ All credentials secured |

### Recent Improvements (Dec 2025)

- ✅ **Security:** Removed hardcoded credentials, added Sentry
- ✅ **Mobile:** Fixed touch targets, optimized diagrams
- ✅ **Performance:** Image optimization (69.7MB → 5.35MB), Three.js lazy loading
- ✅ **Quality:** TypeScript improvements (48 → 27 any types)
- ✅ **Testing:** 118 comprehensive tests added (unit + E2E + a11y)
- ✅ **Architecture:** Firebase consolidation, logger utility (212 console replacements)
- ✅ **CI/CD:** GitHub Actions quality gates

See [docs/TRANSFORMATION_PLAN.md](docs/TRANSFORMATION_PLAN.md) for full details.

---

## Support & Contact

- **Website:** [rationale.work](https://rationale.work)
- **Issues:** [GitHub Issues](https://github.com/RationaleDesignHanson/RationaleStudio/issues)
- **Documentation:** [docs/](docs/)
- **Email:** matt@rationale.work

---

## License

MIT License - see [LICENSE](LICENSE) for details

---

**Last Updated:** December 17, 2025
**Version:** 2.0.0
**Status:** Production-ready
