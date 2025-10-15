"use client";

import PropertyGrid from "./property-grid";
import PropertySearch from "./property-search";

/**
 * Layout component that displays the property search and property grid inside a responsive container.
 *
 * Renders PropertySearch followed by PropertyGrid within a styled div that manages spacing and layout.
 *
 * @returns A JSX element containing the property search and grid layout
 */
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