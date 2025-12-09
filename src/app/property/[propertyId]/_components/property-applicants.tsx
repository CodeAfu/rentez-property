"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "@/lib/api";
import { withAuth } from "@/lib/auth";
import LoadingSpinner from "@/components/loading-spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Calendar,
  Briefcase,
  Users as UsersIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

interface PropertyApplication {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  applicantUserId: string;
  applicantName: string;
  applicantEmail: string;
  createdAt: string;
}

interface UserDetails {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ethnicity: string;
  occupation: string;
  email: string;
  ownedProperty: string[];
}

interface PropertyApplicantsProps {
  propertyId: string;
}

export default function PropertyApplicants({
  propertyId,
}: PropertyApplicantsProps) {
  const [expandedApplicant, setExpandedApplicant] = useState<string | null>(
    null
  );

  // Fetch applications for the property
  const {
    data: applications,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useQuery<PropertyApplication[]>({
    queryKey: ["property-applications", propertyId],
    queryFn: withAuth(async () => {
      const response = await api.get(
        `/api/PropertyApplications/property/${propertyId}`
      );
      return response.data;
    }),
    enabled: !!propertyId,
  });

  // Fetch user details for an applicant
  const getUserDetails = async (userId: string) => {
    const response = await api.get(`/api/Users/${userId}`);
    return response.data;
  };

  if (applicationsLoading) {
    return (
      <Card>
        <CardContent className="py-10">
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  if (applicationsError) {
    return (
      <Card>
        <CardContent className="py-10">
          <p className="text-center text-destructive">
            Error loading applications
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5" />
            Applicants
          </CardTitle>
          <CardDescription>View people interested in your property</CardDescription>
        </CardHeader>
        <CardContent className="py-10">
          <div className="text-center text-muted-foreground">
            <UsersIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No applications yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UsersIcon className="w-5 h-5" />
          Applicants ({applications.length})
        </CardTitle>
        <CardDescription>
          People who have applied for your property
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {applications.map((application, index) => (
            <ApplicantCard
              key={application.id}
              application={application}
              isExpanded={expandedApplicant === application.id}
              onToggle={() =>
                setExpandedApplicant(
                  expandedApplicant === application.id ? null : application.id
                )
              }
              getUserDetails={getUserDetails}
              index={index}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface ApplicantCardProps {
  application: PropertyApplication;
  isExpanded: boolean;
  onToggle: () => void;
  getUserDetails: (userId: string) => Promise<UserDetails>;
  index: number;
}

function ApplicantCard({
  application,
  isExpanded,
  onToggle,
  getUserDetails,
  index,
}: ApplicantCardProps) {
  const { data: userDetails, isLoading: userLoading } = useQuery<UserDetails>({
    queryKey: ["user-details", application.applicantUserId],
    queryFn: () => getUserDetails(application.applicantUserId),
    enabled: isExpanded,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase() || "NA";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-2 hover:border-primary/50 transition-colors">
        <CardContent className="p-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={onToggle}
          >
            <div className="flex items-center gap-4 flex-1">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">
                  {getInitials(
                    userDetails?.firstName || "",
                    userDetails?.lastName || ""
                  )}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">
                    {application.applicantName.trim() ||
                      `${userDetails?.firstName || ""} ${userDetails?.lastName || ""}`.trim() ||
                      "Anonymous"}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    Applied {formatDate(application.createdAt)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  {application.applicantEmail}
                </div>
              </div>
            </div>

            {/* Toggle Button */}
            <Button variant="ghost" size="sm">
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t"
            >
              {userLoading ? (
                <div className="flex justify-center py-4">
                  <LoadingSpinner />
                </div>
              ) : userDetails ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Full Name</p>
                        <p className="font-medium">
                          {`${userDetails.firstName || ""} ${userDetails.lastName || ""}`.trim() ||
                            "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">
                          {userDetails.dateOfBirth &&
                            userDetails.dateOfBirth !== "0001-01-01T00:00:00"
                            ? formatDate(userDetails.dateOfBirth)
                            : "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Briefcase className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Occupation</p>
                        <p className="font-medium">
                          {userDetails.occupation || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <UsersIcon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Ethnicity</p>
                        <p className="font-medium">
                          {userDetails.ethnicity || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-medium break-all">{userDetails.email}</p>
                      </div>
                    </div>

                    {userDetails.ownedProperty &&
                      userDetails.ownedProperty.length > 0 && (
                        <div className="flex items-start gap-2">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Owned Properties
                            </p>
                            <p className="font-medium">
                              {userDetails.ownedProperty.length} properties
                            </p>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  Unable to load user details
                </p>
              )}

              <div className="mt-4 flex gap-2">
                <Button className="flex-1" asChild>
                  <Link href={`/property/${application.propertyId}/lease?signerEmail=${application.applicantEmail}`}>
                    Send Application
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
