import { notFound } from "next/navigation";
import React from "react";
import DocusealComponent from "./_components/docuseal-component";

export default function TestPage() {
  if (process.env.NODE_ENV !== "development") return notFound();
  return (
    <div className="min-h-screen sm:pt-8 pt-2">
      <DocusealComponent />
    </div>
  );
}
