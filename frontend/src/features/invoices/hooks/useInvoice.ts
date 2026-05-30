"use client";

import { useQuery } from "@tanstack/react-query";
import { invoiceKeys } from "@/lib/query-client";
import { getInvoice } from "../api";

export function useInvoice(id: string) {
  return useQuery({
    queryKey: invoiceKeys.detail(id),
    queryFn: () => getInvoice(id),
  });
}
