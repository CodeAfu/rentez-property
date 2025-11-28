import DocumentBuilder from "../_components/document-builder";

interface LeasePageProps {
  params: Promise<{ templateId: string }>;
}

export default async function LeasePage({ params }: LeasePageProps) {
  const { templateId } = await params;
  return (
    <div className="container mx-auto my-4 min-h-[calc(100dvh-4rem)]">
      <DocumentBuilder />
      <div>{templateId}</div>
    </div>
  );
}
