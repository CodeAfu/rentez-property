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
  }, [isAuthenticated, isAuthenticating, router, pathname]);

  if (isAuthenticating) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-4 p-4">
      <div className="grid grid-cols-[240px_1fr] gap-2">
        {/* Left */}
        <Menus />

        {/* Right */}
        <div className="bg-card shadow sm-p-32 p-8 overflow-hidden">
          {tabs[tabParam].node}
        </div>
      </div>
    </div>
  );
}
