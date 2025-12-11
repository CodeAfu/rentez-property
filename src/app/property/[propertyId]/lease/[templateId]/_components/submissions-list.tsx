"use client";

import LoadingSpinner from "@/components/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { devLog } from "@/lib/utils";
import { withAuth } from "@/lib/auth";
import { Submission } from "../../types";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Link } from "lucide-react";
import { useToast } from "@/providers/toast-provider";

interface SubmissionsListProps {
  templateId: string;
  propertyId: string;
}

export default function SubmissionsList({ propertyId, templateId }: SubmissionsListProps) {
  const { toast } = useToast();
  const { data: submissions, isLoading } = useQuery({
    queryKey: ["submissions", propertyId],
    queryFn: withAuth(async () => {
      const response = await api.get<Submission[]>(`/api/docuseal/submissions?propertyId=${propertyId}`);
      devLog("templateId:", templateId)
      devLog("Submissions: ", response.data)
      return response.data;
    }),
    enabled: !!propertyId,
  });

  const getSignerLink = (sub: Submission) => {
    return `${window.location.origin}/lease-submission/${sub.signerSlug}?propertyId=${sub.propertyId}`;
  }

  const handleCopyLink = (sub: Submission) => {
    navigator.clipboard.writeText(getSignerLink(sub));
    toast({
      title: "Copied to clipboard",
      message: "Link copied to clipboard",
    })
  }

  return (
    <div className="px-2">
      <div className="bg-card shadow p-4 max-w-6xl w-full h-fit rounded-lg">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold pb-2 mb-4 border-b">Submissions</h1>

            {!submissions || submissions.length === 0 ? (
              <div className="text-gray-500 text-sm">No submissions yet.</div>
            ) : (
              <div className="space-y-2 text-sm p-2 rounded">
                {submissions.map((sub => (
                  <div key={sub.id} className="flex flex-col px-4 py-2 bg-popover rounded-xl shadow">
                    <div className="flex items-center justify-between">
                      <span>{sub.email}</span>
                      <span className="text-[10px] text-secondary border border-secondary bg-secondary/10 px-2 py-1 rounded-xl">{sub.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" title="View Submission">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Copy Link" onClick={() => handleCopyLink(sub)}>
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
