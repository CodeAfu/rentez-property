import { Suspense } from "react";
import DocumentBuilder from "./_components/document-builder";

interface CreateLeasePage {
  params: Promise<{ propertyId: string }>;
}

export default async function CreateLeasePage({ params }: CreateLeasePage) {
  const { propertyId } = await params;
  return (
    <div className="min-h-[calc(100dvh-4rem)] container mx-auto my-8">
      <Suspense>
        <DocumentBuilder propertyId={propertyId} mode="create" />
      </Suspense>
    </div>
  );
}
