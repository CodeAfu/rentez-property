"use client";

import PropertyGrid from "./property-grid";
import PropertySearch from "./property-search";

export default function PropertyLayout() {
  return (
    <div
      className="container flex flex-col xl:gap-16 gap-8 p-4 
                   min-h-[30vh] m-auto rounded shadow"
    >
      <PropertySearch />
      <PropertyGrid />
    </div>
  );
}
