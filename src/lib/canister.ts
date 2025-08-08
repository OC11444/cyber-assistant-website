import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../../declarations/log_canister';
import { LOG_CANISTER_ID } from './config';

const agent = new HttpAgent({
  host: import.meta.env.VITE_IC_HOST || 'http://localhost:8000',
});

async function initAgent() {
  if (import.meta.env.MODE !== 'production') {
    try {
      await agent.fetchRootKey();
      console.log('Root key fetched successfully.');
    } catch {
      console.warn('Unable to fetch root key. Running in production?');
    }
  }
}

// Initialize agent on module load (can also export this and await it from React component)
const agentReadyPromise = initAgent();

export const canisterActor = Actor.createActor(idlFactory, {
  agent,
  canisterId: LOG_CANISTER_ID,
});

export async function fetchLogs() {
  try {
    // Wait for the agent to be ready before calling canister
    await agentReadyPromise;
    
    const logs = await canisterActor.get_logs();
    console.log('fetchLogs: received logs from canister:', logs);
    return logs;
  } catch (error) {
    console.error('Failed to fetch logs:', error);
    return [];
  }
}

export async function sendLogMessage(message: string) {
  try {
    await agentReadyPromise;
    const result = await canisterActor.log(message);
    console.log('sendLogMessage result:', result);
    return result;
  } catch (error) {
    console.error('Failed to send log message:', error);
    throw error;
  }
}
