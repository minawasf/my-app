"use client";

import React, { createContext, useContext, useState, useCallback, useLayoutEffect } from "react";
import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";
const TOKEN_KEY = "fc_token";
const USER_KEY = "fc_user";

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  status: "loading" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
}

function readFromStorage(): { token: string | null; user: AuthUser | null } {
  try {
    // Try localStorage
    let token = localStorage.getItem(TOKEN_KEY);
    let userStr = localStorage.getItem(USER_KEY);

    // Fallback: migrate from old cookie-based storage
    if (!token) {
      const getCookie = (name: string) => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? decodeURIComponent(match[2]) : null;
      };
      token = getCookie(TOKEN_KEY);
      userStr = getCookie(USER_KEY);
      if (token) localStorage.setItem(TOKEN_KEY, token);
      if (userStr) localStorage.setItem(USER_KEY, userStr);
    }

    if (token && userStr) {
      return { token, user: JSON.parse(userStr) as AuthUser };
    }
  } catch {
    // ignore parse errors
  }
  return { token: null, user: null };
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  // useLayoutEffect runs synchronously after DOM paint but before browser paint
  // This eliminates the flash/race condition with useEffect
  useLayoutEffect(() => {
    const { token: savedToken, user: savedUser } = readFromStorage();
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/signin`, { email, password });
      if (data.message === "success") {
        const authUser: AuthUser = {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
        };
        const authToken: string = data.token;

        localStorage.setItem(TOKEN_KEY, authToken);
        localStorage.setItem(USER_KEY, JSON.stringify(authUser));

        setToken(authToken);
        setUser(authUser);
        setStatus("authenticated");
        return {};
      }
      return { error: "Login failed" };
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      return { error: e.response?.data?.message || "Invalid email or password" };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
