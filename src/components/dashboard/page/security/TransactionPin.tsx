"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { useSecurity } from "@/hooks/useSecurity";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SecureInput } from "@/components/share/SecureInput";
import { PageHeading } from "@/components/share/PageHeading";
import {
  transactionPinSchema,
  type TransactionPinValues,
} from "@/schemas/security.schema";

export function TransactionPin() {
  const { t } = useLang();
  const { hydrated, setPinSet } = useSecurity();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionPinValues>({
    resolver: zodResolver(transactionPinSchema),
    defaultValues: { pin: "", confirmPin: "" },
  });

  function submit() {
    setPinSet(true);
    toast.success(t("pinUpdated"));
    reset();
  }

  if (!hydrated) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeading
        eyebrow={t("transactionPinTitle")}
        title={t("setTransactionPinTitle")}
        note={t("setTransactionPinNote")}
      />
      <Card>
        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-5"
          noValidate
        >
          <div>
            <label htmlFor="pin" className="field-label">
              {t("enterPin")}
            </label>
            <SecureInput
              id="pin"
              icon={KeyRound}
              inputMode="numeric"
              maxLength={4}
              placeholder="0000"
              dir="ltr"
              {...register("pin")}
              aria-invalid={!!errors.pin}
              aria-describedby={errors.pin ? "pin-error" : undefined}
            />
            {errors.pin && (
              <p id="pin-error" className="field-error">
                {t(errors.pin.message!)}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirm-pin" className="field-label">
              {t("confirmPinField")}
            </label>
            <SecureInput
              id="confirm-pin"
              icon={KeyRound}
              inputMode="numeric"
              maxLength={4}
              placeholder="0000"
              dir="ltr"
              {...register("confirmPin")}
              aria-invalid={!!errors.confirmPin}
              aria-describedby={
                errors.confirmPin ? "confirm-pin-error" : undefined
              }
            />
            {errors.confirmPin && (
              <p id="confirm-pin-error" className="field-error">
                {t(errors.confirmPin.message!)}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full rounded-full"
            disabled={isSubmitting}
          >
            {t("transactionPinNote")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
