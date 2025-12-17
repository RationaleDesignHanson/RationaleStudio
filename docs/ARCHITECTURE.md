# Architecture Overview

**Rationale Studio Website** - System Design & Technical Architecture

**Version:** 2.0.0
**Last Updated:** December 17, 2025

---

## Table of Contents

- [System Overview](#system-overview)
- [Technology Stack](#technology-stack)
- [Authentication Flow](#authentication-flow)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Component Architecture](#component-architecture)
- [Design System](#design-system)
- [Deployment Architecture](#deployment-architecture)
- [Security](#security)
- [Performance Optimizations](#performance-optimizations)

---

## System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Browser                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │  Public    │  │  Portals   │  │   Admin    │                │
│  │  Pages     │  │  (RBAC)    │  │ Dashboards │                │
│  └────────────┘  └────────────┘  └────────────┘                │
└────────────┬────────────────────────────────┬───────────────────┘
             │                                 │
             │  Next.js 16 App Router          │
             │  (React 19 + TypeScript)        │
             │                                 │
┌────────────▼────────────────────────────────▼───────────────────┐
│                    Netlify Edge Functions                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Middleware   │  │  API Routes  │  │   Static     │          │
│  │ (Auth Check) │  │  (Serverless)│  │   Assets     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└────────┬─────────────────┬──────────────────┬───────────────────┘
         │                 │                  │
         │                 │                  │
┌────────▼────────┐  ┌────▼──────────┐  ┌───▼──────────┐
│  Firebase Auth  │  │   Firestore   │  │   Resend     │
│  (Identity)     │  │  (Database)   │  │   (Email)    │
└─────────────────┘  └───────────────┘  └──────────────┘
         │                 │                  │
         │                 │                  │
┌────────▼────────┐  ┌────▼──────────┐  ┌───▼──────────┐
│  Sentry         │  │   CDN         │  │  Replicate   │
│  (Monitoring)   │  │  (Images)     │  │  (AI API)    │
└─────────────────┘  └───────────────┘  └──────────────┘
```

### User Journey Flows

**Public User Flow:**
```
Landing Page → Work Portfolio → Contact Form
                ↓
          Beta Signup (Zero/Heirloom)
```

**Authenticated User Flow:**
```
Login → Role Check → Portal Dashboard
  │                      │
  │                      ├─ Owner (full access)
  │                      ├─ Investor (data rooms, pitch decks)
  │                      ├─ Partner (collaboration docs)
  │                      ├─ Team (admin tools)
  │                      └─ Client (project-specific)
  │
  └─ Middleware → Verify Session → Grant/Deny Access
```

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.10 | React framework (App Router) |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.9.3 | Type safety |
| **Tailwind CSS** | 4.1.17 | Styling framework |
| **Framer Motion** | 12.23.25 | Animations |
| **React Three Fiber** | 9.4.2 | 3D graphics (lazy loaded) |
| **Lucide React** | 0.555.0 | Icon library |

### Backend & Services

| Service | Purpose |
|---------|---------|
| **Firebase Auth** | User authentication |
| **Cloud Firestore** | NoSQL database |
| **Firebase Admin SDK** | Server-side auth verification |
| **Resend** | Transactional emails |
| **Sentry** | Error monitoring & performance tracking |
| **Replicate** | AI/ML API (optional) |
| **Netlify** | Hosting + serverless functions |

### Testing

| Tool | Purpose |
|------|---------|
| **Vitest** | Unit testing (78 tests) |
| **Playwright** | E2E testing (23 tests) |
| **@axe-core/playwright** | Accessibility testing (17 tests, WCAG 2.1 AA) |

---

## Authentication Flow

### Overview

The application uses **Firebase Authentication** with **custom claims** for role-based access control (RBAC). Session cookies are created server-side using the Firebase Admin SDK.

### Authentication Sequence

```
┌──────────┐                                              ┌─────────────┐
│  Client  │                                              │   Firebase  │
│ Browser  │                                              │    Auth     │
└────┬─────┘                                              └──────┬──────┘
     │                                                            │
     │ 1. User enters email/password                             │
     ├───────────────────────────────────────────────────────────►
     │                                                            │
     │ 2. Firebase validates credentials                         │
     │                                                            │
     │ 3. Returns ID Token + User Data                           │
     ◄───────────────────────────────────────────────────────────┤
     │                                                            │
     │ 4. POST /api/auth/session { idToken }                     │
     ├───────────────────────────────────►┌────────────────┐    │
     │                                     │  Next.js API   │    │
     │                                     │     Route      │    │
     │                                     └────────┬───────┘    │
     │                                              │            │
     │                                  5. Verify ID Token       │
     │                                              ├────────────►
     │                                              │            │
     │                                  6. Token Valid           │
     │                                              ◄────────────┤
     │                                              │            │
     │                       7. Get user profile from Firestore  │
     │                       (uid, email, role, name)            │
     │                                              │            │
     │                       8. Create session cookie            │
     │                       (expires in 7 days)                 │
     │                                              │            │
     │ 9. Set HTTP-only cookie + return user data               │
     ◄────────────────────────────────────────────┤            │
     │                                              │            │
     │ 10. Redirect to portal based on role                     │
     │     (owner → /owner, investor → /investors, etc.)        │
     │                                                            │
```

### Session Verification (Middleware)

```
Request → Middleware
            │
            ├─ Read session cookie
            │
            ├─ Verify with Firebase Admin SDK
            │     │
            │     ├─ Valid → Attach user to request
            │     │           │
            │     │           └─ Check role permissions
            │     │                 │
            │     │                 ├─ Authorized → Continue
            │     │                 └─ Unauthorized → 403 Forbidden
            │     │
            │     └─ Invalid → Redirect to /login
            │
            └─ Continue to route handler
```

### Role-Based Access Control (RBAC)

| Role | Access |
|------|--------|
| **owner** | Full access (all portals, admin tools) |
| **team** | `/team/*`, `/admin/*` |
| **partner** | `/partners/*` |
| **investor** | `/investors/*` |
| **client** | `/clients/*` (scoped to their projects) |

**Implementation:** `middleware.ts:62-94`

```typescript
const roleRouteMap: Record<string, string[]> = {
  owner: ['/owner', '/team', '/partners', '/investors', '/admin'],
  team: ['/team', '/admin'],
  partner: ['/partners'],
  investor: ['/investors'],
  client: ['/clients'],
};
```

---

## Database Schema

### Firestore Collections

#### `users` Collection

**Purpose:** Store user profiles and custom claims

```typescript
interface UserProfile {
  uid: string;                // Firebase Auth UID
  email: string;              // User email
  role: 'owner' | 'team' | 'partner' | 'investor' | 'client';
  name?: string;              // Display name
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Document Path:** `/users/{uid}`

**Security Rules:**
- Read: Only authenticated user can read their own profile
- Write: Only Admin SDK (server-side)

#### `beta_signups` Collection

**Purpose:** Beta program waitlist for Zero and Heirloom

```typescript
interface BetaSignup {
  email: string;              // User email
  app_name: 'zero' | 'heirloom';
  signup_source: string;      // Referral source (e.g., 'homepage', 'work-page')
  signed_up_at: Timestamp;    // Signup timestamp
  email_sent: boolean;        // TestFlight invite sent?
  email_sent_at: Timestamp | null;
}
```

**Document Path:** `/beta_signups/{auto-id}`

**Indexes:**
- `email + app_name` (for duplicate detection)
- `app_name + signed_up_at` (for admin filtering)

**Security Rules:**
- Read: Owner/Team only
- Write: Admin SDK only (via `/api/beta/signup`)

#### `projects` Collection (Future)

**Purpose:** Client project tracking

```typescript
interface Project {
  name: string;
  clientId: string;          // Reference to user
  status: 'planning' | 'active' | 'completed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## API Routes

### Authentication Routes

#### `POST /api/auth/session`
**Purpose:** Create server-side session cookie after Firebase Auth login

**Request:**
```typescript
{
  idToken: string; // Firebase ID Token
}
```

**Response:**
```typescript
{
  success: true,
  user: {
    uid: string,
    email: string,
    role: string,
    name?: string
  }
}
```

**Flow:**
1. Verify Firebase ID token (`firebase-admin.verifyIdToken()`)
2. Fetch user profile from Firestore (`getAdminUserProfile()`)
3. Validate user has `role` claim
4. Create session cookie (7 day expiry)
5. Set HTTP-only cookie
6. Return user data

**Implementation:** `app/api/auth/session/route.ts`

#### `DELETE /api/auth/session`
**Purpose:** Log out user by clearing session cookie

**Response:**
```typescript
{ success: true }
```

---

### Beta Signup Routes

#### `POST /api/beta/signup`
**Purpose:** Register user for Zero or Heirloom beta program

**Request:**
```typescript
{
  email: string,
  appName: 'zero' | 'heirloom',
  source?: string // Optional referral source
}
```

**Response:**
```typescript
{
  success: true,
  message: string,
  signupId: string
}
```

**Validation:**
- Email format (regex)
- App name (`zero` or `heirloom` only)
- Duplicate check (email + app_name combination)

**Side Effects:**
- Saves to Firestore `beta_signups` collection
- Sends admin notification email to `matt@rationale.work`
- (Phase 2: Will send user TestFlight invite)

**Implementation:** `app/api/beta/signup/route.ts`

---

### Future API Routes (Planned)

- `POST /api/pitch/create` - Pitch deck generation
- `POST /api/zero-sequence/classify` - Email classification (AI)
- `POST /api/zero-sequence/extract-entities` - Entity extraction (AI)
- `GET /api/projects` - List client projects
- `POST /api/projects` - Create new project

---

## Component Architecture

### Component Hierarchy

```
app/
├── (public)/                # Public route group
│   ├── layout.tsx          # Public layout (header, footer)
│   ├── page.tsx            # Homepage
│   ├── contact/
│   ├── work/
│   └── partnerships/
├── owner/                   # Owner portal (protected)
│   ├── layout.tsx          # Owner layout (gold theme)
│   └── page.tsx
├── investors/               # Investor portal (protected)
│   ├── layout.tsx          # Investor layout (blue theme)
│   └── ...
├── partners/                # Partner portal (protected)
├── team/                    # Team portal (protected)
├── clients/                 # Client portal (protected)
├── admin/                   # Admin dashboards
│   └── beta-signups/
└── api/                     # API routes

components/
├── ui/                      # Design system base components
│   ├── Button.tsx          # Reusable button component
│   ├── Card.tsx            # Base card component (13 variants)
│   ├── Badge.tsx           # Badge component
│   └── ...
├── layout/                  # Layout components
│   ├── Header.tsx          # Site header
│   ├── Footer.tsx          # Site footer
│   ├── ErrorBoundary.tsx   # Error boundary with Sentry
│   └── ProtectedRoute.tsx  # Auth wrapper
├── zero/                    # Zero Inbox demos
│   ├── ZeroDashboard.tsx
│   ├── EmailList.tsx
│   ├── ActionSheet.tsx
│   └── InteractiveDemo.tsx
├── heirloom/                # Heirloom demos
│   ├── RecipeCard.tsx
│   ├── ShoppingList.tsx
│   └── IngredientParser.tsx
├── athletes-first/          # Athletes First demos
│   └── RecruitAIDemo.tsx
└── presentation/            # Pitch deck viewer
    ├── PresentationViewer.tsx
    └── SlideNavigation.tsx
```

### Component Patterns

#### Server Components (Default)

Use for static content and server data fetching:

```typescript
// app/work/page.tsx
export default async function WorkPage() {
  // Direct server-side data access
  const projects = await getProjects();

  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

#### Client Components (Interactive)

Use `'use client'` for interactivity:

```typescript
// components/zero/InteractiveDemo.tsx
'use client'

import { useState } from 'react'

export function InteractiveDemo() {
  const [emails, setEmails] = useState([]);

  return (
    <div>
      <button onClick={() => setEmails([...])}>
        Classify Emails
      </button>
    </div>
  );
}
```

#### Composition Pattern

Build complex UIs from base components:

```typescript
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export function ProjectCard({ project }) {
  return (
    <Card
      title={project.name}
      description={project.description}
      badge={<Badge variant="gold">{project.status}</Badge>}
      footer={
        <Button variant="primary" href={project.url}>
          View Project
        </Button>
      }
    />
  );
}
```

---

## Design System

### Design Tokens

**Location:** `tailwind.config.ts`

#### Colors

```typescript
colors: {
  'terminal-gold': '#FFD700',  // Primary brand color
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    // ... through 900
  },
  blue: { 500: '#3B82F6' },
  green: { 500: '#10B981' },
  red: { 500: '#EF4444' },
}
```

#### Typography

```typescript
fontSize: {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
}
```

#### Spacing

Uses Tailwind's default spacing scale (0.25rem increments)

```
p-1 → 0.25rem (4px)
p-2 → 0.5rem (8px)
p-4 → 1rem (16px)
p-6 → 1.5rem (24px)
p-8 → 2rem (32px)
```

### Component Variants

#### Button Variants

- `primary` - Terminal gold background
- `secondary` - Gray background
- `outline` - Transparent with border
- `ghost` - No background

#### Card Variants

13 standardized variants (consolidated from 17+):
- `BaseCard` - Default card
- `ExecutiveCard` - Summary cards for exec dashboards
- `InteractiveCard` - Hover effects, clickable
- `MaterialCard` - Material Design elevation
- `CheckpointCard` - Progress indicators
- Others...

---

## Deployment Architecture

### Netlify Configuration

**Build Settings:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/old-route"
  to = "/new-route"
  status = 301
```

**Serverless Functions:**
All Next.js API routes are automatically deployed as Netlify serverless functions.

**Environment Variables:**
Set in Netlify dashboard:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `NEXT_PUBLIC_FIREBASE_*` (client config)
- `RESEND_API_KEY`
- `SENTRY_AUTH_TOKEN`

### CDN & Caching

**Static Assets:**
- Images: Cached at edge (1 year TTL)
- JS/CSS bundles: Hashed filenames (immutable)
- Fonts: Preloaded, cached

**Dynamic Routes:**
- Public pages: ISR (Incremental Static Regeneration)
- Protected routes: SSR (Server-Side Rendering)
- API routes: No caching

---

## Security

### Authentication Security

- ✅ HTTP-only session cookies (no localStorage)
- ✅ Secure flag in production (HTTPS only)
- ✅ SameSite=Lax (CSRF protection)
- ✅ 7-day session expiry
- ✅ Server-side session verification (Firebase Admin SDK)

### Data Security

- ✅ Firebase Security Rules (role-based access)
- ✅ Admin SDK operations (bypasses client rules)
- ✅ Sensitive data sanitization in logs
- ✅ Environment variables for all credentials
- ✅ `.gitignore` for `.env.local` and service account keys

### API Security

- ✅ Input validation on all routes
- ✅ Error handling (no sensitive data in responses)
- ✅ Rate limiting (Netlify built-in)
- ✅ CORS configured appropriately

### Monitoring

- ✅ Sentry error tracking
- ✅ Sentry performance monitoring
- ✅ Custom logger utility (sanitizes PII)

---

## Performance Optimizations

### Image Optimization

- ✅ Next.js `<Image>` component (automatic optimization)
- ✅ WebP/AVIF formats (60% size reduction)
- ✅ Lazy loading (native `loading="lazy"`)
- ✅ Responsive images (`sizes` attribute)
- ✅ CDN delivery

**Results:** 69.7MB → 5.35MB (92% reduction)

### Bundle Optimization

- ✅ Dynamic imports for heavy libraries
  ```typescript
  const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });
  ```
- ✅ Route-based code splitting (automatic in Next.js)
- ✅ Tree shaking (unused code eliminated)
- ✅ Minification (Terser)

**Results:** 300KB+ Three.js lazy loaded only when needed

### TypeScript Optimization

- ✅ `skipLibCheck: true` (faster builds)
- ✅ Incremental compilation (`tsbuildinfo`)
- ✅ 95% type coverage (27 `any` types remaining)

### Rendering Strategy

- **Static Generation (SSG):** Public marketing pages
- **Server-Side Rendering (SSR):** Protected portals (auth required)
- **Incremental Static Regeneration (ISR):** Blog posts, case studies (future)
- **Client-Side Rendering (CSR):** Interactive demos

---

## Future Architecture Improvements

### Planned Enhancements

1. **Content Management System (CMS)**
   - Sanity or Contentful integration
   - Enable non-technical content editing
   - Content versioning

2. **Real-Time Features**
   - Firebase Realtime Database for live updates
   - WebSocket connections for collaboration

3. **Advanced Caching**
   - Redis for API response caching
   - Service Worker for offline support

4. **Microservices**
   - Separate AI/ML services (Replicate API)
   - Dedicated analytics service

5. **Monitoring Enhancements**
   - Custom dashboards (Grafana)
   - Performance budgets (Lighthouse CI)
   - User session recording (LogRocket)

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Questions or feedback?** See [CONTRIBUTING.md](../CONTRIBUTING.md) or contact matt@rationale.work
