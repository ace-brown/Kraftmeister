import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quoteKeys } from "@/lib/query-client";
import { updateQuote } from "../api";

export function useUpdateQuote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuote,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: quoteKeys.all });
      queryClient.invalidateQueries({ queryKey: quoteKeys.detail(variables.id) });
    },
  });
}
