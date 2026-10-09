import { request } from "@/api/client";
import type { AuthResponse, User } from "@/types";
export const authService = {
  login: (username: string, password: string) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password, expiresInMins: 60 }),
    }),
  me: (accessToken: string) =>
    request<User>("/auth/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
};
