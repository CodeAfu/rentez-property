import { Button } from "@/components/ui/button";
import { NavLink } from "@/types/navigation";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface NavButtonProps extends HTMLAttributes<HTMLButtonElement> {
  route: NavLink;
}

export default function NavButton({ route, ...props }: NavButtonProps) {
  return (
    <Button
      asChild
      key={route.href}
      variant="ghost"
      className="h-full rounded-none font-semibold text-base"
      {...props}
    >
      <Link href={route.href}>{route.label}</Link>
    </Button>
  );
}
