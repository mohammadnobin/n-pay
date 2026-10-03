"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CoinIcon } from "@/components/share/CoinIcon";
import { routes } from "@/constants/routes";
import { cn, money } from "@/lib/utils";
import type { Balance } from "@/types";

/** Signed and localised. Zero stays unsigned so a flat position does not read
 *  as a gain. */
function percent(value: number, locale: string, signed = true) {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    signDisplay: signed ? "exceptZero" : "auto",
    maximumFractionDigits: 1,
  }).format(value / 100);
}

/** The one figure the screen exists to show, its recent direction, and the
 *  split behind it. The eye covers every number here, so the card can be read
 *  in public without showing the room what is in the wallet. */
export function BalanceCard({
  total,
  balances,
  trend,
}: {
  total: number;
  balances: Balance[];
  trend: { percent: number; days: number };
}) {
  const { t, lang: locale } = useLang();
  const [hidden, setHidden] = useState(false);
  const up = trend.percent >= 0;
  const Trend = up ? TrendingUp : TrendingDown;
  return (
    <Card className="@container bg-[var(--balance-panel)] p-6 text-white sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-white/60">
            {t("totalBalance")}
          </p>

          <div className="mt-1.5 flex items-center gap-3">
            <p
              className="truncate text-4xl font-bold tracking-tight sm:text-5xl"
              dir="ltr"
            >
              {hidden ? "••••••" : money(total, locale)}
            </p>
            <button
              type="button"
              aria-pressed={hidden}
              aria-label={t(hidden ? "showBalance" : "hideBalance")}
              onClick={() => setHidden((value) => !value)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white/60 transition-colors hover:bg-white/25 hover:text-white"
            >
              {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span
              dir="ltr"
              className={cn(
                "flex items-center gap-1 font-semibold",
                up ? "text-[#7fe3c4]" : "text-[#ffd0d0]",
              )}
            >
              <Trend size={15} />
              {percent(trend.percent, locale)}
            </span>
            <span className="text-white/60">
              {t("vsLastDays", { days: trend.days })}
            </span>
          </p>
        </div>

        <Button
          asChild
          size="sm"
          className="rounded-full border-0 bg-white/15 text-white hover:bg-white/25"
        >
          <Link href={routes.wallet}>
            {t("viewWallet")}
            <ArrowRight size={15} className="rtl:rotate-180" />
          </Link>
        </Button>
      </div>

      {balances.length === 0 ? (
        <p className="mt-7 text-sm text-white/60">{t("noBalances")}</p>
      ) : (
        // Three columns once the card is wide enough for them; on a phone the
        // same holdings read as compact rows — asset on one side, what it is
        // worth on the other — instead of three stacked blocks that push the
        // rest of the screen down.
        <ul className="mt-7 grid gap-4 @sm:grid-cols-3 @sm:gap-5">
          {balances.map((row) => (
            <li key={row.asset} className="flex items-center gap-3">
              <CoinIcon symbol={row.asset} size={34} />
              <div className="flex min-w-0 flex-1 items-center justify-between gap-3 @sm:block">
                <p className="text-xs font-medium text-white/60">{row.asset}</p>
                <div className="min-w-0 text-end @sm:text-start">
                  <p className="truncate text-base font-bold" dir="ltr">
                    {hidden ? "••••" : money(row.usdValue, locale)}
                  </p>
                  <p className="text-xs text-white/50" dir="ltr">
                    {total > 0
                      ? percent((row.usdValue / total) * 100, locale, false)
                      : "—"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
