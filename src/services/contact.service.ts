import { apiRequest, isDemo } from "@/lib/axios";
import { sharedEndpoints } from "@/constants/api-endpoints";
import type { ContactValues } from "@/schemas/contact.schema";

export const contactService = {
  // Demo builds are fully offline, so the preview accepts the message without
  // sending it anywhere — same shape as the real reply.
  send: (values: ContactValues) =>
    isDemo
      ? Promise.resolve({ received: true })
      : apiRequest<{ received: boolean }>({
          url: sharedEndpoints.contact,
          method: "POST",
          data: values,
        }),
};
