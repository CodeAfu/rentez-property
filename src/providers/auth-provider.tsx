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

const AuthContext = createContext<{
  isAuthenticated: boolean;
  loginMutation: UseMutationResult<
    AxiosResponse,
    Error,
    LoginFormData,
    unknown
  >;
  logoutMutation: UseMutationResult<AxiosResponse, Error, void, unknown>;
} | null>(null);

const logoutRequest = async () => await api.post("/api/auth/logout");

const loginRequest = async (data: LoginFormData) =>
  await api.post("/api/auth/login", data);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: (data) => {
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      console.log(data);
    },
    onError: (err) => {
      if (
        axios.isAxiosError(err) &&
        err.response?.status === 401 &&
        process.env.NODE_ENV === "development"
      ) {
        if (localStorage.getItem("accessToken")) {
          localStorage.removeItem("accessToken");
          toast({
            title: "ERROR (DEV)",
            message:
              "Removing 'accessToken' from Removing 'accessToken' from localStorage unsafely. Fix ASAP (probably issue with 'api/user/logout')ocalStorage unsafely. Fix ASAP (probably issue with 'api/user/logout')",
            type: "error",
          });
          localStorage.removeItem("accessToken");
          setIsAuthenticated(false);
        } else {
          toast({
            title: "ERROR (DEV)",
            message: "'accessToken' is already null. State management issue.",
            type: "error",
          });
          setIsAuthenticated(false);
        }
      }
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
      } else {
        console.error("Unexpected Error:", err);
      }
    },
  });

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("accessToken"));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loginMutation, logoutMutation }}
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
