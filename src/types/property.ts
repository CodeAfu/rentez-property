import { z } from "zod";
import { Pagination } from "@/types/pagination";

export const propertySchema = z.object({
  id: z.guid(),
  ownerId: z.guid().optional(),
  tenantId: z.guid().optional(),
  title: z.string(),
  description: z.string(),
  rent: z.number(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  images: z.array(z.string()),
  createdAt: z.date(),
  depositRequired: z.boolean().optional(),
  billsIncluded: z
    .object({
      wifi: z.boolean(),
      electricity: z.boolean(),
      water: z.boolean(),
      gas: z.boolean(),
    })
    .optional(),
  roomType: z
    .enum(["Master Bedroom", "Medium Room", "Small Room", "Studio"])
    .optional(),
  preferredRaces: z.array(z.string()),
  preferredOccupation: z.array(z.string()),
  leaseTermCategoryMonths: z.int(),
});

export type Property = z.infer<typeof propertySchema>;

export type PaginatedProperty = {
  items: Property[];
  pagination: Pagination;
};
