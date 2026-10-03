"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { personalService } from "@/services/personal.service";
import { queryKeys } from "@/lib/query-keys";
import type { Overview, Wallet } from "@/types";
export const useOverview = () =>
  useQuery({
    queryKey: queryKeys.personal.overview,
    queryFn: personalService.overview,
  });
export const useTransactions = () =>
  useQuery({
    queryKey: queryKeys.personal.transactions,
    queryFn: personalService.transactions,
  });
export const useWallets = () =>
  useQuery({
    queryKey: queryKeys.personal.wallets,
    queryFn: personalService.wallets,
  });
export const useProfile = () =>
  useQuery({
    queryKey: queryKeys.personal.profile,
    queryFn: personalService.profile,
  });
export const useResolveMerchant = () =>
  useMutation({ mutationFn: personalService.resolveMerchant });
export const useQuote = () =>
  useMutation({ mutationFn: personalService.quote });
export const useWalletLink = () =>
  useMutation({ mutationFn: personalService.startWalletLink });
export const useVerification = () =>
  useMutation({ mutationFn: personalService.startVerification });
export const useApproval = () =>
  useMutation({ mutationFn: personalService.requestApproval });
export const useAddPhone = () =>
  useMutation({ mutationFn: personalService.addPhone });

export const useVerifyPhone = () =>
  useMutation({ mutationFn: personalService.verifyPhone });

export function useDisconnectWallet() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: personalService.disconnectWallet,
    onMutate: async () => {
      await Promise.all([
        client.cancelQueries({ queryKey: queryKeys.personal.wallets }),
        client.cancelQueries({ queryKey: queryKeys.personal.overview }),
      ]);
    },
    onSuccess: async (_, walletId) => {
      client.setQueryData<Wallet[]>(queryKeys.personal.wallets, (old) =>
        old?.filter((wallet) => wallet.id !== walletId),
      );
      client.setQueryData<Overview>(queryKeys.personal.overview, (old) =>
        old
          ? {
              ...old,
              wallets: old.wallets.filter((wallet) => wallet.id !== walletId),
            }
          : old,
      );
      await Promise.all([
        client.invalidateQueries({ queryKey: queryKeys.personal.wallets }),
        client.invalidateQueries({ queryKey: queryKeys.personal.overview }),
        client.invalidateQueries({ queryKey: queryKeys.personal.profile }),
      ]);
    },
  });
}
