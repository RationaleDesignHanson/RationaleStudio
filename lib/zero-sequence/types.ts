/**
 * TypeScript types for Zero Sequence Demo
 * Extracted from zero-sequence-live.html
 */

export type StepName = 'input' | 'classification' | 'entities' | 'actions' | 'modal';

export type StepStatus = 'pending' | 'processing' | 'complete' | 'error';

export interface EmailData {
  subject: string;
  from: string;
  body: string;
}

export interface EmailTemplate {
  id: string;
  subject: string;
  from: string;
  body: string;
  expectedIntent?: string;
  expectedPrimaryAction?: string;
  expectedEntities?: string[];
  confidence?: number;
  compoundAction?: string;
}

export interface ClassificationResult {
  detectedIntent: string;
  confidence: number;
  source: string;
  processingTime: string;
  deadline?: string;
  paymentAmount?: number;
  suggestedActions: string[];
}

export interface Entity {
  text: string;
  type: 'amount' | 'date' | 'location' | 'person' | 'organization' | 'other';
  confidence?: number;
}

export interface EntityData {
  entities: Entity[];
  totalCount: number;
}

export interface Action {
  actionId: string;
  title: string;
  description: string;
  modalCount: number;
  confidence?: number;
}

export interface ActionData {
  actions: Action[];
  primaryAction?: Action;
}

export interface ModalStep {
  stepNumber: number;
  type: 'input' | 'confirmation' | 'processing' | 'result';
  title: string;
  inputs?: Record<string, any>;
  outputs?: Record<string, any>;
  description?: string;
}

export interface ModalFlow {
  actionId: string;
  actionTitle: string;
  steps: ModalStep[];
  totalSteps: number;
}

export interface ModalFlowData {
  flow: ModalFlow;
  visualization: 'horizontal' | 'vertical';
}

export interface ZeroSequenceState {
  emailInput: EmailData | null;
  classification: ClassificationResult | null;
  entities: EntityData | null;
  actions: ActionData | null;
  modalFlow: ModalFlowData | null;
  currentStep: StepName;
  loading: boolean;
  error: string | null;
}

export interface ApiHealthStatus {
  status: 'online' | 'offline' | 'degraded';
  classificationUrl?: string;
  entityUrl?: string;
  lastChecked?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
