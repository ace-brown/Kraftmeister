const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function getAccessToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

function getRefreshToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refresh_token');
}

function applyTokens(tokens: { accessToken: string; refreshToken: string }) {
  localStorage.setItem('access_token', tokens.accessToken);
  localStorage.setItem('refresh_token', tokens.refreshToken);
  document.cookie = `access_token=${tokens.accessToken}; path=/`;
}

async function tryRefresh(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return null;

  const tokens = await res.json();
  applyTokens(tokens);
  return tokens.accessToken;
}

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getAccessToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  // On 401 try to refresh once then retry
  if (response.status === 401) {
    const newToken = await tryRefresh();
    if (!newToken) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      document.cookie = 'access_token=; path=/; max-age=0';
      window.location.href = '/login';
      throw new Error('Session expired');
    }

    const retry = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newToken}`,
      },
      ...options,
    });

    if (!retry.ok) throw new Error('API request failed');
    if (retry.status === 204) return undefined as T;
    return retry.json();
  }

  if (!response.ok) throw new Error('API request failed');
  if (response.status === 204) return undefined as T;
  return response.json();
}
