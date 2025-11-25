import api from "@/lib/api";
import { decodeToken, withAuth } from "@/lib/auth";
import { queryOptions } from "@tanstack/react-query";

const getUserOverview = withAuth(async () => {
  return await api.get("/api/users/u");
});

export const getCurrentUserOptions = () =>
  queryOptions({
    queryKey: ["users", "u", decodeToken("accessToken")],
    queryFn: getUserOverview,
  });
