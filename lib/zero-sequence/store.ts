/**
 * Zero Sequence State Management (Zustand)
 * Manages all demo state: email input, classification, entities, actions, modal flows
 */

import { create } from 'zustand';
import type {
  ZeroSequenceState,
  EmailData,
  ClassificationResult,
  EntityData,
  ActionData,
  ModalFlowData,
  StepName,
} from './types';
import { classifyIntent, extractEntities } from './api';
import { logger } from '@/lib/utils/logger';

interface ZeroSequenceStore extends ZeroSequenceState {
  // Actions
  setEmailInput: (email: EmailData) => void;
  setCurrentStep: (step: StepName) => void;
  setClassification: (classification: ClassificationResult) => void;
  setEntities: (entities: EntityData) => void;
  setActions: (actions: ActionData) => void;
  setModalFlow: (modalFlow: ModalFlowData) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;

  // Business logic
  runSequence: (email: EmailData) => Promise<void>;
  reset: () => void;
}

const initialState: ZeroSequenceState = {
  emailInput: null,
  classification: null,
  entities: null,
  actions: null,
  modalFlow: null,
  currentStep: 'input',
  loading: false,
  error: null,
};

export const useZeroSequenceStore = create<ZeroSequenceStore>((set, get) => ({
  ...initialState,

  // Setters
  setEmailInput: (email) => set({ emailInput: email }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setClassification: (classification) => set({ classification }),
  setEntities: (entities) => set({ entities }),
  setActions: (actions) => set({ actions }),
  setModalFlow: (modalFlow) => set({ modalFlow }),
  setError: (error) => set({ error, loading: false }),
  setLoading: (loading) => set({ loading }),

  // Main business logic: Run the full Zero Sequence
  runSequence: async (email: EmailData) => {
    logger.log('[Store] Starting runSequence with email:', email);
    set({ loading: true, error: null, emailInput: email });

    try {
      // Step 1: Classification
      logger.log('[Store] Step 1: Starting classification');
      set({ currentStep: 'classification' });
      const classificationResult = await classifyIntent(email);
      logger.log('[Store] Classification result:', classificationResult);
      set({ classification: classificationResult });

      // Small delay for UX (let user see the step)
      await new Promise(resolve => setTimeout(resolve, 300));

      // Step 2: Entity Extraction
      logger.log('[Store] Step 2: Starting entity extraction');
      set({ currentStep: 'entities' });
      const entityData = await extractEntities(email, classificationResult.detectedIntent);
      logger.log('[Store] Entity extraction result:', entityData);
      set({ entities: entityData });

      await new Promise(resolve => setTimeout(resolve, 300));

      // Step 3: Action Routing
      logger.log('[Store] Step 3: Starting action routing');
      logger.log('[Store] suggestedActions from classification:', classificationResult.suggestedActions);
      set({ currentStep: 'actions' });

      // Map intent to action ID if suggestedActions is empty or not in the right format
      const intentToActionId: Record<string, string> = {
        'permission_form_signing': 'sign_form',
        'pay_invoice': 'pay_invoice',
        'track_package': 'track_package',
        'check_in_flight': 'check_in_flight',
        'appointment_reminder': 'add_to_calendar',
      };

      // Get action ID from intent
      const actionId = intentToActionId[classificationResult.detectedIntent] || 'track_package';
      const actionTitle = actionId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      const actionData: ActionData = {
        actions: [{
          actionId,
          title: actionTitle,
          description: `Action based on ${classificationResult.detectedIntent}`,
          modalCount: 3,
          confidence: classificationResult.confidence,
        }],
        primaryAction: undefined,
      };

      if (actionData.actions.length > 0) {
        actionData.primaryAction = actionData.actions[0];
      }

      logger.log('[Store] Action data:', actionData);
      set({ actions: actionData });

      await new Promise(resolve => setTimeout(resolve, 300));

      // Step 4: Modal Flow
      logger.log('[Store] Step 4: Starting modal flow');
      set({ currentStep: 'modal' });
      // Load modal flow for primary action
      if (actionData.primaryAction) {
        logger.log('[Store] Primary action:', actionData.primaryAction);
        try {
          // Load modal flows from JSON
          const response = await fetch('/config/zero-sequence/modal-flows.json');
          const flowsData = await response.json();

          // Map intent to flow key (also map primary action ID)
          const intentToFlowKey: Record<string, string> = {
            'permission_form_signing': 'sign_form',
            'pay_invoice': 'pay_invoice',
            'track_package': 'track_package',
            'check_in_flight': 'check_in_flight',
            'appointment_reminder': 'add_to_calendar',
            'e-commerce.shipping.notification': 'track_package',
            'e-commerce.order.confirmation': 'track_package',
            'healthcare.appointment.reminder': 'add_to_calendar',
            'travel.flight.check-in': 'check_in_flight',
          };

          // Also check primary action ID directly
          const flowKey =
            intentToFlowKey[classificationResult.detectedIntent] ||
            actionData.primaryAction.actionId ||
            classificationResult.detectedIntent;
          const flow = flowsData.flows[flowKey];

          logger.log('[Store] Flow lookup:', {
            flowKey,
            found: !!flow,
            intent: classificationResult.detectedIntent,
            actionId: actionData.primaryAction.actionId
          });

          if (flow) {
            // Extract context data from email body and entities
            const emailBody = email.body.toLowerCase();
            const emailSubject = email.subject.toLowerCase();

            // Helper to find entity by type
            const findEntity = (type: string) => {
              return entityData.entities.find(e => e.type === type)?.text || '';
            };

            // Extract carrier from common patterns
            const carrierMatch = email.body.match(/carrier:?\s*(\w+)/i) ||
                               email.body.match(/(UPS|FedEx|USPS|DHL)/i);
            const carrier = carrierMatch ? carrierMatch[1] : 'UPS';

            // Extract tracking number
            const trackingMatch = email.body.match(/tracking\s*(?:number)?:?\s*([A-Z0-9]+)/i);
            const trackingNumber = trackingMatch ? trackingMatch[1] : findEntity('other');

            // Extract amounts with currency
            const amountMatch = email.body.match(/\$?([\d,]+\.?\d{0,2})/);
            const amount = classificationResult.paymentAmount ||
                          (amountMatch ? parseFloat(amountMatch[1].replace(',', '')) : 25.00);

            // Extract invoice/order numbers
            const invoiceMatch = email.body.match(/(?:invoice|order)\s*#?:?\s*([A-Z0-9-]+)/i);
            const invoiceId = invoiceMatch ? invoiceMatch[1] : findEntity('other') || 'INV-12345';

            // Extract provider/doctor names
            const providerMatch = email.body.match(/(?:dr\.|doctor|with)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
            const provider = providerMatch ? providerMatch[1] : findEntity('person') || 'Dr. Smith';

            // Extract location
            const location = findEntity('location') || '123 Medical Plaza';

            // Extract flight number
            const flightMatch = email.body.match(/flight\s*#?:?\s*([A-Z]{2}\s*\d+)/i);
            const flightNumber = flightMatch ? flightMatch[1] : 'UA 1234';

            // Extract product name from subject or body
            const productName = email.subject.split(/\s*-\s*/)[0].trim() || 'Product';

            // Extract promo code
            const promoMatch = email.body.match(/code:?\s*([A-Z0-9]+)/i);
            const promoCode = promoMatch ? promoMatch[1] : 'SAVE20';

            // Extract discount percentage
            const discountMatch = email.body.match(/(\d+)%\s*off/i);
            const discount = discountMatch ? parseInt(discountMatch[1]) : 20;

            const contextData: Record<string, any> = {
              // Shipping/Package tracking
              carrier,
              estimatedDelivery: classificationResult.deadline || findEntity('date') || 'Tomorrow',
              trackingNumber,

              // Payment/Invoice
              amount,
              paymentAmount: amount,
              invoiceId,
              dueDate: classificationResult.deadline || findEntity('date'),
              recipient: email.from.split('<')[0].trim() || email.from,

              // Form signing
              event: email.subject.includes('Permission') ? 'Permission Form' :
                     email.subject.includes('Form') ? email.subject : 'Form',

              // Appointments/Calendar
              provider,
              dateTime: classificationResult.deadline || findEntity('date') || 'Tomorrow at 2:00 PM',
              location,

              // Flight check-in
              flightNumber,
              departureTime: findEntity('date') || '10:30 AM',

              // Product launch
              productName,
              launchDate: classificationResult.deadline || findEntity('date'),
              launchTime: '10:00 AM',
              estimatedPrice: amount,

              // Promo code
              discount,
              promoCode,
            };

            const modalFlowData: ModalFlowData = {
              flow: {
                actionId: flowKey,  // Use the mapped flow key, not the human-readable action string
                actionTitle: flow.title,
                steps: flow.steps.map((step: any, index: number) => {
                  // Infer step type from label
                  let type: 'input' | 'confirmation' | 'processing' | 'result' = 'input';
                  const label = step.label.toLowerCase();

                  if (label.includes('confirm') || label.includes('review')) {
                    type = 'confirmation';
                  } else if (label.includes('processing') || label.includes('sending')) {
                    type = 'processing';
                  } else if (label.includes('complete') || label.includes('signed') || label.includes('success') || label.includes('sent')) {
                    type = 'result';
                  } else if (index === flow.steps.length - 1) {
                    type = 'result'; // Last step is usually result
                  } else if (index === flow.steps.length - 2) {
                    type = 'processing'; // Second-to-last is usually processing
                  }

                  // Generate description based on step type
                  let description: string | undefined;
                  if (type === 'input') {
                    description = 'User provides required information or selects an option to proceed.';
                  } else if (type === 'confirmation') {
                    description = 'Review and confirm the details before submitting.';
                  } else if (type === 'processing') {
                    description = 'Processing your request and communicating with the service.';
                  } else if (type === 'result') {
                    description = 'Action completed successfully. Confirmation has been sent.';
                  }

                  return {
                    stepNumber: index + 1,
                    type,
                    title: step.label.replace(/^\d+\.\s*/, ''), // Remove "1. " prefix
                    description,
                    inputs: contextData, // Pass context to all steps
                    outputs: undefined,
                  };
                }),
                totalSteps: flow.steps.length,
              },
              visualization: 'horizontal', // Desktop: horizontal, mobile will use vertical via CSS
            };
            logger.log('[Store] Setting modal flow data:', modalFlowData);
            set({ modalFlow: modalFlowData });
          } else {
            logger.warn('[Store] No flow found for flowKey:', flowKey);
          }
        } catch (error) {
          logger.error('[Store] Failed to load modal flows:', error);
          // Continue without modal flow - not a critical error
        }
      } else {
        logger.warn('[Store] No primary action to load modal flow');
      }

      logger.log('[Store] Sequence complete, setting loading to false');
      set({ loading: false });
    } catch (error) {
      logger.error('Zero Sequence error:', error);
      const errorMessage = error instanceof Error
        ? error.message.includes('timeout')
          ? 'Request timed out. Please try again.'
          : error.message.includes('fetch') || error.message.includes('Failed to fetch')
            ? 'Unable to connect to the AI service. Please check your connection and try again.'
            : error.message
        : 'An unexpected error occurred. Please try again.';

      set({
        error: errorMessage,
        loading: false,
      });
    }
  },

  // Reset to initial state
  reset: () => set(initialState),
}));

// Selectors for easy access
export const selectEmailInput = (state: ZeroSequenceStore) => state.emailInput;
export const selectClassification = (state: ZeroSequenceStore) => state.classification;
export const selectEntities = (state: ZeroSequenceStore) => state.entities;
export const selectActions = (state: ZeroSequenceStore) => state.actions;
export const selectModalFlow = (state: ZeroSequenceStore) => state.modalFlow;
export const selectCurrentStep = (state: ZeroSequenceStore) => state.currentStep;
export const selectLoading = (state: ZeroSequenceStore) => state.loading;
export const selectError = (state: ZeroSequenceStore) => state.error;
