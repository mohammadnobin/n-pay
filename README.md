# NomiPay frontend

Next.js App Router frontend for Phase 1 in Bhutan. The file layout follows the shared reference structure: `(auth)`, `(dashboard)` and `(template)` route groups, feature components under `src/components/dashboard/page/<area>/`, flat `src/hooks/use*.ts`, `src/services/*.service.ts` and `src/schemas/*.schema.ts`. The repository contains the complete source, not snippets.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. English, Spanish and Arabic are selected in the header and persisted to `localStorage` — there is no locale route segment. Arabic sets `dir="rtl"` on `<html>` and the layout uses logical properties. Theme preference follows the device until the user changes it.

### Preview walkthrough

1. Open `/dashboard`, or choose **Explore the app** on the home page.
2. Choose **Scan & pay**, then **Use sample merchant**.
3. Enter `1080.25` BTN. The connected MetaMask USDC wallet is used automatically.
4. Review the example rate, fee, total and 60-second expiry.
5. Wallet approval displays a provider-unavailable notice. No payment is created.
6. Login preview accepts an international phone number and code `123456`. No SMS is sent.

## Implemented screens

| Route                    | Screen                      | Group                 |
| ------------------------ | --------------------------- | --------------------- |
| `/`                      | Marketing home              | `src/app/(template)`  |
| `/how-it-works`          | How it works                | `src/app/(template)`  |
| `/safety`                | Security overview (public)  | `src/app/(template)`  |
| `/support`               | Help & support              | `src/app/(template)`  |
| `/login`                 | Phone sign in               | `src/app/(auth)`      |
| `/register`              | Phone registration          | `src/app/(auth)`      |
| `/otp`                   | One-time code               | `src/app/(auth)`      |
| `/dashboard`             | User dashboard              | `src/app/(dashboard)` |
| `/pay/scan`              | QR scanner                  | `src/app/(dashboard)` |
| `/pay/merchant`          | Merchant information        | `src/app/(dashboard)` |
| `/pay/quote`             | Fiat/crypto quote           | `src/app/(dashboard)` |
| `/pay/confirm`           | Payment confirmation        | `src/app/(dashboard)` |
| `/pay/processing`        | Payment processing          | `src/app/(dashboard)` |
| `/pay/success`           | Payment success             | `src/app/(dashboard)` |
| `/transactions`          | Transaction history         | `src/app/(dashboard)` |
| `/transactions/[id]`     | Transaction details         | `src/app/(dashboard)` |
| `/wallet`                | Connected wallet & balances | `src/app/(dashboard)` |
| `/wallet/connect`        | Connect wallet              | `src/app/(dashboard)` |
| `/kyc`                   | KYC verification            | `src/app/(dashboard)` |
| `/profile`               | User profile                | `src/app/(dashboard)` |
| `/profile/phone-numbers` | Manage phone numbers        | `src/app/(dashboard)` |
| `/security`              | Security & biometric        | `src/app/(dashboard)` |
| `/settings`              | Settings                    | `src/app/(dashboard)` |

Every `(dashboard)` route shares one layout — `AuthGuard` inside `DashboardShell` — so the sidebar, header and session gate are declared once. The dashboard routes sit at the URL root rather than under `/dashboard/…`; the public security page therefore lives at `/safety` so the two do not collide.

## Main files

- `src/config/env.ts`: the only place `process.env` is read.
- `src/constants/routes.ts`: route registry.
- `src/constants/api-endpoints.ts`: proposed REST contract paths.
- `src/lib/axios.ts`: shared Axios instance, errors and `apiRequest`.
- `src/lib/query-client.ts`, `src/lib/query-keys.ts`: TanStack Query client and key registry.
- `src/services/auth.service.ts`: phone authentication and registration configuration.
- `src/services/personal.service.ts`: wallets, profiles, KYC handoff, merchant resolution and payment quotes.
- `src/hooks/use*.ts`: TanStack Query hooks, plus `useLang` (the i18n provider).
- `src/schemas/*.schema.ts`: Zod schemas and validation tests.
- `src/components/dashboard/page/<area>/`: one folder per dashboard screen.
- `src/components/{auth,forms,guards,homepage,share,ui}/`: auth screens, forms, route guards, marketing sections, shared chrome and primitives.
- `src/i18n/{en,es,ar}.json`: localized UI and SEO copy.
- `src/style/globals.css`: design tokens and global styles.
- `src/types/index.ts`: proposed REST response models.
- `docs/backend-integration.md`: endpoint and security handoff.

## Backend connection

Set `NEXT_PUBLIC_DEMO_MODE=false` and configure `NEXT_PUBLIC_API_BASE_URL` in `.env.local`, then restart or rebuild. The frontend does not fall back to sample data when a real API request fails. `NEXT_PUBLIC_*` variables are public and compiled into the browser bundle. Never put secrets in them.

The proposed endpoints and response shapes must be agreed with the backend developer. Live provider access, SMS delivery, KYC, signed wallet approval, settlement, webhook delivery, country enforcement and session enforcement are backend responsibilities. Country enforcement and session enforcement in particular must not rely on the client.

Biometrics are described but not implemented as authentication. Native device biometrics or an audited WebAuthn flow need the corresponding backend and device support. No private keys, recovery phrases, session tokens or identity documents are stored in localStorage.

## SEO

Page titles, descriptions, canonical URLs, Open Graph metadata, sitemap and robots are included. Set `NEXT_PUBLIC_SITE_URL` to the final origin. Preview mode has `noindex`; authenticated and authentication routes remain `noindex` in live mode. Final operator privacy and legal terms are required before a public launch.

## Commands

```bash
npm run dev
npm run clean:dev
npm run clean
npm run typecheck
npm run lint
npm test
npm run build
npm run start
npm run cf-typegen
npm run build:cloudflare
npm run preview
npm run deploy
```

The installed OpenNext adapter currently marks Next.js Node.js proxy middleware support as experimental. The OpenNext build and Wrangler dry run pass; re-test in the Workers runtime before a production release.

`npm run deploy` uses `opennextjs-cloudflare build` and `opennextjs-cloudflare deploy`. It requires access to your Cloudflare account. Review `wrangler.jsonc` before deploying. Backend hosting remains on AWS; this frontend configuration does not provision backend infrastructure.

`npm run build:preview` creates a static, demo-only export for private Sites review. It does not replace the normal Next.js or OpenNext build. The `.openai/hosting.json` file belongs to this private preview.

## Validation scope

Validation includes TypeScript, ESLint, production builds and negative form-validation tests. Actual SMS delivery, provider credentials, camera permission on devices, wallet approval, bank settlement and native biometrics cannot be verified without their integrations. Browser interaction and visual QA were not performed. Optional transaction WebMCP filtering is feature-detected; no supported WebMCP test context was available.

## Image credit

Bhutan photo: [Raimond Klavins on Unsplash](https://unsplash.com/photos/Xf0h0cTbNwU), distributed under the Unsplash License. The image is stored locally at `public/bhutan.jpg`.

Only one crypto wallet can be connected per account at a time. A new-device re-link reuses that connection. See the backend guide for the required atomic server-side constraint.

The connected wallet card includes a confirmed Disconnect action. Demo disconnection lasts until reload and enables provider choices; real provider linking still requires the backend. Wallet and overview query data are refreshed after disconnect.
