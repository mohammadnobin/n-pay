/** Single place where `process.env` is read, so nothing else touches it. */
export const env = {
  /** REST base for every request in `@/lib/axios`. Empty means "not wired yet". */
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  /** Shown on the contact page. Empty hides the email card entirely. */
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "",
  /** Preview build: sample data, no live payments or identity checks. */
  isDemo: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
};
