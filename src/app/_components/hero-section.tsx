import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

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
      <div>
        Stripe Payment Integration Coming Soon! <br/>
        <Button asChild >
          <Link href="/testing_payment" >
            Testing Payment Page
          </Link>
        </Button>
      </div>
    </div>
  );
}
