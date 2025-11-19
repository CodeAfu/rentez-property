"use client";

import api from "@/lib/api";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useToast } from "./toast-provider";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { LoginFormData } from "@/types/user";
import { decodeToken, refreshAccessToken } from "@/lib/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  loginMutation: UseMutationResult<
    AxiosResponse,
    Error,
    LoginFormData,
    unknown
  >;
  logoutMutation: UseMutationResult<AxiosResponse, Error, void, unknown>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const logoutRequest = async () => await api.post("/api/auth/logout");

const loginRequest = async (data: LoginFormData) =>
  await api.post("/api/auth/login", data);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const initalizeAuth = async () => {
    setIsAuthenticating(true);
    const token = localStorage.getItem("accessToken");

    // 1- Token exists in storage
    if (token) {
      const decoded = decodeToken(token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded && decoded.exp > now) {
        setIsAuthenticated(true);
        setIsAuthenticating(false);
        return;
      }
    }

    // 2- Token null/expired => try silent refresh
    try {
      await refreshAccessToken();
      setIsAuthenticated(true);
    } catch {
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    initalizeAuth();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "accessToken" && e.newValue === null) {
        setIsAuthenticated(false);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: (data) => {
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      console.log(data);
    },
    onError: (err) => {
      localStorage.removeItem("accessToken");
      console.error(err);
      setIsAuthenticated(false);
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      const { accessToken } = data.data;
      localStorage.setItem("accessToken", accessToken);
      setIsAuthenticated(true);
      const params = new URLSearchParams(window.location.search);
      router.push(params.get("redirectTo") ?? "/");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const devEnv = process.env.NODE_ENV === "development";
        const backendData = err.response?.data || {};
        const message = devEnv ? backendData.error : backendData.message;
        console.error("Login Error:", message);
        toast({
          type: "error",
          title: "Error",
          message,
        });
      }
    },
  });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthenticating,
        loginMutation,
        logoutMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
