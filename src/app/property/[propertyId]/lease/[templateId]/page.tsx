import DocumentBuilder from "../_components/document-builder";

interface LeasePageProps {
  params: Promise<{ propertyId: string; templateId: string }>;
}

export default async function LeasePage({ params }: LeasePageProps) {
  const { propertyId, templateId } = await params;
  console.log({
    propertyId,
    templateId,
  });
  return (
    <div className="container mx-auto my-8 min-h-[calc(100dvh-4rem)]">
      <DocumentBuilder propertyId={propertyId} templateId={templateId} />
    </div>
  );
}
