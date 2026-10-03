import { z } from "zod";
import type { Wallet } from "@/types";

export const walletConnectionsSchema = z.array(z.unknown()).max(1);

/** Re-linking reauthorizes the existing connection; it never adds another wallet. */
export function canLinkWallet(
  wallets: Wallet[],
  provider: string,
  relinkRequired = false,
): boolean {
  if (!walletConnectionsSchema.safeParse(wallets).success) return false;
  return (
    wallets.length === 0 || (relinkRequired && wallets[0].name === provider)
  );
}
