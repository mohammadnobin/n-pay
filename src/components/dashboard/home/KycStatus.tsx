"use client";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { useEditableProfile } from "@/hooks/useEditableProfile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/share/StatusBadge";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types";

/** Identity gates payments, so the card leads with what the traveler can do
 *  right now rather than with the name of the check. */
const HEADLINES: Record<Profile["kycStatus"], string> = {
  verified: "kycReadyToPay",
  pending: "kycInReview",
  not_started: "kycVerifyNow",
  rejected: "kycActionNeeded",
};

/** How many of the verification screen's three steps the provider has cleared. */
const CLEARED: Record<Profile["kycStatus"], number> = {
  not_started: 0,
  rejected: 1,
  pending: 2,
  verified: 3,
};

const ICONS: Record<Profile["kycStatus"], LucideIcon> = {
  verified: ShieldCheck,
  pending: ShieldCheck,
  not_started: ShieldAlert,
  rejected: ShieldX,
};

const TONES: Record<Profile["kycStatus"], string> = {
  verified: "bg-success/12 text-success",
  pending: "bg-accent text-primary",
  not_started: "bg-warning/12 text-warning",
  rejected: "bg-danger/12 text-danger",
};

const TOTAL_STEPS = 3;

export function KycStatus() {
  const { t, lang: locale } = useLang();
  const { profile, update } = useEditableProfile();

  const status = profile.kycStatus;
  const done = status === "verified";
  const cleared = CLEARED[status];
  const Icon = ICONS[status];
  const date =
    profile.kycVerifiedOn &&
    new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
      new Date(profile.kycVerifiedOn),
    );

  function toggleDemoStatus(nextDone: boolean) {
    update(
      nextDone
        ? { kycStatus: "verified", kycVerifiedOn: new Date().toISOString() }
        : { kycStatus: "not_started", kycVerifiedOn: undefined },
    );
  }

  return (
    // A container, not a breakpoint: this card is a narrow side column on a
    // wide screen and a full-width panel on a stacked one, so it has to size
    // itself by its own width.
    <Card className="@container flex h-full flex-col border border-border p-6 shadow-none">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">{t("identityStatus")}</p>
        <StatusBadge status={status} />
      </div>

      <div className="mt-5 flex items-center gap-4">
        <span
          className={cn(
            "flex size-14 shrink-0 items-center justify-center rounded-2xl",
            TONES[status],
          )}
        >
          <Icon size={27} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xl font-bold tracking-tight">
            {t(HEADLINES[status])}
          </p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {done && date
              ? t("verifiedOn", { date })
              : t("stepsComplete", { done: cleared, total: TOTAL_STEPS })}
          </p>
        </div>
        <Switch
          checked={done}
          onCheckedChange={toggleDemoStatus}
          aria-label={t("kycDemoToggle")}
          className="shrink-0 [&>span]:shadow-none"
        />
      </div>

      {!done && (
        <div
          role="progressbar"
          aria-valuenow={cleared}
          aria-valuemin={0}
          aria-valuemax={TOTAL_STEPS}
          aria-label={t("identityStatus")}
          className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted"
        >
          <span
            className="block h-full rounded-full bg-primary transition-[width]"
            style={{ width: `${(cleared / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      )}

      {/* `mt-auto` pushes the action to the foot of a tall card; the padding
       *  keeps it off the text when the card is only as tall as its content. */}
      <div className="mt-auto pt-6">
        <Button
          asChild
          variant={done ? "outline" : "default"}
          className={cn(
            // Full width while the card is a narrow column; once it has room,
            // a stretched pill just looks stranded.
            "w-full rounded-full @md:w-fit @md:px-8",
            // The verified state swaps surfaces with the card: the card keeps
            // the plain white panel, the button takes the tinted one.
            done && "bg-[#f6f6fa] dark:bg-[#1c1c24]",
          )}
        >
          <Link href={routes.kyc}>
            {t(done ? "details" : "completeVerification")}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
