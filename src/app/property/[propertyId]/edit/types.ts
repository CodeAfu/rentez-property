import z from "zod";

export const editPropertyFormSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().max(1000),
  rent: z.coerce.number().positive(),
  state: z.string().min(1),
  city: z.string().min(2),
  address: z.string().min(10),
  depositRequired: z.boolean(),
  billsIncluded: z.object({
    wifi: z.boolean(),
    electricity: z.boolean(),
    water: z.boolean(),
    gas: z.boolean(),
  }),
  roomType: z.array(z.string()).min(1),
  leaseTermCategory: z
    .array(z.string())
    .min(1, "Select at least one lease term"),
});

export type EditPropertyFormValues = z.infer<typeof editPropertyFormSchema>;
