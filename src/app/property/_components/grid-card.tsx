import { Button } from "@/components/ui/button";
import React from "react";

export default function GridCard() {
  return (
    <div className="group bg-accent/80 overflow-hidden rounded h-64 grid items-end">
      <div
        className="h-full w-full border-4 border-primary text-accent-foreground
                    col-start-1 col-end-2 row-start-1 row-end-2
                    group-hover:scale-102 duration-200"
      >
        Image
      </div>
      <div
        className="h-20 px-2 bg-black/40
                    col-start-1 col-end-2 row-start-1 row-end-2
                    translate-y-0 xl:translate-y-20 group-hover:translate-y-0 transition duration-300"
      >
        <p className="text-sm">Description</p>
        <div>
          <Button>View</Button>
        </div>
      </div>
    </div>
  );
}
