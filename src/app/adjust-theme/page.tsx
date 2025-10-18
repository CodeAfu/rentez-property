import React from "react";
import { notFound } from "next/navigation";
import ColorShowcase from "@/components/color-showcase";

export default function AdjustThemePage() {
  if (process.env.NODE_ENV !== "development") return notFound();

  return (
    <main className="min-h-[calc(100dvh-4rem)]">
      <ColorShowcase />
    </main>
  );
}
