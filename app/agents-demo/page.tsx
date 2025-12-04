'use client';

import { useState } from 'react';
import { OS8Window } from '@/components/visual-test';

interface AgentResponse {
  success: boolean;
  data?: unknown;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  reasoning?: string;
  suggestions?: string[];
  nextSteps?: string[];
}

export default function AgentsDemoPage() {
  const [selectedAgent, setSelectedAgent] = useState('vc-investor');
  const [selectedAction, setSelectedAction] = useState('review');
  const [payload, setPayload] = useState('{ "type": "full" }');
  const [response, setResponse] = useState<AgentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const agents = [
    {
      id: 'architect',
      name: 'Systems Architect',
      actions: ['review', 'review-api', 'generate-diagram', 'recommend-stack']
    },
    {
      id: 'ux-expert',
      name: 'UX Design Expert',
      actions: ['audit', 'analyze-flow', 'review-accessibility']
    },
    {
      id: 'vc-investor',
      name: 'VC Investor',
      actions: ['review', 'assess-market-fit', 'evaluate-narrative']
    },
    {
      id: 'marketing',
      name: 'Marketing Agent',
      actions: ['create-social-post', 'generate-copy', 'suggest-campaign']
    },
    {
      id: 'design-system',
      name: 'Design System',
      actions: ['audit', 'generate-tokens', 'check-consistency']
    },
    {
      id: 'brand-director',
      name: 'Brand Director',
      actions: ['review', 'generate-worlds', 'apply-world']
    },
    {
      id: 'prospective-client',
      name: 'Prospective Client',
      actions: ['full-feedback', 'share-references', 'raise-objections']
    }
  ];

  const handleInvoke = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const parsedPayload = payload ? JSON.parse(payload) : {};

      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent: selectedAgent,
          action: selectedAction,
          payload: parsedPayload
        })
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({
        success: false,
        error: {
          code: 'CLIENT_ERROR',
          message: error instanceof Error ? error.message : 'An error occurred',
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Agent System Demo</h1>
          <p className="text-gray-400">
            Test the multi-agent system with different agents and actions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Input Panel */}
          <OS8Window title="Configure Agent Request" variant="default">
            <div className="space-y-4">
              {/* Agent Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-100 mb-2">
                  Select Agent
                </label>
                <select
                  value={selectedAgent}
                  onChange={(e) => {
                    setSelectedAgent(e.target.value);
                    const agent = agents.find(a => a.id === e.target.value);
                    if (agent && agent.actions.length > 0) {
                      setSelectedAction(agent.actions[0]);
                    }
                  }}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 rounded"
                >
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-100 mb-2">
                  Select Action
                </label>
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 rounded"
                >
                  {agents
                    .find((a) => a.id === selectedAgent)
                    ?.actions.map((action) => (
                      <option key={action} value={action}>
                        {action}
                      </option>
                    ))}
                </select>
              </div>

              {/* Payload Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-100 mb-2">
                  Payload (JSON)
                </label>
                <textarea
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 rounded font-mono text-sm"
                  rows={5}
                  placeholder='{ "type": "full" }'
                />
              </div>

              {/* Invoke Button */}
              <button
                onClick={handleInvoke}
                disabled={loading}
                className="w-full bg-[#FFD700] hover:bg-[#FFE34D] disabled:bg-gray-600 text-black font-semibold px-6 py-3 transition-colors"
              >
                {loading ? 'Invoking...' : 'Invoke Agent'}
              </button>
            </div>
          </OS8Window>

          {/* Examples Panel */}
          <OS8Window title="Quick Examples" variant="subtle">
            <div className="space-y-3">
              <button
                onClick={() => {
                  setSelectedAgent('vc-investor');
                  setSelectedAction('review');
                  setPayload('{ "type": "full" }');
                }}
                className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded text-sm transition-colors"
              >
                <div className="font-semibold text-gray-100">VC Investor Review</div>
                <div className="text-xs text-gray-400">Full site review from investor perspective</div>
              </button>

              <button
                onClick={() => {
                  setSelectedAgent('brand-director');
                  setSelectedAction('generate-worlds');
                  setPayload('{}');
                }}
                className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded text-sm transition-colors"
              >
                <div className="font-semibold text-gray-100">Generate Brand Worlds</div>
                <div className="text-xs text-gray-400">Create brand universe options</div>
              </button>

              <button
                onClick={() => {
                  setSelectedAgent('prospective-client');
                  setSelectedAction('full-feedback');
                  setPayload('{ "persona": "startup-sarah" }');
                }}
                className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded text-sm transition-colors"
              >
                <div className="font-semibold text-gray-100">Client Feedback</div>
                <div className="text-xs text-gray-400">Simulated Series A founder perspective</div>
              </button>

              <button
                onClick={() => {
                  setSelectedAgent('architect');
                  setSelectedAction('review');
                  setPayload('{ "type": "full", "projectName": "rationale-site" }');
                }}
                className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded text-sm transition-colors"
              >
                <div className="font-semibold text-gray-100">Architecture Review</div>
                <div className="text-xs text-gray-400">Full systems architecture analysis</div>
              </button>
            </div>
          </OS8Window>
        </div>

        {/* Response Panel */}
        {response && (
          <OS8Window
            title={response.success ? "Agent Response" : "Error Response"}
            variant={response.success ? "featured" : "body"}
          >
            <div className="space-y-4">
              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-100">Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  response.success
                    ? 'bg-green-900 text-green-300'
                    : 'bg-red-900 text-red-300'
                }`}>
                  {response.success ? 'SUCCESS' : 'ERROR'}
                </span>
              </div>

              {/* Error Details */}
              {response.error && (
                <div className="bg-red-900/20 border border-red-800 p-4 rounded">
                  <div className="font-semibold text-red-300 mb-1">{response.error.code}</div>
                  <div className="text-sm text-red-200">{response.error.message}</div>
                </div>
              )}

              {/* Reasoning */}
              {response.reasoning && (
                <div>
                  <div className="text-sm font-semibold text-[#FFD700] mb-2">Reasoning:</div>
                  <div className="text-sm text-gray-100 whitespace-pre-wrap">{response.reasoning}</div>
                </div>
              )}

              {/* Suggestions */}
              {response.suggestions && response.suggestions.length > 0 && (
                <div>
                  <div className="text-sm font-semibold text-[#FFD700] mb-2">Suggestions:</div>
                  <ul className="space-y-1">
                    {response.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-sm text-gray-100 flex gap-2">
                        <span className="text-[#FFD700]">→</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Steps */}
              {response.nextSteps && response.nextSteps.length > 0 && (
                <div>
                  <div className="text-sm font-semibold text-[#FFD700] mb-2">Next Steps:</div>
                  <ol className="space-y-1">
                    {response.nextSteps.map((step, i) => (
                      <li key={i} className="text-sm text-gray-100 flex gap-2">
                        <span className="text-[#FFD700]">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Raw Data */}
              <div className="border-t border-gray-700 pt-4">
                <div className="text-sm font-semibold text-gray-100 mb-2">Raw Response:</div>
                <pre className="bg-gray-800 p-4 rounded text-xs text-gray-300 overflow-auto max-h-96">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            </div>
          </OS8Window>
        )}
      </div>
    </main>
  );
}
