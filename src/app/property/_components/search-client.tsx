"use client";

import { useMemo, useState } from "react";
import { PropertyCard } from "./property-card";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { PaginatedProperty } from "@/types/property";

async function getProperties() {
  const response = await api.get<PaginatedProperty>("/api/Property");
  return response.data;
}

export default function SearchClient() {
  // data
  const { data, isLoading } = useQuery<PaginatedProperty>({
    queryKey: ["properties"],
    queryFn: getProperties,
  });

  const all = useMemo(() => data?.items ?? [], [data?.items]);
  const pagination = data?.pagination;
  console.log("Pagination:", pagination);

  // single search input
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q) return all;
    const t = q.toLowerCase();
    return all.filter((p) =>
      [p.title, p.city, p.address]
        .filter(Boolean)
        .some((s) => s.toLowerCase().includes(t)),
    );
  }, [q, all]);

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Search properties by location, name, or city"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* single search only - results driven by `filtered` */}

      <div className="mt-4">
        {isLoading ? (
          <p>Loading properties…</p>
        ) : filtered.length === 0 ? (
          <p>No properties match your search.</p>
        ) : (
          <div>
            <p className="mb-3 text-sm text-muted-foreground">
              Showing {filtered.length} of {all.length} properties
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
