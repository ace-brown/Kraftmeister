"use client";

import { useQuery } from "@tanstack/react-query";
import { quoteKeys } from "@/lib/query-client";
import { getQuote } from "../api";

export function useQuote(id: string) {
  return useQuery({
    queryKey: quoteKeys.detail(id),
    queryFn: () => getQuote(id),
  });
}
