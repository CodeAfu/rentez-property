"use client";

import MainContent from "./main-content";
import LoadingSpinner from "@/components/loading-spinner";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SettingsLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-4 p-4">
      <MainContent />
    </div>
  );
}
