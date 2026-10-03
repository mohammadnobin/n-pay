import type { Metadata } from "next";
import en from "@/i18n/en.json";

const messages = en as Record<string, string>;

/** Per-page metadata. Copy comes from the English dictionary — the app has no
 *  locale route segment, so there is nothing locale-specific to resolve here. */
export function pageMetadata(path: string, key: string): Metadata {
  const title = messages[key] ?? key;
  return {
    title,
    alternates: { canonical: path || "/" },
    openGraph: {
      url: path || "/",
      title,
      description: messages.seoDescription,
    },
  };
}
