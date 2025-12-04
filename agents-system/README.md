# Multi-Agent System - Systems Architect Agent

A TypeScript-based multi-agent framework with a Systems Architect Agent for backend/architecture review.

## Architecture

```
src/
├── core/
│   ├── base-agent.ts      # Abstract base class for all agents
│   ├── agent-registry.ts  # Singleton registry for agent discovery
│   └── agent-router.ts    # Message routing between agents
├── agents/
│   └── systems-architect.agent.ts  # Architecture review agent
├── types/
│   └── agent.types.ts     # TypeScript type definitions
└── utils/
    └── helpers.ts         # Utility functions
```

## Quick Start

```typescript
import { 
  initializeAgents, 
  agentRouter,
  agentRegistry 
} from '@rationale/agents-system';

// Initialize with project context
initializeAgents({
  name: 'my-project',
  rootPath: '/path/to/project',
  techStack: {
    languages: ['TypeScript'],
    frameworks: ['Next.js', 'React'],
    databases: ['PostgreSQL'],
    infrastructure: ['Vercel']
  }
});

// Run an architecture review
const result = await agentRouter.invokeByRole(
  'systems-architect', 
  'review', 
  {
    type: 'full',
    scope: ['api', 'database', 'infrastructure']
  }
);

console.log(result);
```

## Systems Architect Agent

### Capabilities

| Capability | Description |
|------------|-------------|
| `architecture-review` | Comprehensive system architecture review |
| `api-design-review` | REST/GraphQL/gRPC API design analysis |
| `database-schema-review` | Database schema analysis and optimization |
| `infrastructure-review` | Infrastructure configuration review |
| `code-pattern-analysis` | Pattern/anti-pattern detection |
| `generate-architecture-diagram` | Mermaid diagram generation |
| `tech-stack-recommendation` | Technology recommendations |
| `scalability-assessment` | Scalability analysis |

### Actions

#### Full Review
```typescript
await agentRouter.invokeByRole('systems-architect', 'review', {
  type: 'full',  // 'full' | 'api' | 'database' | 'infrastructure' | 'code-patterns'
  scope: ['api', 'database']
});
```

#### API Review
```typescript
await agentRouter.invokeByRole('systems-architect', 'review-api', {
  endpoints: [
    { method: 'GET', path: '/api/users', description: 'List users' },
    { method: 'POST', path: '/api/users', description: 'Create user' }
  ]
});
```

#### Generate Diagram
```typescript
await agentRouter.invokeByRole('systems-architect', 'generate-diagram', {
  type: 'component',  // 'component' | 'sequence' | 'deployment' | 'er' | 'flow'
  context: {}
});
```

#### Tech Stack Recommendation
```typescript
await agentRouter.invokeByRole('systems-architect', 'recommend-stack', {
  requirements: [
    'Real-time updates',
    'High availability',
    'Type safety'
  ]
});
```

## Response Structure

```typescript
interface AgentResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  reasoning?: string;      // Agent's explanation
  suggestions?: string[];  // Quick wins
  nextSteps?: string[];    // Recommended actions
}
```

## Review Findings

Findings are categorized by severity:

| Severity | Description |
|----------|-------------|
| `critical` | Must fix immediately |
| `error` | Should fix soon |
| `warning` | Address when possible |
| `suggestion` | Nice to have |
| `info` | Informational |

Each finding includes:
- **Title** and **description**
- **Recommendation** for how to fix
- **Effort** estimate (trivial → epic)
- **Impact** level (low → critical)
- **Location** (file/line/component)

## Adding New Agents

```typescript
import { BaseAgent } from '@rationale/agents-system';

class MyCustomAgent extends BaseAgent {
  constructor() {
    super(
      'my-agent-001',
      'My Custom Agent',
      'backend-engineer',  // role
      'Description of what this agent does',
      [
        { name: 'capability-1', description: '...' },
        { name: 'capability-2', description: '...' }
      ],
      '1.0.0'
    );
  }

  protected async handleRequest(message) {
    // Handle incoming requests
  }

  protected async handleEvent(message) {
    // Handle events
  }

  protected async performTask(task) {
    // Execute tasks
  }
}

// Register
import { agentRegistry } from '@rationale/agents-system';
agentRegistry.register(new MyCustomAgent());
```

## Next.js Integration

See `examples/nextjs/` for:
- **route.ts** - API route handler
- **use-architect-agent.ts** - React hook

## Building

```bash
npm install
npm run build
```

## License

MIT
