"use client";

import React, { useState } from "react";
import { DocusealForm } from "@docuseal/react";
import LoadingSpinner from "@/components/loading-spinner";
import { cn } from "@/lib/utils";

interface DocumentView {
  src?: string; // TODO: remove optional
  email?: string;
}

export default function DocumentView({
  src = "https://docuseal.com/d/LEVGR9rhZYf86M", // pass template here
  email = "example@gmail.com",
}: DocumentView) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative max-w-6xl mx-auto bg-slate-200 h-[calc(100dvh-4rem)] rounded overflow-auto p-2 border border-border scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100">
      {isLoading && <LoadingSpinner />}
      <div
        className={cn(
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      >
        <DocusealForm
          src={src}
          email={email}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
