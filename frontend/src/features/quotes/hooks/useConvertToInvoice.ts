import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quoteKeys, invoiceKeys } from "@/lib/query-client";
import { convertToInvoice } from "../api";

export function useConvertToInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: convertToInvoice,
    onSuccess: (_, quoteId) => {
      queryClient.invalidateQueries({ queryKey: quoteKeys.detail(quoteId) });
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
    },
  });
}
