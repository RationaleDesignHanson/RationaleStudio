'use client';

import { useState } from 'react';
import { IngredientParser } from '@/components/heirloom/shared/shopping-lab/parser';
import type { FeedbackCollector } from '@/components/heirloom/shared/shopping-lab/feedback';

interface ParserShowcaseProps {
  collector: FeedbackCollector;
}

const EXAMPLES = [
  '2 cups all-purpose flour',
  '1 1/2 lbs ground beef',
  '½ cup sugar',
  '2-3 tablespoons butter',
  'about 1 cup milk',
  'salt to taste',
  '1 (14.5 oz) can diced tomatoes',
  '3 cloves garlic, minced',
];

export function ParserShowcase({ collector }: ParserShowcaseProps) {
  const [input, setInput] = useState('2 cups all-purpose flour');
  const [parser] = useState(() => new IngredientParser());

  const result = parser.parse(input);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <div className="bg-heirloom-cream rounded-lg p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-2">Ingredient Parser Demo</h4>
        <p className="text-sm text-gray-600 mb-4">
          Type any ingredient line to see how our parser extracts quantities, units, and ingredient names in real-time.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredient Line
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-heirloom-coral focus:border-heirloom-coral"
              placeholder="e.g., 2 cups flour"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Examples
            </label>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((example, i) => (
                <button
                  key={i}
                  onClick={() => setInput(example)}
                  className="px-3 py-1 text-xs bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-md transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Parsed Output */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Parsed Result</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Quantity */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h5 className="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-2">
              Quantity
            </h5>
            {result.quantity ? (
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-blue-700">Value:</span>
                  <div className="text-2xl font-bold text-blue-900">
                    {result.quantity.value}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-blue-700">Type:</span>
                  <div className="text-sm text-blue-800">
                    {result.quantity.type}
                  </div>
                </div>
                {result.quantity.type === 'range' && (
                  <div>
                    <span className="text-xs text-blue-700">Range:</span>
                    <div className="text-sm text-blue-800">
                      {result.quantity.valueLow} - {result.quantity.valueHigh}
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-xs text-blue-700">Display:</span>
                  <div className="text-sm font-mono text-blue-800">
                    {result.quantity.display}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 italic text-sm">No quantity detected</div>
            )}
          </div>

          {/* Unit */}
          <div className="bg-green-50 rounded-lg p-4">
            <h5 className="text-xs font-semibold text-green-900 uppercase tracking-wide mb-2">
              Unit
            </h5>
            {result.unit ? (
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-green-700">Canonical:</span>
                  <div className="text-2xl font-bold text-green-900">
                    {result.unit.canonical}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-green-700">Type:</span>
                  <div className="text-sm text-green-800 capitalize">
                    {result.unit.type}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 italic text-sm">No unit detected</div>
            )}
          </div>

          {/* Ingredient */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h5 className="text-xs font-semibold text-purple-900 uppercase tracking-wide mb-2">
              Ingredient
            </h5>
            <div className="space-y-2">
              <div>
                <span className="text-xs text-purple-700">Canonical:</span>
                <div className="text-2xl font-bold text-purple-900">
                  {result.ingredient.canonical || 'unknown'}
                </div>
              </div>
              <div>
                <span className="text-xs text-purple-700">Category:</span>
                <div className="text-sm text-purple-800 capitalize">
                  {result.ingredient.category}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h5 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">
            Additional Info
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-600">Confidence:</span>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      result.confidence > 0.9
                        ? 'bg-green-500'
                        : result.confidence > 0.7
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {(result.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {(result.preparation.length > 0 || result.modifiers.length > 0) && (
              <div className="space-y-2">
                {result.preparation.length > 0 && (
                  <div>
                    <span className="text-xs text-gray-600">Preparation:</span>
                    <div className="text-sm text-gray-900">
                      {result.preparation.join(', ')}
                    </div>
                  </div>
                )}
                {result.modifiers.length > 0 && (
                  <div>
                    <span className="text-xs text-gray-600">Modifiers:</span>
                    <div className="text-sm text-gray-900">
                      {result.modifiers.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* JSON Output */}
        <div>
          <h5 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-2">
            JSON Output
          </h5>
          <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-md overflow-x-auto font-mono">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      </div>

      {/* Stats */}
      <div className="text-center text-xs text-gray-500">
        <p>{collector.getAllEvents().length} parsing events recorded in this session</p>
      </div>
    </div>
  );
}
