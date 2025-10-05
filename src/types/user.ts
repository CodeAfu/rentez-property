import { z } from "zod";

export const userSchema = z.object({
  id: z.guid(),
  first_name: z.string().min(1).max(50),
  last_name: z.string().min(1).max(50),
  age: z.int().min(18).max(120),
  occupation: z.string().max(100),
  ethnicity: z.string().max(50),
  email_address: z.email(),
  password_hash: z.string().max(255),
  created_at: z.date(),
  updated_at: z.date(),
});

export type User = z.infer<typeof userSchema>;
