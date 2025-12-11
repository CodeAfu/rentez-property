"use client";

import { DocusealForm } from "@docuseal/react";
import LoadingSpinner from "@/components/loading-spinner";
import { cn, devLog, jsonLog, logApiErr } from "@/lib/utils";
import { withAuth } from "@/lib/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { CompleteSubmissionResponse } from "../types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/providers/toast-provider";

const getSignerToken = withAuth(async (slug: string, propertyId: string | null) => {
  if (!propertyId) throw new Error("'propertyId' is null or undefined")
  const params = new URLSearchParams();
  params.set("slug", slug);
  params.set("propertyId", propertyId);
  devLog("Signer Token Params", params);

  const response = await api.post(`/api/docuseal/signer-token?${params.toString()}`)
  return response.data;
});

const signLease = withAuth(async (data: CompleteSubmissionResponse, propertyId: string | null) => {
  if (!propertyId) throw new Error("'propertyId' is null or undefined")
  const params = new URLSearchParams();
  params.set("signerEmail", data.email);
  params.set("propertyId", propertyId);
  devLog("Sign Lease Params", params);

  const response = await api.post(`/api/docuseal/submissions/sign-lease?${params.toString()}`,
    {
      status: data.status,
      opened_at: data.opened_at,
      completed_at: data.completed_at,
      submission_url: data.submission_url,
    })
  return response.data;
});

interface DocumentViewProps {
  slug: string;
}

export default function DocumentSigner({ slug }: DocumentViewProps) {
  const [submissionUrl, setSubmissionUrl] = useState<string>();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const { toast } = useToast();

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


  const { mutate: signLeaseMutation } = useMutation({
    mutationFn: (data: CompleteSubmissionResponse) => signLease(data, propertyId),
    onSuccess: (data) => {
      devLog("Lease Signed Successfully", data)
    },
    onError: (error) => {
      logApiErr(error);
    }
  })

  const handleFormLoad = (data: unknown) => {
    jsonLog("Form Loaded", data);
  }

  const handleFormComplete = (data: CompleteSubmissionResponse) => {
    jsonLog("Form Completed", data);
    setSubmissionUrl(data.submission_url);
    signLeaseMutation(data);

    toast({
      title: "Submission Completed",
      message: `View your submission here: ${data.submission_url}`,
    })
  }

  const handleFormDecline = (data: unknown) => {
    jsonLog("Form Declined", data);
  }

  if (!propertyId) {
    return (
      <div className="text-destructive">
        Property ID is missing.
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto ">
      {isFetchingToken && <LoadingSpinner text="Fetching Token..." />}
      {isError && (<div className="text-destructive">Failed to fetch token: {error.message}</div>)}
      <div
        className={cn(
          "transition-opacity duration-500",
        )}
      >
        {data && (
          <div>
            {submissionUrl && (
              <div className="bg-card shadow-sm p-4 rounded-lg mb-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Submission Sent Successfully!</h2>
                  <div className="flex gap-2">
                    <Button variant="secondary" asChild>
                      <Link href={submissionUrl} target="_blank" rel="noopener noreferrer">
                        View Submission
                      </Link>
                    </Button>
                    <Button>Continue to Payment</Button>
                  </div>
                </div>
              </div>
            )}
            <div className="h-screen overflow-y-scroll bg-slate-200 rounded p-2 border border-border scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100">
              <DocusealForm
                src={`https://docuseal.com/s/${slug}`}
                token={data.token}
                onLoad={(data) => handleFormLoad(data)}
                onComplete={(data) => handleFormComplete(data)}
                onDecline={(data) => handleFormDecline(data)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
