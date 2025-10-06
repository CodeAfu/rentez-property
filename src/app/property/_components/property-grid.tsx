"use client";

import React from "react";
import GridCard from "./grid-card";

// const data = [
//   {
//   }
// ]

export default function PropertyGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
      {Array.from({ length: 1 }).map((_, i) => (
        <GridCard key={i} />
      ))}
    </div>
  );
}
