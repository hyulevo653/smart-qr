// src/types/auth.ts
export interface User {
  username: string;
  email?: string;
  [key: string]: any;
}

export interface Token {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  [key: string]: any;
}
