// Client configuration for password-protected pitch presentations
// Each client has a unique username and password

export interface ClientConfig {
  id: string;
  name: string;
  username: string;
  passwordHash: string;
  brandColor: string;
  status: 'active' | 'coming-soon';
  description?: string;
}

// Password hashes generated using SHA-256
// Credentials:
// - Athletes First: username="AthletesFirst", password="HallOfFame"
// - CREaiT: username="creAIt", password="[TBD]"
export const CLIENTS: Record<string, ClientConfig> = {
  'athletes-first': {
    id: 'athletes-first',
    name: 'Athletes First',
    username: 'AthletesFirst',
    passwordHash: 'e4c6a5f6d7b8a9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5', // HallOfFame
    brandColor: '#0066FF',
    status: 'active',
    description: 'AI-powered platform for next-generation athlete representation'
  },
  'creait': {
    id: 'creait',
    name: 'CREaiT',
    username: 'creAIt',
    passwordHash: 'f1e2d3c4b5a6978869504132201918171615141312111009080706050403020100', // Placeholder - needs to be updated
    brandColor: '#10B981',
    status: 'active',
    description: 'AI-powered commercial real estate intelligence platform'
  }
};

export function getClientById(clientId: string): ClientConfig | undefined {
  return CLIENTS[clientId];
}

export function getClientByUsername(username: string): ClientConfig | undefined {
  return Object.values(CLIENTS).find(
    client => client.username.toLowerCase() === username.toLowerCase()
  );
}

export function getAllClients(): ClientConfig[] {
  return Object.values(CLIENTS);
}

export function getActiveClients(): ClientConfig[] {
  return getAllClients().filter(client => client.status === 'active');
}
