import { useMutation } from '@tanstack/react-query';
import { askAgent } from '../api/askAgent';

/** Mutation hook that sends a question to the ReAct agent and returns the natural-language answer. */
export function useAskAgent() {
  return useMutation({
    mutationFn: (message: string) => askAgent(message),
  });
}
