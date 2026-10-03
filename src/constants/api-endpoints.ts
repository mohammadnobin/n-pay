export const sharedEndpoints = {
  configuration: "/auth/configuration",
  requestOtp: "/auth/otp/request",
  verifyOtp: "/auth/otp/verify",
  session: "/auth/session",
  logout: "/auth/logout",
  contact: "/contact",
} as const;
export const personalEndpoints = {
  overview: "/personal/overview",
  transactions: "/personal/transactions",
  wallets: "/personal/wallets",
  walletDisconnect: (walletId: string) =>
    `/personal/wallets/${encodeURIComponent(walletId)}`,
  walletLink: "/personal/wallets/link",
  kyc: "/personal/verification",
  kycStart: "/personal/verification/session",
  merchantResolve: "/personal/payments/resolve",
  quote: "/personal/payments/quote",
  approval: "/personal/payments/approval",
  profile: "/personal/profile",
  phones: "/personal/profile/phones",
  verifyPhone: "/personal/profile/phones/verify",
} as const;
