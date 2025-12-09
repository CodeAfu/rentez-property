"use client";

import LoadingSpinner from "@/components/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface SubmissionsListProps {
  propertyId: string;
  templateId?: string;
}

export default function SubmissionsList({ propertyId, templateId }: SubmissionsListProps) {
  const { data: submissions, isLoading } = useQuery({
    queryKey: ["submissions", propertyId, templateId],
    queryFn: async () => {
      const response = await api.get(`/api/docuseal/submissions?templateId=${templateId}`);
      return response.data;
    },
    enabled: !!templateId,
  });

  if (!templateId) return null;

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
              <div className="space-y-2">
                {/*
                {submissions.map((sub) => (
                  <div key={sub.id} className="flex justify-between p-2 bg-slate-50 rounded">
                    <span>{sub.email}</span>
                    <span className="text-blue-600">{sub.status}</span>
                  </div>
                ))}
              */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
