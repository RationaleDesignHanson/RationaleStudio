# Multi-Agent System Integration

The RationaleStudio project now includes a sophisticated multi-agent system with 7 specialized agents for various tasks.

## Available Agents

### 1. **Systems Architect** (`architect`)
Backend/architecture review and technical guidance
- `review` - Comprehensive system architecture review
- `review-api` - API design analysis
- `review-database` - Database schema review
- `review-infrastructure` - Infrastructure configuration review
- `analyze-code-patterns` - Pattern/anti-pattern detection
- `generate-diagram` - Generate Mermaid diagrams
- `recommend-stack` - Technology recommendations
- `assess-scalability` - Scalability analysis

### 2. **UX Design Expert** (`ux-expert`)
User experience audit and design recommendations
- `audit` - Full UX audit
- `analyze-flow` - User flow analysis
- `review-accessibility` - Accessibility review
- `suggest-improvements` - UX improvement recommendations

### 3. **VC Investor** (`vc-investor`)
Investor perspective on product and positioning
- `review` - Full site/product review from investor lens
- `assess-market-fit` - Product-market fit evaluation
- `evaluate-narrative` - Narrative and messaging assessment
- `suggest-positioning` - Strategic positioning recommendations

### 4. **Marketing Agent** (`marketing`)
Marketing content generation and strategy
- `create-social-post` - Generate social media content
- `generate-copy` - Marketing copy generation
- `suggest-campaign` - Campaign strategy suggestions
- `analyze-messaging` - Messaging effectiveness analysis

### 5. **Design System** (`design-system`)
Design system consistency and token management
- `audit` - Design system consistency audit
- `generate-tokens` - Generate design tokens
- `generate-figma-tokens` - Export Figma-compatible tokens
- `check-consistency` - Cross-platform consistency check

### 6. **Brand Director** (`brand-director`)
Brand strategy and world-building
- `review` - Brand diagnostic and analysis
- `generate-worlds` - Generate brand universe options
- `apply-world` - Apply brand world to surfaces
- `analyze-brand-consistency` - Brand consistency analysis

### 7. **Prospective Client** (`prospective-client`)
Simulated client feedback from different personas
- `full-feedback` - Complete site/service feedback as client
- `share-references` - Competitor/reference preferences
- `raise-objections` - Common objections and concerns
- `ask-questions` - Questions clients would ask

## Usage

### Via API Route

The agent system is available at `/api/agents`:

```bash
# List all agents
curl http://localhost:8472/api/agents

# Invoke an agent
curl -X POST http://localhost:8472/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "agent": "vc-investor",
    "action": "review",
    "payload": { "type": "full" }
  }'
```

### Via Demo UI

Visit `http://localhost:8472/agents-demo` for an interactive demo interface where you can:
- Select any agent and action
- Provide custom JSON payloads
- View formatted responses with reasoning and suggestions
- Try quick example scenarios

### Programmatically

```typescript
import {
  initializeAgents,
  invokeVCAgent,
  invokeBrandDirector,
  invokeProspectiveClient,
  RATIONALE_SITE_PROJECT
} from '@rationale/agents-system';

// Initialize agents (done automatically in API route)
initializeAgents(RATIONALE_SITE_PROJECT);

// Get VC investor feedback
const vcReview = await invokeVCAgent('review', { type: 'full' });

// Generate brand worlds
const brandWorlds = await invokeBrandDirector('generate-worlds', {});

// Simulate client feedback as Series A founder
const clientFeedback = await invokeProspectiveClient('full-feedback', {
  persona: 'startup-sarah'
});
```

## Example Use Cases

### 1. VC Review Before Investor Meeting
```json
{
  "agent": "vc-investor",
  "action": "review",
  "payload": { "type": "full" }
}
```
Gets comprehensive investor perspective on site positioning, credibility signals, and narrative.

### 2. Brand World Exploration
```json
{
  "agent": "brand-director",
  "action": "generate-worlds",
  "payload": {}
}
```
Generates 3-5 distinct brand universe options (TDR × Terminal, Watercolor, Bauhaus, etc.)

### 3. Client Objection Prep
```json
{
  "agent": "prospective-client",
  "action": "raise-objections",
  "payload": { "persona": "founder-felix" }
}
```
Anticipates objections a founder might have about engaging with your studio.

### 4. Architecture Audit
```json
{
  "agent": "architect",
  "action": "review",
  "payload": {
    "type": "full",
    "projectName": "rationale-site"
  }
}
```
Complete technical architecture review with findings and recommendations.

### 5. Design System Consistency Check
```json
{
  "agent": "design-system",
  "action": "audit",
  "payload": { "type": "full" }
}
```
Audits design token consistency across components.

## Response Structure

All agents return a consistent response format:

```typescript
interface AgentResponse<T> {
  success: boolean;           // Operation success status
  data?: T;                   // Response data (agent-specific)
  error?: {                   // Error details (if failed)
    code: string;
    message: string;
    details?: unknown;
  };
  reasoning?: string;         // Agent's reasoning/explanation
  suggestions?: string[];     // Quick win recommendations
  nextSteps?: string[];       // Recommended follow-up actions
}
```

## Package Structure

```
packages/agents-system/
├── src/
│   ├── agents/               # Agent implementations
│   │   ├── systems-architect.agent.ts
│   │   ├── ux-design-expert.agent.ts
│   │   ├── vc-investor.agent.ts
│   │   ├── marketing.agent.ts
│   │   ├── design-system.agent.ts
│   │   ├── brand-director.agent.ts
│   │   └── prospective-client.agent.ts
│   ├── core/                 # Core framework
│   │   ├── base-agent.ts     # Abstract base class
│   │   ├── agent-registry.ts # Agent discovery
│   │   └── agent-router.ts   # Message routing
│   ├── types/                # TypeScript definitions
│   └── config/               # Project configurations
└── dist/                     # Compiled output

app/api/agents/route.ts       # API endpoint
app/agents-demo/page.tsx      # Interactive demo UI
```

## Development

### Build the Package
```bash
cd packages/agents-system
npm install
npm run build
```

### Add New Agent
1. Create agent class extending `BaseAgent` in `src/agents/`
2. Implement required methods: `handleRequest`, `handleEvent`, `performTask`
3. Register in `src/index.ts` initialization
4. Add to API route invokers

### Run Demo
```bash
npm run dev
# Visit http://localhost:8472/agents-demo
```

## Integration Points

The agent system is integrated at:
- **API Layer**: `/api/agents` endpoint for external/internal consumption
- **Demo UI**: `/agents-demo` for testing and exploration
- **Package System**: Local monorepo package at `packages/agents-system`

## Next Steps

1. **Try the Demo**: Visit `/agents-demo` and test different agents
2. **Review API Docs**: GET `/api/agents` for detailed agent/action documentation
3. **Integrate into Workflow**: Use agents for site reviews, brand strategy, client prep
4. **Extend**: Add custom agents for your specific needs

## License

MIT - Part of Rationale Studio
