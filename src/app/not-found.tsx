import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="h-[calc(100dvh-4rem)] flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">Not Found</h2>
        <p className="text-lg">Could not find requested resource</p>
        <Link
          href="/"
          className="text-primary-foreground underline-offset-2 hover:underline hover:text-primary-foreground-lighter transition duration-200"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
