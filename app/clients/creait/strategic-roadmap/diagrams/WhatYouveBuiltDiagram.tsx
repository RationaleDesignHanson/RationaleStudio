import React from 'react';

interface WhatYouveBuiltDiagramProps {
  className?: string;
}

const WhatYouveBuiltDiagram: React.FC<WhatYouveBuiltDiagramProps> = ({ className = '' }) => {
  const components = [
    {
      name: 'API Layer',
      status: 'complete',
      items: [
        { label: '/app/api/campaigns.py', detail: '22KB, 200+ lines' },
        { label: '/app/api/templates.py', detail: '16KB' },
        { label: '/app/api/contacts.py', detail: '12KB' },
        { label: '12 namespaces, 40+ endpoints total', detail: '' }
      ]
    },
    {
      name: 'Email System',
      status: 'complete',
      items: [
        { label: '/app/services/sendgrid_client.py', detail: '9KB' },
        { label: '/app/tasks/campaign_tasks.py', detail: '' },
        { label: 'SendGrid integration working', detail: '' }
      ]
    },
    {
      name: 'Infrastructure',
      status: 'complete',
      items: [
        { label: '/kubernetes/manifests/', detail: '7 files' },
        { label: '/terraform/', detail: 'IaC complete' },
        { label: 'CI/CD', detail: 'GitHub Actions' }
      ]
    },
    {
      name: 'Database',
      status: 'complete',
      items: [
        { label: '17 tables with migrations', detail: '' },
        { label: 'Row-Level Security (RLS)', detail: '' },
        { label: 'Supabase', detail: 'PostgreSQL' }
      ]
    },
    {
      name: 'Authentication',
      status: 'complete',
      items: [
        { label: 'JWT + RBAC working', detail: '' }
      ]
    },
    {
      name: 'Background Tasks',
      status: 'complete',
      items: [
        { label: 'Celery + Redis operational', detail: '' }
      ]
    }
  ];

  return (
    <div className={`bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700 p-8 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">What You've Built</h2>
        <p className="text-lg text-gray-400">Production-ready foundation worth $94K of development value</p>
      </div>

      {/* Architecture Tree */}
      <div className="space-y-6">
        {components.map((component, idx) => (
          <div key={idx} className="border-l-4 border-emerald-500 pl-6">
            {/* Component Header */}
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{component.name}</h3>
              <span className="ml-3 px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-sm font-semibold rounded-full">
                Complete
              </span>
            </div>

            {/* Component Items */}
            <div className="ml-9 space-y-2">
              {component.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="font-mono text-sm text-gray-300">{item.label}</span>
                    {item.detail && (
                      <span className="ml-2 text-sm text-gray-500">({item.detail})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-8 pt-6 border-t-2 border-gray-700">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">$94K</div>
            <div className="text-sm text-gray-400 mt-1">Built Value</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">10,071</div>
            <div className="text-sm text-gray-400 mt-1">Lines of Python</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">80%</div>
            <div className="text-sm text-gray-400 mt-1">Backend Complete</div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg">
          <p className="text-center text-emerald-300 font-semibold">
            Strong Foundation: Production-grade infrastructure, API, and email system ready to scale
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatYouveBuiltDiagram;
