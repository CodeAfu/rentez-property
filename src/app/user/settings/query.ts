import api from "@/lib/api";
import decodeToken, { withAuth } from "@/lib/auth";
import { queryOptions } from "@tanstack/react-query";

const getUserOverview = withAuth(async () => {
  return api.get("/api/users/u");
});

export const getCurrentUserOptions = () =>
  queryOptions({
    queryKey: ["api", "users", "u", decodeToken("accessToken")],
    queryFn: getUserOverview,
  });
