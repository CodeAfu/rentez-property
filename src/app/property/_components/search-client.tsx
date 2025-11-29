"use client";

import { useMemo, useState, useEffect } from "react";
import { PropertyCard } from "./property-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { PaginatedProperty } from "@/types/property";
import z from "zod";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PropertyFilters } from "./property-filters";
import Link from "next/link";

// 1. Schema Definition
const searchSchema = z.object({
  pageNum: z.coerce.number().int().default(1),
  lim: z.coerce.number().int().default(3),
  search: z.string().optional(),
  ownerName: z.string().optional(),
  roomTypes: z.array(z.string()).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  minRent: z.coerce.number().optional(),
  maxRent: z.coerce.number().optional(),
});

type SearchParams = z.infer<typeof searchSchema>;

// 2. Fetcher
async function getProperties(params: SearchParams) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      value.forEach((v) => qs.append(key, v));
    } else {
      qs.append(key, value.toString());
    }
  });
  const response = await api.get<PaginatedProperty>(
    `/api/Property?${qs.toString()}`,
  );
  return response.data;
}

export default function SearchClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 3. Local State for Manual Search Input
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  // Sync local state if URL changes externally (e.g. back button)
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  // 4. Parse URL Params
  const parsedQuery = useMemo(() => {
    const raw = Object.fromEntries(searchParams);
    return searchSchema.parse({
      ...raw,
      roomTypes: searchParams.getAll("roomTypes"),
    });
  }, [searchParams]);

  // 5. Query
  const { data, isLoading, isPlaceholderData } = useQuery<PaginatedProperty>({
    queryKey: ["properties", parsedQuery],
    queryFn: () => getProperties(parsedQuery),
    placeholderData: (prev) => prev,
  });

  const properties = data?.items ?? [];
  const pagination = data?.pagination;

  // 6. Unified URL Updater
  const updateUrl = (key: string, value: string | number | string[] | null) => {
    const params = new URLSearchParams(searchParams);

    // Reset page to 1 on any filter change (except page num itself)
    if (key !== "pageNum") {
      params.set("pageNum", "1");
    }

    if (
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      params.delete(key);
    } else if (Array.isArray(value)) {
      // Handle Array: Clear old keys, append new ones
      params.delete(key);
      value.forEach((v) => params.append(key, v));
    } else {
      // Handle Primitive
      params.set(key, String(value));
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar: Filters */}
        <aside className="hidden md:block">
          <PropertyFilters values={parsedQuery} onUpdate={updateUrl} />
        </aside>

        {/* Right Content */}
        <div className="flex-1">
          {/* Top Bar: Search Input & Button */}
          <div className="flex items-center flex-1 gap-8 mb-6">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Search properties by location, name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && updateUrl("search", searchTerm)
                }
                className="max-w-lg"
              />
              <Button onClick={() => updateUrl("search", searchTerm)}>
                Search
              </Button>
            </div>
            <Button asChild variant="secondary">
              <Link href="/property/create">Add Listing</Link>
            </Button>
          </div>

          {/* Results Grid */}
          <div className="mt-4">
            {isLoading && !data ? (
              <div className="py-10 text-center text-muted-foreground">
                Loading properties...
              </div>
            ) : properties.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">
                No properties match your search.
              </div>
            ) : (
              <div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Showing {properties.length} results (Page{" "}
                  {pagination?.pageNum})
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {pagination && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      disabled={
                        !pagination.hasPreviousPage || isPlaceholderData
                      }
                      onClick={() =>
                        updateUrl("pageNum", pagination.pageNum - 1)
                      }
                    >
                      Previous
                    </Button>

                    <span className="text-sm mx-2">
                      Page {pagination.pageNum} of{" "}
                      {Math.ceil(pagination.totalCount / pagination.pageSize)}
                    </span>

                    <Button
                      variant="outline"
                      disabled={!pagination.hasNextPage || isPlaceholderData}
                      onClick={() =>
                        updateUrl("pageNum", pagination.pageNum + 1)
                      }
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
