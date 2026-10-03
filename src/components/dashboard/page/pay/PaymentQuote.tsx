"use client";
import { useState } from "react";
import Link from "next/link";
import { Repeat, ArrowRight, Clock3 } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeading } from "@/components/share/PageHeading";
import { PayStepper } from "./PayStepper";
import { CoinIcon } from "@/components/share/CoinIcon";
import {
  dashboardMerchant,
  dashboardQuote,
  dashboardWallet,
} from "@/constants/dashboard";
import { routes } from "@/constants/routes";
import { money } from "@/lib/utils";

/** How long a quote is held before it has to be re-priced. */
const QUOTE_TTL_SECONDS = 60;

export function PaymentQuote() {
  const { t, lang: locale } = useLang();
  const [amount, setAmount] = useState(String(dashboardQuote.fiatAmount));
  const q = dashboardQuote;
  const rows = [
    [t("rate"), `1 ${q.asset} = ${money(q.rate, locale, q.fiatCurrency)}`],
    [t("networkFee"), `${q.networkFee.toFixed(2)} ${q.asset}`],
    [t("serviceFee"), `${q.serviceFee.toFixed(2)} ${q.asset}`],
  ];
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeading
        eyebrow={t("navPay")}
        title={t("quoteTitle")}
        note={t("quoteNote")}
      />
      <PayStepper current={2} />
      <Card>
        <span className="icon-box bg-accent text-primary">
          <Repeat size={23} />
        </span>
        <p className="mt-5 text-sm text-muted-foreground">
          {t("payingTo")} <strong>{dashboardMerchant.name}</strong>
        </p>

        <div className="mt-6">
          <label htmlFor="amount" className="field-label">
            {t("enterAmount")} ({q.fiatCurrency})
          </label>
          <Input
            id="amount"
            dir="ltr"
            inputMode="decimal"
            className="h-14 text-2xl font-bold"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>

        <div className="mt-6 rounded-2xl bg-muted/50 p-5">
          <div className="flex items-center gap-3">
            <CoinIcon symbol={q.asset} size={28} />
            <div>
              <p className="text-2xl font-bold" dir="ltr">
                {q.cryptoAmount.toFixed(2)} {q.asset}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("payFrom")} {dashboardWallet.name}
              </p>
            </div>
            <span className="ms-auto flex items-center gap-1.5 text-xs font-medium text-warning">
              <Clock3 size={14} />
              {t("quoteExpires", { seconds: QUOTE_TTL_SECONDS })}
            </span>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            {rows.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-5">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-end font-medium" dir="ltr">
                  {value}
                </dd>
              </div>
            ))}
            <div className="flex justify-between gap-5 border-t border-border pt-3 text-base font-bold">
              <dt>{t("total")}</dt>
              <dd dir="ltr">
                {q.total.toFixed(2)} {q.asset}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button variant="outline" asChild className="rounded-full">
            <Link href={routes.payMerchant}>{t("back")}</Link>
          </Button>
          <Button asChild className="flex-1 rounded-full">
            <Link href={routes.payConfirm}>
              {t("continue")}
              <ArrowRight size={17} className="rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
