import { GlassCard, ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Heirloom',
  description: 'Privacy Policy for Heirloom recipe app. Learn how we protect your data and respect your privacy.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function HeirloomPrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.04}
          animated={true}
          colorTheme={watercolorThemes.terminalSubtle}
          charSet="default"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono text-terminal-gold tracking-widest mb-3">
            LEGAL
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Privacy Policy for Heirloom
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            <strong>Effective Date:</strong> December 23, 2025<br />
            <strong>Last Updated:</strong> December 23, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Introduction */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-4 text-terminal-gold">Introduction</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Welcome to Heirloom. We respect your privacy and are committed to protecting your personal information.
                This Privacy Policy explains how we collect, use, store, and protect your information when you use the
                Heirloom app ("App," "we," "us," or "our").
              </p>
              <p>
                By using Heirloom, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
          </GlassCard>

          {/* Information We Collect */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-6 text-terminal-gold">Information We Collect</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">1. Recipe Data You Create</h3>
                <p className="mb-3">When you use Heirloom, you create and store:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Recipe titles, instructions, and ingredient lists</li>
                  <li>Photos you add to recipes</li>
                  <li>Personal notes, comments, and modifications</li>
                  <li>Collections, tags, and organizational data</li>
                  <li>Cooking history and favorites</li>
                  <li>Dinner party planning information</li>
                </ul>
                <p className="mt-3 text-sm">
                  <strong>Storage:</strong> This data is stored locally on your device and, if you enable iCloud sync,
                  in your private iCloud account.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">2. Usage Information</h3>
                <p className="mb-3">We may collect limited, anonymized usage data to improve the App:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Feature usage statistics (which features are used most)</li>
                  <li>Error logs and crash reports</li>
                  <li>App performance metrics</li>
                </ul>
                <p className="mt-3 text-sm">
                  <strong>Important:</strong> This data is anonymous and cannot be used to identify you personally.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">3. Photos and Camera Access</h3>
                <p className="mb-3">If you grant camera permissions:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>We access your camera to scan cookbook pages or photograph food</li>
                  <li>Photos are processed locally on your device</li>
                  <li>We do not upload photos to our servers unless you explicitly share recipes with others</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">4. AI-Powered Features</h3>
                <p className="mb-3">When you use AI features (ingredient parsing, recipe enhancement):</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Recipe text is sent to Anthropic (Claude AI) for processing</li>
                  <li>This data is processed according to Anthropic's privacy policy</li>
                  <li>Anthropic does not train AI models on your data</li>
                  <li>We do not store AI requests beyond your device</li>
                </ul>
                <p className="mt-3 text-sm">
                  <strong>Your Control:</strong> You can disable AI features at any time in Settings → AI Features.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* How We Use Your Information */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-4 text-terminal-gold">How We Use Your Information</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <div>
                <p className="mb-3">We use your information solely to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide core app functionality (store and display your recipes)</li>
                  <li>Sync your recipes across your Apple devices via iCloud</li>
                  <li>Enable AI-powered recipe parsing and enhancement (if enabled)</li>
                  <li>Improve app performance and fix bugs</li>
                  <li>Respond to your support requests</li>
                </ul>
              </div>
              <div>
                <p className="mb-2 font-semibold text-white">We do NOT:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Sell your personal information to third parties</li>
                  <li>Use your data for advertising</li>
                  <li>Track your behavior across other apps or websites</li>
                  <li>Share your recipes without your explicit consent</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Data Storage and Security */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-6 text-terminal-gold">Data Storage and Security</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Local Storage</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All recipe data is stored locally on your device using Apple's secure SwiftData framework</li>
                  <li>Your device's operating system protects this data with encryption</li>
                  <li>We cannot access your locally stored data</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">iCloud Sync (Optional)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>If you enable iCloud sync, your recipes are stored in your private iCloud account</li>
                  <li>iCloud data is encrypted in transit and at rest</li>
                  <li>Apple controls iCloud security; we do not have access to your iCloud data</li>
                  <li>You can disable iCloud sync at any time in Settings</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Photos</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Recipe photos are stored locally on your device to save iCloud storage</li>
                  <li>Photos are NOT uploaded to our servers</li>
                  <li>Photos are only shared when you explicitly share a recipe</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">API Keys (Advanced Users)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>If you add your personal Anthropic API key, it is stored securely in your device's iOS Keychain</li>
                  <li>API keys are never transmitted to our servers</li>
                  <li>We cannot access your API key</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Recipe Sharing */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-6 text-terminal-gold">Recipe Sharing</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">iCloud Sharing</h3>
                <p className="mb-2">When you share a recipe via iCloud:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>The recipe is shared through Apple's CloudKit infrastructure</li>
                  <li>Recipients with the link can view and save the recipe</li>
                  <li>You control who has access by managing the share link</li>
                  <li>You can revoke sharing access at any time</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Pass Down Feature</h3>
                <p className="mb-2">When you "Pass Down" a recipe:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>The recipe is shared with attribution (recipe provenance)</li>
                  <li>Recipients can see the recipe's lineage (who passed it down)</li>
                  <li>This feature uses CloudKit and follows the same security as iCloud sharing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Export (Text/PDF)</h3>
                <p className="mb-2">When you export a recipe:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>The recipe is converted to text or PDF on your device</li>
                  <li>You control where the exported file is sent (Messages, Email, etc.)</li>
                  <li>We do not track or store exported recipes</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Third-Party Services */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-6 text-terminal-gold">Third-Party Services</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Anthropic (Claude AI)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Used for AI-powered ingredient parsing and recipe enhancement</li>
                  <li>Data sent: Recipe text only (when you use AI features)</li>
                  <li>Anthropic Privacy Policy: <a href="https://www.anthropic.com/privacy" className="text-terminal-gold hover:underline" target="_blank" rel="noopener noreferrer">https://www.anthropic.com/privacy</a></li>
                  <li>Anthropic does not use your data to train AI models</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Apple iCloud</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Used for optional recipe syncing across your devices</li>
                  <li>Apple Privacy Policy: <a href="https://www.apple.com/legal/privacy/" className="text-terminal-gold hover:underline" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/privacy/</a></li>
                  <li>We do not control Apple's data practices</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Recipe Import Sources</h3>
                <p className="mb-2">When you import recipes from websites:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>The App fetches recipe data directly from the source website</li>
                  <li>We do not track which websites you visit</li>
                  <li>Imported recipes are stored locally on your device</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Your Rights and Choices */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-6 text-terminal-gold">Your Rights and Choices</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">

              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Access Your Data</h3>
                <p>All your recipe data is accessible within the App at any time.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Delete Your Data</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Delete individual recipes: Swipe left on any recipe</li>
                  <li>Delete all data: Settings → Data Management → Clear All Data</li>
                  <li>Uninstalling the app removes all local data from your device</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Disable iCloud Sync</h3>
                <p>Settings → Cloud Storage → iCloud Sync → Toggle Off</p>
                <p className="text-sm mt-1">This removes your recipes from iCloud but keeps them on your device.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Disable AI Features</h3>
                <p>Settings → AI Features → Toggle off individual features</p>
                <p className="text-sm mt-1">This prevents any data from being sent to AI services.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Export Your Data</h3>
                <p>You can export individual recipes as text or PDF files at any time.</p>
              </div>
            </div>
          </GlassCard>

          {/* Children's Privacy */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-4 text-terminal-gold">Children's Privacy</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Heirloom is intended for general audiences. We do not knowingly collect personal information from
                children under 13. If you believe a child has provided us with personal information, please contact
                us, and we will delete it promptly.
              </p>
            </div>
          </GlassCard>

          {/* Data Retention */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-4 text-terminal-gold">Data Retention</h2>
            <div className="space-y-2 text-gray-300 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Local Data:</strong> Retained until you delete it or uninstall the app</li>
                <li><strong>iCloud Data:</strong> Retained until you delete it or disable iCloud sync</li>
                <li><strong>AI Processing:</strong> Data is not retained after processing (processed in real-time)</li>
                <li><strong>Usage Analytics:</strong> Anonymous data retained for 90 days for app improvement</li>
              </ul>
            </div>
          </GlassCard>

          {/* International Users */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-4 text-terminal-gold">International Users</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>Heirloom is designed for use worldwide. Your data may be processed in:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your local device (all countries)</li>
                <li>Apple's iCloud infrastructure (data centers globally)</li>
                <li>Anthropic's AI infrastructure (United States)</li>
              </ul>
              <p className="mt-4">
                If you are in the European Union, you have additional rights under GDPR (see "Your Rights" section).
              </p>
            </div>
          </GlassCard>

          {/* Changes to Privacy Policy */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-4 text-terminal-gold">Changes to This Privacy Policy</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>We may update this Privacy Policy from time to time. Changes will be posted:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Within the App (Settings → Privacy Policy)</li>
                <li>On our website: <a href="https://rationale.work" className="text-terminal-gold hover:underline">https://rationale.work</a></li>
              </ul>
              <p className="mt-4">
                Significant changes will be accompanied by a prominent notice in the App.
              </p>
            </div>
          </GlassCard>

          {/* Privacy Rights (GDPR & CCPA) */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-6 text-terminal-gold">Your Privacy Rights (GDPR & CCPA)</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">For EU Users (GDPR)</h3>
                <p className="mb-2">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access your personal data</li>
                  <li>Rectify inaccurate data</li>
                  <li>Erase your data ("right to be forgotten")</li>
                  <li>Restrict or object to data processing</li>
                  <li>Data portability (export your data)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">For California Users (CCPA)</h3>
                <p className="mb-2">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Know what personal information is collected</li>
                  <li>Know if personal information is sold (we do not sell data)</li>
                  <li>Opt-out of data sales (not applicable)</li>
                  <li>Delete your personal information</li>
                  <li>Non-discrimination for exercising your rights</li>
                </ul>
              </div>

              <p className="mt-4">
                To exercise these rights, contact us at <a href="mailto:privacy@rationale.work" className="text-terminal-gold hover:underline">privacy@rationale.work</a>.
              </p>
            </div>
          </GlassCard>

          {/* Contact Us */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-4 text-terminal-gold">Contact Us</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>If you have questions about this Privacy Policy or your data:</p>
              <ul className="space-y-2 mt-4">
                <li><strong>Email:</strong> <a href="mailto:privacy@rationale.work" className="text-terminal-gold hover:underline">privacy@rationale.work</a></li>
                <li><strong>App Support:</strong> Settings → Support → Contact Support</li>
                <li><strong>Website:</strong> <a href="https://rationale.work" className="text-terminal-gold hover:underline">https://rationale.work</a></li>
              </ul>
              <p className="mt-4">
                We will respond to privacy inquiries within 30 days.
              </p>
            </div>
          </GlassCard>

          {/* Legal Basis for Processing */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-4 text-terminal-gold">Legal Basis for Processing (GDPR)</h2>
            <div className="space-y-2 text-gray-300 leading-relaxed">
              <p>We process your data based on:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Consent:</strong> You choose to use the App and enable features</li>
                <li><strong>Contract Performance:</strong> Providing the App services you requested</li>
                <li><strong>Legitimate Interests:</strong> Improving the App and fixing bugs (anonymized data)</li>
              </ul>
            </div>
          </GlassCard>

          {/* Data Security Measures */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-4 text-terminal-gold">Data Security Measures</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>We implement industry-standard security practices:</p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>Local data encrypted by iOS</li>
                <li>iCloud data encrypted in transit (TLS) and at rest</li>
                <li>API keys stored in iOS Keychain (hardware-backed encryption)</li>
                <li>No servers means no server breaches</li>
                <li>Regular security reviews and updates</li>
              </ul>
            </div>
          </GlassCard>

          {/* Analytics and Tracking */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-6 text-terminal-gold">Analytics and Tracking</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">

              <div>
                <p className="mb-2 font-semibold text-white">We do NOT use:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Advertising trackers</li>
                  <li>Third-party analytics (e.g., Google Analytics, Facebook Pixel)</li>
                  <li>Cross-site tracking</li>
                  <li>Behavioral profiling</li>
                </ul>
              </div>

              <div>
                <p className="mb-2 font-semibold text-white">We may collect (optional, anonymized):</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Crash reports to fix bugs</li>
                  <li>Feature usage counts to prioritize development</li>
                  <li>This data cannot identify you personally</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Cookies */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-4 text-terminal-gold">Cookies and Similar Technologies</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Heirloom is a native iOS app and does not use cookies. If you access our website (if applicable),
                we may use cookies as described in our separate Website Privacy Policy.
              </p>
            </div>
          </GlassCard>

          {/* Your Consent */}
          <GlassCard className="p-6 md:p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-4 text-terminal-gold">Your Consent</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                By using Heirloom, you consent to this Privacy Policy. If you do not agree, please do not use the App.
              </p>
            </div>
          </GlassCard>

          {/* Summary */}
          <GlassCard className="p-6 md:p-8 bg-gradient-to-br from-terminal-gold/5 to-transparent" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold mb-4 text-terminal-gold">Summary (Plain English)</h2>
            <div className="space-y-2 text-gray-300 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>Your recipes stay on your device (and your iCloud if you enable it)</li>
                <li>We don't sell your data or show you ads</li>
                <li>AI features send recipe text to Anthropic (you can disable this)</li>
                <li>You can delete your data anytime</li>
                <li>We can't access your recipes—they're yours</li>
                <li>Recipe sharing is optional and controlled by you</li>
              </ul>
              <p className="mt-6 pt-4 border-t border-gray-700">
                Questions? Contact us at <a href="mailto:privacy@rationale.work" className="text-terminal-gold hover:underline">privacy@rationale.work</a>.
              </p>
            </div>
          </GlassCard>

          {/* Footer Note */}
          <div className="text-center text-sm text-gray-500 py-8">
            <p>This Privacy Policy was last updated on December 23, 2025.</p>
          </div>

        </div>
      </section>
    </main>
  );
}
