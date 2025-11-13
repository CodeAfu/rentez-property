import { useMemo } from "react";
import { useIsMounted } from "./useIsMounted";

export default function useAuth() {
  const mounted = useIsMounted();

  return useMemo(() => {
    if (!mounted) return null;

    try {
      const token = localStorage.getItem("accessToken");
      if (token) return true; 
    } catch {
      return false;
    }
  }, [mounted]);
}