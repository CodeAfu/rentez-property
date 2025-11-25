import { EditUserRequest } from "@/app/user/settings/types";
import api from "@/lib/api";
import { decodeToken, withAuth } from "@/lib/auth";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

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

export const editUserInfoOptions = (id: string) =>
  mutationOptions({
    mutationFn: (data: EditUserRequest) => editUserInfo(id, data),
    onError: (err) => {
      console.error(err);
    },
  });
