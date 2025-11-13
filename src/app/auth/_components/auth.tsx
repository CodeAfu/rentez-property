"use client";
import useAuth from "@/hooks/useAuth";
import Login from "./login";
import Register from "./register";

export default function Auth() {
  const isAuthenticated = useAuth();
  if (isAuthenticated) return null;
  return (
    <div className="px-4 flex gap-2 items-center">
      <Login />
      <Register />
    </div>
  );
}
