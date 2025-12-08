import { NextRequest, NextResponse } from 'next/server';
import { getClientById, getClientByUsername } from '@/lib/clients-config';

// Force dynamic rendering (don't prerender at build time)
export const dynamic = 'force-dynamic';

// Username + Password verification endpoint
// Verifies both username and password match for the client

interface VerifyRequest {
  username: string;
  password: string;
}

// Hash password using SHA-256 (matches client-side hashing)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Generate proper password hashes for storage
const PASSWORD_HASHES: Record<string, string> = {
  'athletes-first': '', // Will be computed from "HallOfFame"
  'creait': '', // Will be computed from "[TBD]"
};

// Initialize hashes on first call
let hashesInitialized = false;

async function initializeHashes() {
  if (hashesInitialized) return;

  PASSWORD_HASHES['athletes-first'] = await hashPassword('HallOfFame');
  PASSWORD_HASHES['creait'] = await hashPassword('Berkley'); // Placeholder - update as needed

  hashesInitialized = true;
}

export async function POST(request: NextRequest) {
  try {
    // Initialize password hashes
    await initializeHashes();

    const body: VerifyRequest = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Missing username or password' },
        { status: 400 }
      );
    }

    // Find client by username
    const client = getClientByUsername(username);
    if (!client) {
      return NextResponse.json(
        { error: 'Invalid credentials' }, // Generic error to prevent username enumeration
        { status: 401 }
      );
    }

    // Verify password
    const passwordHash = await hashPassword(password);
    const isValid = passwordHash === PASSWORD_HASHES[client.id];

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        {
          status: 401,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }

    // Success - return client info with no-cache headers
    return NextResponse.json(
      {
        success: true,
        client: {
          id: client.id,
          name: client.name,
          username: client.username,
          status: client.status
        }
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error) {
    console.error('Client verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Method not allowed for GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
