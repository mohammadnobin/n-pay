import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "currentPasswordRequired"),
    newPassword: z.string().min(8, "passwordTooShort"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "passwordsMustMatch",
    path: ["confirmPassword"],
  });
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export const transactionPinSchema = z
  .object({
    pin: z.string().regex(/^\d{4}$/, "pinInvalid"),
    confirmPin: z.string(),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "pinsMustMatch",
    path: ["confirmPin"],
  });
export type TransactionPinValues = z.infer<typeof transactionPinSchema>;

export const twoFactorCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "otpInvalid"),
});
export type TwoFactorCodeValues = z.infer<typeof twoFactorCodeSchema>;

export const deleteAccountSchema = z.object({
  reason: z.string().min(1, "reasonRequired"),
  details: z.string().max(500).optional(),
});
export type DeleteAccountValues = z.infer<typeof deleteAccountSchema>;
