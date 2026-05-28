import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "../api";
import { customerKeys } from "@/lib/query-client";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
    },
  });
}
