import React from "react";
import NotFound from "../not-found";
import ColorShowcase from "@/components/color-showcase";

/**
 * Render the Adjust Theme page: show the ColorShowcase when running in development, otherwise render the NotFound page.
 *
 * @returns A React element representing the theme adjustment UI in development, or the NotFound page when not in development.
 */
export default function AdjustThemePage() {
  if (process.env.NODE_ENV !== "development") return NotFound();

  return (
    <main className="min-h-[calc(100dvh-4rem)]">
      <ColorShowcase />
    </main>
  );
}