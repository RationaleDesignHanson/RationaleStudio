/**
 * Zero Interactive Demo - Type Definitions
 * Complete type system for email cards, actions, and modals
 */

export type EmailType = 'mail' | 'ads';

export type PriorityLevel = 'high' | 'medium' | 'low';

export type ActionType = 'IN_APP' | 'GO_TO' | 'NATIVE_API';

export interface AIAnalysis {
  actions: string;
  why: string;
  context: string;
}

export interface ActionContext {
  trackingNumber?: string;
  carrier?: string;
  url?: string;
  formType?: string;
  dueDate?: string;
  studentName?: string;
  event?: string;
  amount?: number;
  paymentMethod?: string;
  recipient?: string;
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  product?: string;
  originalPrice?: number;
  salePrice?: number;
  savings?: number;
  expiresAt?: string;
  promoCode?: string;
  discount?: number;
  categories?: string[];
  cartTotal?: number;
  items?: Array<{ name: string; price: number }>;
  productName?: string;
  launchDate?: string;
  launchTime?: string;
  estimatedPrice?: number;
  limitedEdition?: boolean;
  quantity?: number;
  invoiceId?: string;
  paymentMethods?: string[];
  description?: string;
  assignmentName?: string;
  problems?: string;
  subject?: string;
  teacher?: string;
  alertBefore?: string;
  notes?: string;
  messageType?: string;
  achievement?: string;
  childName?: string;
  category?: string;
  newsletterName?: string;
  issueNumber?: number;
  readingTime?: string;
  publication?: string;
  tags?: string[];
  autoArchiveAfter?: string;
  [key: string]: any;
}

export interface SuggestedAction {
  actionId: string;
  displayName: string;
  actionType: ActionType;
  isPrimary: boolean;
  priority: number;
  context: ActionContext;
}

export interface EmailAction {
  name: string;
  priority: number;
  isPrimary: boolean;
}

export interface EmailMetadata {
  type: EmailType;
  priority: PriorityLevel;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  kidName?: string;
  grade?: string;
  paymentAmount?: number;
  requiresSignature?: boolean;
  originalPrice?: number;
  salePrice?: number;
  discount?: number;
  urgent?: boolean;
  expiresIn?: string;
  promoCode?: string;
  cartTotal?: number;
  itemCount?: number;
  saleDate?: string;
  productName?: string;
  invoiceId?: string;
  dueDate?: string;
  score?: string;
  keyTopics?: string[];
  [key: string]: any;
}

export interface Email {
  from: string;
  initial: string;
  subject: string;
  preview: string;
  intent: string;
  intentConfidence: number;
  timeAgo: string;
  aiSummary: AIAnalysis;
  suggestedActions: SuggestedAction[];
  actions: EmailAction[];
  metadata: EmailMetadata;
  productImageUrl?: string;
  threadCount?: number;
  recipients?: string[]; // e.g., ['me', 'john@example.com', 'sarah@example.com']
}

export interface DismissedState {
  mail: number;
  ads: number;
}

export interface SwipeState {
  direction: 'left' | 'right' | 'up' | null;
  distance: number;
  action: string | null;
}

export interface CelebrationState {
  mini: boolean;
  major: boolean;
  message: string;
}

export type ModalType =
  | 'none'
  | 'action-sheet'
  | 'email-detail'
  | 'track-package'
  | 'sign-form'
  | 'pay-fee'
  | 'add-to-calendar'
  | 'save-receipt'
  | 'unsubscribe'
  | 'archive'
  | 'save-to-cart'
  | 'schedule-purchase'
  | 'copy-promo-code'
  | 'claim-deal'
  | 'pay-invoice'
  | 'view-assignment'
  | 'check-grade'
  | 'view-newsletter';

export interface ModalState {
  type: ModalType;
  email: Email | null;
  selectedAction: SuggestedAction | null;
  step: number;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: () => void;
}
