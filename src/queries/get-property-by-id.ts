import api from "@/lib/api";
import { Property } from "@/types/property";
import { queryOptions } from "@tanstack/react-query";

const getPropertyInfo = async (propertyId: string, userId?: string) => {
  const response = await api.get<Property>(`/api/property/${propertyId}`);
  if (userId && response.data.ownerId !== userId) {
    throw new Error("You are not authorized to edit contents in this page");
  }
  return response.data;
};

export const getPropertyByIdQueryOptions = (
  propertyId: string,
  userId?: string,
) =>
  queryOptions({
    queryKey: ["property", propertyId],
    queryFn: () => getPropertyInfo(propertyId, userId),
  });
