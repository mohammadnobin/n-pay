# useLang.tsx

Source: `src/hooks/useLang.tsx` (155 lines)

> Client component (`'use client'`).

## Imports

- `react`
- `@/i18n/en.json`
- `@/i18n/es.json`
- `@/i18n/ar.json`

## Exports

- `LANG_STORAGE_KEY`
- `DEFAULT_LANG`
- `LangCode`
- `Dir`
- `LANGUAGES`
- `Translate`
- `LangProvider`
- `useLang`

## Hooks used

- `useEffect`
- `useLang`
- `useContext`

## Renders

- `<LangContextValue>`
- `<LangCode>`
- `<LangContext.Provider>`
- `<LangProvider>`

## Outline

- `LANG_STORAGE_KEY` (const) - line 24
- `DEFAULT_LANG` (const) - line 25
- `LangCode` (type) - line 27
- `Dir` (type) - line 28
- `Language` (type) - line 30
- `LANGUAGES` (const) - line 33
- `Dict` (type) - line 39
- `DICTIONARIES` (const) - line 41
- `RTL_LANGS` (const) - line 42
- `Translate` (type) - line 45
- `LangContextValue` (type) - line 50
- `LangContext` (const) - line 60
- `lookup` (function) - line 62
- `interpolate` (function) - line 71
- `applyDocumentLang` (function) - line 81
- `detectInitialLang` (function) - line 87
- `LangProvider` (function) - line 100
- `useLang` (function) - line 148

## Imported by

- `src/app/error.tsx`
- `src/app/layout.tsx`
- `src/app/not-found.tsx`
- `src/components/auth/AuthShowcase.tsx`
- `src/components/auth/OtpForm.tsx`
- `src/components/dashboard/DashboardHome.tsx`
- `src/components/dashboard/DashboardShell.tsx`
- `src/components/dashboard/NotificationsMenu.tsx`
- `src/components/dashboard/SidebarTooltip.tsx`
- `src/components/dashboard/home/BalanceCard.tsx`
- `src/components/dashboard/home/ConnectWalletCard.tsx`
- `src/components/dashboard/home/KycStatus.tsx`
- `src/components/dashboard/home/LinkedWallet.tsx`
- `src/components/dashboard/home/RateTicker.tsx`
- `src/components/dashboard/home/ScanPayBanner.tsx`
- `src/components/dashboard/page/kyc/KycDetails.tsx`
- `src/components/dashboard/page/kyc/KycVerification.tsx`
- `src/components/dashboard/page/pay/ConfirmPayment.tsx`
- `src/components/dashboard/page/pay/MerchantInfo.tsx`
- `src/components/dashboard/page/pay/PayStepper.tsx`
- `src/components/dashboard/page/pay/PaymentProcessing.tsx`
- `src/components/dashboard/page/pay/PaymentQuote.tsx`
- `src/components/dashboard/page/pay/PaymentSuccess.tsx`
- `src/components/dashboard/page/pay/QRScanner.tsx`
- `src/components/dashboard/page/pay/ScanQr.tsx`
- `src/components/dashboard/page/profile/PhoneNumbers.tsx`
- `src/components/dashboard/page/profile/UserProfile.tsx`
- `src/components/dashboard/page/security/ActiveSessions.tsx`
- `src/components/dashboard/page/security/ChangePassword.tsx`
- `src/components/dashboard/page/security/DeleteAccount.tsx`
- `src/components/dashboard/page/security/SecurityBiometric.tsx`
- `src/components/dashboard/page/security/TransactionPin.tsx`
- `src/components/dashboard/page/security/TwoFactorAuth.tsx`
- `src/components/dashboard/page/settings/SettingsPanel.tsx`
- `src/components/dashboard/page/transaction/TransactionDetails.tsx`
- `src/components/dashboard/page/transaction/TransactionHistory.tsx`
- `src/components/dashboard/page/transaction/TransactionTable.tsx`
- `src/components/dashboard/page/wallet/ConnectWallet.tsx`
- `src/components/dashboard/page/wallet/WalletOverview.tsx`
- `src/components/forms/AuthForm.tsx`
- `src/components/guards/AuthGuard.tsx`
- `src/components/homepage/Banner.tsx`
- `src/components/homepage/Blog.tsx`
- `src/components/homepage/BlogPost.tsx`
- `src/components/homepage/ContactPage.tsx`
- `src/components/homepage/DownloadApp.tsx`
- `src/components/homepage/Faq.tsx`
- `src/components/homepage/Features.tsx`
- `src/components/homepage/HowItWorks.tsx`
- `src/components/homepage/HowSteps.tsx`
- `src/components/homepage/Process.tsx`
- `src/components/homepage/SecurityOverview.tsx`
- `src/components/homepage/Services.tsx`
- `src/components/homepage/SupportCenter.tsx`
- `src/components/homepage/TravelPay.tsx`
- `src/components/share/ActivityFilterTabs.tsx`
- `src/components/share/Footer.tsx`
- `src/components/share/LanguageSwitcher.tsx`
- `src/components/share/Navbar.tsx`
- `src/components/share/QueryState.tsx`
- `src/components/share/SecureInput.tsx`
- `src/components/share/SkipLink.tsx`
- `src/components/share/StatusBadge.tsx`
- `src/components/share/ThemeToggle.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/select.tsx`

## Stats

| Lines | Blank | Comment | Code |
| --- | --- | --- | --- |
| 155 | 25 | 13 | 117 |

