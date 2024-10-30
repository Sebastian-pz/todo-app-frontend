import api from "@/lib/utils/axios";
import { LoginFormValues, RegisterFormValues } from "@/lib/validations/auth";
import { AuthResponse } from "@/types/auth.types";

const isClient = typeof window !== "undefined";

export const authService = {
  async login(credentials: LoginFormValues): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);
    return data;
  },

  async register(userData: RegisterFormValues): Promise<AuthResponse> {
    // Remove confirmPassword and send to backend
    const { confirmPassword, ...registerData } = userData;
    const { data } = await api.post<AuthResponse>(
      "/auth/register",
      registerData
    );
    return data;
  },

  logout() {
    if (isClient) {
      localStorage.removeItem("token");
      window.location.replace("/login");
    }
  },

  isAuthenticated() {
    if (isClient) {
      const token = localStorage.getItem("token");
      return !!token;
    }
  },
};
