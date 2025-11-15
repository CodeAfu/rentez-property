"use client";

import useAuth from "@/hooks/useAuth";

export default function Contents() {
  const authenticated = useAuth();
  return (
    <div>
      {authenticated ? (
        <div>Contents here</div>
      ) : (
        <p className="text-red-500 text-center">
          Please login to your account
        </p>
      )}
    </div>
  )
}
