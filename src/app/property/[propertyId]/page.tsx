import ViewPropertyLayout from "./_components/view-property-layout";

interface PageProps {
  params: Promise<{ propertyId: string }>;
}

export default async function ViewPropertyPage({ params }: PageProps) {
  const { propertyId } = await params;
  return (
    <section className="min-h-[calc(100dvh-4rem)] container mx-auto my-8">
      <ViewPropertyLayout propertyId={propertyId} />
    </section>
  );
}
