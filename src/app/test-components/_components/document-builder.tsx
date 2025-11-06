"use client";

import React from "react";
import { DocusealBuilder } from "@docuseal/react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/loading-spinner";

const fetchBuilderToken = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/docuseal/builder-token`;
  const response = await fetch(url, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch builder token");
  }
  const data = await response.json();
  return data.token;
};

export default function DocumentBuilder() {
  const {
    data: token,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["builder-token"],
    queryFn: fetchBuilderToken,
  });

  // if (!token) return null;

  return (
    <div className="relative max-w-6xl h-[calc(100dvh-4rem)] mx-auto overflow-y-scroll bg-slate-200">
      {isLoading && <LoadingSpinner />}
      {isError && <div className="text-red-500">{error.message}</div>}
      <DocusealBuilder token={token} />
    </div>
  );
}
