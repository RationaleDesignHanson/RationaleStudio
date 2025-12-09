// Main exports
export * from './types';
export * from './core';
export * from './agents';
export * from './config';

// Re-export singletons for convenience
export { agentRegistry } from './core/agent-registry';
export { agentRouter } from './core/agent-router';

// Re-export project configs
export { ZERO_INBOX_PROJECT, RATIONALE_SITE_PROJECT, getProjectByName, getAllProjects } from './config/projects';

// ============================================================================
// Initialization
// ============================================================================

import { agentRegistry } from './core/agent-registry';
import { agentRouter } from './core/agent-router';
import { SystemsArchitectAgent } from './agents/systems-architect.agent';
import { UXDesignExpertAgent } from './agents/ux-design-expert.agent';
import { VCInvestorAgent } from './agents/vc-investor.agent';
import { MarketingAgent } from './agents/marketing.agent';
import { ProjectContext } from './types/agent.types';

/**
 * Initialize the agent system with all agents
 */
export function initializeAgents(projectContext?: ProjectContext): void {
  // Register all agents
  const agents = [
    new SystemsArchitectAgent(),
    new UXDesignExpertAgent(),
    new VCInvestorAgent(),
    new MarketingAgent()
  ];

  for (const agent of agents) {
    if (!agentRegistry.hasAgent(agent.getId())) {
      agentRegistry.register(agent);
    }
  }

  // Set project context if provided
  if (projectContext) {
    agentRouter.setProjectContext(projectContext);
  }

  console.log('[AgentSystem] Initialized with agents:', agentRegistry.getStatus());
}

/**
 * Quick access to invoke agents by role or id
 */
export async function invokeAgent(agentId: string, action: string, payload: unknown) {
  return agentRouter.invokeAgent(agentId, action, payload);
}

export async function invokeArchitect(action: string, payload: unknown) {
  return agentRouter.invokeAgent('systems-architect-001', action, payload);
}

export async function invokeUXExpert(action: string, payload: unknown) {
  return agentRouter.invokeAgent('ux-design-expert-001', action, payload);
}

export async function invokeVCAgent(action: string, payload: unknown) {
  return agentRouter.invokeAgent('vc-investor-001', action, payload);
}

export async function invokeMarketing(action: string, payload: unknown) {
  return agentRouter.invokeAgent('marketing-agent-001', action, payload);
}

// ============================================================================
// Agent IDs for reference
// ============================================================================

export const AGENT_IDS = {
  SYSTEMS_ARCHITECT: 'systems-architect-001',
  UX_DESIGN_EXPERT: 'ux-design-expert-001',
  VC_INVESTOR: 'vc-investor-001',
  MARKETING: 'marketing-agent-001'
} as const;

// ============================================================================
// Example Usage
// ============================================================================

/*
import { 
  initializeAgents, 
  invokeArchitect, 
  invokeUXExpert, 
  invokeVCAgent, 
  invokeMarketing,
  RATIONALE_SITE_PROJECT 
} from '@rationale/agents-system';

// Initialize all agents
initializeAgents(RATIONALE_SITE_PROJECT);

// Run architecture review
const archReview = await invokeArchitect('review', { 
  type: 'full', 
  projectName: 'rationale-site' 
});

// Run UX audit
const uxReview = await invokeUXExpert('audit', { 
  type: 'full' 
});

// Get VC perspective
const vcReview = await invokeVCAgent('review', { 
  type: 'full' 
});

// Generate marketing content
const socialPosts = await invokeMarketing('create-social-post', { 
  platform: 'linkedin',
  topic: 'product design'
});
*/

