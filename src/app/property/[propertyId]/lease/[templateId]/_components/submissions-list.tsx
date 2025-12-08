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
    <div className="bg-card shadow p-4 max-w-6xl w-full h-fit">
      {isLoading ? <LoadingSpinner /> : (
        <div className="text-sm">
          <h1 className="text-xl font-semibold pb-2 mb-4 border-b border-b-border/50">Submissions</h1>
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

