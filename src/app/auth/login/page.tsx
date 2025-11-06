"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100dvh-4rem)] max-w-7xl mx-auto mt-8 px-2">
      <div className="flex flex-col gap-4 p-12 bg-card rounded shadow">
        <div className="flex justify-between">
          <h1 className="font-semibold select-none text-xl">Login</h1>
        </div>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div>
              <label className="ml-1 select-none text-sm">Email Address:</label>
              <Input placeholder="Enter email address" />
            </div>
            <div>
              <label className="ml-1 select-none text-sm">Password:</label>
              <Input type="password" placeholder="Enter password" />
            </div>
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
