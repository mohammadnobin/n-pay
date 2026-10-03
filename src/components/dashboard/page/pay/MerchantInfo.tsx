"use client";
import Link from "next/link";
import { Store, MapPin, BadgeCheck, ArrowRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/share/PageHeading";
import { PayStepper } from "./PayStepper";
import { dashboardMerchant } from "@/constants/dashboard";
import { routes } from "@/constants/routes";

export function MerchantInfo() {
  const { t } = useLang();
  const m = dashboardMerchant;
  const rows = [
    [t("merchantCode"), m.code],
    [t("merchantCity"), m.city],
    [t("merchantCategory"), t(m.category)],
    [t("verifiedSince"), m.verifiedSince],
  ];
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeading
        eyebrow={t("navPay")}
        title={t("merchantInfoTitle")}
        note={t("merchantInfoNote")}
      />
      <PayStepper current={1} />
      <Card>
        <div className="flex items-center gap-4">
          <span className="icon-box bg-accent text-primary">
            <Store size={23} />
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold">{m.name}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin size={14} />
              {m.city}
            </p>
          </div>
          <span className="ms-auto flex shrink-0 items-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
            <BadgeCheck size={14} />
            {t("verified")}
          </span>
        </div>
        <dl className="mt-7 space-y-4 text-sm">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between gap-5 border-t border-border pt-4"
            >
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="text-end font-medium" dir="ltr">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button variant="outline" asChild className="rounded-full">
            <Link href={routes.payScan}>{t("back")}</Link>
          </Button>
          <Button asChild className="flex-1 rounded-full">
            <Link href={routes.payQuote}>
              {t("continue")}
              <ArrowRight size={17} className="rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
