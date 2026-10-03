"use client";
import Link from "next/link";
import {
  ShieldCheck,
  UserRound,
  IdCard,
  ScanFace,
  ArrowUpRight,
} from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { useEditableProfile } from "@/hooks/useEditableProfile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/share/PageHeading";
import { StatusBadge } from "@/components/share/StatusBadge";
import { routes } from "@/constants/routes";

const STEPS = [
  [UserRound, "verifyStep1"],
  [IdCard, "verifyStep2"],
  [ScanFace, "verifyStep3"],
] as const;

export function KycVerification() {
  const { t } = useLang();
  const { profile, hydrated } = useEditableProfile();
  if (!hydrated) return null;
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeading
        eyebrow={t("navKyc")}
        title={t("verifyTitle")}
        note={t("verifyDescription")}
      />
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="flex items-center gap-3 font-semibold">
            <ShieldCheck size={25} className="text-primary" />
            {t("verification")}
          </span>
          <StatusBadge status={profile.kycStatus} />
        </div>
        <div className="my-9 grid gap-6 sm:grid-cols-3">
          {STEPS.map(([Icon, key], i) => (
            <div key={key}>
              <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon size={24} />
              </span>
              <span className="text-xs text-muted-foreground">0{i + 1}</span>
              <p className="mt-2 text-sm font-semibold">{t(key)}</p>
            </div>
          ))}
        </div>
        <Button asChild className="rounded-full">
          <Link href={routes.kycDetails}>
            {t("startVerification")}
            <ArrowUpRight size={17} />
          </Link>
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          {t("verificationProvider")}
        </p>
      </Card>
      <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
        {t("verificationPrivacy")}
      </p>
    </div>
  );
}
