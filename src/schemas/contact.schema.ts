import { z } from "zod";

export const CONTACT_TOPICS = [
  "payment",
  "account",
  "partnership",
  "other",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "contactNameRequired"),
  email: z.email("contactEmailInvalid"),
  topic: z.enum(CONTACT_TOPICS, "contactTopicRequired"),
  // Long enough that a reply is actually possible, capped so the field cannot
  // be used to post an essay at the endpoint.
  message: z.string().trim().min(20, "contactMessageShort").max(2000),
});

export type ContactValues = z.infer<typeof contactSchema>;
