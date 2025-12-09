// import { notFound } from "next/navigation";
import DocumentSubmit from "./_components/document-submit";
import ComponentDisplay from "./_components/component-display";
import ColorShowcase from "@/components/color-showcase";
import { notFound } from "next/navigation";

export default function TestPage() {
  if (process.env.NODE_ENV !== "development") return notFound();
  return (
    <div className="container mx-auto min-h-screen sm:pt-8 pt-2">
      <ComponentDisplay display={false} title="shadcn Theme Colors">
        <ColorShowcase />
      </ComponentDisplay>
      <ComponentDisplay
        display={false}
        title="DocuSeal Document View (Embedded)"
      >
        <div>Get link from email</div>
      </ComponentDisplay>
      <ComponentDisplay
        display={false}
        title="DocuSeal Document Builder (Embedded, Paid Feature?)"
      >
        <div>See user profile to view</div>
      </ComponentDisplay>
      <ComponentDisplay
        display={false}
        title="DocuSeal Document Builder (My Solution)"
      >
        <DocumentSubmit />
      </ComponentDisplay>
    </div>
  );
}
