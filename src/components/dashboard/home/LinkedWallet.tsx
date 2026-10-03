"use client";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Wallet as WalletIcon } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { money } from "@/lib/utils";
import type { Wallet } from "@/types";

/** An account holds at most one wallet at a time, so this shows the linked one
 *  — or the way to link the first. The value shown is the whole portfolio, not
 *  one asset leg, so it matches the total on the balance card. */
export function LinkedWallet({
  wallet,
  total,
}: {
  wallet: Wallet | null;
  total: number;
}) {
  const { t, lang: locale } = useLang();
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{t("linkedWallets")}</h2>
        {wallet && (
          <Badge>
            <ShieldCheck size={12} />
            {t("active")}
          </Badge>
        )}
      </div>
      {wallet ? (
        <>
          <div className="flex items-center gap-3">
            <span className="icon-box bg-accent text-primary">
              <WalletIcon size={22} />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold">{wallet.name}</p>
              <p className="text-xs text-muted-foreground">{wallet.network}</p>
            </div>
          </div>
          <p className="mt-5 text-2xl font-semibold" dir="ltr">
            {money(total, locale)}
          </p>
          <p
            dir="ltr"
            className="mt-4 truncate rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground"
          >
            {wallet.address}
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-4 w-full rounded-full"
          >
            <Link href={routes.wallet}>
              {t("manageWallet")}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">{t("noWallets")}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("noBalancesNote")}
          </p>
          <Button asChild className="mt-5 w-full rounded-full">
            <Link href={routes.walletConnect}>
              {t("linkWallet")}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </Button>
        </>
      )}
    </Card>
  );
}
