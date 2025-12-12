/**
 * Firebase Login Diagnostic Page
 *
 * This page helps diagnose why login works programmatically but fails in browser
 */

'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/layout/Container';

export default function LoginDebugPage() {
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Gather diagnostic information
    const envVars = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'MISSING',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'MISSING',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'MISSING',
    };

    const localStorageKeys = Object.keys(localStorage).filter(key =>
      key.includes('firebase') || key.includes('Firebase')
    );

    setDiagnostics({
      envVars,
      localStorageKeys,
      apiKeyPrefix: envVars.apiKey.substring(0, 10),
      apiKeyLength: envVars.apiKey.length,
      apiKeyType: typeof envVars.apiKey,
    });
  }, []);

  const clearFirebaseStorage = () => {
    // Clear all Firebase-related localStorage
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('firebase') || key.includes('Firebase'))) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
    setTestResult(`✅ Cleared ${keysToRemove.length} Firebase localStorage keys`);
  };

  const testFirebaseInit = async () => {
    setIsLoading(true);
    setTestResult('Testing Firebase initialization...');

    try {
      const { initializeApp, getApps } = await import('firebase/app');
      const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');

      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      };

      // Check if config is valid
      if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'undefined') {
        setTestResult('❌ Firebase API key is missing or undefined');
        setIsLoading(false);
        return;
      }

      // Initialize Firebase
      const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
      const auth = getAuth(app);

      setTestResult(`✅ Firebase initialized successfully\nProject: ${firebaseConfig.projectId}\nAuth Domain: ${firebaseConfig.authDomain}`);
    } catch (error: any) {
      setTestResult(`❌ Firebase initialization failed:\n${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setTestResult('Testing login...');

    try {
      const { initializeApp, getApps } = await import('firebase/app');
      const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');

      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      };

      const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
      const auth = getAuth(app);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setTestResult(`✅ Login successful!\nUID: ${userCredential.user.uid}\nEmail: ${userCredential.user.email}`);
    } catch (error: any) {
      setTestResult(`❌ Login failed:\n${error.code}\n${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-terminal-gold mb-8">Firebase Login Diagnostics</h1>

          {/* Diagnostic Information */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            {diagnostics && (
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {JSON.stringify(diagnostics.envVars, null, 2)}
              </pre>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Browser State</h2>
            {diagnostics && (
              <>
                <p className="text-gray-300 mb-2">
                  <strong>API Key Type:</strong> {diagnostics.apiKeyType}
                </p>
                <p className="text-gray-300 mb-2">
                  <strong>API Key Length:</strong> {diagnostics.apiKeyLength}
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>API Key Prefix:</strong> {diagnostics.apiKeyPrefix}
                </p>
                <p className="text-gray-300 mb-2">
                  <strong>LocalStorage Firebase Keys:</strong> {diagnostics.localStorageKeys.length}
                </p>
                {diagnostics.localStorageKeys.length > 0 && (
                  <ul className="text-sm text-gray-400 ml-4">
                    {diagnostics.localStorageKeys.map((key: string) => (
                      <li key={key}>• {key}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>

          {/* Actions */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="space-y-4">
              <button
                onClick={clearFirebaseStorage}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                Clear Firebase LocalStorage (Fix Stale Auth State)
              </button>

              <button
                onClick={testFirebaseInit}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                Test Firebase Initialization
              </button>

              <button
                onClick={() => testLogin('athletesfirst@rationale.design', 'halloffame')}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                Test Athletes First Login
              </button>

              <button
                onClick={() => testLogin('creait@rationale.design', 'realestate')}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                Test Creait Login
              </button>
            </div>
          </div>

          {/* Test Results */}
          {testResult && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Test Result</h2>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">{testResult}</pre>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-6 text-center">
            <a
              href="/clients/login"
              className="text-terminal-gold hover:text-terminal-gold/80 transition-colors"
            >
              ← Back to Login
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
