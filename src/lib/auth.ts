import { TokenPayload } from "@/types/token";
import { jwtDecode } from "jwt-decode";
import api from "./api";

export default function decodeToken(token: string): TokenPayload | null {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}

const refreshAccessToken = async (): Promise<string> => {
  try {
    console.log("Calling refresh endpoint...");
    const response = await api.post("/api/auth/refresh");
    console.log("Refresh response:", response.data);
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Refresh failed:", error);
    throw error;
  }
};

export const withAuth = <T extends unknown[], R>(
  func: (...args: T) => Promise<R>,
) => {
  return async (...args: T): Promise<R> => {
    if (typeof window === "undefined") {
      throw Error("'withAuth()' must be used within a client component.");
    }

    let token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const decoded = decodeToken(token);

      if (!decoded) {
        localStorage.removeItem("accessToken");
        throw new Error("Invalid token");
      }

      const now = Math.floor(Date.now() / 1000);
      const expTimestamp =
        typeof decoded.exp === "number"
          ? decoded.exp
          : Math.floor(new Date(decoded.exp).getTime() / 1000);

      console.log("now:", now);
      console.log("exp:", expTimestamp);
      console.log("expired?:", expTimestamp < now);

      // Token expired - attempt refresh
      if (expTimestamp < now) {
        try {
          token = await refreshAccessToken();
        } catch {
          localStorage.removeItem("accessToken");
          window.location.href = "/auth/login";
          throw new Error("Session expired. Please login again");
        }
      }

      return await func(...args);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw Error("Authentication failed");
    }
  };
};

// export const withRole = <T extends unknown[], R>(
//   allowedRoles: string[],
//   func: (...args: T) => R,
// ) => {
//   return withAuth(async (...args: T): Promise<R> => {
//     const token = useGetAuthToken();
//     const decoded = jwtDecode<DecodedToken>(token!.access_token);
//
//     if (!allowedRoles.includes(decoded.role)) {
//       throw Error("Insufficient permissions");
//     }
//
//     return func(...args);
//   });
// };
