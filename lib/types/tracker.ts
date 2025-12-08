/**
 * Unified Project Tracker - Core Type Definitions
 * Shared across frontend, backend, and agents
 */

export type ProjectId = 'zero-ios' | 'rationale-site';
export type ProjectHealth = 'on-track' | 'at-risk' | 'blocked';
export type TaskStatus = 'todo' | 'in-progress' | 'complete' | 'blocked';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
export type CheckpointDecision = 'GO' | 'ITERATE' | 'PIVOT' | null;
export type AgentRecommendation = 'GO' | 'ITERATE' | 'PIVOT';
export type ValidationHookType = 'test' | 'agent-review' | 'manual-check' | 'metric';
export type ValidationHookStatus = 'pending' | 'passed' | 'failed';

export interface UnifiedProject {
  id: ProjectId;
  name: string;
  description: string;
  phases: Phase[];
  currentPhaseId: string;
  currentWeek: number;
  overallProgress: number; // 0-100%
  health: ProjectHealth;
  team: TeamMember[];
  budget: BudgetTracking;
  createdAt: Date;
  updatedAt: Date;
}

export interface Phase {
  id: string;
  projectId: ProjectId;
  name: string;
  startWeek: number;
  endWeek: number;
  weeks: Week[];
  checkpoint: Checkpoint;
  dependencies: string[]; // Phase IDs from other projects
}

export interface Week {
  weekNumber: number;
  phaseId: string;
  projectId: ProjectId;
  tasks: Task[];
  deliverables: Deliverable[];
  progress: number; // 0-100%
  actualHours: number;
  estimatedHours: number;
  startDate: Date;
  endDate: Date;
}

export interface Task {
  id: string;
  weekNumber: number;
  phaseId: string;
  projectId: ProjectId;
  title: string;
  description?: string;
  status: TaskStatus;
  assignee: string;
  validationHooks: ValidationHook[];
  dependencies: string[]; // Task IDs
  priority: TaskPriority;
  estimatedHours: number;
  actualHours: number;
  agentReviews: AgentReview[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface Deliverable {
  id: string;
  weekNumber: number;
  phaseId: string;
  projectId: ProjectId;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: Date;
}

export interface ValidationHook {
  id: string;
  taskId: string;
  type: ValidationHookType;
  name: string;
  command?: string; // e.g., "npm test" or "swift test"
  agentId?: string; // e.g., "systems-architect-001"
  metric?: MetricTarget;
  status: ValidationHookStatus;
  result?: any;
  timestamp?: Date;
  errorMessage?: string;
}

export interface MetricTarget {
  name: string;
  target: number;
  actual?: number;
  unit?: string; // e.g., "%", "ms", "count"
}

export interface Checkpoint {
  id: string;
  phaseId: string;
  projectId: ProjectId;
  name: string;
  weekNumber: number;
  criteria: CheckpointCriterion[];
  decision: CheckpointDecision;
  requiredAgentIds: string[]; // Agent IDs that must review
  agentOpinions: AgentOpinion[];
  evaluatedAt?: Date;
}

export interface CheckpointCriterion {
  id: string;
  checkpointId: string;
  description: string;
  met: boolean;
  evidence?: string;
}

export interface AgentOpinion {
  agentId: string;
  agentRole: string;
  checkpointId: string;
  recommendation: AgentRecommendation;
  confidence: number; // 0-100%
  reasoning: string;
  concerns: string[];
  weight: number; // 1-10 based on agent expertise for this checkpoint
  timestamp: Date;
}

export interface AgentReview {
  id: string;
  agentId: string;
  taskId?: string;
  checkpointId?: string;
  projectId: ProjectId;
  timestamp: Date;
  action: string; // e.g., "review", "audit", "evaluate"
  findings: ReviewFinding[];
  overallAssessment: string;
  nextSteps: string[];
}

export interface ReviewFinding {
  severity: 'info' | 'warning' | 'error' | 'critical';
  category: string;
  message: string;
  location?: string; // file:line or component name
  recommendation?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  joinDate: Date;
  hourlyRate?: number;
}

export interface BudgetTracking {
  totalAllocated: number;
  spent: number;
  currency: string;
  breakdown: BudgetBreakdown[];
}

export interface BudgetBreakdown {
  phaseId: string;
  allocated: number;
  spent: number;
  category: string; // e.g., "development", "infrastructure", "hiring"
}

// GraphQL Query/Mutation Types
export interface ProjectQuery {
  projectId?: ProjectId;
  includePhases?: boolean;
  includeWeeks?: boolean;
  includeTasks?: boolean;
}

export interface UpdateTaskInput {
  taskId: string;
  status?: TaskStatus;
  actualHours?: number;
  assignee?: string;
}

export interface CreateAgentReviewInput {
  agentId: string;
  taskId?: string;
  checkpointId?: string;
  projectId: ProjectId;
  findings: ReviewFinding[];
  overallAssessment: string;
  nextSteps: string[];
}

// Real-time Event Types (WebSocket)
export type EventType =
  | 'task_updated'
  | 'checkpoint_evaluated'
  | 'agent_review_complete'
  | 'validation_hook_result'
  | 'project_progress_update';

export interface RealtimeEvent {
  type: EventType;
  projectId: ProjectId;
  data: any;
  timestamp: Date;
}
