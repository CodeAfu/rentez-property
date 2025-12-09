"use client";

import { DocusealForm } from "@docuseal/react";
import LoadingSpinner from "@/components/loading-spinner";
import { cn } from "@/lib/utils";
import { withAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const getSignerToken = withAuth(async (slug: string) => {
  const response = await api.post("/signer-token")
  return response.data;
});

interface DocumentViewProps {
  slug: string;
}

export default function DocumentSigner({ slug }: DocumentViewProps) {
  const {
    data: token,
    isLoading: isFetchingToken,
    isError,
  } = useQuery({
    queryKey: [""],
    queryFn: () => getSignerToken(slug),
  });

  if (isError) {
    return <div className="text-destructive">Failed to load document</div>;
  }

  return (
    <div className="relative max-w-6xl mx-auto bg-slate-200 h-[calc(100dvh-4rem)] rounded overflow-auto p-2 border border-border scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100">
      {isFetchingToken && <LoadingSpinner text="Fetching Token..." />}
      <div
        className={cn(
          "transition-opacity duration-500",
        )}
      >
        <DocusealForm
          token={token}
        />
      </div>
    </div>
  );
}
