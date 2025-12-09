# Zero Sequence Live: HTML → React Migration Guide

## Overview
This document maps all functionality from `zero-sequence-live.html` (331KB, 4,782 lines) to the new React component architecture.

---

## JavaScript Functions (17 total)

### 1. `loadIntentTaxonomy()` - Line 1446
**Purpose**: Load intent taxonomy data from external JSON file
**Current Implementation**: Async fetch, stores in `INTENT_DATA` global
**React Migration**:
- Move to `useIntentData` hook
- Use React Query for caching
- Return typed `IntentTaxonomy` interface

### 2. `normalizeIntentId()` - Line 1477
**Purpose**: Normalize intent IDs to match taxonomy keys
**Current Implementation**: String replace `_form` suffix, lowercase
**React Migration**:
- Move to `/lib/zero-sequence/utils.ts`
- Pure utility function, no changes needed

### 3. `loadExample()` - Line 1550
**Purpose**: Load test email template into form inputs
**Current Implementation**: Direct DOM manipulation (getElementById, set value)
**React Migration**:
- Component: `EmailInput.tsx`
- Use controlled inputs with `useState`
- Function: `handleLoadTemplate(templateId: string)`
- Show status via StatusBanner component

### 4. `showStatus()` - Line 1559
**Purpose**: Display status banner with message and type
**Current Implementation**: DOM manipulation, classList, textContent
**React Migration**:
- Component: `StatusBanner.tsx`
- Props: `message: string, type: 'success' | 'error' | 'loading'`
- Auto-hide after 5 seconds (optional)

### 5. `resetSequence()` - Line 1579
**Purpose**: Reset all steps to pending state, clear results
**Current Implementation**: Manual DOM updates for each step
**React Migration**:
- Zustand action: `resetSequence()`
- Resets state to initial values
- Clears classification, entities, actions, modalFlow

### 6. `setStepStatus()` - Line 1594
**Purpose**: Update step status badge (pending/processing/complete/error)
**Current Implementation**: DOM manipulation, textContent, classList
**React Migration**:
- Each StepCard component receives `status` prop
- Status badge rendered conditionally
- Use monospace text: `[PENDING]`, `[PROCESSING]`, `[COMPLETE]`, `[ERROR]`
- Remove emoji

### 7. `checkServiceHealth()` - Line 1622
**Purpose**: Check if classification/entity APIs are reachable
**Current Implementation**: Async fetch with timeout, logs warning if offline
**React Migration**:
- Hook: `useServiceHealth()`
- React Query with `refetchInterval: 60000` (1 minute)
- Display warning banner if offline (non-blocking)

### 8. `fetchActionCatalog()` - Line 1681
**Purpose**: Load action catalog from external URL
**Current Implementation**: Async fetch, stores in `ACTION_CATALOG` global
**React Migration**:
- Hook: `useActionCatalog()`
- React Query for caching
- Return typed `Action[]`

### 9. `runZeroSequence()` - Line 1700 [CRITICAL - Main Business Logic]
**Purpose**: Execute full pipeline: classify → entities → actions → modal flow
**Current Implementation**:
- Get form input values
- Call classification API
- Call entity extraction API
- Determine actions from intent
- Display modal flow
- Manual DOM updates throughout
- 200+ lines of imperative code

**React Migration** (Most Complex):
- Hook: `useZeroSequence(emailInput: EmailData)`
- State management via Zustand
- Async steps with loading states
- Components:
  - `IntentClassification.tsx` (Step 1)
  - `EntityExtraction.tsx` (Step 2)
  - `ActionRouting.tsx` (Step 3)
  - `ModalFlowAnalysis.tsx` (Step 4)

**Detailed Flow**:
```typescript
async function runZeroSequence(emailInput: EmailData) {
  // Step 1: Classification
  setStep('classification');
  const classification = await classifyIntent(emailInput);

  // Step 2: Entity Extraction
  setStep('entities');
  const entities = await extractEntities(emailInput, classification);

  // Step 3: Action Routing
  setStep('actions');
  const actions = await routeActions(classification, entities);

  // Step 4: Modal Flow
  setStep('modal');
  const modalFlow = await getModalFlow(actions[0], entities);
}
```

### 10. `generateEmail()` - Line 2080
**Purpose**: Generate random test email from templates
**Current Implementation**: Pick random template, generate dynamic values (dates, amounts)
**React Migration**:
- Utility: `/lib/zero-sequence/email-generator.ts`
- Function: `generateRandomEmail(): EmailData`
- Use existing templates from JSON
- Generate dynamic values for dates/amounts

### 11. `pickRandom()` - Line 2144
**Purpose**: Select random element from array
**Current Implementation**: `array[Math.floor(Math.random() * array.length)]`
**React Migration**:
- Utility: `/lib/zero-sequence/utils.ts`
- Export as `pickRandom<T>(array: T[]): T`

### 12. `randomInt()` - Line 2148
**Purpose**: Generate random integer in range
**Current Implementation**: `Math.floor(Math.random() * (max - min + 1)) + min`
**React Migration**:
- Utility: `/lib/zero-sequence/utils.ts`
- Export as `randomInt(min: number, max: number): number`

### 13. `generateFutureDate()` - Line 2152
**Purpose**: Generate date string X days in future
**Current Implementation**: Date manipulation, returns formatted string
**React Migration**:
- Utility: `/lib/zero-sequence/utils.ts`
- Export as `generateFutureDate(minDays?: number, maxDays?: number): string`

### 14. `generateOrderNumber()` - Line 2159
**Purpose**: Generate fake order number (e.g., "112-8493829-3847262")
**Current Implementation**: String template with random digits
**React Migration**:
- Utility: `/lib/zero-sequence/utils.ts`
- Export as `generateOrderNumber(): string`

### 15. `generateConfirmationCode()` - Line 2163
**Purpose**: Generate fake confirmation code (e.g., "ABC123")
**Current Implementation**: Random uppercase letters + digits
**React Migration**:
- Utility: `/lib/zero-sequence/utils.ts`
- Export as `generateConfirmationCode(): string`

### 16. `showModalFlow()` - Line 4702
**Purpose**: Display modal flow visualization with steps
**Current Implementation**: Massive HTML string generation (2000+ lines)
**React Migration**:
- Component: `ModalFlowAnalysis.tsx`
- Sub-component: `ModalStepCard.tsx`
- Props: `flow: ModalFlow, entities: EntityData`
- Use modal flows from JSON config
- Horizontal on desktop, vertical on mobile

### 17. `toggleMobileMenu()` - Line 4759 [NOT NEEDED]
**Purpose**: Toggle mobile navigation drawer
**React Migration**: **SKIP** - No header/nav in React version

### 18. `closeMobileMenu()` - Line 4766 [NOT NEEDED]
**Purpose**: Close mobile navigation drawer
**React Migration**: **SKIP** - No header/nav in React version

---

## Data Structures

### Email Templates (8 total) - Line 1507
✅ **EXTRACTED**: `/config/zero-sequence/email-templates.json`

### Modal Flows (50+ actions) - Line 2172-4600 (2,428 lines)
⏳ **TODO**: Extract to `/config/zero-sequence/modal-flows.json`

Structure:
```typescript
const MODAL_FLOWS = {
  permission_form_signing: { /* flow definition */ },
  invoice_payment: { /* flow definition */ },
  // ... 48+ more
}
```

### Intent Taxonomy
Loaded from external file via `loadIntentTaxonomy()`
React Migration: Use same external file, load via React Query

### Action Catalog
Loaded from external URL via `fetchActionCatalog()`
React Migration: Use same external URL, load via React Query

---

## API Endpoints

### 1. Classification API
**URL**: From `config.js` - `SERVICE_URLS.classification`
**Method**: POST
**Body**: `{ subject, from, body }`
**Response**:
```typescript
{
  intent: string;
  intentConfidence: number;
  _classificationSource: string;
  deadline?: string;
  paymentAmount?: number;
  suggestedActions: string[];
}
```

### 2. Entity Extraction API
**URL**: From `config.js` - `SERVICE_URLS.entityExtraction`
**Method**: POST
**Body**: `{ subject, from, body, intent }`
**Response**:
```typescript
{
  entities: Array<{
    text: string;
    type: string;
    confidence: number;
  }>;
}
```

### 3. Health Check
**URL**: Classification URL + `/health`
**Method**: GET
**Purpose**: Check if service is online

---

## Feature Parity Checklist

### Core Features
- [ ] 8 email templates load correctly
- [ ] Dropdown selector (replaces 8 buttons)
- [ ] Generate random email
- [ ] Manual email input (Subject, From, Body)
- [ ] Run Zero Sequence button triggers pipeline
- [ ] Status banner shows success/error/loading states
- [ ] Reset functionality clears all steps

### Step 1: Intent Classification
- [ ] Display detected intent
- [ ] Show confidence score
- [ ] Display classification source
- [ ] Show processing time
- [ ] Extract deadline (if present)
- [ ] Extract payment amount (if present)
- [ ] List suggested actions

### Step 2: Entity Extraction
- [ ] Display all extracted entities
- [ ] Group entities by type
- [ ] Show entity confidence scores
- [ ] Display total entity count
- [ ] Format entities as chips/badges

### Step 3: Action Routing
- [ ] List all matched actions
- [ ] Show action title and description
- [ ] Display modal count per action
- [ ] Highlight primary action
- [ ] Link to action explorer (if applicable)

### Step 4: Modal Flow Analysis
- [ ] Display modal flow visualization
- [ ] Show each step in sequence
- [ ] Display inputs/outputs per step
- [ ] Horizontal layout on desktop
- [ ] Vertical layout on mobile
- [ ] Navigation arrows (desktop)
- [ ] No horizontal scrolling (mobile)

### UI/UX Features
- [ ] Loading states for all async operations
- [ ] Error handling with retry logic
- [ ] Progressive disclosure (steps expand when active)
- [ ] Smooth scroll to active step
- [ ] Status badge updates (pending → processing → complete)
- [ ] Service health check (non-blocking)

### Accessibility
- [ ] ARIA labels on all interactive elements
- [ ] Keyboard navigation support
- [ ] Screen reader announcements for status changes
- [ ] Focus management
- [ ] Skip links for step navigation
- [ ] Touch targets ≥44px (mobile)

### Performance
- [ ] Code splitting
- [ ] Lazy loading modal flows
- [ ] API response caching
- [ ] Debounced health checks
- [ ] Initial bundle <200KB

---

## Configuration Files

### config.js (Line 7 import)
Contains `SERVICE_URLS` object:
- `classification`: Classification API endpoint
- `entityExtraction`: Entity extraction API endpoint
- `actionCatalog`: Action catalog URL

**React Migration**:
- Create `/lib/zero-sequence/config.ts`
- Export `API_CONFIG` object
- Use environment variables for URLs

### graceful-degradation.js (Line 8 import)
Handles API fallbacks and error states

**React Migration**:
- Implement error boundaries
- Add retry logic in API client
- Show fallback UI when APIs offline

---

## Styling Migration

### Current CSS (1,147 lines inline)
- Custom glassmorphism
- Purple/pink gradient backgrounds
- Emoji-heavy
- Rounded corners
- Custom button styles

### Terminal Republic Transformation
**Remove**:
- All purple (#667eea, #764ba2, #f093fb)
- Glassmorphism (backdrop-filter: blur)
- Rounded corners (border-radius)
- All emoji (69 occurrences)

**Add**:
- Pure black background (#000000)
- Gold accent (#FFD700) for borders, highlights, active states
- OS8Window components for containers
- GridShader + ScanlineEffect backgrounds
- Monospace labels: `[PENDING]`, `[ACTIVE]`, `[COMPLETE]`
- Hard edges (4px max border-radius)
- `border-2 border-[#FFD700]` for active elements
- `bg-gray-900` / `bg-gray-800` for surfaces

---

## Implementation Priority

### Week 1 (Critical Foundation)
1. ✅ Create directory structure
2. ✅ Extract email templates to JSON
3. ✅ Create TypeScript types
4. ⏳ Extract modal flows to JSON (IN PROGRESS)
5. ⏳ Document all functions (THIS FILE)
6. Create API client with retry logic
7. Set up Zustand state management

### Week 2 (Core Components)
8. Build EmailInput component with dropdown
9. Build StatusBanner component
10. Build StepCard wrapper component
11. Build IntentClassification component
12. Build EntityExtraction component
13. Build ActionRouting component
14. Build ModalFlowAnalysis component

### Week 3 (Business Logic)
15. Implement `useZeroSequence` hook
16. Implement `useClassification` hook
17. Implement `useEntityExtraction` hook
18. Implement `useActionRouting` hook
19. Implement `useModalFlow` hook
20. Connect all components to state

### Week 4 (Terminal Republic Aesthetic)
21. Replace all purple → gold/black
22. Remove all 69 emoji occurrences
23. Wrap steps in OS8Window components
24. Add GridShader + ScanlineEffect
25. Apply monospace labels for technical elements
26. Update button styles (gold primary, gold border secondary)

### Week 5 (Mobile Optimization)
27. Implement responsive breakpoints (mobile-first)
28. Ensure touch targets ≥44px
29. Convert modal flow horizontal → vertical on mobile
30. Test dropdown on iOS/Android
31. Add swipe gestures (optional)

### Week 6 (Testing & Integration)
32. Write unit tests for hooks
33. Write component tests
34. Accessibility audit (axe-core)
35. Mobile device testing
36. Feature parity validation
37. Replace iframe in work/zero page
38. Deploy and monitor

---

## Risk Mitigation

### High-Risk Areas
1. **Modal Flow Extraction**: 2,428 lines of HTML strings
   - **Mitigation**: Extract to JSON incrementally, validate each action
   - **Test**: Verify all 50+ flows render correctly

2. **API Integration**: External services may have downtime
   - **Mitigation**: Implement retry logic, show fallback UI
   - **Test**: Simulate offline mode, verify graceful degradation

3. **Feature Regression**: Complex state management
   - **Mitigation**: Create comprehensive test suite, manual QA checklist
   - **Test**: Side-by-side comparison with HTML version

4. **Mobile UX**: Horizontal scroll issues
   - **Mitigation**: Early mobile device testing, vertical modal flow on small screens
   - **Test**: Test on iPhone SE, Android devices

---

## Success Metrics

### Functional
- ✅ All 8 templates load
- ✅ Classification API integration works
- ✅ Entity extraction displays correctly
- ✅ Action routing logic preserved
- ✅ Modal flow visualization complete
- ✅ Zero regressions

### Performance
- ✅ Lighthouse score >90
- ✅ Initial bundle <200KB
- ✅ FCP <1.5s
- ✅ CLS <0.1

### Quality
- ✅ TypeScript strict mode (zero `any`)
- ✅ Test coverage >80%
- ✅ Accessibility score >95
- ✅ Zero console errors

### Brand
- ✅ Terminal Republic aesthetic (gold/black, OS8Windows)
- ✅ Zero emoji remaining
- ✅ Cohesive with main Rationale site
- ✅ Passes "screenshot test"

---

**Last Updated**: 2025-12-08
**Status**: Phase 1 in progress (Week 1, Day 1)
