export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  userId: string;
  companyId: string;
  role: string;
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
