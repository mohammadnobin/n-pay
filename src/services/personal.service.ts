import { apiRequest, isDemo, ApiError } from "@/lib/axios";
import { personalEndpoints as endpoints } from "@/constants/api-endpoints";
import type { Overview, Transaction, Wallet, Profile, Quote } from "@/types";
import { demoOverview } from "./demo-data";
import {
  canLinkWallet,
  walletConnectionsSchema,
} from "@/schemas/wallet.schema";
function checkWallets(wallets: Wallet[]): Wallet[] {
  if (!walletConnectionsSchema.safeParse(wallets).success)
    throw new ApiError("walletConnectionConflict");
  return wallets;
}
import { useDemoWalletStore } from "@/store/demoWalletStore";
function demoWallets() {
  return demoOverview.wallets.filter(
    (wallet) =>
      !useDemoWalletStore.getState().disconnectedIds.includes(wallet.id),
  );
}
export const personalService = {
  overview: async () => {
    const overview = isDemo
      ? { ...demoOverview, wallets: demoWallets() }
      : await apiRequest<Overview>({ url: endpoints.overview });
    checkWallets(overview.wallets);
    return overview;
  },
  transactions: () =>
    isDemo
      ? Promise.resolve(demoOverview.transactions)
      : apiRequest<Transaction[]>({ url: endpoints.transactions }),
  wallets: async () =>
    checkWallets(
      isDemo
        ? demoWallets()
        : await apiRequest<Wallet[]>({ url: endpoints.wallets }),
    ),
  profile: () =>
    isDemo
      ? Promise.resolve(demoOverview.profile)
      : apiRequest<Profile>({ url: endpoints.profile }),
  resolveMerchant: (qr: string) =>
    isDemo
      ? qr.trim() === "NP-BT-AMBIENT-001"
        ? Promise.resolve({ id: "m1", name: "Ambient Café", city: "Thimphu" })
        : Promise.reject(new ApiError("merchantNotFound"))
      : apiRequest<{ id: string; name: string; city: string }>({
          url: endpoints.merchantResolve,
          method: "POST",
          data: { qr },
        }),
  quote: (data: {
    merchantId: string;
    fiatAmount: number;
    walletId: string;
    asset: string;
  }) =>
    isDemo
      ? Promise.resolve({
          id: "demo-quote",
          merchant: "Ambient Café",
          fiatAmount: data.fiatAmount,
          cryptoAmount: data.fiatAmount / 86.42,
          fee: 0.35,
          total: data.fiatAmount / 86.42 + 0.35,
          asset: data.asset,
          rate: 86.42,
          expiresAt: new Date(Date.now() + 60000).toISOString(),
        })
      : apiRequest<Quote>({ url: endpoints.quote, method: "POST", data }),
  disconnectWallet: async (walletId: string): Promise<void> => {
    if (isDemo) {
      useDemoWalletStore.getState().disconnect(walletId);
      return;
    }
    await apiRequest<void>({
      url: endpoints.walletDisconnect(walletId),
      method: "DELETE",
    });
  },
  startWalletLink: async (wallet: string) => {
    // Re-read authoritative state before requesting a provider session.
    const [wallets, profile] = await Promise.all([
      personalService.wallets(),
      personalService.profile(),
    ]);
    if (!canLinkWallet(wallets, wallet, profile.walletRelinkRequired))
      throw new ApiError("singleWalletLimit");
    if (isDemo) throw new ApiError("providerUnavailable");
    return apiRequest<{ url: string }>({
      url: endpoints.walletLink,
      method: "POST",
      data: {
        wallet,
        ...(wallets[0] ? { walletId: wallets[0].id, relink: true } : {}),
      },
    });
  },
  startVerification: () =>
    isDemo
      ? Promise.reject(new ApiError("providerUnavailable"))
      : apiRequest<{ url: string }>({
          url: endpoints.kycStart,
          method: "POST",
        }),
  requestApproval: (quoteId: string) =>
    isDemo
      ? Promise.reject(new ApiError("providerUnavailable"))
      : apiRequest<{ url: string }>({
          url: endpoints.approval,
          method: "POST",
          headers: { "Idempotency-Key": quoteId },
          data: { quoteId },
        }),
  verifyPhone: (data: { challengeId: string; code: string }) =>
    isDemo
      ? Promise.reject(new ApiError("providerUnavailable"))
      : apiRequest<Profile>({
          url: endpoints.verifyPhone,
          method: "POST",
          data,
        }),
  addPhone: (phone: string) =>
    isDemo
      ? Promise.reject(new ApiError("providerUnavailable"))
      : apiRequest<{ challengeId: string }>({
          url: endpoints.phones,
          method: "POST",
          data: { phone },
        }),
};
