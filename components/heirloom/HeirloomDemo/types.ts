/**
 * TypeScript interfaces for Heirloom Demo Component
 */

export type DemoStep =
  | 'upload'
  | 'processing'
  | 'selecting'
  | 'scanned'
  | 'fork1'
  | 'fork2'
  | 'lineage';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DetectedRecipe {
  id: string;
  title: string;
  boundingBox: BoundingBox;
  confidence: ConfidenceLevel;
}

export interface RecipeConfidence {
  title: ConfidenceLevel;
  ingredients: ConfidenceLevel;
  instructions: ConfidenceLevel;
}

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  servings?: string | null;
  prepTime?: string | null;
  cookTime?: string | null;
  confidence?: RecipeConfidence;
}

export interface Generation {
  name: string;
  initials: string;
  year: string;
}

export interface FieldChange {
  by: string;
  year: string;
  from: string;
  to: string;
}

export interface ChangeHistory {
  [fieldName: string]: FieldChange[];
}

export interface Sticker {
  id: string;
  label: string;
  imagePath: string;
  fallbackEmoji: string;
}

export interface StickerOnCard extends Sticker {
  by: string;
  year: string;
}

export interface EditableTextProps {
  field: string;
  value: string;
  style?: React.CSSProperties;
  multiline?: boolean;
  showHint?: boolean;
  isEditing: boolean;
  onStartEdit: (field: string) => void;
  onEndEdit: () => void;
  onChange: (field: string, value: string) => void;
  fieldChanges: FieldChange[];
  latestChange: FieldChange | null;
  isEditable: boolean;
}

export interface HeirloomDemoProps {
  // Optional customization props for future extensibility
  className?: string;
  onStepChange?: (step: DemoStep) => void;
  onRecipeExtracted?: (recipe: Recipe) => void;
  onFlowComplete?: () => void;
}
