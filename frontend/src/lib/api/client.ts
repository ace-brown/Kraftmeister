const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
