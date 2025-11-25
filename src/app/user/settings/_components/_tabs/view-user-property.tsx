"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus, Edit, MapPin, DollarSign, Home, Calendar } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from "@/components/loading-spinner";
import { getCurrentUserPropertyOptions } from "@/queries/get-current-user-property-query";
import { Property } from "@/types/property";

function PropertyRow({ property }: { property: Property }) {
  const primaryImage = property.images?.[0] || "/placeholder-property.jpg";

  return (
    <div className="border rounded-lg p-4 hover:bg-accent/5 transition">
      <div className="flex gap-4">
        <div className="flex items-center">
          <div className="w-32 h-24 shrink-0 flex items-center rounded overflow-hidden hover:scale-105 hover:rotate-5 transition duration-200">
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
              <DollarSign className="w-4 h-4" />
              {property.rent}/mo
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
                {/*property.roomType.join(", ")*/}
              </span>
            )}
            {property.depositRequired && <span>Deposit Required</span>}
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(property.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/user/property/${property.id}/edit`}>
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href={`/user/property/${property.id}`}>View Details</Link>
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
            {properties.length}{" "}
            {properties.length === 1 ? "property" : "property listings"}
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/user/property/create">
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
            <Link href="/user/property/create">
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
