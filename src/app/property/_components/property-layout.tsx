import PropertyGrid from "./property-grid";
import PropertySearch from "./property-search";

export default function PropertyLayout() {
  return (
    <div className="container flex flex-col gap-8 p-4 
                    bg-card text-card-foreground min-h-[30vh] m-auto rounded shadow">
      <PropertySearch />
      <PropertyGrid />
    </div>
  );
}
