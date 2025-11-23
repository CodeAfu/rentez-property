"use client";

import { Button } from "@/components/ui/button";
import { tabs } from "../tabs";
import { useRouter } from "next/navigation";

export default function Menus() {
  const router = useRouter();
  return (
    <div className="p-4 pl-8 flex flex-col w-full sm:max-w-64 max-w-40 sm:text-base text-sm font-semibold text-primary-foreground">
      {Object.entries(tabs).map(([key, tab]) => (
        <Button
          key={key}
          variant="link"
          size="sm"
          className="p-0 h-fit w-fit tracking-tighter hover:cursor-pointer transition duration-200"
          onClick={() => router.push(`?tab=${key}`)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
