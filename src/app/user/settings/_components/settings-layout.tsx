"use client";

import useAuth from "@/hooks/useAuth";
import MainContent from "./main-content";
import LoadingSpinner from "@/components/loading-spinner";

export default function SettingsLayout() {
  const authenticated = useAuth();
  if (authenticated === null) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mt-4 p-4">
      {authenticated ? (
        <MainContent />
      ) : (
        <p className="bg-card rounded shadow-lg text-red-500 text-center">
          Please login to your account
        </p>
      )}
    </div>
  );
}
