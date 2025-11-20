import api from "@/lib/api";
import { decodeToken, withAuth } from "@/lib/auth";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { EditUserRequest } from "./types";

const getUserOverview = withAuth(async () => {
  return api.get("/api/users/u");
});

const editUserInfo = withAuth(async (id: string, data: EditUserRequest) => {
  return api.put(`/api/users/${id}`, data);
});

export const getCurrentUserOptions = () =>
  queryOptions({
    queryKey: ["api", "users", "u", decodeToken("accessToken")],
    queryFn: getUserOverview,
  });

export const editUserInfoOptions = (id: string, data: EditUserRequest) => {
  mutationOptions({
    // mutationKey: ["api", "users", id],
    mutationFn: () => editUserInfo(id, data),
  });
};
