"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

export default function Logout() {
  const {
    logoutMutation: { mutate: logout },
  } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <Button onClick={handleLogout} size="sm" variant="outline">
      Logout
    </Button>
  );
}
