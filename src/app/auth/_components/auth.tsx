"use client";

import Login from "./login";
import Register from "./register";
import { Fragment } from "react";
import { useAuth } from "@/providers/auth-provider";
import Profile from "./profile";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserOptions } from "@/queries/get-current-user-query";

export default function Auth() {
  const { isAuthenticated, isAuthenticating } = useAuth();
  const { data: userData } = useQuery(getCurrentUserOptions());

  const userMessage =
    userData?.data?.firstName || userData?.data?.lastName
      ? `${userData?.data?.firstName} ${userData?.data?.lastName}`.trim() + "!"
      : userData?.data?.email + "!";

  if (isAuthenticating) return null;

  return (
    <div className="px-4 flex gap-2 items-center">
      {isAuthenticated ? (
        <Fragment>
          <Profile message={userMessage} />
        </Fragment>
      ) : (
        <Fragment>
          <Login />
          <Register />
        </Fragment>
      )}
    </div>
  );
}
