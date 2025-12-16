'use client';

import { useState } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { H3, BodyMD, LabelSM } from '@/components/creait/typography';

type ToneVariant = 'business' | 'formal' | 'friendly';

interface EmailDraft {
  tone: ToneVariant;
  label: string;
  subject: string;
  body: string;
  color: string;
}

const EMAIL_DRAFTS: EmailDraft[] = [
  {
    tone: 'business',
    label: 'Business-Friendly',
    subject: 'Gateway Office Tower - Upcoming Lease Expiry & Market Opportunity',
    body: `Hi David,

I hope this finds you well. I wanted to reach out regarding the Gateway Office Tower lease expiry coming up in Q2.

Given the current SF office market dynamics and your debt maturity timeline, this could be an opportune moment to explore strategic options for the property.

I've been tracking comparable sales in the Financial District and see some interesting trends that might be relevant to your situation. Would you be open to a brief conversation about the current market landscape?

I have availability next Tuesday or Thursday afternoon if that works for your schedule.

Best regards,
[Your Name]`,
    color: CRE_COLORS.primary,
  },
  {
    tone: 'formal',
    label: 'Formal',
    subject: 'Strategic Discussion: Gateway Office Tower Portfolio Review',
    body: `Dear Mr. Chen,

I am writing to request a meeting to discuss strategic alternatives for the Gateway Office Tower property at 123 Market Street, San Francisco.

Our analysis indicates that the concurrent timing of your lease expiry (Q2 2025) and debt maturity (Q4 2025) presents a unique opportunity to maximize asset value in the current market cycle.

Key considerations for discussion:
• Current capitalization rates for Class A office assets
• Recent comparable transactions in the Financial District submarket
• Refinancing vs. disposition strategies
• Tenant rollover risk mitigation

I would appreciate the opportunity to present our market insights and discuss potential pathways forward. Please let me know your availability for a 30-minute meeting at your convenience.

Respectfully,
[Your Name]
[Title]
[Brokerage]`,
    color: CRE_COLORS.secondary,
  },
  {
    tone: 'friendly',
    label: 'Friendly',
    subject: 'Quick question about Gateway Office Tower',
    body: `Hey David!

Hope you're doing great! I noticed that Gateway Office Tower has a big lease expiry coming up this spring, and I thought it might be helpful to chat about what's happening in the SF office market right now.

I've been working with a few similar properties in the Financial District lately, and I've seen some really interesting activity that might be relevant to your situation. Plus, with your debt maturity coming up later this year, it could be a good time to think through your options.

No pressure at all – just wanted to see if you'd be up for grabbing coffee or jumping on a quick call? I'd love to share what I'm seeing and get your thoughts.

Let me know what works for you!

Cheers,
[Your Name]

P.S. – If you're swamped right now, totally understand. Just ping me whenever you have a free moment!`,
    color: CRE_COLORS.accent,
  },
];

/**
 * EmailDraftsDemo - AI-generated email examples with tone variants
 *
 * Shows CREaiT's AI email generation with:
 * - 3 tone variants (Business-Friendly, Formal, Friendly)
 * - Context-aware content
 * - Editable drafts
 * - Copy-to-clipboard functionality
 */
export default function EmailDraftsDemo() {
  const [selectedTone, setSelectedTone] = useState<ToneVariant>('business');
  const [copied, setCopied] = useState(false);

  const currentDraft = EMAIL_DRAFTS.find((draft) => draft.tone === selectedTone)!;

  const handleCopy = () => {
    const emailText = `Subject: ${currentDraft.subject}\n\n${currentDraft.body}`;
    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Tone Selector */}
      <div>
        <LabelSM color={CRE_COLORS.text.muted} className="mb-3">
          SELECT TONE
        </LabelSM>
        <div className="flex gap-3">
          {EMAIL_DRAFTS.map((draft) => (
            <button
              key={draft.tone}
              onClick={() => setSelectedTone(draft.tone)}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                selectedTone === draft.tone
                  ? 'ring-2 shadow-lg'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              style={{
                backgroundColor:
                  selectedTone === draft.tone ? `${draft.color}20` : undefined,
                borderColor: selectedTone === draft.tone ? draft.color : undefined,
                color: selectedTone === draft.tone ? draft.color : 'rgba(255, 255, 255, 0.6)',
              }}
            >
              {draft.label}
            </button>
          ))}
        </div>
      </div>

      {/* Email Preview */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        {/* Email Header */}
        <div className="mb-6 pb-4 border-b border-white/10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <LabelSM color={CRE_COLORS.text.muted}>TO:</LabelSM>
              <BodyMD className="mt-1">David Chen (david.chen@pacificregroup.com)</BodyMD>
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <span>✓</span>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <span>📋</span>
                  <span>Copy Draft</span>
                </>
              )}
            </button>
          </div>

          <div className="mb-3">
            <LabelSM color={CRE_COLORS.text.muted}>FROM:</LabelSM>
            <BodyMD className="mt-1">[Your Name] (you@yourbrokerage.com)</BodyMD>
          </div>

          <div>
            <LabelSM color={CRE_COLORS.text.muted}>SUBJECT:</LabelSM>
            <H3 className="mt-1 text-lg">{currentDraft.subject}</H3>
          </div>
        </div>

        {/* Email Body */}
        <div
          className="p-4 rounded-lg bg-slate-900/50 font-sans whitespace-pre-wrap"
          style={{ minHeight: '300px' }}
        >
          <BodyMD color={CRE_COLORS.text.primary}>{currentDraft.body}</BodyMD>
        </div>

        {/* Context Footer */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
            <span className="text-2xl">🤖</span>
            <div className="flex-1">
              <LabelSM color={CRE_COLORS.primary}>AI-GENERATED CONTEXT</LabelSM>
              <BodyMD color={CRE_COLORS.text.secondary} className="text-sm mt-1">
                This email was automatically generated based on:
              </BodyMD>
              <ul className="mt-2 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-sky-400">•</span>
                  <BodyMD color={CRE_COLORS.text.secondary} className="text-sm">
                    <strong>Timing signals:</strong> Lease expiry Q2 2025, Debt maturity Q4 2025
                  </BodyMD>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400">•</span>
                  <BodyMD color={CRE_COLORS.text.secondary} className="text-sm">
                    <strong>Property data:</strong> Gateway Office Tower, Class A Office, SF
                    Financial District
                  </BodyMD>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400">•</span>
                  <BodyMD color={CRE_COLORS.text.secondary} className="text-sm">
                    <strong>Your history:</strong> No previous contact with David Chen
                  </BodyMD>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tone Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: EMAIL_DRAFTS[0].color }}
            />
            <LabelSM style={{ color: EMAIL_DRAFTS[0].color }}>
              {EMAIL_DRAFTS[0].label}
            </LabelSM>
          </div>
          <BodyMD color={CRE_COLORS.text.muted} className="text-xs">
            Professional but approachable. Best for warm leads or existing relationships.
          </BodyMD>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: EMAIL_DRAFTS[1].color }}
            />
            <LabelSM style={{ color: EMAIL_DRAFTS[1].color }}>
              {EMAIL_DRAFTS[1].label}
            </LabelSM>
          </div>
          <BodyMD color={CRE_COLORS.text.muted} className="text-xs">
            Corporate and polished. Ideal for C-suite executives and institutional owners.
          </BodyMD>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: EMAIL_DRAFTS[2].color }}
            />
            <LabelSM style={{ color: EMAIL_DRAFTS[2].color }}>
              {EMAIL_DRAFTS[2].label}
            </LabelSM>
          </div>
          <BodyMD color={CRE_COLORS.text.muted} className="text-xs">
            Casual and conversational. Works for peers and referrals from mutual contacts.
          </BodyMD>
        </div>
      </div>
    </div>
  );
}
