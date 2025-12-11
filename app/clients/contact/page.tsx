/**
 * Contact Page - Window Shrine Design
 *
 * Contact form with validation, recovery, and success states.
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 */

'use client';

import { useState, useEffect } from 'react';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { contactContent } from '@/lib/content';
import { useFormRecovery } from '@/hooks/useFormRecovery';
import { FormRecoveryModal } from '@/components/conversion/FormRecoveryModal';
import { ButtonPrimary } from '@/components/ui';

interface FieldError {
  [key: string]: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Form recovery hook
  const formRecovery = useFormRecovery({ formId: 'contact-form' });

  // Auto-save form data as user types
  useEffect(() => {
    const hasData = Object.values(formData).some(value => value.trim() !== '');
    if (hasData && status === 'idle') {
      formRecovery.saveFormData(formData);
    }
  }, [formData, status]);

  // Handle form restoration
  const handleRestoreForm = (data: Record<string, any>) => {
    setFormData(data as typeof formData);
  };

  const handleRejectRestore = () => {
    formRecovery.rejectFormData();
  };

  // Validation functions
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';

      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';

      case 'projectType':
        if (!value || value === '') return 'Please select a project type';
        return '';

      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.length > 1000) return 'Message must be less than 1000 characters';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change if field has been touched
    if (touchedFields.has(name)) {
      const error = validateField(name, value);
      setFieldErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Mark field as touched
    setTouchedFields(prev => new Set(prev).add(name));

    // Validate on blur
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const errors: FieldError = {};
    const requiredFields = ['name', 'email', 'projectType', 'message'];

    requiredFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      const error = validateField(field, value);
      if (error) {
        errors[field] = error;
      }
    });

    // Mark all required fields as touched
    setTouchedFields(new Set(requiredFields));

    // If there are validation errors, don't submit
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage('Please fix the errors above before submitting');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          message: '',
        });
        setFieldErrors({});
        setTouchedFields(new Set());
        formRecovery.clearSavedFormData();
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <>
      {/* Form Recovery Modal */}
      <FormRecoveryModal
        formId="contact-form"
        onRestore={handleRestoreForm}
        onReject={handleRejectRestore}
        getSavedData={() => formRecovery.getSavedFormData()?.data || null}
      />

      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        {/* Hero */}
        <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.08}
              animated={true}
              colorTheme={watercolorThemes.terminalGold}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <p className="text-xs sm:text-sm font-mono text-terminal-gold tracking-widest mb-4 text-center animate-fade-in-up">
              {contactContent.hero.subtitle}
            </p>

            <h1 className="text-2xl md:text-3xl lg:text-4xl sm:text-5xl md:text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center animate-fade-in-up delay-100">
              {contactContent.hero.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-center mb-8 animate-fade-in-up delay-200">
              {contactContent.hero.description}
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <OS8Window
              title="Get in Touch"
              variant="featured"
              animateIn={false}
            >
              {/* Trust Signals */}
              {status !== 'success' && (
                <div className="mb-8 pb-6 border-b border-terminal-gold/20">
                  <div className="grid md:grid-cols-3 gap-4 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <svg className="w-5 h-5 text-terminal-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium text-white">24-hour response</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <svg className="w-5 h-5 text-terminal-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium text-white">Secure & private</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <svg className="w-5 h-5 text-terminal-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium text-white">No spam, ever</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {status === 'success' ? (
                <div className="text-center py-12" role="status" aria-live="polite">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-300 mb-8">{contactContent.form.successMessage}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-terminal-gold hover:underline"
                    aria-label="Send another message"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {contactContent.form.fields.map((field) => {
                    const fieldName = field.name;
                    const hasError = touchedFields.has(fieldName) && fieldErrors[fieldName];
                    const isValid = touchedFields.has(fieldName) && !fieldErrors[fieldName] && formData[fieldName as keyof typeof formData];

                    return (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-white mb-2"
                        >
                          {field.label}
                          {field.required && <span className="text-terminal-gold ml-1" aria-label="required">*</span>}
                        </label>

                        {field.type === 'textarea' ? (
                          <>
                            <div className="relative">
                              <textarea
                                id={field.name}
                                name={field.name}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required={field.required}
                                placeholder={field.placeholder}
                                rows={field.rows || 4}
                                maxLength={1000}
                                className={`w-full px-4 py-3 rounded-md border bg-black/60 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                                  hasError
                                    ? 'border-red-500 focus:ring-red-500'
                                    : isValid
                                      ? 'border-green-500 focus:ring-[#FFD700]'
                                      : 'border-terminal-gold/30 focus:ring-[#FFD700]'
                                }`}
                                aria-invalid={hasError ? 'true' : 'false'}
                                aria-describedby={hasError ? `${field.name}-error` : `${field.name}-help`}
                              />
                              {isValid && (
                                <div className="absolute top-3 right-3 text-green-400" aria-hidden="true">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="mt-1 flex justify-between items-center">
                              <div>
                                {hasError && (
                                  <p id={`${field.name}-error`} className="text-sm text-red-400" role="alert">
                                    {fieldErrors[fieldName]}
                                  </p>
                                )}
                              </div>
                              <p id={`${field.name}-help`} className="text-xs text-gray-400">
                                {formData.message.length}/1000
                              </p>
                            </div>
                          </>
                        ) : field.type === 'select' ? (
                          <>
                            <div className="relative">
                              <select
                                id={field.name}
                                name={field.name}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required={field.required}
                                className={`w-full px-4 py-3 rounded-md border bg-black/60 text-white focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                                  hasError
                                    ? 'border-red-500 focus:ring-red-500'
                                    : isValid
                                      ? 'border-green-500 focus:ring-[#FFD700]'
                                      : 'border-terminal-gold/30 focus:ring-[#FFD700]'
                                }`}
                                aria-invalid={hasError ? 'true' : 'false'}
                                aria-describedby={hasError ? `${field.name}-error` : undefined}
                              >
                                {field.options?.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              {isValid && (
                                <div className="absolute top-3 right-10 text-green-400" aria-hidden="true">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            {hasError && (
                              <p id={`${field.name}-error`} className="mt-1 text-sm text-red-400" role="alert">
                                {fieldErrors[fieldName]}
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <div className="relative">
                              <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required={field.required}
                                placeholder={field.placeholder}
                                className={`w-full px-4 py-3 rounded-md border bg-black/60 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                                  hasError
                                    ? 'border-red-500 focus:ring-red-500'
                                    : isValid
                                      ? 'border-green-500 focus:ring-[#FFD700]'
                                      : 'border-terminal-gold/30 focus:ring-[#FFD700]'
                                }`}
                                aria-invalid={hasError ? 'true' : 'false'}
                                aria-describedby={hasError ? `${field.name}-error` : undefined}
                              />
                              {isValid && (
                                <div className="absolute top-3 right-3 text-green-400" aria-hidden="true">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            {hasError && (
                              <p id={`${field.name}-error`} className="mt-1 text-sm text-red-400" role="alert">
                                {fieldErrors[fieldName]}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}

                  {status === 'error' && (
                    <div className="p-4 rounded-md bg-red-500/20 border border-red-500/30" role="alert" aria-live="assertive">
                      <p className="text-sm text-red-400">
                        {errorMessage || contactContent.form.errorMessage}
                      </p>
                    </div>
                  )}

                  <ButtonPrimary
                    type="submit"
                    fullWidth
                    size="md"
                    {...(status === 'submitting' && { disabled: true })}
                  >
                    {status === 'submitting' ? 'Sending...' : contactContent.form.submitText}
                  </ButtonPrimary>
                </form>
              )}
            </OS8Window>

            {/* Contact Info */}
            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-4">or email us directly at</p>
              <a
                href={`mailto:${contactContent.contact.email}`}
                className="text-xl font-medium text-terminal-gold hover:underline"
              >
                {contactContent.contact.email}
              </a>

              {contactContent.contact.social && contactContent.contact.social.length > 0 && (
                <div className="mt-8 flex justify-center gap-6">
                  {contactContent.contact.social.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-terminal-gold transition-colors"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
