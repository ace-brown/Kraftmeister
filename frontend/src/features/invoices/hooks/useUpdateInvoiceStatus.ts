import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoiceKeys } from "@/lib/query-client";
import { updateInvoiceStatus } from "../api";

export function useUpdateInvoiceStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInvoiceStatus,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
      queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(variables.id) });
    },
  });
}
