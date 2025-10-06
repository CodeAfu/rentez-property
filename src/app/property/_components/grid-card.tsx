"use client";

import { Button } from "@/components/ui/button";
import React, { MouseEvent } from "react";
import Image from "next/image";
import { useToast } from "@/providers/toast-provider";

export default function GridCard() {
  const { toast } = useToast();

  const handleClipboardCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    const text = e.currentTarget.textContent;
    try {
      await navigator.clipboard.writeText(text || "");
      toast({
        title: "Copy",
        message: "Phone number copied to clipboard.",
      });
    } catch (err) {
      toast({
        type: "error",
        title: "Failed to copy to clipboard.",
        message: `Error: ${err}`,
      });
    }
  };

  return (
    <div
      className="group h-64 bg-gray-400 dark:bg-gray-600 overflow-hidden rounded
                  grid grid-rows-1 [grid-template-areas:'stack'] items-end"
    >
      <div
        style={{ gridArea: "stack" }}
        className="h-full w-full text-card-foreground self-start flex items-center justify-center
                    group-hover:scale-105 group-hover:rotate-2 duration-300"
      >
        <div className="h-full w-full flex items-center justify-center">
          <Image
            src="/assets/rentez-logo.svg"
            alt="Image"
            width="300"
            height="300"
            className="max-h-full w-full object-cover"
          />
        </div>
      </div>
      <div
        style={{ gridArea: "stack" }}
        className="h-18 px-2 bg-black/40 backdrop-blur-sm overflow-hidden flex justify-between gap-1
                    translate-y-0 xl:translate-y-18 group-hover:translate-y-0 transition duration-300"
      >
        <div className="text-gray-100">
          <p className="font-semibold whitespace-nowrap overflow-hidden">
            Water Park
          </p>
          <p className="text-sm whitespace-nowrap overflow-hidden">
            Leong Kai Foong
          </p>
          <button
            onClick={(e) => handleClipboardCopy(e)}
            className="text-sm p-0 m-0 whitespace-nowrap overflow-hidden
                        hover:cursor-pointer hover:underline hover:text-accent"
          >
            +60-12-345-6789
          </button>
        </div>
        <div className="flex h-full items-end justify-end py-1">
          <Button onClick={() => {}} variant="outline" className="h-full">
            View
          </Button>
        </div>
      </div>
    </div>
  );
}
