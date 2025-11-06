import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

export default function PropertySearch() {
  return (
    <div className="relative flex item-center justify-center mx-auto w-full max-w-4xl rounded-md overflow-hidden">
      <Input
        placeholder="Search"
        className="sm:pr-28 pr-18 md:text-xl sm:text-xl text-sm sm:h-14 h-10"
      />
      <div className="absolute right-1 space-x-0.5 top-1/2 -translate-y-1/2">
        {/* Make a dropdown */}
        <Button
          variant="ghost"
          className="sm:h-12 sm:w-12 h-8 w-8 rounded-none"
        >
          <Filter />
        </Button>
        <Button
          variant="outline"
          className="sm:h-12 sm:w-12 h-8 w-8 rounded-none"
        >
          <Search className="stroke-2" />
        </Button>
      </div>
    </div>
  );
}
