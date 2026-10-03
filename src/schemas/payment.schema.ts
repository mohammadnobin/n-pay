import { z } from "zod";
export const merchantSchema = z.object({
  qr: z.string().trim().min(3, "qrRequired").max(2048, "qrRequired"),
});
export const paymentSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "amountInvalid")
    .refine((v) => Number(v) > 0 && Number(v) <= 100000, "amountInvalid"),
  walletId: z.string().min(1, "walletRequired"),
});

export const paymentAmountSchema = paymentSchema.pick({ amount: true });
