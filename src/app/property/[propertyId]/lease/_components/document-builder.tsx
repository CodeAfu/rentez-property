"use client";

import { DocusealBuilder } from "@docuseal/react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/loading-spinner";
import { withAuth } from "@/lib/auth";
import api from "@/lib/api";

const fetchBuilderToken = withAuth(
  async (propertyId?: string, templateId?: string) => {
    const params = new URLSearchParams();
    if (propertyId) params.append("propertyId", propertyId);
    if (templateId) params.append("templateId", templateId);

    const response = await api.post(
      `api/docuseal/builder-token?${params.toString()}`,
    );
    return response.data;
  },
);

interface DocumentBuilderProps {
  propertyId: string;
  templateId?: string;
}

export default function DocumentBuilder({
  propertyId,
  templateId,
}: DocumentBuilderProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["builder-token", propertyId],
    queryFn: () => fetchBuilderToken(propertyId, templateId),
  });

  console.log(data);

  return (
    <div className="relative max-w-6xl h-[calc(100dvh-4rem)] mx-auto overflow-y-scroll bg-slate-200">
      {isLoading && <LoadingSpinner />}
      {isError && <div className="text-red-500">{error.message}</div>}
      {data && <DocusealBuilder token={data.token.result} />}
    </div>
  );
}
