import { AuthTokens, LoginPayload, RegisterPayload } from '../types/auth.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function post<T>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Request failed');
  }

  return res.json();
}

export const authApi = {
  login: (payload: LoginPayload) =>
    post<AuthTokens>('/auth/login', payload),

  register: (payload: RegisterPayload) =>
    post<AuthTokens>('/auth/register', payload),

  refresh: (refreshToken: string) =>
    post<AuthTokens>('/auth/refresh', { refreshToken }),

  logout: (accessToken: string) =>
    fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
};
