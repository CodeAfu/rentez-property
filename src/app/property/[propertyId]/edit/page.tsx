import { Suspense } from "react";
import EditPropertyComponent from "./_components/edit-property-component";

interface EditPropertyPageProps {
  params: Promise<{ propertyId: string }>;
}

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  const { propertyId } = await params;
  return (
    <div>
      <Suspense>
        <EditPropertyComponent propertyId={propertyId} />
      </Suspense>
    </div>
  );
}
