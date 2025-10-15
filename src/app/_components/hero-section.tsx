import { Button } from "@/components/ui/button";
import React from "react";

/**
 * Hero section that displays a centered title and two primary action buttons.
 *
 * Renders a full-width centered container with the heading "RentEZ Property" and a pair
 * of large buttons for "Search for Property" (outline variant) and "Rent a Room".
 *
 * @returns A React element containing the hero heading and the two action buttons.
 */
export default function HeroSection() {
  return (
    <div className="relative min-h-128 flex flex-col bg-primary/20 mb-4 items-center justify-center">
      <h1
        className="text-center font-bold sm:text-8xl text-6xl select-none mb-8 
             opacity-0 animate-[fadeIn_1s_ease-out_forwards] font-serif"
      >
        RentEZ Property
      </h1>
      <div className="flex gap-4">
        <Button variant="outline" size="lg">
          Search for Property
        </Button>
        <Button size="lg">Rent a Room</Button>
      </div>
    </div>
  );
}