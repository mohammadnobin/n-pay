"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { authService } from "@/services/auth.service";
export const useRequestOtp = () =>
  useMutation({
    mutationFn: ({
      phone,
      country,
      purpose,
    }: {
      phone: string;
      country: string;
      purpose: "login" | "register";
    }) => authService.requestOtp(phone, country, purpose),
  });
export const useVerifyOtp = () =>
  useMutation({
    mutationFn: ({
      challengeId,
      code,
    }: {
      challengeId: string;
      code: string;
    }) => authService.verifyOtp(challengeId, code),
  });

export const useAuthConfiguration = () =>
  useQuery({
    queryKey: queryKeys.auth.configuration,
    queryFn: authService.configuration,
  });
