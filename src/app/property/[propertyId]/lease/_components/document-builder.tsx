"use client";

import { DocusealBuilder } from "@docuseal/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/loading-spinner";
import { withAuth } from "@/lib/auth";
import api from "@/lib/api";
import { cn, devLog, logApiErr } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { CreateTemplateResponse, SaveTemplateResponse } from "../types";
import { Button } from "@/components/ui/button";

interface CreateSubmissionPayload {
  propertyId: string;
  templateId: string;
  tenantEmail: string;
  role?: string;
  sendEmail?: boolean;
}

const fetchBuilderToken = withAuth(
  async (propertyId?: string, templateId?: string, signerEmail?: string | null) => {
    const params = new URLSearchParams();
    if (propertyId) params.append("propertyId", propertyId);
    if (templateId) params.append("templateId", templateId);
    if (signerEmail) params.append("signerEmail", signerEmail);

    const response = await api.post(
      `api/docuseal/builder-token?${params.toString()}`,
    );

    devLog(response.data);
    return response.data;
  },
);

const handleSaveChanges = withAuth(async (data: unknown, propertyId: string, templateId?: string) => {
  devLog("Save Data:", data);
  if (!templateId) throw new Error(`Param missing: templateId=${templateId}`)
  const response = await api.post(`/api/docuseal/save-lease?propertyId=${propertyId}&templateId=${templateId}`, data);
  return response.data;
});

const handleCreateLease = withAuth(async (data: unknown, propertyId: string, signerEmail: string | null) => {
  devLog("Create Data:", data);
  const params = new URLSearchParams();
  params.append("propertyId", propertyId);
  if (signerEmail) {
    params.append("signerEmail", signerEmail);
  } else {
    console.error("signerEmail is null. Define it through searchparams");
  }
  const response = await api.post(`/api/docuseal/create-lease?${params.toString()}`, data);
  return response.data;
})

const handleCreateSubmission = withAuth(async (payload: CreateSubmissionPayload) => {
  devLog("Submitting Lease:", payload);
  const response = await api.post(`/api/docuseal/submissions`, payload);
  return response.data;
});

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
  const searchParams = useSearchParams();
  const signerEmail = searchParams.get("signerEmail");

  const { mutate: createMutation, isError: isCreateError, error: createError } = useMutation({
    mutationFn: (data) => handleCreateLease(data, propertyId, signerEmail),
    onSuccess: (response: CreateTemplateResponse) => {
      devLog("Created template", response.message);
      router.push(`/property/${propertyId}/lease/${response.templateId}?signerEmail=${response.signerEmail}`);
    },
    onError: (err) => {
      logApiErr(err);
    }
  });

  const { mutate: saveMutation, isError: isSaveError, error: saveError } = useMutation({
    mutationFn: (data) => handleSaveChanges(data, propertyId, templateId!),
    onSuccess: (response: SaveTemplateResponse) => {
      devLog(response.message, response.data);
    },
    onError: (err) => {
      logApiErr(err);
    }
  });

  const { mutate: createSubmissionMutation, isPending: isSending, isError: isSendError, error: sendError } = useMutation({
    mutationFn: async () => {
      // 1. Validation: Ensure we have the necessary data before calling backend
      if (!templateId) throw new Error("Template ID is missing. Please save the document first.");
      if (!data?.signerEmail) throw new Error("Signer Email is missing.");

      // 2. Construct Payload
      const payload: CreateSubmissionPayload = {
        propertyId,
        templateId,
        tenantEmail: data.signerEmail,
        role: "Tenant",
        // Set to false if you are sending the email yourself via your .NET EmailService
        // Set to true if you want DocuSeal to send their default email
        sendEmail: false
      };

      return handleCreateSubmission(payload);
    },
    onSuccess: (response) => {
      devLog("Submission Successful", response);
      // Optional: Redirect or show success toast
      // queryClient.invalidateQueries(["submissions", propertyId]);
    },
    onError: (err) => {
      logApiErr(err);
    }
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["builder-token", propertyId, templateId],
    queryFn: () => fetchBuilderToken(propertyId, templateId, signerEmail),
  });

  return (
    <div className="px-2">
      <div className="bg-card px-4 py-2 border-b flex justify-between items-center">
        <h2 className="font-semibold">Recipient: {signerEmail ?? "No sender email"}</h2>
        <div className="flex gap-2">
          {signerEmail && (
            <Button
              onClick={() => createSubmissionMutation()}
              disabled={!templateId || isSending}
              variant={isSendError ? "destructive" : "default"}
            >
              {isSending ? (
                "Sending..."
              ) : isSendError ? (
                "Retry Send"
              ) : (
                "Send Email"
              )}
            </Button>
          )}
        </div>
      </div>
      <div className="h-[calc(100dvh-4rem)] overflow-y-scroll bg-slate-200">
        {isLoading && <LoadingSpinner text="Loading..." />}
        {!templateId && <LoadingSpinner text="Creating Template..." />}
        {isError && <div className="text-red-500">{error.message}</div>}
        {isCreateError && <div className="text-red-500">{createError.message}</div>}
        {isSaveError && <div className="text-red-500">{saveError.message}</div>}
        {isSendError && <div className="text-red-500">{sendError.message}</div>}
        {data && (
          <div className={cn("w-full h-full", !templateId && "hidden")}>
            <DocusealBuilder
              token={data.token}
              withSendButton={false}
              withSignYourselfButton={false}
              submitters={[
                {
                  role: "Tenant",
                  email: data.signerEmail,
                }
              ]}
              onSave={(data) => mode === "edit" ? saveMutation(data) : createMutation(data)}
              onLoad={(data) => mode === "create" ? createMutation(data) : saveMutation(data)}
              onSend={(data) => createSubmissionMutation(data)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
