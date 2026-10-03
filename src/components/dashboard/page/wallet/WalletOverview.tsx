"use client";
import Link from "next/link";
import { Wallet, ShieldCheck, Unplug, Repeat, ArrowRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CoinIcon } from "@/components/share/CoinIcon";
import { EmptyState } from "@/components/share/EmptyState";
import { PageHeading } from "@/components/share/PageHeading";
import { useWallet } from "@/hooks/useWallet";
import { dashboardBalances } from "@/constants/dashboard";
import { routes } from "@/constants/routes";
import { money } from "@/lib/utils";

/** The one linked wallet and what it holds. Switching providers happens on the
 *  connect screen, so this page only links there. */
export function WalletOverview() {
  const { t, lang: locale } = useLang();
  const { wallet, hydrated, disconnect } = useWallet();
  if (!hydrated) return null;

  if (!wallet)
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <PageHeading
          eyebrow={t("navWallet")}
          title={t("walletTitle")}
          note={t("walletDescription")}
        />
        <EmptyState
          icon={Wallet}
          title={t("noWallets")}
          note={t("noBalancesNote")}
        />
        <Button asChild className="rounded-full">
          <Link href={routes.walletConnect}>
            {t("linkWallet")}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </Button>
      </div>
    );

  const total = dashboardBalances.reduce((sum, row) => sum + row.usdValue, 0);
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeading
        eyebrow={t("navWallet")}
        title={t("walletTitle")}
        note={t("walletDescription")}
      />

      <Card>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="icon-box bg-accent text-primary">
              <Wallet size={24} />
            </span>
            <div>
              <h2 className="text-lg font-semibold">{wallet.name}</h2>
              <p className="text-xs text-muted-foreground">{wallet.network}</p>
            </div>
          </div>
          <Badge>
            <ShieldCheck size={12} />
            {t("active")}
          </Badge>
        </div>
        <p className="mt-7 text-3xl font-semibold" dir="ltr">
          {money(total, locale)}
        </p>
        <p
          dir="ltr"
          className="mt-4 truncate rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground"
        >
          {wallet.address}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
          <Button asChild variant="outline" className="rounded-full">
            <Link href={routes.walletConnect}>
              <Repeat size={16} />
              {t("changeWallet")}
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={disconnect}
            className="rounded-full border-danger/25 text-danger hover:bg-danger/10"
          >
            <Unplug size={16} />
            {t("disconnectWallet")}
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="section-title">{t("balancesTitle")}</h2>
        <ul className="mt-5 space-y-4">
          {dashboardBalances.map((row) => (
            <li
              key={row.asset}
              className="flex items-center gap-3 border-b border-border pb-4 last:border-b-0 last:pb-0"
            >
              <CoinIcon symbol={row.asset} size={34} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.asset}</p>
              </div>
              <div className="ms-auto text-end">
                <p className="text-sm font-semibold" dir="ltr">
                  {row.amount.toLocaleString(locale, {
                    maximumFractionDigits: 6,
                  })}{" "}
                  {row.asset}
                </p>
                <p className="text-xs text-muted-foreground" dir="ltr">
                  {money(row.usdValue, locale)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="flex items-start gap-4 bg-accent/40">
        <ShieldCheck className="shrink-0 text-primary" />
        <div>
          <h2 className="text-sm font-semibold">{t("nonCustodial")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("nonCustodialNote")}
          </p>
        </div>
      </Card>
    </div>
  );
}
