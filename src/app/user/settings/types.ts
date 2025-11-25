import z from "zod";

export const editUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  occupation: z.string(),
  ethnicity: z.string(),
  dateOfBirth: z.string(),
});

export type EditUserRequest = z.infer<typeof editUserSchema>;
