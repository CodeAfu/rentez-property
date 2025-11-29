import { Suspense } from "react";
import SearchClient from "./_components/search-client";

export default function TenantsPage() {
  return (
    <section className="min-h-screen p-2 py-8 container w-full mx-auto">
      <Suspense>
        <SearchClient />
      </Suspense>
    </section>
  );
}
