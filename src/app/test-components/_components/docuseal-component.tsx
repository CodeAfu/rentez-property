"use client";

import React, { useState } from "react";
import { DocusealForm } from "@docuseal/react";
import LoadingSpinner from "@/components/loading-spinner";
import { cn } from "@/lib/utils";

interface DocusealComponentProps {
  src?: string; // TODO: remove optional
  email?: string;
}

export default function DocusealComponent({
  src = "https://docuseal.com/d/LEVGR9rhZYf86M", // pass template here
  email = "example@gmail.com",
}: DocusealComponentProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#888 #f1f1f1",
      }}
      className="relative max-w-6xl mx-auto bg-slate-200 h-[calc(100dvh-4rem)] rounded overflow-auto p-2 border border-border"
    >
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
