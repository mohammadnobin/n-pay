"use client";
import Link from "next/link";
import { ArrowLeft, Receipt } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/share/EmptyState";
import { PageHeading } from "@/components/share/PageHeading";
import { StatusBadge } from "@/components/share/StatusBadge";
import { dashboardTransactions } from "@/constants/dashboard";
import { routes } from "@/constants/routes";
import { money } from "@/lib/utils";

export function TransactionDetails({ id }: { id: string }) {
  const { t, lang: locale } = useLang();
  const tx = dashboardTransactions.find((row) => row.id === id);
  if (!tx)
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <PageHeading eyebrow={t("navTransactions")} title={t("detailsTitle")} />
        <EmptyState
          icon={Receipt}
          title={t("noTransactions")}
          note={t("noTransactionsNote")}
        />
        <Button variant="outline" asChild className="rounded-full">
          <Link href={routes.transactions}>
            <ArrowLeft size={17} className="rtl:rotate-180" />
            {t("back")}
          </Link>
        </Button>
      </div>
    );
  const rows = [
    [t("reference"), tx.reference],
    [t("merchantLabel"), tx.merchant],
    [t("amount"), `${tx.amount.toFixed(2)} ${tx.asset}`],
    [t("localAmount"), money(tx.fiatAmount, locale, "BTN")],
    [
      t("date"),
      new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Thimphu",
      }).format(new Date(tx.date)),
    ],
  ];
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeading eyebrow={t("navTransactions")} title={t("detailsTitle")} />
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xl font-bold">{tx.merchant}</p>
            <p className="mt-1 text-sm text-muted-foreground">{tx.id}</p>
          </div>
          <StatusBadge status={tx.status} />
        </div>
        <p className="mt-6 text-4xl font-bold" dir="ltr">
          {tx.amount.toFixed(2)} {tx.asset}
        </p>
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
        {tx.status === "pending" && (
          <p className="mt-6 text-xs leading-6 text-muted-foreground">
            {t("helpPendingCopy")}
          </p>
        )}
        <Button variant="outline" asChild className="mt-7 rounded-full">
          <Link href={routes.transactions}>
            <ArrowLeft size={17} className="rtl:rotate-180" />
            {t("back")}
          </Link>
        </Button>
      </Card>
    </div>
  );
}
