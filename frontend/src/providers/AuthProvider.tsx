"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/features/auth/api/auth.api";
import {
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "@/features/auth/types/auth.types";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const applyTokens = useCallback(
    async (tokens: { accessToken: string; refreshToken: string }) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
      document.cookie = `access_token=${tokens.accessToken}; path=/`;
      setAccessToken(tokens.accessToken);
      const user = await authApi.getMe(tokens.accessToken || "");
      setUser(user);
    },
    [],
  );

  const clearSession = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    document.cookie = "access_token=; path=/; max-age=0";
    setAccessToken(null);
    setUser(null);
  }, []);

  // Restore session on page load using stored refresh token
  useEffect(() => {
    const storedRefresh = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!storedRefresh) {
      setIsLoading(false);
      return;
    }
    authApi
      .refresh(storedRefresh)
      .then(applyTokens)
      .catch(clearSession)
      .finally(() => setIsLoading(false));
  }, [applyTokens, clearSession]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const tokens = await authApi.login(payload);
      applyTokens(tokens);
      router.push("/dashboard");
    },
    [applyTokens, router],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const tokens = await authApi.register(payload);
      applyTokens(tokens);
      router.push("/dashboard");
    },
    [applyTokens, router],
  );

  const logout = useCallback(async () => {
    if (accessToken) await authApi.logout(accessToken).catch(() => {});
    clearSession();
    router.push("/login");
  }, [accessToken, clearSession, router]);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
