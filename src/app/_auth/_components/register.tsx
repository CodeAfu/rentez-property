import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <Button size="sm" variant="outline" asChild>
      <Link href="#">Register</Link>
    </Button>
  );
}
