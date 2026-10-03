import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { LangProvider } from "@/hooks/useLang";
import { QueryProvider } from "@/providers/QueryProvider";
import { env } from "@/config/env";
import en from "@/i18n/en.json";
import "@/style/globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: en.seoTitle, template: "%s | NomiPay" },
  description: en.seoDescription,
  openGraph: {
    title: en.seoTitle,
    description: en.seoDescription,
    type: "website",
    siteName: "NomiPay",
  },
  robots: env.isDemo
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // `lang`/`dir` start at the default language and are updated by LangProvider
  // after mount, so the server and client first render stay identical.
  return (
    <html
      lang="en"
      dir="ltr"
      className={figtree.variable}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <LangProvider>
            <QueryProvider>{children}</QueryProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
