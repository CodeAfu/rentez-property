"use client";

import api from "@/lib/api";
import { decodeToken, withAuth } from "@/lib/auth";
import { devLog, logApiErr } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { PropertyApplication } from "../../types";
import { ApplicationCard } from "../application-card";

const getApplications = withAuth(async () => {
  const response = await api.get("/api/propertyapplications/my-applications");
  devLog("Property Applications", response.data);
  return response.data;
})

export default function ViewUserApplications() {
  const { data: applicationsData, isLoading, isError, error } = useQuery<PropertyApplication[]>({
    queryKey: ["propertyapplications", "my-applications", decodeToken("accessToken")],
    queryFn: getApplications,
  });

  if (isError) {
    logApiErr(error);
  }

  return (
    <section>
      <h2 className="font-bold text-primary text-xl mb-8">
        View User Applications
      </h2>
      {isLoading && <p>Loading applications...</p>}
      {applicationsData && applicationsData.length === 0 && (
        <p className="text-gray-500">No applications yet.</p>
      )}
      <div className="space-y-4">
        {applicationsData?.map((application: PropertyApplication) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </section>
  );
}
