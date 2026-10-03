export const queryKeys = {
  auth: {
    configuration: ["auth", "configuration"] as const,
    session: ["auth", "session"] as const,
  },
  personal: {
    overview: ["personal", "overview"] as const,
    transactions: ["personal", "transactions"] as const,
    wallets: ["personal", "wallets"] as const,
    kyc: ["personal", "kyc"] as const,
    profile: ["personal", "profile"] as const,
  },
};
