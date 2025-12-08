"use client";

import LoadingSpinner from "@/components/loading-spinner";
import { useQuery } from "@tanstack/react-query";

interface SubmissionsListProps {
  propertyId: string;
  templateId: string;
}

export default function SubmissionsList({ propertyId, templateId }: SubmissionsListProps) {
  const { data, isLoading } = useQuery({
    queryKey: [propertyId, templateId],
    queryFn: () => { return null; },
  });

  return (
    <div className="sm:mt-8 mt-4 bg-card shadow p-4 max-w-6xl mx-auto mb-12">
      {isLoading ? <LoadingSpinner /> : (
        <div>
          <h1 className="text-2xl font-semibold pb-2 mb-4 border-b border-b-border/50">Submissions</h1>
          {data ? (
            <div>Data</div>
          ) : (
            <div>You do not have any submissions yet.</div>
          )}
        </div>
      )}
    </div>
  );
}

