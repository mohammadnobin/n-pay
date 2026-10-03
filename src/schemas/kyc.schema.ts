import { z } from "zod";

export const kycDetailsSchema = z.object({
  fullName: z.string().trim().min(2, "fullNameRequired"),
  dateOfBirth: z.string().min(1, "dateOfBirthRequired"),
  country: z.string().length(2, "countryRequired"),
  address: z.string().trim().min(5, "addressRequired"),
});
export type KycDetailsValues = z.infer<typeof kycDetailsSchema>;
