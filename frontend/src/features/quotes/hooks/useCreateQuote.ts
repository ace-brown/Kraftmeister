import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quoteKeys } from "@/lib/query-client";
import { createQuote } from "../api";

export function useCreateQuote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quoteKeys.all });
    },
  });
}
