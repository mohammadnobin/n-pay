export const routes = {
  // Public
  home: "/",
  howItWorks: "/how-it-works",
  safety: "/safety",
  support: "/support",
  contact: "/contact",
  // Same reason as `transaction` below: a static export has one blog page, and
  // the post it shows comes from the query string.
  blogPost: (id: number | string) =>
    `/blog/details?id=${encodeURIComponent(String(id))}`,
  // Authentication
  login: "/login",
  register: "/register",
  otp: "/otp",
  // Dashboard
  dashboard: "/dashboard",
  payScan: "/pay/scan",
  payMerchant: "/pay/merchant",
  payQuote: "/pay/quote",
  payConfirm: "/pay/confirm",
  payProcessing: "/pay/processing",
  paySuccess: "/pay/success",
  transactions: "/transactions",
  // A query string, not a path segment: the site is a static export, so every
  // route has to be a file that exists before any id does.
  transaction: (id: string) =>
    `/transactions/details?id=${encodeURIComponent(id)}`,
  wallet: "/wallet",
  walletConnect: "/wallet/connect",
  kyc: "/kyc",
  kycDetails: "/kyc/details",
  profile: "/profile",
  phoneNumbers: "/profile/phone-numbers",
  security: "/security",
  changePassword: "/security/change-password",
  transactionPin: "/security/transaction-pin",
  twoFactor: "/security/two-factor",
  activeSessions: "/security/active-sessions",
  deleteAccount: "/security/delete-account",
  settings: "/settings",
} as const;
