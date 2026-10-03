import { apiRequest, isDemo } from "@/lib/axios";
import { sharedEndpoints } from "@/constants/api-endpoints";
import type { Session } from "@/types";
import { demoOverview } from "./demo-data";
export const authService = {
  configuration: () =>
    isDemo
      ? Promise.resolve({ allowedCountries: ["GB", "ES", "AE", "BT", "US"] })
      : apiRequest<{ allowedCountries: string[] }>({
          url: sharedEndpoints.configuration,
        }),
  requestOtp: (
    phone: string,
    country: string,
    purpose: "login" | "register",
  ) =>
    isDemo
      ? Promise.resolve({ challengeId: "demo-challenge", expiresIn: 300 })
      : apiRequest<{ challengeId: string; expiresIn: number }>({
          url: sharedEndpoints.requestOtp,
          method: "POST",
          data: { phone, country, purpose },
        }),
  verifyOtp: (challengeId: string, code: string) =>
    isDemo
      ? code === "123456"
        ? Promise.resolve({ profile: demoOverview.profile })
        : Promise.reject(new Error("invalidOtp"))
      : apiRequest<Session>({
          url: sharedEndpoints.verifyOtp,
          method: "POST",
          data: { challengeId, code },
        }),
  session: () =>
    isDemo
      ? Promise.resolve({ profile: demoOverview.profile })
      : apiRequest<Session>({ url: sharedEndpoints.session }),
  logout: () =>
    isDemo
      ? Promise.resolve()
      : apiRequest<void>({ url: sharedEndpoints.logout, method: "POST" }),
};
