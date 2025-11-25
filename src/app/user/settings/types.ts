import z from "zod";

export const editUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  occupation: z.string(),
  ethnicity: z.string(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
});

export type EditUserRequest = z.infer<typeof editUserSchema>;
