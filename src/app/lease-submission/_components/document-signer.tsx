"use client";

import { DocusealForm } from "@docuseal/react";
import LoadingSpinner from "@/components/loading-spinner";
import { cn, devLog, jsonLog, logApiErr } from "@/lib/utils";
import { withAuth } from "@/lib/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { CompleteSubmissionResponse, DocusealFormLoadData } from "../types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/providers/toast-provider";
import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
  server: 'sandbox',
  accessToken: "polar_oat_20l4c37dL9dnKTrerUQYCB0jZehVItCem6Du83q1oD7",
});

const ORGANIZATION_ID = "3e783099-3611-4627-99f5-45a61b2806b2";

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

const getSubmission = withAuth(async (submitterEmail: string, propertyId: string | null) => {
  const response = await api.get(`/api/docuseal/submissions/get-by-email-propId/${submitterEmail}/${propertyId}`);
  devLog("Submission Data", response.data);
  return response.data;
});

interface DocumentViewProps {
  slug: string;
}

export default function DocumentSigner({ slug }: DocumentViewProps) {
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState<string>();
  const [submitterEmail, setSubmitterEmail] = useState<string>();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const { toast } = useToast();

  devLog("Property ID for Payment:", propertyId);

  const createCheckoutSession = async () => {
    try {
      setIsLoadingCheckout(true);

      // Fetch all products from Polar
      const result = await polar.products.list({
        organizationId: ORGANIZATION_ID,
      });

      // Find the product where description matches propertyId
      let polarProductId: string | null = null;

      for await (const page of result) {
        const matchingProduct = page.result.items.find(
          (product) => product.description === propertyId
        );
        console.log("Checking Product:", matchingProduct);

        if (matchingProduct) {
          console.log("Matching Polar Product Found:", matchingProduct);
          polarProductId = matchingProduct.id;
          break;
        }
      }

      if (!polarProductId) {
        toast({
          title: "Error",
          message: "Property not found in payment system.",
        });
        return;
      }

      // Create checkout session
      const checkout = await polar.checkouts.create({
        products: [polarProductId],
      });

      // Redirect to checkout URL
      if (checkout.url) {
        window.location.href = checkout.url;
      } else {
        toast({
          title: "Error",
          message: "Failed to create checkout session.",
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Error",
        message: "Failed to create payment session.",
      });
    } finally {
      setIsLoadingCheckout(false);
    }
  };
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

  const { } = useQuery({
    queryKey: ["docuseal", "submissions", submitterEmail, propertyId],
    queryFn: async () => {
      const submission = await getSubmission(submitterEmail!, propertyId!);
      devLog("Submission", submission);
      if (submission?.submissionUrl) {
        setSubmissionUrl(submission.submissionUrl);
        devLog("Submission URL", submissionUrl);
      }
      return submission;
    },
    enabled: !!submitterEmail && !!propertyId,
  })

  const { mutate: signLeaseMutation } = useMutation({
    mutationFn: (data: CompleteSubmissionResponse) => signLease(data, propertyId),
    onSuccess: (data) => {
      devLog("Lease Signed Successfully", data)
    },
    onError: (error) => {
      logApiErr(error);
    }
  })

  const handleFormLoad = (data: DocusealFormLoadData) => {
    jsonLog("Form Loaded", data);
    setSubmitterEmail(data.completed_submitter?.email);
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
                    <Button asChild>
                      <Link href={submissionUrl} target="_blank" rel="noopener noreferrer">
                        View Submission
                      </Link>
                    </Button>
                    <Button
                      onClick={createCheckoutSession}
                      disabled={isLoadingCheckout}
                      variant="secondary"
                    >
                      {isLoadingCheckout ? (
                        <>
                          Processing...
                        </>
                      ) : (
                        "Proceed to Checkout"
                      )}
                    </Button>
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
