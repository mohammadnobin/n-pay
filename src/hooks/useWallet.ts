"use client";
import { useEffect } from "react";
import { useWalletStore } from "@/store/walletStore";
import { dashboardWallet, walletProviders } from "@/constants/dashboard";
import type { Wallet } from "@/types";

/** The linked wallet, or null when the traveler has not connected one yet.
 *  `hydrated` is false for the first paint, so a screen can hold its layout
 *  instead of flashing the disconnected state at someone who has a wallet. */
export function useWallet() {
  const provider = useWalletStore((s) => s.provider);
  const hydrated = useWalletStore((s) => s.hydrated);
  const hydrate = useWalletStore((s) => s.hydrate);
  const connect = useWalletStore((s) => s.connect);
  const disconnect = useWalletStore((s) => s.disconnect);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  const match = walletProviders.find((row) => row.name === provider);
  const wallet: Wallet | null = provider
    ? {
        ...dashboardWallet,
        name: provider,
        network: match?.network ?? dashboardWallet.network,
      }
    : null;

  return { wallet, provider, hydrated, connect, disconnect };
}
