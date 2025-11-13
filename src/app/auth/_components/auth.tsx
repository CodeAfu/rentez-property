"use client";
import useAuth from "@/hooks/useAuth";
import Login from "./login";
import Register from "./register";
import Logout from "./logout";
import { Fragment } from "react";

export default function Auth() {
  const isAuthenticated = useAuth();
  if (isAuthenticated === null) return null;
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
