import Link from "next/link";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";

export function PropertyCard({ property }: { property: Property }) {
  const cover = property.images?.[0] || "/placeholder.jpg";

  return (
    <Card className="overflow-hidden transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg">
      <div className="relative flex items-center justify-center w-full aspect-16/10 bg-muted">
        <img
          src={cover}
          alt={property.title}
          className="h-full w-full object-cover"
        />
      </div>

      <CardContent className="space-y-3">
        <div>
          <CardTitle className="mb-1">{property.title}</CardTitle>
          <CardDescription className="mb-2 text-sm text-muted-foreground">
            <strong>RM {property.rent}</strong> / month
          </CardDescription>
          <div className="text-sm text-muted-foreground mb-2">
            {property.address}, {property.city}, {property.state}
          </div>
          <p className="text-sm text-muted-foreground">
            {property.description.length > 120
              ? property.description.slice(0, 120) + "…"
              : property.description}
          </p>
        </div>

        {/* View Button */}
        <Button asChild className="w-full mt-2">
          <Link href={`/property/${property.id}`}>View Property</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
