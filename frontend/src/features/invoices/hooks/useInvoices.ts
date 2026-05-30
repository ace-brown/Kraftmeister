"use client";

import { useQuery } from "@tanstack/react-query";
import { invoiceKeys } from "@/lib/query-client";
import { getInvoices } from "../api";

export function useInvoices() {
  return useQuery({
    queryKey: invoiceKeys.list(),
    queryFn: getInvoices,
  });
}
