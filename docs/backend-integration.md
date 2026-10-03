# REST integration handoff

This is a frontend-first implementation. All paths below are proposed contracts, not claims about the backend currently being developed. Adapt existing service functions when the final API contract is available. Do not add a second networking layer.

## Authentication and authorization

- Axios sends credentials. Use an HttpOnly, Secure session cookie with an appropriate SameSite policy.
- Allow only the frontend origin in credentialed CORS. Wildcard origins are not valid for credentialed requests.
- Mutations expect CSRF protection. Axios is configured for `csrf_token` and `X-CSRF-Token`; agree the actual CSRF contract and cookie domain with the backend.
- `/auth/session` confirms the session. The client gate is a UX control, not an authorization boundary. Every API must enforce account status and ownership.
- Enforce OTP expiry, single use, rate limits, allowed registration countries, new-device checks and the 90-day reauthentication policy on the backend.
- Session and identity information is not persisted in browser storage. OTP challenges are held only in Zustand memory, so a reload requires requesting a fresh code.

## Response convention

Services currently expect the JSON response body directly, without a `{data: ...}` envelope. Models are in `src/types/index.ts`. A backend envelope can be unwrapped centrally in `apiRequest` once agreed. Date values are ISO 8601 strings. Quote amounts currently use numeric display values; use the backend as the authority for precise amounts and adapt services if the contract uses decimal strings or minor units.

## Shared endpoints

| Method | Path                  | Request / response                                                      |
| ------ | --------------------- | ----------------------------------------------------------------------- |
| GET    | `/auth/configuration` | `{allowedCountries: string[]}` with ISO alpha-2 codes                   |
| POST   | `/auth/otp/request`   | `{phone,country,purpose}`; returns `{challengeId,expiresIn}` in seconds |
| POST   | `/auth/otp/verify`    | `{challengeId,code}`; sets session cookie and returns `{profile}`       |
| GET    | `/auth/session`       | `{profile}` including the device re-link requirement                    |
| POST   | `/auth/logout`        | Invalidate session; 204                                                 |

## Traveler endpoints

| Method | Path                              | Contract                                                                                                                                                                         |
| ------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/personal/overview`              | `Overview`: profile, wallets, transactions, spent, payments, daily rate and update time                                                                                          |
| GET    | `/personal/transactions`          | `Transaction[]`; only this user's records                                                                                                                                        |
| GET    | `/personal/wallets`               | `Wallet[]` with zero or one connected wallet; balances include asset and network                                                                                                 |
| GET    | `/personal/profile`               | `Profile`, including `maxSecondaryPhones` (3 to 5), secondary numbers and KYC status                                                                                             |
| POST   | `/personal/profile/phones`        | `{phone}`; returns `{challengeId}`; do not link an unverified number                                                                                                             |
| POST   | `/personal/profile/phones/verify` | `{challengeId,code}`; returns updated `Profile`                                                                                                                                  |
| DELETE | `/personal/wallets/{walletId}`    | Disconnect the authenticated user's wallet connection; return 204 only after completion                                                                                          |
| POST   | `/personal/wallets/link`          | `{wallet}` for first link, or `{wallet,walletId,relink:true}` for new-device reauthorization of the existing wallet; returns `{url}` for an authenticated HTTPS MeshConnect flow |
| POST   | `/personal/verification/session`  | Returns `{url}` for authenticated HTTPS Sumsub verification                                                                                                                      |
| POST   | `/personal/payments/resolve`      | `{qr}`; returns `{id,name,city}` from the Partner Bank directory                                                                                                                 |
| POST   | `/personal/payments/quote`        | `{merchantId,fiatAmount,walletId,asset}`; returns `Quote`                                                                                                                        |
| POST   | `/personal/payments/approval`     | `{quoteId}`, with `Idempotency-Key: quoteId`; returns `{url}` to request signed wallet approval                                                                                  |

A `Quote` contains `id`, `merchant`, `fiatAmount`, `cryptoAmount`, `fee`, `total`, `asset`, `rate`, and `expiresAt`. Bind it server-side to the authenticated user, wallet, network and resolved merchant. Validate expiry, KYC, sufficient funds, registration/account status and transaction limits at approval time. Do not trust client-provided amounts or the disabled state of a button. The backend must deduplicate repeated approvals.

The frontend never derives success from opening or returning from a provider URL. Success is represented only by backend transaction status after chain confirmation and bank settlement. Agree provider return URLs pointing to the wallet, verification or transactions route. Page navigation refetches the corresponding server state.

Demo quote calculation is illustrative USDC only, with one supported sample merchant code: `NP-BT-AMBIENT-001`. It cannot execute approval. Real SOL, ADA and other supported-network quotes must come from the backend/provider.

## Collections and pagination

- For production-scale data, agree cursor pagination and server-side filtering. The current frontend filters the returned collection locally and exports that collection only.
- Identity documents should remain with the authorized provider and protected backend.

## Provider and infrastructure boundaries

Do not expose Twilio, SNS, SES, Sumsub, Ripple, MeshConnect, Currencylayer or Partner Bank secrets in browser environment variables. Bank directory resolution, daily FX feed refresh, off-ramp execution, operator settlement-wallet routing, payer-to-transaction identity mapping, signed webhook delivery, retries and reconciliation belong on the backend.

The final compliance payload is pending the Partner Bank specification after NDA. No payload is invented in this frontend. SQRIL and additional corridors are not implemented in Phase 1.

## Before launch

Agree and implement the above contracts, test authenticated session and provider return flows, replace preview values, set the canonical origin, supply final operator terms and privacy disclosures, and run device/browser QA including RTL, keyboard navigation, camera permission and the actual payment flow. The current preview must not be treated as a functioning payment service.

## Single connected wallet rule

Each account can have at most one connected crypto wallet. The frontend rejects multiple-wallet responses and disables new provider connections while one is already linked. The payment flow uses the single connected wallet without a wallet selector. Re-linking on a new device must update the existing connection, never create a second one.

Enforce this atomically on the backend at link-session creation AND provider callback completion, including concurrent tabs/devices and simultaneous provider callbacks. Return HTTP 409 for a second connection. A client-side preflight is not a concurrency or authorization guarantee. Do not delete or silently choose between legacy multiple connections: resolve them before enabling payments. Users can disconnect the existing connection before requesting a new link.

### Disconnect behavior

The UI requires confirmation, waits for the DELETE request to succeed, and then refreshes wallet, overview and profile queries. Failure leaves the wallet connected and the confirmation open for retry. Disconnect only the connection owned by the authenticated user. Revoke the relevant provider session, prevent new payment approvals from this connection, and preserve transaction history and in-flight settlement records. Return a conflict if a pending operation makes disconnect unsafe, and make repeat DELETE requests idempotent. This operation never transfers crypto or revokes on-chain token allowances. Demo disconnect is tab-local Zustand state and resets on reload; real data always comes from REST.
