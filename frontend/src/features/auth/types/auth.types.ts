export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  userId: string;
  companyId: string;
  role: string;
  email: string;
  companyName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  companyName: string;
  email: string;
  password: string;
}

/** Public credentials of the seeded demo account, used by the one-click "Demo ansehen" login. */
export const DEMO_CREDENTIALS: LoginPayload = {
  email: "admin@muster.de",
  password: "demo1234",
};
