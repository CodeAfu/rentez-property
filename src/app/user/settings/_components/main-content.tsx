"use client";

import { tabs } from "../tabs";
import Menus from "./menus";
import { useSearchParams } from "next/navigation";

export default function MainContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "overview";

  return (
    <div className="flex gap-2">
      {/* Left */}
      <Menus />

      {/* Right */}
      <div className="bg-card shadow flex-1 sm-p-32 p-8">
        {tabs[tabParam].node}
      </div>
    </div>
  );
}
