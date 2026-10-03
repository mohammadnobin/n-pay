"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShieldCheck, ShieldOff, QrCode, KeyRound, Copy } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { useSecurity } from "@/hooks/useSecurity";
import { useEditableProfile } from "@/hooks/useEditableProfile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/share/IconInput";
import { PageHeading } from "@/components/share/PageHeading";
import {
  twoFactorCodeSchema,
  type TwoFactorCodeValues,
} from "@/schemas/security.schema";

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function generateBase32Secret(length = 16) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += BASE32_ALPHABET[Math.floor(Math.random() * BASE32_ALPHABET.length)];
  }
  return out;
}

function InfoRow({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy?: () => void;
}) {
  const { t } = useLang();
  return (
    <div className="rounded-xl bg-muted px-4 py-3">
      <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <div className="mt-1 flex items-start justify-between gap-3">
        <p className="min-w-0 break-all text-sm font-medium" dir="ltr">
          {value}
        </p>
        {onCopy && (
          <button
            type="button"
            onClick={onCopy}
            aria-label={t("copyToClipboard")}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <Copy size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

export function TwoFactorAuth() {
  const { t } = useLang();
  const { hydrated, twoFactorEnabled, setTwoFactorEnabled } = useSecurity();
  const { profile } = useEditableProfile();
  const [step, setStep] = useState<"idle" | "setup">("idle");
  const [secret] = useState(() => generateBase32Secret());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TwoFactorCodeValues>({
    resolver: zodResolver(twoFactorCodeSchema),
    defaultValues: { code: "" },
  });

  const otpauthUrl = `otpauth://totp/NomiPay:${encodeURIComponent(profile.email)}?secret=${secret}&period=30&digits=6&algorithm=SHA1&issuer=NomiPay`;

  function copy(value: string) {
    navigator.clipboard
      .writeText(value)
      .then(() => toast.success(t("copied")))
      .catch(() => toast.error(t("requestFailed")));
  }

  function confirmSetup() {
    setTwoFactorEnabled(true);
    setStep("idle");
    reset();
    toast.success(t("twoFactorEnabledToast"));
  }

  function disable() {
    setTwoFactorEnabled(false);
    setStep("idle");
    toast.success(t("twoFactorDisabledToast"));
  }

  if (!hydrated) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeading
        eyebrow={t("securityGroupLabel")}
        title={t("twoFactorTitle")}
        note={t("twoFactorPageNote")}
      />

      {twoFactorEnabled ? (
        <Card className="flex flex-wrap items-center gap-4">
          <span className="icon-box bg-success/10 text-success">
            <ShieldCheck size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{t("twoFactorEnabledTitle")}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("twoFactorEnabledNote")}
            </p>
          </div>
          <Button variant="outline" className="rounded-full" onClick={disable}>
            {t("disableTwoFactor")}
          </Button>
        </Card>
      ) : (
        <Card>
          <div className="flex flex-wrap items-center gap-4">
            <span className="icon-box bg-orange-500/10 text-orange-500">
              <ShieldOff size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{t("twoFactorNotEnabledTitle")}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("twoFactorNotEnabledNote")}
              </p>
            </div>
          </div>

          {step === "idle" ? (
            <Button className="mt-5 rounded-full" onClick={() => setStep("setup")}>
              {t("startTwoFactorSetup")}
            </Button>
          ) : (
            <div className="mt-6 grid gap-6 border-t border-border pt-6 sm:grid-cols-[10rem_1fr]">
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-muted p-6">
                <QrCode size={64} className="text-muted-foreground" />
                <p className="text-center text-xs text-muted-foreground">
                  {t("scanManually")}
                </p>
              </div>
              <div className="space-y-3">
                <InfoRow label={t("account")} value={profile.email} />
                <InfoRow label={t("issuerLabel")} value="NomiPay" />
                <InfoRow
                  label={t("manualSecretLabel")}
                  value={secret}
                  onCopy={() => copy(secret)}
                />
                <InfoRow
                  label={t("otpauthUrlLabel")}
                  value={otpauthUrl}
                  onCopy={() => copy(otpauthUrl)}
                />
              </div>
              <form
                onSubmit={handleSubmit(confirmSetup)}
                className="space-y-3 sm:col-span-2"
                noValidate
              >
                <div className="max-w-xs">
                  <label htmlFor="totp-code" className="field-label">
                    {t("authenticatorCode")}
                  </label>
                  <IconInput
                    id="totp-code"
                    icon={KeyRound}
                    inputMode="numeric"
                    maxLength={6}
                    dir="ltr"
                    {...register("code")}
                    aria-invalid={!!errors.code}
                    aria-describedby={errors.code ? "totp-code-error" : undefined}
                  />
                  {errors.code && (
                    <p id="totp-code-error" className="field-error">
                      {t(errors.code.message!)}
                    </p>
                  )}
                </div>
                <Button type="submit" className="rounded-full">
                  {t("confirmTwoFactor")}
                </Button>
              </form>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
