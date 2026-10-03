import type {
  AppNotification,
  Balance,
  DashboardProfile,
  DeviceSession,
  MarketRate,
  Merchant,
  PriceQuote,
  Transaction,
  Wallet,
  WalletProvider,
} from "@/types";

/**
 * Static content for the dashboard screens.
 *
 * Nothing here is fetched — these screens are a fixed design surface until the
 * REST contract is agreed. Swap these constants for a query when the backend
 * is wired; the components read the same shapes either way.
 */

/** Order matches the rate ticker in the approved design. */
export const dashboardRates: MarketRate[] = [
  {
    symbol: "SOL",
    name: "Solana",
    quote: "NGN",
    price: 131911.84,
    change24h: 1.18,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    quote: "NGN",
    price: 1361.088,
    change24h: -0.29,
  },
  {
    symbol: "USDT",
    name: "Tether",
    quote: "NGN",
    price: 1355,
    change24h: -0.06,
  },
  {
    symbol: "BNB",
    name: "BNB",
    quote: "NGN",
    price: 959765.1,
    change24h: -0.87,
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    quote: "NGN",
    price: 102693458.15,
    change24h: -2.02,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    quote: "NGN",
    price: 3214110.6,
    change24h: -3.44,
  },
];

/** The one wallet an account may link. */
export const dashboardWallet: Wallet = {
  id: "w1",
  name: "MetaMask",
  address: "0x7a2B...8f4D",
  network: "Ethereum",
  asset: "USDC",
  balance: 1250,
  usdValue: 1250,
};

/** What the linked wallet holds, per asset. The home total is the sum of these,
 *  so the figure on the balance card and the rows below it cannot disagree. */
export const dashboardBalances: Balance[] = [
  {
    asset: "USDC",
    name: "USD Coin",
    amount: 1250,
    usdValue: 1250,
    change24h: -0.29,
  },
  {
    asset: "USDT",
    name: "Tether",
    amount: 340.5,
    usdValue: 340.5,
    change24h: -0.06,
  },
  {
    asset: "SOL",
    name: "Solana",
    amount: 4.2,
    usdValue: 404.46,
    change24h: 1.18,
  },
];

/** Portfolio move over the trailing week, shown beside the total. */
export const dashboardBalanceTrend = { percent: 12.4, days: 7 };

/** Signed-in traveler. Identity status gates payments, so the home screen reads
 *  `kycStatus` from here. */
export const dashboardProfile: DashboardProfile = {
  name: "Alex Morgan",
  phone: "+447700900123",
  secondaryPhones: [],
  maxSecondaryPhones: 3,
  kycStatus: "verified",
  walletRelinkRequired: false,
  email: "alex.morgan@example.com",
  country: "GB",
  memberSince: "2025",
  kycVerifiedOn: "2026-09-14",
  username: "alexmorgan",
  referralCode: "7F3A21C9",
  idType: "NIN",
  idNumber: "AB123456C",
  userId: "9f4c1a7b-2e6d-4b3a-8c5f-1d9e6a3b7c2d",
};

/** Devices signed in to this account. The traveler's own device is always
 *  `current`; the rest are illustrative of what a shared or lost device
 *  would look like in the list. */
export const dashboardSessions: DeviceSession[] = [
  {
    id: "session-current",
    device: "NomiPay Web",
    platform: "Web",
    ip: "::f...0.1",
    lastActiveAt: "2026-09-17T11:07:00+06:00",
    current: true,
  },
  {
    id: "session-unknown",
    device: "Unknown device",
    platform: "Unknown platform",
    ip: "::f...0.1",
    lastActiveAt: "2026-09-16T11:21:00+06:00",
    current: false,
  },
];

/** Account notices for the navbar's notification dropdown, newest first. */
export const dashboardNotifications: AppNotification[] = [
  {
    id: "n1",
    category: "kyc",
    titleKey: "notifKycVerifiedTitle",
    noteKey: "notifKycVerifiedNote",
    createdAt: "2026-09-17T09:12:00+06:00",
    read: false,
  },
  {
    id: "n2",
    category: "security",
    titleKey: "notifTwoFactorTitle",
    noteKey: "notifTwoFactorNote",
    createdAt: "2026-09-16T18:40:00+06:00",
    read: false,
  },
  {
    id: "n3",
    category: "payment",
    titleKey: "notifPaymentTitle",
    noteKey: "notifPaymentNote",
    createdAt: "2026-09-15T14:05:00+06:00",
    read: true,
  },
  {
    id: "n4",
    category: "wallet",
    titleKey: "notifWalletTitle",
    noteKey: "notifWalletNote",
    createdAt: "2026-09-14T08:30:00+06:00",
    read: true,
  },
];

/** Wallets a traveler can link. Only one connection is kept at a time. */
export const walletProviders: WalletProvider[] = [
  { name: "MetaMask", network: "Ethereum", tone: "text-orange-500" },
  { name: "Trust Wallet", network: "Multi-chain", tone: "text-blue-500" },
  { name: "Phantom", network: "Solana", tone: "text-violet-500" },
  { name: "Coinbase Wallet", network: "Ethereum", tone: "text-primary" },
  { name: "Binance Wallet", network: "BNB Chain", tone: "text-yellow-500" },
];

/** The merchant behind the sample QR code used across the pay flow. */
export const dashboardMerchant: Merchant = {
  id: "m1",
  name: "Ambient Café",
  code: "NP-BT-AMBIENT-001",
  city: "Thimphu",
  category: "dining",
  verifiedSince: "2025",
};

/** Quote for the sample payment: 1080.25 BTN at 86.42 BTN per USDC. */
export const dashboardQuote: PriceQuote = {
  id: "q1",
  merchantId: dashboardMerchant.id,
  asset: "USDC",
  fiatCurrency: "BTN",
  fiatAmount: 1080.25,
  rate: 86.42,
  cryptoAmount: 12.5,
  networkFee: 0.05,
  serviceFee: 0.13,
  total: 12.68,
};

/** Recent activity shown on the home screen and the history page. */
export const dashboardTransactions: Transaction[] = [
  {
    id: "NP-260915-1042",
    merchant: "Ambient Café",
    category: "dining",
    date: "2026-09-15T08:30:00Z",
    amount: 12.5,
    asset: "USDC",
    fiatAmount: 1080.25,
    status: "completed",
    reference: "BTN-849201",
  },
  {
    id: "NP-260914-1041",
    merchant: "Bhutan Craft Market",
    category: "shopping",
    date: "2026-09-14T11:15:00Z",
    amount: 45,
    asset: "USDC",
    fiatAmount: 3888.9,
    status: "completed",
    reference: "BTN-849182",
  },
  {
    id: "NP-260914-1040",
    merchant: "Paro Valley Stay",
    category: "stay",
    date: "2026-09-14T06:40:00Z",
    amount: 86,
    asset: "USDC",
    fiatAmount: 7432.12,
    status: "pending",
    reference: "BTN-849170",
  },
  {
    id: "NP-260913-1039",
    merchant: "Thimphu Taxi",
    category: "travel",
    date: "2026-09-13T15:00:00Z",
    amount: 8.5,
    asset: "USDC",
    fiatAmount: 734.57,
    status: "completed",
    reference: "BTN-849102",
  },
  {
    id: "NP-260912-1038",
    merchant: "Mountain Kitchen",
    category: "dining",
    date: "2026-09-12T12:00:00Z",
    amount: 22.5,
    asset: "USDC",
    fiatAmount: 1944.45,
    status: "failed",
    reference: "BTN-849081",
  },
];
