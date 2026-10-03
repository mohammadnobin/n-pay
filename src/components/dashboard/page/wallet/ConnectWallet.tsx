"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wallet, Plus, Check, ArrowLeft } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/share/PageHeading";
import { useWallet } from "@/hooks/useWallet";
import { walletProviders } from "@/constants/dashboard";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

/** Picking a provider links it and returns to the dashboard, where the balance
 *  now reads from it. Picking a different one swaps the connection, so a wallet
 *  can be changed at any time without disconnecting first. */
export function ConnectWallet() {
  const { t } = useLang();
  const router = useRouter();
  const { provider, connect } = useWallet();

  function choose(name: string) {
    connect(name);
    router.push(routes.dashboard);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeading
        eyebrow={t("navWallet")}
        title={t("connectTitlePage")}
        note={t("providerNote")}
      />
      <p className="mx-auto max-w-2xl rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">
        {t("singleWalletLimit")}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {walletProviders.map((row) => {
          const connected = row.name === provider;
          return (
            <button
              key={row.name}
              type="button"
              aria-pressed={connected}
              onClick={() => choose(row.name)}
              className={cn(
                "flex cursor-pointer items-center gap-4 rounded-2xl bg-card p-5 text-start shadow-card transition-shadow hover:shadow-lg",
                connected && "ring-2 ring-primary",
              )}
            >
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-xl bg-muted",
                  row.tone,
                )}
              >
                <Wallet size={23} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{row.name}</span>
                <span className="text-xs text-muted-foreground">
                  {connected ? t("walletConnected") : row.network}
                </span>
              </span>
              {connected ? (
                <Check size={18} className="ms-auto text-primary" />
              ) : (
                <Plus size={18} className="ms-auto text-muted-foreground" />
              )}
            </button>
          );
        })}
      </div>
      <Card className="mx-auto max-w-2xl">
        <h2 className="section-title">{t("nonCustodial")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t("nonCustodialNote")}
        </p>
      </Card>
      <Button variant="outline" asChild className="rounded-full">
        <Link href={provider ? routes.wallet : routes.dashboard}>
          <ArrowLeft size={17} className="rtl:rotate-180" />
          {t("back")}
        </Link>
      </Button>
    </div>
  );
}
