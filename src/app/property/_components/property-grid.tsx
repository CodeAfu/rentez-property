"use client";

import React from "react";
import GridCard from "./grid-card";

// const data = [
//   {
//   }
// ]

export default function PropertyGrid() {
  return (
    <div className="flex flex-col items-center xl:gap-12 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <GridCard key={i} />
      ))}
    </div>
  );
}
