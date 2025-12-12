import z from "zod";

export const editUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  occupation: z.string(),
  ethnicity: z.string(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .refine(
      (date) => {
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        return new Date(date) <= eighteenYearsAgo;
      },
      { message: "Must be at least 18 years old" },
    ),
});

export type EditUserRequest = z.infer<typeof editUserSchema>;

export interface PropertyApplication {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  applicantUserId: string;
  applicantName: string;
  applicantEmail: string;
  createdAt: string;
}
