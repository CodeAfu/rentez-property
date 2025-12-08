"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "@/types/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

interface NavButtonProps extends HTMLAttributes<HTMLButtonElement> {
  route: NavLink;
}

export default function NavButton({ route, ...props }: NavButtonProps) {
  const pathname = usePathname();
  return (
    <Button
      asChild
      key={route.href}
      variant="ghost"
      className={cn("h-full rounded-none font-semibold text-base border-b border-b-transparent", route.href === pathname && "border-b-accent")}
      {...props}
    >
      <Link href={route.href}>{route.label}</Link>
    </Button>
  );
}
