import { z } from "zod";

export const propertySchema = z.object({
  id: z.guid(),
  ownerId: z.guid(),
  tenantId: z.guid(),
})