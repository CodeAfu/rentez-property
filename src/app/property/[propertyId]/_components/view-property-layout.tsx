"use client";

import LoadingSpinner from "@/components/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  CheckCircle2,
  XCircle,
  Calendar,
  Home,
  Users,
} from "lucide-react";
import { notFound } from "next/navigation";
import { PropertyImageCarousel } from "./property-image-carousel";
import { Button } from "@/components/ui/button";
import { getPropertyByIdQueryOptions } from "@/queries/get-property-by-id";

interface ViewPropertyLayoutProps {
  propertyId: string;
}

export default function ViewPropertyLayout({
  propertyId,
}: ViewPropertyLayoutProps) {
  const { data: property, isLoading } = useQuery({
    ...getPropertyByIdQueryOptions(propertyId),
    enabled: !!propertyId,
  });

  if (isLoading) return <LoadingSpinner />;
  if (!property) return notFound();

  console.log(property);

  // Helper: Get active bills
  const includedBills = Object.entries(property.billsIncluded ?? {})
    .filter(([, included]) => included)
    .map(([name]) => name);

  return (
    <div className="container mx-auto px-4">
      {/* 1. Header & Location */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {property.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground mt-2">
          <MapPin className="w-4 h-4" />
          <span>
            {property.address}, {property.city}, {property.state}
          </span>
        </div>
      </div>

      {/* 2. Image Carousel */}
      <PropertyImageCarousel images={property.images} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 3. Main Content (Left) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-3">
            {property.roomType.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
            {property.leaseTermCategory.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
            <Badge variant="outline" className="gap-1">
              <Calendar className="w-3 h-3" /> Posted{" "}
              {new Date(property.createdAt).toLocaleDateString()}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About this place</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {property.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border rounded-lg bg-card">
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Home className="w-4 h-4" /> Bills Included
              </h3>
              <ul className="space-y-2">
                {includedBills.length > 0 ? (
                  includedBills.map((bill) => (
                    <li
                      key={bill}
                      className="flex items-center gap-2 text-sm text-muted-foreground capitalize"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> {bill}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted-foreground italic">
                    No bills included
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" /> Preferences
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Occupation:</span>
                  <span className="font-medium text-foreground">
                    {property.preferredOccupation.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Prefers:</span>
                  <span className="font-medium text-foreground">
                    {property.preferredRaces.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Sidebar (Right) - Sticky */}
        <div className="relative">
          <div className="sticky top-24 border rounded-xl p-6 shadow-sm bg-card">
            <div className="mb-6">
              <span className="text-3xl font-bold">
                {property.rent === 0
                  ? "Contact for Price"
                  : `RM ${property.rent}`}
              </span>
              {property.rent > 0 && (
                <span className="text-muted-foreground"> / month</span>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Deposit Required</span>
                {property.depositRequired ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            <Button className="w-full h-12 text-lg" size="lg">
              Contact Owner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
