"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Login() {
  const pathname = usePathname();
  return (
    <Button size="sm" variant="outline" asChild>
      <Link href={`/auth/login?redirectTo=${encodeURIComponent(pathname)}`}>
        Login
      </Link>
    </Button>
  );
}
