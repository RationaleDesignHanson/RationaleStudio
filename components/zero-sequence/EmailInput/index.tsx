/**
 * Email Input Component
 * Replaces 8 buttons with a single dropdown selector
 * Terminal Republic styling
 */

'use client';

import { useState, useEffect } from 'react';
import type { EmailData, EmailTemplate } from '@/lib/zero-sequence/types';
import { generateRandomEmail } from '@/lib/zero-sequence/utils';

interface EmailInputProps {
  onSubmit: (email: EmailData) => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function EmailInput({ onSubmit, loading = false, disabled = false }: EmailInputProps) {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [subject, setSubject] = useState('');
  const [from, setFrom] = useState('');
  const [body, setBody] = useState('');

  // Load email templates on mount
  useEffect(() => {
    async function loadTemplates() {
      try {
        const response = await fetch('/config/zero-sequence/mock-email-templates.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('[EmailInput] Loaded data:', {
          hasTemplates: !!data.templates,
          templateCount: data.templates ? Object.keys(data.templates).length : 0
        });
        // Convert object of templates to array
        const templatesArray = Object.values(data.templates) as EmailTemplate[];
        console.log('[EmailInput] Templates array length:', templatesArray.length);
        setTemplates(templatesArray);
      } catch (error) {
        console.error('[EmailInput] Failed to load email templates:', error);
      }
    }
    loadTemplates();
  }, []);

  // Group templates by category (derived from expectedIntent)
  const groupedTemplates = templates.reduce((acc, template) => {
    // Extract category from expectedIntent (e.g., "e-commerce.shipping.notification" -> "e-commerce")
    const category = template.expectedIntent?.split('.')[0] || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(template);
    return acc;
  }, {} as Record<string, EmailTemplate[]>);

  const categoryLabels: Record<string, string> = {
    'e-commerce': 'E-Commerce & Shopping',
    'healthcare': 'Healthcare & Medical',
    'travel': 'Travel & Transportation',
    'finance': 'Finance & Banking',
    'education': 'Education & Learning',
    'utilities': 'Utilities & Services',
    'legal': 'Legal & Official',
    'government': 'Government & Public Services',
    'social': 'Social & Community',
    'entertainment': 'Entertainment & Media',
    'other': 'Other',
  };

  // Load selected template
  const handleLoadTemplate = () => {
    const template = templates.find(t => t.id === selectedTemplateId);
    if (template) {
      setSubject(template.subject);
      setFrom(template.from);
      setBody(template.body);
    }
  };

  // Generate random email from golden corpus
  const handleGenerateRandom = () => {
    if (templates.length === 0) {
      // Fallback to old method if templates not loaded
      const randomEmail = generateRandomEmail();
      setSubject(randomEmail.subject);
      setFrom(randomEmail.from);
      setBody(randomEmail.body);
    } else {
      // Pick a random template from the golden corpus
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      setSubject(randomTemplate.subject);
      setFrom(randomTemplate.from);
      setBody(randomTemplate.body);
    }
    setSelectedTemplateId(''); // Clear selection
  };

  // Submit email
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !from || !body) return;

    onSubmit({
      subject,
      from,
      body,
    });
  };

  const isFormValid = subject.trim() && from.trim() && body.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Generate Random Email Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleGenerateRandom}
          disabled={disabled || loading}
          className="
            px-8 py-3
            bg-gray-800 border-2 border-[#FFD700]
            text-white text-base font-semibold
            rounded-lg
            hover:bg-[#FFD700] hover:text-black
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all
            focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-gray-900
          "
        >
          Generate Random Email
        </button>
      </div>

      {/* Email Form Fields */}
      <div className="p-6 bg-gray-900 border-2 border-[#FFD700] rounded-lg space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">
          Email Details
        </h3>

        {/* Subject */}
        <div>
          <label htmlFor="subject-input" className="block text-sm font-medium text-gray-300 mb-2">
            Subject
          </label>
          <input
            id="subject-input"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Field Trip Permission Form - Please Sign"
            disabled={disabled || loading}
            className="
              w-full px-4 py-3
              bg-black border border-gray-600
              text-white text-sm
              rounded
              placeholder:text-gray-500
              focus:outline-none focus:border-[#FFD700]
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            required
          />
        </div>

        {/* From */}
        <div>
          <label htmlFor="from-input" className="block text-sm font-medium text-gray-300 mb-2">
            From
          </label>
          <input
            id="from-input"
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="e.g., Mrs. Johnson <teacher@school.edu>"
            disabled={disabled || loading}
            className="
              w-full px-4 py-3
              bg-black border border-gray-600
              text-white text-sm
              rounded
              placeholder:text-gray-500
              focus:outline-none focus:border-[#FFD700]
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            required
          />
        </div>

        {/* Body */}
        <div>
          <label htmlFor="body-input" className="block text-sm font-medium text-gray-300 mb-2">
            Body
          </label>
          <textarea
            id="body-input"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter email body text..."
            disabled={disabled || loading}
            rows={8}
            className="
              w-full px-4 py-3
              bg-black border border-gray-600
              text-white text-sm font-mono
              rounded
              placeholder:text-gray-500
              focus:outline-none focus:border-[#FFD700]
              disabled:opacity-50 disabled:cursor-not-allowed
              resize-y
            "
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || disabled || loading}
          className="
            w-full px-8 py-4
            bg-[#FFD700] text-black
            text-base font-semibold
            rounded-lg
            hover:bg-[#FFE34D]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            shadow-lg shadow-[#FFD700]/20 hover:shadow-[#FFD700]/40
            hover:scale-105
          "
        >
          {loading ? 'Processing...' : 'Analyze Email'}
        </button>
      </div>
    </form>
  );
}
