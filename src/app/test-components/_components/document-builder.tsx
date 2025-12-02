"use client";

import { DocusealBuilder } from "@docuseal/react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/loading-spinner";
import { withAuth } from "@/lib/auth";
import api from "@/lib/api";

const fetchBuilderToken = withAuth(async (templateId: string | undefined) => {
  const templateIdString = templateId && `?templateId=${templateId}`;
  const response = await api.post(`/docuseal/builder-token${templateIdString}`);
  console.log(response.data.token);
  return response.data;
});

interface DocumentBuilderProps {
  templateId: string;
}

export default function DocumentBuilder({ templateId }: DocumentBuilderProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["builder-token"],
    queryFn: () => fetchBuilderToken(templateId),
  });

  if (!data) return null;

  return (
    <div className="relative max-w-6xl h-[calc(100dvh-4rem)] mx-auto overflow-y-scroll bg-slate-200">
      {isLoading && <LoadingSpinner />}
      {isError && <div className="text-red-500">{error.message}</div>}
      <DocusealBuilder token={data.token.result} />
    </div>
  );
}
