"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertTriangle, Mail, Trash2, MessageSquare } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { useEditableProfile } from "@/hooks/useEditableProfile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/share/IconInput";
import { PageHeading } from "@/components/share/PageHeading";
import {
  deleteAccountSchema,
  type DeleteAccountValues,
} from "@/schemas/security.schema";

export function DeleteAccount() {
  const { t } = useLang();
  const { profile } = useEditableProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DeleteAccountValues>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { reason: "", details: "" },
  });

  function submit() {
    toast.success(t("deletionRequested"));
    reset();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeading
        title={t("deleteAccountTitle")}
        note={t("deleteAccountPageNote")}
      />
      <Card>
        <div className="flex items-start gap-3 rounded-xl bg-danger/10 p-4 text-sm text-danger">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <p>{t("deleteAccountWarning")}</p>
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="mt-6 space-y-5"
          noValidate
        >
          <div>
            <label htmlFor="account-email" className="field-label">
              {t("accountEmail")}
            </label>
            <IconInput
              id="account-email"
              icon={Mail}
              type="email"
              value={profile.email}
              readOnly
              dir="ltr"
            />
          </div>
          <div>
            <label htmlFor="delete-reason" className="field-label">
              {t("reason")}
            </label>
            <IconInput
              id="delete-reason"
              icon={Trash2}
              placeholder={t("reasonPlaceholder")}
              {...register("reason")}
              aria-invalid={!!errors.reason}
              aria-describedby={
                errors.reason ? "delete-reason-error" : undefined
              }
            />
            {errors.reason && (
              <p id="delete-reason-error" className="field-error">
                {t(errors.reason.message!)}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="delete-details" className="field-label">
              {t("details")}
            </label>
            <div className="relative">
              <MessageSquare
                size={18}
                className="pointer-events-none absolute start-4 top-4 text-muted-foreground"
              />
              <textarea
                id="delete-details"
                rows={4}
                placeholder={t("detailsPlaceholder")}
                {...register("details")}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 ps-11 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="danger"
            className="w-full rounded-full"
            disabled={isSubmitting}
          >
            {t("requestAccountDeletion")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
