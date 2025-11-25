import api from "@/lib/api";
import { decodeToken, withAuth } from "@/lib/auth";
import { queryOptions } from "@tanstack/react-query";

const getPropertyListings = withAuth(async () => {
  return await api.get("/api/property/u");
});

export const getCurrentUserPropertyOptions = () =>
  queryOptions({
    queryKey: ["property", "u", decodeToken("accessToken")],
    queryFn: getPropertyListings,
  });
