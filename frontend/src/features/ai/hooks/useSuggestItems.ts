import { useMutation } from "@tanstack/react-query";
import { suggestItems } from "../api/suggestItems";

/** Mutation hook that calls the AI service to suggest invoice line items from a job description. */
export function useSuggestItems() {
  return useMutation({ mutationFn: suggestItems });
}
