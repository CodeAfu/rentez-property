import { TokenPayload } from "@/types/token";
import { jwtDecode } from "jwt-decode";
import api from "./api";

export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}

export const refreshAccessToken = async (): Promise<string> => {
  console.log("Calling refresh endpoint...");
  const response = await api.post("/api/auth/refresh");
  // console.log("Refresh response:", response.data);
  const newAccessToken = response.data.accessToken;
  localStorage.setItem("accessToken", newAccessToken);
  return newAccessToken;
};

export const withAuth = <T extends unknown[], R>(
  func: (...args: T) => Promise<R>,
) => {
  return async (...args: T): Promise<R> => {
    if (typeof window === "undefined") {
      throw Error("'withAuth()' must be used within a client component.");
    }

    let token = localStorage.getItem("accessToken");

    // Token exists and not expired
    if (token) {
      const decoded = decodeToken(token);
      console.log(decoded);
      if (decoded) {
        const now = Math.floor(Date.now() / 1000);
        const expTimestamp =
          typeof decoded.exp === "number"
            ? decoded.exp
            : Math.floor(new Date(decoded.exp).getTime() / 1000);
            
        if (expTimestamp >= now) {
          return await func(...args);
        }
      }
    }
    // Refresh: no token, invalid token, expired token

    try {
      token = await refreshAccessToken();
      return await func(...args);
    } catch {
      localStorage.removeItem("accessToken");
      throw new Error("Session expired. Please login again");
    }
  };
};
  