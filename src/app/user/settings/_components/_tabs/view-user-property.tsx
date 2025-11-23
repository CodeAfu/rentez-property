"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ViewUserProperty() {
  return (
    <section className="flex flex-col gap-2">
      <div className="text-red-500">Other stuff here..</div>
      <div>Select by property id</div>
      <Button asChild className="w-fit">
        <Link href="/user/property/">Upload Lease</Link>
      </Button>
    </section>
  );
}
