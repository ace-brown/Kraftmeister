"use client";

import { useQuery } from "@tanstack/react-query";
import { quoteKeys } from "@/lib/query-client";
import { getQuotes } from "../api";

export function useQuotes() {
  return useQuery({
    queryKey: quoteKeys.list(),
    queryFn: getQuotes,
  });
}
