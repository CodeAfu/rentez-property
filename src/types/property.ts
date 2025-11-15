import { z } from "zod";

export const propertySchema = z.object({
  id: z.guid(),
  ownerId: z.guid(),
  tenantId: z.guid(),
  title: z.string(),
  description: z.string(),
  pricePerMonth: z.number(),
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
