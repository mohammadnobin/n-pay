"use client";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { walletProviders } from "@/constants/dashboard";
import { routes } from "@/constants/routes";

/** Stands in for the balance card until a wallet is linked. The whole panel is
 *  the target, because linking one is the only thing to do here. */
export function ConnectWalletCard() {
  const { t } = useLang();
  const names = walletProviders.map((row) => row.name.replace(" Wallet", ""));
  const list = `${names.slice(0, -1).join(", ")} ${t("or")} ${names.at(-1)}`;
  return (
    <Link
      href={routes.walletConnect}
      className="block rounded-2xl bg-[var(--balance-panel)] p-7 text-white shadow-card transition-transform hover:-translate-y-0.5 sm:p-8"
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-white/10">
        <Link2 size={22} />
      </span>
      <h2 className="mt-6 max-w-xs text-3xl leading-tight font-bold tracking-tight whitespace-pre-line">
        {t("connectWalletTitle")}
      </h2>
      <p className="mt-4 text-sm text-white/60">{list}</p>
    </Link>
  );
}
