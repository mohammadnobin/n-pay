export type TransactionStatus = "completed" | "pending" | "failed";
export interface Transaction {
  id: string;
  merchant: string;
  category: "dining" | "shopping" | "travel" | "stay";
  date: string;
  amount: number;
  asset: string;
  fiatAmount: number;
  status: TransactionStatus;
  reference: string;
}
export interface Wallet {
  id: string;
  name: string;
  address: string;
  network: string;
  asset: string;
  balance: number;
  usdValue: number;
}
export interface Profile {
  name: string;
  phone: string;
  secondaryPhones: string[];
  maxSecondaryPhones: number;
  kycStatus: "not_started" | "pending" | "verified" | "rejected";
  walletRelinkRequired: boolean;
}
export interface MarketRate {
  symbol: string;
  name: string;
  quote: string;
  price: number;
  change24h: number;
}
export interface Overview {
  profile: Profile;
  wallets: Wallet[];
  transactions: Transaction[];
  spent: number;
  payments: number;
  fxRate: number;
  fxUpdatedAt: string;
  /** Optional: omitted by backends that do not publish market data yet. */
  rates?: MarketRate[];
}
export interface Quote {
  id: string;
  merchant: string;
  fiatAmount: number;
  cryptoAmount: number;
  fee: number;
  total: number;
  asset: string;
  rate: number;
  expiresAt: string;
}
/** Profile as the dashboard screens present it: the REST `Profile` plus the
 *  display-only details the profile page shows. */
export interface DashboardProfile extends Profile {
  email: string;
  country: string;
  memberSince: string;
  /** ISO date the identity check cleared; absent until it does. */
  kycVerifiedOn?: string;
  username: string;
  referralCode: string;
  /** Government ID type on file; absent until verification starts. */
  idType?: string;
  /** Government ID number on file; absent until the check clears. */
  idNumber?: string;
  /** Stable account identifier shown in support requests. */
  userId: string;
  /** Data URL of a locally-chosen photo; absent until the traveler sets one. */
  avatarUrl?: string;
}
export interface WalletProvider {
  name: string;
  network: string;
  /** Text colour class for the provider tile icon. */
  tone: string;
}
export interface Balance {
  asset: string;
  name: string;
  amount: number;
  usdValue: number;
  change24h: number;
}
export interface Merchant {
  id: string;
  name: string;
  code: string;
  city: string;
  /** Doubles as the translation key for the displayed label. */
  category: Transaction["category"];
  verifiedSince: string;
}
/** Quote as the pay-flow screens present it, fees itemised. `Quote` above stays
 *  the shape the REST endpoint returns. */
export interface PriceQuote {
  id: string;
  merchantId: string;
  asset: string;
  fiatCurrency: string;
  fiatAmount: number;
  rate: number;
  cryptoAmount: number;
  networkFee: number;
  serviceFee: number;
  total: number;
}
export interface Session {
  profile: Profile;
}
/** A signed-in device, as the Active Sessions screen lists them. */
export interface DeviceSession {
  id: string;
  device: string;
  platform: string;
  ip: string;
  lastActiveAt: string;
  current: boolean;
}
/** An account notice in the navbar's notification dropdown. `titleKey` and
 *  `noteKey` are translation keys, not raw copy. */
export interface AppNotification {
  id: string;
  category: "kyc" | "security" | "payment" | "wallet";
  titleKey: string;
  noteKey: string;
  createdAt: string;
  read: boolean;
}
