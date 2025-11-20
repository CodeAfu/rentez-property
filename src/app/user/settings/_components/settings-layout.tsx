"use client";

import { useAuth } from "@/providers/auth-provider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Menus from "./menus";
import { tabs } from "../tabs";
import LoadingSpinner from "@/components/loading-spinner";

export default function SettingsLayout() {
  const { isAuthenticated, isAuthenticating } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "overview";

  useEffect(() => {
    if (!isAuthenticated && !isAuthenticating) {
      router.push(`/auth/login?redirectTo=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, router, pathname]);

  if (isAuthenticating) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-4 p-4">
      <div className="flex gap-2">
        {/* Left */}
        <Menus />

        {/* Right */}
        <div className="bg-card shadow flex-1 sm-p-32 p-8">
          {tabs[tabParam].node}
        </div>
      </div>
    </div>
  );
}
