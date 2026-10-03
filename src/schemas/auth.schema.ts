import { z } from "zod";
export const phoneSchema = z
  .string()
  .regex(/^\+[1-9]\d{7,14}$/, "phoneInvalid");
export const authSchema = z.object({
  phone: phoneSchema,
  country: z.string().length(2, "countryRequired"),
  consent: z.boolean().refine((v) => v, "consentRequired"),
});
export const otpSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "otpInvalid"),
});
export const secondaryPhoneSchema = z.object({ phone: phoneSchema });
export type AuthValues = z.infer<typeof authSchema>;
