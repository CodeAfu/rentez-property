import React from "react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/types/navigation";
import Link from "next/link";
import Auth from "@/components/auth";

const routes: Routes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Property",
    href: "/property",
  },
];

export default function Navbar() {
  return (
    <nav className="sticky flex items-center justify-between h-16 bg-sidebar">
      <div className="flex h-full items-center">
        <div className="px-4">ICON</div>
        {routes.map((route) => (
          <Button
            asChild
            key={route.href}
            variant="ghost"
            className="h-full rounded-none font-semibold"
          >
            <Link href={route.href}>{route.label}</Link>
          </Button>
        ))}
      </div>
      <Auth />
    </nav>
  );
}
