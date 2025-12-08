import DocumentBuilder from "../_components/document-builder";
import SubmissionsList from "./_components/submissions-list";

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
      <div className="grid xl:grid-cols-[1fr_24rem] gap-4">
        <DocumentBuilder propertyId={propertyId} templateId={templateId} />
        <SubmissionsList propertyId={propertyId} templateId={templateId} />
      </div>
    </div>
  );
}
