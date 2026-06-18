import { apiClient } from '@/lib/api/client';
import { AgentResponse } from '../types/ai.types';

/** Sends a natural-language question to the ReAct agent and returns the answer. */
export async function askAgent(message: string): Promise<AgentResponse> {
  return apiClient<AgentResponse>('/ai/agent', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}
