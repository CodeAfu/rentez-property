"use client";

import { DocusealForm } from "@docuseal/react";
import LoadingSpinner from "@/components/loading-spinner";
import { cn, jsonLog } from "@/lib/utils";
import { withAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";

const getSignerToken = withAuth(async (slug: string, propertyId: string | null) => {
  if (!propertyId) throw new Error("'propertyId' is null or undefined")
  const params = new URLSearchParams();
  params.set("slug", slug);
  params.set("propertyId", propertyId);
  console.log("Params", params);

  const response = await api.post(`/api/docuseal/signer-token?${params.toString()}`)
  jsonLog(response.data);
  return response.data;
});

interface DocumentViewProps {
  slug: string;
}

export default function DocumentSigner({ slug }: DocumentViewProps) {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");

  const {
    data,
    isLoading: isFetchingToken,
    isError,
    error,
  } = useQuery({
    queryKey: ["docuseal", "signer-token", slug],
    queryFn: async () => getSignerToken(slug, propertyId),
    enabled: !!propertyId,
  });

  return (
    <div className="relative max-w-6xl mx-auto bg-slate-200 h-screen rounded overflow-auto p-2 border border-border scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100">
      {isFetchingToken && <LoadingSpinner text="Fetching Token..." />}
      {isError && (<div className="text-destructive">Failed to fetch token: {error.message}</div>)}
      <div
        className={cn(
          "transition-opacity duration-500",
        )}
      >
        {data && (
          <DocusealForm
            src={`https://docuseal.com/d/${slug}`}
            token={data.token}
          />
        )}
      </div>
    </div>
  );
}
