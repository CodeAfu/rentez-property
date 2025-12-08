"use client";

import { DocusealBuilder } from "@docuseal/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/loading-spinner";
import { withAuth } from "@/lib/auth";
import api from "@/lib/api";
import { devLog } from "@/lib/utils";
import axios from "axios";

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

const handleSaveChanges = withAuth(async (data: unknown, propertyId?: string, templateId?: string) => {
  devLog("Data:", data);
  if (!propertyId || !templateId) {
    throw new Error(`Missing params: propertyId=${propertyId}, templateId=${templateId}`);
  }
  const response = await api.post(`/api/docuseal/save-lease?propertyId=${propertyId}&templateId=${templateId}`, data);
  return response.data
});

interface DocumentBuilderProps {
  propertyId: string;
  templateId?: string;
}

export default function DocumentBuilder({
  propertyId,
  templateId,
}: DocumentBuilderProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["builder-token", propertyId, templateId],
    queryFn: () => fetchBuilderToken(propertyId, templateId),
  });

  const { mutate: handleSave } = useMutation({
    mutationFn: (data) => handleSaveChanges(data, propertyId, templateId),
    onError: (error) => {
      if (axios.isAxiosError(error)) console.error(error.response?.data);
      else console.error(error);
    },
    onSuccess: () => {
      console.log("Agreement updated successfully!")
    }
  })

  return (
    <div>
      <div className="h-[calc(100dvh-4rem)] overflow-y-scroll bg-slate-200">
        {isLoading && <LoadingSpinner text="Loading Document..." />}
        {isError && <div className="text-red-500">{error.message}</div>}
        {data && <DocusealBuilder
          token={data.token.result}
          onSave={(data) => handleSave(data)}
        />}

      </div>
    </div>
  );
}
