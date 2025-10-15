import React from "react";
import NotFound from "../not-found";
import ColorShowcase from "@/components/color-showcase";

export default function AdjustThemePage() {
  if (process.env.NODE_ENV !== "development") return NotFound();

  return (
    <main className="min-h-[calc(100dvh-4rem)]">
      <ColorShowcase />
    </main>
  );
}
