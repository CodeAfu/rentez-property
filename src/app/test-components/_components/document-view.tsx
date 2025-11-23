"use client";

import { DocusealForm } from "@docuseal/react";
import LoadingSpinner from "@/components/loading-spinner";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { withAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const getDocumentUrl = withAuth(async (templateId?: string) => {
  const response = await api.get(`api/docuseal/templates/url/${templateId}`);
  return response.data;
});

export default function DocumentView() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId") ?? "1962192";

  const {
    data: url,
    isLoading: isFetching,
    isError,
  } = useQuery({
    queryKey: ["docuseal", "templates", "url", templateId],
    queryFn: () => getDocumentUrl(templateId),
  });

  console.log(url);

  if (isError) {
    return <div className="text-destructive">Failed to load document</div>;
  }

  return (
    <div className="relative max-w-6xl mx-auto bg-slate-200 h-[calc(100dvh-4rem)] rounded overflow-auto p-2 border border-border scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100">
      {isLoading && <LoadingSpinner text="Loading Document..." />}
      {isFetching && <LoadingSpinner text="Fetching..." />}
      <div
        className={cn(
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
        )}
      >
        <DocusealForm
          src={url}
          email={user?.email}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
