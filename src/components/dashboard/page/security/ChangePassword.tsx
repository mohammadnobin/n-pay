"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Lock, ShieldCheck } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SecureInput } from "@/components/share/SecureInput";
import { PageHeading } from "@/components/share/PageHeading";
import {
  changePasswordSchema,
  type ChangePasswordValues,
} from "@/schemas/security.schema";

export function ChangePassword() {
  const { t } = useLang();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  function submit() {
    toast.success(t("passwordUpdated"));
    reset();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeading
        title={t("changePasswordTitle")}
        note={t("changePasswordNote")}
      />
      <Card>
        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-5"
          noValidate
        >
          <div>
            <label htmlFor="current-password" className="field-label">
              {t("currentPassword")}
            </label>
            <SecureInput
              id="current-password"
              icon={Lock}
              autoComplete="current-password"
              {...register("currentPassword")}
              aria-invalid={!!errors.currentPassword}
              aria-describedby={
                errors.currentPassword ? "current-password-error" : undefined
              }
            />
            {errors.currentPassword && (
              <p id="current-password-error" className="field-error">
                {t(errors.currentPassword.message!)}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="new-password" className="field-label">
              {t("newPassword")}
            </label>
            <SecureInput
              id="new-password"
              icon={ShieldCheck}
              autoComplete="new-password"
              {...register("newPassword")}
              aria-invalid={!!errors.newPassword}
              aria-describedby={
                errors.newPassword ? "new-password-error" : undefined
              }
            />
            {errors.newPassword && (
              <p id="new-password-error" className="field-error">
                {t(errors.newPassword.message!)}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirm-new-password" className="field-label">
              {t("confirmNewPassword")}
            </label>
            <SecureInput
              id="confirm-new-password"
              icon={ShieldCheck}
              autoComplete="new-password"
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={
                errors.confirmPassword
                  ? "confirm-new-password-error"
                  : undefined
              }
            />
            {errors.confirmPassword && (
              <p id="confirm-new-password-error" className="field-error">
                {t(errors.confirmPassword.message!)}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full rounded-full"
            disabled={isSubmitting}
          >
            {t("updatePassword")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
