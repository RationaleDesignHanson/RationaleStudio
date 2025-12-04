import { NextRequest, NextResponse } from 'next/server';
import {
  initializeAgents,
  invokeArchitect,
  invokeUXExpert,
  invokeVCAgent,
  invokeMarketing,
  invokeDesignSystem,
  invokeBrandDirector,
  invokeProspectiveClient,
  RATIONALE_SITE_PROJECT
} from '@rationale/agents-system';

// Initialize agents on module load
initializeAgents(RATIONALE_SITE_PROJECT);

const AGENT_INVOKERS = {
  'architect': invokeArchitect,
  'ux-expert': invokeUXExpert,
  'vc-investor': invokeVCAgent,
  'marketing': invokeMarketing,
  'design-system': invokeDesignSystem,
  'brand-director': invokeBrandDirector,
  'prospective-client': invokeProspectiveClient,
} as const;

type AgentType = keyof typeof AGENT_INVOKERS;

interface InvokeAgentRequest {
  agent: AgentType;
  action: string;
  payload?: unknown;
}

/**
 * POST /api/agents
 *
 * Invoke an agent with a specific action and payload
 *
 * Request body:
 * {
 *   "agent": "architect" | "ux-expert" | "vc-investor" | "marketing" | "design-system" | "brand-director" | "prospective-client",
 *   "action": string,
 *   "payload": object (optional)
 * }
 *
 * Example:
 * {
 *   "agent": "vc-investor",
 *   "action": "review",
 *   "payload": { "type": "full" }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body: InvokeAgentRequest = await request.json();

    const { agent, action, payload = {} } = body;

    // Validate required fields
    if (!agent || !action) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: 'Missing required fields: agent, action'
          }
        },
        { status: 400 }
      );
    }

    // Validate agent type
    if (!(agent in AGENT_INVOKERS)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_AGENT',
            message: `Unknown agent: ${agent}. Valid agents: ${Object.keys(AGENT_INVOKERS).join(', ')}`
          }
        },
        { status: 400 }
      );
    }

    // Invoke the agent
    const invoker = AGENT_INVOKERS[agent];
    const result = await invoker(action, payload);

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('[Agent API Error]', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'An unknown error occurred',
          details: error
        }
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/agents
 *
 * List all available agents and their capabilities
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      agents: [
        {
          id: 'architect',
          name: 'Systems Architect',
          description: 'Backend/architecture review and technical guidance',
          actions: [
            'review',
            'review-api',
            'review-database',
            'review-infrastructure',
            'analyze-code-patterns',
            'generate-diagram',
            'recommend-stack',
            'assess-scalability'
          ]
        },
        {
          id: 'ux-expert',
          name: 'UX Design Expert',
          description: 'User experience audit and design recommendations',
          actions: [
            'audit',
            'analyze-flow',
            'review-accessibility',
            'suggest-improvements'
          ]
        },
        {
          id: 'vc-investor',
          name: 'VC Investor',
          description: 'Investor perspective on product and positioning',
          actions: [
            'review',
            'assess-market-fit',
            'evaluate-narrative',
            'suggest-positioning'
          ]
        },
        {
          id: 'marketing',
          name: 'Marketing Agent',
          description: 'Marketing content generation and strategy',
          actions: [
            'create-social-post',
            'generate-copy',
            'suggest-campaign',
            'analyze-messaging'
          ]
        },
        {
          id: 'design-system',
          name: 'Design System',
          description: 'Design system consistency and token management',
          actions: [
            'audit',
            'generate-tokens',
            'generate-figma-tokens',
            'check-consistency'
          ]
        },
        {
          id: 'brand-director',
          name: 'Brand Director',
          description: 'Brand strategy and world-building',
          actions: [
            'review',
            'generate-worlds',
            'apply-world',
            'analyze-brand-consistency'
          ]
        },
        {
          id: 'prospective-client',
          name: 'Prospective Client',
          description: 'Simulated client feedback from different personas',
          actions: [
            'full-feedback',
            'share-references',
            'raise-objections',
            'ask-questions'
          ]
        }
      ],
      examples: [
        {
          description: 'Run full VC investor review',
          request: {
            agent: 'vc-investor',
            action: 'review',
            payload: { type: 'full' }
          }
        },
        {
          description: 'Generate brand worlds',
          request: {
            agent: 'brand-director',
            action: 'generate-worlds',
            payload: {}
          }
        },
        {
          description: 'Get prospective client feedback',
          request: {
            agent: 'prospective-client',
            action: 'full-feedback',
            payload: { persona: 'startup-sarah' }
          }
        },
        {
          description: 'Run architecture review',
          request: {
            agent: 'architect',
            action: 'review',
            payload: { type: 'full', projectName: 'rationale-site' }
          }
        }
      ]
    }
  });
}
