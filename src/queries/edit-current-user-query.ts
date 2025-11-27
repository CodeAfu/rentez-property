import { EditUserRequest } from "@/app/user/settings/types";
import api from "@/lib/api";
import { withAuth } from "@/lib/auth";
import { NULL_DATE_ENTRY } from "@/lib/consts";
import { mutationOptions } from "@tanstack/react-query";
import axios from "axios";

const editUserInfo = withAuth(async (id: string, data: EditUserRequest) => {
  const formattedData = {
    ...data,
    dateOfBirth: data.dateOfBirth
      ? new Date(data.dateOfBirth).toISOString()
      : NULL_DATE_ENTRY,
  };
  console.log(formattedData);
  return await api.put(`/api/users/${id}`, formattedData);
});

export const editUserInfoOptions = (id: string) =>
  mutationOptions({
    mutationFn: (data: EditUserRequest) => editUserInfo(id, data),
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
      }
    },
  });
