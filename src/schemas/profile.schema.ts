import { z } from "zod";
import { phoneSchema } from "@/schemas/auth.schema";
export const profileEditSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "usernameInvalid")
    .max(24, "usernameInvalid"),
  phone: phoneSchema,
});
export type ProfileEditValues = z.infer<typeof profileEditSchema>;
