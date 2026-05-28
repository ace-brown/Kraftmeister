"use client";

import { useQuery } from "@tanstack/react-query";
import { customerKeys } from "@/lib/query-client";
import { getCustomer } from "../api";

export function useCustomer(id: string) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => getCustomer(id),
  });
}
