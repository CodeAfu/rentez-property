import { EditUserRequest } from "@/app/user/settings/types";
import api from "@/lib/api";
import { withAuth } from "@/lib/auth";
import { mutationOptions } from "@tanstack/react-query";

const editUserInfo = withAuth(async (id: string, data: EditUserRequest) => {
  return await api.put(`/api/users/${id}`, data);
});

export const editUserInfoOptions = (id: string) =>
  mutationOptions({
    mutationFn: (data: EditUserRequest) => editUserInfo(id, data),
    onError: (err) => {
      console.error(err);
    },
  });
