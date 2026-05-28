"use client";

import { useQuery } from "@tanstack/react-query";
import { customerKeys } from "@/lib/query-client";
import { getCustomers } from "../api";

export function useCustomers(search?: string) {
  return useQuery({
    queryKey: customerKeys.list(search),
    queryFn: () => getCustomers(search),
  });
}
