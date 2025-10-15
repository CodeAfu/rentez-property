"use client";

import { Button } from "@/components/ui/button";
import React, { MouseEvent } from "react";
import Image from "next/image";
import { useToast } from "@/providers/toast-provider";
import Link from "next/link";

/**
 * Renders a responsive card with an image, title, author, contact and a call-to-action button.
 *
 * The contact phone number can be clicked to copy it to the clipboard and display a toast notification.
 *
 * @returns The rendered GridCard JSX element.
 */
export default function GridCard() {
  const { toast } = useToast();

  const handleClipboardCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    const text = e.currentTarget.textContent;
    try {
      await navigator.clipboard.writeText(text || "");
      toast({
        title: "Copy",
        message: `${text} - Copied to clipboard.`,
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
      className="group aspect-video bg-gray-400 dark:bg-gray-600 overflow-hidden rounded
                  grid grid-rows-1 [grid-template-areas:'stack'] items-end
                  w-full max-w-sm md:max-w-3xl xl:max-w-7xl"
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
            width="800"
            height="600"
            className="max-h-full w-full object-cover"
          />
        </div>
      </div>
      <div
        style={{ gridArea: "stack" }}
        className="md:h-26 h-20 p-2 bg-black/40 backdrop-blur-sm overflow-hidden flex justify-between gap-1
                    translate-y-0 xl:translate-y-full group-hover:translate-y-0 transition duration-300"
      >
        <div className="text-gray-100 flex flex-col justify-between">
          <Link
            href="#"
            className="md:text-2xl text-sm font-semibold whitespace-nowrap overflow-hidden active:underline hover:underline hover:text-accent transition duration-200"
          >
            Water Park
          </Link>
          <div className="space-y-0">
            <p className="text-xs p-0 md:text-sm whitespace-nowrap overflow-hidden leading-none">
              Leong Kai Foong
            </p>
            <button
              onClick={(e) => handleClipboardCopy(e)}
              className="text-xs md:text-sm p-0 m-0 whitespace-nowrap overflow-hidden leading-none -mt-1
               hover:cursor-pointer hover:underline hover:text-accent"
            >
              +60-12-345-6789
            </button>
          </div>
        </div>
        <div className="flex h-full items-end justify-end py-1">
          <Button onClick={() => {}} variant="outline" className="h-full px-8">
            View
          </Button>
        </div>
      </div>
    </div>
  );
}