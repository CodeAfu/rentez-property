"use client";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, MapPin, Home, Calendar, Trash2 } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from "@/components/loading-spinner";
import { getCurrentUserPropertyOptions } from "@/queries/get-current-user-property-query";
import { Property } from "@/types/property";
import { withAuth } from "@/lib/auth";
import api from "@/lib/api";
import { useToast } from "@/providers/toast-provider";

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

function PropertyRow({ property }: { property: Property }) {
  const primaryImage = property.images?.[0] || "/placeholder-property.jpg";
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch applications for the property
  const {
    data: applications = [],
  } = useQuery<PropertyApplication[]>({
    queryKey: ["property-applications", property.id],
    queryFn: withAuth(async () => {
      const response = await api.get(
        `/api/PropertyApplications/property/${property.id}`
      );
      return response.data;
    }),
    enabled: !!property.id,
  });

  // Delete property mutation
  const deletePropertyMutation = useMutation({
    mutationFn: withAuth(async (propertyId: string) => {
      await api.delete(`/api/Property/${propertyId}`);
    }),
    onSuccess: () => {
      toast({
        title: "Property deleted",
        message: "Your property has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["property"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error?.message || "Failed to delete property.",
      });
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${property.title}"? This action cannot be undone.`)) {
      deletePropertyMutation.mutate(property.id);
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:bg-accent/5 transition-scroll">
      <div className="flex gap-4">
        <div className="flex items-center">
          <div className="w-32 h-24 shrink-0 flex items-center rounded overflow-hidden hover:scale-105 transition duration-200">
            <img
              src={primaryImage}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="font-semibold text-lg truncate">{property.title}</h3>
            <div className="flex items-center gap-1 text-lg font-bold text-primary whitespace-nowrap">
              RM {property.rent}/mo
            </div>
          </div>

          <div className="flex items-start gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="truncate">
              {property.address}, {property.city}, {property.state}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            {property.roomType && property.roomType.length > 0 && (
              <span className="flex items-center gap-1">
                <Home className="w-3 h-3" />
                {property.roomType ? property.roomType.join(", ") : "Unset"}
              </span>
            )}
            {property.depositRequired && <span>Deposit Required</span>}
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {property.createdAt
                ? new Date(property.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/property/${property.id}/edit`}>
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href={`/property/${property.id}`}>View</Link>
            </Button>
            {property.agreementId ? (
              <Button asChild size="sm">
                <Link
                  href={`/property/${property.id}/lease/${property.agreementId}`}
                >
                  View Lease
                </Link>
              </Button>
            ) : (
              <Button asChild size="sm">
                <Link href={`/property/${property.id}/lease`}>
                  Create Lease
                </Link>
              </Button>
            )}
            <Button asChild size="sm">
              <Link href={`/property/${property.id}/applicants`}>
                Applicants {applications.length > 0 && `(${applications.length})`}
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={deletePropertyMutation.isPending}
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ViewUserProperty() {
  const {
    data: propertyData,
    isPending,
    isError,
    error,
  } = useQuery(getCurrentUserPropertyOptions());

  if (isPending) return <LoadingSpinner />;
  if (isError) return <div className="text-red-500">{error.message}</div>;

  const properties = propertyData?.data || [];

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-xl text-primary">
            My Property Listings
          </h2>
          <p className="text-sm text-muted-foreground">
            {properties.length === 1 ? "Property" : "Property Listings"}
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/property/create">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      {properties.length === 0 ? (
        <div className="border rounded-lg p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Home className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-medium">No properties yet</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Add your first property to get started
            </p>
          </div>
          <Button asChild size="sm" className="mt-2">
            <Link href="/property/create">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {properties.map((property: Property) => (
            <PropertyRow key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}
