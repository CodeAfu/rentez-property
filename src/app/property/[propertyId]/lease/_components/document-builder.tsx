"use client";

import { DocusealBuilder } from "@docuseal/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/loading-spinner";
import { withAuth } from "@/lib/auth";
import api from "@/lib/api";
import { cn, devLog, logApiErr } from "@/lib/utils";
import { useRouter } from "next/navigation";

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

const handleSaveChanges = withAuth(async (data: unknown, propertyId: string, templateId?: string) => {
  devLog("Save Data:", data);
  if (!templateId) throw new Error(`Param missing: templateId=${templateId}`)
  const response = await api.post(`/api/docuseal/save-lease?propertyId=${propertyId}&templateId=${templateId}`, data);
  return response.data;
});

const handleCreateLease = withAuth(async (data: unknown, propertyId: string) => {
  devLog("Create Data:", data);
  const response = await api.post(`/api/docuseal/create-lease?propertyId=${propertyId}`, data);
  return response.data;
})

interface DocumentBuilderProps {
  propertyId: string;
  templateId?: string;
  mode: "create" | "edit";
}

export default function DocumentBuilder({
  propertyId,
  templateId,
  mode,
}: DocumentBuilderProps) {
  const router = useRouter();
  const { mutate: createMutation, isError: isCreateError, error: createError } = useMutation({
    mutationFn: (data) => handleCreateLease(data, propertyId),
    onSuccess: (response) => {
      devLog("Agreement Created!");
      router.push(`/property/${propertyId}/lease/${response.templateId}`);
    },
    onError: (err) => {
      logApiErr(err);
    }
  });

  const { mutate: saveMutation, isError: isSaveError, error: saveError } = useMutation({
    mutationFn: (data) => handleSaveChanges(data, propertyId, templateId!),
    onSuccess: () => {
      devLog("Agreement Saved")
    },
    onError: (err) => {
      logApiErr(err);
    }
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["builder-token", propertyId, templateId],
    queryFn: () => fetchBuilderToken(propertyId, templateId),
  });

  return (
    <div className="px-2">
      <div className="h-[calc(100dvh-4rem)] overflow-y-scroll bg-slate-200">
        {isLoading && <LoadingSpinner text="Loading..." />}
        {!templateId && <LoadingSpinner text="Creating Template..." />}
        {isError && <div className="text-red-500">{error.message}</div>}
        {isCreateError && <div className="text-red-500">{createError.message}</div>}
        {isSaveError && <div className="text-red-500">{saveError.message}</div>}
        {data && (
          <div className={cn("w-full h-full", !templateId && "hidden")}>
            <DocusealBuilder
              token={data.token.result}
              withSendButton={false}
              withSignYourselfButton={false}
              onSave={(data) => mode === "edit" ? saveMutation(data) : createMutation(data)}
              onLoad={(data) => mode === "create" ? createMutation(data) : undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
}
