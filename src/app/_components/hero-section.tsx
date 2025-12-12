"use client";

import { Button } from "@/components/ui/button";
import LiquidEtherClient from "@/components/LiquidEtherClient";

export default function HeroSection() {
  return (
    <div className="relative h-128 flex flex-col mb-4 items-center justify-center overflow-hidden">
      {/* LiquidEther background (fills hero area, behind content) */}
      <LiquidEtherClient
        className="absolute inset-0 pointer-events-none"
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={1.8}
        cursorSize={140}
      />

      {/* Foreground content above the background */}
      <div className="absolute z-10 w-full flex flex-col items-center justify-center">
        <h1 className="text-center font-bold sm:text-8xl text-6xl select-none mb-8 font-serif">
          RentEZ Property
        </h1>

        <div className="flex gap-4">
          <Button variant="outline" size="lg">
            Search for Property
          </Button>
          <Button size="lg">Rent a Room</Button>
        </div>
      </div>
    </div>
  );
}
