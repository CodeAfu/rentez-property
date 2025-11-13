import { useState, useEffect } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      setIsAuthenticated(!isExpired);
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
}
