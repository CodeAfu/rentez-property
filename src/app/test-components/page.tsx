import { notFound } from "next/navigation";
import React from "react";
import DocumentView from "./_components/document-view";
import DocumentSubmit from "./_components/document.submit";
import ComponentDisplay from "./_components/component-display";
import ColorShowcase from "@/components/color-showcase";

export default function TestPage() {
  if (process.env.NODE_ENV !== "development") return notFound();
  return (
    <div className="container mx-auto min-h-screen sm:pt-8 pt-2">
      <ComponentDisplay title="shadcn Theme Colors">
        <ColorShowcase />
      </ComponentDisplay>
      <ComponentDisplay title="DocuSeal Document View">
        <DocumentView />
      </ComponentDisplay>
      <ComponentDisplay display={true} title="DocuSeal Document Submit">
        <DocumentSubmit />
      </ComponentDisplay>
    </div>
  );
}
