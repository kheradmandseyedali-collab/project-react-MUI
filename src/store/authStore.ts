import { create } from "zustand";
import { authService } from "@/services/authService";
import type { User } from "@/types";
const USER_KEY = "nova-user";
const ACCESS_TOKEN_KEY = "nova-access-token";
interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}
function readUser(): User | null {
  try {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}
function readAccessToken(): string | null {
  try {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}
function persist(user: User, accessToken: string): void {
  try {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  } catch {
    /* Storage may be unavailable. */
  }
}
function clearPersistedAuth(): void {
  try {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    /* Storage may be unavailable. */
  }
}
export const useAuthStore = create<AuthState>((set) => ({
  user: readUser(),
  accessToken: readAccessToken(),
  loading: false,
  error: "",
  login: async (username, password) => {
    set({ loading: true, error: "" });
    try {
      const {
        accessToken,
        refreshToken: _refreshToken,
        ...user
      } = await authService.login(username, password);
      persist(user, accessToken);
      set({ user, accessToken, loading: false, error: "" });
    } catch (cause) {
      const error =
        cause instanceof Error ? cause.message : "Unable to sign in";
      set({ loading: false, error });
      throw cause;
    }
  },
  logout: () => {
    clearPersistedAuth();
    set({ user: null, accessToken: null, error: "" });
  },
  clearError: () => set({ error: "" }),
}));
