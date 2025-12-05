"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { getCurrentUserOptions } from "@/queries/get-current-user-query";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Logout() {
  const { data: userData } = useQuery(getCurrentUserOptions());
  const {
    logoutMutation: { mutate: logout },
  } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const userMessage =
    userData?.data?.firstName || userData?.data?.lastName
      ? `${userData?.data?.firstName} ${userData?.data?.lastName}`.trim()
      : userData?.data?.email;
  return (
    <div className="flex items-center gap-4">
      <p className="inline-flex flex-col text-xs leading-none">
        <span>Welcome, </span>
        <Link href="/profile">
          <span className="font-semibold text-primary text-sm leading-none">
            {userMessage}!
          </span>
        </Link>
      </p>
      <Button onClick={handleLogout} size="sm" variant="outline">
        Logout
      </Button>
    </div>
  );
}
