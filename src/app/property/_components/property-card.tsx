import Image from 'next/image';
import { Property } from '../types';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';





export function PropertyCard({ property }: { property: Property }) {
  const cover = property.images?.[0] || '/placeholder.jpg';

  return (
    <Card className="overflow-hidden">
      <div className="relative w-full aspect-[16/10] bg-muted">
        <Image src={cover} alt={property.title} fill className="object-cover" />
      </div>
      <CardContent>
        <CardTitle className="mb-1">{property.title}</CardTitle>
        <CardDescription className="mb-2 text-sm text-muted-foreground">
          <strong>RM {property.pricePerMonth.toLocaleString()}</strong> / month
        </CardDescription>
        <div className="text-sm text-muted-foreground mb-2">{property.address}, {property.city}, {property.state}</div>
        <p className="text-sm text-muted-foreground">{property.description.length > 120 ? property.description.slice(0, 120) + '…' : property.description}</p>
      </CardContent>
    </Card>
  );
}

