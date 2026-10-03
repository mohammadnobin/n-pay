"use client";
import Link from "next/link";
import { Check, Receipt } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  dashboardMerchant,
  dashboardQuote,
  dashboardTransactions,
} from "@/constants/dashboard";
import { routes } from "@/constants/routes";
import { money } from "@/lib/utils";

export function PaymentSuccess() {
  const { t, lang: locale } = useLang();
  const q = dashboardQuote;
  const reference = dashboardTransactions[0].id;
  const rows = [
    [t("reference"), reference],
    [t("merchantLabel"), dashboardMerchant.name],
    [t("amount"), `${q.total.toFixed(2)} ${q.asset}`],
    [t("localAmount"), money(q.fiatAmount, locale, q.fiatCurrency)],
  ];
  return (
    <div className="mx-auto max-w-lg py-10">
      <Card className="text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/15 text-success">
          <Check size={32} strokeWidth={3} />
        </span>
        <h1 className="mt-6 text-2xl font-bold">{t("successTitle")}</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {t("successNote")}
        </p>
        <p className="mt-6 text-4xl font-bold" dir="ltr">
          {q.total.toFixed(2)} {q.asset}
        </p>
        <dl className="mt-8 space-y-4 text-start text-sm">
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
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="outline" asChild className="flex-1 rounded-full">
            <Link href={routes.transaction(reference)}>
              <Receipt size={17} />
              {t("viewReceipt")}
            </Link>
          </Button>
          <Button asChild className="flex-1 rounded-full">
            <Link href={routes.dashboard}>{t("backToDashboard")}</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
