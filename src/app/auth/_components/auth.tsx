"use client";

import Login from "./login";
import Register from "./register";
import Logout from "./logout";
import { Fragment } from "react";
import { useAuth } from "@/providers/auth-provider";

export default function Auth() {
  const { isAuthenticated, isAuthenticating } = useAuth();
  if (isAuthenticating) return null;
  return (
    <div className="px-4 flex gap-2 items-center">
      {isAuthenticated ? (
        <Logout />
      ) : (
        <Fragment>
          <Login />
          <Register />
        </Fragment>
      )}
    </div>
  );
}
