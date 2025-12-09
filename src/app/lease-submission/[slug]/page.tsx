import DisplayError from "@/app/_components/display-error";
import DocumentSigner from "../_components/document-signer";

interface LeaseSubmissionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LeaseSubmissionPage({ params }: LeaseSubmissionPageProps) {
  const { slug } = await params;
  return (
    <main className="min-h-screen container mx-auto">
      {slug ? (
        <div className="mt-8">
          <DocumentSigner slug={slug} />
        </div>
      ) : (
        <div className="w-full mt-32 flex items-center justify-center">
          <DisplayError message="Ok" />
        </div>
      )}
    </main>

  );
}
