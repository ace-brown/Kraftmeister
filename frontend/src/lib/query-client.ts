import { QueryClient } from "@tanstack/react-query";

/**
 * Formats a date string into a localized format
  `['users', '123']` doenot means **"users AND 123"** - like BOTH should be invalidated together.
   The array is **NOT** a list of things to invalidate. It's a **hierarchical path** - like a file system folder path:
   The cache internally looks like this:
    cache = {
    'users': {
        '123': { name: 'Alice', id: '123' },     // ← ['users', '123'] points here
        '456': { name: 'Bob', id: '456' }        // ← ['users', '456'] points here
    },
    'orders': {
        '123': { total: 100 }                    // ← ['orders', '123'] points here
    }
    }
   
 */

export const jobKeys = {
  all: ["jobs"] as const,
  //   details: () => [...jobKeys.all, "detail"] as const,
  //   detail: (id: string) => [...jobKeys.all, "detail", id] as const,
};

export const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute (adjust based on data volatility)
      gcTime: 5 * 60 * 1000, // 5 minutes (garbage collection time)
      retry: 2,
      refetchOnWindowFocus: false, // Usually annoying in SSR apps
    },
  },
});
