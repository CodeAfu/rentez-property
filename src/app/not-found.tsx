import Link from "next/link";
import React from "react";

/**
 * Render a centered "Not Found" page with a message and a link back to the homepage.
 *
 * @returns The JSX element for a full-height, centered not-found view containing a heading, message, and "Return Home" link
 */
export default function NotFound() {
  return (
    <main className="h-[calc(100dvh-4rem)] flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">Not Found</h2>
        <p className="text-lg">Could not find requested resource</p>
        <Link
          href="/"
          className="text-primary underline-offset-2 hover:underline hover:text-primary-foreground transition duration-200"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}