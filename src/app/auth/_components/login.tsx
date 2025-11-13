"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
  return (
    <Button size="sm" variant="outline" asChild>
      <Link href="/auth/login">Login</Link>
    </Button>
  );
}
