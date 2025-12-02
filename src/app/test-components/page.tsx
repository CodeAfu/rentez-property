// import { notFound } from "next/navigation";
import React from "react";
import DocumentView from "./_components/document-view";
import DocumentSubmit from "./_components/document-submit";
import ComponentDisplay from "./_components/component-display";
import ColorShowcase from "@/components/color-showcase";

export default function TestPage() {
  // if (process.env.NODE_ENV !== "development") return notFound();
  return (
    <div className="container mx-auto min-h-screen sm:pt-8 pt-2">
      <ComponentDisplay display={false} title="shadcn Theme Colors">
        <ColorShowcase />
      </ComponentDisplay>
      <ComponentDisplay
        display={false}
        title="DocuSeal Document View (Embedded)"
      >
        <DocumentView />
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
