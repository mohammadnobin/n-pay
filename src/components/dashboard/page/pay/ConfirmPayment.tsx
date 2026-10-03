"use client";
import Link from "next/link";
import { ShieldCheck, Wallet } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/share/PageHeading";
import { PayStepper } from "./PayStepper";
import {
  dashboardMerchant,
  dashboardQuote,
  dashboardWallet,
} from "@/constants/dashboard";
import { routes } from "@/constants/routes";
import { money } from "@/lib/utils";

export function ConfirmPayment() {
  const { t, lang: locale } = useLang();
  const q = dashboardQuote;
  const rows = [
    [t("merchantLabel"), dashboardMerchant.name],
    [t("localAmount"), money(q.fiatAmount, locale, q.fiatCurrency)],
    [t("amount"), `${q.total.toFixed(2)} ${q.asset}`],
    [t("payFrom"), `${dashboardWallet.name} · ${dashboardWallet.address}`],
  ];
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeading
        eyebrow={t("navPay")}
        title={t("confirmTitle")}
        note={t("confirmNote")}
      />
      <PayStepper current={3} />
      <Card>
        <dl className="space-y-4 text-sm">
          {rows.map(([label, value], i) => (
            <div
              key={label}
              className={`flex justify-between gap-5 ${i > 0 ? "border-t border-border pt-4" : ""}`}
            >
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="text-end font-medium" dir="ltr">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 flex items-start gap-3 rounded-xl bg-accent p-4 text-xs leading-6 text-primary">
          <ShieldCheck size={17} className="mt-0.5 shrink-0" />
          {t("approvalNote")}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" asChild className="rounded-full">
            <Link href={routes.payQuote}>{t("back")}</Link>
          </Button>
          <Button asChild className="flex-1 rounded-full">
            <Link href={routes.payProcessing}>
              <Wallet size={17} />
              {t("approve")}
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
